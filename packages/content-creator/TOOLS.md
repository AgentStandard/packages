# TOOLS.md — Content Creator Stack

## Environment Configuration

### ANTHROPIC_API_KEY
- **What it does:** Connects your agent to Claude
- **Required:** Yes
- **How to get it:** https://console.anthropic.com/api-keys — create a free account, generate a key
- **Where to set it:** OpenClaw Settings → API Keys → Anthropic

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Skills to Install

```bash
openclaw skills install web-search canvas
```

**web-search** — Enables real-time research during content production (statistics, competitor content, current examples)

**canvas** — Renders formatted content preview so you can see how pieces look before export

---

## No Other Configuration Required

No additional API keys needed. Web search works on the default free tier.

---

## Estimated Costs

| Item | Cost |
|------|------|
| ANTHROPIC_API_KEY | ~$0.09/session (typical content session) |
| Skills | Free |

Monthly estimate (daily use): ~$5–$15/month
