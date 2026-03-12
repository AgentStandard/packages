# TOOLS.md — Ecommerce Strategy Stack

## Environment Configuration

### ANTHROPIC_API_KEY
- **What it does:** Connects your agent to Claude
- **Required:** Yes
- **How to get it:** https://console.anthropic.com/api-keys
- **Where to set it:** OpenClaw Settings → API Keys → Anthropic

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## Skills to Install

```bash
openclaw skills install web-search
```

**web-search** — Powers competitor pricing research, market trend analysis, and live product research

---

## Context to Give Your Agent on Day 1

```
My store sells: [describe your products]
My platform is: [Shopify / Amazon / Etsy / WooCommerce / other]
My top 2-3 competitors by name or URL: [list them]
My average selling price: [£/$/€ X]
My customer in one sentence: [describe]
```

---

## Estimated Costs

| Item | Cost |
|------|------|
| ANTHROPIC_API_KEY | ~$0.06/session |
| Skills | Free |
