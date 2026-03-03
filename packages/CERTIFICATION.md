# AgentStandard Certification Standard

*Version 1.0 — effective 3 March 2026*

Every package that earns the ✦ AgentStandard Certified badge has passed a three-layer review. This document defines what that means, who does it, and how decisions are made.

---

## The AgentStandard Team

| Role | Who | Remit |
|---|---|---|
| Certification Lead | Jackson Graham | Final approval, policy decisions, edge cases |
| Review Coordinator | Aspera | Intake, triage, report writing, submitter communications |
| Automated Checker | CI / sub-agent | Layer 1 checks on every pull request |

---

## Certification Tiers

| Badge | Meaning |
|---|---|
| ✦ Certified | Passed all three layers. Manually reviewed and approved. |
| ✦✦ Featured | Certified + exceptional documentation + verified real-world use case. Awarded at Certification Lead discretion. |
| Community | Submitted but not yet reviewed. No badge. Install at your own judgment. |

---

## Layer 1 — Automated Checks

Every submission is checked automatically. Any failure blocks progression to Layer 2.

- [ ] Manifest validates against `schema/v1.json`
- [ ] All URLs in README return HTTP 200
- [ ] Install command executes without error on a clean environment
- [ ] No hardcoded credentials, API keys, or secrets in any file
- [ ] All required tools, models, and external services declared in manifest
- [ ] Schema version pinned in manifest
- [ ] Package name is unique in the registry

---

## Layer 2 — Qualitative Review

Conducted by Aspera. A written report is produced for every package reaching this stage.

### Use Case
- Clear, specific use case stated — who is this for and what problem does it solve?
- Use case is achievable by the underlying models and tools declared

### Capability Claims
- No promises the package cannot keep
- No fabricated metrics or benchmarks
- Performance claims, if present, are sourced or qualified

### Safety and Defaults
- No harmful instructions or manipulative prompts
- No instructions to deceive users or impersonate humans
- Agent operates within the permissions explicitly granted by the operator

### Platform Independence
- Works with at least two major LLM providers (Claude, GPT, Gemini, or equivalent)
- No hard dependency on a single proprietary platform unless clearly disclosed

### Documentation Quality
- A non-technical user could complete the install from the README alone
- Examples are present and accurate
- Limitations are disclosed

### Security Assessment
- Permissions requested are proportionate to the stated use case
- Any access to sensitive data (email, files, calendar, financial accounts) is explicitly disclosed
- Any data written to disk or transmitted to external services is declared
- Any executable scripts are flagged and manually inspected — no auto-pass

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

## Layer 3 — Human Sign-Off

Aspera surfaces a structured one-page review report to Jackson Graham. Report includes:

- Pass/fail on every Layer 2 criterion
- Keywords (3-8 tags from the controlled taxonomy)
- User level recommendation (Beginner / Intermediate / Advanced / Developer)
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

## Re-Certification

Certified packages are flagged for re-certification after 12 months. Packages that are not renewed are downgraded to Community status. Maintainers are notified 30 days in advance.

---

## Appeals

If a submission is rejected, the submitter may request a review by responding to the GitHub PR with a written response addressing each rejection point. One appeal per submission.

---

## Liability

Certification does not constitute a warranty. AgentStandard reviews packages in good faith against this published standard. Submitters are solely responsible for the behaviour of their packages in production. See Terms of Service at agentstandard.ai/terms.
