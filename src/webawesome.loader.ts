import { startLoader } from './webawesome.js';

export * from './webawesome.js';

startLoader();

// Remove the `wa-reduce-fouce` class from all elements that have it after the autoloader finishes discovering the page
// OR two seconds. This helps reduce FOUCE by letting users opt in to hiding containers (or the entire page) until the
// components are ready.
Promise.race([
  new Promise(resolve => document.addEventListener('wa-discovery-complete', resolve)),
  new Promise(resolve => setTimeout(resolve, 2000)),
]).then(() => {
  document.querySelectorAll('.wa-reduce-fouce').forEach(el => {
    el.classList.remove('wa-reduce-fouce');
  });
});
