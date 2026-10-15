import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';
import { Router } from '@angular/router';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('card_data', {
      id: 1,
      kind: 'archive',
      title: 'Test card',
      description: 'A controlled card fixture',
      tags: ['test'],
      publishedDate: 'Today',
      destination: 'https://example.com',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders complete image-free content with date above title and every supplied tag', () => {
    const description = 'A complete long description. '.repeat(30);
    fixture.componentRef.setInput('card_data', {
      id: 42, typeOf: 'article', kind: 'article', title: 'Complete article',
      cover_image: '/unused-cover.svg', description,
      published_date: 'Oct 4', publishedDate: 'Oct 4',
      tag: 'first', tags: ['first', 'second', 'third'], destination: '/work/articles/42',
    });
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('img, .banner, .blueprint-button')).toBeNull();
    expect(root.querySelector('.description')?.textContent?.trim()).toBe(description.trim());
    expect(getComputedStyle(root.querySelector('.description')!).webkitLineClamp).toBe('none');
    expect(Array.from(root.querySelectorAll('.tags li'), tag => tag.textContent?.trim()))
      .toEqual(['first', 'second', 'third']);
    expect(root.querySelector('.date')?.textContent?.trim()).toBe('Oct 4');
    const heading = root.querySelector('h3');
    expect(heading?.textContent).toBe('Complete article');
    expect(root.querySelector('.date')?.compareDocumentPosition(heading!)! & Node.DOCUMENT_POSITION_FOLLOWING)
      .toBeTruthy();
    expect(root.textContent).not.toContain('Published On');
  });

  it('omits missing optional content independently with no placeholder wrappers', () => {
    for (const kind of ['article', 'archive']) {
      fixture.componentRef.setInput('card_data', {
        id: 1, typeOf: 'app', kind, title: 'Title only', tags: [],
        destination: 'https://example.com',
      });
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement;
      expect(root.querySelector('.date, .description, .tags, img')).toBeNull();
      expect(root.querySelector('h3')?.textContent).toBe('Title only');
    }
  });

  it('uses one title-named card-wide native internal link and retains modifier actions', () => {
    fixture.componentRef.setInput('card_data', {
      id: 42, kind: 'article', title: 'Open article', description: 'Supporting text',
      tags: ['Angular'], destination: '/work/articles/42',
    });
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    const anchor = root.querySelector('a');
    expect(anchor?.getAttribute('href')).toBe('/work/articles/42');
    expect(anchor?.getAttribute('aria-labelledby')).toBe(root.querySelector('h3')?.id ?? null);
    expect(anchor?.querySelector('.description')).not.toBeNull();
    expect(root.querySelectorAll('a, button, [tabindex]').length).toBe(1);
    expect(anchor?.target).toBe('');
    const navigation = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
    const event = new MouseEvent('click', { ctrlKey: true, cancelable: true });
    fixture.debugElement.query(By.directive(RouterLink)).triggerEventHandler('click', event);
    expect(event.defaultPrevented).toBeFalse();
    expect(navigation).not.toHaveBeenCalled();
  });

  it('uses safe new-tab links based on actual origin rather than the source external flag', () => {
    fixture.componentRef.setInput('card_data', {
      id: 1, kind: 'archive', title: 'Offline project', tags: [],
      destination: 'https://offline.invalid/project', external: false,
    });
    fixture.detectChanges();
    const anchor: HTMLAnchorElement | null = fixture.nativeElement.querySelector('a');
    expect(anchor?.href).toBe('https://offline.invalid/project');
    expect(anchor?.target).toBe('_blank');
    expect(anchor?.rel).toBe('noopener noreferrer');
    expect(anchor?.getAttribute('aria-description')).toContain('new tab');
  });

  it('keeps invalid destinations static Archived and updates link/static markup with inputs', () => {
    for (const destination of [undefined, '', ' ', 'javascript:alert(1)', 'http://[bad',
      'https://user@example.com']) {
      fixture.componentRef.setInput('card_data', {
        id: 1, kind: 'archive', title: 'Retained archive', tags: ['Old'], destination,
      });
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement;
      expect(root.textContent).toContain('Archived');
      expect(root.querySelector('a, button, [role="link"], [tabindex]')).toBeNull();
      expect(root.querySelector('.card.interactive')).toBeNull();
    }
  });

  it('uses natural reference surfaces spacing typography wrapping and inaccessible corners', () => {
    const root: HTMLElement = fixture.nativeElement;
    root.style.width = '320px';
    const card = root.querySelector<HTMLElement>('.card')!;
    const style = getComputedStyle(card);
    expect(style.padding).toBe('24px');
    expect(style.width).toBe('320px');
    expect(style.borderRadius).toBe('4px');
    expect(style.backdropFilter).toBe('blur(4px)');
    expect(style.backgroundColor).toBe('rgba(30, 41, 59, 0.4)');
    expect(style.textDecorationLine).toBe('none');
    expect(style.transform).toBe('none');
    expect(card.getBoundingClientRect().width).toBe(320);
    expect(getComputedStyle(root.querySelector('.date')!).marginBottom).toBe('8px');
    expect(getComputedStyle(root.querySelector('h3')!).marginBottom).toBe('12px');
    expect(getComputedStyle(root.querySelector('.description')!).lineHeight).toBe('23.04px');
    expect(getComputedStyle(root.querySelector('.description')!).marginBottom).toBe('16px');
    expect(getComputedStyle(root.querySelector('.tags')!).gap).toBe('8px');
    expect(getComputedStyle(root.querySelector('.tags')!).flexWrap).toBe('wrap');
    expect(root.querySelectorAll('.corner[aria-hidden="true"]').length).toBe(2);
    expect(style.overflow).toBe('visible');
  });

  it('preserves independently available optional fields and switches static cards back to links', () => {
    for (const [field, value, selector] of [
      ['publishedDate', 'Oct 4', '.date'],
      ['description', 'Full description', '.description'],
      ['tags', ['First', 'Second'], '.tags'],
    ] as const) {
      fixture.componentRef.setInput('card_data', {
        id: 1, kind: 'archive', title: 'Optional content', tags: [], [field]: value,
      });
      fixture.detectChanges();
      const root: HTMLElement = fixture.nativeElement;
      expect(root.querySelector(selector)).not.toBeNull();
      expect(root.querySelectorAll('.date, .description, .tags').length).toBe(1);
      expect(root.querySelector('a')).toBeNull();
    }
    fixture.componentRef.setInput('card_data', {
      id: 1, kind: 'archive', title: 'Same-origin archive', tags: [], destination: '/#about',
    });
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('article, .archived')).toBeNull();
    expect(root.querySelector('a')?.href).toBe(new URL('/#about', document.baseURI).href);
    expect(root.querySelector('a')?.target).toBe('');
  });
});
