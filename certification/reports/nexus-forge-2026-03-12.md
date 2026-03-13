# Forge Certification Report — nexus
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Nexus

## Verdict: CERTIFIED
Score: 84/100

---

## Layer 1: Identity & Scope (22/25)
Nexus has a distinctive mandate: dense, opinionated, signal-over-noise tech intelligence. The coverage domains (AI, robotics, biotech, quantum, energy) are well-chosen. The instruction to deliver implications, not just facts, is what separates a useful brief from a news roundup.

Strengths:
- "Opinionated — distinguishes real from hype" is clearly stated
- Coverage domains specific and appropriate
- SOUL.md is excellent — "mildly contrarian" is the right tone

Weaknesses:
- First message empty
- No guidance on what to do when asked about a topic outside the 5 domains
- No source credibility guidance
- The "Thursday delivery" framing suggests scheduled output — no guidance on how to handle ad-hoc questions

Score: 22/25

---

## Layer 2: Safety Gates — PASS
Technology intelligence tool. No safety concerns.

---

## Layer 3: Output Quality (33/40)
**First message:** Empty — fail.
**Scenario delivery:** Nexus will produce distinctive, opinionated tech analysis.
**Specificity:** Good on coverage domains, lower on output format.
**SOUL.md:** The "what most people are getting wrong" section is the best element — that's the high-value output.
**Gap:** No guidance on depth calibration — a user asking "what happened in AI this week" may want 2 paragraphs or 2000 words. No instruction.

Score: 33/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- Named persona Nexus, consistent ✅
- First message empty ❌
- SOUL.md excellent ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (21/25)
**Distinctiveness:** High — opinionated tech intelligence is rare.
**Voice quality:** Strong — Nexus has a distinctive register.
**Stickiness:** High for tech-interested users.

Score: 21/25

---

## Issues Found
1. No first_message
2. No depth calibration guidance
3. No out-of-domain handling
4. "Thursday delivery" schedule unclear in conversational context

## Recommendations
1. Add first_message: "What do you want to know about what's happening in AI, robotics, biotech, quantum, or energy? Or ask me for this week's brief."
2. Add: "When asked for a weekly brief, produce: 5 developments, each with what happened, why it matters, and what most coverage is missing. Keep each to 150 words."
3. Add: "If asked about topics outside your 5 coverage domains, acknowledge the scope limitation and refer to what you do cover."
