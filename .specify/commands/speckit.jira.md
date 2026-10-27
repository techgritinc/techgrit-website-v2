
## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Purpose

Spec phase pipeline: JIRA ticket → `specs/<KEY>/jira.json` → `spec.md` → **clarify** → **MANUAL REVIEW GATE**.

Developers run one command and get a fully specified, clarified spec directory per JIRA ticket, ready for human review before proceeding to `/speckit.plan`.

## Prerequisites

This command requires the **mcp-atlassian** MCP server to be running.
If MCP tools (`jira_search`, `jira_get_issue`) are not available, display:

```
MCP server "atlassian" not connected. To set up:

1. Install: pip install mcp-atlassian   (or: uvx mcp-atlassian)
2. Ensure .mcp.json exists at repo root (already included ✓)
3. Set env vars as user environment variables:
     Cloud:     JIRA_URL, JIRA_USERNAME, JIRA_API_TOKEN
     Server/DC: JIRA_URL, JIRA_PERSONAL_TOKEN
   Windows (PowerShell):
     [System.Environment]::SetEnvironmentVariable("JIRA_URL", "https://yourcompany.atlassian.net", "User")
     [System.Environment]::SetEnvironmentVariable("JIRA_USERNAME", "you@company.com", "User")
     [System.Environment]::SetEnvironmentVariable("JIRA_API_TOKEN", "your-api-token", "User")
   Linux/Mac (~/.bashrc or ~/.zshrc):
     export JIRA_URL=https://yourcompany.atlassian.net
     export JIRA_USERNAME=you@company.com
     export JIRA_API_TOKEN=your-api-token
4. Restart your AI coding tool to pick up the MCP server.
```

### Optional: Spec Interpretation Level Custom Field

To enable spec interpretation level control, add a custom field in JIRA:

**JIRA Setup**:
1. Create a custom field named "Spec Interpretation Level" (or similar)
2. Set as Select List (single choice) with options:
   - Low (strict adherence to ticket)
   - Medium (balanced with reasonable inferences)
   - High (creative with best practices)
3. Note the custom field ID (e.g., `customfield_10050`)

**Spec-Kit Configuration**:
Add to `.env` (optional, defaults to field name search):
```
JIRA_SPEC_INTERPRETATION_FIELD=customfield_10050
```

If not configured, defaults to `0.0` (strict adherence) for all tickets.

## Supported Invocations

```text
/speckit.jira SB-42                           → smart: single ticket (auto-detects project)
/speckit.jira SB-1,SB-2,SB-3                 → smart: multiple tickets
/speckit.jira MYPROJ                          → all issues in project
/speckit.jira MYPROJ --sprint "Sprint 5"      → sprint filter
/speckit.jira MYPROJ --epic MYPROJ-100        → epic + children
/speckit.jira MYPROJ --bug MYPROJ-200         → specific bug
/speckit.jira MYPROJ --feature MYPROJ-123     → single feature
/speckit.jira MYPROJ --feature MYPROJ-1,MYPROJ-2  → multiple features
```

## Execution Steps

### Step 1: Build JQL & Fetch Issues via MCP

Parse `$ARGUMENTS` to construct a JQL query.

**Smart argument detection**: Before applying the mapping table below, check if the first positional argument contains a dash (e.g., `SB-42`). If it does, it's a ticket key — not a project key. Apply this shorthand rule:

| User Input | Interpreted As |
|---|---|
| `SB-42` | `--feature SB-42` (project key = `SB`, extracted from prefix before dash) |
| `SB-1,SB-2,SB-3` | `--feature SB-1,SB-2,SB-3` (project key = `SB`) |

This allows developers to simply type `/speckit.jira SB-42` instead of `/speckit.jira SB --feature SB-42`.

If the first positional argument does NOT contain a dash, treat it as a project key (existing behavior).

**Argument → JQL mapping**:

| User Argument | JQL |
|---|---|
| `MYPROJ` (positional) | `project = MYPROJ ORDER BY priority ASC, created ASC` |
| `--sprint "Sprint 5"` | append `AND sprint = "Sprint 5"` |
| `--epic MYPROJ-100` | `key = MYPROJ-100 OR parent = MYPROJ-100 OR "Epic Link" = MYPROJ-100` |
| `--bug MYPROJ-200` | `(key = MYPROJ-200 OR parent = MYPROJ-200) AND issuetype = Bug` |
| `--feature MYPROJ-123` | `key IN (MYPROJ-123)` |
| `--feature MYPROJ-1,MYPROJ-2` | `key IN (MYPROJ-1, MYPROJ-2)` |
| `--status "To Do,In Progress"` | append `AND status IN ("To Do", "In Progress")` |
| `--labels "backend,api"` | append `AND labels = "backend" AND labels = "api"` |

Call the MCP tool:

```
jira_search(jql="<constructed JQL>")
```

If no results, report "No issues found for JQL: `<jql>`" and **STOP**.

### Step 2: Fetch Full Details for Each Issue

For each issue returned by `jira_search`, call:

```
jira_get_issue(issue_key="<KEY>", fields="*all")
```

This returns full issue data including description, acceptance criteria, labels, components, subtasks, parent, priority, and custom fields.

**Extract Spec Interpretation Level**:
- Look for custom field specified in `JIRA_SPEC_INTERPRETATION_FIELD` env var (default: search for "Spec Interpretation Level" field by name)
- Map values: "Low" → 0.0, "Medium" → 0.25, "High" → 0.5
- If field not present or empty, default to 0.0

**For Epics**: Also fetch children by calling:
```
jira_search(jql="parent = <EPIC-KEY> ORDER BY priority ASC")
```
Then fetch full details for each child.

### Step 3: Create `specs/<KEY>/jira.json` for Each Ticket

For each top-level issue (Epics, standalone Stories/Tasks/Bugs), create a directory and write the raw JIRA data:

1. Create directory `specs/<KEY>/`
2. Write `specs/<KEY>/jira.json` containing the full MCP response data, structured as:

```json
{
  "key": "<KEY>",
  "summary": "<summary>",
  "issue_type": "<type name>",
  "status": "<status name>",
  "priority": "<priority name>",
  "description": "<full description text>",
  "acceptance_criteria": "<extracted from description if present>",
  "labels": ["label1", "label2"],
  "components": ["comp1"],
  "parent_key": "<parent key or empty>",
  "subtasks": ["SUB-1", "SUB-2"],
  "story_points": null,
  "sprint": "<sprint name>",
  "assignee": "<display name>",
  "reporter": "<display name>",
  "spec_interpretation_level": 0.0,
  "_exported_at": "<ISO timestamp>",
  "_jira_url": "<JIRA_URL>",
  "_children": [ ... ]
}
```

**Spec Interpretation Level**:
- Extracted from JIRA custom field `Spec Interpretation Level` (or `customfield_10050` - configure in `.mcp.json` if different)
- Maps to: **Low → 0.0**, **Medium → 0.25**, **High → 0.5**
- Default: **0.0** (strict adherence) if field not present
- Controls how creatively the LLM interprets JIRA content during spec generation (see Step 5)

**Grouping rules**:
- **Epics** become top-level dirs; their children are embedded in `_children`
- **Stories/Tasks/Bugs** without an epic parent get their own top-level dir
- **Sub-tasks** are embedded under their parent (not separate dirs)

### Step 4: Display Import Summary

Show the user what was imported:

```markdown
## JIRA Import: X tickets

| # | Key | Type | Summary | Priority | Interp. | Children |
|---|-----|------|---------|----------|---------|----------|
| 1 | PROJ-123 | Story | User login flow | P1 | 0.0 | 0 |
| 2 | PROJ-456 | Epic | Dashboard | P1 | 0.25 | 3 |
| ... | ... | ... | ... | ... | ... | ... |

Directories created:
  specs/PROJ-123/jira.json ✓
  specs/PROJ-456/jira.json ✓
```

**Priority mapping**: Highest/High→P1, Medium→P2, Low/Lowest→P3
**Interpretation levels**: 0.0=Strict, 0.25=Balanced, 0.5=Creative

**Do NOT ask for confirmation.** Proceed automatically to Step 5.

### Step 5: Generate spec.md for EACH Ticket

**For each ticket**, generate `specs/<KEY>/spec.md`:

1. Read `specs/<KEY>/jira.json`
2. Load `.specify/templates/spec-template.md` for the structure
3. Transform JIRA data into spec format using these mapping rules:

**JIRA → spec.md Mapping**:

| JIRA Field | Spec Section |
|---|---|
| `summary` | Feature title: `# Feature Specification: <summary> [<KEY>]` |
| `description` | Used to derive User Scenarios, Requirements, and Success Criteria |
| `acceptance_criteria` | Mapped to **Acceptance Scenarios** (Given/When/Then format) |
| `priority` | Mapped to spec-kit priority: Highest/High→P1, Medium→P2, Low/Lowest→P3 |
| `labels` | Mapped to **Key Entities** |
| `components` | Referenced in Requirements |
| `_children` (if Epic) | Each child becomes a **User Story** within the spec |
| `subtasks` | Each sub-task becomes an **Acceptance Scenario** under its parent story |

**For Epics** (has `_children` in jira.json):

```markdown
# Feature Specification: <Epic Summary> [EPIC-KEY]

**JIRA Source**: EPIC-KEY
**Created**: <today>
**Status**: Draft

## User Scenarios & Testing

### User Story 1 - <Child-1 Summary> [CHILD-1-KEY] (Priority: P1)
<Child-1 description>

**Acceptance Scenarios**:
1. **Given** <from acceptance criteria>, **When** <action>, **Then** <outcome>

### User Story 2 - <Child-2 Summary> [CHILD-2-KEY] (Priority: P2)
...

## Requirements
- **FR-001 [CHILD-1-KEY]**: System MUST <derived from child-1 summary/description>
- **FR-002 [CHILD-2-KEY]**: System MUST <derived from child-2>

## Success Criteria
- **SC-001**: <derived from epic description and children>

## JIRA Traceability
| Spec Item | JIRA Key | Type | Status |
|-----------|----------|------|--------|
| US1 | CHILD-1-KEY | Story | To Do |
| US2 | CHILD-2-KEY | Task | To Do |
| FR-001 | CHILD-1-KEY | Story | To Do |
```

**For standalone tickets** (Story, Task, Bug — no children):

```markdown
# Feature Specification: <Summary> [KEY]

**JIRA Source**: KEY
**Created**: <today>
**Status**: Draft

## User Scenarios & Testing

### User Story 1 - <Summary> [KEY] (Priority: <mapped priority>)
<description>

**Acceptance Scenarios**:
1. **Given** <derived from description/acceptance_criteria>, **When** <action>, **Then** <outcome>

## Requirements
- **FR-001 [KEY]**: System MUST <derived from summary and description>

## Success Criteria
- **SC-001**: <derived from description>

## JIRA Traceability
| Spec Item | JIRA Key | Type | Status |
|-----------|----------|------|--------|
| US1 | KEY | <type> | <status> |
```

4. Write the generated content to `specs/<KEY>/spec.md`

**IMPORTANT - Spec Interpretation Level Usage**:

The `spec_interpretation_level` field from `jira.json` controls how strictly you adhere to JIRA content vs. being creative:

**Level 0.0 (Low - Strict Adherence)**:
- Generate specs EXACTLY from JIRA ticket content
- Do NOT infer missing details
- Do NOT add best practices not mentioned in ticket
- Do NOT suggest improvements or alternatives
- If something is unclear or missing, mark as `[NEEDS CLARIFICATION: ...]`
- Stick to the literal interpretation of what's written
- Example: If ticket says "add login", spec should only cover login, not password reset, 2FA, etc.

**Level 0.25 (Medium - Balanced)**:
- Use JIRA content as the primary source
- Fill obvious gaps with industry standards (e.g., "login" implies validation, error messages)
- Make reasonable inferences based on context
- Add minimal best practices where clearly applicable
- Still mark non-obvious gaps as `[NEEDS CLARIFICATION: ...]`
- Example: If ticket says "add login", infer basic error handling but ask about session duration

**Level 0.5 (High - Creative Interpretation)**:
- Use JIRA content as a starting point
- Actively identify gaps and suggest improvements
- Propose better approaches even if not mentioned in ticket
- Add comprehensive best practices and edge cases
- Recommend architectural patterns and non-functional requirements
- Be proactive about security, performance, accessibility
- Example: If ticket says "add login", suggest 2FA, rate limiting, password policies, session management, etc.

**Application during spec generation**:
- If the description contains technical details, extract requirements from them
- If acceptance criteria are present, convert to Given/When/Then format
- If the description is sparse, behavior depends on interpretation level:
  - **0.0**: Mark as sparse, request clarification, generate minimal spec
  - **0.25**: Generate reasonable requirements from the summary with industry standards
  - **0.5**: Generate comprehensive requirements with best practices and recommendations
- Every requirement must be testable
- Every user story must have at least one acceptance scenario

### Step 6: Clarify Spec for EACH Ticket

**For each ticket**, run an ambiguity scan on `specs/<KEY>/spec.md` to catch gaps before planning.

Follow the same approach as `/speckit.clarify`:

1. Read `specs/<KEY>/spec.md` (just generated)
2. Perform a structured ambiguity & coverage scan across these categories:
   - **Functional Scope**: Core user goals, success criteria, explicit out-of-scope
   - **Domain & Data Model**: Entities, relationships, state transitions, scale
   - **Interaction & UX**: Critical user journeys, error/empty/loading states
   - **Non-Functional**: Performance, scalability, reliability, security, compliance
   - **Integration**: External services, data formats, failure modes
   - **Edge Cases**: Negative scenarios, rate limiting, conflict resolution
   - **Terminology**: Ambiguous terms, vague adjectives ("robust", "intuitive")

3. For each category, mark status: **Clear** / **Partial** / **Missing**

4. **If no critical ambiguities found** (all categories Clear or low-impact Partial):
   - Report: "No critical ambiguities detected for `<KEY>`. Proceeding to plan."
   - Skip to Step 7 for this ticket.

5. **If ambiguities found**, present up to **5 targeted questions** to the user:
   - Present ONE question at a time
   - For each question, provide a **recommended answer** based on JIRA data context, best practices, and the ticket description
   - Format as multiple-choice with recommendation highlighted:
     ```
     [KEY] Q1: <question>
     **Recommended:** Option A - <reasoning>

     | Option | Description |
     |--------|-------------|
     | A | ... |
     | B | ... |
     | C | ... |

     Reply with option letter, "yes" for recommended, or a short answer.
     ```
   - After each answer: update `specs/<KEY>/spec.md` immediately
     - Add a `## Clarifications` section with `### Session YYYY-MM-DD`
     - Append `- Q: <question> → A: <answer>`
     - Update the relevant spec section (requirements, edge cases, etc.)
   - Stop asking when:
     - All critical ambiguities resolved, OR
     - User says "done" / "skip" / "proceed", OR
     - 5 questions reached

6. **Auto-accept mode**: If the user invokes with `--no-clarify` in `$ARGUMENTS`, skip this step entirely. If invoked with `--auto-clarify`, automatically accept all recommended answers without asking.

### Step 7: Report Results & Manual Review Gate

After processing ALL tickets, display a final summary:

```markdown
## JIRA → Spec Phase Complete

| Key | jira.json | spec.md | Clarified |
|-----|-----------|---------|-----------|
| PROJ-123 | ✓ | ✓ | ✓ |
| PROJ-456 | ✓ | ✓ | ✓ |

**Directory structure**:
specs/
├── PROJ-123/
│   ├── jira.json     ← raw JIRA data
│   └── spec.md       ← feature specification (clarified)
├── PROJ-456/
│   ├── jira.json
│   └── spec.md

---
## ⏸ Manual Review Required

Specifications have been generated and clarified. Please review each spec before proceeding to planning.

### Next steps:
1. Review each spec.md and verify it captures the intended feature
2. (Optional) Run `/speckit.clarify` on individual specs for further refinement
3. Once satisfied, run `/speckit.plan` per ticket to generate the technical plan and tasks:
   → SPECIFY_FEATURE=PROJ-123 /speckit.plan
   → SPECIFY_FEATURE=PROJ-456 /speckit.plan
---
```

## Key Rules

1. **No manual steps within the Spec phase.** The pipeline (jira.json → spec.md → clarify) runs automatically for each ticket. The Plan phase requires manual spec review first.
2. **JIRA keys are preserved everywhere.** Every spec item, requirement, and task traces back to a JIRA key.
3. **Directory per ticket.** Each JIRA key gets its own `specs/<KEY>/` directory. No shared directories.
4. **Use `SPECIFY_FEATURE` env var.** When running downstream spec-kit commands on a specific ticket, set `SPECIFY_FEATURE=<KEY>` so spec-kit's scripts find the right directory.
5. **All files use absolute paths** when referencing other spec artifacts.
6. **Do not create git branches.** Tickets are identified by JIRA key, not by branch name.
7. **MCP-first.** All JIRA data is fetched via `jira_search` and `jira_get_issue` MCP tools. No Python scripts or direct HTTP calls.
