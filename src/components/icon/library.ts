import { flatten } from '../../utilities/deep.js';

export default class IconLibrary {
  name: string;
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
  getKey?: IconLibraryGetKey;
  spriteSheet?: boolean;

  // One level only: URL → markup
  fetched: IconLibraryCache<0> = {};

  spec: UnregisteredIconLibrary;

  constructor(library: UnregisteredIconLibrary) {
    // Store library definition
    this.spec = library;

    // Copy certain properties
    this.name = library.name;
    this.mutator = library.mutator;
    this.getKey = library.getKey;
    this.spriteSheet = library.spriteSheet;

    if (library.fetched) {
      this.addFetched(library.fetched);
    }
  }

  getURL(name: string, family: string, variant: string) {
    if (name.startsWith('system:')) {
      name = name.slice(7);

      if (this.spec.system) {
        let resolved = this.spec.system(name, family, variant);
        name = resolved.name ?? name;
        family = resolved.family ?? family;
        variant = resolved.variant ?? variant;
      }
    }

    return this.spec.resolver(name, family, variant);
  }

  /**
   * Convert the deep family → variant → icon name → markup cache that is more convenient to provide
   * to the flat URL → markup cache that icon libraries use internally
   **/
  addFetched(cache: IconLibraryFetched) {
    // Convert flat URL → markup cache to deep family → variant → icon name → markup cache
    let flatCache = flatten(cache, {
      getKey: (path: string[]) => {
        // name is always the last value no matter the depth
        let name = path.pop()!;
        let [family, variant] = path;
        let url = this.getURL(name, family, variant);
        let key = this.getKey?.(url) ?? url;
        return key;
      },
    });

    Object.assign(this.fetched, flatCache);
  }
}

export type IconLibraryResolver = (name: string, family: string, variant: string) => string;
export type IconLibrarySystemResolver = (
  name: string,
  family: string,
  variant: string,
) => { name: string; family?: string; variant?: string };
export type IconLibraryGetKey = (name: string) => string;
export type IconLibraryMutator = (svg: SVGElement) => void;

// This is a utility for decrementing a number up to 3 by one
// e.g., Decrement[3] yields 2
type Decrement = [never, 0, 1, 2];

/**
 * Record of string → string or nested string → Record<string, ...>
 * The number indicates how many params we have; none (0), just family (1), or family and style (2).
 * IconLibraryCache<0> is Record<string, string> (name → markup)
 * IconLibraryCache<1> is Record<string, Record<string, string>> (family → name → markup)
 * IconLibraryCache<2> is Record<string, Record<string, Record<string, string>>> (family → variant → name → markup)
 */
export type IconLibraryCache<N extends number = 0> = Record<
  string,
  N extends 0 ? string : IconLibraryCache<Decrement[N]>
>;

export type IconLibraryFetched = IconLibraryCache<0> | IconLibraryCache<1> | IconLibraryCache<2>;

export interface UnregisteredIconLibrary {
  name: string;
  resolver: IconLibraryResolver;
  system?: IconLibrarySystemResolver;
  mutator?: IconLibraryMutator;
  getKey?: IconLibraryGetKey;
  spriteSheet?: boolean;

  // Max depth: family → variant → icon name → markup
  // but may be shallower for libraries that don't use variants or families
  fetched?: IconLibraryFetched;
}
