import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { defer, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { MockRecord, QuerySelection } from './mock-record.model';

@Injectable()
export class MockRecordsService {
  private readonly http = inject(HttpClient);
  private readonly disposed$ = new Subject<void>();
  private records?: readonly MockRecord[];
  private disposed = false;

  get loaded(): boolean {
    return this.records !== undefined;
  }

  load(): Observable<readonly MockRecord[]> {
    return defer(() => {
      if (this.disposed) throw new Error('The dataset session has been disposed');
      if (this.records) return of(this.records);
      return this.http.get<unknown>('assets/lab/records.json').pipe(
        map(validateRecords),
        tap(records => this.records = records),
        takeUntil(this.disposed$),
      );
    });
  }

  async query(selection: QuerySelection): Promise<readonly MockRecord[]> {
    if (!this.records || this.disposed) throw new Error('Load the dataset before querying');
    const needle = selection.search.trim().toLowerCase();
    const matches = this.records.filter(row => !needle ||
      row.name.toLowerCase().includes(needle) || row.description.toLowerCase().includes(needle));
    const direction = selection.direction === 'asc' ? 1 : -1;
    return matches.sort((left, right) => {
      if (selection.field === 'id') return (left.id - right.id) * direction;
      const a = left.name.toLowerCase();
      const b = right.name.toLowerCase();
      return compareCodePoints(a, b) * direction || left.id - right.id;
    });
  }

  dispose(): void {
    this.disposed = true;
    this.disposed$.next();
    this.disposed$.complete();
    this.records = undefined;
  }
}

export function recordWindow(
  records: readonly MockRecord[],
  index: number,
  count: number,
): MockRecord[] {
  if (!Number.isSafeInteger(index) || !Number.isSafeInteger(count) || count <= 0) {
    throw new Error('Window index/count must be safe integers with a positive count');
  }
  return records.slice(Math.max(0, index), Math.max(0, index + count));
}

function validateRecords(value: unknown): readonly MockRecord[] {
  if (!Array.isArray(value) || value.length !== 100000) {
    throw new Error('The dataset must contain exactly 100,000 records');
  }
  const ids = new Set<number>();
  const records: MockRecord[] = [];
  for (const entry of value) {
    const candidate: unknown = entry;
    if (typeof candidate !== 'object' || candidate === null ||
      !('id' in candidate) || !('name' in candidate) || !('description' in candidate) ||
      typeof candidate.id !== 'number' || !Number.isSafeInteger(candidate.id) ||
      candidate.id < 1 || candidate.id > 100000 || ids.has(candidate.id) ||
      typeof candidate.name !== 'string' || !candidate.name.trim() ||
      typeof candidate.description !== 'string' || !candidate.description.trim()) {
      throw new Error('The dataset contains invalid fields or duplicate/out-of-range IDs');
    }
    ids.add(candidate.id);
    records.push({ id: candidate.id, name: candidate.name, description: candidate.description });
  }
  return records;
}

function compareCodePoints(left: string, right: string): number {
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    const a = left.codePointAt(i)!;
    const b = right.codePointAt(j)!;
    if (a !== b) return a - b;
    i += a > 0xffff ? 2 : 1;
    j += b > 0xffff ? 2 : 1;
  }
  return (left.length - i) - (right.length - j);
}
