# AgentStandard

**Setting the standard for agent packages.**

AgentStandard is an open marketplace of curated, certified agent packages — built for operators who want to deploy AI agents without the friction.

🌐 [agentstandard.ai](https://agentstandard.ai) · 📧 [hello@agentstandard.ai](mailto:hello@agentstandard.ai)

---

## What is an AgentStandard package?

A package is a curated set of skills, MCPs, and configuration steps that brings an AI agent up to speed for a specific use case — delivered as a JSON manifest, installable in minutes.

**You shouldn't need to spend two hours in a terminal to talk to your AI.**

---

## Repository Structure

```
AgentStandard/
├── schema/              # The AgentStandard manifest spec
│   └── v1.json          # JSON Schema for package validation
├── packages/            # All published packages
│   ├── first-conversation/
│   ├── finance-analyst/
│   └── ...
└── README.md
```

---

## Submit a Package

1. Fork this repo
2. Create a new folder under `packages/your-package-name/`
3. Add `agentstandard.json` following the [schema spec](./schema/)
4. Add a `README.md` describing your package
5. Open a PR — community can upvote and review immediately

Packages with 50+ upvotes and no flagged issues are auto-promoted to **Community Certified** status.

Apply for **AgentStandard Certified** status at [agentstandard.ai/certify](https://agentstandard.ai/certify).

---

## Certification Tiers

| Tier | How | Benchmark data | Consumer UI |
|---|---|---|---|
| Uncertified | Submit a PR | Self-reported | Developer layer only |
| Community | 50+ upvotes, no flags | Self-reported | Listed |
| AgentStandard Certified | Manual review + testing | Independently verified | Featured |

---

## Platform Support

Packages are platform-agnostic. Compatible with:
- [OpenClaw](https://openclaw.ai)
- Claude (Anthropic)
- GPT (OpenAI)
- Gemini (Google)
- Any agent with MCP support

---

## License

Schema: MIT. Individual packages carry their own licenses. All referenced open-source components are linked by URL — nothing is bundled or copied.
