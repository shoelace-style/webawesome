// Get all table rows with data-part attributes
const tableRows = document.querySelectorAll('[data-part]');

// Add event listeners for mouseenter and mouseleave
tableRows.forEach(row => {
  row.addEventListener('mouseenter', function () {
    const partName = this.getAttribute('data-part');
    const correspondingPart = document.getElementById('parts-example').shadowRoot.querySelector(`[part='${partName}']`);

    console.log('hello!');

    if (correspondingPart) {
      correspondingPart.style.outline = '2px solid red';
    }
  });

  row.addEventListener('mouseleave', function () {
    const partName = this.getAttribute('data-part');
    const correspondingPart = document.getElementById('parts-example').shadowRoot.querySelector(`[part='${partName}']`);

    if (correspondingPart) {
      correspondingPart.style.outline = '';
    }
  });
});
