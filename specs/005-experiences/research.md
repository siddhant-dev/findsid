# Research: Experiences

**Date**: 2026-10-03

Local reference/context investigation plus bounded existing-test research. No employment
details sent to external systems, no live verification, installs or application changes.

## Content

**Decision**: Local typed readonly data preserving five roles and 18 original paragraphs.
**Rationale**: User approved exact words, dates, locations, claims and tags. Multi-sentence
paragraphs remain single bullets; repeated employers are distinct jobs.
**Alternatives considered**: Rewrite/summarize, merge Infosys jobs, truncate/read-more
(all contradict confirmed requirements).

## Rendering

**Decision**: One new standalone component with static semantic articles/lists; reuse
blueprint SCSS instead of existing navigable CardComponent.
**Rationale**: Existing cards are article/app actions; Experience has no interaction.
Reference styling already defines borders/corners/glow/padding and tag appearance.
**Alternatives considered**: Reusable generic card input/projection framework (unnecessary),
external company links/logos (user excluded).

## Accessibility and Integration

**Decision**: Shell owns heading/anchor, component uses subordinate role headings and
semantic achievement lists; natural wrapping, no Tab stops and reduced-motion transitions.
**Rationale**: User confirmed full-density cards and mobile/zoom readability.
**Alternatives considered**: Fixed-height card grid or focusable static articles (undesired).

## Tests

**Decision**: New standalone component spec plus Home integration. Independent expected
strings/counts, DOM semantics and real browser style/reflow assertions.
**Rationale**: Bounded research found existing About/card specs have only creation tests
with declarations; cannot substantiate content correctness. Production data used as its
own expected oracle would miss transcription errors.
**Alternatives considered**: Modify unrelated About/generic card tests (wrong ownership),
source scans only or broad runner migration (insufficient/unnecessary).

No first-feature clarification remains. Runner/browser availability needs execution
validation later; no claim application tests already pass.
