---
name: github
description: Interact with GitHub repositories — pull requests, issues, CI runs, code review, and repository management — via the GitHub API and gh CLI. Use when you need to read or manage repository state, review PRs, check CI status, or automate GitHub workflows.
---

# GitHub Skill

## When to Use
- Listing and reviewing open pull requests
- Checking CI/CD run status and diagnosing failures
- Creating, updating, or closing issues
- Reading repository file contents or structure
- Generating PR descriptions from commit history
- Managing branch workflows

## Configuration

### Prerequisites
1. A GitHub account with access to the repositories you want to manage
2. A GitHub personal access token (classic or fine-grained)

### Environment Variables
```
GITHUB_TOKEN=your-github-personal-access-token
```

**Where to get your token:** https://github.com/settings/tokens

**Required scopes (classic token):**
- `repo` — Full control of private repositories
- `workflow` — Update GitHub Actions workflows
- `read:org` — Read org and team membership (if accessing org repos)

**Fine-grained token scopes:**
- Repository: Contents (Read), Pull requests (Read/Write), Issues (Read/Write), Actions (Read)

### Install in OpenClaw
```bash
openclaw skills install github
```

Add your token to OpenClaw settings or your `.env` file:
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

## Usage Patterns

### Pull Request Management
> "List my open PRs on [repo]"
> "What PRs need review on [org/repo]?"
> "Show me the diff for PR #42 on [repo]"
> "Draft a description for my latest PR based on the commits"

### CI Status
> "What's the CI status for the main branch on [repo]?"
> "Why is the build failing on PR #87?"
> "Show me the last failed test run"

### Issues
> "What open issues are labeled 'bug' on [repo]?"
> "Create an issue: [title and description]"
> "Close issue #103 with a comment"

### Code Review
> "Review the changes in PR #42 — focus on security and error handling"
> "What files were changed in the last merged PR?"

## API Details

The skill uses:
1. **GitHub REST API** (`https://api.github.com`) for standard operations
2. **GitHub CLI (`gh`)** when available on the system, for streamlined operations

### Direct API calls reference:
```
GET  /repos/{owner}/{repo}/pulls          # List pull requests
GET  /repos/{owner}/{repo}/actions/runs   # List workflow runs
GET  /repos/{owner}/{repo}/issues         # List issues
GET  /repos/{owner}/{repo}/contents/{path} # File contents
POST /repos/{owner}/{repo}/issues         # Create issue
```

## Limitations
- Rate limit: 5,000 requests/hour with authentication (fine-grained: varies)
- Cannot execute code or run workflows directly — triggers only
- Large diffs may be truncated; use specific file paths for targeted review
- Private org repositories require appropriate token scope and org membership
