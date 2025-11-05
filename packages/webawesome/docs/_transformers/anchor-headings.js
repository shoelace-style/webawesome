import { parse } from 'node-html-parser';
import slugify from 'slugify';
import { v4 as uuid } from 'uuid';

function createId(text) {
  let slug = slugify(String(text), {
    remove: /[^\w|\s]/g,
    lower: true,
  });

  // ids must start with a letter
  if (!/^[a-z]/i.test(slug)) {
    slug = `wa_${slug}`;
  }

  return slug;
}

/**
 * Eleventy plugin to add anchors to headings to content.
 */
export function anchorHeadingsTransformer(options = {}) {
  options = {
    container: 'body',
    headingSelector: 'h2, h3, h4, h5, h6',
    anchorLabel: 'Jump to heading',
    ...options,
  };

  /** doc is a parsed HTML document */
  return function (doc) {
    const container = doc.querySelector(options.container);

    if (!container) {
      return doc;
    }

    // Check if the document or container has data-no-anchor (view-level)
    const hasNoAnchorOnDocument = doc.querySelector('html')?.hasAttribute('data-no-anchor') || false;
    const hasNoAnchorOnContainer = container.closest('[data-no-anchor]') !== null;

    // If view-level data-no-anchor is set, skip processing all headings
    if (hasNoAnchorOnDocument || hasNoAnchorOnContainer) {
      return doc;
    }

    // Look for headings (selector excludes headings with data-no-anchor attribute)
    let selector = `:is(${options.headingSelector}):not([data-no-anchor])`;
    container.querySelectorAll(selector).forEach(heading => {
      // Skip if heading is a descendant of an element with data-no-anchor
      // (selector already excludes headings with the attribute directly)
      if (heading.closest('[data-no-anchor]') !== null) {
        return;
      }
      const hasAnchor = heading.querySelector('a');
      const existingId = heading.getAttribute('id');
      const clone = parse(heading.outerHTML);

      // Create a clone of the heading so we can remove [data-no-anchor] elements from the text content
      clone.querySelectorAll('[data-no-anchor]').forEach(el => el.remove());

      if (hasAnchor) {
        return;
      }

      let id = existingId;
      if (!id) {
        const slug = createId(clone.textContent ?? '') ?? uuid().slice(-12);
        id = slug;
        let suffix = 1;

        // Make sure the slug is unique in the document
        while (doc.getElementById(id) !== null) {
          id = `${slug}-${++suffix}`;
        }
      }

      // Create the anchor
      const anchor = parse(`
        <a href="#${encodeURIComponent(id)}">
          <span class="wa-visually-hidden"></span>
          <wa-icon variant="regular" name="hashtag" class="icon-shrink"></wa-icon>
        </a>
      `);
      anchor.querySelector('.wa-visually-hidden').textContent = options.anchorLabel;

      // Update the heading
      if (!existingId) {
        heading.setAttribute('id', id);
      }
      heading.classList.add('anchor-heading');
      heading.appendChild(anchor);
    });
  };
}
