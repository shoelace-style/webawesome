import { flatten } from '../../utilities/deep.js';
import type WaIcon from '../icon/icon.js';
import defaultLibrary from './library.default.js';
import type { IconLibrary, IconLibraryCache, IconLibraryFetched, UnregisteredIconLibrary } from './types.d.ts';

export type { IconLibrary, IconLibraryCache, IconLibraryFetched, UnregisteredIconLibrary } from './types.d.ts';

let registry: IconLibrary[] = [];
let watchedIcons: WaIcon[] = [];

registerIconLibrary(defaultLibrary);

/** Adds an icon to the list of watched icons. */
export function watchIcon(icon: WaIcon) {
  watchedIcons.push(icon);
}

/** Removes an icon from the list of watched icons. */
export function unwatchIcon(icon: WaIcon) {
  watchedIcons = watchedIcons.filter(el => el !== icon);
}

/** Returns a library from the registry. */
export function getIconLibrary(name?: string) {
  return registry.find(lib => lib.name === name);
}

/** Adds an icon library to the registry, or overrides an existing one. */
export function registerIconLibrary(library: UnregisteredIconLibrary) {
  unregisterIconLibrary(library.name);

  let registeredLibrary: IconLibrary = {
    ...library,
    fetched: {},
    addFetched(cache: IconLibraryFetched) {
      return addFetched.call(this, cache);
    },
  };

  if (library.fetched) {
    registeredLibrary.addFetched(library.fetched);
  }

  registry.push(registeredLibrary);

  // Redraw watched icons
  watchedIcons.forEach(icon => {
    if (icon.library === library.name) {
      icon.setIcon();
    }
  });
}

/**
 * Convert the deep family → variant → icon name → markup cache that is more convenient to provide
 * to the flat URL → markup cache that icon libraries use internally
 **/
function addFetched(this: IconLibrary | UnregisteredIconLibrary, cache: IconLibraryFetched) {
  let { resolver, getKey } = this;

  // Convert flat URL → markup cache to deep family → variant → icon name → markup cache
  let flatCache = flatten(cache, {
    getKey(path: string[]) {
      // name is always the last value no matter the depth
      let name = path.pop()!;
      let [family, variant] = path;
      let url = resolver(name, family, variant);
      let key = getKey?.(url) ?? url;
      return key;
    },
  }) as IconLibraryCache<0>;

  this.fetched ??= {};
  Object.assign(this.fetched, flatCache);
}

/** Removes an icon library from the registry. */
export function unregisterIconLibrary(name: string) {
  registry = registry.filter(lib => lib.name !== name);
}
