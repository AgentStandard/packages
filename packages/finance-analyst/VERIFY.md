# VERIFY.md — Finance Analyst Stack

## Test Prompts

Run these three prompts after setup to verify the package is working correctly.

**Test 1 — Morning Briefing**
> "Give me a morning credit markets briefing. Pull live OAS spreads, tell me the current regime, and flag anything in the overnight news that matters for credit."

**Test 2 — Credit Analysis**
> "Run a full Griffin credit analysis on US investment grade credit broadly. What regime are we in, what does the macro backdrop look like, and what's the highest-conviction trade right now?"

**Test 3 — Trade Review**
> "I'm looking at going long HYG. Before I put it on, run the Atlas trade review — bear case first, then give me a sizing verdict."

---

## Expected Behaviour

**Test 1** should produce:
- A structured morning brief with IG OAS level and regime label (1-4)
- Rates snapshot (2yr, 10yr, 2s10s)
- At least 2 credit-relevant news items
- An ETF radar section (LQD, HYG, LQDH at minimum)

**Test 2** should produce:
- Four-lens framework (Macro, Micro/Flows, Fundamental, Technical)
- Actual spread levels or proxies (not "spreads are elevated" — specific numbers)
- A trade recommendation with instrument, entry, target, stop
- A conviction level (High/Medium/Low) with one-line rationale

**Test 3** should produce:
- Bear case BEFORE bull case
- Correlation assessment with existing positions
- One of four verdicts: SIZE IT / REDUCE IT / WAIT / KILL IT
- ROE estimate

---

## You Know It's Working When...

- [ ] Morning briefing includes a specific IG OAS number (e.g., "IG OAS: 87bps — Regime 2, Normal")
- [ ] Agent uses the Griffin four-lens framework structure without prompting
- [ ] Atlas review leads with bear case, not bull case
- [ ] All verdicts are specific (SIZE IT at 2% not "looks interesting")
- [ ] Agent flags when FRED data is T+1 and potentially stale
- [ ] If FRED API key is not configured, agent says so rather than silently using stale data

## Common Issues

**"I don't have live data"** → Check that FRED_API_KEY is configured in OpenClaw settings. The morning-context skill requires it for real OAS data.

**Generic market commentary** → Make sure the finance-analyst SOUL.md is loaded in your agent's workspace. The four-lens framework comes from there.

**No credit spreads in briefing** → Run `openclaw skills install financial-data morning-context` and verify both show as installed.
