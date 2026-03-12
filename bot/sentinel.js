/**
 * Sentinel — AgentStandard Watchdog
 * Runs every 5 minutes via PM2 cron mode
 * Checks: bot health, disk, memory
 * Alerts: Jackson via Telegram if anything is wrong
 * Auto-restarts: bot if crashed
 */

// Sentinel uses its own env — alerts go via Aspera bot, NOT AgentStandard bot
// AgentStandard bot token is user-facing only; system alerts must not appear there
require('dotenv').config({ path: '/root/bot/.sentinel.env' });
const { execSync } = require('child_process');
const https = require('https');

const TELEGRAM_BOT_TOKEN = process.env.ASPERA_BOT_TOKEN;
const JACKSON_CHAT_ID = process.env.JACKSON_CHAT_ID || '2127667170';
const BOT_NAME = 'agentstandard-bot';
const LOG_FILE = '/root/bot/logs/sentinel.log';
const INCIDENT_FILE = '/root/bot/logs/incidents.log';

const fs = require('fs');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  try {
    fs.mkdirSync('/root/bot/logs', { recursive: true });
    fs.appendFileSync(LOG_FILE, line + '\n');
  } catch (e) {}
}

function logIncident(msg) {
  const line = `[${new Date().toISOString()}] INCIDENT: ${msg}`;
  try {
    fs.mkdirSync('/root/bot/logs', { recursive: true });
    fs.appendFileSync(INCIDENT_FILE, line + '\n');
  } catch (e) {}
}

function sendTelegram(message) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ chat_id: JACKSON_CHAT_ID, text: `🛡️ Sentinel: ${message}` });
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    const req = https.request(options, (res) => resolve(res.statusCode));
    req.on('error', (e) => { log(`Telegram alert failed: ${e.message}`); resolve(null); });
    req.write(body);
    req.end();
  });
}

function getPM2Status() {
  try {
    const output = execSync('pm2 jlist', { encoding: 'utf8' });
    return JSON.parse(output);
  } catch (e) {
    return null;
  }
}

function restartBot() {
  try {
    execSync(`pm2 restart ${BOT_NAME}`, { encoding: 'utf8' });
    return true;
  } catch (e) {
    return false;
  }
}

function getDiskUsage() {
  try {
    const output = execSync("df -h / | tail -1 | awk '{print $5}'", { encoding: 'utf8' });
    return parseInt(output.trim().replace('%', ''));
  } catch (e) { return null; }
}

function getMemoryUsage() {
  try {
    const output = execSync("free | grep Mem | awk '{print int($3/$2 * 100)}'", { encoding: 'utf8' });
    return parseInt(output.trim());
  } catch (e) { return null; }
}

async function run() {
  log('Sentinel check starting...');
  const alerts = [];

  // 1. Check bot PM2 status
  const processes = getPM2Status();
  if (!processes) {
    alerts.push('⚠️ PM2 not responding — cannot check bot status');
    logIncident('PM2 not responding');
  } else {
    const bot = processes.find(p => p.name === BOT_NAME);
    if (!bot) {
      alerts.push(`⚠️ ${BOT_NAME} not found in PM2`);
      logIncident(`${BOT_NAME} missing from PM2`);
    } else if (bot.pm2_env.status !== 'online') {
      const status = bot.pm2_env.status;
      const restarts = bot.pm2_env.restart_time;
      logIncident(`${BOT_NAME} status: ${status}, restarts: ${restarts}`);
      log(`Bot status: ${status}. Attempting restart...`);
      const restarted = restartBot();
      if (restarted) {
        alerts.push(`⚠️ Bot was ${status} (${restarts} restarts). Auto-restarted ✅`);
        log('Bot restarted successfully');
      } else {
        alerts.push(`🚨 Bot is ${status} and restart FAILED. Manual intervention needed.`);
      }
    } else {
      const mem = Math.round(bot.monit.memory / 1024 / 1024);
      const restarts = bot.pm2_env.restart_time;
      log(`Bot OK — online, ${mem}MB, ${restarts} total restarts`);
      if (restarts > 60) {
        alerts.push(`ℹ️ Bot restart count is high (${restarts}) — worth checking logs`);
      }
    }
  }

  // 2. Check disk
  const disk = getDiskUsage();
  if (disk !== null) {
    log(`Disk: ${disk}%`);
    if (disk > 85) {
      alerts.push(`⚠️ Disk usage at ${disk}% — getting full`);
      logIncident(`Disk at ${disk}%`);
    }
  }

  // 3. Check memory
  const mem = getMemoryUsage();
  if (mem !== null) {
    log(`Memory: ${mem}%`);
    if (mem > 90) {
      alerts.push(`⚠️ Memory at ${mem}% — running hot`);
      logIncident(`Memory at ${mem}%`);
    }
  }

  // Send alerts if any
  if (alerts.length > 0) {
    const msg = alerts.join('\n');
    log(`Sending ${alerts.length} alert(s) to Jackson`);
    await sendTelegram(msg);
  } else {
    log('All clear. No alerts.');
  }

  log('Sentinel check complete.\n');
}

run().catch(e => {
  log(`Sentinel error: ${e.message}`);
  sendTelegram(`🚨 Sentinel itself crashed: ${e.message}`);
});
