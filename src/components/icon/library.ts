import { flatten } from '../../utilities/deep.js';
import type WaIcon from '../icon/icon.js';
import defaultLibrary from './library.default.js';
import type {
  IconLibrary,
  IconLibraryCache,
  IconLibraryFetched,
  IconLibraryResolver,
  UnregisteredIconLibrary,
} from './types.d.ts';

export type { IconLibrary, IconLibraryCache, IconLibraryFetched, UnregisteredIconLibrary } from './types.d.ts';

let registry: IconLibrary[] = [];
let watchedIcons: WaIcon[] = [];

registerIconLibrary('default', defaultLibrary);

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
export function registerIconLibrary(name: string, options: UnregisteredIconLibrary) {
  unregisterIconLibrary(name);

  registry.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator,
    spriteSheet: options.spriteSheet,
    fetched: options.fetched ? flattenIconLibraryCache(options.fetched, options.resolver) : {},
    addFetched(cache: IconLibraryFetched) {
      // Convert flat URL → markup cache to deep family → variant → icon name → markup cache
      let flatCache = flattenIconLibraryCache(cache, this.resolver);
      this.fetched ??= {};
      Object.assign(this.fetched, flatCache);
    },
  });

  // Redraw watched icons
  watchedIcons.forEach(icon => {
    if (icon.library === name) {
      icon.setIcon();
    }
  });
}

/**
 * Convert the deep family → variant → icon name → markup cache that is more convenient to provide
 * to the flat URL → markup cache that icon libraries use internally
 **/
function flattenIconLibraryCache(cache: IconLibraryFetched, resolver: IconLibraryResolver): IconLibraryCache<0> {
  return flatten(cache, {
    getKey(path: string[]) {
      // name is always the last value no matter the depth
      let name = path.pop()!;
      let [family, variant] = path;
      return resolver(name, family, variant);
    },
  }) as IconLibraryCache<0>;
}

/** Removes an icon library from the registry. */
export function unregisterIconLibrary(name: string) {
  registry = registry.filter(lib => lib.name !== name);
}
