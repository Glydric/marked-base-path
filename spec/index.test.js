import { marked } from 'marked';
import { basePath } from '../src/index.js';

describe('basePath', () => {
  beforeEach(() => {
    const opts = marked.getDefaults();
    opts.mangle = false; // to temporarily disable the warning message
    opts.headerIds = false; // to temporarily disable the warning message
    marked.setOptions(opts);
  });

  test('domain vs locally absolute path', () => {
    marked.use(basePath('https://example.com/'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain vs relative path bare', () => {
    marked.use(basePath('https://example.com/'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain vs relative path', () => {
    marked.use(basePath('https://example.com/'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain without trailing slash vs locally absolute path', () => {
    marked.use(basePath('https://example.com'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain without trailing slash vs relative path bare', () => {
    marked.use(basePath('https://example.com'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain without trailing slash vs relative path', () => {
    marked.use(basePath('https://example.com'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('absolute path', () => {
    marked.use(basePath('https://example.com/'));
    expect(marked.parse('[my url](https://example.org/absolute)')).toMatchInlineSnapshot(`
"<p><a href="https://example.org/absolute">my url</a></p>
"
`);
  });

  test('domain folder base vs locally absolute path', () => {
    marked.use(basePath('https://example.com/folder'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain folder base trailing slash vs locally absolute path', () => {
    marked.use(basePath('https://example.com/folder/'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain file vs relative path', () => {
    marked.use(basePath('https://example.com/file.html'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/relative">my url</a></p>
"
`);
  });

  test('domain folder trailing slash vs relative path', () => {
    marked.use(basePath('https://example.com/folder/'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/folder/relative">my url</a></p>
"
`);
  });

  test('domain folder trailing slash vs relative path bare', () => {
    marked.use(basePath('https://example.com/folder/'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="https://example.com/folder/relative">my url</a></p>
"
`);
  });

  test('relative basePath vs relative path', () => {
    marked.use(basePath('folder/file.html'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="folder/relative">my url</a></p>
"
`);
  });

  test('locally absolute basePath vs relative path', () => {
    marked.use(basePath('/folder/file.html'));
    expect(marked.parse('[my url](./relative)')).toMatchInlineSnapshot(`
"<p><a href="/folder/relative">my url</a></p>
"
`);
  });

  test('relative basePath vs locally absolute path', () => {
    marked.use(basePath('folder'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="/relative">my url</a></p>
"
`);
  });

  test('unchanged as basePath is not a folder', () => {
    marked.use(basePath('folder'));
    expect(marked.parse('[my url](relative)')).toMatchInlineSnapshot(`
"<p><a href="relative">my url</a></p>
"
`);
  });

  test('locally absolute basePath vs locally absolute path', () => {
    marked.use(basePath('/folder'));
    expect(marked.parse('[my url](/relative)')).toMatchInlineSnapshot(`
"<p><a href="/relative">my url</a></p>
"
`);
  });

  test('absolute url, jump up', () => {
    marked.use(basePath('http://example.com/a/b/c/'));
    expect(marked.parse('[my url](../relative)')).toMatchInlineSnapshot(`
"<p><a href="http://example.com/a/b/relative">my url</a></p>
"
`);
  });

  test('locally absolute url, jump up', () => {
    marked.use(basePath('/a/b/c/'));
    expect(marked.parse('[my url](../relative)')).toMatchInlineSnapshot(`
"<p><a href="/a/b/relative">my url</a></p>
"
`);
  });
});
