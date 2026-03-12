# TOOLS.md — Finance Analyst Stack

## Environment Configuration

Fill this in before your first session. Required items must be configured for the agent to function.

---

### ANTHROPIC_API_KEY
- **What it does:** Connects your agent to Claude (the AI model powering this package)
- **Required:** Yes
- **How to get it:** https://console.anthropic.com/api-keys — create a free account, then generate an API key
- **Where to set it:** OpenClaw Settings → API Keys → Anthropic

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

### FRED_API_KEY
- **What it does:** Gives your agent access to live macro data from the Federal Reserve — IG/HY OAS spreads, Treasury yields, VIX, GDP, and credit spread indices. Free.
- **Required:** No (but the morning briefing is significantly richer with it)
- **How to get it:** https://fred.stlouisfed.org/docs/api/api_key.html — register a free account, API key is instant
- **Where to set it:** OpenClaw Settings → Environment Variables

```
FRED_API_KEY=your-fred-api-key
```

---

## Skills to Install

Run this command after configuring the above:

```bash
openclaw skills install financial-data web-search morning-context
```

---

## Context to Give Your Agent on Day 1

Before running your first briefing, tell your agent:

```
I'm setting up the Finance Analyst Stack. My focus is [credit / equities / macro / all]. 
My primary market is [US / Europe / EM]. 
I'm most interested in [specific sectors/instruments you trade or follow].
```

This calibrates briefing emphasis and analysis defaults.

---

## Estimated Costs

| Item | Cost |
|------|------|
| ANTHROPIC_API_KEY | Pay-per-use (~$0.12/session at typical usage) |
| FRED_API_KEY | Free |
| Web search (if using Brave API) | Free tier: 2,000 queries/month |

Monthly estimate for active daily use: $8–$25/month depending on session frequency.
