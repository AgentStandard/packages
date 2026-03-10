# AgentStandard Bot — Deploy SOP

## Server
- **IP:** 64.227.34.11 (DigitalOcean London, $6/mo)
- **SSH key:** `workspace/agentstandard/bot/do_deploy_key`
- **Bot dir:** `/root/bot/`
- **Config:** `/root/bot/.env`
- **PM2 process:** `agentstandard-bot` (id 0)

---

## Standard Deploy (code change)

```powershell
# 1. Make changes locally to workspace/agentstandard/bot/index.js
# 2. scp to server
scp -i workspace/agentstandard/bot/do_deploy_key root@64.227.34.11:/root/bot/index.js

# 3. Restart bot (--update-env picks up any .env changes)
ssh -i workspace/agentstandard/bot/do_deploy_key root@64.227.34.11 "pm2 restart agentstandard-bot --update-env"

# 4. Commit to repo
cd workspace/agentstandard
git add bot/index.js
git commit -m "describe change"
git push
```

---

## ⚠️ Model Name Updates — ALWAYS DO THIS

**Previous issue:** Model name was hardcoded in `index.js`. When Anthropic deprecates a model alias, the bot silently fails or uses wrong model.

**Fix (already implemented):** Model is now read from `.env`:
```
ANTHROPIC_MODEL=claude-haiku-3-5-20241022
```

### When Anthropic releases a new model / deprecates an old one:

1. **Update `.env` on server:**
   ```bash
   ssh root@64.227.34.11 "sed -i 's/ANTHROPIC_MODEL=.*/ANTHROPIC_MODEL=NEW_MODEL_NAME/' /root/bot/.env"
   ```

2. **Restart with `--update-env`** (critical — without this PM2 won't pick up .env changes):
   ```bash
   ssh root@64.227.34.11 "pm2 restart agentstandard-bot --update-env"
   ```

3. **Update the fallback in `index.js`** too (line ~12) so local dev and fresh deploys are correct:
   ```js
   const MODEL = process.env.ANTHROPIC_MODEL || 'NEW_MODEL_NAME';
   ```

4. **Commit the fallback change** to the repo.

5. **Check the admin and API processes** — if they use models, check `/root/bot/admin-api.js` and `/root/bot/agent-api.js` for hardcoded model names too.

### Current model names (update this table when they change):
| Tier | Current name | Notes |
|------|-------------|-------|
| Haiku (fast/cheap) | `claude-haiku-4-5-20251001` | Default for AgentStandard bot — API key is claude-4 tier only, no claude-3 access |
| Sonnet (balanced) | `claude-sonnet-4-6` | Used for Aspera main session |
| Opus (heavy) | `claude-opus-4-6` | Reserved for deep analysis only |

---

## Reset a User Session

Use when a user is stuck in onboarding:

```bash
# Copy reset script, run it, restart bot
scp -i do_deploy_key reset-user.js root@64.227.34.11:/root/bot/reset-user.js
ssh root@64.227.34.11 "node /root/bot/reset-user.js <TELEGRAM_USER_ID>"
ssh root@64.227.34.11 "pm2 restart agentstandard-bot --update-env"
```

The script preserves their name and resets to step 1 (agent name question).

---

## Check Bot Health

```bash
ssh root@64.227.34.11 "pm2 list && pm2 logs agentstandard-bot --lines 20 --nostream"
```

---

## Notes
- `sentinel` process (pm2 id 2) is currently stopped — it was a cron monitor, not critical
- `agentstandard-admin` (id 3) and `agentstandard-api` (id 4) run separately — restarts are independent
- Always use `--update-env` on restart if `.env` was touched
