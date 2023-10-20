import { Controller } from "@hotwired/stimulus"

export default class ScrollSpyController extends Controller {
  connect () {
    this.observer = new IntersectionObserver(this.handleIntersect, { rootMargin: '0px 0px' });

    this.linkMap = new WeakMap();
    this.visibleSet = new WeakSet();

    this.observeLinks()
    this.updateActiveLinks()

    this.selector = ["1","2","3","4","5","6"].map((str) => "h" + str + "[id]").join(",")
    document.querySelectorAll(this.selector).forEach((header) => {
      this.observer.observe(header);
    });

    document.addEventListener("turbo:load", this.observeLinks)
    document.addEventListener("turbo:load", this.updateActiveLinks)

    this.observeLinks()
    this.updateActiveLinks()
  }

  disconnect () {
    this.observer.disconnect()
  }

  get links () {
    return [...document.querySelectorAll('#table-of-contents li a')];
  }

  handleIntersect = (entries) => {
    entries.forEach(entry => {
      // Remember which targets are visible
      if (entry.isIntersecting) {
        this.visibleSet.add(entry.target);
      } else {
        this.visibleSet.delete(entry.target);
      }
    });

    this.updateActiveLinks();
  }

  updateActiveLinks = () => {
    const links = this.links;
    // Find the first visible target and activate the respective link
    links.find(link => {
      const target = this.linkMap.get(link);

      if (target && this.visibleSet.has(target)) {
        links.forEach(el => el.parentElement.classList.toggle('is-active', el === link));
        return true;
      }

      return false;
    });
  }

  observeLinks = () => {
    this.links.forEach(link => {
      const hash = link.hash.slice(1);
      const target = hash ? document.querySelector(`main #${hash}`) : null;

      if (target) {
        this.linkMap.set(link, target);
        this.observer.observe(target);
      }
    });
  }
}
