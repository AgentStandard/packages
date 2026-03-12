const fs = require('fs');
const path = '/root/bot/data/users.json';
const userId = process.argv[2];
if (!userId) { console.error('Usage: node reset-user.js <userId>'); process.exit(1); }

const users = JSON.parse(fs.readFileSync(path, 'utf8'));
if (!users[userId]) { console.error('User not found:', userId); process.exit(1); }

const before = JSON.stringify(users[userId], null, 2);
// Reset to just after name capture (step 1) — keep their name, clear everything else
users[userId].setupStep = 1;
users[userId].setupComplete = false;
users[userId].profile = { name: users[userId].profile && users[userId].profile.name || '' };
delete users[userId].awaitingCategoryPick;

fs.writeFileSync(path, JSON.stringify(users, null, 2));
console.log('Reset user', userId, '— name preserved:', users[userId].profile.name);
console.log('They will now be asked: "What should I call myself?"');
