let palettePicker = document.getElementById('palette-picker');
let paletteDisplay = palettePicker.parentNode.nextElementSibling;
let themeDemo = document.getElementById('theme-demo');

palettePicker.addEventListener('wa-change', function () {
  let palette = palettePicker.value;
  let paletteStylesheet = paletteDisplay.shadowRoot.getElementById('palette');
  paletteStylesheet.href = paletteStylesheet.href.replace(/[a-z-]+.css/, palette + '.css');
  let demoPaletteStylesheet = themeDemo.contentDocument.getElementById('palette');
  let paletteUrl = `/dist/styles/color/${palette}.css`;

  if (demoPaletteStylesheet) {
    demoPaletteStylesheet.href = paletteUrl;
  } else {
    let themeStylesheet = themeDemo.contentDocument.getElementById('theme');
    themeStylesheet.insertAdjacentHTML('afterend', `<link id="palette" rel="stylesheet" href="${paletteUrl}">`);
  }
});
