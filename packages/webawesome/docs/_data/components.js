import componentList from './componentList.js';

export default Object.fromEntries(componentList.map(component => [component.slug, component]));
