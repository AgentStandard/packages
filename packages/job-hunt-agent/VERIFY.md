# VERIFY.md — Job Hunt Agent

## Test Prompts

**Test 1**
> "I'm actively job hunting for a product manager role in a Series B-D startup, ideally fintech or marketplace. I have five applications in progress — let me walk you through each one."

**Test 2**
> "I have a first-round interview with Monzo next Wednesday for a Senior PM role focused on their business account product. What should I know, and what questions am I likely to face?"

**Test 3**
> "I've been applying for three months with a low response rate. About 4-6 applications per week. What's most likely going wrong and what should I change first?"

---

## Expected Behaviour

**Test 1:** Records each application with status, company, role, date applied, last contact, next step. Confirms everything logged. Immediately surfaces any that have been waiting too long.

**Test 2:** Researches Monzo's business account product specifically. Returns: company context, role-specific likely questions, behavioral questions to prepare for, suggested questions to ask interviewers.

**Test 3:** Diagnoses the most probable cause of low response rate (CV targeting, role-company fit mismatch, application channels, volume insufficient for the market). Recommends one change to make first.

---

## You Know It's Working When...

- [ ] Applications are tracked and persist across the session
- [ ] Test 2 research is Monzo-specific, not generic fintech interview advice
- [ ] Agent surfaces follow-up timing without being asked
- [ ] Test 3 diagnosis is specific — not "improve your CV" but "your CV likely isn't targeting the specific role types"
- [ ] Agent is honest when the pipeline is too thin to expect results
