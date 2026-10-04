import {
  activeSectionFromPositions,
  shouldPushSectionHistory,
} from './section-navigation';
import { TestBed } from '@angular/core/testing';
import { Event, NavigationEnd, NavigationStart, provideRouter, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SectionNavigationCoordinator } from './section-navigation';

describe('section navigation rules', () => {
  it('does not move or reset the preserved Home section across Contact opening and dismissal', () => {
    const events = new Subject<Event>();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const router = TestBed.inject(Router);
    spyOnProperty(router, 'events', 'get').and.returnValue(events);
    spyOnProperty(router, 'url', 'get').and.returnValue('/#articles');
    const coordinator = new SectionNavigationCoordinator(router);
    const home = jasmine.createSpy('home intent');
    coordinator.registerHome(home);
    home.calls.reset();
    let active = '';
    coordinator.activeSection$.subscribe(value => active = value);
    events.next(new NavigationStart(1, '/contact'));
    events.next(new NavigationEnd(1, '/contact', '/contact'));
    expect(active).toBe('articles');
    events.next(new NavigationStart(2, '/#articles', 'popstate'));
    events.next(new NavigationEnd(2, '/#articles', '/#articles'));
    expect(home).not.toHaveBeenCalled();
    expect(active).toBe('articles');
    coordinator.ngOnDestroy();
  });
  it('selects the last ordered heading at the 96px reading line', () => {
    expect(
      activeSectionFromPositions([
        { id: 'about', top: -20 },
        { id: 'lab', top: 96 },
        { id: 'experience', top: 240 },
      ]),
    ).toBe('lab');
  });

  it('chooses About before the first heading and the last section at document bottom', () => {
    expect(
      activeSectionFromPositions([
        { id: 'about', top: 100 },
        { id: 'lab', top: 400 },
      ]),
    ).toBe('about');
    expect(
      activeSectionFromPositions(
        [
          { id: 'about', top: -400 },
          { id: 'lab', top: -20 },
        ],
        96,
        true,
      ),
    ).toBe('lab');
  });

  it('pushes changed section selections but not repeats', () => {
    expect(shouldPushSectionHistory('about', 'articles')).toBeTrue();
    expect(shouldPushSectionHistory('articles', 'articles')).toBeFalse();
  });

  it('arbitrates append movement without history and invalidates interrupted/late intents', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const coordinator = TestBed.inject(SectionNavigationCoordinator);
    const router = TestBed.inject(Router);
    const navigate = spyOn(router, 'navigateByUrl');
    const handler = jasmine.createSpy('movement');
    const registration = coordinator.registerAppendHandler(handler);
    const target = document.createElement('a');
    const cancelled = coordinator.beginAppendIntent();
    coordinator.cancelAppendIntent();
    coordinator.completeAppendIntent(cancelled, target, true);
    expect(handler).not.toHaveBeenCalled();
    const accepted = coordinator.beginAppendIntent();
    coordinator.completeAppendIntent(accepted, target, true);
    expect(handler).toHaveBeenCalledOnceWith(target, true);
    coordinator.completeAppendIntent(accepted, target, true);
    expect(handler.calls.count()).toBe(1);
    expect(navigate).not.toHaveBeenCalled();
    registration.unsubscribe();
    coordinator.completeAppendIntent(coordinator.beginAppendIntent(), target, false);
    expect(handler.calls.count()).toBe(1);
  });
});
