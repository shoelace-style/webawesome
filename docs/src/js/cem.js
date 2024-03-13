//
// Export it here so we can import it elsewhere and use the same version
//
import * as path from 'node:path';
import * as fs from 'node:fs';

// We make it a function to lazy evaluate for re-renders
export const customElementsManifest = () =>
  JSON.parse(fs.readFileSync(path.join(process.cwd(), '/../dist/custom-elements.json')), { encoding: 'utf-8' });

//
// Gets all components from custom-elements.json and returns them in a more documentation-friendly format.
//
export function getAllComponents() {
  const allComponents = [];

  customElementsManifest().modules?.forEach(module => {
    module.declarations?.forEach(declaration => {
      if (declaration.customElement) {
        // Generate the dist path based on the src path and attach it to the component
        declaration.path = module.path.replace(/^src\//, 'dist/').replace(/\.ts$/, '.js');

        // Remove members that are private or don't have a description
        const members = declaration.members?.filter(member => member.description && member.privacy !== 'private');
        const methods = members?.filter(prop => prop.kind === 'method' && prop.privacy !== 'private');
        const properties = members?.filter(prop => {
          // Look for a corresponding attribute
          const attribute = declaration.attributes?.find(attr => attr.fieldName === prop.name);
          if (attribute) {
            prop.attribute = attribute.name || attribute.fieldName;
          }

          return prop.kind === 'field' && prop.privacy !== 'private';
        });
        allComponents.push({
          ...declaration,
          methods,
          properties
        });
      }
    });
  });

  // Build dependency graphs
  allComponents.forEach(component => {
    const dependencies = [];

    // Recursively fetch sub-dependencies
    function getDependencies(tag) {
      const cmp = allComponents.find(c => c.tagName === tag);
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
  return allComponents.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

export function getComponent(tagName) {
  const allComponents = getAllComponents();
  const component = allComponents.find(c => c.tagName === tagName);
  if (!component) {
    throw new Error(
      `Unable to find a component called "${tagName}". Make sure the file name is the same as the component's tag ` +
        `name (minus the wa- prefix). ${allComponents}`
    );
  }

  component.hasSlots = Boolean(component.slots?.length);
  component.hasProperties = Boolean(component.properties?.length);
  component.hasEvents = Boolean(component.events?.length);
  component.hasMethods = Boolean(component.methods?.length);
  component.hasCssProperties = Boolean(component.cssProperties?.length);
  component.hasCssParts = Boolean(component.cssParts?.length);
  component.hasAnimations = Boolean(component.animations?.length);
  component.hasDependencies = Boolean(component.dependencies?.length);
  return component;
}

export function getComponentFromFileName(filename) {
  const { name } = path.parse(filename);
  const tagName = 'wa-' + name;
  return getComponent(tagName);
}
