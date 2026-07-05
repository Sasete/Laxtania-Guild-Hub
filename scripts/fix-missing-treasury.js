const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://laxtania-albion-quest-board-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = getDatabase();

async function main() {
  const at = Date.now();
  const by = 'Sasete';

  // Only manually-entered fund entries that were never mirrored to treasury
  const entries = [
    { amount: -710000, reason: '[events] Fix missing income',  fund: 'events' },
    { amount: -500000, reason: '[events] Tournament prizes',   fund: 'events' },
    { amount: 1000000, reason: '[island] Island incomes recorded', fund: 'island' },
  ];

  for (const e of entries) {
    await db.ref('treasury/entries').push({ ...e, at, by, retroFix: true });
    console.log(`✓ ${e.amount > 0 ? '+' : ''}${e.amount.toLocaleString()} — ${e.reason}`);
  }

  console.log('Done.');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
