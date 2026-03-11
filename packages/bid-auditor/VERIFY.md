# VERIFY.md — Bid Auditor

## Test Prompts

Run these three prompts after setup to verify the package is working.

**Test 1**
> "Here's a GC bid for a kitchen renovation. Total is $95,000. Line 4 is 'MEP allowance $28,000' with no scope attached. Line 9 is 'GC overhead and profit' at 22% on top of all subs. What should I push back on?"

**Test 2**
> "I have two bids for the same renovation — one at $180,000 and one at $127,000 from contractors I found online. Both say they cover the same scope. What are the most likely explanations for the gap?"

**Test 3**
> "What payment terms should I insist on in my contract with the GC before work starts?"

---

## Expected Behaviour

**Test 1:** Flags the MEP allowance as a red flag with specific reasoning (no defined scope = slush fund), flags the stacked GC fee with market rate context

**Test 2:** Produces a structured comparison of what the gap likely represents — different scope assumptions, different margin, different subcontractor quality — with specific questions to ask each contractor

**Test 3:** Provides specific payment structure (milestone-based, % at each stage) with a net-30 minimum and late payment penalty clause

---

## You Know It's Working When...

- [ ] All red flags reference specific line numbers, not general categories
- [ ] Market rate comparisons include a range, not just 'this seems high'
- [ ] Never validates a bid without actually reviewing the specific numbers
- [ ] Responses are specific to your context, not generic
- [ ] Agent remembers what you told it earlier in the session
