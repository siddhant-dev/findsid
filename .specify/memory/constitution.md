<!--
Sync Impact Report
Version change: 1.0.1 -> 2.0.0
Modified principles:
  II. Test-First Delivery (NON-NEGOTIABLE): narrowly scoped historical exception.
Added sections: none; exception added under Development Workflow and Quality Gates.
Removed sections: none
Follow-up TODOs: no unresolved constitution placeholders.
Approval: owner approved historical exception and separate remote safeguards on 2026-10-04.
Migration: dependent 001/002/009/010/012 task/evidence records require individual review,
current acceptance coverage and explicit exception disposition; no automatic checkbox closure.
Deferred implementation: complete remaining feature acceptance and configure/verify approved
main safeguards through the implementation workflow. Manual browser acceptance remains
owner-owned and unverified until results are recorded. No release/version/publication approval.
This report is temporary review material and MUST be removed before committing the constitution.
-->

# Findsid Constitution

## Core Principles

### I. Portfolio

findsid is owners own personal portfolio. The main purpose of this portfolio is to showcase my work and skills and sell myself as developer to potential employers. The portfolio is a living document that evolves with my work. It will showcase all my side projects and contributions, few live demos showcase how I save time and improve performance of apps, and all my articles and posts. It also has a contact me form that allows potential employers to get in touch with me and cards/links to my side projects along with links to my GitHub profile and other social media accounts.

### II. Test-First Delivery (NON-NEGOTIABLE)

Every new feature MUST have automated acceptance-relevant tests written and observed failing
for the intended missing behavior before implementation begins. Every bug fix MUST start with
a regression test that reproduces the reported defect. Work MUST follow red-green-refactor:
establish the failing test, implement the behavior, then refactor with the affected suite green.
Where test infrastructure is missing, the minimum runnable setup MUST be established first;
configuration or dependency failures do not count as the required behavioral failure.

The one-time historical exception below applies only to previously implemented work
identified there. All future features, fixes and changes MUST follow this principle.

### III. Collaborative Edge-Case Discovery

For every feature or bug, the implementer or coding agent MUST ask the user for edge cases
before implementation and MUST independently analyze and propose additional cases. The
specification or bug assessment MUST record user-supplied cases, analyzed cases, expected
outcomes, and unresolved questions. Missing user input MUST NOT be treated as confirmation;
unanswered cases MUST be labeled as assumptions and confirmed before dependent behavior is
implemented. Accepted edge cases MUST be translated into automated tests where testable.

### IV. Reliable Dev.to Integration

The portfolio MUST retrieve articles from the owner's Dev.to account. Changes to article
retrieval or presentation MUST define and test successful, loading, empty, and failure states.
Edge-case analysis MUST consider unavailable or malformed article data, network failures,
rate limits, and account filtering. Failures MUST be distinguishable from a successful empty
response. Automated tests MUST use controlled responses rather than depend on the live Dev.to
service, so external availability cannot make the suite nondeterministic.

### V. Main-Only Build and Deployment

GitHub Actions MUST run the full application build only for `main`. Firebase deployment,
including preview deployment, MUST occur only from `main`, after the test suite and build
succeed. Pull requests from any other branch targeting `main` MUST run only the test suite,
with dependency installation and test tooling permitted solely to support that suite.
Such PR runs MUST NOT produce a deployment build or deploy to Firebase.

Pushes to non-main branches and pull requests targeting branches other than `main` MUST NOT
trigger this build, deployment, or PR test pipeline. Test-runner compilation is permitted for
test execution and is not a full application build. Workflow triggers and job guards MUST
enforce these rules, rather than relying on contributor convention.

## Technology and Release Constraints

The application MUST use Angular 22 and its standalone componets and architecture, and its article source MUST remain the
owner's Dev.to account unless a constitution amendment approves a change. Firebase Hosting
remains the deployment destination.

Application releases MUST use CalVer, with `26.0.0`  The format is
`YY.MAJOR.PATCH`: `YY` identifies the two-digit release year, with minor and patch counters
within that year. Release metadata and published version identifiers MUST agree. Application
CalVer is separate from this constitution's semantic version.

The existing Work section contains Articles and Apps. The retired artwork showcase and
`/work/art` redirect to `/work/articles` MUST remain the baseline unless the redesign
specification explicitly approves a change. No Instagram API token is required.

## Development Workflow and Quality Gates

Feature work MUST proceed through a specification, implementation plan, and ordered tasks;
bug work MUST begin with a documented assessment and reproducible expected behavior.
Both workflows MUST include the user edge-case request and independent edge-case analysis
before behavioral implementation.

Plans and tasks MUST place test setup and failing tests before implementation. Reviews MUST
verify failing-test evidence, accepted edge-case coverage, preservation of behavior outside
the approved scope, and a passing affected suite. A feature or fix MUST NOT be declared
complete while its tests fail or required edge cases remain unresolved.

### One-Time Historical Test-First Exception (Approved 2026-10-04)

The owner approved resolving documented pre-implementation test-evidence gaps in existing
features001 Blueprint Styles,002 Sticky Shell,009 Article Detail,010 Contact Modal and
012 CI Safeguards through current acceptance and regression coverage. The scope is limited
to work already implemented and gaps already documented before this approval, against
baseline commit `26418f2389f70d2a531d45780bb290ecaf1b017b` and the associated feature
quickstarts/tasks. It does not apply to new implementation or evidence gaps introduced later.

The rationale is that missed historical chronology cannot be repaired by pretending a later
test preceded implementation. For each affected task, reviewers MUST preserve the original
gap, identify its exact requirements, provide current automated acceptance/regression
coverage where testable, verify a passing affected suite and required native behavior, and
record an explicit disposition under this approved exception. Retrospective red runs MUST
NOT be represented as original pre-implementation evidence. A task MAY be closed only after
its remaining substantive requirements pass and its exception disposition is recorded.
This amendment alone MUST NOT mark any feature or task complete.

Required behavior, unresolved edge cases, browser/device acceptance, repository protection,
main-only build evidence and release gates are not waived. The owner will perform actual
browser/device acceptance manually; responsibility assignment MUST NOT be recorded as a
passing result. Current failures MUST receive a reproducing regression test before repair.
All future behavior changes MUST continue to follow red-green-refactor.

Dependent specifications, plans and task records MUST be reconciled individually at their
next implementation review. Superseded intermediate behavior, including Resume/art support
retired by approved feature011, MUST be identified as superseded rather than falsely tested
as current behavior. Historical records MUST remain available.

Separate owner approval permits configuring and verifying the specified main safeguards:
required PRs and current-revision Portfolio tests, prohibition of routine bypasses,
force pushes and deletion, and disabling unsupported merge queues or legacy automatic
deployment. Administrative access and current settings MUST be verified before changes;
unavailable access remains a blocker. This authorization does not permit unrelated settings
changes, commits, merges, workflow publication, tags, releases or deployment. Publication
still requires separate final-main-SHA approval and all release gates.

Pull requests targeting `main` MUST pass the test suite before merge. Main-branch automation
MUST run the test suite, then the full build, and deploy to Firebase only after both succeed.
Existing workflows that build or deploy PR previews, or run separate non-test PR jobs, MUST
be aligned with Principle V through separately scoped implementation work.

## Governance

This constitution governs specifications, plans, tasks, implementations, reviews, and
automation for Findsid. Conflicting repository guidance MUST be reconciled with it; a change
that violates a principle requires an approved amendment before implementation.

Amendments MUST document the proposed rule change, rationale, affected practices, and any
required migration work, and MUST receive project-owner approval. Each amendment MUST update
the constitution version and last-amended date while preserving the original ratification
date. Dependent artifacts MUST be checked for compliance at their next update; changing this
constitution does not itself implement application or workflow migrations.

Constitution versions MUST follow semantic versioning: MAJOR for incompatible principle
removals or redefinitions, MINOR for new principles or materially expanded guidance, and PATCH
for non-semantic clarifications or corrections. This policy MUST NOT be confused with
application CalVer.

Every specification and plan review MUST explicitly check the core principles. Every PR
review MUST check test-first evidence, edge-case decisions, and applicable CI constraints.
Noncompliance MUST be resolved or governed by an approved amendment, not silently waived.

**Version**: 2.0.0 | **Ratified**: 2026-10-03 | **Last Amended**: 2026-10-04
