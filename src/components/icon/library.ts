import { deepEntries } from '../../utilities/deep.js';
import type WaIcon from '../icon/icon.js';
import defaultLibrary from './library.default.js';
import type { IconLibrary, IconLibraryCache, IconLibraryResolver, UnregisteredIconLibrary } from './types.d.ts';

export type { IconLibrary, IconLibraryCache, UnregisteredIconLibrary } from './types.d.ts';

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
    fetched: flattenIconLibraryCache(options.resolver, options.fetched),
    addFetched(cache: IconLibraryCache<1, 3>) {
      // Convert flat URL → markup cache to deep family → variant → icon name → markup cache
      let flatCache = flattenIconLibraryCache(this.resolver, cache);
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

/** Convert deep family → variant → icon name → markup cache to flat URL → markup cache */
function flattenIconLibraryCache(resolver: IconLibraryResolver, cache?: IconLibraryCache<1, 3>): IconLibraryCache<1> {
  if (!cache) {
    return {};
  }

  return Object.fromEntries(
    deepEntries(cache, {
      transformPath: (path: string[]) => {
        let name = path.pop()!;
        let [family, variant] = path;
        return [resolver(name, family, variant)];
      },
    }),
  );
}

/** Removes an icon library from the registry. */
export function unregisterIconLibrary(name: string) {
  registry = registry.filter(lib => lib.name !== name);
}
