/** Gets an array of components from a CEM object. */
export function getAllComponents(metadata) {
  const allComponents = [];

  metadata.modules.map(module => {
    module.declarations?.map(declaration => {
      if (declaration.customElement) {
        const component = declaration;
        const path = module.path;

        if (component) {
          // Calling `new Event()` adds a blank entry into the CEM, so we'll filter them out here
          if (component.events) {
            component.events = component.events.filter(event => {
              return event.name ? true : false;
            });
          }

          // component.events = component.events.filter(event => !!event.name);
          allComponents.push(Object.assign(component, { path }));
        }
      }
    });
  });

  return allComponents;
}
