import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperiencesComponent } from './experiences.component';

// Independent transcription of the approved content contract, not production data.
const expected = [
  {
    id: 'naviam-lead-product-development',
    title: 'Lead Product Development Professional', company: 'Naviam',
    dates: 'Dec 2022 – Present', location: 'Bengaluru, KA',
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
    title: 'Module Lead', company: 'LTI Mindtree',
    dates: 'Apr 2022 – Dec 2022', location: 'Bengaluru, KA',
    achievements: [
      'Led frontend engineering for an AI-powered crypto trading platform, designing reusable, high-throughput Angular components for real-time market feeds supporting hundreds of concurrent users.',
      'Designed and implemented HTTP interceptor architecture for token lifecycle management, refresh flows, and secure authentication across multiple REST APIs. Built real-time financial data visualizations using Chart.js and integrated CleverTap analytics and web push notifications, contributing to a 30% increase in user engagement.',
      'Collaborated with product and backend teams to translate real-time trading requirements into scalable frontend architecture and production-ready features.',
    ],
    tags: ['Angular', 'HTTP Interceptors', 'REST APIs', 'Chart.js', 'CleverTap', 'Web Push'],
  },
  {
    id: 'infosys-lead-experience-designer',
    title: 'Lead Experience Designer', company: 'Infosys',
    dates: 'Apr 2021 – Apr 2022', location: 'Hyderabad, TG',
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
    title: 'Technology Analyst', company: 'Infosys',
    dates: 'Jan 2020 – Mar 2021', location: 'Hyderabad, TG',
    achievements: [
      'Developed and maintained an enterprise ServiceNow end-user portal for Welsh Water using AngularJS 1.x, delivering business-critical functionality aligned with client workflows.',
      'Worked directly with international stakeholders to gather technical requirements, analyse business processes, and translate requirements into implementation plans and production features.',
      'Presented technical implementation roadmaps and incorporated stakeholder feedback throughout the development lifecycle.',
    ],
    tags: ['AngularJS', 'ServiceNow'],
  },
  {
    id: 'infosys-systems-engineer',
    title: 'Systems Engineer', company: 'Infosys',
    dates: 'Jan 2017 – Dec 2019', location: 'Hyderabad, TG',
    achievements: [
      'Automated Active Directory user-management and Office 365 licensing workflows for US enterprise clients, reducing administrative processing time and cutting operational errors by 40%.',
      'Developed workflow automation to reduce repetitive manual administration and improve consistency across enterprise IT operations.',
    ],
    tags: ['Active Directory', 'Office 365', 'Workflow Automation'],
  },
];

const normalize = (text: string | null | undefined) => text?.replace(/\s+/g, ' ').trim();

describe('Experiences content', () => {
  let fixture: ComponentFixture<ExperiencesComponent>;
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ExperiencesComponent] }).compileComponents();
    fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });

  afterEach(() => fixture.destroy());

  it('renders five distinct roles and 18 complete achievement paragraphs in approved order', () => {
    const cards = Array.from(root.querySelectorAll('article'));
    expect(cards.length).toBe(5);
    expect(cards.map(card => card.getAttribute('data-experience-id'))).toEqual(expected.map(role => role.id));
    expect(root.querySelectorAll('.achievements > li').length).toBe(18);
    expect(cards.map(card => card.querySelectorAll('.achievements > li').length)).toEqual([6, 3, 4, 3, 2]);
    expected.forEach((role, index) => {
      const card = cards[index];
      expect(card).withContext(role.id).toBeDefined();
      if (!card) return;
      expect(normalize(card.querySelector('h3')?.textContent)).toBe(role.title);
      expect(normalize(card.querySelector('.company')?.textContent)).toBe(role.company);
      expect(normalize(card.querySelector('.dates')?.textContent)).toBe(role.dates);
      expect(normalize(card.querySelector('.location')?.textContent)).toBe(role.location);
      expect(Array.from(card.querySelectorAll('.achievements > li'), li => normalize(li.textContent)))
        .toEqual(role.achievements);
      expect(Array.from(card.querySelectorAll('.tag'), tag => normalize(tag.textContent))).toEqual(role.tags);
    });
  });

  it('uses labelled static articles, subordinate headings and semantic lists without controls', () => {
    expect(root.querySelectorAll('article').length).toBe(5);
    expect(root.querySelectorAll('h1, h2').length).toBe(0);
    expect(root.querySelectorAll('h3').length).toBe(5);
    expect(root.querySelectorAll('ul.achievements').length).toBe(5);
    expect(root.querySelectorAll('a, button, input, select, img, [tabindex], [role="button"]').length).toBe(0);
    for (const article of root.querySelectorAll('article')) {
      expect(article.querySelector('h3')?.id).toBe(article.getAttribute('aria-labelledby') ?? undefined);
      for (const decoration of article.querySelectorAll('.corner')) {
        expect(decoration.getAttribute('aria-hidden')).toBe('true');
      }
    }
  });

  it('uses reference surface, spacing, typography and decorative corners', () => {
    const cards = root.querySelectorAll<HTMLElement>('article');
    expect(cards.length).toBe(5);
    if (!cards.length) return;
    const style = getComputedStyle(cards[0]);
    expect(style.padding).toBe('24px');
    expect(style.borderRadius).toBe('4px');
    expect(style.borderTopWidth).toBe('1px');
    expect(style.backgroundColor).toBe('rgba(30, 41, 59, 0.4)');
    expect(style.backdropFilter).toBe('blur(4px)');
    expect(style.cursor).not.toBe('pointer');
    expect(cards[1].getBoundingClientRect().top - cards[0].getBoundingClientRect().bottom).toBeCloseTo(24, 0);
    const achievements = cards[0].querySelector<HTMLElement>('.achievements')!;
    expect(getComputedStyle(achievements).fontSize).toBe('14.4px');
    expect(getComputedStyle(achievements).lineHeight).toBe('23.04px');
    expect(getComputedStyle(achievements).marginTop).toBe('16px');
    const tags = cards[0].querySelector<HTMLElement>('.tags')!;
    expect(getComputedStyle(tags).gap).toBe('8px');
    expect(getComputedStyle(tags).flexWrap).toBe('wrap');
    expect(getComputedStyle(tags).marginTop).toBe('16px');
    expect(cards[0].querySelectorAll('.corner[aria-hidden="true"]').length).toBe(2);
    const corner = cards[0].querySelector<HTMLElement>('.top-left')!;
    expect(getComputedStyle(corner).position).toBe('absolute');
    expect(getComputedStyle(corner).top).toBe('-8px');
  });

  it('wraps all content naturally at 320px without clipping or extra keyboard stops', () => {
    root.style.width = '320px';
    const cards = root.querySelectorAll<HTMLElement>('article');
    expect(cards.length).toBe(5);
    for (const card of cards) {
      expect(card.getBoundingClientRect().width).toBeLessThanOrEqual(320);
      expect(getComputedStyle(card).overflowY).toBe('visible');
      const list = card.querySelector<HTMLElement>('.achievements')!;
      expect(list.scrollWidth).toBeLessThanOrEqual(list.clientWidth);
      const tags = card.querySelector<HTMLElement>('.tags')!;
      expect(tags.scrollWidth).toBeLessThanOrEqual(tags.clientWidth);
      expect(list.scrollHeight).toBeLessThanOrEqual(list.clientHeight);
      expect(getComputedStyle(list).webkitLineClamp).toBe('none');
      expect(getComputedStyle(list).maxHeight).toBe('none');
      const lastTag = card.querySelector<HTMLElement>('.tags li:last-child')!;
      expect(lastTag.getBoundingClientRect().bottom).toBeLessThan(card.getBoundingClientRect().bottom);
    }
  });
});
