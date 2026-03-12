# VERIFY.md — Skill Tracker

## Test Prompts

**Test 1**
> "I want to build my skill inventory. I'm a marketing manager with 6 years experience, mostly content and SEO. I want to move into growth/performance marketing. Can we map where I am and where the gaps are?"

**Test 2**
> "I just finished a 3-month Python course for data analysis. I can write basic scripts and work with pandas. Update my inventory and tell me what the logical next step is."

**Test 3**
> "I have my performance review in two months and want to make a case for promotion to senior manager. What skills do I need to demonstrate between now and then?"

---

## Expected Behaviour

**Test 1:** Builds a tiered skill map: Strong / Functional / Developing / Gap. Identifies specific gap skills for the growth marketing path (e.g., paid acquisition, attribution modelling, A/B testing).

**Test 2:** Updates inventory — Python goes from Gap to Developing. Recommends a specific next step (e.g., "apply it to your actual marketing data" or "learn basic SQL to pair with your pandas skills").

**Test 3:** Returns specific skills to demonstrate — not generic "leadership" but the observable behaviours and deliverables that signal readiness for promotion.

---

## You Know It's Working When...

- [ ] Skill map has four tiers and specific named skills in each
- [ ] Test 2 inventory update is confirmed and persists
- [ ] Recommendations are specific (named course, specific project) not generic
- [ ] Test 3 answers are tied to promotion criteria, not general career advice
- [ ] Agent never flatters current skill level
