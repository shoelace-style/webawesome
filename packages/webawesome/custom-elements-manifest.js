import { jsxTypesPlugin } from '@wc-toolkit/jsx-types';
import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration';
import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';
// import { customElementVuejsPlugin } from 'custom-element-vuejs-integration';
import { parse } from 'comment-parser';
import fs from 'fs';
import * as path from 'node:path';
import { pascalCase } from 'pascal-case';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packageData = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const { name, description, version, author, homepage, license } = packageData;
const outdir = 'dist-cdn';

function replace(string, terms) {
  terms.forEach(({ from, to }) => {
    string = string?.replace(from, to);
  });

  return string;
}

export default {
  globs: ['src/components/**/*.ts'],
  exclude: ['**/*.styles.ts', '**/*.test.ts'],
  litelement: true,
  outdir,
  plugins: [
    // Append package data
    {
      name: 'wa-package-data',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest.package = { name, description, version, author, homepage, license };
      },
    },

    // Parse custom jsDoc tags
    {
      name: 'wa-custom-tags',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
            const customTags = ['dependency', 'documentation', 'since', 'status', 'title'];
            let customComments = '/**';

            node.jsDoc?.forEach(jsDoc => {
              jsDoc?.tags?.forEach(tag => {
                const tagName = tag.tagName.getText();

                if (customTags.includes(tagName)) {
                  customComments += `\n * @${tagName} ${tag.comment}`;
                }
              });
            });

            // This is what allows us to map JSDOC comments to ReactWrappers.
            classDoc['jsDoc'] = node.jsDoc?.map(jsDoc => jsDoc.getFullText()).join('\n');

            const parsed = parse(`${customComments}\n */`);
            parsed[0].tags?.forEach(t => {
              switch (t.tag) {
                // Dependencies
                case 'dependency':
                  if (!Array.isArray(classDoc['dependencies'])) {
                    classDoc['dependencies'] = [];
                  }
                  classDoc['dependencies'].push(t.name);
                  break;

                // Value-only metadata tags
                case 'documentation':
                case 'since':
                case 'status':
                case 'title':
                  classDoc[t.tag] = t.name;
                  break;

                // All other tags
                default:
                  if (!Array.isArray(classDoc[t.tag])) {
                    classDoc[t.tag] = [];
                  }

                  classDoc[t.tag].push({
                    name: t.name,
                    description: t.description,
                    type: t.type || undefined,
                  });
              }
            });
          }
        }
      },
    },

    {
      name: 'wa-react-event-names',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);

            if (classDoc?.events) {
              classDoc.events.forEach(event => {
                if (!event.name) return;
                event.reactName = `on${pascalCase(event.name)}`;
                event.eventName = `${pascalCase(event.name)}Event`;
              });
            }
          }
        }
      },
    },

    {
      name: 'wa-translate-module-paths',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest?.modules?.forEach(mod => {
          //
          // CEM paths look like this:
          //
          //  src/components/button/button.ts
          //
          // But we want them to look like this:
          //
          //  components/button/button.js
          //
          const terms = [
            { from: /^src\//, to: '' }, // Strip the src/ prefix
            { from: /\.(t|j)sx?$/, to: '.js' }, // Convert .ts to .js
          ];

          mod.path = replace(mod.path, terms);

          for (const ex of mod.exports ?? []) {
            ex.declaration.module = replace(ex.declaration.module, terms);
          }

          for (const dec of mod.declarations ?? []) {
            if (dec.kind === 'class') {
              for (const member of dec.members ?? []) {
                if (member.inheritedFrom) {
                  member.inheritedFrom.module = replace(member.inheritedFrom.module, terms);
                }
              }
            }
          }
        });
      },
    },

    {
      name: 'wa-css-vars',
      packageLinkPhase({ customElementsManifest }) {
        const root = __dirname;

        // Known token scales we want to surface when any member is used
        const SPACE_SCALES = ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl'];
        const FONT_SIZE_SCALES = ['2xs', 'xs', 's', 'm', 'l', 'xl', '2xl'];
        const BORDER_RADIUS_SCALES = ['s', 'm', 'l', 'xl', '2xl', 'pill', 'circle'];
        const BORDER_WIDTH_SCALES = ['s', 'm', 'l'];
        const FONT_WEIGHT_SCALES = ['light', 'regular', 'normal', 'medium', 'semibold', 'bold', 'black'];
        const LINE_HEIGHT_SCALES = ['condensed', 'normal', 'expanded'];
        const TRANSITION_DURATION_SCALES = ['fast', 'normal', 'slow'];
        const FOCUS_RING_KEYS = ['style', 'width', 'offset'];

        /**
         * Given a CSS var name, returns an array of additional variants to include
         * when it belongs to a known scale family (spacing, font-size, etc.).
         */
        function expandScaleVariants(varName) {
          const expansions = [];
          // Expand spacing tokens: --wa-space-{scale}
          const mSpace = varName.match(/^--wa-space-(2xs|xs|s|m|l|xl|2xl)$/);
          if (mSpace) {
            const prefix = '--wa-space-';
            for (const s of SPACE_SCALES) {
              expansions.push(`${prefix}${s}`);
            }
          }
          // Expand font-size tokens: --wa-font-size-{scale}
          const mFont = varName.match(/^--wa-font-size-(2xs|xs|s|m|l|xl|2xl)$/);
          if (mFont) {
            const prefix = '--wa-font-size-';
            for (const s of FONT_SIZE_SCALES) {
              expansions.push(`${prefix}${s}`);
            }
          }
          // Expand border-radius tokens: --wa-border-radius-{scale|shape}
          const mRadius = varName.match(/^--wa-border-radius-(s|m|l|xl|2xl|pill|circle)$/);
          if (mRadius) {
            const prefix = '--wa-border-radius-';
            for (const s of BORDER_RADIUS_SCALES) {
              expansions.push(`${prefix}${s}`);
            }
          }
          // Expand border-width tokens: --wa-border-width-{scale}
          const mBorderW = varName.match(/^--wa-border-width-(s|m|l)$/);
          if (mBorderW) {
            const prefix = '--wa-border-width-';
            for (const s of BORDER_WIDTH_SCALES) {
              expansions.push(`${prefix}${s}`);
            }
          }
          // Expand font-weight tokens: --wa-font-weight-{weight}
          const mWeight = varName.match(/^--wa-font-weight-(light|regular|normal|medium|semibold|bold|black)$/);
          if (mWeight) {
            const prefix = '--wa-font-weight-';
            for (const s of FONT_WEIGHT_SCALES) {
              expansions.push(`${prefix}${s}`);
            }
          }
          // Expand line-height tokens: --wa-line-height-{scale}
          const mLineHeight = varName.match(/^--wa-line-height-(condensed|normal|expanded)$/);
          if (mLineHeight) {
            const prefix = '--wa-line-height-';
            for (const s of LINE_HEIGHT_SCALES) {
              expansions.push(`${prefix}${s}`);
            }
          }
          // Expand transition duration tokens: --wa-transition-{fast|normal|slow}
          const mTransitionDur = varName.match(/^--wa-transition-(fast|normal|slow)$/);
          if (mTransitionDur) {
            const prefix = '--wa-transition-';
            for (const s of TRANSITION_DURATION_SCALES) {
              expansions.push(`${prefix}${s}`);
            }
            // also ensure easing token is present as a companion
            expansions.push('--wa-transition-easing');
          }
          // If easing itself is referenced, include it (but no family)
          if (varName === '--wa-transition-easing') {
            expansions.push('--wa-transition-easing');
          }
          // Expand focus ring tokens: --wa-focus-ring[-style|-width|-offset]
          const mFocusRing = varName.match(/^--wa-focus-ring(?:-(style|width|offset))?$/);
          if (mFocusRing) {
            // include composite and parts
            expansions.push('--wa-focus-ring');
            for (const k of FOCUS_RING_KEYS) {
              expansions.push(`--wa-focus-ring-${k}`);
            }
          }
          return expansions;
        }

        customElementsManifest?.modules?.forEach(mod => {
          // Infer the source CSS file path for each component module
          // Module path looks like: components/button/button.js
          // We want: src/components/button/button.css
          const cssPath = path.join(root, 'src', mod.path.replace(/\.js$/, '.css'));
          let cssContent = '';
          try {
            if (fs.existsSync(cssPath)) {
              cssContent = fs.readFileSync(cssPath, 'utf8');
            }
          } catch (_) {
            // ignore
          }
          if (!cssContent) return;
          // Collect unique CSS custom property names
          const varMatches = Array.from(cssContent.matchAll(/--[a-zA-Z0-9_-]+/g)).map(m => m[0]);
          const unique = new Set(varMatches);

          // Add expanded variants for known scale families if any one is referenced
          for (const v of Array.from(unique)) {
            for (const ex of expandScaleVariants(v)) {
              unique.add(ex);
            }
          }

          const uniqueVars = Array.from(unique);
          if (uniqueVars.length === 0) return;
          for (const dec of mod.declarations ?? []) {
            if (dec.kind === 'class') {
              // Attach to CEM so IDE plugins can pick them up
              dec.cssProperties = uniqueVars.map(v => ({ name: v }));
            }
          }
        });
      }
    },

    // Generate custom VS Code data
    customElementVsCodePlugin({
      outdir,
      cssFileName: null,
      referencesTemplate: (_, tag) => [
        {
          name: 'Documentation',
          url: `https://webawesome.com/docs/components/${tag.replace('wa-', '')}`,
        },
      ],
    }),

    // Generate custom JetBrains data
    customElementJetBrainsPlugin({
      outdir: './dist-cdn',
      excludeCss: false,
      packageJson: false,
      referencesTemplate: (_, tag) => {
        return {
          name: 'Documentation',
          url: `https://webawesome.com/docs/components/${tag.replace('wa-', '')}`,
        };
      },
    }),

    // Generate JSX types (see https://wc-toolkit.com/integrations/jsx/)
    jsxTypesPlugin({
      fileName: 'custom-elements-jsx.d.ts',
      outdir,
      defaultExport: true,
      componentTypePath: (_name, _tag, modulePath) => {
        return `./${modulePath}`;
      },
    }),

    //
    // TODO - figure out why this broke when events were updated
    //
    // customElementVuejsPlugin({
    //   outdir: './dist/types/vue',
    //   fileName: 'index.d.ts',
    //   componentTypePath: (_, tag) => `../../components/${tag.replace('wa-', '')}/${tag.replace('wa-', '')}.js`
    // })
  ],
};
