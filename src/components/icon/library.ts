import { flatten } from '../../utilities/deep.js';
export const CACHEABLE_ERROR = Symbol('CACHEABLE_ERROR');
export const RETRYABLE_ERROR = Symbol('RETRYABLE_ERROR');

// 410: Gone
export const CACHEABLE_HTTP_ERRORS = [403, 404, 410];

let parser: DOMParser;

export default class IconLibrary {
  /** The original object used to create this library */
  private spec: UnregisteredIconLibrary;

  readonly name: string;
  readonly mutator?: IconLibraryMutator;
  readonly getKey?: IconLibraryGetKey;
  readonly system?: IconLibrarySystemResolver;
  readonly spriteSheet?: boolean;

  /** Inlined markup, keyed by URL */
  inlined: IconLibraryCache<0> = {};

  /** DOM nodes, keyed by URL */
  elements: Record<string, SVGElement | typeof CACHEABLE_ERROR | typeof RETRYABLE_ERROR> = {};

  constructor(library: UnregisteredIconLibrary) {
    // Store library definition
    this.spec = library;

    // Copy certain properties
    this.name = library.name;
    this.mutator = library.mutator;
    this.getKey = library.getKey;
    this.system = library.system;
    this.spriteSheet = library.spriteSheet;

    if (library.inlined) {
      this.inline(library.inlined);
    }
  }

  /**
   * Convert an icon name, family, and variant into a URL
   */
  getUrl(name: string, family: string, variant: string) {
    if (name.startsWith('system:')) {
      name = name.slice(7);

      if (this.system) {
        let resolved = this.system(name, family, variant);
        name = resolved.name ?? name;
        family = resolved.family ?? family;
        variant = resolved.variant ?? variant;
      }
    }

    return this.spec.getUrl?.(name, family, variant);
  }

  /**
   * Fetch the markup for an icon as a string
   */
  getMarkup(url: string): IconFetchedResult | Promise<IconFetchedResult> {
    if (this.spriteSheet) {
      return `<svg><use part="use" href="${url}"></use></svg>`;
    }

    let cacheKey = this.getKey?.(url) ?? url;
    let markup: string | typeof CACHEABLE_ERROR | undefined = this.inlined?.[cacheKey];

    if (!markup) {
      return fetchIcon(url).then(markup => {
        if (typeof markup === 'string' || markup === CACHEABLE_ERROR) {
          this.inlined[cacheKey] = markup;
        }

        return markup;
      });
    }

    return markup;
  }

  /**
   * Given a URL, this function returns the resulting SVG element or an appropriate error symbol.
   */
  async getElement(url: string): Promise<SVGElement | typeof CACHEABLE_ERROR | typeof RETRYABLE_ERROR> {
    if (this.elements[url]) {
      return this.elements[url];
    }

    let markup = await this.getMarkup(url);

    if (markup === CACHEABLE_ERROR || markup === RETRYABLE_ERROR) {
      return markup;
    }

    let svgEl;
    try {
      const div = document.createElement('div');

      div.innerHTML = markup;

      const svg = div.firstElementChild;

      if (svg?.tagName?.toLowerCase() === 'svg') {
        parser ??= new DOMParser();
        const doc = parser.parseFromString(svg.outerHTML, 'text/html');

        svgEl = doc.body.querySelector('svg');

        if (svgEl) {
          svgEl.part.add('svg');
          svgEl = document.adoptNode(svgEl);

          // Cache mutations
          if (this.mutator) {
            this.mutator(svgEl);
          }
        }
      }
    } catch {}

    const result = svgEl ?? CACHEABLE_ERROR;
    this.elements[url] = result;
    return result;
  }

  fallback(url: string) {
    // TODO implement this
  }

  /**
   * Convert the deep family → variant → icon name → markup cache that is more convenient to write out manually
   * to the flat URL → markup cache that icon libraries use internally
   **/
  inline(cache: IconLibraryFetched) {
    // If no getUrl function was provided, this library does not use names,
    // so this should already be a flat URL → markup mapping
    let flatCache = cache;

    if (this.spec.getUrl) {
      // Convert deep family → variant → icon name → markup cache that is easier to write
      // to the flat URL → markup cache that we use internally
      flatCache = flatten(cache, {
        getKey: (path: (keyof any)[]) => {
          // name is always the last value no matter the depth
          let name = path.pop()!;
          let [family, variant] = path;
          let url = this.getUrl(name as string, family as string, variant as string);
          let key = this.getKey?.(url!) ?? url;
          return key as string;
        },
      }) as IconLibraryCache<0>;
    }

    Object.assign(this.inlined, flatCache);
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
export type IconFetchedResult = string | typeof CACHEABLE_ERROR | typeof RETRYABLE_ERROR;

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
  N extends 0 ? string | typeof CACHEABLE_ERROR : IconLibraryCache<Decrement[N]>
>;

export type IconLibraryFetched = IconLibraryCache<0> | IconLibraryCache<1> | IconLibraryCache<2>;

export interface UnregisteredIconLibrary {
  name: string;
  getUrl?: IconLibraryResolver;
  system?: IconLibrarySystemResolver;
  mutator?: IconLibraryMutator;
  getKey?: IconLibraryGetKey;
  spriteSheet?: boolean;

  // Max depth: family → variant → icon name → markup
  // but may be shallower for libraries that don't use variants or families
  inlined?: IconLibraryFetched;
}

export async function fetchIcon(url: string) {
  try {
    let fileData = await fetch(url, { mode: 'cors' });

    if (!fileData.ok) {
      return CACHEABLE_HTTP_ERRORS.includes(fileData.status) ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    }

    return fileData.text();
  } catch {
    return RETRYABLE_ERROR;
  }
}
