Lesson 9: permissions, sandbox and auto mode

## Permission modes (cycle with Shift+Tab)

| Mode | What runs without asking |
|---|---|
| default (manual) | Reads only |
| acceptEdits | Reads and file edits in the working folder |
| plan | Reads only. Edits are blocked until you approve a plan |
| auto | Everything, with a classifier model reviewing actions |
| dontAsk | Only pre-approved tools. Anything else is denied |
| bypassPermissions | Everything. Use only in a disposable container or VM |

## Auto mode

* It's the default in terminal and VS Code sessions.
* The classifier blocks risky actions by default, such as curl | bash, production deploys, force pushes and sending sensitive data out.
* It's a judgment call, not a guarantee. After 3 blocks in a row (or 20 total), it pauses and asks you again.
* Things you say in chat, like "don't push", can be lost when the conversation compacts. Put important rules in deny rules or hooks.

## Permission rules (in settings.json)

```json
{
  "permissions": {
    "allow": ["Bash(npm test)"],
    "ask":   ["Bash(git push *)"],
    "deny":  ["Read(./.env)", "Read(./secrets/**)"]
  }
}
```

* Deny rules hold in every mode, including auto and bypassPermissions.
* Rules match tool calls, not intent. A Read deny catches cat .env, but it won't catch a script that opens the file.
* Broad allow rules like Bash(*) are dropped when you enter auto mode.

## Sandbox (/sandbox)

* It's an OS-level limit on which files and network hosts Claude's shell commands can reach (macOS, Linux, WSL2).
* It also picks up your Read deny and web-domain rules.
* By default Claude may ask to retry a blocked command outside the sandbox. Strict mode turns that off.
* Use rules and the sandbox together for security-critical limits.

## Where a rule lives decides who it affects

* .claude/settings.local.json and ~/.claude/settings.json are yours only.
* .claude/settings.json is committed to the repo and applies to everyone.
* Managed settings belong to the organization and can't be overridden.

Practical setup: use auto mode with deny rules for secrets and a sandbox for risky work. If it prompts too often, run /fewer-permission-prompts.
