const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://laxtania-albion-quest-board-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = getDatabase();

async function main() {
  const [treasurySnap, bondsSnap, membersSnap, familiesSnap, settingsSnap] = await Promise.all([
    db.ref('treasury/entries').get(),
    db.ref('bonds').get(),
    db.ref('prestige/members').get(),
    db.ref('prestige/families').get(),
    db.ref('treasury/settings/silverPerPrestige').get(),
  ]);

  const nominal = settingsSnap.exists() ? settingsSnap.val() : 10000;

  // Treasury balance
  const entries = treasurySnap.val() || {};
  const treasury = Object.values(entries).reduce((s, e) => s + (e.amount || 0), 0);

  // Bond liability (unredeemed active/completing bonds)
  const bonds = bondsSnap.val() || {};
  let liability = 0;
  for (const p of Object.values(bonds)) {
    if (p.status === 'active' || p.status === 'completing') {
      for (const s of Object.values(p.sales || {})) {
        if (!s.redeemed) liability += s.repayment || 0;
      }
    }
  }

  // Total prestige (members + family bonuses)
  const members = membersSnap.val() || {};
  const families = familiesSnap.val() || {};
  const memberPts = Object.values(members).reduce((s, m) => s + (m.points || 0), 0);
  const familyBonus = Object.values(families).reduce((s, f) => s + (f.bonusPoints || 0), 0);
  const totalPrestige = memberPts + familyBonus;

  if (totalPrestige === 0) {
    console.log('No prestige data — skipping adjustment.');
    process.exit(0);
  }

  const realValue = Math.round((treasury - liability) / totalPrestige);
  const STEP = 100;
  const newNominal = realValue > nominal ? nominal + STEP : realValue < nominal ? nominal - STEP : nominal;

  console.log(`Nominal: ${nominal.toLocaleString()} S`);
  console.log(`Real:    ${realValue.toLocaleString()} S`);
  console.log(`New:     ${newNominal.toLocaleString()} S  (${newNominal > nominal ? '+' : newNominal < nominal ? '-' : '='}${STEP})`);

  if (newNominal !== nominal) {
    await db.ref('treasury/settings/silverPerPrestige').set(newNominal);
    console.log('Rate updated.');
  } else {
    console.log('Already at real value — no change.');
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
