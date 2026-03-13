# Forge Certification Report — bid-auditor
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Ledger

## Verdict: CERTIFIED
Score: 82/100

---

## Layer 1: Identity & Scope (22/25)
Ledger has a clearly defined, domain-specific job: protect the owner's budget by finding inflated or misaligned bid line items. The persona is functional rather than named (no "You are Ledger" framing — just a role description), but the scope is tight and the instructions are specific.

Strengths:
- Highly specific scope (line-item analysis, not general cost advice)
- Explicit instruction to be concrete ("not 'this seems high' but specific dollar/scope analysis")
- Hard rules section prevents generic output

Weaknesses:
- No persona name introduced in the prompt itself — Ledger is in the persona map but not anchored in the system prompt
- No credential disclaimer (this is cost estimation advice that could be relied upon for financial decisions)
- No handling of incomplete/unclear bids

Score: 22/25

---

## Layer 2: Safety Gates — CONDITIONAL PASS
This package operates in a financial advisory adjacent space. The output could be used to make significant financial decisions (challenging contractor invoices, withholding payment). No disclaimer present.

**Flag:** Add disclaimer noting that Ledger provides analytical support, not licensed quantity surveying or legal advice. Particularly important for payment disputes.

Not a hard fail — the prompt doesn't fabricate professional credentials. But this needs a disclaimer.

---

## Layer 3: Output Quality (34/40)
**First message:** Empty. Needs a cold-start prompt.
**Scenario delivery:** The specific example in the system prompt ("Line 12 — Electrical Rough-In is quoted at $85,000...") shows this is genuinely domain-competent. That level of specificity in the prompt generates specific output.
**Tone:** Correct — analytical, not alarmist. The instruction to flag "every line" is good, not just "suspicious" lines.
**Gap:** No guidance on what to do when the AI can't determine if a number is reasonable (insufficient market data for that geography/trade). Should be instructed to say "insufficient data to benchmark" rather than guessing.

Score: 34/40

---

## Layer 4: Technical Quality (7/10)
- All 7 platform files present ✅
- Persona name missing from system prompt itself ❌
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 7/10

---

## Discretionary (19/25)
**Distinctiveness:** Very high. Nico's use case (Miami property developer) is real and validated. No comparable package exists.
**Voice quality:** Functional, analytical — appropriate for the use case.
**Stickiness:** High within the niche. Anyone doing construction/renovation will return.
**Clarity of purpose:** Very high.

Score: 19/25

---

## Issues Found
1. No first_message defined
2. No disclaimer for financial/legal adjacent advice
3. Persona name not anchored in system prompt
4. No "insufficient data" handling

## Recommendations
1. Add disclaimer: "Ledger provides analytical support for budget review. It is not a licensed quantity surveyor, cost estimator, or legal advisor. Do not withhold payment or pursue disputes based solely on this analysis without professional review."
2. Add first_message: "Share your bid package, schedule of values, or line-item breakdown. I'll tell you exactly where the numbers don't match the scope."
3. Add to system prompt: "When you cannot determine whether a line item is reasonable due to insufficient market data, say so explicitly rather than guessing."
