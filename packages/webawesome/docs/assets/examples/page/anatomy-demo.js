import { allDefined } from '/dist/webawesome.js';

await allDefined();

const demo = document.getElementById('page-anatomy-demo');
const fieldset = demo.querySelector('fieldset');
const frame = demo.querySelector('wa-zoomable-frame');

// Wait for the frame to load
await new Promise(resolve => frame.addEventListener('load', resolve, { once: true }));
await allDefined(frame.contentDocument);

const page = frame.contentDocument.querySelector('wa-page');
const originalPageHtml = page.innerHTML;

function updatePageContent() {
  const parser = new DOMParser();
  const doc = parser.parseFromString(originalPageHtml, 'text/html');
  const elements = doc.querySelectorAll('.slot-content');
  // Get all checked checkboxes
  const checkedBoxes = fieldset.querySelectorAll('wa-checkbox:state(checked)');
  const checkedSlots = new Set();

  checkedBoxes.forEach(checkbox => {
    const slotName = checkbox.getAttribute('value');
    checkedSlots.add(slotName);
  });

  // Filter elements based on checkbox state
  elements.forEach(element => {
    const slotName = element.getAttribute('slot') || 'main'; // FIX: Use 'main' for default slot
    if (!checkedSlots.has(slotName)) {
      element.remove();
    }
  });

  page.innerHTML = doc.body.innerHTML;
}

fieldset.addEventListener('input', () => {
  updatePageContent();
});
