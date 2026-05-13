import { parse } from 'node-html-parser';

/** Wraps `<code>&lt;wa-*&gt;</code>` in anchors pointing to the component's doc page.
 *  Scoped to `.changelog-group` for now; expand site-wide in a follow-up. */
export function linkifyComponentsTransformer(componentTagNames) {
  const tagSet = new Set(componentTagNames);
  const tagPattern = /^&lt;(wa-[a-z0-9-]+)(?:\s|&gt;)/;

  return function (doc) {
    doc.querySelectorAll('.changelog-group code').forEach(code => {
      const match = code.innerHTML.match(tagPattern);
      if (!match) return;

      const tag = match[1];
      if (!tagSet.has(tag)) return;

      const slug = tag.slice(3); // strip "wa-"
      code.replaceWith(parse(`<a class="component-ref" href="/docs/components/${slug}">${code.outerHTML}</a>`));
    });
  };
}
