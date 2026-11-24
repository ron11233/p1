Lesson 6: reviewing AI work, and how to answer in interviews

Part A: reviewing an AI change

Use this checklist on every diff:

* Read the test first. Does it check the right behavior, and did it fail before the fix?
* Cause or symptom? Did the fix remove the cause, or just special-case the test?
* Scope. Run git diff --stat. Did it touch files you didn't expect?
* Evidence. Is there a command and its real output, not just "all tests pass"?
* Side effects. Look for new dependencies, network calls, secrets or permission changes.
* Intent. Does the change match the spec or the goal?

Anthropic's own engineers review for intent and consequences, backed by heavy automated checks. That works only because the checks exist.

Part B: likely interview questions and strong short answers

(The question list is from search summaries of hiring articles, so treat it as directional.)

| Question | Answer in one breath |
|---|---|
| How do you know an AI change is correct? | The test fails first and passes after the fix. I ask for the command and its output, read the diff for cause versus symptom, get an independent /code-review, and let CI plus a human merge be the backstop. |
| What can your agent break, and what stops it? | Permissions, deny rules and the sandbox limit what it can touch. A worktree contains its edits. Turn and budget caps limit how long it runs. Branch protection and a human merge are the last gate. |
| Subagent or inline? | A subagent for noisy output, parallel work or an independent review. Inline otherwise, because subagents cost tokens and don't improve answers. |
| How do you keep CLAUDE.md from rotting? | It holds only what the code can't tell Claude, under 200 lines. Every repeated mistake becomes an edit, strict rules become hooks, and I prune with /doctor prompt-audit. |
| What does a run cost, and how do you cut it? | I check /usage. Then I /clear between tasks, use lower effort for routine work, use Haiku for simple subagents, and cache stable prefixes. Batch handles non-urgent jobs, and --max-budget-usd sets a cap. |
| How do you evaluate a prompt change? | I use an eval set built from real failures, run it before and after, compare pass rates, and read some transcripts. The regression suite should stay near 100%. |
