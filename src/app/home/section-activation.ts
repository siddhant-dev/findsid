export type LazySectionId = 'articles' | 'vault';

export type SectionActivationState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; value: T }
  | { status: 'error'; error: unknown }
  | { status: 'disposed' };

export type SectionLoader<T> = () => Promise<T>;

export class SectionActivationCoordinator<T> {
  private readonly states = new Map<LazySectionId, SectionActivationState<T>>();
  private readonly pending = new Map<LazySectionId, Promise<T | undefined>>();
  private generation = 0;
  private destroyed = false;

  constructor(
    private readonly loaders: Partial<Record<LazySectionId, SectionLoader<T>>>,
  ) {
    for (const id of Object.keys(loaders) as LazySectionId[]) {
      this.states.set(id, { status: 'idle' });
    }
  }

  state(id: LazySectionId): SectionActivationState<T> {
    return this.states.get(id) ?? { status: this.destroyed ? 'disposed' : 'idle' };
  }

  activate(id: LazySectionId): Promise<T | undefined> {
    const current = this.state(id);
    if (this.destroyed || current.status === 'disposed') {
      return Promise.resolve(undefined);
    }
    if (current.status === 'ready') {
      return Promise.resolve(current.value);
    }
    const inFlight = this.pending.get(id);
    if (inFlight) {
      return inFlight;
    }

    const loader = this.loaders[id];
    if (!loader) {
      return Promise.reject(new Error(`No loader registered for section "${id}"`));
    }

    const generation = this.generation;
    this.states.set(id, { status: 'loading' });
    const request = loader().then(
      (value) => {
        if (this.destroyed || generation !== this.generation) {
          return undefined;
        }
        this.states.set(id, { status: 'ready', value });
        return value;
      },
      (error: unknown) => {
        if (!this.destroyed && generation === this.generation) {
          this.states.set(id, { status: 'error', error });
        }
        throw error;
      },
    );
    this.pending.set(id, request);
    request.finally(() => {
      if (this.pending.get(id) === request) {
        this.pending.delete(id);
      }
    }).catch(() => undefined);
    return request;
  }

  retry(id: LazySectionId): Promise<T | undefined> {
    const current = this.state(id);
    if (current.status !== 'error') {
      return this.activate(id);
    }
    return this.activate(id);
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.generation += 1;
    for (const id of this.states.keys()) {
      this.states.set(id, { status: 'disposed' });
    }
    this.pending.clear();
  }
}

export function sectionActivationRootMargin(rootFontSizePx: number): string {
  if (!Number.isFinite(rootFontSizePx) || rootFontSizePx <= 0) {
    throw new Error('Root font size must be a positive finite number');
  }
  return `0px 0px ${20 * rootFontSizePx}px 0px`;
}
