const getLinks = () => [...document.querySelectorAll('#outline-standard a')];
const linkTargets = new WeakMap();
const visibleTargets = new WeakSet();
const observer = new IntersectionObserver(handleIntersect, { rootMargin: '0px 0px' });

function handleIntersect(entries) {
  entries.forEach(entry => {
    // Remember which targets are visible
    if (entry.isIntersecting) {
      visibleTargets.add(entry.target);
    } else {
      visibleTargets.delete(entry.target);
    }
  });

  updateLinks();
}

function updateLinks() {
  const links = getLinks();
  // Find the first visible target and activate the respective link
  links.find(link => {
    const target = linkTargets.get(link);

    if (target && visibleTargets.has(target)) {
      links.forEach(el => el.classList.toggle('current', el === link));
      return true;
    }

    return false;
  });
}

// Observe link targets
function observeLinks() {
  getLinks().forEach(link => {
    const hash = link.hash.slice(1);
    const target = hash ? document.querySelector(`#content #${hash}`) : null;

    if (target) {
      linkTargets.set(link, target);
      observer.observe(target);
    }
  });
}

observeLinks();

document.addEventListener('turbo:load', updateLinks);
document.addEventListener('turbo:load', observeLinks);
