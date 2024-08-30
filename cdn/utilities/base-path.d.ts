/** Sets the library's base path to the specified directory or URL. */
export declare function setBasePath(path: string): void;
/**
 * Gets the library's base path.
 *
 * The base path is used to load assets such as icons and images, so it needs to be set for components to work properly.
 * By default, this script will look for a script ending in webawesome.js or webawesome.loader.js and set the base path
 * to the directory that contains that file. To override this behavior, you can add the data-webawesome attribute to any
 * element on the page to point to a local path or a CORS-enabled endpoint, such as a CDN.
 *
 *   <script src="bundle.js" data-webawesome="/custom/base/path"></script>
 *
 * Alternatively, you can set the base path manually using the exported setBasePath() function.
 *
 * @param subpath - An optional path to append to the base path.
 */
export declare function getBasePath(subpath?: string): string;
/** Sets the library's Web Awesome kit code. */
export declare function setKitCode(code: string): void;
/**
 * Gets the library's Web Awesome kit code.
 *
 * The kit code is used to fetch premium assets, so it needs to be set for certain components to work correctly. This
 * isn't something we can infer, so the user will need to provide it using the `data-fa-kit-code` attribute. This can
 * be on any element, but ideally it should exist on the script that imports Web Awesome.
 *
 *   <script src="bundle.js" data-fa-kit-code="abc123"></script>
 *
 * Alternatively, you can set the kit code manually using the exported `setKitCode()` function.
 *
 */
export declare function getKitCode(): string;
