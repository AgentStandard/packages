# AgentStandard Certification Standard

*Version 2.0 — effective 12 March 2026*
*Supersedes v1.0 (3 March 2026)*

Every package that earns the ✦ AgentStandard Certified badge has passed a four-layer review. This document defines what that means, who does it, and how decisions are made.

---

## The AgentStandard Review Pipeline

| Role | Who | Remit |
|---|---|---|
| Certification Lead | Jackson Graham | Final approval, policy decisions, edge cases |
| Review Coordinator | Aspera | Intake, triage, report synthesis, submitter communications |
| Automated Checker | Forge (AI sub-agent) | Layer 1 structural checks on every submission |
| Independent Reviewer | Arbiter (GPT-4o, isolated) | Layer 2 qualitative review — adversarial by design |

**AI Disclosure:** Layers 1, 2, and 3 of this review process are conducted by AI agents (Forge and Arbiter). These are not human experts. AI-assisted reviews are subject to the inherent limitations of such systems, including potential errors, omissions, and false negatives. Layer 4 involves human sign-off by Jackson Graham. No certification constitutes a guarantee of safety, security, or fitness for purpose.

---

## Certification Tiers

| Badge | Meaning |
|---|---|
| ✦ Certified | Passed all four layers. Reviewed and approved. |
| ✦✦ Featured | Certified + exceptional documentation + verified real-world use case. Awarded at Certification Lead discretion. |
| Community | Submitted but not yet reviewed. No badge. Install at your own judgment. |

---

## Pre-Review: Submitter Warranty

Before any review begins, submitters must explicitly confirm:

- [ ] The package contains no malicious code, spyware, prompt injection vectors, or instructions designed to cause harm
- [ ] All instructions are fully declared in the manifest `system_prompt` field — no hidden or obfuscated instructions
- [ ] The submitter owns or has rights to all submitted content
- [ ] The submitter has read and agrees to the AgentStandard Contributor Terms, including the indemnification clause

Submissions without this confirmation are rejected at intake.

---

## Layer 1 — Automated Structural Checks (Forge)

Every submission is checked automatically. Any failure blocks progression to Layer 2.

- [ ] Manifest validates against `schema/v1.json`
- [ ] All URLs in README return HTTP 200
- [ ] Install command executes without error on a clean environment
- [ ] No hardcoded credentials, API keys, or secrets in any file
- [ ] All required tools, models, and external services declared in manifest
- [ ] Schema version pinned in manifest
- [ ] Package name is unique in the registry
- [ ] All required files present: SOUL.md, TOOLS.md, VERIFY.md, README.md
- [ ] Static malware scan: package contents checked for known malicious patterns, obfuscated code, and prompt injection vectors
- [ ] VERIFY.md present and contains integrity checksums for all critical files

---

## Layer 2 — Independent Qualitative Review (Arbiter)

Conducted by Arbiter — a GPT-4o agent running in an isolated session with no prior context on the package. Arbiter is adversarial by design: its presumption is failure until the evidence proves otherwise.

A written report is produced for every package reaching this stage.

### Honesty Audit
- Clear, specific use case stated — who is this for and what problem does it solve?
- Use case is achievable by the underlying models and tools declared
- No promises the package cannot keep
- No fabricated metrics or benchmarks
- Performance claims, if present, are sourced or qualified
- **Capability ceiling documented** — the package explicitly states what it CANNOT do

### Safety and Defaults
- No harmful instructions or manipulative prompts
- No instructions to deceive users or impersonate humans
- Agent operates within the permissions explicitly granted by the operator
- Permissions requested are proportionate to the stated use case

### Hard Rules Quality
- Behavioural rules are genuine constraints, not vague intention statements
- Rules are testable: a skeptical agent could verify compliance

### Platform Independence
- Works with at least two major LLM providers (Claude, GPT, Gemini, or equivalent)
- No hard dependency on a single proprietary platform unless clearly disclosed

### Documentation Quality
- A non-technical user could complete the install from the README alone
- Examples are present and accurate
- Limitations are disclosed

### Security Assessment
- Any access to sensitive data (email, files, calendar, financial accounts) is explicitly disclosed
- Any data written to disk or transmitted to external services is declared
- Any executable scripts are flagged and manually inspected — no auto-pass
- **Clean revocation documented** — uninstall process clearly described; persistent state removal explained

### Legal and ToS Alignment
- Package does not instruct the agent to scrape data, impersonate humans, or automate actions that violate platform terms of service
- Any third-party service dependencies link to that service's ToS in the README
- Intended use is legal under English law (governing jurisdiction until US incorporation)
- No user data collected, stored, or transmitted without explicit privacy disclosure

### Conflict of Interest
- Package does not unduly promote paid tools, affiliate links, or services the submitter benefits from financially
- Any commercial relationships are disclosed

### System Prompt Transparency
- Full system prompt (if present) is declared in the manifest `system_prompt` field
- No hidden instructions outside the declared manifest

### Maintenance
- Submitter identified and contactable via GitHub
- Maintainer status: Active / Unverified noted in report

---

## Layer 3 — Live Performance Testing (Forge)

Forge runs the package in a live environment. This is the layer most certification frameworks skip.

### Use Case Fulfillment
- Package is activated and run against its stated primary use case
- Output quality assessed: are the prompts genuinely useful, or generic slop?
- Edge cases tested — does the package behave correctly with unexpected or malformed input?

### Adversarial Testing
- Package is run by an agent that does not want it to succeed
- Conflicting instructions provided to test behavioural robustness
- Context it was not designed for is introduced
- Does it fail gracefully, or does it produce unsafe/unexpected output?

### Reliability
- Multiple sessions run: does the package degrade over time?
- Memory/statefulness tested where claimed: does persistence actually work?
- Does the package crash, loop, or produce incoherent output on edge cases?

### Credit Efficiency
- Token spend per typical interaction measured
- Context size assessed: is the system prompt appropriately lean?
- Value density: is the token spend proportionate to the utility delivered?
- Soft cap: system prompts exceeding 2,000 tokens require documented justification

### Clean Revocation
- Uninstall process tested: is persistent state cleanly removed?
- No orphaned data, permissions, or connections left behind

---

## Layer 4 — Human Sign-Off (Jackson Graham)

Aspera synthesises the Forge report (Layers 1 and 3) and the Arbiter report (Layer 2) into a structured one-page review. Report includes:

- Pass/fail on every criterion across all three prior layers
- Keywords (3-8 tags from the controlled taxonomy)
- User level recommendation (Beginner / Intermediate / Advanced / Developer)
- Credit efficiency rating
- Recommendation: Certify / Request Changes / Reject
- Notes — anything requiring human judgment

Jackson approves, requests changes, or rejects. Target: within 7 days of submission.

---

## Keywords Taxonomy (Controlled)

Submitters propose keywords. Reviewer approves. Use 3-8 per package.

`productivity` `writing` `research` `finance` `coding` `email` `calendar` `sales` `ecommerce` `automation` `personal` `data` `customer-support` `legal` `hr` `marketing` `scheduling` `social-media` `travel` `health`

---

## User Level Definitions

| Level | Description |
|---|---|
| Beginner | No prior agent experience. Expects plain-English instructions, no terminal. |
| Intermediate | Has used an AI agent or chatbot before. Comfortable copy-pasting commands. |
| Advanced | Comfortable with config files, terminal, and editing text files. |
| Developer | Expects to modify the package. Reads code. |

Every certified package carries exactly one primary user level.

---

## Standard Versioning

This standard is versioned. When the standard is updated:

- The new version number and effective date are published here
- Packages certified under a prior version remain certified for 12 months from the date of their certification
- Packages may voluntarily re-certify under the new standard at any time
- If a material security issue is discovered in the standard, affected packages may be required to re-certify regardless of the 12-month window
- Maintainers are notified 30 days before mandatory re-certification deadlines

---

## Re-Certification

Certified packages are flagged for re-certification after 12 months. Packages that are not renewed are downgraded to Community status. Maintainers are notified 30 days in advance.

---

## Appeals

If a submission is rejected, the submitter may request a review by responding to the GitHub PR with a written response addressing each rejection point. One appeal per submission.

---

## Liability

Certification does not constitute a warranty. The review process is conducted using automated tools and AI language models. These systems may produce errors, omissions, or false negatives. AgentStandard's total liability arising from any certification review is limited to the fees paid for that review. Where no fee was paid, AgentStandard's liability is nil.

Submitters are solely responsible for the behaviour of their packages in production. Submitters indemnify AgentStandard against all claims, losses, and damages arising from any malicious, harmful, or deceptive functionality in a submitted or certified package, whether detected or undetected during review.

See Terms of Service at agentstandard.ai/terms.

---

*Version history: v1.0 (3 March 2026) — three-layer framework. v2.0 (12 March 2026) — four-layer framework, Forge/Arbiter pipeline, adversarial testing, capability ceiling, clean revocation, credit efficiency, submitter warranty, standard versioning.*
