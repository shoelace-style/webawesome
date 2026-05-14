import { parse } from 'node-html-parser';

/** Wraps `<code>&lt;wa-*&gt;</code>` in anchors pointing to the component's doc page. */
export function linkifyComponentsTransformer(componentTagNames) {
  const tagSet = new Set(componentTagNames);
  const tagPattern = /^&lt;(wa-[a-z0-9-]+)(?:\s|&gt;)/;
  const normalize = path => path.replace(/\/$/, '');

  return function (doc) {
    // View-level opt-out: skip the entire page when `<html data-no-linkify>` is set.
    if (doc.querySelector('html[data-no-linkify]')) return;

    const currentPath = normalize(this.page.url);

    doc.querySelectorAll('#content code').forEach(code => {
      // Skip code blocks, code inside interactive ancestors, and code inside an opt-out region.
      if (code.closest('pre, a, button, [data-no-linkify]')) return;

      const match = code.innerHTML.match(tagPattern);
      if (!match) return;

      const tag = match[1];
      if (!tagSet.has(tag)) return;

      const targetPath = `/docs/components/${tag.slice(3)}`;
      if (currentPath === targetPath) return;

      code.replaceWith(parse(`<a class="component-ref" href="${targetPath}">${code.outerHTML}</a>`));
    });
  };
}
