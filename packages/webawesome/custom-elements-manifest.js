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
      excludeCss: true,
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
