import { DemoMeasurement, OperationMeasurement } from './demo-measurement';

describe('DemoMeasurement', () => {
  let viewport: HTMLElement;
  let measurement: DemoMeasurement;
  let values: OperationMeasurement[];
  let now: number;
  beforeEach(() => {
    now = 10;
    values = [];
    viewport = document.createElement('div');
    document.body.appendChild(viewport);
    spyOn(viewport, 'getBoundingClientRect').and.returnValue(new DOMRect(0, 0, 320, 400));
    measurement = new DemoMeasurement(value => values.push(value), () => now);
  });
  afterEach(() => {
    measurement.dispose();
    viewport.remove();
  });
  function row(generation: number, top: number): HTMLElement {
    const element = document.createElement('div');
    element.dataset['recordId'] = '1';
    element.dataset['generation'] = String(generation);
    spyOn(element, 'getBoundingClientRect').and.returnValue(new DOMRect(0, top, 300, 50));
    viewport.appendChild(element);
    return element;
  }
  async function frame(): Promise<void> {
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  }

  it('ends timing only on a connected current-generation visible record at a frame', async () => {
    measurement.begin(1, 'Start');
    row(0, 10);
    row(1, 500);
    measurement.observe(viewport, 1);
    now = 40;
    await frame();
    expect(values[values.length - 1]?.firstRowMs).toBeNull();
    row(1, 10);
    await frame();
    await frame();
    expect(values[values.length - 1]?.firstRowMs).toBe(30);
    expect(values[values.length - 1]?.renderedRows).toBe(2);
    now = 100;
    viewport.dispatchEvent(new Event('scroll'));
    await frame();
    expect(values[values.length - 1]?.firstRowMs).toBe(30);
  });

  it('ignores superseded observations and reports no fabricated empty/error timing', async () => {
    measurement.begin(1, 'Start');
    row(1, 10);
    measurement.begin(2, 'Search');
    measurement.observe(viewport, 1);
    await frame();
    expect(values[values.length - 1]?.generation).toBe(2);
    measurement.unavailable(2);
    expect(values[values.length - 1]?.firstRowMs).toBeNull();
    expect(values[values.length - 1]?.renderedRows).toBe(0);
    const count = values.length;
    measurement.dispose();
    row(2, 10);
    await frame();
    expect(values.length).toBe(count);
  });
});
