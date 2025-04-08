import { startLoader } from './webawesome.js';

export * from './webawesome.js';

startLoader();

// Remove `wa-cloak` when the autoloader finishes OR after two seconds. This prevents the entire screen from flashing
// when unregistered components get added later on.
Promise.race([
  new Promise(resolve => document.addEventListener('wa-discovery-complete', resolve)),
  new Promise(resolve => setTimeout(resolve, 2000)),
]).then(() => {
  document.querySelectorAll('.wa-cloak').forEach(el => el.classList.remove('wa-cloak'));
});
