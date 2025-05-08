let basePath = '';

/** Sets the library's base path to the specified directory or URL. */
export function setBasePath(path: string) {
  basePath = path;
}

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
export function getBasePath(subpath = '') {
  if (!basePath) {
    // If we haven't set the base path yet, let's set it now
    const el = document.querySelector('[data-webawesome]');

    if (el?.hasAttribute('data-webawesome')) {
      // Use data-webawesome
      const rootRelativeUrl = new URL(el.getAttribute('data-webawesome') ?? '', window.location.href).pathname;
      setBasePath(rootRelativeUrl);
    } else {
      // Look for webawesome.js or webawesome.loader.js
      const scripts = [...document.getElementsByTagName('script')] as HTMLScriptElement[];
      const waScript = scripts.find(
        script =>
          script.src.endsWith('webawesome.js') ||
          script.src.endsWith('webawesome.loader.js') ||
          script.src.endsWith('webawesome.ssr-loader.js'),
      );

      if (waScript) {
        const path = String(waScript.getAttribute('src'));
        setBasePath(path.split('/').slice(0, -1).join('/'));
      }
    }
  }

  // Return the base path without a trailing slash. If one exists, append the subpath separated by a slash.
  return basePath.replace(/\/$/, '') + (subpath ? `/${subpath.replace(/^\//, '')}` : ``);
}
