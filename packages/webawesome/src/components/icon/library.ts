import type WaIcon from '../icon/icon.js';
import { setDefaultIconFamilyAndVariant } from './library.config.js';
import defaultLibrary from './library.default.js';
import systemLibrary from './library.system.js';

export type IconLibraryHostElement = WaIcon;
export type IconLibraryResolver = (
  name: string,
  family: string,
  variant: string,
  autoWidth: boolean,
) => string | Promise<string>;
export type IconLibraryMutator = (svg: SVGElement, hostElement?: IconLibraryHostElement) => void;
export interface IconLibrary {
  name: string;
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
  spriteSheet?: boolean;
}

let registry: IconLibrary[] = [defaultLibrary, systemLibrary];
let watchedIcons: Set<WaIcon> = new Set();

/** Adds an icon to the list of watched icons. */
export function watchIcon(icon: WaIcon) {
  watchedIcons.add(icon);
}

/** Removes an icon from the list of watched icons. */
export function unwatchIcon(icon: WaIcon) {
  watchedIcons.delete(icon);
}

/** Returns a library from the registry. */
export function getIconLibrary(name?: string) {
  return registry.find(lib => lib.name === name);
}

/** Adds an icon library to the registry, or overrides an existing one. */
export function registerIconLibrary(name: string, options: Omit<IconLibrary, 'name'>) {
  unregisterIconLibrary(name);
  registry.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator,
    spriteSheet: options.spriteSheet,
  });

  // Redraw watched icons
  watchedIcons.forEach(icon => {
    if (icon.library === name) {
      icon.setIcon();
    }
  });
}

/** Removes an icon library from the registry. */
export function unregisterIconLibrary(name: string) {
  registry = registry.filter(lib => lib.name !== name);
}

export { getDefaultIconFamily, getDefaultIconVariant } from './library.config.js';

/**
 * Sets the default icon family and, optionally, the default variant. These apply to icons that don't specify their own
 * `family` or `variant`, including the system icons used inside components. When `variant` is omitted, the current
 * default variant is kept. The defaults can also be set with `data-fa-family` and `data-fa-variant` attributes.
 */
export function setDefaultIconFamily(family: string, variant?: string) {
  setDefaultIconFamilyAndVariant(family, variant);

  // Update watched icons
  watchedIcons.forEach(icon => icon.setIcon());
}
