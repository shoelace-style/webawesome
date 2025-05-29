/**
 * @module components Fetches components from custom-elements.json and exposes them in a saner format.
 */
import { readFileSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const customElementsJSON = process.env.DIST_DIR
  ? join(process.env.DIST_DIR, "custom-elements.json")
  : resolve(__dirname, '../../dist/custom-elements.json')

const manifest = JSON.parse(readFileSync(customElementsJSON), 'utf-8');

const components = manifest.modules.flatMap(module => {
  return module.declarations
    .filter(c => c?.customElement)
    .map(declaration => {
      // Generate the dist path based on the src path and attach it to the component
      declaration.path = module.path.replace(/^src\//, 'dist/').replace(/\.ts$/, '.js');

      // Remove private members and those that lack a description
      const members = declaration.members?.filter(member => member.description && member.privacy !== 'private');

      const methods = members?.filter(prop => prop.kind === 'method' && prop.privacy !== 'private');
      const attributes = declaration.attributes ?? [];
      const properties = members?.filter(prop => {
        // Look for a corresponding attribute
        const attribute = attributes?.find(attr => attr.fieldName === prop.name);
        if (attribute) {
          prop.attribute = attribute.name || attribute.fieldName;
        }

        return prop.kind === 'field' && prop.privacy !== 'private';
      });

      return {
        ...declaration,
        slug: declaration.tagName.replace(/^wa-/, ''),
        methods,
        attributes,
        properties,
      };
    });
});

// Build dependency graphs
components.forEach(component => {
  const dependencies = [];

  // Recursively fetch sub-dependencies
  function getDependencies(tag) {
    const cmp = components.find(c => c.tagName === tag);
    if (!cmp || !Array.isArray(component.dependencies)) {
      return;
    }

    cmp.dependencies?.forEach(dependentTag => {
      if (!dependencies.includes(dependentTag)) {
        dependencies.push(dependentTag);
      }
      getDependencies(dependentTag);
    });
  }

  getDependencies(component.tagName);

  component.dependencies = dependencies.sort();
});

// Sort by name
components.sort((a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});

export default components;

