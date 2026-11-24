Lesson 11: cost, monitoring and team features

## 1. What drives cost

* Every request resends the whole conversation. A long session that holds three unrelated tasks pays for all three on every turn.
* The prompt cache makes repeats cheap, but it expires. It lasts about an hour on a subscription and five minutes on an API key. Subagents get five minutes.
* Background work keeps spending while you're away: `/loop`, `/goal` checks and subagents.
* Parallel sessions and subagents multiply tokens. Thirty `/batch` units cost roughly 30 times as much.

## 2. How to cut it

* Look first. Run `/usage` to see spend by skill, subagent, plugin and MCP server. It flags long context and frequent cache misses.
* `/clear` between unrelated tasks.
* `/compact` with a focus, such as `/compact keep the API changes and the test commands`. On a long session, compaction is itself a big request.
* Match model and effort to the task. Use Sonnet for routine work, `/effort low` for quick iteration, and high effort only on hard problems. Set `model: haiku` for simple subagents.
* Use hard caps on unattended runs: `--max-turns` and `--max-budget-usd`, plus a spend limit in your account.

## 3. Monitoring

* Claude Code can export OpenTelemetry data (traces, metrics and events) to your observability backend.
* Teams get an analytics dashboard for usage and adoption.
* The Agent SDK has its own cost tracking and OpenTelemetry export.

## 4. Team and organization features (know they exist)

* Managed settings: org-wide policy that no personal settings file can override. This is the only place for a security team's rules.
* MCP and plugin control: admins can allowlist or deny which servers and plugins people may use.
* Gateways: route Claude Code through a company gateway for SSO, usage tracking and per-developer spend limits.
* Cloud providers: run Claude Code through Amazon Bedrock, Google Cloud or Microsoft Foundry.
* Data policies: zero data retention and HIPAA setups exist for qualified accounts.
* Isolation: dev containers for consistent, isolated environments.
* PR automation: Code Review, PR Steward and Claude Approvals, billed through usage credits.

For interviews, the cost section is the one to know well. The team features only need a one-sentence description each.
