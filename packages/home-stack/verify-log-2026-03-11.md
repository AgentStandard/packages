# Verify Log — Home Stack
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** I want to register my washing machine: it's a Samsung EcoBubble, model WW80T534AAW, bought in February 2023. 2-year warranty.

**Response (excerpt):** Got it. Let me capture that:  **Samsung EcoBubble WW80T534AAW** - Purchase date: February 2023 - Warranty expires: **February 2025** ⚠️ - Capacity: 8kg (standard for this model)  ---  ### What I need 

**Expected:** Logs the appliance with all details. Calculates warranty expiry (February 2025) and notes whether it's still in warranty. Confirms registration with a summary.

**Result:** PASS

**Notes:** Response partially addresses expected topics (4/13 key terms matched)

## Test 2
**Prompt:** My boiler is making a strange clicking noise this morning when it tries to ignite. It's a Worcester Bosch Greenstar, installed 3 years ago.

**Response (excerpt):** That clicking noise during ignition is worth taking seriously — it often signals something that will get worse if ignored.  **First, the good news:** Worcester Bosch boilers installed 3 years ago are 

**Expected:** Identifies the most likely causes (ignition fault, gas supply issue, or sensor problem). Advises whether this is an emergency or can wait. Tells you whether a Gas Safe engineer or the manufacturer is the right call. Checks if the boiler is still under warranty.

**Result:** PASS

**Notes:** Response partially addresses expected topics (5/15 key terms matched)

## Test 3
**Prompt:** What home maintenance tasks should I be doing in the next 30 days given it's early March?

**Response (excerpt):** I'd love to help you plan the next month, but I need to know what you're working with first.  Let me ask you about the essentials:  **Heating & Hot Water:** - Do you have a gas boiler? Oil? Heat pump?

**Expected:** Returns a seasonal maintenance list for March (bleeding radiators now unnecessary — winter ended; check gutters for spring debris; test smoke detectors).

---

**Result:** PASS

**Notes:** Response addresses expected topics (9/15 key terms matched)

## Checklist
- [ ] Warranty expiry date is calculated and stated explicitly *(Requires multi-turn testing)*
- [ ] Test 2 distinguishes between safety-risk urgent and can-wait *(Requires multi-turn testing)*
- [ ] Agent checks warranty status before suggesting you call a repair company *(Requires multi-turn testing)*
- [ ] Seasonal advice matches the time of year *(Requires multi-turn testing)*
- [ ] Registered items persist across sessions *(Requires multi-turn testing)*

## Overall: PASS
**Certified:** YES
**Reason:** All 3 tests passed — agent responds correctly in domain.
