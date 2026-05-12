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
      const info = tokens[idx].info.trim().replace(/^pro\s*/, '');
      const iconMatch = info.match(/^\{([\w-]+)\}\s*(.*)$/);
      const iconName = iconMatch ? iconMatch[1] : 'hand-wave';
      const title = iconMatch ? iconMatch[2].trim() : info.trim();
      return `
        <wa-callout class="pro">
          <wa-icon slot="icon" name="${markdown.utils.escapeHtml(iconName)}"></wa-icon>
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

markdown.use(markdownItAttrs, {
  allowedAttributes: [],
});
