export type IconLibraryResolver = (name: string, family: string, variant: string) => string;
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
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
  spriteSheet?: boolean;

  // Max depth: family → variant → icon name → markup
  // but may be shallower for libraries that don't use variants or families
  fetched?: IconLibraryFetched;
}

// Registered icon library
export interface IconLibrary {
  name: string;
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
  spriteSheet?: boolean;

  // One level only: URL → markup
  fetched?: IconLibraryCache<0>;
  addFetched: (cache: IconLibraryFetched) => void;
}
