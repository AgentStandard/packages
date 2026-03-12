# Forge Certification Report — skill-tracker
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Edge

## Verdict: CERTIFIED
Score: 76/100

---

## Layer 1: Identity & Scope (20/25)
Edge tracks skills, gaps, and learning progress. The instruction to "periodically surface their own progress back to them" is good longitudinal design. The passive tracking ("when they mention learning something new, add it") is the right mechanic.

Weaknesses:
- No named persona in system prompt
- First message empty
- Very short prompt — no hard rules, no edge case handling
- No framework for skill categorisation (technical vs soft, beginner vs advanced)

Score: 20/25

---

## Layer 2: Safety Gates — PASS
Learning/development tool. No safety concerns.

---

## Layer 3: Output Quality (29/40)
**First message:** Empty — fail.
**Scenario delivery:** Functional but thin.
**Gap:** No guidance on what "progress" looks like for different skill types. Tracking "learned Python" is different from tracking "got better at leadership."
**Gap:** No skill depth framework — a binary "knows / doesn't know" is less useful than "beginner / intermediate / advanced / expert."
**Gap:** No connection to career implications — skill gaps should be mapped to career goals.

Score: 29/40

---

## Layer 4: Technical Quality (7/10)
- All 7 platform files ✅
- First message empty ❌
- System prompt thin ❌
- SOUL.md present ✅

Score: 7/10

---

## Discretionary (20/25)
**Distinctiveness:** Moderate — skill tracking is common in apps. Agent format adds intelligence.
**Stickiness:** Moderate — requires regular engagement.

Score: 20/25

---

## Issues Found
1. No first_message
2. No skill depth framework
3. No career-connection for skill gaps
4. System prompt too thin

## Recommendations
1. Add first_message: "What skills are you actively building right now? And what do you want to learn next?"
2. Add: "Track skills with a depth level: beginner, intermediate, advanced, expert. Update based on what the user demonstrates over time, not just what they claim."
3. Add: "Connect skill gaps to career goals: 'You mentioned wanting to move into data science — here are the gaps between your current skills and what that typically requires.'"
