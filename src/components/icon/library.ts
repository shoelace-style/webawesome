import { flatten } from '../../utilities/deep.js';
export const CACHEABLE_ERROR = Symbol('CACHEABLE_ERROR');
export const RETRYABLE_ERROR = Symbol('RETRYABLE_ERROR');

// 410: Gone
// NOTE: Resist the temptation to add 403 and 404 to this list.
// We may get them before a token is added, and we need to be able to retry.
export const CACHEABLE_HTTP_ERRORS = [410];

let parser: DOMParser;

const defaultFallback = function (name: string, family?: string, variant?: string): IconLocator | undefined {
  if (this.name !== 'wa') {
    return {
      name,
      family,
      variant,
      library: 'wa',
    };
  }

  return undefined;
};

export default class IconLibrary {
  /** The original object used to create this library */
  readonly spec: UnregisteredIconLibrary;

  readonly name: string;
  readonly mutator?: IconLibraryMutator;
  readonly system?: IconMapping;
  readonly spriteSheet?: boolean;
  readonly fallback?: IconMapping;

  /** Inlined markup, keyed by URL */
  inlined: IconLibraryCacheFlat = {};

  /** DOM nodes, keyed by URL */
  cache: Record<string, SVGElement | typeof CACHEABLE_ERROR | typeof RETRYABLE_ERROR> = {};

  constructor(library: UnregisteredIconLibrary) {
    // Store library definition
    this.spec = library;

    // Copy certain properties
    this.name = library.name;
    this.mutator = library.mutator;
    this.system = library.system;
    this.spriteSheet = library.spriteSheet;
    this.fallback = library.fallback ?? defaultFallback;

    if (library.inlined) {
      this.inline(library.inlined);
    }
  }

  /**
   * Convert an icon name, family, and variant into a URL
   */
  getUrl(name: string, family?: string, variant?: string): string {
    // console.warn('getUrl', name, family, variant);
    if (name.startsWith('system:')) {
      name = name.slice(7);

      if (this.system) {
        let resolved = this.system(name, family, variant);

        if (resolved) {
          name = resolved.name ?? name;
          family = resolved.family ?? family;
          variant = resolved.variant ?? variant;

          if (resolved.library && resolved.library !== this.name) {
            let library = IconLibrary.registry.get(resolved.library);

            if (library) {
              return library.getUrl(name, family, variant);
            }
          }
        }
      }
    }

    if (this.spec.getUrl) {
      return this.spec.getUrl(name, family, variant);
    }

    return name;
  }

  getCacheKey(url: string) {
    return this.spec.getCacheKey?.(url) ?? url;
  }

  /**
   * Fetch the markup for an icon as a string
   */
  getMarkup(url: string): IconFetchedResult | Promise<IconFetchedResult> {
    if (this.spriteSheet) {
      return `<svg><use part="use" href="${url}"></use></svg>`;
    }

    let cacheKey = this.getCacheKey(url);
    let markup = this.inlined[cacheKey];

    if (!markup) {
      return fetchIcon(url).then(markup => {
        if (typeof markup === 'string') {
          // TBD: Should we add to inlined? DOM nodes are cached anyway, perhaps that’s enough?
          //      Or perhaps we should go the other way and cache CACHEABLE_ERROR too?
          this.inlined[cacheKey] = markup;
        }

        return markup;
      });
    }

    return markup;
  }

  /**
   * Given a name, family, and variant, this function returns the resulting SVG element or an appropriate error symbol.
   * If the icon library defines fallbacks, they will be tried in order.
   */
  async getElement(
    name: string,
    family?: string,
    variant?: string,
  ): Promise<SVGElement | typeof CACHEABLE_ERROR | typeof RETRYABLE_ERROR> {
    let url = this.getUrl(name, family, variant);
    let cacheKey = this.getCacheKey(url);

    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    let markup = await this.getMarkup(url);
    let result;

    if (markup === CACHEABLE_ERROR || markup === RETRYABLE_ERROR) {
      result = markup;
    } else {
      result = await this.getElementFromMarkup(markup);
    }

    if (result === CACHEABLE_ERROR || result === RETRYABLE_ERROR) {
      if (this.spec.fallback) {
        // Try again with fallback
        let fallback = this.spec.fallback(name, family, variant);
        if (fallback) {
          let library: IconLibrary | undefined = this;

          if (fallback.library && fallback.library !== this.name) {
            library = IconLibrary.registry.get(fallback.library);
          }

          if (library) {
            return library.getElement(fallback.name, fallback.family, fallback.variant);
          }
        }
      }

      if (result === CACHEABLE_ERROR) {
        this.cache[cacheKey] = result;
      }
    }

    return result;
  }

  /**
   * Given a URL, this function synchronously returns the resulting SVG element or an appropriate error symbol.
   */
  getElementFromMarkup(markup: string): SVGElement | typeof CACHEABLE_ERROR | typeof RETRYABLE_ERROR {
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

    return svgEl ?? CACHEABLE_ERROR;
  }

  /**
   * Convert the deep family → variant → icon name → markup cache that is more convenient to write out manually
   * to the flat URL → markup cache that icon libraries use internally
   **/
  inline(cache: IconLibraryCacheDeep) {
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
          return this.getCacheKey(url!);
        },
      }) as IconLibraryCacheFlat;
    }

    Object.assign(this.inlined, flatCache);
  }

  /**
   * Create a clone of this library, optionally overriding some of its properties.
   */
  extend(library: Partial<UnregisteredIconLibrary> = {}) {
    return new IconLibrary({ ...this.spec, ...library });
  }

  static registry = new Map<string, IconLibrary>();
}

export type IconLibraryResolver = (name: string, family?: string, variant?: string) => string;
export type IconLocator = { name: string; family?: string; variant?: string; library?: string };
export type IconMapping = (name: string, family?: string, variant?: string) => IconLocator | undefined;
export type IconLibraryGetKey = (name: string) => string;
export type IconLibraryMutator = (svg: SVGElement) => void;
export type IconFetchedResult = string | typeof CACHEABLE_ERROR | typeof RETRYABLE_ERROR;

export type IconLibraryCacheFlat = Record<string, string>;
export type IconLibraryCacheDeep =
  | IconLibraryCacheFlat
  | Record<string, IconLibraryCacheFlat>
  | Record<string, Record<string, IconLibraryCacheFlat>>;

export interface UnregisteredIconLibrary {
  name: string;
  getUrl?: IconLibraryResolver;
  system?: IconMapping;
  fallback?: IconMapping;
  mutator?: IconLibraryMutator;
  getCacheKey?: IconLibraryGetKey;
  spriteSheet?: boolean;

  // Max depth: family → variant → icon name → markup
  // but may be shallower for libraries that don't use variants or families
  inlined?: IconLibraryCacheDeep;
}

export async function fetchIcon(url: string) {
  try {
    let fileData = await fetch(url, { mode: 'cors' });

    if (!fileData.ok) {
      return CACHEABLE_HTTP_ERRORS.includes(fileData.status) ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    }

    return fileData.text();
  } catch (e) {
    return RETRYABLE_ERROR;
  }
}
