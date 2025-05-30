const sidebar = document.querySelector('#sidebar');
const allDetails = sidebar.querySelectorAll('wa-details');
const collapsibleSections = sidebar.querySelectorAll('h2 > a');

function ensureCurrentSectionIsOpen(root) {
  const matchingDetails = root.querySelectorAll('wa-details:has(a.current)');

  matchingDetails.forEach(details => {
    details.setAttribute('open', '');
  });
}

// Ensure current section is open on normal page load
window.addEventListener('DOMContentLoaded', () => {
  ensureCurrentSectionIsOpen(sidebar);
});

// Ensure current section is open on Turbo page loads
document.addEventListener('turbo:before-render', event => {
  if (!event?.detail?.newBody) return;
  const newSidebar = event.detail.newBody.querySelector('#sidebar');

  if (newSidebar) {
    ensureCurrentSectionIsOpen(newSidebar);
  }
});
