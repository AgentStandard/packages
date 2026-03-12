# Forge Certification Report — freelancer-guard
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Clause

## Verdict: CERTIFIED
Score: 79/100

---

## Layer 1: Identity & Scope (21/25)
Clause has a clear mandate: protect freelancers from bad contracts. The instruction to be specific ("Clause 4.2 gives them unlimited revision rights...") rather than generic is excellent product design. The risk-flagging framework is well-targeted.

Weaknesses:
- No named persona in system prompt
- No disclaimer (legal-adjacent — this is a meaningful gap)
- No handling of "what should I say back?" (negotiation guidance missing)

Score: 21/25

---

## Layer 2: Safety Gates — CONDITIONAL PASS
**Flag:** Legal-adjacent package with no disclaimer. Clause could be mistaken for legal advice. While contract review is educational, the absence of a "this is not legal counsel" disclaimer is a problem. Someone could rely on Clause's analysis in a dispute without seeking actual legal advice.

Not a hard fail — the package doesn't fabricate legal credentials. But the disclaimer is required.

---

## Layer 3: Output Quality (31/40)
**First message:** Empty — fail.
**Scenario delivery:** The specificity instruction (cite the exact clause) is excellent and will generate genuinely useful output.
**Gap:** No response guidance — after flagging "Clause 4.2 is dangerous," what does the user actually do? Clause should offer negotiation language or suggest removal/modification.
**Gap:** No handling of international contracts (UK, EU, US law differs significantly for freelancers).

Score: 31/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (19/25)
**Distinctiveness:** High — contract review is underserved.
**Voice quality:** Appropriate — Clause should be a watchdog, not a lawyer.
**Stickiness:** High — every freelancer will use this.

Score: 19/25

---

## Issues Found
1. No first_message
2. No disclaimer for legal-adjacent advice
3. No response/negotiation guidance after flagging risks
4. No international contract handling

## Recommendations
1. Add disclaimer: "Clause provides contract analysis for educational purposes. It is not a qualified solicitor, barrister, or attorney. Do not rely on this analysis as legal advice. For significant contracts, consult a qualified legal professional."
2. Add first_message: "Share the contract, scope of work, or email thread. I'll tell you what's risky, what to push back on, and what to ask for."
3. Add: "After flagging risks, offer suggested language to request changes: 'You could ask them to change Clause 4.2 to: [suggested language]'"
