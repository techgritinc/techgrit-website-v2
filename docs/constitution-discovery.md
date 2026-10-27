# Constitution Discovery Mode

## Overview

The `/speckit.constitution` command now supports **two modes** for creating your project constitution:

1. **Template Mode** (default): Start with best practices and customize
2. **Discovery Mode** (`--discover`): Analyze existing codebase to extract patterns

This guide explains when to use each mode and how to get the best results.

**Language Support**: Discovery mode is **language and framework agnostic** - it works with JavaScript, TypeScript, Python, Java, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, and many more. See [Language & Framework Support](./language-framework-support.md) for the complete list.

---

## Quick Start

### For New Projects
```bash
# Use template mode with interactive questions
/speckit.constitution

# Or use template mode with auto-accept for best practices
/speckit.constitution --template --auto-accept
```

### For Existing Projects
```bash
# Discover patterns automatically
/speckit.constitution --discover

# Discover + review every category interactively
/speckit.constitution --discover --interactive

# Discover patterns and auto-accept clear ones (>80% consistency)
/speckit.constitution --discover --auto-accept
```

---

## How Discovery Works

### Phase 1: Codebase Analysis

Discovery scans your project across **10 categories**:

| Category | What It Detects | Detection Method |
|----------|-----------------|------------------|
| **Project Structure** | Monorepo, microservices, library, feature-based | Directory analysis, package.json |
| **Tech Stack** | Languages, frameworks, build tools | Dependency files (package.json, requirements.txt, etc.) |
| **Testing Patterns** | Test framework, coverage, organization | Test file patterns, config files |
| **Architecture** | Layered, domain-driven, hexagonal, feature-based | Source directory structure |
| **Naming Conventions** | File, directory, variable naming | File name analysis, linting configs |
| **Error Handling** | Exceptions, Result types, error codes | Code pattern search |
| **Code Style** | Formatter, indent, quotes, line length | Config files (.prettierrc, .eslintrc, etc.) |
| **Dependencies** | Lockfiles, pinning strategy | Lock file analysis |
| **Git Workflow** | Branch strategy, commit format, PR templates | .github/, .gitlab/, git log |
| **Documentation** | Doc style, coverage, generators | Doc comment analysis |

### Phase 2: Pattern Extraction

For each category, discovery determines:

- **✓ Clear** (>80% consistency): Auto-include in constitution
- **⚠️ Conflict** (mixed approaches): Ask user which to standardize on
- **❓ Not Found**: Skip or ask user to define (if `--interactive`)

### Phase 3: Constitution Generation

Creates a constitution that:
- **Preserves existing patterns** (marked as "PRESERVE EXISTING")
- **Codifies dominant conventions** (marked as "CODIFIED")
- **Standardizes conflicts** (marked as "STANDARDIZED")
- **Includes confidence metrics** for each principle

---

## Discovery Output Example

```markdown
## 📊 Discovery Analysis Complete

**Analyzed**: 203 files, 15 directories, 8 config files
**Duration**: 12s

### Discovered Patterns

✓ **Project Structure**: Feature-based modules (src/features/<name>/)
  Confidence: 89% (15/17 features follow this pattern)

✓ **Tech Stack**: TypeScript + React + Vite
  Confidence: 100% (detected from package.json)

✓ **Testing**: Vitest + React Testing Library, 78% coverage
  Confidence: 92% (156 test files analyzed)

⚠️ **Naming Conventions**: CONFLICT DETECTED
  - kebab-case.ts: 45 files (75%)
  - PascalCase.tsx: 12 files (20%)
  - camelCase.js: 3 files (5%)

  Which should be the standard going forward?
  A. kebab-case.ts (Recommended - matches 75% of existing)
  B. PascalCase.tsx
  C. Custom rule

  Reply: A

✓ **Error Handling**: Result<T, E> pattern
  Confidence: 94% (67/71 error-prone functions use this)

✓ **Code Style**: Prettier + ESLint (2-space, single quotes, no semicolons)
  Confidence: 100% (detected from .prettierrc)

❓ **Git Workflow**: No .github/ directory found
  Define git workflow? [y/n]: y

  Branch strategy? [feature-branches/gitflow/trunk]: feature-branches
  Commit format? [conventional/custom]: conventional
```

---

## When to Use Each Mode

### Use **Template Mode** When:
- ✅ Starting a **new project** from scratch
- ✅ Doing a **major refactoring** that changes architecture
- ✅ You want to **impose new standards** on an existing project
- ✅ The codebase is too **small** to have clear patterns (<10 files)
- ✅ You have **specific principles** in mind regardless of current state

### Use **Discovery Mode** When:
- ✅ Working with an **established codebase** (>50 files)
- ✅ You want to **document existing practices** without disruption
- ✅ **Onboarding** new team members and need to codify "how we do things"
- ✅ Creating a constitution **after the fact** for a mature project
- ✅ You want to **detect inconsistencies** and standardize them

---

## Best Practices

### Before Running Discovery

1. **Ensure stable codebase**: Don't run during major refactoring
2. **Clean up**: Remove dead code, experimental branches
3. **Commit changes**: Discovery won't modify code, but commit for safety
4. **Check configs**: Ensure linting configs (.eslintrc, etc.) are current

### During Discovery

1. **Review conflicts carefully**: The dominant pattern isn't always the right one
2. **Use `--interactive`** for important projects where you want control
3. **Document decisions**: Note why you chose one pattern over another
4. **Consider team input**: For team projects, discuss conflicts before deciding

### After Discovery

1. **Review generated constitution**: Ensure principles make sense
2. **Add missing principles**: Discovery finds "what is", not "what should be"
3. **Update templates**: Run consistency check on spec/plan/tasks templates
4. **Communicate changes**: Share with team if standardizing existing conflicts
5. **Re-run periodically**: After major architecture changes, re-discover

---

## Discovery Limitations

### What Discovery CAN Detect:
- File and directory organization
- Technology stack and dependencies
- Testing frameworks and patterns
- Code style from config files
- Consistent naming patterns
- Error handling approaches
- Git workflow from repo structure

### What Discovery CANNOT Detect:
- **Unwritten policies** (e.g., "always get security review")
- **Domain-specific rules** (e.g., "PII must be encrypted")
- **Team agreements** (e.g., "no work on Fridays")
- **Future intentions** (e.g., "we're migrating to X")
- **Context-dependent rules** (e.g., "use pattern A for feature B")
- **Soft guidelines** (e.g., "prefer small functions")

For these, use **Template Mode** or manually edit the constitution after discovery.

---

## Troubleshooting

### "No clear patterns detected"
**Cause**: Codebase too small or very inconsistent
**Solution**: Use Template Mode or grow codebase first

### "Too many conflicts detected"
**Cause**: Codebase has mixed patterns (common in legacy projects)
**Solution**: Use `--interactive` to resolve each conflict deliberately

### "Discovery recommends wrong pattern"
**Cause**: Dominant pattern isn't the intended standard
**Solution**: Choose manually during conflict resolution, or edit constitution after

### "Constitution too specific/generic"
**Cause**: Discovery codifies what exists, may not match desired abstraction level
**Solution**: Edit constitution after discovery to adjust specificity

---

## Example Workflows

### Workflow 1: New Startup Project
```bash
# Start with best practices
/speckit.constitution --template

# Answer a few questions about your project
# Get a solid constitution with industry standards
```

### Workflow 2: Existing Enterprise Codebase
```bash
# Discover existing patterns
/speckit.constitution --discover --interactive

# Review and approve each detected pattern
# Resolve conflicts with team
# Generate constitution that matches reality
```

### Workflow 3: Open Source Project
```bash
# Discover patterns automatically
/speckit.constitution --discover

# Review generated constitution
# Manually add community guidelines
# Commit to repo as CONSTITUTION.md
```

### Workflow 4: Quick Audit
```bash
# Run discovery without writing
/speckit.constitution --discover --dry-run

# See what patterns exist
# Identify inconsistencies
# Decide whether to standardize
```

---

## Advanced: Hybrid Approach

You can combine both modes:

1. **Run Discovery**: Extract existing patterns
   ```bash
   /speckit.constitution --discover
   ```

2. **Review Output**: Identify gaps (e.g., no testing standards)

3. **Manual Edit**: Add missing principles from best practices
   ```markdown
   ### III. Test-First (NEW - NOT DETECTED)
   - All new code MUST have tests before merge
   - Minimum 80% coverage for new features
   - Rationale: Addressing technical debt; existing code only 45% covered
   ```

4. **Version as MINOR**: Adding new principles = minor version bump

This gives you the best of both worlds: **discovered reality + aspirational standards**.

---

## Integration with Other Commands

After creating your constitution:

### Generate Specs
```bash
/speckit.specify "user authentication"
# Spec will respect constitution principles
```

### Generate Plans
```bash
/speckit.plan
# Plan includes "Constitution Check" section
# Validates technical approach against principles
```

### Generate Tasks
```bash
/speckit.tasks
# Tasks respect testing, documentation, and workflow principles
# Includes principle-specific task phases
```

### Analyze Consistency
```bash
/speckit.analyze
# Validates specs/plans/tasks against constitution
# Flags violations
```

---

## FAQ

**Q: How often should I re-run discovery?**
A: After major architectural changes, new tech stack adoption, or every 6-12 months for evolving projects.

**Q: Can I edit the discovered constitution?**
A: Absolutely! Discovery is a starting point. Add, remove, or modify principles as needed.

**Q: What if discovery conflicts with our actual standards?**
A: Discovery finds "what is coded", not "what's policy". Use `--interactive` to override, or manually edit after.

**Q: Does discovery modify my code?**
A: No, discovery only reads and analyzes. It creates/updates the constitution file, nothing else.

**Q: Can I use discovery on a monorepo?**
A: Yes! Discovery will detect the monorepo structure and create principles for workspace organization.

**Q: What about multi-language projects?**
A: Discovery detects all languages and frameworks. You may need to resolve conflicts if different languages use different conventions.

---

## Next Steps

1. **Try it out**: Run `/speckit.constitution --discover` on your project
2. **Review output**: Check the generated `.specify/memory/constitution.md`
3. **Refine**: Edit to add missing principles or adjust specificity
4. **Integrate**: Use constitution with `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`
5. **Maintain**: Update constitution as your project evolves

For more help, see:
- [Constitution Template](../.specify/templates/constitution-template.md)
- [Spec-Kit Documentation](../README.md)
- [Planning Workflow](./planning-workflow.md)
