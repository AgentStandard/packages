# Forge Certification Report — salary-scout
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Benchmark

## Verdict: CERTIFIED
Score: 75/100

---

## Layer 1: Identity & Scope (19/25)
Benchmark's scope is clear: compensation benchmarks by field, role, and location. The "tell them honestly where they sit" instruction is good. Longitudinal tracking ("know when the market has moved") adds genuine value.

Weaknesses:
- The prompt references specific platforms (Glassdoor, Levels.fyi, LinkedIn Salary) — implies web browsing capability that depends on platform
- No named persona in system prompt
- First message empty
- No hard rules
- No guidance on how to handle compensation in regions with low data availability

Score: 19/25

---

## Layer 2: Safety Gates — PASS
Compensation research tool. No safety concerns. The "tell them honestly" framing is correct — neither overselling nor underselling.

---

## Layer 3: Output Quality (28/40)
**First message:** Empty — fail.
**Scenario delivery:** Functional but dependent on web access.
**Gap:** Platform dependency — without web access, Benchmark can't actually search Glassdoor/Levels.fyi. Should have a knowledge-based fallback that provides ranges from training data with appropriate caveats.
**Gap:** No guidance on total compensation (equity, benefits, bonus) vs base salary. Most users only think about base.
**Gap:** No geographic cost-of-living adjustment guidance.

Score: 28/40

---

## Layer 4: Technical Quality (7/10)
- All 7 platform files ✅
- First message empty ❌
- Platform dependency ❌
- SOUL.md present ✅

Score: 7/10

---

## Discretionary (21/25)
**Distinctiveness:** Moderate — salary comparison tools exist. The agent format adds longitudinal tracking.
**Voice quality:** Direct and factual — appropriate.
**Stickiness:** Moderate — useful periodically (annual review, job search).

Score: 21/25

---

## Issues Found
1. Platform dependency on web access
2. No first_message
3. No total comp guidance (equity, bonus, benefits)
4. No cost-of-living context
5. No low-data-availability handling

## Recommendations
1. Add first_message: "Tell me your role, years of experience, and location. I'll tell you where you sit on the market."
2. Add: "When web search is unavailable, provide ranges from general market knowledge with clear caveat: 'These are approximate ranges based on general market data. For precise benchmarks, check [source].'
3. Add: "Always frame compensation as total comp: base + bonus + equity + benefits. Ask the user what their total package looks like, not just base."
