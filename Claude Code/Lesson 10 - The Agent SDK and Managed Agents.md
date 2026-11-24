Lesson 10: the Agent SDK and Managed Agents

In Lesson 4 you saw three ways to run an agent loop. Here they are in detail.

| Option | What it is | Tools | Who hosts |
|---|---|---|---|
| Messages API + Tool Runner | The regular API, where the SDK's Tool Runner automates the request, run-tool, repeat loop. | Only tools you define. No file or shell access. | You |
| Agent SDK | Claude Code as a library, in Python or TypeScript. You send a prompt and options, and it runs the whole loop. | Built-in tools (read, edit, bash, grep, web search), plus MCP, subagents and hooks. | You |
| Managed Agents (beta) | Anthropic runs the loop and a sandboxed container for each session. | Bash, files and code execution in their sandbox, plus skills, MCP and your own tools. | Anthropic |

## Agent SDK details

* It gives you everything Claude Code has: permissions, hooks, subagents, sessions, skills, and structured output.
* You add custom tools through an in-process MCP server.
* You host it, so read the docs on hosting and secure deployment: isolation, credentials and network controls.
* For cost and monitoring it supports usage tracking and OpenTelemetry.

## Managed Agents details

* You create an agent once, as a stored and versioned config (model, system prompt, tools). Each run is a session that streams events back to you.
* Secrets are stored in vaults, so the sandbox never holds them.
* It supports scheduled runs, and an "outcomes" feature where a separate grader keeps the agent iterating until it meets your rubric.
* It's in beta, and it bills session runtime on top of tokens. It isn't available under zero data retention or HIPAA coverage, nor on Bedrock, Vertex or Foundry.

## How to choose

* A one-shot or fixed pipeline feature: Messages API.
* Your own tools and your own loop: Messages API with the Tool Runner.
* An agent that works with files, code or shell: the Agent SDK if you'll host it, or Managed Agents if you don't want to run infrastructure.
* Long-running or scheduled agents without infrastructure: Managed Agents.

Whichever you choose, the concepts from earlier lessons still apply: verification, guardrails, evals and least privilege. Your Phase 4 project will be built on the Agent SDK.
