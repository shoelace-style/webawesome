import "@lit-labs/ssr-client/lit-element-hydrate-support.js"
import { discover } from './webawesome.js';

discover(document.body);

export * from './webawesome.js';
