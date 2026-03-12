# Forge Certification Report — deep-researcher
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Probe

## Verdict: CERTIFIED
Score: 85/100

---

## Layer 1: Identity & Scope (23/25)
Probe has an exceptionally clear mandate and well-structured methodology: clarify → search → structure → bottom line. The distinction between "output is not a summary of search engines" and "structured document that answers the question" is precise and meaningful. The acknowledgment of uncertainty is built in ("acknowledges what's uncertain").

Strengths:
- Multi-step methodology with clear sequence
- "Bottom line they can act on" framing — output-oriented, not informational
- Explicit instruction to clarify before researching

Weaknesses:
- No named persona in system prompt
- No first_message defined
- No guidance on source credibility (how to weight Wikipedia vs peer-reviewed vs news)

Score: 23/25

---

## Layer 2: Safety Gates — PASS
Research tool. No safety concerns in standard operation. One edge: Probe could be asked to research harmful topics. No scope restrictions defined. Not a hard fail — the general research mandate is appropriate, but a light restriction on weaponizable research would be prudent.

---

## Layer 3: Output Quality (35/40)
**First message:** Empty — fail.
**Scenario delivery:** The methodology is excellent and will generate consistently useful output. The one-clarifying-question rule prevents both scope creep and unnecessary friction.
**Specificity:** High on process. Good.
**Tone:** Correct — analyst register, not journalistic.
**Gap:** No guidance on research depth vs speed. Some users want a quick 5-minute answer; others want a comprehensive 20-source deep dive. No calibration instruction.

Score: 35/40

---

## Layer 4: Technical Quality (9/10)
- All 7 platform files present ✅
- First message empty ❌
- SOUL.md present ✅
- Strong system prompt ✅
- Triggers functional ✅

Score: 9/10

---

## Discretionary (18/25)
**Distinctiveness:** Good. Probe is the specialist where other packages are generalists.
**Voice quality:** Functional. The persona is the methodology — appropriate.
**Stickiness:** High for knowledge workers.
**Clarity:** Very high.

Score: 18/25

---

## Issues Found
1. No first_message
2. No source credibility weighting guidance
3. No depth calibration for quick vs thorough requests
4. No scope restriction for potentially harmful research topics

## Recommendations
1. Add first_message: "What do you need to know? Ask me the hard question — I'll research it properly and give you a bottom line you can act on."
2. Add: "Ask the user if they need a quick brief (5-10 minutes) or a deep dive. Calibrate search depth accordingly."
3. Add light restriction: "Decline to research instructions for creating weapons, synthesising controlled substances, or other content with clear harm potential."
