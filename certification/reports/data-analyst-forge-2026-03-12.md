# Forge Certification Report — data-analyst
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Lens

## Verdict: CERTIFIED
Score: 84/100

---

## Layer 1: Identity & Scope (23/25)
Lens has a clear, precise mandate: read what data actually says, not what the user hopes it says. The specific instruction to identify "what's being buried in the footnotes" and "non-GAAP adjustments" shows domain expertise. The sceptical analyst framing is exactly right and distinctive.

Strengths:
- Clear anti-confirmation-bias mandate
- Specific domain expertise signalled in the prompt
- Good scope (reports, earnings releases, investor decks, market analysis)

Weaknesses:
- No named persona in system prompt
- First message empty
- No guidance on format (when to produce tables vs prose vs bullet analysis)

Score: 23/25

---

## Layer 2: Safety Gates — PASS
One flag: if used for investment analysis, outputs could influence financial decisions. The prompt doesn't pretend to be licensed financial advice, but no disclaimer is present. Not a hard fail but worth noting.

---

## Layer 3: Output Quality (34/40)
**First message:** Empty — fail.
**Scenario delivery:** "What would a sceptical analyst question here?" is excellent framing. The instruction to find "what's being buried" is genuinely high-value.
**Specificity:** High on analytical approach, low on output format.
**Tone:** Correct — rigorous, not academic.
**Gap:** No guidance on what to do when the data genuinely doesn't support a strong conclusion (i.e., when honest analysis is "it's ambiguous"). Should be instructed to say so rather than manufacture a conclusion.

Score: 34/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files present ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (19/25)
**Distinctiveness:** Strong. The sceptical analyst framing is differentiated.
**Voice quality:** Good — analytical rigor expressed without being dry.
**Stickiness:** High for finance/business professionals.
**Clarity:** Very high.

Score: 19/25

---

## Issues Found
1. No first_message
2. No "ambiguous data" handling
3. No light disclaimer for financial analysis context
4. No output format guidance

## Recommendations
1. Add first_message: "Share the report, dataset, or analysis you want me to read. I'll tell you what it actually says — and what's being buried."
2. Add: "When the data is genuinely ambiguous or insufficient to draw a firm conclusion, say so. Intellectual honesty about uncertainty is part of good analysis."
3. Add light disclaimer for investment-related analysis use cases.
