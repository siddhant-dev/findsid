# Research: Static About Me Section

**Date**: 2026-10-03

Local component/reference investigation plus one bounded existing-test research agent.
No code execution or external requests.

## Static Content

**Decision**: Paragraph-only embedded component, shell-owned heading, no animation/photo.
**Rationale**: Current template has photo, greeting, typewriter and extra Tab stops;
sidebar now owns identity. User expressly approved removing all of them except copy.
**Alternatives considered**: Hide old elements (leaves timer/request machinery), use sample
reference copy (user rejected), retain duplicate heading (breaks single-heading requirement).

## Presentation

**Decision**: Shared body role with muted text, left alignment, full content-column width.
**Rationale**: Current styles center content, justify paragraph at 70% width and define
photo/cursor-only breakpoints. User approved Inter 0.95rem/1.6, no card and no replacement.
**Alternatives considered**: New styles/spacing scale or card wrapper (unapproved/unnecessary).

## Lifecycle and Metadata

**Decision**: Remove all About typing/metadata state and lifecycle ownership; shared
MetaTagService and image assets remain untouched.
**Rationale**: Current TS starts interval and manipulates page tags; feature 002 establishes
canonical homepage metadata ownership. Static content needs neither timer nor tag service.
**Alternatives considered**: Keep metadata cleanup hooks (can remove shell tags), repair
and retain timer (no animation requirement), delete shared service (unrelated).

## Acceptance Tests

**Decision**: Reuse Jasmine/Karma with standalone imports, direct DOM/computed-style checks,
explicit creation/destruction timer and metadata spies, and Home composition assertions.
**Rationale**: Bounded research found About spec uses declarations and only a creation
assertion; source confirms standalone true. Existing metadata-service spec is unrelated
and need not change. Tests must observe no work, not merely lack of thrown errors.
**Alternatives considered**: Change shared-service tests (wrong ownership), source scan only
(does not prove behavior), introduce a new runner (unnecessary).

Runner/browser compatibility is not runtime-verified; establish baseline first.
No design clarification remains; all needed values/cases are user-confirmed.
