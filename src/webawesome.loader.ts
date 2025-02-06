import { startLoader } from './webawesome.js';

export * from './webawesome.js';

startLoader();

// Remove the `wa-cloak` class from all elements that have it after the autoloader finishes discovering the page OR two
// seconds. This helps reduce FOUCE by letting users opt in to hiding containers (or the entire page) until the
// components are ready.
Promise.race([
  new Promise(resolve => document.addEventListener('wa-discovery-complete', resolve)),
  new Promise(resolve => setTimeout(resolve, 2000)),
]).then(async () => {
  // Wait a cycle for updates to complete
  await new Promise(requestAnimationFrame);

  document.querySelectorAll('.wa-cloak').forEach(el => {
    el.classList.remove('wa-cloak');
  });
});
