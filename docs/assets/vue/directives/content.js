// Like v-text, but doesn't complain if the element has content,
// making it possible to use in a PE fashion, with the contents being the fallback
export default function content(el, { value, arg }) {
  if (!el.dataset.fallback) {
    // Store the original content as a fallback the first time
    el.dataset.fallback = el.textContent;
  }

  if (value === '') {
    value = el.dataset.fallback;
  } else {
    if (arg === 'number') {
      value = Number(value).toLocaleString(undefined, { maximumSignificantDigits: 2 });
    }
  }

  if (arg === 'html') {
    el.innerHTML = value;
  } else {
    el.textContent = value;
  }
}
