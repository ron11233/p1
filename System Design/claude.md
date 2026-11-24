context
stack time budget
goal - definitation of done


Context:
-has size limit
-every prompt reads all the conversation - so long session or unrelated messages are bad for result
- use /clear between unrelated tasks 

Claude.md - like a first prompt for every session. keep shorty with only things claude can't learn by reading the code ~ suggestion NOT GURANTEED. 

# Commands
- Run all tests: npm test
- Run one test file: npm test -- src/users/users.test.ts
- Typecheck: npm run typecheck
- Lint: npm run lint

# Conventions
- Validate all API input with zod.
- Throw AppError (src/errors.ts), never plain Error.

# Gotchas
- src/legacy/ looks unused, but the billing service still imports it. Don't delete it.
- Tests need the local DB running: docker compose up -d db



deny rules: in ,claude/settings.json - deny certain actions (like edit some file etc..)
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Edit(./migrations/**)",
      "Bash(git push --force *)",
      "Bash(rm -rf *)"
    ]
  }
}



hooks- code that claude code enforces when the time of the hook. difference between skill/prompt- skill/prompt are just passed to claude - and he decides what to do with it. hooks is enforced by claude code, which means even if claude code fails or doesnt enforce it happens claude code won't satisfy and keep coming back to claude until its satisfied 
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/run-tests.sh"
          }
        ]
      }
    ]
  }
}




skills-  like a function i call inside a prompt, it just reference to more promopt i saved preamtivly. claude can also u e a skill on its own based on description if it decides it matches. 
---
name: new-endpoint
description: Add a new REST API endpoint following our conventions
---
When adding an endpoint:
1. Write a failing test first in src/<resource>/<resource>.test.ts
2. Add the route in src/<resource>/routes.ts
3. Validate the request body and params with zod
4. Return errors with AppError, using the right HTTP status
5. Done when npm test and npm run typecheck both pass.
   Show me the test output.


sandbox: 
sandbox-  limitations for claude code. limits r/w access and network calls. helps with prompt injection 

Suggestions (Claude reads them)	| Enforced (Claude Code applies them)
Prompt, CLAUDE.md, skills	      | Deny rules, hooks, sandbox



Why claude fails - 
Problem              |      cause          |      fix
made wrong thing        not enough context     add contexet through prompt/skill/spec/claude.md

result says done but its unfinished |  checks aren't good |   have some hook for test after result is finished with a clear goal. 

did something it shouldnt |   used prompt for not doing something | for enforcement always use hooks / deny rule / sandbox

too slow or expensive |      default settings arent suitable |      define specific settings - model, effort, permissions, clear between tasks


how to make sure code works: 
start with spec and built it in fresh session. 
in the building session - first have it write all tests (that should fail) because no code is written yet. have a clear GOAL.
once it finished writing all tests for the wanted behaviour make the code. after finished code have a Stop hook run tests
if test not pass send until passed. have the code blocked by deny rules from editing the tests btw. that will avoid making
tests weaker. then when it passes - have a fresh code-review agent that checks it works according to GOAL and i will also look at code.
if i see changes in tests ill review and anyways review diffs. 

Big task
1. make spec.md with 1 session
2. make new session and let it build from spec (clear context)


