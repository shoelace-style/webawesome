export type IconLibraryResolver = (name: string, family: string, variant: string) => string;
export type IconLibraryMutator = (svg: SVGElement) => void;

// This is a utility for decrementing a number up to 3 by one
// e.g., Decrement[3] yields 2
type Decrement = [never, 0, 1, 2];

// Record of string → string or nested Record<string, up to (Min, Max) levels deep>
export type IconLibraryCache<Min extends number = 1, Max extends number = Min> = Min extends 0
  ? string | (Max extends 0 ? never : Record<string, IconLibraryCache<0, Decrement[Max]>>)
  : Record<string, IconLibraryCache<Decrement[Min], Max>>;

export interface UnregisteredIconLibrary {
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
  spriteSheet?: boolean;

  // Max depth: family → variant → icon name → markup
  // but may be shallower for libraries that don't use variants or families
  fetched?: IconLibraryCache<1, 3>;
}

// Registered icon library
export interface IconLibrary {
  name: string;
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
  spriteSheet?: boolean;

  // One level only: URL → markup
  fetched?: IconLibraryCache<1>;
  addFetched: (cache: IconLibraryCache<1, 3>) => void;
}
