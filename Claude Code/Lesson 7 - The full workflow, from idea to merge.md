Lesson 7: the full workflow, from idea to merge

This combines Lessons 1–6 into one routine.

1. Spec. Ask Claude: "Interview me until you can write the spec, then write it to SPEC.md". Do this for anything non-trivial.
2. Tests first. In a fresh session, write tests from `SPEC.md`. Confirm they fail for the right reason, then commit them.
3. Guardrails before any building:
   * Deny rules for secrets.
   * A `Stop` hook that checks that existing tests are unchanged and that the suite passes.
   * A worktree or branch for isolation.
   * `--max-turns` or a budget cap if it runs unattended.
4. Build. Implement in a fresh session pointed at the spec.
   * Use `/goal` for "done" items you can't script, such as "every requirement in `SPEC.md` is implemented".
5. Steer.
   * `Esc` when Claude drifts.
   * `/rewind` to undo.
   * `/clear` plus one better prompt after two failed corrections.
6. Verify.
   * Ask for evidence: the commands and their output.
   * Run `/verify` to have Claude build and run the app.
   * Get an independent review: "use a subagent to review the diff against `SPEC.md`, report correctness gaps, skip style". The "skip style" part matters, because a reviewer told to find problems always finds something.
7. Read the diff with the Lesson 6 checklist: cause versus symptom, scope, side effects, intent.
8. Ship. Open a PR, let CI run, and have a human merge.
9. Retro. Turn every repeated mistake into a `CLAUDE.md` edit, a hook, or a skill.
