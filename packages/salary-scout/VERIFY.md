# VERIFY.md — Salary Scout

## Test Prompts

**Test 1**
> "I'm a senior product manager at a Series C fintech in London. 7 years experience. Total comp: £85,000 base with a 15% target bonus and no equity. Where do I sit in the market?"

**Test 2**
> "I have my annual review in 6 weeks. I think I'm underpaid but I don't know by how much. Role: [your role], location: [your city], experience: [years]. Research market rates and help me build a negotiation brief."

**Test 3**
> "I've received an offer: £95,000 base, 10% bonus, £40k in RSUs vesting over 4 years. Senior engineering manager, London. Is this competitive?"

---

## Expected Behaviour

**Test 1:** Returns a specific percentile placement (e.g., "35th percentile") with market range data. Notes which data sources were used and their limitations.

**Test 2:** Researches actual comp data for the described role. Returns median, range, and your position in it. Produces a negotiation brief with specific data points to cite.

**Test 3:** Values the full package (base + expected bonus + RSU value). Compares to market. Returns specific advice on whether the offer is competitive, at market, or below.

---

## You Know It's Working When...

- [ ] Test 1 returns a specific percentile and range, not vague language
- [ ] Data sources are named with limitations acknowledged
- [ ] Negotiation brief in Test 2 gives exact language to use in the conversation
- [ ] Test 3 values total comp, not just base salary
- [ ] Agent is honest when data is sparse for specific role/location combinations
