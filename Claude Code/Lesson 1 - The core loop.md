Lesson 1: the core loop

* Claude Code works in a loop: gather context, act, verify. Without a check, it stops when the work looks done.
* Four rules:
   1. Say only what Claude can't see in the repo.
   2. Give it a pass/fail check and ask for evidence (command plus output).
   3. Put rules without exceptions in hooks or deny rules, not prose.
   4. Steer early: Esc on drift, and /clear plus one better prompt after two failed corrections.
* Failing test first proves the test can detect the bug. A test written after the code can be bent to fit it.
* Verification ladder, weakest to strongest: a prompt, /goal (a model judges), a Stop hook (deterministic), /code-review (a fresh reviewer), then CI plus a human merge.
* Commands: Shift+Tab, /plan, Esc, /rewind, /clear, /context all, /usage, /effort, /goal, /code-review, /init.
