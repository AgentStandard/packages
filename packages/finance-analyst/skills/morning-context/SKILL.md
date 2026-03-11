---
name: morning-context
description: Assembles a complete morning context package — live market data, inbox flags, and credit news — before the Meridian briefing runs. Use at the start of any morning session or when a full market context snapshot is needed.
---

# Morning Context Skill

## When to Use
- First thing each morning before Meridian delivers the briefing
- Any time Jackson needs a full current-state snapshot
- Before a Griffin analysis or Atlas review (provides live data backdrop)

## Assembly Sequence

### 1. Market Snapshot (financial-data skill)
Fetch from terminal server (http://127.0.0.1:7842):
- `/api/snapshot` → rates curve + IG/HY/BBB OAS from FRED
- `/api/etf` → ETF radar (LQDH, HYG, LQD, JNK, ANGL, BKLN)
- `/api/news` → Perplexity credit headlines (30-min cache)

Derive:
- Regime assessment (1–4 based on IG OAS)
- Rate vs spread decomposition (LQD vs LQDH)
- Fallen angel signal (ANGL vs HYG basis)
- Risk appetite (HYG/LQD ratio)

### 2. Overnight Moves
Use web_search to check:
- S&P 500 / NASDAQ futures (pre-market)
- USD/EUR, USD/GBP
- 10yr Treasury yield vs prior close
- Oil (Brent) — especially relevant given current Hormuz disruption
- VIX vs prior close

### 3. Inbox Scan (Harper)
Run: `node C:\Users\jacks\.openclaw\workspace\scripts\gmail-check.mjs --limit 10 --unread-only`
Flag:
- Anything from Harriet (Balyasny)
- Recruiter outreach
- Time-sensitive items

### 4. Calendar Check (once Google Calendar is connected)
- Events today
- Events in next 48 hours
- Any prep needed

### 5. Geopolitical/Macro Watch
One web_search for overnight geopolitical/macro developments that affect credit:
- Any central bank commentary
- Geopolitical escalation/de-escalation (especially Iran/Hormuz)
- Earnings surprises with credit implications

## Output Format

```
MORNING CONTEXT — [DATE] [TIME]

REGIME: [1/2/3/4] — [label] | IG OAS: [X]bps | HY OAS: [X]bps
RATES: 2yr [X]% | 10yr [X]% | 2s10s [X]bps | [steepening/flattening]
SIGNAL: [Rate vs spread decomposition — one sentence]
VIX: [X] ([±X]% overnight)
OIL: Brent [X] ([±X]% overnight)

KEY CREDIT MOVES:
- [Most important single-name or sector move]
- [Second most important]

INBOX: [CLEAR / X unread flags — list them]
CALENDAR: [Nothing today / Events: list]

MACRO WATCH: [One sentence on most important overnight development]
```

## Quality Check
Before passing context to Meridian or Griffin:
- Is IG OAS data from today or yesterday? (FRED is T+1 — flag if stale)
- Is there a market-moving event that makes the FRED data misleading?
- Are ETF prices from current session or prior close?
