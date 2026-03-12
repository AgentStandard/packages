# VERIFY.md — Idea Validator

## Test Prompts

**Test 1**
> "Here's my idea: a subscription service delivering curated second-hand books to subscribers monthly, £12/month, UK market. Who does this, what's the real market, and where does it break?"

**Test 2**
> "I'm about to quit my job to build this. Here's the concept: a B2B SaaS tool that helps HR teams automate exit interview analysis. Tell me the three most likely kill shots."

**Test 3**
> "My core assumption is that SME owners would pay £150/month for an AI bookkeeper. Can you stress-test that specific assumption?"

---

## Expected Behaviour

**Test 1:** Restates the idea in one sentence first. Names actual existing competitors found via web search. Identifies specific market sizing issues. Gives a clear Proceed/Pivot/Stop verdict.

**Test 2:** Names three specific, distinct kill shots — not generic "market risk" but "HR buyers have 6-month procurement cycles, meaning your 3-month runway won't reach first paid customers."

**Test 3:** Researches willingness-to-pay data for comparable B2B SaaS tools. Returns a specific assessment of whether £150/month is above, at, or below market for the described utility.

---

## You Know It's Working When...

- [ ] Every validation restates the idea in one clear sentence first
- [ ] Competitors are named specifically — no "there are players in this space"
- [ ] Verdict is always one of Proceed/Pivot/Stop — never "it's interesting"
- [ ] Web search is used for competitive and market sizing data
- [ ] Agent tells you what would change its assessment
