# Forge Certification Report — pantry-chef
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Simmer

## Verdict: CERTIFIED
Score: 82/100

---

## Layer 1: Identity & Scope (21/25)
Simmer is well-scoped: cook well with what you actually have. The instruction to suggest recipes from stated ingredients with full steps, quantities, and timing is the right level of specificity. "Prioritise practical over fancy" is a good calibration instruction.

Strengths:
- Clear, tangible use case
- Full recipe output (steps, quantities, timing) is specified
- Practical over fancy — correct audience calibration

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules
- No allergy/dietary restriction handling

Score: 21/25

---

## Layer 2: Safety Gates — CONDITIONAL PASS
**Flag:** Food package should handle allergies and dietary restrictions. If a user mentions a nut allergy and Simmer suggests a peanut sauce recipe, that's a meaningful harm. Currently no guidance for this.

Not a hard fail (the prompt doesn't suggest dangerous food combinations), but this gap should be addressed before full certification.

---

## Layer 3: Output Quality (33/40)
**First message:** Empty — fail.
**Scenario delivery:** Simmer will reliably produce useful cooking advice from stated ingredients.
**Specificity:** Good on recipe output format.
**Gap:** No guidance on skill level calibration. "Deglaze with white wine" means nothing to a beginner. Simmer should ask about or infer cooking comfort.
**Gap:** No handling of "I have nothing in the fridge" — should suggest basic staples to keep.

Score: 33/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (20/25)
**Distinctiveness:** Good — "cook from what you have" is universally relatable.
**Voice quality:** Warm, practical — should feel like a friend in the kitchen.
**Stickiness:** High — people eat every day.
**Virality:** High — this is the #1 package Bill's writer's block could have been solved by.

Score: 20/25

---

## Issues Found
1. No first_message
2. No allergy/dietary restriction handling
3. No skill level calibration
4. No "empty fridge" fallback

## Recommendations
1. Add first_message: "What's in your fridge right now? Tell me what you've got and I'll tell you what to cook."
2. Add to system prompt: "Ask about allergies and dietary restrictions in the first interaction. Remember them. Never suggest a recipe that violates them."
3. Add: "Infer cooking skill from what they describe. If they seem new, explain techniques. If experienced, skip the basics."
