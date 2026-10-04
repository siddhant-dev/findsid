import { classifyWebLink } from './link-policy';

describe('Web link policy', () => {
  const base = 'https://portfolio.example/subdir/';
  const origin = 'https://portfolio.example';

  it('resolves paths and fragments against the actual app base and origin', () => {
    for (const [value, href] of [
      ['article', `${base}article`], ['/work/articles/7', `${origin}/work/articles/7`],
      ['#part', `${base}#part`], ['?page=2', `${base}?page=2`],
      [`${origin}/resume`, `${origin}/resume`],
    ]) {
      expect(classifyWebLink(value, base, origin)).toEqual({ href, external: false });
    }
    expect(classifyWebLink('https://findsid.dev', base, origin)?.external).toBeTrue();
    expect(classifyWebLink('/local')).toEqual({
      href: new URL('/local', document.baseURI).href, external: false,
    });
  });

  it('allows cross-origin HTTP(S) without availability probes', () => {
    for (const value of ['https://offline.invalid/project', 'http://other.example', '//other.example/path']) {
      expect(classifyWebLink(value, base, origin)).toEqual({
        href: new URL(value, base).href, external: true,
      });
    }
  });

  it('denies missing malformed credential-bearing and non-web destinations', () => {
    for (const value of [undefined, null, '', ' ', 42, {}, 'http://[bad',
      'javascript:alert(1)', 'data:text/html,test', 'mailto:hi@example.com', 'tel:123',
      'file:///tmp/test', 'https://user:password@example.com', 'https://user@example.com']) {
      expect(classifyWebLink(value, base, origin)).withContext(String(value)).toBeNull();
    }
  });
});
