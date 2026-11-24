Lesson 8: MCP

What it is. MCP (Model Context Protocol) is an open standard for connecting Claude to outside systems such as GitHub, a database, Slack or a browser. An MCP server exposes tools, and Claude Code is the client that calls them.

Using it

```
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

* `/mcp` inside a session shows each server and its status.
* A project's servers can be defined in `.mcp.json`. If the same server is defined in several places, local overrides project, and project overrides user.

Context cost. Connected servers add their tool names and instructions to context even when unused. Tool search is on by default, so full tool schemas load only when needed. Disable servers you don't use, and check `/context all`.

MCP or CLI? If the system has a CLI (such as `gh` for GitHub), use that. Claude already knows common CLIs. Use MCP for systems without one.

Skill plus MCP. MCP gives Claude the connection, and a skill teaches Claude how to use it well, such as your database schema and query habits.

Building your own. You write a small server that exposes a few functions as tools. The Agent SDK can also define custom tools through an in-process MCP server.

Security. An MCP server runs with whatever access you give it, and its tool results are untrusted content. Install only vetted servers, give each the least access it needs, and keep secrets out of repo config.
