Lesson 4: the API and the agent loop

* Three tiers: single call, workflow (your code decides the steps), agent (Claude decides). Start at the lowest tier that works.
* Agent loop: Claude Code sends your prompt and context, Claude asks for a tool, Claude Code runs it (after permissions and hooks) and returns the result, and this repeats until Claude replies without asking for a tool. You always run an agent in Claude Code.
* Tiers combine. An agent is many single calls, a workflow can contain agents, and an agent can start a workflow.
* Settings: effort (low is fast, high is careful), structured output (JSON in your shape), and prompt caching (stable prefix first).
* Who runs the loop: you, the Agent SDK, or Managed Agents (beta).
* Cost ladder per million tokens (input/output): Haiku 5.5 $0.10/$0.50, Sonnet 5.5 $2/$10, Opus 5.5 $4/$20, Fable 5.2 $8/$40.
