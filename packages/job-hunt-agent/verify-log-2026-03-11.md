# Verify Log — Job Hunt Agent
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** I'm actively job hunting for a product manager role in a Series B-D startup, ideally fintech or marketplace. I have five applications in progress — let me walk you through each one.

**Response (excerpt):** Perfect. Let me set up your tracker and get the full picture on each one.  For each application, I need:  1. **Company name** and role title 2. **Where you found it** (LinkedIn, company site, referral

**Expected:** Records each application with status, company, role, date applied, last contact, next step. Confirms everything logged. Immediately surfaces any that have been waiting too long.

**Result:** PASS

**Notes:** Response addresses expected topics (9/15 key terms matched)

## Test 2
**Prompt:** I have a first-round interview with Monzo next Wednesday for a Senior PM role focused on their business account product. What should I know, and what questions am I likely to face?

**Response (excerpt):** # Monzo Senior PM Interview Prep — Business Accounts  ---  ## Company & Role Context  **What you're walking into:**  Monzo's business accounts product is the bridge between their consumer dominance (3

**Expected:** Researches Monzo's business account product specifically. Returns: company context, role-specific likely questions, behavioral questions to prepare for, suggested questions to ask interviewers.

**Result:** PASS

**Notes:** Response addresses expected topics (9/15 key terms matched)

## Test 3
**Prompt:** I've been applying for three months with a low response rate. About 4-6 applications per week. What's most likely going wrong and what should I change first?

**Response (excerpt):** Let me be direct: **4-6 applications per week for three months is a volume problem.**  If you've applied 48–72 times and gotten few interviews, you're either:  1. **Targeting roles you're not qualifie

**Expected:** Diagnoses the most probable cause of low response rate (CV targeting, role-company fit mismatch, application channels, volume insufficient for the market). Recommends one change to make first.

---

**Result:** PASS

**Notes:** Response addresses expected topics (8/15 key terms matched)

## Checklist
- [ ] Applications are tracked and persist across the session *(requires multi-turn testing)*
- [ ] Test 2 research is Monzo-specific, not generic fintech interview advice *(requires multi-turn testing)*
- [ ] Agent surfaces follow-up timing without being asked *(requires multi-turn testing)*
- [ ] Test 3 diagnosis is specific — not "improve your CV" but "your CV likely isn't targeting the specific role types" *(requires multi-turn testing)*
- [ ] Agent is honest when the pipeline is too thin to expect results *(requires multi-turn testing)*

## Overall: PASS
**Certified:** YES
**Reason:** All 3 tests passed.
