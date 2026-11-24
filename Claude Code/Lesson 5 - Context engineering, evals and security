Lesson 5 summary

Context engineering

* Give Claude the smallest set of useful context for the task. A fuller window means worse recall.
* Keep everything that loads automatically (CLAUDE.md, skill descriptions, auto memory, MCP tool names) short, and include only what Claude can't learn from the code.
* Claude reads files itself on demand. Point it at the key files with @, and don't preload the codebase.
* Start a new session (/clear) for each unrelated task.
* Use subagents to keep noisy output out of your chat, run work in parallel, or get an independent review. They don't make answers better, and they cost extra tokens.
* Write specs and progress to a file (SPEC.md) so a fresh session can continue. Use /compact on long sessions.

Evals

* An eval is an automated test of the AI part of your software.
* You write cases (an input plus the expected result) from real failures, and a script runs them and gives a pass rate.
* Rerun after every change to the prompt, model or tools to see whether it improved.
* Read some transcripts to check the grader is fair.

Security

* The main threat is prompt injection: untrusted content (a web page, file or issue) tells Claude what to do. It's most dangerous when an agent has private data, reads untrusted content, and can send data out.
* Give only the tools and access the task needs.
* Use deny rules and the sandbox for hard limits. Auto mode's classifier is only a judgment call.
* Trust only vetted MCP servers.
* Keep secrets out of context and out of the repo.
* Require human approval for irreversible actions, such as database changes.
