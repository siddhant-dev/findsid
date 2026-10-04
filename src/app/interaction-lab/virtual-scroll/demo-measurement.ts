export interface OperationMeasurement {
  readonly generation: number;
  readonly label: string;
  readonly firstRowMs: number | null;
  readonly renderedRows: number;
}

export class DemoMeasurement {
  private current?: OperationMeasurement;
  private started = 0;
  private viewport?: HTMLElement;
  private mutations?: MutationObserver;
  private resize?: ResizeObserver;
  private frame = 0;
  private disposed = false;

  begin(generation: number, label: string): void {
    if (this.disposed) return;
    this.detach();
    this.started = this.clock();
    this.current = { generation, label, firstRowMs: null, renderedRows: 0 };
    this.publish(this.current);
  }

  observe(viewport: HTMLElement, generation: number): void {
    if (this.disposed || this.current?.generation !== generation) return;
    this.detach();
    this.viewport = viewport;
    this.mutations = new MutationObserver(this.schedule);
    this.mutations.observe(viewport, { childList: true, subtree: true });
    this.resize = new ResizeObserver(this.schedule);
    this.resize.observe(viewport);
    viewport.addEventListener('scroll', this.schedule, { passive: true });
    window.addEventListener('scroll', this.schedule, { passive: true });
    window.addEventListener('resize', this.schedule, { passive: true });
    this.schedule();
  }

  unavailable(generation: number): void {
    if (this.disposed || this.current?.generation !== generation) return;
    this.detach();
    this.current = { ...this.current, firstRowMs: null, renderedRows: 0 };
    this.publish(this.current);
  }

  dispose(): void {
    this.disposed = true;
    this.detach();
    this.current = undefined;
  }

  constructor(
    private readonly publish: (value: OperationMeasurement) => void,
    private readonly clock: () => number = () => performance.now(),
  ) {}

  private readonly schedule = (): void => {
    if (!this.disposed && !this.frame) {
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        this.sample();
      });
    }
  };

  private sample(): void {
    if (this.disposed || !this.current || !this.viewport?.isConnected) return;
    const rows = Array.from(this.viewport.querySelectorAll<HTMLElement>(
      `[data-record-id][data-generation="${this.current.generation}"]`,
    ));
    const bounds = this.viewport.getBoundingClientRect();
    const visible = rows.some(row => {
      const rect = row.getBoundingClientRect();
      return row.isConnected && rect.width > 0 && rect.height > 0 &&
        rect.bottom > Math.max(0, bounds.top) &&
        rect.top < Math.min(window.innerHeight, bounds.bottom) &&
        rect.right > Math.max(0, bounds.left) &&
        rect.left < Math.min(window.innerWidth, bounds.right);
    });
    const firstRowMs = this.current.firstRowMs ??
      (visible ? Math.max(0, this.clock() - this.started) : null);
    if (rows.length !== this.current.renderedRows || firstRowMs !== this.current.firstRowMs) {
      this.current = { ...this.current, firstRowMs, renderedRows: rows.length };
      this.publish(this.current);
    }
  }

  private detach(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.mutations?.disconnect();
    this.resize?.disconnect();
    this.viewport?.removeEventListener('scroll', this.schedule);
    window.removeEventListener('scroll', this.schedule);
    window.removeEventListener('resize', this.schedule);
    this.viewport = undefined;
  }
}
