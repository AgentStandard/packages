# AgentStandard — First Conversation Setup Bot

A zero-friction Telegram bot that lets users chat with Claude immediately — no downloads, no setup, no API key required for the first 10 messages.

## How It Works

1. User lands on agentstandard.ai and clicks "Try it on Telegram"
2. They start a conversation with the bot
3. **First 10 messages are free** (run on the platform's Anthropic key)
4. After 10 messages, the bot prompts them to paste their own Anthropic API key
5. Once their key is validated, they get unlimited messages

---

## Running Locally

### Prerequisites

- Node.js 18+
- An Anthropic API key ([console.anthropic.com/api-keys](https://console.anthropic.com/api-keys))
- A Telegram bot token (from [@BotFather](https://t.me/botfather))

### Setup

```bash
# 1. Clone / navigate to the bot directory
cd agentstandard/bot

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env

# 4. Edit .env with your real values
nano .env
# Set TELEGRAM_BOT_TOKEN and ANTHROPIC_API_KEY

# 5. Start the bot
npm start
```

You should see:
```
✅  AgentStandard bot started successfully
    Model: claude-haiku-3-5-20241022
    Free message limit: 10 per user
```

---

## Deploying to DigitalOcean ($6/mo Droplet)

### 1. Create a Droplet

- Go to [digitalocean.com](https://digitalocean.com) → Create → Droplets
- **Image:** Ubuntu 24.04 LTS
- **Size:** Basic → Regular → $6/mo (1 vCPU, 1GB RAM, 25GB SSD) — plenty for this workload
- **Region:** Pick closest to your users (e.g. London for EU)
- Add your SSH key or use a password
- Click **Create Droplet**

### 2. Connect & Install Node.js

```bash
ssh root@YOUR_DROPLET_IP

# Install Node.js 20 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2
```

### 3. Upload the Bot

From your local machine:

```bash
# Option A: rsync
rsync -avz --exclude node_modules --exclude .env --exclude data/ \
  ./agentstandard/bot/ root@YOUR_DROPLET_IP:/opt/agentstandard-bot/

# Option B: git clone (if repo is on GitHub)
# ssh root@YOUR_DROPLET_IP
# git clone https://github.com/yourname/agentstandard-bot /opt/agentstandard-bot
```

### 4. Set Environment Variables on the Server

```bash
ssh root@YOUR_DROPLET_IP
cd /opt/agentstandard-bot

# Install dependencies
npm install --production

# Create .env (never commit this)
cat > .env << 'EOF'
TELEGRAM_BOT_TOKEN=your_real_bot_token_here
ANTHROPIC_API_KEY=your_real_anthropic_key_here
EOF

chmod 600 .env
```

### 5. Start with PM2

```bash
cd /opt/agentstandard-bot

# Start the bot
pm2 start index.js --name agentstandard-bot

# Save the PM2 process list (survives reboots)
pm2 save

# Set PM2 to start on boot
pm2 startup
# Follow the printed command (copy-paste the sudo command it gives you)
```

### 6. Useful PM2 Commands

```bash
pm2 status                    # Check if bot is running
pm2 logs agentstandard-bot    # View live logs
pm2 restart agentstandard-bot # Restart after code changes
pm2 stop agentstandard-bot    # Stop the bot
```

### 7. Updating the Bot

```bash
# Upload new files
rsync -avz --exclude node_modules --exclude .env --exclude data/ \
  ./agentstandard/bot/ root@YOUR_DROPLET_IP:/opt/agentstandard-bot/

# Restart
ssh root@YOUR_DROPLET_IP "pm2 restart agentstandard-bot"
```

---

## File Structure

```
agentstandard/bot/
  index.js          — main bot logic
  package.json      — dependencies
  .env.example      — environment variable template
  .env              — your real keys (gitignored)
  .gitignore
  README.md
  data/
    users.json      — user state: message count, API keys, history (gitignored)
```

---

## Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Begin a fresh conversation |
| `/reset` | Clear conversation history |
| `/status` | Check free messages remaining / key status |

---

## Configuration

Edit these constants in `index.js` to change behaviour:

| Constant | Default | Description |
|----------|---------|-------------|
| `MODEL` | `claude-haiku-3-5-20241022` | Claude model to use |
| `FREE_MESSAGE_LIMIT` | `10` | Free messages per user on platform key |
| `MAX_HISTORY` | `20` | Message history kept per user |

---

## Notes

- User data (API keys, conversation history) is stored in `data/users.json`. Back this file up periodically.
- For production scale, replace the JSON file store with Redis or a proper database.
- The bot uses long polling (no webhook required) — works fine on a $6/mo droplet.
