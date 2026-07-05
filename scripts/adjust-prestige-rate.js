const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://laxtania-albion-quest-board-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = getDatabase();

// ── Config ────────────────────────────────────────────────────────────────
const CRISIS_THRESHOLD   = 0.80;              // real < nominal × 0.80 → crisis
const CRISIS_CONFIRM_MS  = 2 * 60 * 60 * 1000; // 2 hours before circuit break
const UP_RATIO           = 0.05;              // 5% of gap per day upward
const UP_MIN             = 50;               // minimum upward step (S)
const UP_DAILY_CAP_PCT   = 0.006;            // max 0.6% of nominal per day ≈ 18%/month
const DOWN_RATIO         = 0.20;             // 20% of gap per day downward
const DOWN_MIN           = 100;              // minimum downward step (S)
const DOWN_MAX           = 1500;             // maximum downward step (S)
// ─────────────────────────────────────────────────────────────────────────

async function main() {
  const now = Date.now();

  const [treasurySnap, bondsSnap, membersSnap, familiesSnap, settingsSnap, crisisSnap] = await Promise.all([
    db.ref('treasury/entries').get(),
    db.ref('bonds').get(),
    db.ref('prestige/members').get(),
    db.ref('prestige/families').get(),
    db.ref('treasury/settings/silverPerLaxi').get(),
    db.ref('treasury/settings/crisis_pending').get(),
  ]);

  const nominal      = settingsSnap.exists() ? settingsSnap.val() : 10000;
  const crisisPending = crisisSnap.exists() ? crisisSnap.val() : null;

  // ── Treasury balance ──
  const entries  = treasurySnap.val() || {};
  const treasury = Object.values(entries).reduce((s, e) => s + (e.amount || 0), 0);

  // ── Bond liability ──
  const bonds = bondsSnap.val() || {};
  let liability = 0;
  for (const p of Object.values(bonds)) {
    if (p.status === 'active' || p.status === 'completing') {
      for (const s of Object.values(p.sales || {})) {
        if (!s.redeemed) liability += s.repayment || 0;
      }
    }
  }

  // ── Total laxi (members + family bonuses) ──
  const members     = membersSnap.val() || {};
  const families    = familiesSnap.val() || {};
  const memberPts   = Object.values(members).reduce((s, m) => s + (m.points || 0), 0);
  const familyBonus = Object.values(families).reduce((s, f) => s + (f.bonusPoints || 0), 0);
  const totalLaxi   = memberPts + familyBonus;

  if (totalLaxi === 0) {
    console.log('No laxi data — skipping adjustment.');
    process.exit(0);
  }

  const netPosition = treasury - liability;
  const realValue   = Math.round(netPosition / totalLaxi);
  const gap         = Math.abs(realValue - nominal);
  const gapPct      = Math.round((1 - Math.min(realValue, nominal) / Math.max(realValue, nominal)) * 100);

  console.log(`Net position: ${netPosition.toLocaleString()} S`);
  console.log(`Total laxi:   ${totalLaxi.toLocaleString()} pts`);
  console.log(`Nominal:      ${nominal.toLocaleString()} S`);
  console.log(`Real value:   ${realValue.toLocaleString()} S`);
  console.log(`Gap:          ${realValue > nominal ? '+' : '-'}${gap.toLocaleString()} S (${gapPct}%)`);

  // ── Save snapshot for trend arrow ──
  await db.ref('treasury/settings/silverPerLaxiSnapshot').set(nominal);
  await db.ref('prestige/snapshot/lastTotal').set(totalLaxi);

  // ── Crisis check (real < nominal × 0.80) ──
  if (realValue < nominal * CRISIS_THRESHOLD) {
    const dropPct = Math.round((1 - realValue / nominal) * 100);

    if (!crisisPending) {
      // First detection — set flag, don't snap yet
      await db.ref('treasury/settings/crisis_pending').set({
        detectedAt:          now,
        nominalAtDetection:  nominal,
        realAtDetection:     realValue,
        dropPct,
      });
      console.log(`⚠️  CRISIS DETECTED — real is ${dropPct}% below nominal.`);
      console.log('    Circuit breaker armed. Will confirm in 2 hours before snapping.');
    } else {
      const age = now - (crisisPending.detectedAt || 0);
      const hoursElapsed = (age / 3600000).toFixed(1);

      if (age >= CRISIS_CONFIRM_MS) {
        // Still in crisis after 2h — snap nominal to real
        console.log(`🔴 CIRCUIT BREAKER TRIGGERED — crisis confirmed after ${hoursElapsed}h.`);
        console.log(`   Snapping nominal ${nominal.toLocaleString()} → ${realValue.toLocaleString()} S`);

        await db.ref('treasury/settings/silverPerLaxi').set(realValue);
        await db.ref('treasury/settings/crisis_pending').remove();
        await db.ref('treasury/settings/crisis_log').push({
          triggeredAt:     now,
          nominalBefore:   nominal,
          realValue,
          dropPct,
          hoursElapsed:    parseFloat(hoursElapsed),
        });
        console.log('Circuit breaker log saved.');
      } else {
        const hoursLeft = ((CRISIS_CONFIRM_MS - age) / 3600000).toFixed(1);
        console.log(`⚠️  Crisis still active (${hoursElapsed}h elapsed, ${hoursLeft}h until circuit break).`);
        console.log(`   Original drop: ${crisisPending.dropPct}% — current drop: ${dropPct}%`);
      }
    }

    // No normal step adjustment while crisis is active
    process.exit(0);
  }

  // ── Crisis resolved — clear pending flag if any ──
  if (crisisPending) {
    await db.ref('treasury/settings/crisis_pending').remove();
    console.log('✅ Crisis resolved — clearing pending flag.');
  }

  // ── Normal step adjustment ──
  let newNominal = nominal;

  if (realValue > nominal) {
    // Rising: slow, capped at 0.6%/day of nominal
    // Exception: if gap is <5% of nominal, close it in one step (avoid asymptotic staleness)
    const nearConvergence = gap < nominal * 0.05;
    const dailyCap = nearConvergence ? gap : Math.round(nominal * UP_DAILY_CAP_PCT);
    const step     = Math.min(Math.max(Math.round(gap * UP_RATIO), UP_MIN), dailyCap);
    newNominal     = nominal + step;
    if (nearConvergence) console.log(`↑ Near convergence — closing gap in one step: +${step.toLocaleString()} S`);
    else console.log(`↑ Adjusting up by ${step.toLocaleString()} S (cap: ${dailyCap.toLocaleString()} S/day)`);
  } else if (realValue < nominal) {
    // Falling: faster, protect treasury
    const step = Math.min(Math.max(Math.round(gap * DOWN_RATIO), DOWN_MIN), DOWN_MAX);
    newNominal = nominal - step;
    console.log(`↓ Adjusting down by ${step.toLocaleString()} S`);
  } else {
    console.log('= Already at real value — no change.');
  }

  if (newNominal !== nominal) {
    await db.ref('treasury/settings/silverPerLaxi').set(newNominal);
    console.log(`New nominal: ${newNominal.toLocaleString()} S`);
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
