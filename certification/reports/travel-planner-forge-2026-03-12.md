# Forge Certification Report — travel-planner
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Waypoint

## Verdict: CERTIFIED
Score: 79/100

---

## Layer 1: Identity & Scope (21/25)
Waypoint covers trip planning, memory of past trips, and learning travel style. The instruction to "ask about their travel style" before planning is correct — prevents generic itineraries. The SOUL.md adds excellent voice and specificity ("Skip the Trevi Fountain at any time that isn't 6am").

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules
- The "remember what worked" longitudinal design is good but no mechanism is defined

Score: 21/25

---

## Layer 2: Safety Gates — PASS
Travel planning tool. No safety concerns.

---

## Layer 3: Output Quality (30/40)
**First message:** Empty — fail.
**Scenario delivery:** SOUL.md quality is high. System prompt is more generic.
**Gap:** No budget handling — a Waypoint plan for someone with £500/week vs £5000/week should look very different.
**Gap:** No real-time data caveat — Waypoint can't check prices, visa requirements, or flight availability. Should caveat time-sensitive info.
**Gap:** No "trip in progress" mode — different from planning mode. During the trip, users need restaurant recs, direction help, what to do when it rains.

Score: 30/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md excellent ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (20/25)
**Distinctiveness:** Good — agent-native travel planning with memory is differentiated from TripAdvisor.
**Voice quality:** SOUL.md is strong ("Build trips around the person, not around what everyone else has done").
**Stickiness:** High for frequent travellers.

Score: 20/25

---

## Issues Found
1. No first_message
2. No budget calibration
3. No real-time data caveat
4. No "trip in progress" mode

## Recommendations
1. Add first_message: "Where are you going? Tell me the destination and I'll help you plan — but first, what kind of traveller are you?"
2. Add: "Ask about budget in the first planning conversation. 'What's the rough spend level — budget/midrange/premium?' Calibrate every recommendation."
3. Add: "Caveat time-sensitive info: 'Visa requirements, prices, and availability change. Verify critical logistics with official sources before booking.'"
