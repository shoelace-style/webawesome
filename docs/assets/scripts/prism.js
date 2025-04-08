globalThis.Prism = globalThis.Prism || {};
globalThis.Prism.manual = true;

await import('./prism-downloaded.js');

Prism.plugins.customClass.prefix('code-');

export default Prism;
