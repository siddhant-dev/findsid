import { recoverModuleGraph } from './retry-module-graph';
import { retryableModuleLoader } from './retryable-module-loader';

describe('Explicit lazy-module recovery', () => {
  const entry = new URL('/controlled-entry.js', location.origin).href;
  const dependency = new URL('/controlled-dependency.js', location.origin).href;
  it('keeps normal loading unchanged and makes no recovery request', async () => {
    const fetchSpy = spyOn(window, 'fetch');
    const original = jasmine.createSpy('normal import').and.resolveTo({ value: 7 });
    const load = retryableModuleLoader(original);
    expect(await load()).toEqual({ value: 7 });
    expect(original.calls.count()).toBe(1);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('parses actual ESM imports, rewrites only dependencies and preserves literal text', async () => {
    const revoked = spyOn(URL, 'revokeObjectURL').and.callThrough();
    const fetchSpy = spyOn(window, 'fetch').and.callFake(async input => {
      const url = new URL(String(input));
      const source = url.pathname === '/controlled-entry.js'
        ? 'export { value } from "./controlled-dependency.js"; export const literal = \'from "./unchanged.js"\';'
        : 'export const value = 42;';
      return new Response(source, { status: 200 });
    });
    const result = await recoverModuleGraph<{ value: number; literal: string }>(entry, new Set());
    expect(result.value).toBe(42);
    expect(result.literal).toBe('from "./unchanged.js"');
    expect(fetchSpy.calls.count()).toBe(2);
    for (const args of fetchSpy.calls.allArgs()) {
      expect(new URL(String(args[0])).searchParams.has('code-retry')).toBeTrue();
      expect(args[1]?.redirect).toBe('error');
    }
    expect(revoked.calls.count()).toBe(2);
  });

  it('keeps successful recovery identity for reopening instead of repeating a cached failed import', async () => {
    const original = jasmine.createSpy('normal import').and.rejectWith(new TypeError(`Failed to fetch dynamically imported module: ${entry}`));
    const fetchSpy = spyOn(window, 'fetch').and.resolveTo(new Response('export const value = 9;'));
    const load = retryableModuleLoader<{ value: number }>(original);
    await expectAsync(load()).toBeRejected();
    const recovered = await load(true);
    expect(recovered.value).toBe(9);
    expect(await load() === recovered).toBeTrue();
    expect(await load(true) === recovered).toBeTrue();
    expect(fetchSpy.calls.count()).toBe(1);
    expect(original.calls.count()).toBe(1);
  });

  it('identifies the bundled static import when a browser error omits its module URL', async () => {
    const importer = Object.assign(() => Promise.reject(new TypeError('Importing a module script failed.')), {
      toString: () => '() => import("/controlled-entry.js")',
    });
    spyOn(window, 'fetch').and.resolveTo(new Response('export const value = 17;'));
    const result = await recoverModuleGraph<{ value: number }>(importer, new Set());
    expect(result.value).toBe(17);
  });

  it('rejects external imports, unsuccessful fetches and cycles without silently falling back', async () => {
    const fetchSpy = spyOn(window, 'fetch').and.resolveTo(new Response('import "https://outside.invalid/script.js";'));
    await expectAsync(recoverModuleGraph(entry, new Set())).toBeRejectedWithError(/external/);
    fetchSpy.and.resolveTo(new Response('Unavailable', { status: 503 }));
    await expectAsync(recoverModuleGraph(entry, new Set())).toBeRejectedWithError(/503/);
    fetchSpy.and.callFake(async input => new Response(new URL(String(input)).pathname === '/controlled-entry.js'
      ? 'import "./controlled-dependency.js";' : 'import "./controlled-entry.js";'));
    await expectAsync(recoverModuleGraph(entry, new Set())).toBeRejectedWithError(/cyclic/);
    expect(fetchSpy.calls.allArgs().some(args => String(args[0]).startsWith(dependency))).toBeTrue();
  });
});
