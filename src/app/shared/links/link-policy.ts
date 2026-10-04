export interface LinkDestination {
  readonly href: string;
  readonly external: boolean;
}

export function classifyWebLink(
  value: unknown,
  base = document.baseURI,
  origin = window.location.origin,
): LinkDestination | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  let url: URL;
  try {
    url = new URL(value, base);
  } catch {
    return null;
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
  return { href: url.href, external: url.origin !== origin };
}
