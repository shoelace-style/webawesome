interface AllDefinedOptions {
  /**
   * A callback that accepts a custom element tag name and returns `true` if the custom element should be defined before
   * resolving or `false` to skip it. The tag name is always in lowercase.
   */
  match: (tagName: string) => boolean;

  /**
   * To wait for additional custom elements that may not be on the page when the function is called, provide them here.
   */
  additionalElements: string | string[];

  /**
   * The root in which to look for custom elements. Defaults to `document`. By design, shadow roots are not traversed,
   * but you can call this function and set `root` to a custom element's shadow root if needed.
   */
  root: Document | ShadowRoot;

  /**
   * The maximum time to wait in milliseconds. When it expires, a warning listing the elements that were never defined
   * is logged and the promise resolves anyway. Defaults to `2000`. Set to `Infinity` to wait indefinitely.
   */
  timeout: number;
}

/**
 * Waits for custom elements that are currently on the page to be registered before resolving. This is sugar for
 * awaiting `customElements.whenDefined()` multiple times. By default, the function waits for all undefined Web Awesome
 * elements, but you can pass a custom match function to wait for other custom elements instead.
 *
 * The function returns with `Promise.all()`, so any loading errors will cause it to reject. Make sure you handle errors
 * accordingly using a try/catch block or a `.catch()`.
 *
 * @example
 * // Wait for Web Awesome elements
 * await allDefined();
 *
 * // Wait for all custom elements that start with `foo-` as well as the `<bar-button>` element
 * await allDefined({
 *   match: tagName => tagName.startsWith('foo-'),
 *   additionalElements: ['bar-button', 'baz-dialog']
 * });
 */
export async function allDefined(options?: Partial<AllDefinedOptions>) {
  const opts: AllDefinedOptions = {
    match: tagName => tagName.startsWith('wa-'),
    additionalElements: [],
    root: document,
    timeout: 2000,
    ...options,
  };

  // Ensure additional elements is an array
  const additionalElements = Array.isArray(opts.additionalElements)
    ? opts.additionalElements
    : [opts.additionalElements];

  // Discover undefined elements in the document
  const undefinedElements = [...opts.root.querySelectorAll(':not(:defined)')]
    .map(el => el.localName)
    .filter((tag, index, arr) => arr.indexOf(tag) === index) // make it unique
    .filter(tag => opts.match(tag)); // make sure it matches

  const tagsToAwait = [...undefinedElements, ...additionalElements];

  // Wait for all to be registered, but don't let an element that's never registered hang forever
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timedOut = new Promise<void>(resolve => {
    if (opts.timeout === Infinity) return;
    timer = setTimeout(() => {
      const pending = tagsToAwait.filter(tag => !customElements.get(tag));
      console.warn(`allDefined() timed out after ${opts.timeout}ms waiting for: ${pending.join(', ')}`);
      resolve();
    }, opts.timeout);
  });

  try {
    await Promise.race([Promise.all(tagsToAwait.map(tag => customElements.whenDefined(tag))), timedOut]);
  } finally {
    clearTimeout(timer);
  }

  // Wait a cycle for the first update
  await new Promise(requestAnimationFrame);
}
