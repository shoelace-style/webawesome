/**
 * Generate variants.css
 * To use: node variants.css.js > test.css
 */
const variants = ['neutral', 'brand', 'success', 'warning', 'danger'];
const layers = ['fill', 'border', 'on'];
const priorities = ['loud', 'normal', 'quiet'];
const defaults = {
  neutral: ':root',
  brand: [':host(wa-callout)', '.wa-callout', ':host(wa-badge)', '.wa-badge'],
};

let ret = [];

for (let variant of variants) {
  let selector = [`.wa-${variant}`, `:host([variant='${variant}'])`];
  let declarations = layers.map(layer =>
    priorities.map(
      priority => `--wa-color-${layer}-${priority}-inherit: var(--wa-color-${variant}-${layer}-${priority});`,
    ),
  );

  ret.push(serializeCSSRule(selector, declarations));
}

for (let variant in defaults) {
  let selector = defaults[variant];
  let declarations = layers.map(layer =>
    priorities.map(
      priority => `--wa-color-${layer}-${priority}-initial: var(--wa-color-${variant}-${layer}-${priority});`,
    ),
  );

  ret.push(serializeCSSRule(selector, declarations));
}

ret.push(
  serializeCSSRule(
    [':root', ':host', '[class*=wa-]'],
    layers.map(layer =>
      priorities.map(
        priority =>
          `--wa-color-${layer}-${priority}: var(--wa-color-${layer}-${priority}-inherit, var(--wa-color-${layer}-${priority}-initial));`,
      ),
    ),
  ),
);

console.log(ret.join('\n\n'));

function serializeCSSRule(selector, declarations) {
  selector = Array.isArray(selector) ? selector.flat().join(',\n') : selector;
  declarations = Array.isArray(declarations) ? declarations.flat().join('\n') : declarations;
  declarations = declarations.replace(/^/gm, '  ');
  return `${selector} {\n${declarations}\n}`;
}
