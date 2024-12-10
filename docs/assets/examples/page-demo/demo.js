await customElements.whenDefined('wa-checkbox');
let container = document.getElementById('page_slots_demo');
let fieldset = container.querySelector('fieldset');
let iframe = container.querySelector('iframe');
let stylesheets = Array.from(document.querySelectorAll("link[rel=stylesheet][href^='/dist/']"))
  .map(i => i.outerHTML)
  .join('\n');
let includes = `${stylesheets}
  <script src="/dist/webawesome.loader.js" type="module"></script>
  <link rel="stylesheet" href="/assets/examples/page-demo/page.css">`;

function render() {
  let slots = Array.from(fieldset.querySelectorAll('wa-checkbox[name=slot]:is([data-wa-checked])'));
  let slotsHTML = slots
    .map(slot => {
      let name = slot.getAttribute('value');
      let description = slot.getAttribute('data-description');

      let tag = 'div';
      if (name.endsWith('header')) {
        tag = 'header';
      }
      if (name.endsWith('footer')) {
        tag = 'footer';
      }

      return `<${tag} class="slot-content" slot="${name}">
		<strong>${name || 'main <em>(default)</em>'}</strong>
		<p>${description}</p>
	</${tag}>`;
    })
    .join('\n');
  let page = iframe.contentDocument?.querySelector('wa-page');

  if (page) {
    page.innerHTML = slotsHTML;
  } else {
    iframe.srcdoc = `${includes}<wa-page>${slotsHTML}</wa-page>`;
  }
}
fieldset?.addEventListener('input', render);
render();
