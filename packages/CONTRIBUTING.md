# Contributing to AgentStandard

AgentStandard is an open registry of curated AI agent packages. Anyone can submit a package. Packages that meet the certification standard earn the ✦ badge.

---

## Before You Submit

Read [CERTIFICATION.md](./CERTIFICATION.md). It tells you exactly what the review checks. A submission that doesn't meet the standard will be rejected — and that's documented publicly on your PR. Save yourself the round-trip and read it first.

---

## What Makes a Good Package

A good AgentStandard package:

- Solves a specific, real problem for a specific type of person
- Works out of the box — no hidden setup steps
- Is honest about what it can and cannot do
- Works with more than one LLM (Claude, GPT, Gemini)
- Has documentation clear enough for a non-technical user

---

## Package Structure

Your submission must include:

```
packages/
  your-package-name/
    agentstandard.json   # required — manifest file
    README.md            # required — user-facing documentation
    LICENSE              # recommended
```

### agentstandard.json

Must validate against `schema/v1.json`. Required fields:

```json
{
  "schema_version": "1",
  "name": "your-package-name",
  "display_name": "Your Package Name",
  "version": "1.0.0",
  "description": "One sentence. What this package does and who it's for.",
  "author": "your-github-handle",
  "platform": ["claude", "openai", "gemini"],
  "category": "productivity",
  "install_command": "clawhub install your-package-name",
  "system_prompt": "The full system prompt used by this agent. Required for certification. No hidden instructions.",
  "keywords": ["tag1", "tag2", "tag3"],
  "user_level": "beginner",
  "dependencies": [],
  "external_services": [],
  "data_access": [],
  "tos_links": [],
  "certified": false
}
```

**`system_prompt`** — the complete system prompt your agent uses. This is required for certification. If your package has no system prompt, set it to `""`. Hidden instructions that are not declared here will result in automatic rejection.

**`data_access`** — list any sensitive data your agent accesses: `email`, `calendar`, `files`, `financial`, `contacts`. If none, use `[]`.

**`external_services`** — list any third-party APIs or services your agent calls. If none, use `[]`.

**`tos_links`** — for each external service listed, provide a link to their Terms of Service.

### README.md

Your README must include:

1. **What it does** — plain English, one paragraph
2. **Who it's for** — specific type of user
3. **Install instructions** — step by step, tested
4. **First conversation** — what to say to your agent after install
5. **Limitations** — what this package cannot do
6. **Data and privacy** — what data the agent accesses, where it goes

---

## Submission Checklist

Before opening a PR, confirm:

- [ ] `agentstandard.json` validates against the schema
- [ ] All links in README return 200
- [ ] Install command works on a clean machine
- [ ] No credentials or API keys in any file
- [ ] `system_prompt` field is complete and accurate
- [ ] `data_access` and `external_services` fields are honest
- [ ] README is written for the target user level
- [ ] You have completed the submission declaration below

---

## How to Submit

1. Fork `AgentStandard/packages`
2. Create a new directory: `packages/your-package-name/`
3. Add `agentstandard.json` and `README.md`
4. Open a pull request using the provided template
5. Complete the submission declaration in the PR

The review team will respond within **7 days**.

---

## Review Process

1. Automated checks run immediately on PR open
2. If automated checks pass, Aspera (AgentStandard's review coordinator) conducts a qualitative review
3. A review report is produced and the Certification Lead makes the final decision
4. You will receive a response on your PR: approved, changes requested, or rejected with reasons

If your submission is rejected, you may appeal once by responding to the PR with a written response addressing each rejection point.

---

## Questions

Open an issue with the label `question`. We read everything.
