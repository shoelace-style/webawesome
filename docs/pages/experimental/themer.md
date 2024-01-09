---
meta:
  title: Themer
  description: TODO
toc: false
---

<style>
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
        <wa-button value="[choose]" outline id="icon-chooser-trigger">
          <wa-icon name="ellipsis"></wa-icon>
          <wa-visually-hidden>Browse icons</wa-visually-hidden>
        </wa-button>
        <small slot="help-text" style="display: inline-block; line-height: 1;">It's dangerous to go alone. Take these!</small>
      </wa-radio-group>
    </div>
    <wa-select name="theme" label="Theme" value="default">
      <wa-option value="default">Default</wa-option>
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

<style>
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
    border: var(--wa-border-style) var(--wa-border-width-thin) var(--wa-color-surface-border);
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
</style>

<!-- Preview -->
<div class="preview-container">
  <section class="overlap">
    <header class="project-header">
      <div style="display: flex; align-items: center;">
        <wa-icon id="project-logo" name="p"></wa-icon>
        <span id="project-name" style="margin-inline-start: var(--wa-space-m);">Project Name</span>
      </div>
      <div>
        <wa-icon-button name="gear" label="Settings"></wa-icon-button>
        <wa-icon-button name="bell" label="Notifications"></wa-icon-button>
      </div>
    </header>
    <h1>Make it Awesome</h1>
    <wa-card>
      <div class="grid">
        <svg class="image" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="linear-gradient" x1="100" y1="166.04" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" class="gradient-start" stop-color="#f78ca8"/>
              <stop offset="1" class="gradient-stop" stop-color="#9556d9"/>
            </linearGradient>
            <style>
              .cls-4{stroke-width:0;fill:#3c2358}
            </style>
          </defs>
          <g id="bespin">
            <path id="sky" d="M171.75 15.52c1.99-.3 3.87 0 5.6 1.07.31.2.45.15.65-.16 2.11-3.3 5.04-5.48 8.91-6.23 4.78-.93 8.95.38 12.48 3.73.2.19.41.37.61.56 0-4.67 0-9.34.01-14.01-.01-.39-.1-.48-.49-.48C133.02.01 66.51 0 0 0v78.43c.31.03.46.29.66.46 6.02 5.38 9.65 12.05 10.81 20.05.12.82.19 1.65.24 2.48.7-.3 1.27-.82 1.93-1.2 2.12-1.21 4.37-1.99 6.82-2.23 4.52-.44 8.61.69 12.21 3.44 3.69 2.82 5.9 6.56 6.6 11.17.15.99.21 2 .2 3 0 .26.02.46.32.57 2.14.78 4 1.98 5.6 3.61.04.04.08.06.13.09.11.11.21.22.32.32.66.84 1.33 1.68 1.87 2.62 1.63 2.87 2.34 5.93 2.03 9.23-.09.92-.33 1.8-.46 2.71v.22c1.01-.42 2.01-.84 3.08-1.11 2.26-.59 4.54-.71 6.85-.37 2.95.43 5.62 1.53 7.96 3.35 3.66 2.85 5.9 6.57 6.59 11.18.15.99.21 2 .2 3 0 .26.02.46.32.57 2.14.78 4 1.98 5.59 3.61.04.04.08.06.13.09l.32.32c.66.84 1.33 1.68 1.87 2.62 1.3 2.27 2.03 4.7 2.09 7.32.01.56.01.57.48.29 3.5-2.11 7.27-3.5 11.3-4.15 1.49-.24 2.99-.38 4.5-.34.5.01.55-.14.39-.55-.73-1.9-1.02-3.88-.94-5.91.14-3.46 1.33-6.53 3.52-9.2 1.73-2.12 3.9-3.62 6.44-4.61.22-.09.36-.17.35-.43-.04-1.69.17-3.35.54-5-3.53-.63-7.06-1.27-10.59-1.89-4.64-.82-9.29-1.63-13.93-2.45-4.27-.75-8.53-1.51-12.8-2.26-.72-.13-.72-.12-.72-.85v-2.5c0-.26.07-.45.24-.65a52.26 52.26 0 0 1 15.31-11.92c.83-.43 1.69-.82 2.52-1.25.21-.11.42-.12.65-.12 1.35 0 2.71-.03 4.06.01.62.02 1.14-.16 1.65-.45 1.73-.99 3.47-1.96 5.26-2.83 3.11-1.52 6.4-2.45 9.83-2.87.32-.04.41-.17.4-.46v-2.71c0-.29.08-.4.38-.39 1.18.01 2.36.01 3.54 0 .29 0 .35.11.34.36-.01.75 0 1.49-.01 2.24 0 .32.05.45.42.44 1.06-.04.95.1.95-.96 0-1.42.01-2.85 0-4.27 0-.36.09-.48.46-.47.87.03 1.74.02 2.6 0 .36 0 .58.06.51.48-.06.36.09.5.46.47.33-.03.66.01.99 0 .32-.02.42.09.42.41-.02 1.21.01 2.43-.02 3.64 0 .4.12.54.5.48.1-.02.21-.01.31 0 .43.05.58-.12.57-.56-.02-1.96 0-3.92-.02-5.88 0-.43.11-.56.55-.55 1.08.03 2.15.03 3.23 0 .38 0 .5.09.49.48-.01 2.1 0 4.2 0 6.3.02.03.05.05.07.08q1.26.08 1.26-1.13c0-.69.02-1.39 0-2.08-.01-.35.11-.44.44-.43 1.68.02 3.37.02 5.05 0 .36 0 .48.09.47.46-.03.97 0 1.94-.01 2.91 0 .62.48.44.8.5.37.07.57-.06.56-.5-.02-1.65 0-3.3-.02-4.94 0-.37.07-.53.48-.5.55.04 1.11.03 1.66 0 .35-.02.44.1.44.44-.01 1.68 0 3.37-.02 5.05 0 .45.1.59.56.59.8 0 .8.03.8-.79v-1.56c0-.25.09-.34.33-.33.73 0 1.46.01 2.19 0 .32 0 .37.15.37.42v2.24c0 .29.06.43.4.44.41 0 .82.11 1.22.17.13-.28.41-.36.65-.49 2.41-1.34 4.98-2.17 7.73-2.42.61-.05 1.21-.08 1.82-.08.63 0 .7-.04.72-.72.04-1.01.18-2 .4-2.98.73-3.42 2.19-6.49 4.48-9.15 2.94-3.42 6.6-5.63 11.05-6.43 4.65-.83 9 .04 13.01 2.53 2.81 1.74 5.01 4.09 6.64 6.96.19.33.33.46.71.2 1.89-1.34 4.03-1.88 6.32-1.86V48.36H167.6a11.05 11.05 0 0 1-10.92-9.3c-.87-5.46 2.69-10.87 8.09-12.24.49-.12.63-.24.45-.78-1.54-4.7 1.62-9.76 6.52-10.5ZM61.4 62c-2.25 2.53-5.1 3.74-8.48 3.74-10.4 0-20.8-.01-31.19 0-3.73 0-6.89-1.3-9.42-4.03-1.78-1.92-2.83-4.2-3.15-6.83-.39-3.28.46-6.21 2.37-8.88.27-.38.67-.66.88-1.09l.53-.53c.97-.79 1.93-1.62 3.11-2.06.89-.33 1.35-.75 1.32-1.79-.03-1.58.32-3.14.95-4.6 2.02-4.69 5.5-7.65 10.57-8.42 5.92-.9 10.54 1.37 13.85 6.32.18.27.3.34.61.16 4.59-2.69 10.17-.74 12.06 4.23.66 1.75.66 3.53.06 5.29-.13.39-.06.52.34.63 4.51 1.28 7.33 4.21 8.18 8.82.62 3.38-.3 6.44-2.6 9.02Z" stroke-width="0" fill="url(#linear-gradient)"/>
            <path id="city" class="cls-4" d="M179.31 119.35a51.77 51.77 0 0 0-11.3-7.13c-.48-.22-.93-.48-1.52-.47-1.44.04-2.88.01-4.32.02-.25 0-.47-.04-.7-.16-1.47-.81-2.95-1.61-4.42-2.41-3.32-1.8-6.85-2.99-10.59-3.5-.41-.06-.81-.16-1.22-.17-.34 0-.41-.14-.4-.44.01-.75 0-1.49 0-2.24 0-.27-.05-.42-.37-.42-.73.02-1.46.01-2.19 0-.25 0-.34.09-.33.33.01.52 0 1.04 0 1.56 0 .82 0 .79-.8.79-.47 0-.57-.15-.56-.59.03-1.68 0-3.37.02-5.05 0-.34-.09-.46-.44-.44-.55.03-1.11.03-1.66 0-.41-.03-.49.13-.48.5.02 1.65 0 3.3.02 4.94 0 .44-.19.57-.56.5-.32-.06-.81.12-.8-.5.01-.97-.01-1.94.01-2.91 0-.37-.11-.46-.47-.46-1.68.02-3.37.02-5.05 0-.33 0-.46.09-.44.43.03.69 0 1.39 0 2.08q0 1.22-1.26 1.13s-.05-.05-.07-.08c0-2.1-.02-4.2 0-6.3 0-.4-.11-.49-.49-.48-1.08.03-2.15.03-3.23 0-.43-.01-.55.11-.55.55.02 1.96 0 3.92.02 5.88 0 .44-.15.61-.57.56-.1-.01-.21-.02-.31 0-.38.06-.51-.08-.5-.48.03-1.21 0-2.43.02-3.64 0-.32-.1-.43-.42-.41-.33.02-.66-.02-.99 0-.37.03-.52-.11-.46-.47.07-.42-.15-.48-.51-.48-.87.02-1.74.02-2.6 0-.37-.01-.47.11-.46.47.02 1.42 0 2.85 0 4.27 0 1.06.11.92-.95.96-.37.01-.43-.12-.42-.44.02-.75 0-1.49.01-2.24 0-.26-.06-.37-.34-.36-1.18.01-2.36.01-3.54 0-.3 0-.38.1-.38.39.01.9 0 1.8 0 2.71 0 .29-.08.42-.4.46-3.43.42-6.72 1.35-9.83 2.87-1.79.87-3.53 1.84-5.26 2.83-.51.29-1.03.48-1.65.45-1.35-.05-2.71-.01-4.06-.01-.22 0-.44.01-.65.12-.84.43-1.69.82-2.52 1.25a52.39 52.39 0 0 0-15.31 11.92c-.18.2-.25.39-.24.65.01.83 0 1.67 0 2.5 0 .73 0 .72.72.85 4.27.75 8.53 1.51 12.8 2.26 4.64.82 9.29 1.63 13.93 2.45l10.59 1.89c.89.15 1.77.31 2.66.46.53.09 1.02.19 1.49.52 3.96 2.84 7.93 5.66 11.9 8.48.33.24.46.48.46.89-.01 6.16 0 12.32 0 18.49 1.19-.05 2.38.05 3.56.07 0-.66.02-1.32.02-1.98v-16.66c0-.36.09-.59.4-.81 3.96-2.8 7.92-5.61 11.86-8.45.68-.49 1.45-.52 2.21-.66 4.02-.72 8.05-1.42 12.08-2.13.12-.19.24-.38.35-.57 2.78-4.5 6.79-7.02 12.07-7.48 2.11-.18 4.13.21 6.1.91.39.14.5.09.58-.33.28-1.36.75-2.66 1.31-3.93.46-1.03 1.07-1.97 1.61-2.96-.07-.05-.15-.09-.22-.14Z"/>
            <path id="forefront_clouds" data-name="forefront clouds" d="M0 78.44c.31.03.46.29.66.46 6.02 5.38 9.65 12.05 10.81 20.05.12.82.19 1.65.24 2.48.08 1.35.06 2.7-.02 4.05-.2 3.44-.96 6.75-2.23 9.96-.65 1.65-1.45 3.23-2.36 4.75-.28.47-.26.49.27.54.47.04.93.08 1.39.17 4.47.86 7.92 3.23 10.33 7.08 1.51 2.41 2.21 5.08 2.23 7.91 0 1.73-.35 3.41-.96 5.03-.13.36-.1.49.31.58 4.47 1.04 8.2 3.32 11.16 6.83 2.86 3.39 4.42 7.32 4.69 11.72.21 3.46-.46 6.77-1.99 9.89-.25.51-.18.77.24 1.12 2.2 1.82 4.02 3.97 5.46 6.43.23.39.38.36.7.14 3.29-2.16 6.92-2.9 10.74-2.16 6.1 1.18 10.12 4.82 12.04 10.74.18.55.17.55.65.19 1.39-1.07 2.85-2.04 4.4-2.87 5.52-2.95 11.39-4.27 17.65-3.87 2.72.17 5.37.67 7.95 1.5a31.63 31.63 0 0 1 8.88 4.5c.46.33.51.31.6-.16 1.16-6.42 4.3-11.66 9.42-15.69 3.29-2.59 7.03-4.22 11.16-4.95.97-.17 1.96-.22 2.93-.38 1.19-.05 2.38.05 3.56.07 5.54.48 10.39 2.61 14.66 6.27.13-1.32.2-2.53.43-3.73 1.46-7.48 5.45-13.2 11.93-17.2.39-.24.46-.36.19-.76-2.18-3.3-2.78-6.93-2.15-10.8.25-1.57.82-3.04 1.5-4.47.12-.19.24-.38.35-.57 2.78-4.5 6.79-7.02 12.07-7.48 2.11-.18 4.13.21 6.1.91.39.14.5.09.58-.33.28-1.36.75-2.66 1.31-3.93.46-1.03 1.07-1.97 1.61-2.96.08-.09.17-.17.24-.27 1.04-1.51 2.28-2.84 3.68-4.01 3.67-3.05 7.89-4.61 12.66-4.71 1.31-.03 2.59.17 3.88.32v88.68c0 .37-.05.49-.47.49-66.36-.01-132.71-.01-199.07 0-.42 0-.46-.13-.46-.5V78.43Z" fill="#f9b4d9" stroke-width="0"/>
            <path id="upper_clouds" data-name="upper clouds" d="M199.99 48.34H167.6a11.05 11.05 0 0 1-10.92-9.3c-.87-5.46 2.69-10.87 8.09-12.24.49-.12.63-.24.45-.78-1.54-4.7 1.62-9.76 6.52-10.5 1.99-.3 3.87 0 5.6 1.07.31.2.45.15.65-.16 2.11-3.3 5.04-5.48 8.91-6.23 4.78-.93 8.95.38 12.48 3.73.2.19.41.37.61.56v33.85ZM12.41 44.92c-.21.43-.61.71-.88 1.09-1.91 2.66-2.76 5.59-2.37 8.88.31 2.63 1.37 4.91 3.15 6.83 2.53 2.73 5.68 4.04 9.42 4.03 10.4-.02 20.8 0 31.19 0 3.38 0 6.23-1.2 8.48-3.74 2.3-2.59 3.22-5.64 2.6-9.02-.85-4.61-3.68-7.53-8.18-8.82-.4-.11-.48-.24-.34-.63.6-1.77.6-3.55-.06-5.29-1.89-4.96-7.46-6.91-12.06-4.23-.31.18-.43.11-.61-.16-3.32-4.95-7.93-7.22-13.85-6.32-5.07.77-8.55 3.72-10.57 8.42-.63 1.47-.98 3.02-.95 4.6.02 1.05-.43 1.46-1.32 1.79-1.18.44-2.14 1.27-3.11 2.06l-.53.53Z" fill="#eeb6e5" stroke-width="0"/>
            <path id="background_clouds" data-name="background clouds" d="M199.99 110.83c-1.29-.15-2.57-.34-3.88-.32-4.77.09-8.99 1.66-12.66 4.71-1.41 1.17-2.64 2.5-3.68 4.01-.07.1-.16.18-.24.27-.07-.05-.15-.09-.22-.14a51.77 51.77 0 0 0-11.3-7.13c-.48-.22-.93-.48-1.52-.47-1.44.04-2.88.01-4.32.02-.25 0-.47-.04-.7-.16-1.47-.81-2.95-1.61-4.42-2.41-3.32-1.8-6.85-2.99-10.59-3.5.13-.28.41-.36.65-.49 2.41-1.34 4.98-2.17 7.73-2.42.61-.05 1.21-.08 1.82-.08.63 0 .7-.04.72-.72.04-1.01.18-2 .4-2.98.73-3.42 2.19-6.49 4.48-9.15 2.94-3.42 6.6-5.63 11.05-6.43 4.65-.83 9 .04 13.01 2.53 2.81 1.74 5.01 4.09 6.64 6.96.19.33.33.46.71.2 1.89-1.34 4.03-1.88 6.32-1.86v19.58Zm-72.62 35.16c0-.41-.12-.65-.46-.89-3.98-2.81-7.95-5.63-11.9-8.48-.47-.34-.96-.44-1.49-.52-.89-.15-1.77-.3-2.66-.46-.37 1.65-.58 3.31-.54 5 0 .26-.13.35-.35.43-2.54.98-4.71 2.49-6.44 4.61-2.19 2.68-3.39 5.74-3.52 9.2-.08 2.03.2 4.01.94 5.91.16.42.11.56-.39.55-1.51-.04-3.01.1-4.5.34-4.03.65-7.8 2.04-11.3 4.15-.47.28-.46.28-.48-.29-.07-2.62-.79-5.05-2.09-7.32-.54-.94-1.21-1.78-1.87-2.62-.11-.11-.21-.22-.32-.32-.04-.03-.09-.05-.13-.09a14.968 14.968 0 0 0-5.59-3.61c-.3-.11-.32-.31-.32-.57.02-1.01-.05-2.01-.2-3-.7-4.61-2.93-8.33-6.59-11.18-2.35-1.83-5.02-2.92-7.96-3.35-2.31-.34-4.59-.21-6.85.37-1.06.28-2.07.69-3.08 1.11-.1-.07-.07-.15 0-.22.13-.91.37-1.79.46-2.71.31-3.31-.39-6.36-2.03-9.23-.53-.94-1.2-1.77-1.87-2.62-.11-.11-.21-.22-.32-.32-.04-.03-.09-.05-.13-.09a14.926 14.926 0 0 0-5.6-3.61c-.3-.11-.32-.31-.32-.57.02-1.01-.05-2.01-.2-3-.7-4.61-2.91-8.35-6.6-11.17-3.6-2.75-7.69-3.88-12.21-3.44-2.44.24-4.69 1.02-6.82 2.23-.66.38-1.23.89-1.93 1.2.08 1.35.06 2.7-.02 4.05-.2 3.44-.96 6.75-2.23 9.96-.65 1.65-1.45 3.23-2.36 4.75-.28.47-.26.49.27.54.47.04.93.08 1.39.17 4.47.86 7.92 3.23 10.33 7.08 1.51 2.41 2.21 5.08 2.23 7.91 0 1.73-.35 3.41-.96 5.03-.13.36-.1.49.31.58 4.47 1.04 8.2 3.32 11.16 6.83 2.86 3.39 4.42 7.32 4.69 11.72.21 3.46-.46 6.77-1.99 9.89-.25.51-.18.77.24 1.12 2.2 1.82 4.02 3.97 5.46 6.43.23.39.38.36.7.14 3.29-2.16 6.92-2.9 10.74-2.16 6.1 1.18 10.12 4.82 12.04 10.74.18.55.17.55.65.19 1.39-1.07 2.85-2.04 4.4-2.87 5.52-2.95 11.39-4.27 17.65-3.87 2.72.17 5.37.67 7.95 1.5a31.63 31.63 0 0 1 8.88 4.5c.46.33.51.31.6-.16 1.16-6.42 4.3-11.66 9.42-15.69 3.29-2.59 7.03-4.22 11.16-4.95.97-.17 1.96-.22 2.93-.38v-18.49Zm18.22 24.82c.13-1.32.2-2.53.43-3.73 1.46-7.48 5.45-13.2 11.93-17.2.39-.24.46-.36.19-.76-2.18-3.3-2.78-6.93-2.15-10.8.25-1.57.82-3.04 1.51-4.47-4.03.71-8.06 1.41-12.08 2.13-.75.14-1.52.17-2.21.66-3.94 2.84-7.9 5.65-11.86 8.45-.31.22-.4.45-.4.81.01 5.55 0 11.11 0 16.66 0 .66-.01 1.32-.02 1.98 5.54.48 10.39 2.61 14.66 6.27Z" fill="#fddce4" stroke-width="0"/>
            <path id="fighters" d="m105.65 67.02-.66-2.46c-.59-2.23-1.19-4.46-1.78-6.68-.09-.35-.23-.66-.62-.77-.71-.19-1.18.32-1.01 1.11.16.73.38 1.44.57 2.16q.39 1.49-1.18 1.51c-.29 0-.53-.02-.74-.27-2.08-2.35-6.01-1.53-6.96 1.49-.21.67-.52 1.09-1.16 1.31-.15.05-.29.13-.42.21-.34.22-.47.08-.56-.27-.25-1.01-.54-2.01-.8-3.02-.17-.64-.59-.94-1.12-.79-.45.13-.65.6-.49 1.2.38 1.43.76 2.85 1.14 4.27.44 1.64.87 3.28 1.31 4.93.09.35.24.67.6.8.29.1.59.07.83-.15.25-.23.33-.51.24-.85-.29-1.05-.57-2.11-.84-3.17-.04-.15-.22-.39.08-.48.52-.17 1.07-.1 1.6-.11.31 0 .42.29.6.46 2.12 2.06 5.82 1.26 6.75-1.52.27-.8.68-1.27 1.42-1.53.08-.03.16-.07.23-.11.34-.23.49-.14.59.27.25 1.04.54 2.08.83 3.12.15.53.49.74.96.68.41-.06.67-.4.67-.94-.01-.07-.04-.22-.08-.37Zm-6.83-4.35c.3 0 .48.3.5.56.03.33-.34.19-.44.31-.28 0-.45-.09-.43-.32.02-.24.12-.54.37-.55Zm-1.4-.71c.2.07.55-.06.51.27-.03.23-.14.57-.5.56-.36 0-.35-.34-.39-.58-.06-.34.23-.19.37-.26Zm-2.73 2.19c.06-.17-.01-.49.31-.44.23.04.51.16.51.49 0 .37-.32.36-.56.38-.28.03-.26-.21-.26-.42Zm1.23 1.52c-.02.24-.13.46-.37.58-.29-.13-.51-.34-.51-.62 0-.3.32-.26.52-.29.23-.03.38.11.36.34Zm.07-2.47c-.25-.01-.51-.14-.62-.39-.05-.12.49-.58.64-.54.28.07.2.36.31.53.01.25-.13.41-.32.4Zm.98 3.77c-.13-.17-.6.09-.54-.33.03-.22.15-.58.51-.56.42.02.4.38.43.66.03.25-.19.24-.4.23Zm.2-1.74a.8.8 0 0 1-.81-.78c0-.43.4-.85.82-.85.43 0 .84.42.83.83-.02.47-.37.8-.85.79Zm1.22 1.38c-.32-.01-.3-.38-.32-.61-.02-.21.2-.34.39-.3.22.05.43.19.58.38-.18.27-.38.54-.65.53Zm1-1.43c-.25 0-.51-.16-.53-.48-.02-.37.31-.33.52-.38.29-.07.3.14.3.38-.05.17.02.49-.29.48Zm41.06 1.2c-.52-.13-.91.16-1.07.78-.28 1.04-.56 2.08-.83 3.12-.08.3-.2.37-.47.23-.35-.19-.71-.37-1.07-.54-.28-.13-.4-.32-.47-.63-.22-.96-.68-1.79-1.49-2.37-1.84-1.33-4.08-1.13-5.66.5-.14.14-.26.27-.48.26-.4-.02-.8-.01-1.2-.02-.4-.01-.54-.18-.41-.6.29-1 .55-2.01.82-3.01.15-.59-.04-1.03-.48-1.15-.55-.15-.95.09-1.12.71-.84 3.13-1.68 6.27-2.51 9.4-.15.56.09 1.01.55 1.12.5.11.91-.16 1.07-.74.21-.79.41-1.58.64-2.36.33-1.16.33-1.15 1.46-.63.36.17.62.36.73.79.47 1.94 2.06 3.16 4.08 3.17 1.22.07 2.21-.47 3.07-1.32.14-.14.26-.27.48-.26.43.02.86 0 1.3.07.4.05.42.21.33.55-.29 1.02-.56 2.04-.81 3.07-.14.58.08.98.51 1.1.52.13.94-.11 1.09-.69.84-3.11 1.67-6.23 2.5-9.35.16-.61-.07-1.06-.54-1.18Zm-8.08 1.37c.16-.04.32 0 .29.25-.11.23-.01.64-.45.63-.34-.01-.48-.37-.47-.59.01-.33.4-.22.63-.29Zm-2.02 1.31c.04-.27.22-.58.52-.57.25 0 .34.33.36.56.01.27-.19.34-.45.31-.15-.08-.47-.02-.43-.31Zm-.35 1.49c.01-.21-.02-.46.27-.4.22.04.56 0 .55.38 0 .32-.26.46-.51.48-.32.03-.26-.29-.31-.46Zm1.33 1.9c-.29 0-.59-.24-.63-.52-.03-.24.3-.36.53-.4.21-.04.39.1.42.37-.13.16.01.55-.32.55Zm1.34.36c-.22 0-.41-.03-.35-.28.07-.25.04-.61.42-.61.37 0 .51.37.51.61 0 .32-.4.19-.58.28Zm-.22-1.75c-.44-.02-.79-.37-.78-.8 0-.43.43-.84.85-.82.43.01.83.44.8.86-.03.47-.39.78-.87.77Zm.92-2.38c.03-.21 0-.58.31-.56.26.01.49.24.64.5-.1.25-.33.36-.56.41-.24.05-.43-.11-.39-.35Zm1.26 2.83c-.05.27-.25.59-.51.58-.24 0-.37-.36-.4-.6-.03-.24.21-.32.47-.32.15.1.51 0 .45.34Zm.06-1.09c-.22-.04-.52-.03-.52-.37 0-.34.27-.5.54-.5.29 0 .24.31.28.47 0 .25-.03.45-.3.4Z" fill="#78206a" stroke-width="0"/>
            <path id="falcon" class="cls-4" d="M55.44 150.43c-2.18.04-3.97 1-5.51 2.46-.38.36-.74.65-1.3.54-.15-.03-.27.04-.39.11-.75.43-1.51.84-2.24 1.31-.58.37-1.07 1.2-.55 2.06.15.26.63.36.48.73-.12.29-.39.52-.6.78-.13.16-.26.33-.39.49-1.22 1.46-1.16 1.37-.19 3.01.29.5.51.56 1.02.27.92-.52 1.83-1.06 2.75-1.58q1.13-.65 1.76.47c.32.57.28.76-.29 1.09-1.06.62-2.13 1.24-3.2 1.84-.42.23-.52.52-.26.93.16.25.3.51.44.76.45.77.68.87 1.57.73l5.24-.81c1.51-.23 3.02-.41 4.43-1.05 2.93-1.33 4.49-3.58 4.63-6.25.01-4.64-3.31-7.94-7.39-7.87Zm1.74 2.26c.32 0 .45.22.48.51-.03.29-.17.51-.48.5-.31 0-.54-.17-.53-.51 0-.33.2-.51.53-.5Zm-1.59 7.62c-1.44 0-2.67-1.18-2.67-2.56 0-1.19 1.08-2.74 2.63-2.55 1.34-.25 2.62 1.11 2.62 2.47 0 1.46-1.14 2.64-2.58 2.64Zm3.51-4.96c.02-.28.19-.49.51-.47.33.02.51.19.5.53-.01.34-.27.44-.5.54-.34-.1-.53-.3-.51-.6Zm1.16 3.76c-.28-.02-.49-.18-.49-.5 0-.33.2-.49.51-.52.33.02.5.2.5.5 0 .32-.18.53-.51.51Zm-3.14-1.42c0 .88-.67 1.57-1.52 1.58-.88 0-1.64-.71-1.64-1.53 0-.84.75-1.58 1.6-1.59.86 0 1.56.68 1.56 1.54Z"/>
          </g>
        </svg>
        <div class="content">
          <h2>Here's a heading</h2>
          <p>
            This paragraph is a preview of your body text. We've put enough text
            here to give you a sense of your theme's line length and line height.
            Adjust your theme's spacing and size to get the fabulous reading
            experience that you deserve. It's on us - cheers!
          </p>
          <p>
            <wa-button variant="brand">Action</wa-button>
            <wa-button variant="text">Low emphasis action &rarr;</wa-button>
          </p>
        </div>
      </div>
    </wa-card>
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

<style>
  html {
    background: var(--wa-color-surface-default);
    background-attachment: fixed;
    background-image: radial-gradient(var(--wa-color-surface-lowered) 1.5px, transparent 0);
    background-size: 28px 28px;
    background-position: -19px -19px;
    min-height: 100vh;
  }

  main {
    margin-left: 0;
  }

  #menu-toggle,
  #sidebar {
    display: none;
  }

  .content {
    max-width: 1024px;
    gap: 0;
  }

  #project-logo {
    font-size: 1.25rem;
  }

  .preview-container {
    background: var(--wa-color-surface-lowered);
    padding-inline: var(--wa-space-2xl);
    padding-block-end: var(--wa-space-2xl);
    translate: calc((var(--knobs-width) + 2rem) / 2);
  }

  .overlap {
    position: relative;
    color: var(--wa-color-text-normal);
    padding: 0 var(--wa-space-m);
    z-index: 1;
  }

  .overlap::after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--wa-space-2xl));
    left: calc(-1 * var(--wa-space-2xl));
    width: calc(100% + var(--wa-space-2xl) * 2);
    height: 300px;
    background: var(--wa-color-brand-spot-darker);
    z-index: -1;
  }

  .overlap h1 {
    color: var(--wa-color-brand-text-on-spot);
  }

  .overlap .grid {
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: center;
    gap: var(--wa-space-xl);
    padding: var(--wa-space-m);
  }

  .overlap .image {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    border-radius: var(--wa-corners-m);
    align-self: start;
  }

  .overlap .image #city,
  .overlap .image #falcon {
    fill: color-mix(in oklab, var(--wa-color-brand-spot), black 50%);
  }

  .overlap .image #fighters {
    fill: color-mix(in oklab, var(--wa-color-brand-spot), black 30%);
  }

  .overlap .image #upper_clouds {
    fill: color-mix(in oklab, var(--wa-color-brand-spot), white 80%);
  }

  .overlap .image #background_clouds {
    fill: color-mix(in oklab, var(--wa-color-brand-spot), white 90%);
  }

  .overlap .image #forefront_clouds {
    fill: color-mix(in oklab, var(--wa-color-brand-spot), white 70%);
  }

  .overlap .image .gradient-start {
    stop-color: color-mix(in oklab, var(--wa-color-brand-spot), white 80%);
  }

  .overlap .image .gradient-stop {
    stop-color: color-mix(in oklab, var(--wa-color-brand-spot), white 0%);
  }

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

  .space-vertically {
    display: flex;
    flex-direction: column;
    gap: var(--gap, 1.25rem);
  }

  .project-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid white;
    color: var(--wa-color-brand-text-on-spot);
    border-bottom: 1px solid color-mix(in oklab, var(--wa-color-brand-text-on-spot), transparent 50%);
    padding-bottom: var(--wa-space-m);
  }

  .project-header wa-icon-button {
    & + * {
      margin-inline-start: var(--wa-space-m);
    }

    &::part(base) {
      color: var(--wa-color-brand-text-on-spot);
    }
  }

  wa-select[label="Signet"]::part(form-control-help-text) {
    line-height: 1.5;
  }

  @media screen and (max-width: 670px) {
    .overlap .grid {
      display: flex;
      flex-direction: column;
    }
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

<!-- Style Guide -->
<wa-card id="style-guide">

## Typography

Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Amet mauris commodo quis imperdiet. Bibendum ut tristique et egestas quis ipsum suspendisse. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat.

Cras pulvinar mattis nunc sed blandit libero. Facilisis magna etiam tempor orci. Scelerisque eleifend donec pretium vulputate sapien nec. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque.

> What is a Web year now, about three months? And when people can browse around, discover new things, and download them fast, when we all have agents - then Web years could slip by before human beings can notice.
>
> — Tim Berners-Lee

## Inline Text

<div class="docs-grid">
  <p><strong>Bold</strong></p>
  <p><em>Italics</em></p>
  <p><u>Underline</u></p>
  <p><del>Deleted</del></p>
  <p><ins>Inserted</ins></p>
  <p><s>Strike-through</s></p>
  <p><small>Small</small></p>
  <p><span>Text <sub>Sub</sub></span></p>
  <p><span>Text <sup>Sup</sup></span></p>
  <p><abbr title="Abbreviation">Abbr.</abbr></p>
  <p><kbd>Keyboard</kbd></p>
  <p><mark>Highlighted</mark></p>
  <p><a href="#">Link text</a></p>
  <p><code>Inline code</code></p>
</div>

## Lists

- List item 1
- List item 2
- List item 3
  - Subitem a
  - Subitem b

1. List item 1
2. List item 2
3. List item 3
   - Subitem a
   - Subitem b

## Headings

### Heading 3

Feugiat nisl pretium fusce id. Ipsum dolor sit amet consectetur adipiscing elit. Eget nunc lobortis mattis aliquam faucibus purus. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Urna condimentum mattis pellentesque id nibh tortor id.

#### Heading 4

Gravida arcu ac tortor dignissim convallis aenean. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Donec adipiscing tristique risus nec feugiat in.

##### Heading 5

Enim diam vulputate ut pharetra sit. Enim facilisis gravida neque convallis a cras. Enim neque volutpat ac tincidunt vitae semper. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium.

###### Heading 6

Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Facilisis mauris sit amet massa vitae. Nunc faucibus a pellentesque sit amet porttitor. Adipiscing tristique risus nec feugiat in fermentum.

## Details

Individual details look like this.

<details>
  <summary>Tincidunt nunc pulvinar</summary>
  <p>Ut lectus arcu bibendum at varius. Convallis a cras semper auctor neque vitae. Odio pellentesque diam volutpat commodo sed egestas. Amet dictum sit amet justo donec enim diam vulputate ut.</p>
</details>

Grouping them provides accordion-style functionality.

<details>
  <summary>Enim diam</summary>
  <p>Nunc faucibus a pellentesque sit amet porttitor. Adipiscing tristique risus nec feugiat in fermentum. Leo duis ut diam quam nulla porttitor massa id. Mauris nunc congue nisi vitae.</p>
</details>

<details>
  <summary>Arcu non odio</summary>
  <p>Sed libero enim sed faucibus turpis in eu mi bibendum. Nunc mi ipsum faucibus vitae aliquet nec. Ultricies tristique nulla aliquet enim tortor. Tellus at urna condimentum mattis pellentesque.</p>
</details>

<details>
  <summary>Ut porttitor</summary>
  <p>Eu facilisis sed odio morbi quis commodo odio aenean sed. Sit amet purus gravida quis blandit turpis cursus. Eu consequat ac felis donec et odio pellentesque diam volutpat.</p>
</details>

## Code Blocks

```
// do a thing
export function thing() {
  return true;
}
```

## Images

![cat](https://placekitten.com/1200/800)

## Tables

<table>
  <caption>I'm just a table</caption>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
      <th>Column 4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
  </tbody>
</table>

## Definition Lists

<dl>
  <dt>Definition 1</dt>
  <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
  <dt>Definition 2</dt>
  <dd>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</dd>
  <dt>Definition 3</dt>
  <dd>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</dd>
</dl>

<h2>Form Control Validation</h2>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
  <div>
    <h3>Valid</h3>
    <wa-input class="wa-valid" label="Name" help-text="Just a first name is fine" placeholder="Enter your name"></wa-input><br>
    <wa-select class="wa-valid" label="Choose one" help-text="Make a choice already">
      <wa-option>There can be only one!</wa-option>
      <wa-option>Well, maybe two is OK</wa-option>
    </wa-select>
    <wa-textarea class="wa-valid" label="Bio" help-text="Tell us about yourself" placeholder="Enter a bio"></wa-textarea><br>
    <wa-range class="wa-valid" value="50" label="Volume" help-text="Crank it up" tooltip="none"></wa-range><br>
    <wa-checkbox class="wa-valid" checked>I am awesome</wa-checkbox><br>
    <wa-checkbox class="wa-valid">So am I</wa-checkbox><br><br>
    <wa-switch class="wa-valid" checked>Still awesome</wa-switch><br>
    <wa-switch class="wa-valid">More awesome</wa-switch><br><br>
    <wa-radio-group class="wa-valid" label="Select an option" name="a" value="1">
      <wa-radio value="1">Option 1</wa-radio>
      <wa-radio value="2">Option 2</wa-radio>
      <wa-radio value="3">Option 3</wa-radio>
    </wa-radio-group><br>
    <wa-button variant="brand">Submit Form</wa-button>
  </div>
  <div>
    <h3>Invalid</h3>
    <wa-input class="wa-invalid" label="Name" help-text="Just a first name is fine" placeholder="Enter your name"></wa-input><br>
    <wa-select class="wa-invalid" label="Choose one" help-text="Make a choice already">
      <wa-option>There can be only one!</wa-option>
      <wa-option>Well, maybe two is OK</wa-option>
    </wa-select>
    <wa-textarea class="wa-invalid" label="Bio" help-text="Tell us about yourself" placeholder="Enter a bio"></wa-textarea><br>
    <wa-range class="wa-invalid" value="50" label="Volume" help-text="Crank it up" tooltip="none"></wa-range><br>
    <wa-checkbox class="wa-invalid" checked>I am awesome</wa-checkbox><br>
    <wa-checkbox class="wa-invalid">So am I</wa-checkbox><br><br>
    <wa-switch class="wa-invalid" checked>Still awesome</wa-switch><br>
    <wa-switch class="wa-invalid">More awesome</wa-switch><br><br>
    <wa-radio-group class="wa-invalid" label="Select an option" name="a" value="1">
      <wa-radio value="1">Option 1</wa-radio>
      <wa-radio value="2">Option 2</wa-radio>
      <wa-radio value="3">Option 3</wa-radio>
    </wa-radio-group><br>
    <wa-button variant="brand">Submit Form</wa-button>
  </div>
</div>

  </div>
  </section>
</div>

<style>
  #style-guide {
    margin-block-start: var(--wa-flow-spacing);
  }

  #style-guide wa-card {
    padding-block: var(--wa-space-xl);
    padding-inline: var(--wa-space-2xl);
  }
</style>
