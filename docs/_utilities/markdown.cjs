const MarkdownIt = require('markdown-it');
const markdownItContainer = require('markdown-it-container');
const markdownItIns = require('markdown-it-ins');
const markdownItKbd = require('markdown-it-kbd');
const markdownItMark = require('markdown-it-mark');
const markdownItReplaceIt = require('markdown-it-replace-it');

const markdown = MarkdownIt({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: false,
  typographer: false
});

// Third-party plugins
markdown.use(markdownItContainer);
markdown.use(markdownItIns);
markdown.use(markdownItKbd);
markdown.use(markdownItMark);
markdown.use(markdownItReplaceIt);

// Callouts
['tip', 'warning', 'danger'].forEach(type => {
  const variant = type === 'tip' ? 'brand' : type;
  let icon = 'info-circle';
  if (type === 'warning') icon = 'exclamation-circle';
  if (type === 'danger') icon = 'exclamation-triangle';

  markdown.use(markdownItContainer, type, {
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return `
          <wa-alert class="callout" variant="${variant}" open>
            <wa-icon slot="icon" name="${icon}"></wa-icon>
        `;
      }
      return '</wa-alert>\n';
    }
  });
});

// Asides
markdown.use(markdownItContainer, 'aside', {
  render: function (tokens, idx) {
    if (tokens[idx].nesting === 1) {
      return `<aside>`;
    }
    return '</aside>\n';
  }
});

// Details
markdown.use(markdownItContainer, 'details', {
  validate: params => params.trim().match(/^details\s+(.*)$/),
  render: (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      return `<details>\n<summary><span>${markdown.utils.escapeHtml(m[1])}</span></summary>\n`;
    }
    return '</details>\n';
  }
});

// Replace [#1234] with a link to GitHub issues
markdownItReplaceIt.replacements.push({
  name: 'github-issues',
  re: /\[#([0-9]+)\]/gs,
  sub: '<a href="https://github.com/shoelace-style/shoelace/issues/$1">#$1</a>',
  html: true,
  default: true
});

module.exports = markdown;
