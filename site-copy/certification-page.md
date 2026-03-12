# /certification — Page Copy
*agentstandard.ai/certification*

---

## HERO

**Headline:**
The Standard Exists for a Reason

**Subhead:**
Anyone can write a system prompt. We run it, score it, and put our name behind it.

**Body:**
The agent skill ecosystem is growing fast — and so is the noise. Bad prompts, fabricated capabilities, bloated context windows, and zero accountability. AgentStandard Certification is our answer: a four-layer, 100-point framework that tests every package before it reaches you.

Nothing earns a certification badge by filling out a form. It has to pass.

---

## SECTION 1: HOW IT WORKS

**Heading:** Four layers. One standard.

**Layer 1 — Structural Integrity**
Before anything else, the package has to be built right. Schema validates. Required files are present. The system prompt is lean — we cap it at 2,000 tokens because bloated prompts signal unclear thinking and inflate your costs. Activation and deactivation triggers are tested live, not just documented.

*This layer is fully automated. No judgment, no exceptions.*

**Layer 2 — Safety & Honesty**
A package cannot claim capabilities it doesn't have. It cannot request permissions beyond what it needs. And it cannot contain instructions that could harm you or anyone else — that's a hard gate. Fail it and the submission is rejected immediately, regardless of everything else.

*We use a documented rubric, not a binary rule. Edge cases are handled consistently, not arbitrarily.*

**Layer 3 — Live Performance**
This is where most packages are made or broken. We actually run the skill and score what comes out.

- **Use Case Fulfillment** — standardised test prompts per category. Does it do what it says?
- **Output Quality** — is the response specific to context, or generic filler that any base model would produce?
- **Reliability** — does the persona hold across a full session? Does it degrade? Does it break on edge cases?
- **Credit Efficiency** — how many tokens does it consume? Lean prompts earn full marks. Bloated ones don't.

*Live performance is 50 of the 100 points. A package that passes documentation review but underperforms in the real world does not get certified.*

**Layer 4 — Human Sign-Off**
A structured report from Layers 1–3 goes to a human reviewer. They don't re-run the tests — they review the results and make a final call. Would they use this? Would they recommend it? If yes, it's certified. If not, it goes back.

*This is also where ✦✦ Featured packages are identified — skills that don't just pass, but genuinely change how someone works.*

---

## SECTION 2: THE SCORE

**Heading:** A number, not a badge.

Every certified package displays its score publicly. Not just a checkmark — an actual number. Because "87/100 · ✓ Certified" tells you something. A generic badge doesn't.

[SCORE TABLE — visual component]

| Score | Status |
|-------|--------|
| 90–100 | ✦✦ Certified · Featured |
| 75–89 | ✓ Certified |
| 60–74 | Conditional · Under Review |
| <60 | Not Certified |

Scores are published on every package page. When a package is updated and re-certified, the new score replaces the old one and the version history is logged.

---

## SECTION 3: WHAT WE'RE MEASURING AND WHY

**Heading:** We tell you where the judgment calls are.

Most certification schemes are black boxes. Ours isn't. Every criterion in the framework is labelled as either **objective** (measured, not judged) or **heuristic** (rubric-based, judgment-guided, documented). You can read the full framework on GitHub.

The short version:
- Token counts are measured. Not estimated, not approximated — measured.
- Safety review uses a published rubric, not one person's opinion.
- Output quality is scored on three dimensions with defined scoring examples. Two independent reviewers applying the framework should land within 5 points of each other.
- Credit efficiency thresholds are derived from real cost modelling, not arbitrary round numbers.

If you disagree with how we've designed any criterion, the framework is versioned and open. Tell us. If the feedback is valid, v1.1 will reflect it.

---

## SECTION 4: FOR DEVELOPERS

**Heading:** Want to submit a package?

The certification process is open. If you've built a skill that meets the standard, it belongs here.

**What you'll need:**
- A valid `agentstandard.json` manifest (schema at agentstandard.ai/schema)
- `SOUL.md` — who the agent is and how it behaves
- `SKILL.md` — instructions for use
- `triggers.json` — activation and deactivation config
- Platform files (at minimum: `api-prompt.txt` — others optional but recommended)

**What happens next:**
Your package enters the staging environment — full preview, not publicly discoverable. Layers 1–3 run automatically. Layer 4 review is completed within 7 days. You receive a structured report with your score and any required changes.

**The staging environment:**
Every package goes through `staging.agentstandard.ai` before it ever touches production. You can preview exactly how your package will appear on the live site — package page, platform install flows, certification score — before anything goes public.

[CTA: Submit a Package →] [CTA: Read the Full Framework →]

---

## SECTION 5: THE TRUST PROBLEM

**Heading:** Why this matters more than it sounds.

The agent ecosystem is moving fast. As agent populations grow, the trust problem gets harder — not easier. Reputation, identity stability, cost transparency, and verifiable behaviour are all unsolved at scale.

AgentStandard Certification is our answer at the skill layer. We can't solve the whole trust stack. But we can make sure that when you load a certified skill into your agent, you know exactly what you're getting: what it does, what it costs, how it behaves, and who reviewed it.

That's the standard. It's not a marketing exercise. It's what makes the badge worth having.

---

## FOOTER CTA

**Browse certified packages →**
**Read CERTIFICATION.md on GitHub →**
**Submit a package for review →**

---

## PAGE METADATA
- Title: Certification — AgentStandard
- Description: The AgentStandard 4-layer certification framework. Every package is run, scored, and reviewed before it reaches you. 100-point scoring. Full transparency.
- OG Image: certification badge / score graphic (to be designed)
