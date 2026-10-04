export interface MockRecord {
  readonly id: number;
  readonly name: string;
  readonly description: string;
}

export interface QuerySelection {
  readonly search: string;
  readonly field: 'id' | 'name';
  readonly direction: 'asc' | 'desc';
}

export const DEFAULT_QUERY: QuerySelection = {
  search: '',
  field: 'id',
  direction: 'asc',
};
