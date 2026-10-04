import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';

import { AboutComponent } from './about.component';
import { MetaTagService } from '../services/meta-tag.service';

const APPROVED_ABOUT_COPY =
  'I am a millennial born in Kolkata, Enjoy working as UI Developer and moved to UX design to strengthen my knowledge and bridge the gap between user interfaces and user need. Beyond work you’ll find me smashing and killing enemies in RPG games, dribbling in football games, travelling, watching movies/shows, designing or sleeping. For me learning never stops and I work on small personal projects to improve my skill.';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let setIntervalSpy: jasmine.Spy<typeof window.setInterval>;
  let clearIntervalSpy: jasmine.Spy<typeof window.clearInterval>;
  let addTagSpy: jasmine.Spy<Meta['addTag']>;
  let removeTagSpy: jasmine.Spy<Meta['removeTag']>;
  let removeMetaTagsSpy: jasmine.Spy<MetaTagService['removeMetaTags']>;
  let fixtureDestroyed: boolean;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixtureDestroyed = false;
    setIntervalSpy = spyOn(window, 'setInterval').and.returnValue(0);
    clearIntervalSpy = spyOn(window, 'clearInterval');
    const meta = TestBed.inject(Meta);
    const metaTagService = TestBed.inject(MetaTagService);
    addTagSpy = spyOn(meta, 'addTag').and.stub();
    removeTagSpy = spyOn(meta, 'removeTag').and.stub();
    removeMetaTagsSpy = spyOn(metaTagService, 'removeMetaTags').and.stub();
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (!fixtureDestroyed) {
      fixture.destroy();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders only the unchanged approved paragraph', () => {
    const root = fixture.nativeElement as HTMLElement;
    const paragraphs = root.querySelectorAll('p');

    expect(paragraphs.length).toBe(1);
    expect(paragraphs.item(0)?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      APPROVED_ABOUT_COPY,
    );
    expect(root.children.length).toBe(1);
    expect(root.querySelector('img, .hero-img, h1, h2, h3, h4, h5, h6')).toBeNull();
    expect(root.querySelectorAll('[tabindex]').length).toBe(0);
    expect(root.textContent).not.toContain('Hello,');
    expect(root.querySelector('[style*="background-image"]')).toBeNull();
    expect(getComputedStyle(root).backgroundImage).toBe('none');
  });

  it('keeps the static paragraph full-width, muted and noninteractive', () => {
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');
    expect(paragraph).not.toBeNull();
    if (!paragraph) {
      return;
    }

    const style = getComputedStyle(paragraph);
    expect(paragraph.hasAttribute('tabindex')).toBeFalse();
    expect(style.fontFamily.toLowerCase()).toContain('inter');
    expect(style.fontFamily.toLowerCase()).toContain('sans-serif');
    expect(style.fontSize).toBe('15.2px');
    expect(parseFloat(style.lineHeight) / parseFloat(style.fontSize)).toBeCloseTo(1.6);
    expect(style.color).toBe('rgb(148, 163, 184)');
    expect(style.textAlign).toBe('left');
    expect(paragraph.getBoundingClientRect().width).toBeCloseTo(
      fixture.nativeElement.getBoundingClientRect().width,
      0,
    );
    expect(style.borderStyle).toBe('none');
    expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(style.animationName).toBe('none');
  });

  it('reflows at 320px and enlarged text without horizontal overflow', () => {
    const root = fixture.nativeElement as HTMLElement;
    const originalWidth = root.style.width;
    const originalFontSize = document.documentElement.style.fontSize;
    try {
      root.style.width = '320px';
      document.documentElement.style.fontSize = '200%';
      const paragraph = root.querySelector('p');
      expect(paragraph).not.toBeNull();
      if (!paragraph) {
        return;
      }

      expect(paragraph.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
      expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth);
      expect(paragraph.textContent?.replace(/\s+/g, ' ').trim()).toBe(APPROVED_ABOUT_COPY);
    } finally {
      root.style.width = originalWidth;
      document.documentElement.style.fontSize = originalFontSize;
    }
  });

  it('does not create timers or mutate page metadata on mount or destruction', () => {
    fixture.destroy();
    fixtureDestroyed = true;

    expect(setIntervalSpy).not.toHaveBeenCalled();
    expect(clearIntervalSpy).not.toHaveBeenCalled();
    expect(addTagSpy).not.toHaveBeenCalled();
    expect(removeTagSpy).not.toHaveBeenCalled();
    expect(removeMetaTagsSpy).not.toHaveBeenCalled();
  });
});
