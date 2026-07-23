import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItContainer from 'markdown-it-container';
import markdownItIns from 'markdown-it-ins';
import markdownItKbd from 'markdown-it-kbd';
import markdownItMark from 'markdown-it-mark';

/**
 * A custom Markdown It instance with added features.
 */
export const markdown = MarkdownIt({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  typographer: false,
});

markdown.use(markdownItIns);
markdown.use(markdownItKbd);
markdown.use(markdownItMark);

['info', 'warning'].forEach(type => {
  markdown.use(markdownItContainer, type, {
    render: function (tokens, idx) {
      const variant = type === 'warning' ? 'warning' : 'brand';
      const icon = type === 'warning' ? 'triangle-exclamation' : 'lightbulb';
      if (tokens[idx].nesting === 1) {
        return `
          <wa-callout variant="${variant}">
            <wa-icon slot="icon" name="${icon}" variant="regular"></wa-icon>
        `;
      }
      return '</wa-callout>\n';
    },
  });
});

markdown.use(markdownItContainer, 'pro', {
  validate: params => /^pro(\s+.+)?$/.test(params.trim()),
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      const title = tokens[idx].info.trim().replace(/^pro\s*/, '');
      return `
        <wa-callout class="pro wa-brand-orange">
          <wa-icon slot="icon" name="crown" family="duotone" variant="regular" class="duotone-illustrated"></wa-icon>
          ${title ? `<strong>${markdown.utils.escapeHtml(title)}</strong>` : ''}
      `;
    }
    return '</wa-callout>\n';
  },
});

markdown.use(markdownItContainer, 'aside', {
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return `<aside>`;
    }
    return '</aside>\n';
  },
});

markdown.use(markdownItContainer, 'details', {
  validate: params => params.trim().match(/^details\s+(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      return `<details>\n<summary><span>${markdown.utils.escapeHtml(m[1])}</span></summary>\n`;
    }
    return '</details>\n';
  },
});

// Changelog category containers; bullets get an icon in changelog-list-icons.js.
['added', 'fixed', 'changed', 'deprecated', 'removed', 'breaking'].forEach(category => {
  markdown.use(markdownItContainer, category, {
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const label = category.charAt(0).toUpperCase() + category.slice(1);
        return `<div class="changelog-group changelog-group-${category}">\n<p class="wa-visually-hidden">${label}</p>\n`;
      }
      return '</div>\n';
    },
  });
});

markdown.use(markdownItAttrs, {
  allowedAttributes: [],
});
