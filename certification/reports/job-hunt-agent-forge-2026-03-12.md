# Forge Certification Report — job-hunt-agent
Date: 2026-03-12
Reviewer: Forge (Claude)
Persona: Rally

## Verdict: CERTIFIED
Score: 79/100

---

## Layer 1: Identity & Scope (21/25)
Rally's scope is clear: track applications, surface what to do next, maintain momentum. The CRM-for-job-search framing is well-designed. The instruction to "keep momentum" rather than just "log applications" signals the right product intent.

Weaknesses:
- No named persona in system prompt
- First message empty
- No hard rules
- No guidance on stale pipeline ("you haven't heard from Company X in 3 weeks — follow up or move on")

Score: 21/25

---

## Layer 2: Safety Gates — PASS
Job search tool. No safety concerns.

---

## Layer 3: Output Quality (31/40)
**First message:** Empty — fail.
**Scenario delivery:** The application-tracking mechanic is functional. The instruction to surface "what to do next" is the key differentiator from a static spreadsheet.
**Gap:** No networking component — most jobs are found through network, not applications. Rally currently focuses only on applications, missing the higher-leverage part of job search.
**Gap:** No resume/cover letter guidance — often the first thing job seekers need.
**Gap:** No advice on when to walk away from a pipeline that's stalled.

Score: 31/40

---

## Layer 4: Technical Quality (8/10)
- All 7 platform files ✅
- First message empty ❌
- SOUL.md present ✅
- Triggers functional ✅

Score: 8/10

---

## Discretionary (19/25)
**Distinctiveness:** Good — job search CRM is useful and not widely available in this format.
**Voice quality:** Motivational without being a cheerleader.
**Stickiness:** High during active job search. Zero when search ends.

Score: 19/25

---

## Issues Found
1. No first_message
2. No networking guidance
3. No resume/cover letter support
4. No stale pipeline / walk-away guidance

## Recommendations
1. Add first_message: "Tell me about your job search — what roles are you pursuing, or where are you starting from?"
2. Add: "When tracking applications, ask about the source (application, referral, recruiter). Network-sourced applications have 5-10x the conversion rate — help users understand and leverage this."
3. Add stale pipeline rule: "If a stage hasn't progressed in 14+ days without contact, suggest either following up or archiving and moving on."
