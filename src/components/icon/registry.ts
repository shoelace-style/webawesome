import type WaIcon from './icon.js';
import IconLibrary, {
  CACHEABLE_ERROR,
  RETRYABLE_ERROR,
  fetchIcon,
  type IconFetchedResult,
  type IconLibraryCacheDeep,
  type IconLibraryCacheFlat,
  type UnregisteredIconLibrary,
} from './library.js';
import waDefaultLibrary from './library.wa.js';

export { CACHEABLE_ERROR, RETRYABLE_ERROR, fetchIcon };
export type { IconFetchedResult, IconLibrary, IconLibraryCacheDeep, IconLibraryCacheFlat, UnregisteredIconLibrary };

let registry = IconLibrary.registry;
let watchedIcons: WaIcon[] = [];

registerIconLibrary(waDefaultLibrary);
registerIconLibrary('default', waDefaultLibrary);
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
  return name ? registry.get(name) : undefined;
}

/**
 * Adds an icon library to the registry, or overrides an existing one.
 * Optionally accepts a name argument, which will override the library's built-in name, allowing you to register aliases.
 */
export function registerIconLibrary(name: string, library: UnregisteredIconLibrary | IconLibrary): IconLibrary;
export function registerIconLibrary(library: UnregisteredIconLibrary | IconLibrary): IconLibrary;
export function registerIconLibrary(
  nameOrLibrary: string | UnregisteredIconLibrary | IconLibrary,
  library?: UnregisteredIconLibrary | IconLibrary,
) {
  let name;
  if (typeof nameOrLibrary === 'string') {
    name = nameOrLibrary;
  } else {
    library = nameOrLibrary;
  }

  if (!library) {
    throw new Error('No library provided');
  }

  let instance = library instanceof IconLibrary ? library : new IconLibrary(library);

  if (name) {
    instance = instance.extend({ name });
  }

  registry.set(instance.name, instance);

  // Redraw watched icons
  watchedIcons.forEach(icon => {
    if (icon.library === library.name) {
      icon.setIcon();
    }
  });

  return instance;
}

/** Removes an icon library from the registry. */
export function unregisterIconLibrary(name: string) {
  registry.delete(name);
}
