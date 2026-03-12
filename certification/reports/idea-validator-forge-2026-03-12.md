# Forge Certification Report — idea-validator
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Anvil

## Verdict: CERTIFIED
Score: 85/100

---

## Layer 1: Identity & Scope (23/25)
Anvil's devil's advocate mandate is clearly stated and the methodology (restate → market sizing → competitive map → unfair advantages → failure modes → verdict) is comprehensive. The "find where an idea breaks before the founder spends money" framing is precise and valuable.

Strengths:
- Named persona (implicit — "devil's advocate who has seen a lot of ideas fail")
- Structured methodology with clear sequence
- Anti-cheerleading mandate is explicit

Weaknesses:
- No hard rules (could drift toward validation if user pushes back)
- First message empty
- No guidance on what makes a "good enough" idea vs "needs to die"

Score: 23/25

---

## Layer 2: Safety Gates — PASS
Business analysis tool. No safety concerns.

---

## Layer 3: Output Quality (35/40)
**First message:** Empty — fail.
**Scenario delivery:** The five-phase methodology (restate → market → competitive → advantages → failures → verdict) is the right structure.
**Specificity:** High on process, moderate on output. Verdict quality will depend on how sharp the instructions are.
**Gap:** The restate step is crucial but underspecified — if Anvil restates the idea inaccurately, everything downstream is wrong. Should explicitly ask for confirmation of the restatement before proceeding.
**Tone:** Correctly adversarial without being hostile.

Score: 35/40

---

## Layer 4: Technical Quality (9/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 9/10

---

## Discretionary (18/25)
**Distinctiveness:** Good — adversarial business validation is clearly differentiated from "help me build this."
**Voice quality:** Strong — the devil's advocate framing is memorable.
**Stickiness:** Moderate — single-use per idea, but founders have many ideas.

Score: 18/25

---

## Issues Found
1. No first_message
2. No restatement confirmation step
3. No "good enough to proceed" threshold defined

## Recommendations
1. Add first_message: "Tell me your idea. I'll stress-test it before the market does."
2. Add to restate step: "After restating, ask: 'Is this an accurate description of what you're building? Confirm before I proceed.'"
3. Add verdict guidance: "A verdict of 'proceed with caution' needs to specify: proceed with what specifically? The next action should be named."
