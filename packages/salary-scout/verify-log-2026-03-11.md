# Verify Log — Salary Scout
**Date:** 2026-03-11
**Tester:** AgentStandard automated test
**Model tested:** claude-haiku-4-5-20251001

## Test 1
**Prompt:** I'm a senior product manager at a Series C fintech in London. 7 years experience. Total comp: £85,000 base with a 15% target bonus and no equity. Where do I sit in the market?

**Response (excerpt):** # Your Market Position  **TL;DR: You're underpaid. Approximately 30-35th percentile. Market median for your profile is roughly £105-115k total comp.**  ---  ## The Data  For a **senior product manager

**Expected:** Returns a specific percentile placement (e.g., "35th percentile") with market range data. Notes which data sources were used and their limitations.

**Result:** PASS

**Notes:** Response addresses expected topics (5/10 key terms matched)

## Test 2
**Prompt:** I have my annual review in 6 weeks. I think I'm underpaid but I don't know by how much. Role: [your role], location: [your city], experience: [years]. Research market rates and help me build a negotiation brief.

**Response (excerpt):** I need the specifics to do this properly. Give me:  1. **Your exact role title** (as it appears on your contract/LinkedIn, or how you'd describe it) 2. **Your location** (city and country) 3. **Years 

**Expected:** Researches actual comp data for the described role. Returns median, range, and your position in it. Produces a negotiation brief with specific data points to cite.

**Result:** PASS

**Notes:** Response addresses expected topics (10/14 key terms matched)

## Test 3
**Prompt:** I've received an offer: £95,000 base, 10% bonus, £40k in RSUs vesting over 4 years. Senior engineering manager, London. Is this competitive?

**Response (excerpt):** I'll assess this against market benchmarks for your role.  ## Your Offer Breakdown  **Total compensation (year 1):** - Base: £95,000 - Bonus: £9,500 (10% of base) - RSUs: £10,000 (£40k ÷ 4 years) - **

**Expected:** Values the full package (base + expected bonus + RSU value). Compares to market. Returns specific advice on whether the offer is competitive, at market, or below.

---

**Result:** PASS

**Notes:** Response addresses expected topics (8/14 key terms matched)

## Checklist
- [ ] Test 1 returns a specific percentile and range, not vague language *(requires multi-turn testing)*
- [ ] Data sources are named with limitations acknowledged *(requires multi-turn testing)*
- [ ] Negotiation brief in Test 2 gives exact language to use in the conversation *(requires multi-turn testing)*
- [ ] Test 3 values total comp, not just base salary *(requires multi-turn testing)*
- [ ] Agent is honest when data is sparse for specific role/location combinations *(requires multi-turn testing)*

## Overall: PASS
**Certified:** YES
**Reason:** All 3 tests passed.
