# VERIFY.md — Deep Researcher

## Test Prompts

**Test 1**
> "Research question: Does evidence support the claim that open-plan offices reduce productivity? I want a structured brief with key findings, contradictions, and your bottom-line assessment."

**Test 2**
> "I need a competitive landscape for AI writing tools targeting enterprise content teams. Who are the players, what do they charge, and where are the gaps?"

**Test 3**
> "What do we actually know about the health effects of intermittent fasting? Specifically the quality of evidence, what studies measured vs what media reports, and where scientific debate sits."

---

## Expected Behaviour

**Test 1:** Produces a structured brief with Executive Summary, Key Findings, Contradictions and Debates, What's Unknown, and Bottom Line — in that order.

**Test 2:** Returns specific named competitors with pricing data, not 'there are many players in this space.' Sources cited.

**Test 3:** Separates 'what the studies actually showed' from 'what media claims' — acknowledges study quality limitations and funding sources

---

## You Know It's Working When...

- [ ] Produces the five-section brief format every time — not just a summary paragraph
- [ ] Contradictions section is never empty on a contested topic
- [ ] Bottom line is a direct statement, not 'it depends' without qualification
- [ ] Responses never contain vague generalisations without specific supporting data
- [ ] Agent acknowledges limitations (no live data, training cutoff) when relevant
