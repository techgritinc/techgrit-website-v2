# Spec Interpretation Levels

This document explains how the **Spec Interpretation Level** custom field in JIRA controls the creativity and interpretation during spec generation in spec-kit.

## Overview

The Spec Interpretation Level acts like a "temperature" parameter in AI prompting, controlling how strictly the LLM adheres to JIRA ticket content versus allowing creative interpretation and best practices.

| Level | Value | Behavior | Use Case |
|-------|-------|----------|----------|
| **Low** | 0.0 | Strict adherence to ticket | Well-defined tickets with complete requirements |
| **Medium** | 0.25 | Balanced with reasonable inferences | Typical tickets needing some gap-filling |
| **High** | 0.5 | Creative with best practices | Vague tickets needing guidance and improvements |

## Configuration

### 1. JIRA Setup

Create a custom field in JIRA:
1. Navigate to JIRA Settings → Issues → Custom Fields
2. Create new field: "Spec Interpretation Level"
3. Type: Select List (single choice)
4. Options:
   - **Low** - Strict adherence to ticket
   - **Medium** - Balanced with reasonable inferences
   - **High** - Creative with best practices
5. Note the custom field ID (e.g., `customfield_10050`)

### 2. Spec-Kit Configuration

Add to `.env`:
```bash
JIRA_SPEC_INTERPRETATION_FIELD=customfield_10050
```

If not configured, defaults to `0.0` (strict) for all tickets.

## Detailed Behavior

### Level 0.0 - Strict Adherence (Low)

**Philosophy**: Trust the JIRA ticket author. Generate specs EXACTLY from what's written. Do NOT assume, infer, or add anything not explicitly mentioned.

**Behavior**:
- ✅ Extract only what's explicitly stated
- ✅ Mark unclear items as `[NEEDS CLARIFICATION: ...]`
- ❌ Do NOT infer missing details
- ❌ Do NOT add best practices not mentioned
- ❌ Do NOT suggest improvements or alternatives
- ❌ Do NOT expand scope beyond what's written

**Best for**:
- Regulatory/compliance requirements (must match exactly what's approved)
- Well-defined tickets with complete acceptance criteria
- Teams that want full control over spec content
- Situations where assumptions could be costly

---

### Level 0.25 - Balanced (Medium)

**Philosophy**: Use JIRA as primary source but fill obvious gaps with industry standards. Make reasonable inferences that 90% of developers would agree with.

**Behavior**:
- ✅ Use JIRA content as foundation
- ✅ Fill obvious gaps (e.g., "login" → includes validation, error messages)
- ✅ Apply minimal best practices where clearly applicable
- ✅ Make context-based inferences (e.g., "user profile" → CRUD operations)
- ⚠️ Still mark non-obvious gaps as `[NEEDS CLARIFICATION: ...]`
- ❌ Do NOT add extensive features beyond ticket scope

**Best for**:
- Typical development workflows
- Tickets with clear goals but some missing details
- Balanced approach between control and efficiency
- Default choice for most teams

---

### Level 0.5 - Creative Interpretation (High)

**Philosophy**: Use JIRA as a starting point. Proactively identify gaps, suggest improvements, and apply comprehensive best practices. Be a senior architect advisor.

**Behavior**:
- ✅ Use JIRA content as inspiration
- ✅ Identify and fill all gaps with recommendations
- ✅ Suggest better approaches even if not mentioned
- ✅ Add comprehensive best practices:
  - Security (authentication, authorization, rate limiting, input validation)
  - Performance (caching, indexing, optimization)
  - Reliability (error handling, retries, fallbacks)
  - Observability (logging, metrics, tracing)
  - Accessibility (WCAG, ARIA, keyboard navigation)
- ✅ Recommend architectural patterns and design principles
- ✅ Propose non-functional requirements
- ✅ Suggest testing strategies

**Best for**:
- Vague or high-level tickets needing detailed planning
- Junior team members who need guidance
- Greenfield projects where best practices should be established
- Innovation/exploration phases
- Technical debt reduction initiatives

## Practical Examples

### Example 1: Login Feature

**JIRA Ticket**:
```
Title: Add user login
Description: Users should be able to log in to the application.
Acceptance Criteria:
- User can enter username and password
- System validates credentials
- User is redirected to dashboard on success
```

#### Level 0.0 (Strict) → Generated Spec:

```markdown
## Requirements
- **FR-001**: System MUST provide username input field
- **FR-002**: System MUST provide password input field
- **FR-003**: System MUST validate entered credentials
- **FR-004**: System MUST redirect to dashboard on successful validation
- **FR-005**: [NEEDS CLARIFICATION: What happens on failed login?]
- **FR-006**: [NEEDS CLARIFICATION: Password requirements not specified]
- **FR-007**: [NEEDS CLARIFICATION: Session management not specified]
```

#### Level 0.25 (Balanced) → Generated Spec:

```markdown
## Requirements
- **FR-001**: System MUST provide username input field with validation
- **FR-002**: System MUST provide password input field (masked)
- **FR-003**: System MUST validate entered credentials against user database
- **FR-004**: System MUST redirect to dashboard on successful validation
- **FR-005**: System MUST display error message on failed login
- **FR-006**: System MUST prevent empty username/password submission
- **FR-007**: [NEEDS CLARIFICATION: Session duration and timeout behavior?]
- **FR-008**: [NEEDS CLARIFICATION: Multi-factor authentication required?]
- **FR-009**: [NEEDS CLARIFICATION: Password reset flow?]

## Edge Cases
- What happens after 3 failed login attempts?
- How are database connection errors handled?
```

#### Level 0.5 (Creative) → Generated Spec:

```markdown
## Requirements

### Authentication Core
- **FR-001**: System MUST provide username input field with:
  - Email format validation
  - Real-time validation feedback
  - Trim whitespace automatically
- **FR-002**: System MUST provide password input field with:
  - Masked input (toggle visibility option recommended)
  - Minimum 8 characters enforcement
  - Password strength indicator
- **FR-003**: System MUST validate credentials using secure hash comparison (bcrypt/Argon2)
- **FR-004**: System MUST create session token (JWT) with 24-hour expiration on successful login
- **FR-005**: System MUST redirect to dashboard on success with loading state

### Security & Error Handling
- **FR-006**: System MUST implement rate limiting (5 attempts per 15 minutes per IP)
- **FR-007**: System MUST display generic error message on failed login (avoid revealing which field is wrong)
- **FR-008**: System MUST log failed login attempts with timestamp and IP
- **FR-009**: System MUST lock account after 5 failed attempts and require password reset
- **FR-010**: System MUST implement CSRF protection on login form
- **FR-011**: System MUST use HTTPS for all authentication endpoints

### User Experience
- **FR-012**: System MUST provide "Forgot Password?" link
- **FR-013**: System MUST show loading spinner during authentication
- **FR-014**: System MUST preserve redirect URL if user was sent to login from protected page
- **FR-015**: System MUST provide "Remember me" option (30-day session)
- **FR-016**: System MUST be keyboard navigable (tab order: username → password → submit)

### Non-Functional
- **NFR-001**: Login must complete within 2 seconds under normal load
- **NFR-002**: System MUST support 1000 concurrent login attempts
- **NFR-003**: Login flow MUST meet WCAG 2.1 AA accessibility standards

## Recommendations
- **Consider**: Multi-factor authentication (TOTP or SMS) for enhanced security
- **Consider**: Social login options (Google, GitHub, Microsoft)
- **Consider**: Biometric authentication for mobile apps
- **Consider**: "Magic link" email authentication as password alternative
```

---

### Example 2: Export Feature

**JIRA Ticket**:
```
Title: Add data export
Description: Allow users to export their data
```

#### Level 0.0 (Strict) → Generated Spec:

```markdown
## Requirements
- **FR-001**: System MUST provide data export functionality
- **FR-002**: [NEEDS CLARIFICATION: What data should be exported?]
- **FR-003**: [NEEDS CLARIFICATION: What export format?]
- **FR-004**: [NEEDS CLARIFICATION: Where does export go? Download? Email?]
- **FR-005**: [NEEDS CLARIFICATION: What triggers the export?]
```

#### Level 0.25 (Balanced) → Generated Spec:

```markdown
## Requirements
- **FR-001**: System MUST provide export button/option for users
- **FR-002**: System MUST export user data in CSV format
- **FR-003**: System MUST trigger file download to user's browser
- **FR-004**: System MUST include standard fields: name, email, created date
- **FR-005**: [NEEDS CLARIFICATION: Should include all historical data or just current state?]
- **FR-006**: [NEEDS CLARIFICATION: Size limits or pagination for large datasets?]
- **FR-007**: [NEEDS CLARIFICATION: Additional formats (JSON, Excel, PDF)?]

## Edge Cases
- What happens if export is too large (>100MB)?
- How are special characters in data handled?
```

#### Level 0.5 (Creative) → Generated Spec:

```markdown
## Requirements

### Export Functionality
- **FR-001**: System MUST provide "Export Data" button in user settings
- **FR-002**: System MUST support multiple export formats:
  - CSV (default, Excel-compatible)
  - JSON (for developers/API integrations)
  - Excel (.xlsx) with formatted columns
  - PDF (summary report format)
- **FR-003**: System MUST allow format selection via dropdown before export
- **FR-004**: System MUST trigger immediate download for files <10MB
- **FR-005**: System MUST send email with download link for files >10MB
- **FR-006**: System MUST generate unique filename: `{username}_export_{timestamp}.{format}`

### Data Scope
- **FR-007**: System MUST export all user-owned data:
  - Profile information
  - Activity history (last 12 months by default)
  - User-generated content
  - Preferences and settings
- **FR-008**: System MUST provide date range filter (last 30/90/365 days, all time)
- **FR-009**: System MUST allow selective export by category (checkboxes)
- **FR-010**: System MUST exclude sensitive data (passwords, payment details) from export
- **FR-011**: System MUST include metadata: export date, version, record count

### Performance & Scale
- **FR-012**: System MUST process exports asynchronously for >1000 records
- **FR-013**: System MUST show progress indicator during export generation
- **FR-014**: System MUST limit export file size to 500MB (split into multiple files if needed)
- **FR-015**: System MUST cache export for 24 hours (re-download without regenerating)
- **FR-016**: System MUST implement rate limiting (3 exports per hour per user)

### Data Privacy & Compliance
- **FR-017**: System MUST log all export requests (audit trail) with timestamp and IP
- **FR-018**: System MUST expire email download links after 7 days
- **FR-019**: System MUST comply with GDPR "right to data portability"
- **FR-020**: System MUST provide machine-readable data in structured format

### User Experience
- **FR-021**: System MUST display estimated file size before export
- **FR-022**: System MUST show recent exports list with re-download option
- **FR-023**: System MUST send email notification when export completes
- **FR-024**: System MUST provide export preview (first 10 rows) before download

## Recommendations
- **Consider**: Scheduled exports (daily/weekly/monthly automatic exports)
- **Consider**: Export templates (pre-configured export settings)
- **Consider**: API endpoint for programmatic exports
- **Consider**: Real-time export streaming for very large datasets
- **Consider**: Export encryption option for sensitive data
```

## Choosing the Right Level

### Use Level 0.0 (Strict) when:
- ✅ Requirements are already well-defined and complete
- ✅ Compliance/regulatory constraints require exact matching
- ✅ Team has experienced architects who will do their own design
- ✅ Ticket went through detailed review and approval process
- ✅ Risk of over-engineering or scope creep is high

### Use Level 0.25 (Balanced) when:
- ✅ Typical development workflow
- ✅ Ticket has clear goals but some missing details
- ✅ Team needs moderate guidance
- ✅ Time to market is important
- ✅ Default choice for most scenarios

### Use Level 0.5 (Creative) when:
- ✅ Ticket is intentionally high-level (e.g., "improve search")
- ✅ Junior developers need comprehensive guidance
- ✅ Establishing patterns for new project/codebase
- ✅ Proactive best practices are valued
- ✅ Team welcomes recommendations and architectural input
- ✅ Innovation and quality over speed

## Mixed Strategies

You can use different interpretation levels for different ticket types in the same project:

| Ticket Type | Recommended Level | Rationale |
|-------------|-------------------|-----------|
| **Bugs** | 0.0 (Strict) | Fix exactly what's broken, nothing more |
| **Features** | 0.25 (Balanced) | Need some interpretation but controlled scope |
| **Epics** | 0.5 (Creative) | High-level vision needs detailed planning |
| **Technical Debt** | 0.5 (Creative) | Opportunity to apply best practices |
| **Hotfixes** | 0.0 (Strict) | Minimal scope, fast deployment |

## Field-Level Override

If your team wants a default interpretation level but allows per-ticket override:

1. Set a project-wide default in JIRA project settings
2. Allow tickets to override by setting the custom field explicitly
3. Document the strategy in your team's workflow

## FAQ

**Q: Can I change the interpretation level after spec generation?**
A: Yes, edit `jira.json` to update `spec_interpretation_level`, then regenerate spec.md:
```bash
SPECIFY_FEATURE=PROJ-123 /speckit.specify
```

**Q: Does interpretation level affect plan.md and tasks.md generation?**
A: Indirectly. It affects spec.md content, which then influences plan.md. The level itself is not used during planning/task generation, only during spec generation.

**Q: What if I don't set this field in JIRA?**
A: Defaults to 0.0 (strict adherence). This is the safest default.

**Q: Can I have interpretation level > 0.5 for even more creativity?**
A: The field supports any float value, but 0.5 is recommended maximum. Higher values may produce over-engineered specs with excessive scope.

**Q: Does this affect the clarify step?**
A: No. The clarify step (`/speckit.clarify`) always asks questions regardless of interpretation level. The level only affects the initial spec generation from JIRA data.

## Implementation Notes

The interpretation level is:
1. Extracted from JIRA during `jira_get_issue` call
2. Stored in `specs/<KEY>/jira.json` as `spec_interpretation_level` field
3. Read during spec generation (Step 5 of `/speckit.jira`)
4. Applied to control LLM prompting behavior during spec creation

The level does NOT affect:
- JIRA search/fetch operations
- Task breakdown logic
- Implementation execution
- Code quality or style
