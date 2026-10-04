import { TestBed } from '@angular/core/testing';
import { AppService, ARCHIVE_LOADER, validateArchive } from './app.service';
import { firstValueFrom } from 'rxjs';
import { archiveCard } from '../models/card.model';

describe('Bundled Vault collection validation', () => {
  const source = { id: 1, title: 'Original title', description: 'Complete description',
    tags: ['Angular', 'RxJS'], published_date: 'Historical date', url: 'https://outside.invalid' };
  it('retains exact content/order, skips individual rejection and keeps the first accepted ID', () => {
    const warning = spyOn(console, 'warn');
    const data = validateArchive([
      { ...source, title: ' ' }, source, { ...source, title: 'Duplicate' }, null,
      { ...source, id: 2, title: 'Second' }, { ...source, id: 3, description: 4 },
    ]);
    expect(data.map(item => item.title)).toEqual(['Original title', 'Second']);
    expect(data.map(archiveCard)[0]).toEqual({
      id: 1, kind: 'archive', title: source.title, description: source.description,
      tags: source.tags, publishedDate: source.published_date, destination: source.url,
    });
    expect(warning.calls.count()).toBe(3);
    expect(warning.calls.allArgs().every(args => args.every(arg => typeof arg === 'string'))).toBeTrue();
  });
  it('allows independently absent optional fields and invalid IDs/URLs as static Archived content', () => {
    const data = validateArchive([
      { title: 'Minimal' },
      { title: 'Invalid destination', id: 0, url: 'javascript:alert(1)', tags: ['one', ' ', 'two'] },
      { title: 'Wrong destination shape', id: '1', url: 3, description: null, published_date: ' ' },
    ]);
    expect(data.length).toBe(3);
    expect(data.map(item => item.id)).toEqual([undefined, undefined, undefined]);
    expect(data.map(archiveCard)[0]).toEqual({
      id: undefined, kind: 'archive', title: 'Minimal', description: undefined,
      publishedDate: undefined, tags: [], destination: undefined,
    });
    expect(data[1].tags).toEqual(['one', 'two']);
    expect(data[2].url).toBeUndefined();
  });
  it('distinguishes empty from malformed envelopes and nonempty all-unusable content', () => {
    spyOn(console, 'warn');
    expect(validateArchive([])).toEqual([]);
    for (const source of [null, {}, 'bad', [null], [{ title: 2 }], [{ title: 'Usable', tags: {} }]]) {
      expect(() => validateArchive(source)).toThrowError();
    }
  });
  it('does not mutate source arrays/labels and does not deduplicate missing IDs by title', () => {
    const input = [{ title: 'Same', tags: [' ', 'Vue'] }, { title: 'Same' }];
    const before = JSON.stringify(input);
    expect(validateArchive(input).length).toBe(2);
    expect(JSON.stringify(input)).toBe(before);
  });
  it('defers the bundled loader until subscribed and explicitly revalidates immutable invalid data on Retry', async () => {
    const load = jasmine.createSpy('load').and.resolveTo([{ title: ' ' }]);
    TestBed.configureTestingModule({ providers: [{ provide: ARCHIVE_LOADER, useValue: load }] });
    const service = TestBed.inject(AppService);
    const request = service.getApps();
    expect(load).not.toHaveBeenCalled();
    let failures = 0;
    for (let i = 0; i < 2; i++) {
      request.subscribe({ next: () => fail('Invalid data must not heal'), error: () => failures++ });
      await Promise.resolve();
      await Promise.resolve();
    }
    expect(load.calls.count()).toBe(2);
    expect(failures).toBe(2);
  });

  it('keeps all missing/invalid ID encounters and never fabricates a title or a destination', () => {
    const invalidIds = [undefined, null, 0, -1, 1.5, '1', Number.MAX_SAFE_INTEGER + 1];
    const data = validateArchive(invalidIds.map(id => ({ id, title: 'Same retained title', url: null })));
    expect(data.length).toBe(invalidIds.length);
    expect(data.every(item => item.id === undefined && item.url === undefined)).toBeTrue();
  });

  it('exposes actual module import failure rather than successful empty data', async () => {
    const error = new Error('Controlled data chunk failure');
    TestBed.configureTestingModule({
      providers: [{ provide: ARCHIVE_LOADER, useValue: () => Promise.reject(error) }],
    });
    await expectAsync(firstValueFrom(TestBed.inject(AppService).getApps())).toBeRejectedWith(error);
  });
});
