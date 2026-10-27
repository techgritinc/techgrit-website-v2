# Spec-Kit: Spec-Driven Development Toolkit

This project uses **spec-kit** for structured feature development. Spec-kit provides
workflows that turn requirements (JIRA tickets or feature descriptions) into specifications,
technical plans, and actionable task breakdowns.

## How to Use Spec-Kit Workflows

Use `/speckit.*` commands from the Copilot Chat prompt picker (`.github/prompts/`).
Each prompt loads the canonical workflow from `.specify/commands/`.

## Available Workflows

### Phase 1: Specification
| Command | Description |
|---------|-------------|
| `/speckit.jira` | Pull JIRA tickets via MCP and auto-generate specs/<KEY>/jira.json and spec.md for each feature. (Phase 1: Spec) |
| `/speckit.specify` | Create or update the feature specification from a natural language feature description. (Phase 1: Spec) |
| `/speckit.clarify` | Identify underspecified areas in the current feature spec by asking up to 5 highly targeted clarification questions and encoding answers back into the spec. (Phase 1: Spec) |

### Phase 2: Planning & Implementation
| Command | Description |
|---------|-------------|
| `/speckit.plan` | Generate the technical plan and tasks from a reviewed spec. (Phase 2: Plan) |
| `/speckit.tasks` | Generate an actionable, dependency-ordered tasks.md for the feature based on available design artifacts. |
| `/speckit.implement` | Execute the implementation plan by processing and executing all tasks defined in tasks.md |

### Utilities
| Command | Description |
|---------|-------------|
| `/speckit.analyze` | Perform a non-destructive cross-artifact consistency and quality analysis across spec.md, plan.md, and tasks.md after task generation. |
| `/speckit.checklist` | Generate a custom checklist for the current feature based on user requirements. |
| `/speckit.constitution` | Create or update the project constitution from interactive or provided principle inputs, ensuring all dependent templates stay in sync. |
| `/speckit.commit` | Review changes, generate a commit message, push to remote, and create a pull request. |
| `/speckit.taskstoissues` | Convert existing tasks into actionable, dependency-ordered GitHub issues for the feature based on available design artifacts. |

## Typical Workflow

```
Phase 1: Spec
  /speckit.jira PROJ-123                → generates spec.md
  /speckit.clarify                      → (optional) refines spec
  ⏸ MANUAL REVIEW of spec.md

Phase 2: Plan
  /speckit.plan                         → generates plan.md + tasks.md
  /speckit.implement                    → creates feature branch + writes code
```

## Project Structure

- `.github/prompts/` — Copilot prompt files (/speckit.* commands)
- `.specify/commands/` — Canonical workflow definitions (tool-agnostic)
- `.specify/templates/` — Output templates for specs, plans, tasks
- `.specify/scripts/bash/` — Helper scripts used by workflows
- `.specify/memory/` — Project constitution and standards
- `.mcp.json` — MCP server configuration (JIRA integration)
- `specs/` — Generated feature specifications (per ticket)
