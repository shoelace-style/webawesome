---
meta:
  title: Kitchen Sink
  description: TODO
toc: false
---

<style>
  /* turn off eleventy header anchors */
  .anchor-heading a {
    display: none;
  }

  /* hide Web Awesome docs nav */
  main {
    margin-left: 0;
  }

  #menu-toggle,
  #sidebar {
    display: none;
  }

  /* floating themer bar styles */
  [hidden] {
    display: none !important;
  }

  :root {
    --knobs-width: 300px;
  }

  #knobs {
    position: fixed;
    z-index: 10;
    top: 2rem;
    left: 2rem;
    background: var(--wa-color-surface-default);
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-corners-m);
    box-shadow: var(--wa-shadow-level-2);
    width: var(--knobs-width);
    padding: 1.5rem;
    max-height: calc(100% - 3rem);
    overflow: auto;
    margin-inline: auto;
    margin-block: 0 4rem;
  }

  #knobs p {
    margin: 0;
  }

  #knobs wa-select + wa-input {
    margin-inline-start: .5rem;
  }

  /* set up  Kitchen Sink preview area */
  .content {
    max-width: 1160px;
    gap: 0;
  }


  /* file uploader styles */
.file-uploader {
  position: relative;
  border: var(--wa-form-controls-border-width) dashed var(--wa-form-controls-resting-color);
  border-radius: var(--wa-form-controls-corners);
  background: var(--wa-form-controls-background);
  padding: var(--wa-space-xs);
  cursor: pointer;
  text-align: center;
}

.file-uploader:is(:hover) {
  background-color: var(--wa-color-neutral-fill-subtle);
}

/**
  <wa-visually-hidden>, but without the :not(:focus-within),
  the reason is that it shows the default browser file uploader.
*/
.hidden-label::part(form-control-label),
.file-uploader input {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  clip: rect(0 0 0 0) !important;
  clip-path: inset(50%) !important;
  border: none !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  padding: 0 !important;
}

.file-uploader:is(:focus-within) {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

#file-uploader-description {
  display: block;
  line-height: 1;
  font-size: 0.75em;
  color: var(--wa-color-text-quiet);
}

/* project logo icon select styles */
  wa-radio-group[name="project-logo-selector"]::part(button-group) {
    width: 100%;
  }

  wa-radio-group[name="project-logo-selector"] wa-radio-button,
  wa-radio-group[name="project-logo-selector"] wa-button {
    flex: 1 1 auto;
  }

  #icon-chooser::part(panel) {
    width: 100%;
    height: 80%;
    max-width: 700px;
  }

  wa-input[name="icon-search"] {
    position: sticky;
    top: 0;
  }

  .icon-search {
    border: solid 1px var(--wa-color-surface-border);
    border-radius: var(--wa-corners-s);
    padding: var(--wa-space-m);
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-template-rows: repeat(auto-fill, 84px);
    gap: 1rem;
    overflow: auto;
    padding: .5rem;
    margin: -.5rem;
  }

  .icon-list[data-variant="regular"] wa-button:not([data-variant="regular"]),
  .icon-list[data-variant="solid"] wa-button:not([data-variant="solid"]) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    #icon-chooser::part(panel) {
      width: 100%;
      max-height: 80%;
      max-width: 90vw;
    }

    .icon-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .icon-list wa-button {
    font-size: 1.75rem;
  }

  .icon-list wa-button::part(base) {
    justify-content: center;
    align-items: center;
    min-height: 80px;
  }

  .icon-list[data-type="outline"] .icon-list-item[data-name$="-fill"] {
    display: none;
  }

  .icon-list[data-type="filled"] .icon-list-item:not([data-name$="-fill"]) {
    display: none;
  }
</style>

<!-- Knobs -->
<form id="knobs">
  <div class="space-vertically">
    <a href="/">{% include 'logo.njk' %}</a>
    <wa-input name="project-name" value="" placeholder="Project Name" label="Give us your project's name!"></wa-input>
    <div>
      <label class="file-uploader" style="display: block;" aria-describedby="file-uploader-description">
        <input name="project-logo" type="file" accept="image/*">
        Add Logo
      </label>
      <small id="file-uploader-description" style="margin-top: 0.5em;">Give us an SVG of the iconic part of your logo, and we’ll give you favicons, app icons, and branded navigation.</small>
    </div>
    <div>
      <wa-radio-group label="Need a logo?" name="project-logo-selector" value="p">
        <wa-radio-button value="p"><wa-icon name="p"></wa-icon></wa-radio-button>
        <wa-radio-button value="dragon"><wa-icon name="dragon"></wa-icon></wa-radio-button>
        <wa-radio-button value="pizza-slice"><wa-icon name="pizza-slice"></wa-icon></wa-radio-button>
        <wa-radio-button value="fire"><wa-icon name="fire"></wa-icon></wa-radio-button>
        <wa-button value="[choose]" outline id="icon-chooser-trigger"  class="logo-chooser">
          <wa-icon name="ellipsis"></wa-icon>
          <wa-visually-hidden>Browse icons</wa-visually-hidden>
        </wa-button>
        <small slot="help-text" style="display: inline-block; line-height: 1;">It's dangerous to go alone. Take these!</small>
      </wa-radio-group>
    </div>
    <wa-select name="theme" label="Theme" value="default">
      <wa-option value="default">Default</wa-option>
      <wa-option value="fa">Font Awesome</wa-option>
      <wa-option value="premium">Premium</wa-option>
      <wa-option value="classic">Classic</wa-option>
      <wa-option value="glassy">Glassy</wa-option>
      <wa-option value="mellow">Mellow</wa-option>
      <wa-option value="playful">Playful</wa-option>
      <wa-option value="chic">Chic</wa-option>
    </wa-select>
    <div class="space-vertically" style="--gap: var(--wa-space-2xs);">
      <div aria-hidden="true">Heading Typography</div>
      <div style="display: flex; --wa-space-m: 0.5rem;">
        <wa-select class="hidden-label" name="font-family-heading" value="default" label="Heading Typography Font Family">
          <wa-option value="default">Theme default</wa-option>
          <wa-option value="assistant">Assistant</wa-option>
          <wa-option value="inter">Inter</wa-option>
          <wa-option value="lora">Lora</wa-option>
          <wa-option value="noto-sans">Noto Sans</wa-option>
          <wa-option value="noto-sans-display">Noto Sans Display</wa-option>
          <wa-option value="noto-sans-mono">Noto Sans Mono</wa-option>
          <wa-option value="noto-serif">Noto Serif</wa-option>
          <wa-option value="open-sans">Open Sans</wa-option>
          <wa-option value="playfair">Playfair</wa-option>
          <wa-option value="playfair-display">Playfair Display</wa-option>
          <wa-option value="quicksand">Quicksand</wa-option>
          <wa-option value="roboto-flex">Roboto Flex</wa-option>
          <wa-option value="roboto-mono">Roboto Mono</wa-option>
          <wa-option value="roboto-serif">Roboto Serif</wa-option>
          <wa-option value="roboto-slab">Roboto Slab</wa-option>
        </wa-select>
        <wa-input
          class="hidden-label"
          name="font-weight-heading"
          value=""
          label="Heading Typography Font Weight"
          type="number"
          step="50"
          max="900"
          min="50"
          style="width: 33%;"
        >
        </wa-input>
      </div>
    </div>
    <div class="space-vertically" style="--gap: var(--wa-space-2xs);">
      <div aria-hidden="true">Body Typography</div>
      <div style="display: flex; --wa-space-m: 0.5rem;">
        <wa-select class="hidden-label" name="font-family-body" value="default" label="Body Typography Font Family">
          <wa-option value="default">Theme default</wa-option>
          <wa-option value="assistant">Assistant</wa-option>
          <wa-option value="inter">Inter</wa-option>
          <wa-option value="lora">Lora</wa-option>
          <wa-option value="noto-sans">Noto Sans</wa-option>
          <wa-option value="noto-sans-mono">Noto Sans Mono</wa-option>
          <wa-option value="noto-serif">Noto Serif</wa-option>
          <wa-option value="open-sans">Open Sans</wa-option>
          <wa-option value="playfair">Playfair</wa-option>
          <wa-option value="quicksand">Quicksand</wa-option>
          <wa-option value="roboto-flex">Roboto Flex</wa-option>
          <wa-option value="roboto-mono">Roboto Mono</wa-option>
          <wa-option value="roboto-serif">Roboto Serif</wa-option>
          <wa-option value="roboto-slab">Roboto Slab</wa-option>
        </wa-select>
        <wa-input
          class="hidden-label"
          name="font-weight-body"
          value=""
          style="width: 33%;"
          type="number"
          step="50"
          max="900"
          min="50"
          label="Body Typography Font Weight"
        >
        </wa-input>
      </div>
    </div>
    <wa-select name="border-style" label="Border Style" value="solid">
      <wa-option value="solid">Solid</wa-option>
      <wa-option value="dashed">Dashed</wa-option>
      <wa-option value="dotted">Dotted</wa-option>
      <wa-option value="double">Double</wa-option>
    </wa-select>
    <wa-range name="border-width" label="Border Width" min="1" max="5" value="1" step="1" tooltip="none"></wa-range>
    <wa-range name="spacing" label="Spacing" min=".5" max="1.5" value="1" step="0.125" tooltip="none"></wa-range>
    <wa-range name="corners" label="Corners" min="0" max="1.5" value=".25" step=".125" tooltip="none"></wa-range>
    <wa-range name="depth" label="Depth" min="0" max="4" value="0" step="1" tooltip="none"></wa-range>
    <wa-switch name="appearance">Toggle Dark Mode</wa-switch>
  </div>
</form>

<wa-dialog id="icon-chooser" label="Browse Icons">
  <div style="display: grid; grid-template-rows: minmax(0, auto) minmax(0, 1fr); height: 100%; gap: 1rem;">
    <div style="display: flex; gap: 1.25rem;">
      <wa-input name="icon-search" placeholder="Search Icons" clearable style="flex: 1 1 auto;">
        <wa-icon slot="prefix" name="search"></wa-icon>
      </wa-input>
      <wa-select name="icon-variant" value="solid" style="flex: 0 1 auto;">
        <wa-option value="solid">Solid</wa-option>
        <wa-option value="regular">Regular</wa-option>
      </wa-select>
    </div>
    <div class="icon-list" data-variant="solid"></div>
  </div>
</wa-dialog>

<!-- Icon chooser -->
<script type="module">
  const icons = [
    // Solid
    { name: 'asterisk', variant: 'solid' },
    { name: 'atom', variant: 'solid' },
    { name: 'bed', variant: 'solid' },
    { name: 'bread-slice', variant: 'solid' },
    { name: 'bolt', variant: 'solid' },
    { name: 'car', variant: 'solid' },
    { name: 'carrot', variant: 'solid' },
    { name: 'cat', variant: 'solid' },
    { name: 'cheese', variant: 'solid' },
    { name: 'circle', variant: 'solid' },
    { name: 'diamond', variant: 'solid' },
    { name: 'dog', variant: 'solid' },
    { name: 'eye', variant: 'solid' },
    { name: 'feather', variant: 'solid' },
    { name: 'fish', variant: 'solid' },
    { name: 'frog', variant: 'solid' },
    { name: 'gauge-simple', variant: 'solid' },
    { name: 'guitar', variant: 'solid' },
    { name: 'hat-cowboy', variant: 'solid' },
    { name: 'hat-wizard', variant: 'solid' },
    { name: 'heart', variant: 'solid' },
    { name: 'helicopter', variant: 'solid' },
    { name: 'house', variant: 'solid' },
    { name: 'ice-cream', variant: 'solid' },
    { name: 'igloo', variant: 'solid' },
    { name: 'mask', variant: 'solid' },
    { name: 'message', variant: 'solid' },
    { name: 'paw', variant: 'solid' },
    { name: 'pencil', variant: 'solid' },
    { name: 'phone', variant: 'solid' },
    { name: 'plane', variant: 'solid' },
    { name: 'poop', variant: 'solid' },
    { name: 'sack-dollar', variant: 'solid' },
    { name: 'sailboat', variant: 'solid' },
    { name: 'shoe-prints', variant: 'solid' },
    { name: 'sink', variant: 'solid' },
    { name: 'snowflake', variant: 'solid' },
    { name: 'snowman', variant: 'solid' },
    { name: 'square', variant: 'solid' },
    { name: 'stairs', variant: 'solid' },
    { name: 'stamp', variant: 'solid' },
    { name: 'tape', variant: 'solid' },
    { name: 'truck', variant: 'solid' },
    { name: 'umbrella', variant: 'solid' },
    { name: 'user', variant: 'solid'  },
    // Regular
    { name: 'bell', variant: 'regular' },
    { name: 'bookmark', variant: 'regular' },
    { name: 'circle', variant: 'regular' },
    { name: 'clock', variant: 'regular' },
    { name: 'envelope', variant: 'regular' },
    { name: 'face-smile', variant: 'regular' },
    { name: 'flag', variant: 'regular' },
    { name: 'gem', variant: 'regular' },
    { name: 'hand', variant: 'regular' },
    { name: 'handshake', variant: 'regular' },
    { name: 'heart', variant: 'regular' },
    { name: 'hourglass', variant: 'regular' },
    { name: 'image', variant: 'regular' },
    { name: 'keyboard', variant: 'regular' },
    { name: 'lemon', variant: 'regular' },
    { name: 'life-ring', variant: 'regular' },
    { name: 'lightbulb', variant: 'regular' },
    { name: 'map', variant: 'regular' },
    { name: 'moon', variant: 'regular' },
    { name: 'newspaper', variant: 'regular' },
    { name: 'snowflake', variant: 'regular' },
    { name: 'square', variant: 'regular' },
    { name: 'star', variant: 'regular' },
    { name: 'sun', variant: 'regular' },
    { name: 'trash-can', variant: 'regular' },
  ];
  const chooser = document.querySelector('#icon-chooser');
  const variantInput = document.querySelector('[name="icon-variant"]');
  const input = chooser.querySelector("[name='icon-search']");
  const iconList = chooser.querySelector('.icon-list');
  const queue = [];
  let inputTimeout;

  chooser.addEventListener('wa-initial-focus', () => {
    requestAnimationFrame(() => input.focus());
  })

  variantInput.addEventListener('wa-change', () => {
    iconList.dataset.variant = variantInput.value;
  });

  icons.forEach(icon => {
    const button = document.createElement('wa-button');
    button.style.margin = "2px"
    button.classList.add("icon-list-item")
    button.setAttribute("outline", "")
    button.setAttribute('data-name', icon.name);
    button.setAttribute('data-variant', icon.variant);
    button.setAttribute('data-terms', [icon.name, ...(icon.tags || []), ...(icon.categories || [])].join(' '));
    button.innerHTML = `
      <wa-icon name="${icon.name}" label="${icon.name}" variant="${icon.variant}"></wa-icon>
    `;

    iconList.append(button);
  });

  // Filter as the user types
  input.addEventListener('wa-input', () => {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      [...iconList.children].map(item => {
        const filter = input.value.toLowerCase();
        if (filter === '') {
          item.removeAttribute("hidden");
        } else {
          const terms = item.getAttribute('data-terms').toLowerCase();
          if (terms.indexOf(filter) < 0) {
            item.setAttribute("hidden", "")
          } else {
            item.removeAttribute("hidden")
          }
        }
      });
    }, 250);
  });

  document.querySelector("#icon-chooser-trigger").addEventListener("click", () => {
    document.querySelector("#icon-chooser").show()
  })
</script>

<script type="module">
  const container = document.getElementById('knobs');
  const previewContainer = document.querySelector('.preview-container');
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const depthSlider = container.querySelector('[name="depth"]')
  const fontWeightHeading = container.querySelector('[name="font-weight-heading"]')
  const fontWeightBody = container.querySelector('[name="font-weight-body"]')
  const fontFamilyHeading = container.querySelector('[name="font-family-heading"]')
  const fontFamilyBody = container.querySelector('[name="font-family-body"]')
  const spacing = container.querySelector("[name='spacing']")
  const corners = container.querySelector("[name='corners']")
  const borderStyle = container.querySelector('[name="border-style"]')
  const borderWidth = container.querySelector('[name="border-width"]')
  const themeSelect = container.querySelector('[name="theme"]');
  const darkModeSelect = container.querySelector('[name="appearance"]');

  function resetHeadingFontWeightValue () {
    document.documentElement.style.removeProperty('--wa-font-weight-heading')
    fontWeightHeading.value = getComputedStyle(previewContainer).getPropertyValue('--wa-font-weight-heading')
  }

  function resetHeadingFontFamilyValue () {
    document.documentElement.style.removeProperty('--wa-font-family-heading')
    fontFamilyHeading.value = "default"
  }

  function resetBodyFontWeightValue () {
    document.documentElement.style.removeProperty('--wa-font-weight-body')
    fontWeightBody.value = getComputedStyle(previewContainer).getPropertyValue('--wa-font-weight-body')
  }

  function resetBodyFontFamilyValue () {
    document.documentElement.style.removeProperty('--wa-font-family-body')
    fontFamilyBody.value = "default"
  }

  function resetBorderWidthValue () {
    document.documentElement.style.removeProperty('--wa-border-width-base')
    borderWidth.value = getComputedStyle(previewContainer).getPropertyValue("--wa-border-width-base")
  }

  function resetBorderStyleValue () {
    document.documentElement.style.removeProperty('--wa-border-style')
    borderStyle.value = getComputedStyle(previewContainer).getPropertyValue("--wa-border-style")
  }

  function resetSpacingValue () {
    document.documentElement.style.removeProperty('--wa-space-base')
    spacing.value = getComputedStyle(previewContainer).getPropertyValue("--wa-space-base")
  }

  function resetCornersValue () {
    document.documentElement.style.removeProperty('--wa-corners-base')
    corners.value = getComputedStyle(previewContainer).getPropertyValue("--wa-corners-base")
  }

  // Depth slider and settings
  const depthNames = {
    0: "depth_0_flat.css",
    1: "depth_1_semiflat.css",
    2: "depth_2_chunky.css",
    3: "depth_3_punchy.css",
    4: "depth_4_glossy.css",
  }

  function resetDepthValue () {
    const themeSheet = [...document.styleSheets].find((sheet) => sheet.ownerNode?.id === "theme-stylesheet")

    const importRules = []
    let depth = null
    const matchRegex = /depth_(\d+)_.*\.css$/

    // Find all import rules in the stylesheet, then find one that matches the naming convention.
    ;[...themeSheet.cssRules].forEach((rule) => {
      if (rule instanceof CSSImportRule) {
        const match = rule.href.match(matchRegex)
        if (match) {
          depth = Number(match[1])
        }
      }
    })

    if (depth != null) {
      depthSlider.value = depth
    }
  }

  // Some depth stylesheets have additional CSS Properties. Let's delete them and make sure we get fresh stylesheets.
  function deleteDepthFromBaseStylesheet () {
    const themeSheet = [...document.styleSheets].find((sheet) => sheet.ownerNode?.id === "theme-stylesheet")

    const importRules = []
    let depth = null
    let ruleIndex = null
    const matchRegex = /depth_(\d+)_.*\.css$/

    ;[...themeSheet.cssRules].forEach((rule, index) => {
      if (rule instanceof CSSImportRule) {
        const match = rule.href.match(matchRegex)
        if (match) {
          ruleIndex = index
          depth = Number(match[1])
        }
      }
    })

    if (ruleIndex != null && depth != null) {
      themeSheet.deleteRule(ruleIndex)
    }
  }

  depthSlider.addEventListener("wa-input", (e) => {
    const depth = e.target.value

    if (depth == null) return

    // Load depth stylesheet
    const depthName = depthNames[depth]

    const depthStylesheet = Object.assign(document.createElement("link"), {
      // This media: "print" allows us to lazy load the stylesheet then hot swap it on load.
      id: "depth-stylesheet",
      media: "print",
      rel: "stylesheet",
      type: "text/css",
      href: `/dist/themes/${depthName}`,
    })

    // This prevents the typical flash and reflow you see if you replace the old stylesheet
    // with the new stylesheet, before the new stylesheet has loaded
    depthStylesheet.addEventListener("load", (e) => {
      // Removing the media attribute causes styles to apply to the page
      depthStylesheet.removeAttribute("media")
      setTimeout(() => {
        deleteDepthFromBaseStylesheet()
        const oldDepthStylesheet = document.querySelectorAll("#depth-stylesheet").forEach((element, index) => {
          if (index === 0) {
            return
          }

          element.remove()
        })
      })
    })

    document.head.prepend(depthStylesheet)

  })

  resetDepthValue()


  // Theme Switcher
  themeSelect.addEventListener('wa-change', event => {
    const theme = event.target.value
    const newStylesheet = Object.assign(document.createElement("link"), {
      // This media: "print" allows us to lazy load the stylesheet then hot swap it on load.
      id: "theme-stylesheet",
      media: "print",
      rel: "stylesheet",
      type: "text/css",
      href: `/dist/themes/${theme}.css`,
    })

    // This prevents the typical flash and reflow you see if you replace the old stylesheet
    // with the new stylesheet, before the new stylesheet has loaded
    newStylesheet.addEventListener("load", (e) => {
      // Removing the media attribute causes styles to apply to the page
      newStylesheet.removeAttribute("media")
      setTimeout(() => {
        document.querySelectorAll("#theme-stylesheet").forEach((el, index) => {
          if (index === 0) return

          // 100 seems to provide the "smoothest" transition
          setTimeout(() => {
            el.remove();

            resetBodyFontWeightValue()
            resetBodyFontFamilyValue()
            resetHeadingFontWeightValue()
            resetHeadingFontFamilyValue()
            resetDepthValue()
            resetSpacingValue()
            resetBorderWidthValue()
            resetBorderStyleValue()
            resetCornersValue()

            if (darkModeSelect.checked === true) {
              // darkModeSelect.checked = false
              document.documentElement.className = "flavor-html"
              document.documentElement.classList.toggle(`wa-theme-${theme}-dark`);
            }
          }, 100)
        })
      })
    })

    document.head.prepend(newStylesheet)
  });

  // User provided project logo
  container.querySelector('[name="project-logo"]').addEventListener('change', event => {
    const file = event.target.files[0]
    const isSvg = file.type.startsWith("image/svg")

    let img

    if (isSvg) {
      img = document.createElement("wa-icon")
    } else {
      img = document.createElement("img")
    }

    const src = URL.createObjectURL(file);
    img.setAttribute("src", src)

    img.id = "project-logo"
    img.setAttribute("height", "36")
    img.setAttribute("width", "36")

    previewContainer.querySelector("#project-logo").replaceWith(img)

    // Clean up to prevent memory leaks
    img.addEventListener("load", () => {
      URL.revokeObjectURL(src)
    })

    img.addEventListener("wa-load", () => {
      URL.revokeObjectURL(src)
    })
  })

  // Pre-selected logos
  document.querySelector('.icon-list').addEventListener('click', event => {
    const button = event.target.closest("wa-button")

    if (!button) return

    const iconName = button.dataset.name
    const iconVariant = button.dataset.variant;

    if (!iconName) return

    // Undo selected
    event.currentTarget.querySelectorAll(".icon-list-item").forEach((el) => {
      el.setAttribute("aria-selected", "false")
      el.setAttribute("variant", "neutral")
      el.setAttribute("outline", "")
    })

    // Set selected
    button.setAttribute("aria-selected", "true")
    button.setAttribute("variant", "brand")
    button.removeAttribute("outline")

    const projectLogo = previewContainer.querySelector("#project-logo");
    const element = document.createElement("wa-icon")
    element.name = iconName
    element.variant = iconVariant;
    element.id = "project-logo"

    // Depending on how we plan to store the logos, we can also do <img src="" height="36" width="36">
    projectLogo.replaceWith(element)
    event.currentTarget.closest("wa-dialog").hide()
  })

  // Pre-generated logos
  container.querySelector('[name=project-logo-selector]').addEventListener('wa-change', event => {
    const value = event.currentTarget.value

    const projectLogo = previewContainer.querySelector("#project-logo");

    let element

    element = document.createElement("wa-icon")
    element.name = value

    element.id = "project-logo"

    // Depending on how we plan to store the logos, we can also do <img src="" height="36" width="36">
    projectLogo.replaceWith(element)
  })

  // Project Name
  container.querySelector('[name="project-name"]').addEventListener('wa-input', event => {
    previewContainer.querySelector("#project-name").innerText = event.target.value || event.target.getAttribute("placeholder")
  })

  // Heading font weight
  resetHeadingFontWeightValue()
  fontWeightHeading.addEventListener('wa-input', event => {
    document.documentElement.style.setProperty('--wa-font-weight-heading', event.target.value);
  });

  // Heading text
  fontFamilyHeading.addEventListener('wa-change', event => {
    let fontFamily;
    switch(event.target.value) {
      case 'assistant':
        fontFamily = `'Assistant', sans-serif`;
        break;
      case 'inter':
        fontFamily = `'inter', sans-serif`;
        break;
      case 'lora':
        fontFamily = `'Lora', serif`;
        break;
      case 'mulish':
        fontFamily = `'Mulish', sans-serif`;
        break;
      case 'noto-sans':
          fontFamily = `'Noto Sans', sans-serif`;
          break;
      case 'noto-sans-display':
          fontFamily = `'Noto Sans Display', sans-serif`;
          break;
      case 'noto-sans-mono':
          fontFamily = `'Noto Sans Mono', monospace`;
          break;
      case 'noto-serif':
          fontFamily = `'Noto Serif', serif`;
          break;
      case 'open-sans':
          fontFamily = `'Open Sans', sans-serif`;
          break;
      case 'playfair':
          fontFamily = `'Playfair', serif`;
          break;
      case 'playfair-display':
          fontFamily = `'Playfair Display', serif`;
          break;
      case 'quicksand':
          fontFamily = `'Quicksand', sans-serif`;
          break;
      case 'roboto-flex':
          fontFamily = `'Roboto Flex', sans-serif`;
          break;
      case 'roboto-mono':
          fontFamily = `'Roboto Mono', monospace`;
          break;
      case 'roboto-serif':
          fontFamily = `'Roboto Serif', serif`;
          break;
      case 'roboto-slab':
          fontFamily = `'Roboto Slab', serif`;
          break;
      default:
        fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
    }
    document.documentElement.style.setProperty('--wa-font-family-heading', fontFamily);
  })

  // Body text
  fontFamilyBody.addEventListener('wa-change', event => {
    let fontFamily;
    switch(event.target.value) {
      case 'assistant':
        fontFamily = `'Assistant', sans-serif`;
        break;
      case 'inter':
        fontFamily = `'inter', sans-serif`;
        break;
      case 'lora':
        fontFamily = `'Lora', serif`;
        break;
      case 'mulish':
        fontFamily = `'Mulish', sans-serif`;
        break;
      case 'noto-sans':
          fontFamily = `'Noto Sans', sans-serif`;
          break;
      case 'noto-sans-mono':
          fontFamily = `'Noto Sans Mono', monospace`;
          break;
      case 'noto-serif':
          fontFamily = `'Noto Serif', serif`;
          break;
      case 'open-sans':
          fontFamily = `'Open Sans', sans-serif`;
          break;
      case 'playfair':
          fontFamily = `'Playfair', serif`;
          break;
      case 'quicksand':
          fontFamily = `'Quicksand', sans-serif`;
          break;
      case 'roboto-flex':
          fontFamily = `'Roboto Flex', sans-serif`;
          break;
      case 'roboto-mono':
          fontFamily = `'Roboto Mono', monospace`;
          break;
      case 'roboto-serif':
          fontFamily = `'Roboto Serif', serif`;
          break;
      case 'roboto-slab':
          fontFamily = `'Roboto Slab', serif`;
          break;
      default:
        fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
    }
    document.documentElement.style.setProperty('--wa-font-family-body', fontFamily);
  });

  // Body font weight
  resetBodyFontWeightValue()
  fontWeightBody.addEventListener('wa-input', event => {
    document.documentElement.style.setProperty('--wa-font-weight-body', event.target.value);
  });

  // Corners
  container.querySelector('[name="corners"]').addEventListener('wa-input', event => {
    document.documentElement.style.setProperty('--wa-corners-base', `${event.target.value}`);
  });

  // Border width
  container.querySelector('[name="border-width"]').addEventListener('wa-input', event => {
    document.documentElement.style.setProperty('--wa-border-width-base', `${event.target.value / 16}`);
  });

  // Border style
  borderStyle.addEventListener('wa-input', event => {
    document.documentElement.style.setProperty('--wa-border-style', event.target.value);
  });

  // Spacing style
  spacing.addEventListener('wa-input', event => {
    document.documentElement.style.setProperty('--wa-space-base', `${event.target.value}`);
  });

  // Form validation
  // Mostly useful for the number ranges. Very simple validation on blurs.
  function reportValidity (event) {
    const element = event.target
    if (typeof element?.reportValidity === "function") {
      const isValid = element.reportValidity()

      element.classList.toggle("wa-invalid", !isValid)
    }
  }

  knobs.querySelectorAll("*").forEach((el) => el.addEventListener("blur", reportValidity))
  knobs.querySelectorAll("*").forEach((el) => el.addEventListener("wa-blur", reportValidity))

  // Light & Dark Mode
  darkModeSelect.addEventListener('wa-change', event => {
    const el = document.documentElement
    const theme = themeSelect.value

    el.classList.toggle(`wa-theme-${theme}-dark`);

  });
</script>

<style>
  /* Kitchen Sink layout and cross-theme styles */

  html {
    background: var(--wa-color-surface-default);
    background-attachment: fixed;
    background-image: radial-gradient(var(--wa-color-surface-lowered) 1.5px, transparent 0);
    background-size: 28px 28px;
    background-position: -19px -19px;
    min-height: 100vh;
  }

  #project-logo {
    font-size: 1.25rem;
  }

  /* page layout */
  .preview-container {
    background: var(--wa-color-surface-lowered);
    padding: 0;
    margin: 0;
    translate: calc((var(--knobs-width) + 2rem) / 2);
    border: var(--wa-border-width-m) var(--wa-color-neutral-border-subtle) var(--wa-border-style);
  }

  .overlap {
    position: relative;
    color: var(--wa-color-text-normal);
    z-index: 1;
  }

  /* general and utility */
  .space-vertically {
    display: flex;
    flex-direction: column;
    gap: var(--gap, 1.25rem);
  }

  .strata {
    padding: var(--wa-space-3xl) var(--wa-space-2xl);
    /* border-bottom: var(--wa-border-width-m) var(--wa-color-neutral-border-subtle) var(--wa-border-style); */
  }

  /* strata - hero/header */
  .project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* strata - blog post */
  .blog {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
  }

  .blog .column-post-header {
    grid-column: 1 / 5;
    position: relative;
  }

  .blog .post-header {
    position: sticky;
    top: 1rem;
  }

  .blog .post-title {
    margin-top: 0;
    line-height: 1.2;
  }

  .blog .authors {
    margin: var(--wa-space-2xl) 0;
  }

  .blog .authors a {
    display: flex;
    align-items: center;
    gap: var(--wa-space-s);
  }

  .blog .post-body {
    grid-column: 5 / 13;
  }

  /* strata product cards */
  .strata.products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    gap: 1rem;
  }

  .products wa-card::part(base) {
    height: 100%;
  }

  .products wa-card::part(body) {
    flex-grow: 1;
  }

  .product-card {
    position: relative;
  }

  .product-card .badge-stock {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }

  .product-card .title-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .product-card .title {
    font-size: var(--wa-font-size-2xl);
    margin: 0;
  }

  .product-card wa-rating {
    --symbol-size: .8rem;
  }

  /* strata - message composer */
  .message-composer .card-header [slot='header'] {
    display: flex;
    align-items: center;
  }

  .message-composer .card-footer [slot='footer'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .message-composer wa-card p {
    margin-bottom: 0;
  }

  .message-composer .card-footer [slot='footer'] .tools {
    display: flex;
    align-items: center;
  }

  .message-composer .grouped-buttons:not(:first-of-type) {
    padding-inline-start: var(--wa-space-m);
  }

  .message-composer .grouped-buttons:not(:last-of-type) {
    padding-inline-end: var(--wa-space-m);
    border-right: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-neutral-border-subtle);
  }

  /* strata - product detail */
  .product-detail {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
  }

  .product-detail .product-detail-images {
    grid-column: 1 / 6;
  }

  .product-detail .product-detail-info {
    grid-column: 7 / 13;
  }

  .product-detail  .title-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .product-detail .price {
    font-size: var(--wa-font-size-xl);
  }

  .product-detail .price-discounted {
    text-decoration: line-through;
    color: var(--wa-color-text-quiet);
    margin-inline-end: var(--wa-space-m);
  }

  .product-detail wa-radio-button {
    --background: var(--wa-color-neutral-spot);
  }

  .product-detail wa-input {
    --background: transparent;
  }



  /* other */
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    gap: 1rem;
    margin-block-start: var(--wa-space-m);
  }

  .cards wa-card::part(body),
  .cards wa-card::part(base) {
    height: 100%;
  }



  @media screen and (max-width: 670px) {

  }

  @media screen and (max-width: 1040px) {
    .cards {
      display: flex;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 1450px) {
    .cards {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

<!-- Kitchen Sink Preview -->
<div class="preview-container">
  <section class="overlap">
    <header class="strata project-header">
      <div style="display: flex; align-items: center">
        <wa-icon id="project-logo" name="p"></wa-icon>
        <span id="project-name" style="margin-inline-start: var(--wa-space-m);">Project Name</span>
      </div>
      <div>
        <wa-icon-button name="gear" label="Settings"></wa-icon-button>
        <wa-icon-button name="bell" label="Notifications"></wa-icon-button>
      </div>
    </header>
    <section class="strata blog">
      <div class="column-post-header">
        <div class="post-header">
          <h1 class="post-title">Web Awesome Themes</h1>
          <div class="post-meta">
            <div class="authors">
              <a href="">
                <wa-avatar image="/assets/images/kitchen-sink/lindsay.png" label="Lindsay Miller"> </wa-avatar>
              </a>
            </div>
            <div class="categories">
              <a href=""><wa-tag size="small" variant="neutral">CSS</wa-tag></a>
              <a href=""><wa-tag size="small" variant="neutral">Theming</wa-tag></a>
              <a href=""><wa-tag size="small" variant="neutral">Resources</wa-tag></a>
            </div>
          </div>
        </div>
      </div>
      <div class="post-body">
        <p>Web Awesome is designed to be highly customizable through pure CSS. Out of the box, you can choose from a light or dark theme. Alternatively, you can design your own theme.</p>
        <p>A theme is nothing more than a stylesheet that uses the Web Awesome API to define design tokens and apply custom styles to components. To create a theme, you will need a decent understanding of CSS, including <a href="">CSS Custom Properties</a>.</p>
        <h2>Theme Basics</h2>
        <p>All themes are scoped to classes using the sl-theme-{name} convention, where {name} is a lowercase, hyphen-delimited value representing the name of the theme. The included light and dark themes use wa-theme-default-light and wa-theme-default-dark, respectively. A custom theme called “Purple Power”, for example, would use a class called <code>sl-theme-purple-power</code>.</p>
        <img src="/assets/images/kitchen-sink/blog-post-example-image.png" alt="blog post example image" style="margin: 0 0 1rem 0;" />
        <p>All selectors must be scoped to the theme’s class to ensure interoperability with other themes. You should also scope them to :host so they can be imported and applied to custom element shadow roots.</p>
        <pre class="codeblock">

<code>:host,
.wa-theme-purple-power {
/_ ... _/
}</code>

</pre>
<h3>Activating Themes</h3>
<p>To activate a theme, import it and apply the theme’s class to the <html> element. This example imports and activates the built-in dark theme.</p>
<pre class="codeblock">
<code>&lt;html class="wa-theme-default-dark"&gt;
&lt;head&gt;
&lt;link rel="stylesheet" href="path/to/shoelace/dist/themes/dark.css" /&gt;
&lt;/head&gt;
&lt;body&gt;
...
&lt;/body&gt;
&lt;/html&gt;</code>
</pre>
<wa-alert open>
<wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
There is one exception to this rule — the light theme does not need to be activated. For convenience, the light theme is scoped to :root and will be activated by default when imported.
</wa-alert>
</div>
</section>
<section class="strata products">
<wa-card class="card-image product-card">
<wa-badge variant="brand" class="badge-stock">New</wa-badge>
<img slot="image" src="/assets/images/kitchen-sink/morpheus.png" alt="" />
<div class="title-rating">
<h3 class="title">Morpheus</h3>
<wa-rating label="Rating" value="4"></wa-rating>
</div>
<div class="description">
<p>I see it in your eyes. You have the look of a man who accepts what he sees because he is expecting to wake up. Ironically, that's not far from the truth.</p>
</div>
<div slot="footer">
<wa-button size="small">
<wa-icon slot="prefix" name="plus" family="sharp" variant="regular"></wa-icon>
Add to Cart
</wa-button>
<wa-button size="small" outline>
<wa-icon slot="prefix" name="bookmark" family="sharp" variant="regular"></wa-icon>
Save
</wa-button>
</div>
</wa-card>
<wa-card class="card-image product-card">
<wa-badge variant="warning" class="badge-stock">Low Stock</wa-badge>
<img slot="image" src="/assets/images/kitchen-sink/seraph.png" alt="" />
<div class="title-rating">
<h3 class="title">Seraph</h3>
<wa-rating label="Rating" value="5"></wa-rating>
</div>
<div class="description">
<p>The Oracle has many enemies, I had to be sure. You do not truly know someone until you fight them.</p>
</div>
<div slot="footer">
<wa-button size="small">
<wa-icon slot="prefix" name="plus" family="sharp" variant="regular"></wa-icon>
Add to Cart
</wa-button>
<wa-button size="small" outline>
<wa-icon slot="prefix" name="bookmark" family="sharp" variant="regular"></wa-icon>
Save
</wa-button>
</div>
</wa-card>
<wa-card class="card-image product-card">
<img slot="image" src="/assets/images/kitchen-sink/keymasterII.png" alt="" />
<div class="title-rating">
<h3 class="title">Keymaker II</h3>
<wa-rating label="Rating" value="3"></wa-rating>
</div>
<div class="description">
<p>Only the One can open the door. And only during that window can that door be opened.</p>
</div>
<div slot="footer">
<wa-button size="small">
<wa-icon slot="prefix" name="plus" family="sharp" variant="regular"></wa-icon>
Add to Cart
</wa-button>
<wa-button size="small" outline>
<wa-icon slot="prefix" name="bookmark" family="sharp" variant="regular"></wa-icon>
Save
</wa-button>
</div>
</wa-card>
</section>
<section class="strata message-composer">
<wa-card class="card-header card-footer">
<div slot="header">
<div class="grouped-buttons">
<wa-tooltip content="Bold">
<!-- <wa-icon-button name="bold" family="sharp" variant="regular" label="Bold"></wa-icon-button> -->
<wa-icon-button name="bold" label="Bold"></wa-icon-button>
</wa-tooltip>
<wa-tooltip content="Italic">
<wa-icon-button name="italic" label="Italic"></wa-icon-button>
</wa-tooltip>
<wa-tooltip content="Strikethrough">
<wa-icon-button name="strikethrough" label="strikethrough"></wa-icon-button>
</wa-tooltip>
</div>
<div class="grouped-buttons">
<wa-tooltip content="Link">
<wa-icon-button name="link" label="Link"></wa-icon-button>
</wa-tooltip>
</div>
<div class="grouped-buttons">
<wa-tooltip content="Unordered List">
<wa-icon-button name="list" label="Unordered List"></wa-icon-button>
</wa-tooltip>
<wa-tooltip content="Ordered List">
<wa-icon-button name="list-ol" label="Ordered List"></wa-icon-button>
</wa-tooltip>
</div>
<div class="grouped-buttons">
<wa-tooltip content="Block Quote">
<wa-icon-button name="block-quote" label="Block Quote"></wa-icon-button>
</wa-tooltip>
</div>
<div class="grouped-buttons">
<wa-tooltip content="Code">
<wa-icon-button name="code" label="Code"></wa-icon-button>
</wa-tooltip>
<wa-tooltip content="Inline Code">
<wa-icon-button name="terminal" label="Inline Code"></wa-icon-button>
</wa-tooltip>
</div>
</div>
<div>
<p>You can see it when you look out your window or when you turn on your television. You can feel it when you go to work... when you go to church... when you pay your taxes.</p>
</div>
<div slot="footer">
<div class="tools">
<div class="grouped-buttons">
<wa-tooltip content="Add File">
<wa-icon-button name="circle-plus" label="Add File"></wa-icon-button>
</wa-tooltip>
<wa-tooltip content="Formatting">
<wa-icon-button name="font-case" label="Open Formatting"></wa-icon-button>
</wa-tooltip>
<wa-tooltip content="Emojis">
<wa-icon-button name="face-smile" label="Emoji"></wa-icon-button>
</wa-tooltip>
<wa-tooltip content="Mention">
<wa-icon-button name="at" label="Mention"></wa-icon-button>
</wa-tooltip>
</div>
<div class="grouped-buttons">
<wa-tooltip content="Record Video">
<wa-icon-button name="video" label="Video"></wa-icon-button>
</wa-tooltip>
<wa-tooltip content="Record Audio Clip">
<wa-icon-button name="microphone" label="Microphone"></wa-icon-button>
</wa-tooltip>
</div>
<div class="grouped-buttons">
<wa-tooltip content="Add Magic">
<wa-icon-button name="sparkles" label="Magic"></wa-icon-button>
</wa-tooltip>
</div>
</div>
<div class="send">
<wa-button variant="brand" size="small">
<wa-icon slot="prefix" name="paper-plane-top" family="sharp" variant="solid" label="Add File"></wa-icon>
Send
</wa-button>
</div>
</div>
</wa-card>
</section>
<section class="strata product-detail">
      <div class="product-detail-images">
        <wa-carousel pagination style="--aspect-ratio: 3/4;">
          <wa-carousel-item>
            <img alt="See it for yourself" src="/assets/images/kitchen-sink/carousel1.png" />
          </wa-carousel-item>
          <wa-carousel-item>
            <img alt="Look through the code" src="/assets/images/kitchen-sink/carousel2.png" />
          </wa-carousel-item>
          <wa-carousel-item>
            <img alt="Free your mind" src="/assets/images/kitchen-sink/carousel3.png" />
          </wa-carousel-item>
        </wa-carousel>
      </div>
      <div class="product-detail-info">
        <div class="title-rating">
          <h1 class="title">The Oracle</h1>
          <wa-rating label="Rating" value="4" style="--symbol-size: 1rem;--symbol-color-active: var(--wa-color-text-quiet)"></wa-rating>
        </div>
        <div class="price">
          <span class="price-discounted">$120</span>
          <span>$65</span>
        </div>
        <div style="margin: var(--wa-space-3xl) 0">
          <p>It is a pickle, no doubt about it. Bad news is there's no way you can really know if I'm here to help you or not, so it's really up to you. Just have to make up your own damn mind to either accept what I'm going to tell you, or reject it. Candy?</p>
          <p>We're all here to do what we're all here to do. I'm interested in one thing, Neo, the future. And believe me, I know: the only way to get there is together.</p>
        </div>
        <wa-alert variant="warning" open>
          <wa-icon slot="icon" name="clock" variant="regular"></wa-icon>
          This item will soon be discontinued
        </wa-alert>
        <div>
          <div style="margin: var(--wa-space-3xl) 0">
            <wa-radio-group label="Choose a finish" name="finish" value="Matte" class="product-finish">
              <wa-radio-button value="Matte">Matte</wa-radio-button>
              <wa-radio-button value="Glossy">Glossy</wa-radio-button>
              <wa-radio-button value="Pebbled" disabled>Pebbled</wa-radio-button>
              <wa-radio-button value="Holo">Holo</wa-radio-button>
            </wa-radio-group>
          </div>
          <div style="display: flex; align-items: end; gap: 1rem;">
            <wa-input type="number" label="How many?" style="max-width: 8rem;"></wa-input>
            <wa-button variant="brand">
              <wa-icon slot="prefix" name="basket-shopping" family="sharp" variant="solid" label="Add to Basket"></wa-icon>
              Add to Basket
            </wa-button>
            <wa-button variant="neutral">
              <wa-icon slot="prefix" name="bookmark" family="sharp" variant="regular"></wa-icon>
              Save
            </wa-button>
          </div>
        </div>
      </div>

    </section>
    <section class="strata form-examples">
      <div class="cards">
        <wa-card>
          <div class="space-vertically" style="height: 100%;">
            <wa-alert variant="success" open>
              <wa-icon slot="icon" name="circle-check"></wa-icon>
              This is the Way.
            </wa-alert>
            <wa-select label="Signet" help-text="This identifies your clan. You can change this later.">
              <wa-option>Mudhorn</wa-option>
            </wa-select>
            <wa-checkbox checked>I swear on my name and the names of the ancestors</wa-checkbox>
            <wa-button variant="success" style="margin-top: auto;">Forge</wa-button>
          </div>
        </wa-card>
        <wa-card>
          <div class="space-vertically" style="height: 100%;">
            <wa-alert variant="warning" open>
              <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
              It's a trap!
            </wa-alert>
            <wa-radio-group label="Faction" value="2">
              <wa-radio value="1">Galactic Empire</wa-radio>
              <wa-radio value="2">Rebel Alliance</wa-radio>
            </wa-radio-group>
            <wa-input label="Mission" value="Destroy the Death Star"></wa-input>
            <wa-button variant="warning" style="margin-top: auto;">Proceed</wa-button>
          </div>
        </wa-card>
        <wa-card>
          <div class="space-vertically" style="height: 100%;">
            <wa-alert variant="danger" open>
              <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
              That's no moon.
            </wa-alert>
            <wa-input label="Destination" value="Alderaan"></wa-input>
            <wa-switch checked>Jam fighter transmission</wa-switch>
            <wa-switch disabled>Lock in artillery power</wa-switch>
            <wa-button variant="danger" style="margin-top: auto;">Turn around</wa-button>
          </div>
        </wa-card>
      </div>
    </section>

  </section>
</div>
