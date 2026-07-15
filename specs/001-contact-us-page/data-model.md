# Phase 1 Data Model: Contact Us Page

There is no persisted data and no API-backed entity in this feature (see research.md Decision 2).
The only "entity" from spec.md's Key Entities section exists purely as local, in-memory UI state
for the duration of a page visit.

## Inquiry Submission (client-side form state only)

| Field | Type | Required | Notes |
|---|---|---|---|
| `topic` | one of: `"New project"` \| `"Partnership"` \| `"Hiring TechGrit"` \| `"Support"` | yes | Exactly one selected at all times; defaults to `"New project"` (FR-002). |
| `name` | string | yes | Full name. Used to derive a first-name greeting in the success state (FR-007). |
| `email` | string | yes | Must be a validly formatted email address before submit is allowed (FR-004, FR-005). |
| `company` | string | no | Optional; submission succeeds with this empty. |
| `message` | string | yes | Free-text project description. |
| `sent` | boolean | — | Derived UI state, not a form field; `true` after successful submit, toggled back to `false` on "Send another" (FR-006, FR-008). |

### Validation rules

- `name`, `email`, `message` MUST be non-empty before submit succeeds (FR-004).
- `email` MUST match a standard email format (native HTML `type="email"` + `required`
  constraint validation is sufficient — no custom regex needed beyond what the browser enforces).
- `company` has no validation (optional).
- On successful submit: `sent` becomes `true`; the form's current field values remain in state
  (not cleared) so the success message can read `name` for personalization (FR-007), but the
  form UI itself is hidden.
- On "Send another": `sent` becomes `false` and all fields (`name`, `email`, `company`,
  `message`) reset to empty strings (FR-008); `topic` may either persist or reset to the default
  — reference behavior (`onReset`) clears `name`/`email`/`company`/`message` but does not
  reset `topic`, so this plan preserves that behavior.

### State transitions

```text
[empty form, topic="New project"]
        │  user edits fields / selects topic
        ▼
[filled form, sent=false] ──(submit, all required fields valid)──▶ [sent=true, confirmation shown]
        ▲                                                                   │
        └────────────────────(Send another → fields cleared)────────────────┘
```

No other entities are involved. There is no list, no history, no server-side representation —
this table exists solely to make the component's local `useState` shape explicit for
implementation.
