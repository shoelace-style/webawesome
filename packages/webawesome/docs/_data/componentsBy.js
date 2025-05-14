import components from './components.js';

const by = {
  attribute: {},
  slot: {},
  event: {},
  method: {},
  cssPart: {},
  cssProperty: {},
};

function getAll(component, type) {
  let prop = type + 's';
  if (type === 'cssProperty') {
    prop = 'cssProperties';
  }

  return component[prop] ?? [];
}

for (const componentName in components) {
  const component = components[componentName];

  for (const type of ['attribute', 'slot', 'event', 'method', 'cssPart', 'cssProperty']) {
    for (const item of getAll(component, type)) {
      by[type][item.name] ??= [];
      by[type][item.name].push(component);
    }
  }
}

// Sort by descending number of components
const sortByLengthDesc = (a, b) => b[1].length - a[1].length;

for (const key in by) {
  by[key] = sortObject(by[key], sortByLengthDesc);
}

export default by;

function sortObject(obj, sorter) {
  return Object.fromEntries(Object.entries(obj).sort(sorter));
}
