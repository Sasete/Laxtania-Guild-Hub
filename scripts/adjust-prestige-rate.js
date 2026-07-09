const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase }        = require('firebase-admin/database');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential:   cert(serviceAccount),
  databaseURL: 'https://laxtania-albion-quest-board-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = getDatabase();

// ── Config ────────────────────────────────────────────────────────────────
const CRISIS_THRESHOLD      = 0.80;   // real < nominal × 0.80 → crisis detected
const BASE_SELL_MARGIN      = 0.10;   // normal sell penalty  (sell = rate × 0.90)
const MARGIN_STEP           = 0.10;   // penalty added per escalation step
const MAX_MARGIN_BEFORE_COR = 0.50;   // at 50% penalty → trigger correction
const CORRECTION_CLOSE_FRAC = 0.50;   // each correction closes 50% of the gap
const CORRECTION_MARGIN_RST = 0.20;   // reset margin penalty to 20% after correction

// Volume thresholds (pendingSellLaxi / totalLaxi)
const VOL_FREEZE   = 0.03;   // < 3%  → freeze escalation (de-escalate 1 step)
const VOL_LOW      = 0.08;   // 3-8%  → +1 step
// > 8%              → +2 steps

// Normal price adjustment (runs when NOT in crisis)
// Script runs every 4h → 6×/day. Per-run cap = 0.001 → total daily ≈ 0.6%
const UP_RATIO         = 0.05;
const UP_MIN           = 8;     // min step per run (S)
const UP_RUN_CAP_PCT   = 0.001; // max step per run as % of nominal
const DOWN_RATIO       = 0.20;
const DOWN_MIN         = 100;
const DOWN_MAX         = 1500;
// ─────────────────────────────────────────────────────────────────────────

// --crisis-only: skip normal price adjustment, only handle crisis zone logic
const CRISIS_ONLY = process.argv.includes('--crisis-only');

async function main() {
  const now = Date.now();

  const [treasurySnap, bondsSnap, membersSnap, familiesSnap, settingsSnap, crisisSnap, tasksSnap] = await Promise.all([
    db.ref('treasury/entries').get(),
    db.ref('bonds').get(),
    db.ref('prestige/members').get(),
    db.ref('prestige/families').get(),
    db.ref('treasury/settings/silverPerLaxi').get(),
    db.ref('treasury/settings/crisis').get(),
    db.ref('tasks').get(),
  ]);

  const nominal = settingsSnap.exists() ? settingsSnap.val() : 10000;
  const crisis  = crisisSnap.exists()   ? crisisSnap.val()   : null;

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
  const ratio       = realValue / nominal;
  const dropPct     = Math.round((1 - ratio) * 100);

  console.log(`Net position: ${netPosition.toLocaleString()} S`);
  console.log(`Total laxi:   ${totalLaxi.toLocaleString()} pts`);
  console.log(`Nominal:      ${nominal.toLocaleString()} S`);
  console.log(`Real value:   ${realValue.toLocaleString()} S`);
  console.log(`Ratio:        ${(ratio * 100).toFixed(1)}%`);

  // ── Save snapshot ──
  await db.ref('treasury/settings/silverPerLaxiSnapshot').set(nominal);
  await db.ref('prestige/snapshot/lastTotal').set(totalLaxi);

  // ── Pending sell volume ──
  const tasks = tasksSnap.val() || {};
  const pendingSellLaxi = Object.values(tasks)
    .filter(t => t.status === 'pending' && t.type === 'prestige_sell')
    .reduce((s, t) => s + (t.prestigePoints || 0), 0);
  const sellPressure = totalLaxi > 0 ? pendingSellLaxi / totalLaxi : 0;
  console.log(`Sell pressure: ${(sellPressure * 100).toFixed(2)}% (${pendingSellLaxi} Laxi pending)`);

  // ── Helper: append a step to the active crisis log array ──
  function crisisLogEntry(type, extra = {}) {
    return { at: now, type, ...extra };
  }

  // ── Crisis zone check ──
  if (ratio < CRISIS_THRESHOLD) {
    const currentStep    = crisis ? (crisis.step || 0) : 0;
    const currentPenalty = crisis ? (crisis.sellMarginPenalty || 0) : 0;
    const existingLog    = crisis?.log ? Object.values(crisis.log) : [];

    console.log(`⚠️  Crisis zone — real is ${dropPct}% below nominal. Step: ${currentStep}, Penalty: ${(currentPenalty*100).toFixed(0)}%`);

    // ── First detection ──
    if (!crisis) {
      const initLog = [crisisLogEntry('detected', { nominal, realValue, dropPct, sellPressurePct: parseFloat((sellPressure*100).toFixed(2)) })];
      await db.ref('treasury/settings/crisis').set({
        step: 0, sellMarginPenalty: 0,
        detectedAt: now, lastCheckedAt: now,
        nominalAtStart: nominal,
        log: initLog,
      });
      console.log('   Crisis state initialised (step 0, monitoring).');
      process.exit(0);
    }

    // ── Determine step delta based on sell volume ──
    let stepDelta = 0;
    if (sellPressure < VOL_FREEZE) {
      stepDelta = currentStep > 0 ? -1 : 0;
      console.log(`   Low sell pressure (${(sellPressure*100).toFixed(2)}%) — de-escalating.`);
    } else if (sellPressure < VOL_LOW) {
      stepDelta = +1;
      console.log(`   Moderate sell pressure — +1 step.`);
    } else {
      stepDelta = +2;
      console.log(`   High sell pressure (${(sellPressure*100).toFixed(2)}%) — +2 steps.`);
    }

    const newStep    = Math.max(0, currentStep + stepDelta);
    const newPenalty = newStep * MARGIN_STEP;

    // ── Correction trigger ──
    if (newPenalty >= MAX_MARGIN_BEFORE_COR && stepDelta > 0) {
      const correctionDrop = Math.round((nominal - realValue) * CORRECTION_CLOSE_FRAC);
      const newNominal     = Math.max(realValue, nominal - correctionDrop);
      const resetStep      = Math.round(CORRECTION_MARGIN_RST / MARGIN_STEP);
      const resetPenalty   = CORRECTION_MARGIN_RST;

      console.log(`🔴 CORRECTION TRIGGERED — nominal ${nominal.toLocaleString()} → ${newNominal.toLocaleString()} S`);

      // Cancel all pending sell tasks and refund Laxi
      const pendingSells = Object.entries(tasks).filter(([,t]) => t.status === 'pending' && t.type === 'prestige_sell');
      let refundCount = 0;
      const refundedNames = [];
      for (const [tid, t] of pendingSells) {
        const mid = t.memberId || Object.entries(members).find(([,m]) => m.name?.toLowerCase() === t.holder?.toLowerCase())?.[0];
        await db.ref(`tasks/${tid}`).update({ status: 'cancelled', cancelledAt: now, cancelledBy: 'system', cancelReason: 'Crisis correction — sell order refunded' });
        if (mid) {
          const currentPts = (members[mid]?.points || 0);
          await db.ref(`prestige/members/${mid}/points`).set(currentPts + (t.prestigePoints || 0));
          refundedNames.push(t.holder);
        }
        refundCount++;
      }
      if (refundCount > 0) console.log(`   Cancelled & refunded ${refundCount} sell task(s).`);

      const correctionEntry = crisisLogEntry('correction', {
        nominalBefore: nominal, nominalAfter: newNominal, realValue, dropPct,
        marginBefore: currentPenalty, marginAfter: resetPenalty,
        sellsRefunded: refundCount, refundedNames,
        sellPressurePct: parseFloat((sellPressure*100).toFixed(2)),
      });

      await db.ref('treasury/settings/silverPerLaxi').set(newNominal);
      await db.ref('treasury/settings/rateHistory').push({value:newNominal,prevValue:nominal,changedAt:now,changedBy:'system',source:'crisis_correction',dropPct});
      await db.ref('treasury/settings/crisis').set({
        step:              resetStep,
        sellMarginPenalty: resetPenalty,
        detectedAt:        crisis.detectedAt,
        lastCheckedAt:     now,
        nominalAtStart:    crisis.nominalAtStart || nominal,
        log:               [...existingLog, correctionEntry],
      });
      console.log('Correction saved to crisis log.');
      process.exit(0);
    }

    // ── Normal escalation / de-escalation ──
    const stepEntry = crisisLogEntry(stepDelta > 0 ? 'escalation' : stepDelta < 0 ? 'deescalation' : 'check', {
      stepBefore: currentStep, stepAfter: newStep,
      penaltyBefore: currentPenalty, penaltyAfter: newPenalty,
      sellPressurePct: parseFloat((sellPressure*100).toFixed(2)),
    });

    await db.ref('treasury/settings/crisis').set({
      step:              newStep,
      sellMarginPenalty: newPenalty,
      detectedAt:        crisis.detectedAt,
      lastCheckedAt:     now,
      nominalAtStart:    crisis.nominalAtStart || nominal,
      log:               [...existingLog, stepEntry],
    });
    console.log(`   Crisis updated — step: ${newStep}, sell penalty: ${(newPenalty*100).toFixed(0)}%`);
    process.exit(0);
  }

  // ── Crisis resolved — archive to crisis_log ──
  if (crisis) {
    const existingLog = crisis.log ? Object.values(crisis.log) : [];
    const resolvedEntry = crisisLogEntry('resolved', { nominal, realValue });
    await db.ref('treasury/settings/crisis_log').push({
      detectedAt:     crisis.detectedAt,
      resolvedAt:     now,
      nominalAtStart: crisis.nominalAtStart || nominal,
      nominalAtEnd:   nominal,
      realValueAtEnd: realValue,
      log:            [...existingLog, resolvedEntry],
    });
    await db.ref('treasury/settings/crisis').remove();
    console.log('✅ Crisis resolved — archived to crisis_log.');
  }

  // ── Normal step adjustment (skipped in crisis-only mode) ──
  let newNominal = nominal;

  if (CRISIS_ONLY) {
    console.log('ℹ️  Crisis-only mode — skipping normal price adjustment.');
  } else {
    const gap = Math.abs(realValue - nominal);
    if (realValue > nominal) {
      const runCap  = Math.round(nominal * UP_RUN_CAP_PCT);
      const step    = Math.min(Math.max(Math.round(gap * UP_RATIO), UP_MIN), runCap);
      newNominal    = nominal + step;
      console.log(`↑ Adjusting up by ${step.toLocaleString()} S (run cap: ${runCap.toLocaleString()} S)`);
    } else if (realValue < nominal) {
      const step = Math.min(Math.max(Math.round(gap * DOWN_RATIO), DOWN_MIN), DOWN_MAX);
      newNominal = nominal - step;
      console.log(`↓ Adjusting down by ${step.toLocaleString()} S`);
    } else {
      console.log('= Already at real value — no change.');
    }
  }

  if (newNominal !== nominal) {
    await db.ref('treasury/settings/silverPerLaxi').set(newNominal);
    await db.ref('treasury/settings/rateHistory').push({value:newNominal,prevValue:nominal,changedAt:now,changedBy:'system',source:'auto_adjust'});
    console.log(`New nominal: ${newNominal.toLocaleString()} S`);
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
