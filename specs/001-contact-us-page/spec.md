# Feature Specification: Contact Us Page

**Feature Branch**: `001-contact-us-page`
**Created**: 2026-07-13
**Status**: Draft
**Input**: User description: "Feature Build the contact us page, Requirements Implement only the contact us page content and don't implement the header and footer content. they are out of scope for this feature and will be developed separately by another developer and design the page so that it can integrate later with reusable header and footer components and Analyze ONLY the `*.dc.html` files located under `raw-files/**`. Use HTML reference files as the source for the page structure and content and treat this feature as `TMs-64`."

**Reference material**: `raw-files/TechGrit Contact.dc.html` (the only `.dc.html` reference file relevant to this page). The header/navigation and footer markup present in that reference file are explicitly **out of scope** — they belong to a separate, reusable header/footer effort being built by another developer. This spec covers only the page body content between those two regions: the hero/form section and the "what happens next" section.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit a project inquiry (Priority: P1)

A prospective client visits the Contact Us page wanting to start a conversation about a project. They read a short introduction, select the topic that best matches their reason for reaching out, fill in their name, work email, company, and a message describing what they're building, then submit the form.

**Why this priority**: This is the core conversion action of the page — every other element exists to support a visitor completing this form. Without it, the page has no business value.

**Independent Test**: Can be fully tested by loading the page, filling in the required fields (name, email, message), submitting, and confirming a visible success confirmation replaces the form.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Contact Us page, **When** they view the page, **Then** they see a headline, a short supporting message, and a contact form with fields for full name, work email, company, and project message.
2. **Given** a visitor has selected a topic chip (e.g., "New project", "Partnership", "Hiring TechGrit", "Support"), **When** they view the form, **Then** the selected topic is visually distinguished from the others.
3. **Given** a visitor fills in all required fields (full name, work email, project message) and submits the form, **When** submission completes, **Then** the form is replaced with a confirmation message acknowledging receipt and stating a reply is expected within one business day, personalized with their first name if provided.
4. **Given** a visitor omits a required field (full name, work email, or project message), **When** they attempt to submit, **Then** the form does not submit and the visitor is prompted to complete the missing field(s).
5. **Given** a visitor sees the confirmation message, **When** they choose to send another message, **Then** the form is shown again, cleared of prior input.

---

### User Story 2 - Find alternate ways to get in touch (Priority: P2)

A visitor who prefers not to fill out a form wants to quickly find a direct contact channel, expected response time, and where the company operates.

**Why this priority**: Provides an alternative path to conversion and builds trust/credibility for visitors evaluating whether to engage, but the page remains functional without it if the form exists.

**Independent Test**: Can be tested independently by loading the page and confirming a direct email contact, an expected response time, and a statement of work location/model are visible without needing to interact with the form.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Contact Us page, **When** they view the introductory content, **Then** they see a direct email contact, a stated response-time expectation ("within 1 business day"), and a statement of where/how the company works (remote-first, global delivery).
2. **Given** a visitor selects the displayed email contact, **When** their device has a mail client configured, **Then** a new email addressed to that contact is prepared.

---

### User Story 3 - Understand what happens after submitting (Priority: P3)

A visitor considering whether to reach out wants to know what the process looks like after they submit an inquiry, so they know what to expect and don't feel like their message disappears into a void.

**Why this priority**: Reduces hesitation and abandonment before form submission by setting expectations, but is supplementary content — the page's primary conversion goal (User Story 1) does not depend on it.

**Independent Test**: Can be tested independently by loading the page and confirming a sequential explanation of the post-submission process is visible, regardless of form interaction.

**Acceptance Scenarios**:

1. **Given** a visitor is on the Contact Us page, **When** they scroll past the form, **Then** they see a numbered, three-step explanation of what happens after they submit an inquiry (their message is reviewed, a discovery call is scheduled, a plan/quote is delivered).

---

### Edge Cases

- What happens when a visitor submits the form with an invalid email format (e.g., missing "@")? The form must block submission and indicate the email field needs correction.
- What happens when a visitor submits the form without JavaScript enabled or if the submission handler fails? The visitor should not lose their entered data, and should not see a false success confirmation.
- What happens when a visitor resizes their browser window or views the page on a narrow (mobile) screen? The hero/form layout and the three-step process cards must remain readable and usable in a single-column arrangement rather than overlapping or truncating.
- What happens when a visitor leaves the company field blank? Submission must still succeed, since company is optional.
- What happens when a returning visitor submits a second inquiry in the same session? They should be able to return to a cleared form after a successful submission without reloading the page.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Page MUST present a headline and short supporting message that communicate the purpose of the page (starting a project conversation) without requiring the visitor to scroll.
- **FR-002**: Page MUST display a set of selectable inquiry topics (e.g., New project, Partnership, Hiring TechGrit, Support) allowing the visitor to indicate the reason for their message, with exactly one topic selected at a time and a visible default selection.
- **FR-003**: Page MUST provide a form with the following fields: full name (required), work email (required), company (optional), and a project/message description (required).
- **FR-004**: System MUST validate that full name, work email, and message fields are completed, and that the email field contains a validly formatted email address, before allowing submission.
- **FR-005**: System MUST prevent submission and surface which field(s) need correction when required fields are missing or the email is invalid.
- **FR-006**: Upon successful submission, system MUST display a confirmation state acknowledging the message was received and stating an expected response time of one business day, replacing the form view.
- **FR-007**: Confirmation state MUST personalize its message with the visitor's first name when a name was provided, and MUST fall back to a non-personalized message when no name is available.
- **FR-008**: Page MUST allow a visitor to return from the confirmation state to a fresh, empty form to send an additional message without reloading the page.
- **FR-009**: Page MUST display at least one direct contact channel (email) that visitors can use as an alternative to the form.
- **FR-010**: Page MUST state the expected response time and the company's operating model (e.g., remote-first, global delivery) as supporting trust information near the form.
- **FR-011**: Page MUST present a sequential, numbered explanation of the post-inquiry process (minimum three steps) describing what happens after a visitor submits a message.
- **FR-012**: Page content MUST be implemented as a self-contained page body that does not include header/navigation or footer markup, and MUST be structured so that shared header and footer components can be composed around it later without requiring rework of the page content.
- **FR-013**: Page layout MUST remain usable and legible across common desktop, tablet, and mobile viewport widths, adapting the hero/form and process-step layouts to narrower single-column arrangements as width decreases.

### Key Entities

- **Inquiry Submission**: Represents a single contact form submission. Attributes: topic (one of a fixed set of predefined categories), full name, work email, company (optional), message. Not persisted or displayed elsewhere on the page beyond the immediate confirmation state.

## Assumptions & Dependencies

- The set of inquiry topics (New project, Partnership, Hiring TechGrit, Support) and their labels are taken directly from the reference file and are treated as content, not as a fixed technical constraint — copy may be refined later without changing this spec's intent.
- "Business day" follows standard weekday business-hours convention; no specific timezone or holiday calendar is specified.
- Form submission in this spec refers to the visitor-facing behavior (validation, confirmation, reset); how the message is transmitted or stored on the backend is an implementation concern for the planning phase, not this spec.
- This feature depends on the separate header/footer component effort to supply the surrounding page chrome; this page's content is designed to slot into that layout without requiring changes to either side.
- No pricing, phone number, physical office address, or live chat channel is included, since the reference file does not present one.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can locate and begin filling out the contact form within 5 seconds of the page loading, without scrolling.
- **SC-002**: A visitor with all required information at hand can complete and submit the form in under 60 seconds.
- **SC-003**: 100% of submissions missing a required field or containing an invalid email are blocked with a clear indication of what needs correction, with zero false-positive successful submissions.
- **SC-004**: The page renders correctly and remains fully usable at desktop, tablet, and mobile viewport widths, with no overlapping or cut-off content, verified across the range of common device widths.
- **SC-005**: The page content integrates with a reusable header and footer component set with zero required changes to the page content itself.
