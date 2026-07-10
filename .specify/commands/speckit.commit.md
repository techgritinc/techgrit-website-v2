
## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty). The user may provide additional context for the commit message or PR details.

## Outline

### Step 1: Review changes

Launch a standalone agent to review the current changes thoroughly:

1. Run `git status` to see all modified, added, and deleted files (never use `-uall` flag).
2. Run `git diff` to see unstaged changes.
3. Run `git diff --cached` to see staged changes.
4. For each changed file, understand **what** changed and **why** it likely changed.
5. Group related changes into logical categories (e.g., feature work, refactoring, bug fix, config changes).
6. Identify any files that should NOT be committed (secrets, env files, generated files, large binaries). Warn the user if found.

### Step 2: Generate commit message

Based on the review, generate a concise commit message:

1. **Format**: Use conventional commits style (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, etc.)
2. **Title**: One line, under 72 characters, focused on the "why" not the "what"
3. **Body** (if changes are non-trivial): Bullet points summarizing the key changes
4. **Do NOT mention any AI tool, assistant, or co-author in the commit message.**
5. Present the proposed commit message to the user for approval before proceeding.

### Step 3: Determine remote

Check the git remotes:

```bash
git remote -v
```

- **If only one remote exists**: Use it automatically.
- **If multiple remotes exist**: Check if a preferred remote is already saved in this command (see SAVED_REMOTE below). If saved, use it. If not, ask the user which remote to push to using AskUserQuestion, then note their choice.

**SAVED_REMOTE**: <!-- NONE -->

If the value above is not `NONE`, use that remote name without prompting. When the user selects a remote for the first time, update this file by replacing `<!-- NONE -->` with the chosen remote name (e.g., `origin`).

### Step 4: Stage, commit, and push

1. **Stage files**: Add all relevant files by name. Do NOT use `git add -A` or `git add .`. Stage specific files based on the review in Step 1. Exclude any files that should not be committed.

2. **Commit**:
   ```bash
   git commit -m "<commit message>"
   ```
   Use a HEREDOC for multi-line messages:
   ```bash
   git commit -m "$(cat <<'EOF'
   <title>

   <body>
   EOF
   )"
   ```

3. **Push**:
   ```bash
   git push <remote> <current-branch>
   ```
   If the branch has no upstream, use:
   ```bash
   git push -u <remote> <current-branch>
   ```

### Step 5: Create Pull Request

After pushing, create a pull request targeting the base branch.

1. **Determine base branch**:
   - Check if `.specify/memory/base-branch` exists and read it for the target branch.
   - If not found, detect the default branch:
     ```bash
     git remote show <remote> | grep "HEAD branch"
     ```
   - Use the detected default branch as the PR target.

2. **Detect the feature context** (if available):
   - Check the current branch name for a feature identifier (e.g., `feature/001-user-auth` → `001-user-auth`)
   - Look for a matching spec directory under `specs/` with a `spec.md`
   - If found, use the spec's title and description to enrich the PR summary

3. **Generate PR title and body**:
   - **Title**: Short (under 70 characters), based on the commit message or spec title
   - **Body**: Use this format:
     ```markdown
     ## Summary
     <1-3 bullet points describing what this PR does and why>

     ## Changes
     <Grouped list of key changes by category>

     ## Test plan
     <Bulleted checklist of how to verify the changes>
     ```
   - If a spec was found, link to it: `**Spec**: specs/<feature>/spec.md`
   - **Do NOT mention any AI tool, assistant, or co-author in the PR.**

4. **Present the PR details to the user for approval** before creating it.

5. **Create the PR**:
   ```bash
   gh pr create --title "<title>" --body "$(cat <<'EOF'
   <body>
   EOF
   )"
   ```

6. If `gh` is not installed or not authenticated, skip PR creation and inform the user with the manual steps.

### Step 6: Report

Display a summary of everything that was done:

```
Commit:  <hash> <commit title>
Branch:  <branch-name>
Remote:  <remote>/<branch-name>
PR:      <PR URL> (if created)
```

## Key Rules

- Never commit files that likely contain secrets (`.env`, credentials, tokens, keys).
- Never mention AI tools or co-authors in the commit message or PR.
- Always present the commit message for user approval before committing.
- Always present the PR details for user approval before creating it.
- If there are no changes to commit, report that and stop.
- If the push fails (e.g., rejected due to remote changes), suggest `git pull --rebase` but do NOT run it automatically.
- If `gh` CLI is unavailable, skip PR creation gracefully and provide the manual URL.
