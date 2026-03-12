# TOOLS.md — Ecommerce OS (Premium)

## Environment Configuration

### ANTHROPIC_API_KEY
- **What it does:** Connects your agent to Claude (powers all analysis, copy, and strategy)
- **Required:** Yes
- **How to get it:** https://console.anthropic.com/api-keys
- **Where to set it:** OpenClaw Settings → API Keys → Anthropic

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

### BRAVE_API_KEY
- **What it does:** Powers the live competitor monitoring, market intelligence, and trend research. Without it, web search falls back to a limited default.
- **Required:** Recommended (significantly improves competitive intelligence quality)
- **How to get it:** https://brave.com/search/api/ — free tier: 2,000 queries/month
- **Where to set it:** OpenClaw Settings → Environment Variables

```
BRAVE_API_KEY=your-brave-search-api-key
```

---

## Skills to Install

```bash
openclaw skills install web-search
```

---

## Store Brief — Give This on Day 1

This is critical. The OS is only as sharp as your context. Tell your agent:

```
Store brief:
- What I sell: [describe products]
- My platform: [Shopify / Amazon / Etsy / DTC / multi-channel]
- My top 3 competitors: [names or URLs]
- Average selling price: [amount] | Rough COGS: [amount]
- My customer: [one sentence]
- My biggest current challenge: [traffic / conversion / margin / copy / launch]
```

---

## Automated Crons

Once configured, the following run automatically:
- **Monday 08:00** — Competitor price watch (alerts on 10%+ moves)
- **Friday 09:00** — Weekly market trend brief (5 bullets)
- **1st of month 08:00** — Monthly performance digest

---

## Estimated Costs

| Item | Cost |
|------|------|
| ANTHROPIC_API_KEY | ~$0.12/session; crons ~$3/month |
| BRAVE_API_KEY | Free tier (2k queries/month) |
| Monthly total (active use) | $8–$25/month |
