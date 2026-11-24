Lesson 3: parallel and unattended runs

* Worktrees (claude -w): separate folders and branches. They prevent live overwrites, not merge conflicts.
* /batch: one change split into 5–30 units, each a subagent in its own worktree. You approve the plan, and each unit opens a PR.
* Dynamic workflow: a script Claude writes that runs many subagents, with verification phases. Use it for audits and cross-checked results.
* Headless: claude -p with --bare, --allowedTools, --permission-mode dontAsk, --max-turns and --max-budget-usd.
* Five questions before unattended runs:
   1. What does done look like?
   2. Can it check itself?
   3. What can it touch?
   4. What stops it?
   5. Who signs off?
* Protect main.
* Hooks from settings also run in subagents. Use SubagentStop to block a subagent from finishing.
