---
agent: "agent"
description: "Pull JIRA tickets via MCP and auto-generate specs/<KEY>/jira.json and spec.md for each feature. (Phase 1: Spec)"
tools:
  - "changes"
  - "search/codebase"
  - "edit/editFiles"
  - "mcp:atlassian/jira_search"
  - "mcp:atlassian/jira_get_issue"
---

Read and follow the workflow instructions in #file:.specify/commands/speckit.jira.md

User request:
$PROMPT
