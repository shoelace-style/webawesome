/**
 * Post-Prism transformer for theming-instruction snippets.
 *
 * Snippets are rendered at build time with sentinel markers that survive Prism's HTML tokenizer
 * as plain text. After highlighting, this transformer rewrites them into spans the client-side
 * script in `_includes/theming/instructions.njk` can target:
 *
 *   __NAME__                              -> <span data-dyn="name">{default}</span>
 *   __OPT_NAME_START__...__OPT_NAME_END__ -> <span data-opt="name">...</span>
 *
 * Because the spans are injected after tokenization, they sit *inside* Prism's token wrappers —
 * coloring inherits down to the dynamic text, so client-side updates don't disturb the highlight.
 */

// Default values shown when the script hasn't run yet (or when defaults are still selected).
const DYN_DEFAULTS = {
  theme: 'default',
  palette: 'default',
  brand: 'blue',
  neutral: 'gray',
  success: 'green',
  warning: 'yellow',
  danger: 'red',
};

// Optional regions — wrapped with `data-opt`, removed by the client when the value matches the default.
const OPT_REGIONS = ['palette-link', 'palette-class', 'brand', 'neutral', 'success', 'warning', 'danger'];

// Precompile patterns once per build — the markers are identical across every snippet.
const DYN_RE = Object.keys(DYN_DEFAULTS).map(name => ({
  name,
  re: new RegExp(`__${name.toUpperCase()}__`, 'g'),
}));
const OPT_RE = OPT_REGIONS.map(name => {
  const token = name.replace(/-/g, '_').toUpperCase();
  return { name, re: new RegExp(`__OPT_${token}_START__([\\s\\S]*?)__OPT_${token}_END__`, 'g') };
});

export function dynamicSnippetsTransformer() {
  return function (doc) {
    doc.querySelectorAll('code[data-dynamic-snippet]').forEach(code => {
      let html = code.innerHTML;

      // Wrap optional regions first; dyn markers nested inside them are handled in the next pass.
      for (const { name, re } of OPT_RE) {
        html = html.replace(re, `<span data-opt="${name}">$1</span>`);
      }

      // Replace single-token markers.
      for (const { name, re } of DYN_RE) {
        html = html.replace(re, `<span data-dyn="${name}">${DYN_DEFAULTS[name]}</span>`);
      }

      code.innerHTML = html;
    });
  };
}
