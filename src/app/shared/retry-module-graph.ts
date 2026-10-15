import { parse } from 'es-module-lexer/js';

let attempt = 0;

export async function recoverModuleGraph<Module>(entry: string | (() => Promise<Module>), eagerModules: ReadonlySet<string>): Promise<Module> {
  const entryImports = typeof entry === 'function' ? parse(entry.toString())[0].filter(item => item.d >= 0 && item.n) : [];
  const entryUrl = typeof entry === 'string' ? entry : entryImports.length === 1
    ? new URL(entryImports[0].n!, document.baseURI).href : undefined;
  if (!entryUrl) throw new Error('Cannot identify the application-owned lazy module');
  const nonce = `${Date.now()}-${++attempt}`;
  const modules = new Map<string, Promise<string>>();
  const blobs: string[] = [];
  const rewrite = (address: string, ancestors: ReadonlySet<string>): Promise<string> => {
    if (ancestors.has(address)) return Promise.reject(new Error('Cannot recover a cyclic lazy module graph'));
    const existing = modules.get(address);
    if (existing) return existing;
    const job = (async () => {
      const original = new URL(address);
      if (original.origin !== location.origin || !original.pathname.endsWith('.js')) {
        throw new Error('Code recovery is limited to application-owned JavaScript modules');
      }
      const request = new URL(original);
      request.searchParams.set('code-retry', nonce);
      const response = await fetch(request, { credentials: 'same-origin', redirect: 'error' });
      if (!response.ok) throw new Error(`Code recovery request failed (${response.status})`);
      const source = await response.text();
      const [imports] = parse(source);
      const lineage = new Set([...ancestors, address]);
      const edits = await Promise.all(imports.map(async item => {
        if (item.d === -2) {
          return source.slice(item.e, item.e + 4) === '.url'
            ? { start: item.s, end: item.e + 4, value: JSON.stringify(original.href) } : undefined;
        }
        if (!item.n) return undefined;
        const dependency = new URL(item.n, original);
        if (dependency.origin !== location.origin || (!eagerModules.has(dependency.href) && !dependency.pathname.endsWith('.js'))) {
          throw new Error('Cannot recover a module with an external or unresolved dependency');
        }
        const resolved = item.d >= 0 || eagerModules.has(dependency.href) ? dependency.href : await rewrite(dependency.href, lineage);
        return { start: item.s, end: item.e, value: item.d >= 0 ? JSON.stringify(resolved) : resolved };
      }));
      let rebuilt = source;
      for (const edit of edits.filter(item => item !== undefined).sort((a, b) => b.start - a.start)) {
        rebuilt = rebuilt.slice(0, edit.start) + edit.value + rebuilt.slice(edit.end);
      }
      const blob = URL.createObjectURL(new Blob([rebuilt], { type: 'text/javascript' }));
      blobs.push(blob);
      return blob;
    })();
    modules.set(address, job);
    return job;
  };
  try {
    const url = await rewrite(entryUrl, new Set());
    return await import(/* @vite-ignore */ url);
  } finally {
    await Promise.allSettled(modules.values());
    for (const blob of blobs) URL.revokeObjectURL(blob);
  }
}
