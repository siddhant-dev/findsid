<!--
Sync Impact Report
Version change: unratified scaffold -> 1.0.0
Modified principles: no previously ratified principles; template slots replaced with:
  I. Portfolio
  II. Test-First Delivery (NON-NEGOTIABLE)
  III. Collaborative Edge-Case Discovery
  IV. Reliable Dev.to Integration
  V. Main-Only Build and Deployment
Added sections: Technology and Release Constraints; Development Workflow and Quality Gates
Removed sections: none
Follow-up TODOs: no unresolved constitution placeholders.
Deferred implementation: New Version 26.0.0; establish test coverage incrementally;
align GitHub Actions with test-only PRs and main-only build/deployment.
Existing PR preview deployment and dependency-review workflows require alignment.
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

**Version**: 1.0.1 | **Ratified**: 2026-10-03 | **Last Amended**: 2026-10-03
