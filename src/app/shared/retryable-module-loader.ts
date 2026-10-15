export function retryableModuleLoader<Module>(load: () => Promise<Module>): (retry?: boolean) => Promise<Module> {
  let eagerModules = new Set<string>();
  let failedUrl: string | undefined;
  let initialized = false;
  let recovered: Module | undefined;
  return async (retry = false) => {
    if (recovered) return recovered;
    if (!initialized) {
      initialized = true;
      eagerModules = new Set([
        ...performance.getEntriesByType('resource').map(entry => entry.name),
        ...Array.from(document.scripts, script => script.src),
      ]);
    }
    if (retry) {
      const { recoverModuleGraph } = await import('./retry-module-graph');
      recovered = await recoverModuleGraph<Module>(failedUrl ?? load, eagerModules);
      return recovered;
    }
    try {
      return await load();
    } catch (error) {
      if (error instanceof Error) {
        const address = error.message.match(/https?:\/\/[^\s"'<>]+/)?.[0];
        if (address) {
          const url = new URL(address);
          if (url.origin === location.origin && url.pathname.endsWith('.js')) failedUrl = url.href;
        }
      }
      throw error;
    }
  };
}
