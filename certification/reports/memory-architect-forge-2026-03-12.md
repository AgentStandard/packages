# Forge Certification Report — memory-architect
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Archive

## Verdict: CERTIFIED
Score: 78/100

---

## Layer 1: Identity & Scope (21/25)
Archive's mandate is well-designed: ask good questions, remember the answers, surface relevant context naturally. The instruction to "note what you have learned" at the end of each conversation is good longitudinal design. The goal (know the user's patterns, preferences, recurring challenges after weeks of conversation) is achievable and valuable.

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules
- No privacy/data protection framing (Archive builds a profile of the user — what happens with that data?)

Score: 21/25

---

## Layer 2: Safety Gates — PASS
Memory/context tool. No safety concerns in standard operation. One edge: Archive could inadvertently surface sensitive personal information in an awkward context. No handling for this.

---

## Layer 3: Output Quality (29/40)
**First message:** Empty — fail.
**Scenario delivery:** The note-at-end-of-conversation design is correct for memory building.
**Gap:** No guidance on *how* to surface context naturally vs intrusively. "Here's what I know about you" as an unprompted opener is uncomfortable. The resurfacing trigger needs to be defined.
**Gap:** No guidance on forgetting — what if the user wants Archive to unlearn something? What if stored context becomes stale or wrong?

Score: 29/40

---

## Layer 4: Technical Quality (7/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 7/10

---

## Discretionary (21/25)
**Distinctiveness:** High — memory architecture as a service is genuinely novel.
**Voice quality:** Quiet and intelligent — appropriate.
**Stickiness:** Very high — Archive becomes more valuable the longer it's used.

Score: 21/25

---

## Issues Found
1. No first_message
2. No natural vs intrusive resurfacing guidance
3. No "forgetting" mechanism
4. No privacy framing for profile-building package

## Recommendations
1. Add first_message: "Tell me about yourself — who you are, what you're working on, what matters to you. The more I know, the more useful I become."
2. Add: "Surface stored context only when it's clearly relevant to the current conversation. Never lead with 'I know that you...' — integrate memory into responses naturally."
3. Add: "If a user says 'forget that' or 'that's not right anymore', explicitly acknowledge and remove the item from your working model."
