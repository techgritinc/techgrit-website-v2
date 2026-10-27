---
agent: "agent"
description: "Convert existing tasks into actionable, dependency-ordered GitHub issues for the feature based on available design artifacts."
tools:
  - "changes"
  - "search/codebase"
  - "edit/editFiles"
  - "mcp:github/github-mcp-server/issue_write"
---

Read and follow the workflow instructions in #file:.specify/commands/speckit.taskstoissues.md

User request:
$PROMPT
