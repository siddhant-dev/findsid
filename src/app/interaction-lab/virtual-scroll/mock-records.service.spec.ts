import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_QUERY, MockRecord } from './mock-record.model';
import { MockRecordsService, recordWindow } from './mock-records.service';

export function fullDataset(): MockRecord[] {
  return Array.from({ length: 100000 }, (_, i) => ({
    id: i + 1,
    name: `Record ${String(i + 1).padStart(6, '0')}`,
    description: `Synthetic description ${i + 1}`,
  }));
}

describe('MockRecordsService', () => {
  let service: MockRecordsService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockRecordsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MockRecordsService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    service.dispose();
    http.verify({ ignoreCancelled: true });
  });

  it('does not fetch until load and caches only validated full data', () => {
    http.expectNone('assets/lab/records.json');
    let count = 0;
    service.load().subscribe((rows) => count = rows.length);
    http.expectOne('assets/lab/records.json').flush(fullDataset());
    expect(count).toBe(100000);
    expect(service.loaded).toBeTrue();
    service.load().subscribe((rows) => count = rows.length);
    http.expectNone('assets/lab/records.json');
    expect(count).toBe(100000);
  });

  for (const defect of ['count', 'duplicate', 'missing', 'fractional', 'range', 'blank', 'json']) {
    it(`rejects the whole dataset on ${defect} and permits an asset retry`, () => {
      const records: unknown[] = fullDataset();
      if (defect === 'count') records.pop();
      if (defect === 'duplicate') records[99999] = records[0];
      if (defect === 'missing') records[90000] = { id: 90001, name: 'Missing description' };
      if (defect === 'fractional') records[0] = { id: 1.5, name: 'Invalid', description: 'Invalid' };
      if (defect === 'range') records[0] = { id: 100001, name: 'Invalid', description: 'Invalid' };
      if (defect === 'blank') records[0] = { id: 1, name: ' ', description: 'Invalid' };
      let error: unknown;
      service.load().subscribe({ next: () => fail('Invalid records were published'), error: e => error = e });
      http.expectOne('assets/lab/records.json').flush(defect === 'json' ? { records } : records);
      expect(error).toEqual(jasmine.any(Error));
      expect(service.loaded).toBeFalse();
      service.load().subscribe();
      http.expectOne('assets/lab/records.json').flush(fullDataset());
      expect(service.loaded).toBeTrue();
    });
  }

  it('cancels the request on session disposal', () => {
    service.load().subscribe();
    const request = http.expectOne('assets/lab/records.json');
    service.dispose();
    expect(request.cancelled).toBeTrue();
    expect(service.loaded).toBeFalse();
  });

  it('returns true finite intersections, including negative indices', () => {
    const rows = fullDataset().slice(0, 4);
    expect(recordWindow(rows, -3, 2)).toEqual([]);
    expect(recordWindow(rows, -2, 3).map(row => row.id)).toEqual([1]);
    expect(recordWindow(rows, 2, 8).map(row => row.id)).toEqual([3, 4]);
    expect(recordWindow(rows, 4, 2)).toEqual([]);
  });

  it('queries across all rows with literal trimmed OR matching and deterministic sorting', async () => {
    const records = fullDataset();
    records[99999] = { id: 100000, name: 'Alpha', description: 'Unique beyond initial window [needle]' };
    records[0] = { id: 1, name: 'alpha', description: 'First row' };
    records[1] = { id: 2, name: 'Zulu', description: 'End of lexical order' };
    records[2] = { id: 3, name: 'Bravo', description: 'Before the numbered records' };
    service.load().subscribe();
    http.expectOne('assets/lab/records.json').flush(records);
    const match = await service.query({ ...DEFAULT_QUERY, search: ' [NEEDLE] ' });
    expect(match.map(row => row.id)).toEqual([100000]);
    for (const direction of ['asc', 'desc'] as const) {
      const byId = await service.query({ ...DEFAULT_QUERY, direction });
      expect(byId[0].id).toBe(direction === 'asc' ? 1 : 100000);
      const byName = await service.query({ search: 'alpha', field: 'name', direction });
      expect(byName.map(row => row.id)).toEqual([1, 100000]);
      const allNames = await service.query({ ...DEFAULT_QUERY, field: 'name', direction });
      expect(allNames[0].id).toBe(direction === 'asc' ? 1 : 2);
    }
    expect((await service.query({ ...DEFAULT_QUERY, search: 'no matches whatsoever' })).length).toBe(0);
    expect(records[0].id).toBe(1);
    http.expectNone('assets/lab/records.json');
  });

  it('orders names by Unicode code points rather than locale or UTF-16 code units', async () => {
    const records = fullDataset();
    records[0] = { id: 1, name: '\u{10000}', description: 'unicode-order' };
    records[1] = { id: 2, name: '\uE000', description: 'unicode-order' };
    service.load().subscribe();
    http.expectOne('assets/lab/records.json').flush(records);
    const ascending = await service.query({ search: 'unicode-order', field: 'name', direction: 'asc' });
    expect(ascending.map(row => row.id)).toEqual([2, 1]);
    const descending = await service.query({ search: 'unicode-order', field: 'name', direction: 'desc' });
    expect(descending.map(row => row.id)).toEqual([1, 2]);
  });
});
