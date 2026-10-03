describe('Blueprint style contract', () => {
  let host: HTMLDivElement;

  beforeEach(() => {
    host = document.createElement('div');
    document.body.appendChild(host);
  });

  afterEach(() => {
    host.remove();
  });

  it('declares the fixed palette and font stacks on the root', () => {
    const styles = getComputedStyle(document.documentElement);

    expect(styles.getPropertyValue('--bg-color').trim()).toBe('#0b192c');
    expect(styles.getPropertyValue('--bg-secondary').trim()).toBe('#1e293b');
    expect(styles.getPropertyValue('--surface-color').trim()).toBe(
      'rgba(30, 41, 59, 0.4)',
    );
    expect(styles.getPropertyValue('--border-color').trim()).toBe(
      'rgba(56, 189, 248, 0.25)',
    );
    expect(styles.getPropertyValue('--border-active').trim()).toBe('#38bdf8');
    expect(styles.getPropertyValue('--text-main').trim()).toBe('#f8fafc');
    expect(styles.getPropertyValue('--text-muted').trim()).toBe('#94a3b8');
    expect(styles.getPropertyValue('--accent').trim()).toBe('#38bdf8');
    expect(styles.getPropertyValue('--accent-glow').trim()).toBe(
      'rgba(56, 189, 248, 0.15)',
    );
    expect(styles.getPropertyValue('--error-color').trim()).toBe('#ef4444');
    expect(styles.getPropertyValue('--modal-backdrop').trim()).toBe(
      'rgba(11, 25, 44, 0.8)',
    );
    expect(styles.getPropertyValue('--font-sans')).toContain('Inter');
    expect(styles.getPropertyValue('--font-mono')).toContain('Fira Code');
  });

  it('applies all seven typography roles', () => {
    const roles = [
      ['page-title', 'Inter', '44px', '700'],
      ['section-heading', 'Fira Code', '20px', '500'],
      ['content-title', 'Inter', '17.6px', '600'],
      ['body-text', 'Inter', '15.2px', '400'],
      ['description-text', 'Inter', '14.4px', '400'],
      ['navigation-text', 'Fira Code', '13.6px', '400'],
      ['metadata-text', 'Fira Code', '12px', '400'],
    ] as const;

    for (const [role, family, size, weight] of roles) {
      const element = document.createElement('span');
      element.className = role;
      host.appendChild(element);
      const styles = getComputedStyle(element);

      expect(styles.fontFamily).toContain(family);
      expect(styles.fontSize).toBe(size);
      expect(styles.fontWeight).toBe(weight);
    }

    expect(getComputedStyle(host.querySelector('.body-text')!).lineHeight).toBe(
      '24.32px',
    );
  });

  it('uses the browser default root size and scales inherited text and control padding', () => {
    const root = document.documentElement;
    const originalSize = root.style.fontSize;
    const rules = Array.from(document.styleSheets).flatMap((sheet) =>
      Array.from(sheet.cssRules),
    );
    expect(
      rules.some(
        (rule) =>
          rule instanceof CSSStyleRule &&
          rule.selectorText === 'html' &&
          rule.style.fontSize === '100%',
      ),
    ).toBeTrue();

    const button = document.createElement('button');
    button.className = 'blueprint-button';
    button.textContent = 'Submit';
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = 'Angular';
    const text = document.createElement('p');
    text.className = 'body-text';
    host.append(button, tag, text);

    try {
      for (const size of [16, 20, 32]) {
        root.style.fontSize = `${size}px`;
        expect(parseFloat(getComputedStyle(document.body).fontSize)).toBe(size);
        expect(parseFloat(getComputedStyle(text).fontSize)).toBeCloseTo(
          size * 0.95,
          2,
        );
        expect(parseFloat(getComputedStyle(button).fontSize)).toBe(size * 0.75);
        expect(parseFloat(getComputedStyle(button).paddingTop)).toBe(
          size * 0.375,
        );
        expect(parseFloat(getComputedStyle(button).paddingLeft)).toBe(
          size * 0.75,
        );
        expect(parseFloat(getComputedStyle(tag).paddingTop)).toBe(size * 0.125);
        expect(parseFloat(getComputedStyle(tag).paddingLeft)).toBe(size * 0.5);
      }
    } finally {
      root.style.fontSize = originalSize;
    }
  });

  it('renders both reference grid scales and the edge vignette', () => {
    const canvas = document.createElement('div');
    canvas.className = 'blueprint-bg';
    host.appendChild(canvas);
    const styles = getComputedStyle(canvas);

    expect(styles.backgroundColor).toBe('rgb(11, 25, 44)');
    expect(styles.backgroundImage).toBe(
      [
        'linear-gradient(rgba(56, 189, 248, 0.08) 1px, rgba(0, 0, 0, 0) 1px)',
        'linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, rgba(0, 0, 0, 0) 1px)',
        'linear-gradient(rgba(56, 189, 248, 0.03) 1px, rgba(0, 0, 0, 0) 1px)',
        'linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, rgba(0, 0, 0, 0) 1px)',
      ].join(', '),
    );
    expect(styles.backgroundSize).toBe(
      '100px 100px, 100px 100px, 20px 20px, 20px 20px',
    );
    expect(styles.backgroundPosition).toBe(
      '-1px -1px, -1px -1px, -1px -1px, -1px -1px',
    );

    const vignette = getComputedStyle(canvas, '::after');
    expect(vignette.content).toBe('""');
    expect(vignette.backgroundImage).toBe(
      'radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(11, 25, 44, 0.8) 100%)',
    );
    expect(styles.animationName).toBe('none');
    expect(vignette.animationName).toBe('none');
    expect(styles.pointerEvents).toBe('none');
    expect(vignette.pointerEvents).toBe('none');
  });

  it('bounds the fixed grid to the viewport without layout space or zoom overflow', () => {
    const canvas = document.createElement('div');
    canvas.className = 'blueprint-bg';
    host.appendChild(canvas);
    const styles = getComputedStyle(canvas);

    expect(styles.position).toBe('fixed');
    expect(styles.top).toBe('0px');
    expect(styles.right).toBe('0px');
    expect(styles.bottom).toBe('0px');
    expect(styles.left).toBe('0px');

    for (const width of [320, 1024]) {
      for (const zoom of ['1', '2']) {
        host.style.width = `${width}px`;
        host.style.zoom = zoom;
        const bounds = canvas.getBoundingClientRect();

        expect(bounds.left).toBe(0);
        expect(bounds.top).toBe(0);
        expect(bounds.width).toBe(document.documentElement.clientWidth);
        expect(bounds.height).toBe(document.documentElement.clientHeight);
        expect(host.scrollWidth).toBeLessThanOrEqual(host.clientWidth);
        expect(host.clientHeight).toBe(0);
      }
    }
  });

  it('provides visible keyboard focus and muted disabled controls', () => {
    const button = document.createElement('button');
    button.className = 'blueprint-button';
    host.appendChild(button);
    button.focus();

    expect(getComputedStyle(button).outlineWidth).toBe('2px');
    expect(getComputedStyle(button).outlineOffset).toBe('2px');

    button.disabled = true;
    expect(getComputedStyle(button).color).toBe('rgb(148, 163, 184)');
    expect(getComputedStyle(button).boxShadow).toBe('none');
  });

  it('distinguishes error and success feedback with approved colors', () => {
    const error = document.createElement('p');
    error.className = 'error-message';
    const success = document.createElement('p');
    success.className = 'success-message';
    host.append(error, success);

    expect(getComputedStyle(error).color).toBe('rgb(239, 68, 68)');
    expect(getComputedStyle(success).color).toBe('rgb(56, 189, 248)');
  });

  it('keeps long text wrapping and wide code locally scrollable', () => {
    const paragraph = document.createElement('p');
    paragraph.className = 'body-text';
    paragraph.textContent = 'https://example.com/'.repeat(40);
    const code = document.createElement('pre');
    code.className = 'article-code';
    code.textContent = 'const longIdentifierWithoutBreaks = 1; '.repeat(30);
    host.append(paragraph, code);

    expect(getComputedStyle(paragraph).overflowWrap).toBe('anywhere');
    expect(getComputedStyle(code).overflowX).toBe('auto');

    for (const width of [320, 1024]) {
      host.style.width = `${width}px`;

      expect(paragraph.scrollWidth).toBeLessThanOrEqual(paragraph.clientWidth);
      expect(code.scrollWidth).toBeGreaterThan(code.clientWidth);
      expect(host.scrollWidth).toBeLessThanOrEqual(host.clientWidth);
    }
  });

  it('retains sans-serif and monospace fallback families when web fonts are unavailable', () => {
    const body = document.createElement('p');
    body.className = 'body-text';
    const code = document.createElement('code');
    host.append(body, code);

    expect(getComputedStyle(body).fontFamily).toContain('-apple-system');
    expect(getComputedStyle(body).fontFamily).toContain('sans-serif');
    expect(getComputedStyle(code).fontFamily).toContain('monospace');
  });
});
