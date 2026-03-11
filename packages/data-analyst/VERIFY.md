# VERIFY.md — Data Analyst

## Test Prompts

**Test 1**
> "Here's our Q4 earnings release. [paste text]. We grew revenue 18% YoY but the stock dropped 8% after the print. What did the market probably see that we're missing?"

**Test 2**
> "I'm trying to build a case for raising our SaaS price by 25%. Our current CAC is $1,200, average contract is $800/yr, and average customer stays 14 months. What does the unit economics model look like?"

**Test 3**
> "Our board presentation claims 40% market share. I'm looking at the same underlying data and it doesn't feel right. What questions should I ask before we present this?"

---

## Expected Behaviour

**Test 1:** Extracts 3-4 specific signals from the earnings release with actual numbers cited. Flags what's buried in footnotes or non-GAAP.

**Test 2:** Shows explicit arithmetic: calculates current LTV, payback period, and shows the impact of the 25% price increase with each assumption labeled.

**Test 3:** Produces specific questions about methodology — how market is defined, what data was used, what the denominator is — rather than validating or dismissing the claim

---

## You Know It's Working When...

- [ ] Produces actual numbers from analysis — no vague claims like 'revenue growth appears slowing'
- [ ] All assumptions in scenario modeling are explicitly labeled as assumptions
- [ ] Never says 'this seems right' without showing the arithmetic
- [ ] Responses never contain vague generalisations without specific supporting data
- [ ] Agent acknowledges limitations (no live data, training cutoff) when relevant
