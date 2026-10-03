# Experiences Content and UI Contract

Source: user-provided public work history and subsequent confirmations on 2026-10-03.
Preserve text/punctuation; normalize only whitespace. Each bullet below is one supplied
achievement paragraph. Percentages are owner-supplied project claims, not live measurements.

## 1. Lead Product Development Professional

**Dates**: Dec 2022 – Present
**Company/location**: Naviam | Bengaluru, KA

- Architected and led development of modular, scalable Angular applications using Signals, RxJS, lazy loading, and custom virtualized data rendering, reducing initial load times by 40% across high-volume data views.
- Designed an offline-first application architecture capable of handling 100K+ records, combining local data persistence, virtual scrolling, and background processing to maintain responsive UI performance.
- Owned end-to-end frontend architecture and technical decision-making for mid-to-large-scale enterprise features, driving design reviews, implementation standards, and delivery as the team's primary technical lead.
- Partnered with backend architects, UX leads, and product owners to define REST API contracts, application boundaries, and integration patterns, resolving architectural bottlenecks and keeping releases on schedule.
- Established reusable, WCAG-compliant UI component patterns supporting keyboard navigation and screen-reader accessibility across enterprise applications.
- Introduced AI-assisted engineering workflows using GitHub Copilot and Cursor for code generation, asynchronous-code refactoring, test generation, and code analysis, contributing to an approximately 30% improvement in team delivery velocity.

**Tags**: Angular; Signals; RxJS; Virtual Scrolling; Offline-first; REST APIs;
Accessibility; GitHub Copilot; Cursor.

## 2. Module Lead

**Dates**: Apr 2022 – Dec 2022
**Company/location**: LTI Mindtree | Bengaluru, KA

- Led frontend engineering for an AI-powered crypto trading platform, designing reusable, high-throughput Angular components for real-time market feeds supporting hundreds of concurrent users.
- Designed and implemented HTTP interceptor architecture for token lifecycle management, refresh flows, and secure authentication across multiple REST APIs. Built real-time financial data visualizations using Chart.js and integrated CleverTap analytics and web push notifications, contributing to a 30% increase in user engagement.
- Collaborated with product and backend teams to translate real-time trading requirements into scalable frontend architecture and production-ready features.

**Tags**: Angular; HTTP Interceptors; REST APIs; Chart.js; CleverTap; Web Push.

## 3. Lead Experience Designer

**Dates**: Apr 2021 – Apr 2022
**Company/location**: Infosys | Hyderabad, TG

- Led engineering of core UI components for the Infosys Finacle Design System, supporting software deployed across 150+ international banking clients.
- Designed and developed reusable, WCAG 2.0-compliant UI components using HTML, SASS, and JavaScript, providing keyboard-only and screen-reader accessibility for enterprise banking applications.
- Drove adoption of standardized design tokens and reusable components across banking product teams, improving consistency and accelerating UI development.
- Mentored junior developers on component architecture, accessibility, modern web standards, and implementation practices.

**Tags**: HTML; SASS; JavaScript; Design Tokens; WCAG 2.0.

## 4. Technology Analyst

**Dates**: Jan 2020 – Mar 2021
**Company/location**: Infosys | Hyderabad, TG

- Developed and maintained an enterprise ServiceNow end-user portal for Welsh Water using AngularJS 1.x, delivering business-critical functionality aligned with client workflows.
- Worked directly with international stakeholders to gather technical requirements, analyse business processes, and translate requirements into implementation plans and production features.
- Presented technical implementation roadmaps and incorporated stakeholder feedback throughout the development lifecycle.

**Tags**: AngularJS; ServiceNow.

## 5. Systems Engineer

**Dates**: Jan 2017 – Dec 2019
**Company/location**: Infosys | Hyderabad, TG

- Automated Active Directory user-management and Office 365 licensing workflows for US enterprise clients, reducing administrative processing time and cutting operational errors by 40%.
- Developed workflow automation to reduce repetitive manual administration and improve consistency across enterprise IT operations.

**Tags**: Active Directory; Office 365; Workflow Automation.

## Structure and Style

Home owns `experience` section and `experience-heading`; component supplies five
semantic role articles with subordinate headings, lists of achievements and tags.
Cards grow with content; no links/logos/tabindex/buttons/clamping.

Use [foundation](../../001-blueprint-styles/contracts/style-contract.md) primitives:
reference surface rgba(30,41,59,0.4), 1px muted border, 4px corners, 24px padding and
24px card separation; 4px backdrop blur; active-border/20px glow on hover; reference
decorative corner marks. Card titles use approved Inter1.1rem/600; date/location metadata
mono0.75rem; achievements description role Inter0.9rem/1.6 muted; tags use approved tag
primitive. Reuse reference 16px spacing around description/tags and 8px tag gaps.
Bullet indentation must keep markers within the existing 24px padding, with no new
unapproved sizing scale. Remove transitions under reduced motion.

Corner decorations are not meaningful accessible text; implement as aria-hidden
decoration if pseudo-content is exposed by target assistive technology.
No fixed dimensions; wrap titles/text/tags. Static content needs no focus treatment.
Preserve `/#experience` and shell metadata/history; no duplicate section heading.
