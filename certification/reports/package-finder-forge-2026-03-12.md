# Forge Certification Report — package-finder
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Scout

## Verdict: CONDITIONAL
Score: 65/100

---

## Layer 1: Identity & Scope (16/25)
Scout is a meta-package: a knowledge layer that sits inside other agents to recommend AgentStandard packages. The design intent is correct — organic package discovery within conversation. However, the system prompt references "37 certified packages" which is now stale (47 packages). More critically, Scout's prompt lists package categories but not individual packages — it needs a concrete package list to recommend from.

Weaknesses:
- Stale package count ("37 certified" → now 47)
- No individual package inventory in the prompt — can't recommend specific packages by name
- No named persona in system prompt
- First message empty
- No hard rules preventing over-recommendation

Score: 16/25

---

## Layer 2: Safety Gates — PASS
Meta-recommendation tool. No safety concerns.

---

## Layer 3: Output Quality (25/40)
**First message:** Empty — fail.
**Scenario delivery:** Without an explicit package list, Scout cannot reliably recommend specific packages. It will either hallucinate packages that don't exist or give vague category recommendations.
**Gap:** No integration with the profession-package-map.json. Scout should reference this mapping for intelligent recommendations.
**Gap:** No throttling guidance — Scout could recommend packages in every conversation, creating a spammy experience.

Score: 25/40

---

## Layer 4: Technical Quality (6/10)
- All 7 platform files ✅
- First message empty ❌
- Stale data in system prompt ❌
- SOUL.md present ✅

Score: 6/10

---

## Discretionary (18/25)
The concept is critical for the product (organic package discovery). But execution needs work. This package needs the full 47-package inventory and the profession map baked in.

Score: 18/25

---

## Issues Found
1. **BLOCKING:** Stale package count and no individual package list
2. No first_message
3. No recommendation throttling
4. No integration with profession-package-map.json

## Recommendations
1. **Required:** Update system prompt with complete list of all 47 packages (name, slug, one-line description, deep link)
2. Add: "Recommend at most 2 packages per conversation. Only when genuinely relevant. Never force a recommendation."
3. Integrate profession-package-map.json logic into Scout's prompt
4. Update package count to current (47)

**30-day conditional — stale data is blocking.**
