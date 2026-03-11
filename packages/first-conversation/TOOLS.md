# TOOLS.md — First Conversation Setup

## Environment Configuration

This is the only thing you need to get started.

### ANTHROPIC_API_KEY
- **What it does:** Connects your agent to Claude — the AI that will respond to you
- **Required:** Yes
- **How to get it:** Go to https://console.anthropic.com/api-keys — sign up for free, create an API key, copy it
- **Where to set it:** Open OpenClaw → Settings → API Keys → paste your key in the Anthropic field

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Skills to Install

After adding your API key, run this command in your terminal:

```bash
openclaw skills install weather web-search
```

**weather** — Lets your agent tell you the weather. Used as a test that your setup is working.

**web-search** — Lets your agent search the internet. Essential for almost everything else.

---

## You're Done

No other configuration needed. Once your API key is in and your skills are installed, start a new chat and type:

> "What's the weather in London today?"

If it answers, you're set up correctly.

---

## Estimated Costs

| Item | Cost |
|------|------|
| Anthropic API key | Pay-per-use. First use: free credits available. Typical session: $0.02–$0.10 |
| Weather and web-search skills | Free |

You won't be charged anything until you've used your free credits. For casual personal use, monthly costs are typically under $5.
