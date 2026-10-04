import { Experience } from './experience.model';

export const EXPERIENCES: readonly Experience[] = [
  {
    id: 'naviam-lead-product-development',
    title: 'Lead Product Development Professional',
    company: 'Naviam',
    dates: 'Dec 2022 – Present',
    location: 'Bengaluru, KA',
    achievements: [
      'Architected and led development of modular, scalable Angular applications using Signals, RxJS, lazy loading, and custom virtualized data rendering, reducing initial load times by 40% across high-volume data views.',
      'Designed an offline-first application architecture capable of handling 100K+ records, combining local data persistence, virtual scrolling, and background processing to maintain responsive UI performance.',
      "Owned end-to-end frontend architecture and technical decision-making for mid-to-large-scale enterprise features, driving design reviews, implementation standards, and delivery as the team's primary technical lead.",
      'Partnered with backend architects, UX leads, and product owners to define REST API contracts, application boundaries, and integration patterns, resolving architectural bottlenecks and keeping releases on schedule.',
      'Established reusable, WCAG-compliant UI component patterns supporting keyboard navigation and screen-reader accessibility across enterprise applications.',
      'Introduced AI-assisted engineering workflows using GitHub Copilot and Cursor for code generation, asynchronous-code refactoring, test generation, and code analysis, contributing to an approximately 30% improvement in team delivery velocity.',
    ],
    tags: ['Angular', 'Signals', 'RxJS', 'Virtual Scrolling', 'Offline-first', 'REST APIs', 'Accessibility', 'GitHub Copilot', 'Cursor'],
  },
  {
    id: 'lti-mindtree-module-lead',
    title: 'Module Lead',
    company: 'LTI Mindtree',
    dates: 'Apr 2022 – Dec 2022',
    location: 'Bengaluru, KA',
    achievements: [
      'Led frontend engineering for an AI-powered crypto trading platform, designing reusable, high-throughput Angular components for real-time market feeds supporting hundreds of concurrent users.',
      'Designed and implemented HTTP interceptor architecture for token lifecycle management, refresh flows, and secure authentication across multiple REST APIs. Built real-time financial data visualizations using Chart.js and integrated CleverTap analytics and web push notifications, contributing to a 30% increase in user engagement.',
      'Collaborated with product and backend teams to translate real-time trading requirements into scalable frontend architecture and production-ready features.',
    ],
    tags: ['Angular', 'HTTP Interceptors', 'REST APIs', 'Chart.js', 'CleverTap', 'Web Push'],
  },
  {
    id: 'infosys-lead-experience-designer',
    title: 'Lead Experience Designer',
    company: 'Infosys',
    dates: 'Apr 2021 – Apr 2022',
    location: 'Hyderabad, TG',
    achievements: [
      'Led engineering of core UI components for the Infosys Finacle Design System, supporting software deployed across 150+ international banking clients.',
      'Designed and developed reusable, WCAG 2.0-compliant UI components using HTML, SASS, and JavaScript, providing keyboard-only and screen-reader accessibility for enterprise banking applications.',
      'Drove adoption of standardized design tokens and reusable components across banking product teams, improving consistency and accelerating UI development.',
      'Mentored junior developers on component architecture, accessibility, modern web standards, and implementation practices.',
    ],
    tags: ['HTML', 'SASS', 'JavaScript', 'Design Tokens', 'WCAG 2.0'],
  },
  {
    id: 'infosys-technology-analyst',
    title: 'Technology Analyst',
    company: 'Infosys',
    dates: 'Jan 2020 – Mar 2021',
    location: 'Hyderabad, TG',
    achievements: [
      'Developed and maintained an enterprise ServiceNow end-user portal for Welsh Water using AngularJS 1.x, delivering business-critical functionality aligned with client workflows.',
      'Worked directly with international stakeholders to gather technical requirements, analyse business processes, and translate requirements into implementation plans and production features.',
      'Presented technical implementation roadmaps and incorporated stakeholder feedback throughout the development lifecycle.',
    ],
    tags: ['AngularJS', 'ServiceNow'],
  },
  {
    id: 'infosys-systems-engineer',
    title: 'Systems Engineer',
    company: 'Infosys',
    dates: 'Jan 2017 – Dec 2019',
    location: 'Hyderabad, TG',
    achievements: [
      'Automated Active Directory user-management and Office 365 licensing workflows for US enterprise clients, reducing administrative processing time and cutting operational errors by 40%.',
      'Developed workflow automation to reduce repetitive manual administration and improve consistency across enterprise IT operations.',
    ],
    tags: ['Active Directory', 'Office 365', 'Workflow Automation'],
  },
];
