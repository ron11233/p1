Lesson 2: the extension layer

* CLAUDE.md: facts Claude can't find, kept under 200 lines. Use /init, then cut. CLAUDE.local.md holds personal preferences.
* .claude/rules/: rules scoped to paths.
* Skills: .claude/skills/<name>/SKILL.md. Only the description loads always. Use disable-model-invocation: true for side-effect workflows.
* Hooks: deterministic rules in .claude/settings.json. Use shell, HTTP or MCP handlers (prompt and agent hooks use a model). Exit 2 blocks. Examples: PreToolUse guards, PostToolUse formats, Stop runs tests.
* Subagents: .claude/agents/*.md with their own context, tools: and model:. They help with isolation, parallel work and independent review, but they cost tokens.
* MCP: connects external systems. Prefer a CLI like gh when one exists.
