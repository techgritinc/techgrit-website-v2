# Spec Interpretation Levels - Quick Reference

## At a Glance

| Aspect | 0.0 (Strict) | 0.25 (Balanced) | 0.5 (Creative) |
|--------|--------------|-----------------|----------------|
| **Philosophy** | Trust the ticket author | Use ticket + common sense | Use ticket as starting point |
| **Missing details** | Mark as NEEDS CLARIFICATION | Fill obvious gaps | Fill all gaps with recommendations |
| **Best practices** | ❌ Do NOT add | ✅ Add minimal/obvious | ✅ Add comprehensive |
| **Scope** | ❌ Do NOT expand | ⚠️ Minimal expansion | ✅ Proactive expansion |
| **Improvements** | ❌ Do NOT suggest | ⚠️ Only if clearly needed | ✅ Actively suggest |
| **Edge cases** | Only if mentioned | Basic/obvious ones | Comprehensive coverage |
| **Security** | Only if mentioned | Basic validation | Comprehensive (auth, rate limiting, etc.) |
| **Performance** | Only if mentioned | Basic (avoid obvious issues) | Proactive optimization |
| **Accessibility** | Only if mentioned | Basic (semantic HTML) | WCAG 2.1 AA compliance |
| **Error handling** | Only if mentioned | Standard error messages | Comprehensive (retries, fallbacks, logging) |

## When to Use Each Level

### 🔒 Level 0.0 (Strict) - "Do exactly what's written"
**Use when:**
- ✅ Requirements already complete and approved
- ✅ Compliance/regulatory constraints
- ✅ Team has senior architects doing design
- ✅ High risk of over-engineering

**Typical ticket types:**
- Hotfixes
- Bug fixes
- Compliance requirements
- Well-defined feature specs

**Example:** *"Fix login button alignment on mobile"* → Spec covers ONLY button alignment, nothing more

---

### ⚖️ Level 0.25 (Balanced) - "Use common sense" *(DEFAULT)*
**Use when:**
- ✅ Normal development workflow
- ✅ Clear goals but some details missing
- ✅ Time to market is important
- ✅ Default for most scenarios

**Typical ticket types:**
- Standard features
- Enhancement requests
- User stories
- Most tickets

**Example:** *"Add login button"* → Spec includes validation, error messages, loading states

---

### 🚀 Level 0.5 (Creative) - "Be my architect advisor"
**Use when:**
- ✅ High-level or vague tickets
- ✅ Junior team needing guidance
- ✅ Greenfield/new projects
- ✅ Establishing patterns
- ✅ Quality over speed

**Typical ticket types:**
- Epics
- Technical debt cleanup
- "Improve X" tickets
- Innovation initiatives
- Architecture decisions

**Example:** *"Add login"* → Spec includes 2FA, rate limiting, session management, password policies, security audit logging

---

## Quick Decision Tree

```
Is the ticket already well-defined with complete acceptance criteria?
├─ YES → Use 0.0 (Strict)
└─ NO  → Does your team value proactive best practices?
         ├─ YES → Use 0.5 (Creative)
         └─ NO  → Use 0.25 (Balanced) [DEFAULT]
```

## Example Comparison

### Ticket: "Add search functionality"

#### Level 0.0 (Strict)
```markdown
## Requirements
- FR-001: System MUST provide search input field
- FR-002: System MUST return matching results
- FR-003: [NEEDS CLARIFICATION: What fields to search?]
- FR-004: [NEEDS CLARIFICATION: How to rank results?]
- FR-005: [NEEDS CLARIFICATION: Pagination requirements?]
```

#### Level 0.25 (Balanced)
```markdown
## Requirements
- FR-001: System MUST provide search input field with auto-submit
- FR-002: System MUST search across title and description fields
- FR-003: System MUST display results with pagination (20 per page)
- FR-004: System MUST show "No results found" message when appropriate
- FR-005: System MUST handle special characters in search queries
- FR-006: [NEEDS CLARIFICATION: Relevance ranking algorithm?]
- FR-007: [NEEDS CLARIFICATION: Search filters (date, category)?]
```

#### Level 0.5 (Creative)
```markdown
## Requirements

### Core Search
- FR-001: System MUST provide search input with:
  - Auto-complete suggestions (min 3 chars)
  - Search history (last 10 searches)
  - Clear button
  - Keyboard shortcut (Ctrl+K / Cmd+K)
- FR-002: System MUST search across: title, description, tags, author
- FR-003: System MUST implement full-text search with:
  - Fuzzy matching (typo tolerance)
  - Stemming (search → searches, searching)
  - Stop word filtering
- FR-004: System MUST rank results by relevance score:
  - Title matches ranked higher than description
  - Exact matches higher than partial
  - Recent items boosted in score

### User Experience
- FR-005: System MUST display results with:
  - Highlighted matching text
  - Result count and search time
  - Pagination (20 per page) with infinite scroll option
  - Result preview (first 200 chars)
- FR-006: System MUST provide advanced filters:
  - Date range (last day/week/month/year)
  - Category/tags
  - Author
  - Sort by (relevance/date/title)
- FR-007: System MUST show search state:
  - Loading spinner during search
  - Empty state with suggestions
  - Error state with retry

### Performance
- FR-008: System MUST implement search optimization:
  - Debounce input (300ms)
  - Cache recent searches (15 min TTL)
  - Index for fast lookups
  - Max query length: 200 chars
- FR-009: System MUST complete searches within 500ms
- FR-010: System MUST support 50 concurrent searches

### Accessibility
- FR-011: System MUST be keyboard navigable:
  - Arrow keys to navigate results
  - Enter to select
  - Escape to close
- FR-012: System MUST provide ARIA labels and live regions

## Recommendations
- Consider: Elasticsearch or Algolia for large datasets (>10K records)
- Consider: Search analytics to track popular queries
- Consider: Saved searches/favorites feature
```

## Configuration

### JIRA Setup
1. Create custom field "Spec Interpretation Level"
2. Type: Select List
3. Options: Low, Medium, High

### .env Configuration
```bash
JIRA_SPEC_INTERPRETATION_FIELD=customfield_10050
```

## FAQ

**Q: Can I mix levels in one project?**
**A:** Yes! Recommended strategy:
- Bugs → 0.0 (Strict)
- Features → 0.25 (Balanced)
- Epics → 0.5 (Creative)

**Q: What's the default if not set?**
**A:** 0.0 (Strict) - safest default

**Q: Can I override after generation?**
**A:** Yes, edit `jira.json` and regenerate spec:
```bash
# Edit specs/PROJ-123/jira.json: "spec_interpretation_level": 0.5
SPECIFY_FEATURE=PROJ-123 /speckit.specify
```

**Q: Does this affect implementation?**
**A:** No, only spec generation from JIRA. Implementation follows the spec regardless of level.

---

📖 **Full Guide**: [Spec Interpretation Levels](spec-interpretation-levels.md)
