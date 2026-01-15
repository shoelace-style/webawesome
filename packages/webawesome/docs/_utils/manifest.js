import { readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * @returns Fetches components from custom-elements.json and returns them in more sane format.
 */
export function getComponents() {
  const distDir = process.env.UNBUNDLED_DIST_DIRECTORY || resolve(__dirname, '../../dist');
  const manifest = JSON.parse(readFileSync(join(distDir, 'custom-elements.json'), 'utf-8'));
  const components = [];

  const sortByName = (a, b) => (a.name || '').localeCompare(b.name || '');
  manifest.modules?.forEach(module => {
    module.declarations?.forEach(declaration => {
      if (declaration.customElement) {
        // Generate the dist path based on the src path and attach it to the component
        declaration.path = module.path.replace(/^src\//, 'dist/').replace(/\.ts$/, '.js');

        // Remove private members and those that lack a description
        const slots = declaration.slots?.sort(sortByName);
        const events = declaration.events?.sort(sortByName);
        const cssProperties = declaration.cssProperties?.sort(sortByName);
        const cssParts = declaration.cssParts?.sort(sortByName);
        const cssStates = declaration.cssStates?.sort(sortByName);
        const dependencies = declaration.dependencies?.sort((a, b) => a.localeCompare(b));

        const members = declaration.members
          ?.filter(member => member.description && member.privacy !== 'private')
          ?.sort(sortByName);
        const methods = members?.filter(prop => prop.kind === 'method' && prop.privacy !== 'private');
        const properties = members?.filter(prop => {
          // Look for a corresponding attribute
          const attribute = declaration.attributes?.find(attr => attr.fieldName === prop.name);
          if (attribute) {
            prop.attribute = attribute.name || attribute.fieldName;
          }

          return prop.kind === 'field' && prop.privacy !== 'private';
        });
        components.push({
          ...declaration,
          slots,
          events,
          cssProperties,
          cssStates,
          cssParts,
          dependencies,
          methods,
          properties,
        });
      }
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
  return components.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}
