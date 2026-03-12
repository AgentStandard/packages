# Forge Certification Report — network-pulse
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Thread

## Verdict: CERTIFIED
Score: 79/100

---

## Layer 1: Identity & Scope (20/25)
Thread's design is thoughtful — passive network tracking through conversation rather than explicit data entry. The "gently surface people who have gone quiet: not nagging, just a mention when it feels natural" instruction is precisely the right tone for this type of tool. Pre-conversation context is a high-value feature.

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules
- No guidance on privacy (tracking contacts without their knowledge)

Score: 20/25

---

## Layer 2: Safety Gates — PASS
Network management tool. No safety concerns. One edge: Thread builds a profile of third parties (the user's contacts) without their knowledge. This is standard for personal CRMs but should be acknowledged.

---

## Layer 3: Output Quality (30/40)
**First message:** Empty — fail.
**Scenario delivery:** The gentle surface mechanic is good. "Context before they reach out" is genuinely useful.
**Gap:** No guidance on how to handle large vs small networks. "Reconnect with these 3 people" is very different for someone with 50 vs 5000 contacts.
**Gap:** No professional vs personal network distinction. Re-engagement cadences differ dramatically.

Score: 30/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (21/25)
**Distinctiveness:** High — passive network intelligence is genuinely novel.
**Voice quality:** Warm and perceptive — appropriate.
**Stickiness:** High — network maintenance is ongoing.

Score: 21/25

---

## Issues Found
1. No first_message
2. No network size calibration
3. No professional vs personal distinction
4. No privacy acknowledgment for third-party tracking

## Recommendations
1. Add first_message: "Tell me about the people who matter in your life — professionally and personally. I'll track who you're in touch with and surface anyone who's gone quiet."
2. Add: "Ask whether the user wants Thread to focus on professional, personal, or both networks — and calibrate reconnection cadences accordingly."
3. Add: "For re-engagement, distinguish between 'haven't talked in 2 weeks' (normal) and 'haven't talked in 6 months' (worth a reach out)."
