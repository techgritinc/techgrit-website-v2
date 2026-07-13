#!/usr/bin/env bash

# generate-tool-commands.sh - Generate tool-specific command files from canonical sources
#
# Reads .specify/commands/*.md (canonical) + _meta.json (metadata)
# Generates tool-specific command files for Claude Code, GitHub Copilot, etc.
#
# Usage:
#   ./generate-tool-commands.sh --tool claude     # Generate Claude Code commands
#   ./generate-tool-commands.sh --tool copilot    # Generate GitHub Copilot instructions
#   ./generate-tool-commands.sh --tool all        # Generate for all tools
#   ./generate-tool-commands.sh                   # Default: generate for all tools

set -e
set -u
set -o pipefail

#==============================================================================
# Configuration
#==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

CANONICAL_DIR="$REPO_ROOT/.specify/commands"
META_FILE="$CANONICAL_DIR/_meta.json"

# Output directories
CLAUDE_OUT="$REPO_ROOT/.claude/commands"
COPILOT_PROMPTS_OUT="$REPO_ROOT/.github/prompts"
COPILOT_MAIN="$REPO_ROOT/.github/copilot-instructions.md"

TOOL="${1:-all}"

# Handle --tool flag
if [[ "$TOOL" == "--tool" ]]; then
    TOOL="${2:-all}"
fi

#==============================================================================
# Utility Functions
#==============================================================================

log_info() { echo "INFO: $1"; }
log_success() { echo "  OK: $1"; }
log_error() { echo "ERROR: $1" >&2; }

# Extract a field from _meta.json for a given command
# Uses basic text parsing (no jq dependency required)
get_meta_field() {
    local command="$1"
    local field="$2"

    # Extract the value for the given command and field from JSON
    # This is a simplified parser - handles simple string values
    local in_command=false
    local brace_depth=0

    # Escape dots in command name for regex (speckit.jira -> speckit\.jira)
    local escaped_cmd="${command//./\\.}"

    while IFS= read -r line; do
        # Match top-level key: "speckit.jira": { (must have colon after quotes)
        if [[ "$line" =~ \"$escaped_cmd\":[[:space:]] ]]; then
            in_command=true
            if [[ "$line" =~ \{ ]]; then ((brace_depth++)) || true; fi
            continue
        fi
        if [[ "$in_command" == true ]]; then
            if [[ "$line" =~ \"$field\":[[:space:]]*\"(.*)\" ]]; then
                echo "${BASH_REMATCH[1]}"
                return 0
            fi
            # Track braces to know when we exit the command block
            if [[ "$line" =~ \{ ]]; then ((brace_depth++)) || true; fi
            if [[ "$line" =~ \} ]]; then
                if [[ $brace_depth -le 0 ]]; then
                    return 1
                fi
                ((brace_depth--)) || true
            fi
        fi
    done < "$META_FILE"
    return 1
}

# Extract handoffs array as YAML for Claude frontmatter
get_handoffs_yaml() {
    local command="$1"
    local in_command=false
    local in_handoffs=false
    local in_handoff_item=false
    local brace_depth=0
    local bracket_depth=0
    local has_handoffs=false
    local escaped_cmd="${command//./\\.}"

    while IFS= read -r line; do
        if [[ "$line" =~ \"$escaped_cmd\":[[:space:]] ]]; then
            in_command=true
            continue
        fi
        if [[ "$in_command" == true ]]; then
            if [[ "$line" =~ \"handoffs\":[[:space:]]*\[ ]]; then
                in_handoffs=true
                # Check if it's an empty array on the same line
                if [[ "$line" =~ \[\] ]]; then
                    return 0
                fi
                continue
            fi
            if [[ "$in_handoffs" == true ]]; then
                # End of handoffs array
                if [[ "$line" =~ ^[[:space:]]*\] ]]; then
                    return 0
                fi
                # Start of a handoff object
                if [[ "$line" =~ \{ ]]; then
                    in_handoff_item=true
                    has_handoffs=true
                    continue
                fi
                # End of a handoff object
                if [[ "$line" =~ \} ]]; then
                    in_handoff_item=false
                    continue
                fi
                # Extract handoff fields
                if [[ "$in_handoff_item" == true ]]; then
                    if [[ "$line" =~ \"label\":[[:space:]]*\"(.*)\" ]]; then
                        echo "  - label: ${BASH_REMATCH[1]}"
                    elif [[ "$line" =~ \"target\":[[:space:]]*\"(.*)\" ]]; then
                        echo "    agent: ${BASH_REMATCH[1]}"
                    elif [[ "$line" =~ \"prompt\":[[:space:]]*\"(.*)\" ]]; then
                        echo "    prompt: ${BASH_REMATCH[1]}"
                    elif [[ "$line" =~ \"send\":[[:space:]]*(true|false) ]]; then
                        echo "    send: ${BASH_REMATCH[1]}"
                    fi
                fi
            fi
            # Exit command block
            if [[ ! "$in_handoffs" == true ]] && [[ "$line" =~ ^[[:space:]]*\} ]]; then
                return 0
            fi
        fi
    done < "$META_FILE"
}

# Extract tools array for Claude frontmatter
get_tools_yaml() {
    local command="$1"
    local in_command=false
    local in_tools=false
    local escaped_cmd="${command//./\\.}"

    while IFS= read -r line; do
        if [[ "$line" =~ \"$escaped_cmd\":[[:space:]] ]]; then
            in_command=true
            continue
        fi
        if [[ "$in_command" == true ]]; then
            if [[ "$line" =~ \"tools\":[[:space:]]*\[ ]]; then
                in_tools=true
                # Empty array on same line
                if [[ "$line" =~ \[\] ]]; then
                    return 0
                fi
                # Inline array: extract all quoted strings from this line
                if [[ "$line" =~ \] ]]; then
                    # Tools array is all on one line — parse inline
                    local remaining="$line"
                    while [[ "$remaining" =~ \"([^\"]+)\" ]]; do
                        local match="${BASH_REMATCH[1]}"
                        # Skip the field name "tools"
                        if [[ "$match" != "tools" ]]; then
                            echo "$match"
                        fi
                        remaining="${remaining#*\"${match}\"}"
                    done
                    return 0
                fi
                continue
            fi
            if [[ "$in_tools" == true ]]; then
                if [[ "$line" =~ ^[[:space:]]*\] ]]; then
                    return 0
                fi
                if [[ "$line" =~ \"(.+)\" ]]; then
                    echo "${BASH_REMATCH[1]}"
                fi
            fi
            if [[ ! "$in_tools" == true ]] && [[ "$line" =~ ^[[:space:]]*\} ]]; then
                return 0
            fi
        fi
    done < "$META_FILE"
}

#==============================================================================
# Claude Code Generator
#==============================================================================

generate_claude() {
    log_info "Generating Claude Code commands..."
    mkdir -p "$CLAUDE_OUT"

    for canonical_file in "$CANONICAL_DIR"/speckit.*.md; do
        local name
        name=$(basename "$canonical_file" .md)
        local output_file="$CLAUDE_OUT/$name.md"

        # Get metadata
        local description
        description=$(get_meta_field "$name" "description" || echo "")

        # Build frontmatter
        {
            echo "---"
            echo "description: \"$description\""

            # Add handoffs if present
            local handoffs
            handoffs=$(get_handoffs_yaml "$name")
            if [[ -n "$handoffs" ]]; then
                echo "handoffs:"
                echo "$handoffs"
            fi

            # Add tools if present
            local tools
            tools=$(get_tools_yaml "$name")
            if [[ -n "$tools" ]]; then
                # Format as YAML inline array
                local tools_arr="["
                local first=true
                while IFS= read -r tool; do
                    if [[ "$first" == true ]]; then
                        tools_arr+="'$tool'"
                        first=false
                    else
                        tools_arr+=", '$tool'"
                    fi
                done <<< "$tools"
                tools_arr+="]"
                echo "tools: $tools_arr"
            fi

            echo "---"
            echo ""

            # Append canonical body
            cat "$canonical_file"
        } > "$output_file"

        log_success "$name.md"
    done

    log_info "Claude Code commands generated in $CLAUDE_OUT"
}

#==============================================================================
# GitHub Copilot Generator
#==============================================================================

generate_copilot() {
    log_info "Generating GitHub Copilot files..."

    # --- Generate main copilot-instructions.md ---
    {
        cat << 'HEADER'
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
HEADER

        # Add Phase 1 commands
        for cmd in speckit.jira speckit.specify speckit.clarify; do
            local desc
            desc=$(get_meta_field "$cmd" "description" || echo "")
            echo "| \`/speckit.${cmd#speckit.}\` | $desc |"
        done

        cat << 'MID1'

### Phase 2: Planning & Implementation
| Command | Description |
|---------|-------------|
MID1

        for cmd in speckit.plan speckit.tasks speckit.implement; do
            local desc
            desc=$(get_meta_field "$cmd" "description" || echo "")
            echo "| \`/speckit.${cmd#speckit.}\` | $desc |"
        done

        cat << 'MID2'

### Utilities
| Command | Description |
|---------|-------------|
MID2

        for cmd in speckit.analyze speckit.checklist speckit.constitution speckit.commit speckit.taskstoissues; do
            local desc
            desc=$(get_meta_field "$cmd" "description" || echo "")
            echo "| \`/speckit.${cmd#speckit.}\` | $desc |"
        done

        cat << 'FOOTER'

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
FOOTER
    } > "$COPILOT_MAIN"

    log_success "copilot-instructions.md"

    # --- Generate prompt files for Copilot Chat prompt picker ---
    log_info "Generating Copilot prompt files..."
    mkdir -p "$COPILOT_PROMPTS_OUT"

    for canonical_file in "$CANONICAL_DIR"/speckit.*.md; do
        local name
        name=$(basename "$canonical_file" .md)
        local output_file="$COPILOT_PROMPTS_OUT/$name.prompt.md"

        local description
        description=$(get_meta_field "$name" "description" || echo "")

        # Get tools to determine mode
        local tools
        tools=$(get_tools_yaml "$name")

        {
            echo "---"
            echo "agent: \"agent\""
            echo "description: \"$description\""
            echo "tools:"
            echo "  - \"changes\""

            # Add MCP tools if any
            if [[ -n "$tools" ]]; then
                while IFS= read -r tool; do
                    echo "  - \"$tool\""
                done <<< "$tools"
            fi

            echo "---"
            echo ""
            echo "Read and follow the workflow instructions in #file:.specify/commands/$name.md"
            echo ""
            echo "User request:"
            echo "\$PROMPT"
        } > "$output_file"

        log_success "$name.prompt.md"
    done

    log_info "Copilot prompt files generated in $COPILOT_PROMPTS_OUT"
}

#==============================================================================
# Main
#==============================================================================

main() {
    # Validate canonical source exists
    if [[ ! -d "$CANONICAL_DIR" ]]; then
        log_error "Canonical commands directory not found: $CANONICAL_DIR"
        exit 1
    fi

    if [[ ! -f "$META_FILE" ]]; then
        log_error "Metadata file not found: $META_FILE"
        exit 1
    fi

    local count
    count=$(find "$CANONICAL_DIR" -name "speckit.*.md" | wc -l)
    log_info "Found $count canonical command files"

    case "$TOOL" in
        claude)
            generate_claude
            ;;
        copilot)
            generate_copilot
            ;;
        all)
            generate_claude
            echo ""
            generate_copilot
            ;;
        *)
            log_error "Unknown tool: $TOOL"
            echo "Usage: $0 [--tool claude|copilot|all]"
            exit 1
            ;;
    esac

    echo ""
    log_info "Generation complete."
}

main "$@"
