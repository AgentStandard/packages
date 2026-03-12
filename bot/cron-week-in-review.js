/**
 * Week in Review — Sunday cron
 * Runs every Sunday at 6pm London time
 * Sends a proactive check-in to users with packageSlug === 'week-in-review'
 * 
 * Deploy: copy to /root/bot/ on DO server
 * Add to crontab: 0 18 * * 0 node /root/bot/cron-week-in-review.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const fs = require('fs');
const path = require('path');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DATA_FILE = path.join(__dirname, 'data', 'users.json');

if (!BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN not set');
  process.exit(1);
}

async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  });
  return res.json();
}

async function main() {
  let users = {};
  try {
    users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    console.error('Could not read users.json:', e.message);
    process.exit(1);
  }

  const weekReviewUsers = Object.entries(users).filter(([, u]) =>
    u.setupComplete &&
    u.profile &&
    u.profile.packageSlug === 'week-in-review'
  );

  console.log(`Week in Review cron: ${weekReviewUsers.length} users to ping`);

  const agentName = 'your agent'; // will be personalised below
  let sent = 0;
  let failed = 0;

  for (const [userId, user] of weekReviewUsers) {
    const name = user.profile.name || 'there';
    const agent = user.profile.agentName || 'I';
    const goal = user.profile.goal;

    const goalLine = goal
      ? `\n\nYour 90-day goal: _"${goal}"_ — worth keeping in mind as we close out this week.`
      : '';

    const message =
      `Hey ${name} — it's Sunday.\n\n` +
      `${agent} here. Ready for your weekly review whenever you are.${goalLine}\n\n` +
      `Just send me a message to kick it off. We'll go through what happened, what slipped, and what matters next week.\n\n` +
      `_(This is an automated Sunday check-in from your Week in Review agent)_`;

    try {
      const result = await sendMessage(userId, message);
      if (result.ok) {
        sent++;
        console.log(`Sent to ${userId} (${name})`);
      } else {
        failed++;
        console.warn(`Failed for ${userId}: ${result.description}`);
      }
    } catch (e) {
      failed++;
      console.error(`Error for ${userId}: ${e.message}`);
    }

    // Rate limit: 1 message per second
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`Done. Sent: ${sent}, Failed: ${failed}`);
}

main().catch(console.error);
