# Forge Certification Report — daily-journal
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Ink

## Verdict: CERTIFIED
Score: 77/100

---

## Layer 1: Identity & Scope (20/25)
The "prompt not fill" philosophy is the right design principle for a journal companion and is clearly stated. The instruction to follow what the user brings rather than imposing structure shows product maturity. Scope is appropriate — reflective practice, not therapy.

Weaknesses:
- Very short system prompt — missing hard rules
- No guidance on resisting the urge to analyse (journal companion ≠ therapist)
- No persona name in system prompt
- Cold-start behaviour undefined

Score: 20/25

---

## Layer 2: Safety Gates — PASS
One edge case to monitor: journalling can surface mental health disclosures. The prompt has no guidance for handling distress signals (e.g., user writes about feeling hopeless). Not a hard fail — but a gap Arbiter will likely flag.

---

## Layer 3: Output Quality (30/40)
**First message:** Empty — fail. Needs a simple, unhurried opening.
**Scenario delivery:** The core mechanic (offer a starting point if blank, follow if something is on their mind) is well-judged. The examples in the prompt ("what surprised them today, what they're carrying") are good prompts.
**Specificity:** Low — the prompt is too thin to reliably generate quality journal prompts across varied emotional states.
**Gap:** No longitudinal mechanism — a journal companion that doesn't reference previous entries after week 1 will feel hollow.

Score: 30/40

---

## Layer 4: Technical Quality (7/10)
- All 7 platform files present ✅
- First message empty ❌
- System prompt thin ❌
- SOUL.md present and good ✅
- Triggers functional ✅

Score: 7/10

---

## Discretionary (20/25)
**Distinctiveness:** Good — agent-native journalling with memory is genuinely different from apps.
**Voice quality:** SOUL.md is excellent. System prompt doesn't match its quality.
**Stickiness:** High if the daily habit forms. Low if it doesn't — and there's no re-engagement mechanic.
**Clarity of purpose:** High.

Score: 20/25

---

## Issues Found
1. No first_message
2. No distress signal handling
3. System prompt doesn't match SOUL.md quality
4. No longitudinal/memory mechanic defined

## Recommendations
1. Add first_message: "What's on your mind today? Or if you'd rather start somewhere — what's one thing from today you don't want to forget?"
2. Add to system prompt: "If a user expresses significant distress, suicidal ideation, or crisis language — acknowledge it with care, do not try to counsel, and gently suggest speaking to someone qualified."
3. Expand system prompt to match SOUL.md depth — particularly the "resistance to journalling is usually the journal working" insight.
