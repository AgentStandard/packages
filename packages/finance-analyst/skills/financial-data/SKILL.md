---
name: financial-data
description: Pull live and historical financial market data for credit, rates, equities, and FX. Use when you need current CDX levels, IG/HY OAS spreads, ETF prices, macro rates data, or credit market news. Wraps FRED API, Yahoo Finance, and Perplexity Finance into a unified data layer.
---

# Financial Data Skill

## Data Sources Available

### 1. FRED API (T+1 lag, free, reliable)
Base URL: `https://api.stlouisfed.org/fred/series/observations`
API Key: `fbaec0b64f48b4a85f06f3bc66c5de4a` (public FRED key)

Key series IDs:
| Series | ID | Description |
|--------|-----|-------------|
| US IG OAS | BAMLC0A0CM | ICE BofA US Corp OAS (bps ×100) |
| US HY OAS | BAMLH0A0HYM2 | ICE BofA US HY OAS |
| BBB OAS | BAMLC0A4CBBB | ICE BofA BBB OAS |
| Euro IG OAS | BAMLHE00EHY0 | ICE BofA Euro IG OAS |
| Euro HY OAS | BAMLHYH0A0HYM2 | ICE BofA Euro HY OAS |
| UST 2yr | DGS2 | 2-year Treasury yield |
| UST 10yr | DGS10 | 10-year Treasury yield |
| UST 30yr | DGS30 | 30-year Treasury yield |
| VIX | VIXCLS | CBOE VIX |

Fetch example (last 5 observations):
```
https://api.stlouisfed.org/fred/series/observations?series_id=BAMLC0A0CM&api_key=fbaec0b64f48b4a85f06f3bc66c5de4a&limit=5&sort_order=desc&file_type=json
```

### 2. Yahoo Finance (real-time during market hours, free)
Use web_fetch on Yahoo Finance pages or the terminal's ETF radar.

Key tickers for credit proxy:
| Ticker | Description |
|--------|-------------|
| HYG | iShares iBoxx HY Corp Bond ETF |
| LQD | iShares iBoxx IG Corp Bond ETF |
| LQDH | Interest Rate Hedged IG Corp (cleanest spread signal) |
| JNK | SPDR Bloomberg HY Bond ETF |
| ANGL | VanEck Fallen Angel HY ETF |
| BKLN | Invesco Senior Loan ETF |
| SJNK | SPDR Short-Term HY ETF |
| VCSH | Vanguard Short-Term Corp Bond ETF |
| VCIT | Vanguard Intermediate Corp Bond ETF |
| VCLT | Vanguard Long-Term Corp Bond ETF |
| HYDB | iShares Edge HY Dynamic Bond ETF |
| EMB | iShares JP Morgan EM Bond ETF |
| HYG/LQD ratio | Derived: risk appetite signal |

### 3. Terminal Dashboard (localhost:7842)
Running server at http://127.0.0.1:7842
- `/api/snapshot` — full rates + credit snapshot from FRED
- `/api/etf` — live ETF data via Yahoo Finance
- `/api/news` — Perplexity credit market news (30-min cache)
- `/api/bloomberg` (POST) — manual CDX input

### 4. Bloomberg Manual Cache (CDX levels — update from terminal when available)
Current cached levels (update these when at Bloomberg terminal):
- CDX IG 5yr: 54.70 bps (2026-03-02)
- CDX HY 5yr: check Bloomberg `CDX NA HY` 
- iTraxx EUR IG: check Bloomberg `ITRX EUROPE`

### 5. Perplexity Finance (real-time news + context)
Use web_search with financial query for live market context.
Or call /api/news on the terminal for structured credit headlines.

## How to Use This Skill

### Quick snapshot (for briefings)
```
Fetch http://127.0.0.1:7842/api/snapshot for rates/credit levels
Fetch http://127.0.0.1:7842/api/etf for ETF radar
Fetch http://127.0.0.1:7842/api/news for credit headlines
```

### Deep data pull (for Griffin analysis)
1. Fetch FRED for historical OAS series
2. Pull Yahoo Finance for ETF proxies
3. Use web_search for current CDX and single-name levels
4. Cross-reference with Perplexity Finance for context

### Regime Assessment
| IG OAS Level | Regime | Interpretation |
|-------------|--------|----------------|
| < 80 bps | 1 — Tight | Compressed spreads, carry-dominant |
| 80–110 bps | 2 — Normal | Balanced risk/carry |
| 110–140 bps | 3 — Elevated | Risk-off developing |
| > 140 bps | 4 — Stress | Full risk-off, opportunistic entry zone |

### Rate/Spread Decomposition (key signal)
Compare LQD (unhedged IG) vs LQDH (rate-hedged IG):
- If LQD wider but LQDH flat → rate-driven selloff (not a credit event)
- If both wider → genuine credit spread widening (more significant)
- If LQDH wider but LQD flat → spread widening with rate offset (watch carefully)
