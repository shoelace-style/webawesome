import type WaIcon from './icon.js';
import defaultLibrary from './library.default.js';
import IconLibrary, {
  CACHEABLE_ERROR,
  RETRYABLE_ERROR,
  fetchIcon,
  type IconFetchedResult,
  type IconLibraryCacheDeep,
  type IconLibraryCacheFlat,
  type UnregisteredIconLibrary,
} from './library.js';

export { CACHEABLE_ERROR, RETRYABLE_ERROR, fetchIcon };
export type { IconFetchedResult, IconLibrary, IconLibraryCacheDeep, IconLibraryCacheFlat, UnregisteredIconLibrary };

let registry: IconLibrary[] = [];
let watchedIcons: WaIcon[] = [];

registerIconLibrary(defaultLibrary);
registerIconLibrary({ name: 'custom' });

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

  let registeredLibrary = new IconLibrary(library);

  registry.push(registeredLibrary);

  // Redraw watched icons
  watchedIcons.forEach(icon => {
    if (icon.library === library.name) {
      icon.setIcon();
    }
  });
}

/** Removes an icon library from the registry. */
export function unregisterIconLibrary(name: string) {
  registry = registry.filter(lib => lib.name !== name);
}
