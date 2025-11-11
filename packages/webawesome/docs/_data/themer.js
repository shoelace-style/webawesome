/**
 * All themes used in the themer.
 */
export const themes = [
  {
    //
    // #region Default
    //
    name: 'Default',
    description: 'Your trusty companion, like a perfectly broken-in pair of jeans.',
    filename: 'default.css',
    isPro: false,
    fonts: {
      body: {
        name: 'OS Default (sans-serif)',
        css: 'ui-sans-serif, system-ui, sans-serif',
        href: null,
      },
      heading: {
        name: 'OS Default (sans-serif)',
        css: 'ui-sans-serif, system-ui, sans-serif',
        href: null,
      },
      code: {
        name: 'OS Default (monospace)',
        css: 'ui-monospace, monospace',
        href: null,
      },
      longform: {
        name: 'OS Default (serif)',
        css: 'ui-serif, serif',
        href: null,
      },
    },
    icons: {
      family: 'classic',
      weight: 1,
    },
    palette: {
      name: 'Default',
      filename: 'default.css',
    },
    colorBrand: {
      color: 'blue',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'ui-sans-serif, system-ui, sans-serif',
      '--wa-font-family-heading': 'var(--wa-font-family-body)',
      '--wa-font-family-code': 'ui-monospace, monospace',
      '--wa-font-family-longform': 'ui-serif, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 600,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 1,
      '--wa-space-scale': 1,
      '--wa-border-width-scale': 1,
    },
  },
  // #endregion

  //
  // #region Awesome
  //
  {
    name: 'Awesome',
    description: 'Punchy and vibrant, the rock star of themes.',
    filename: 'awesome.css',
    isPro: false,
    fonts: {
      body: {
        name: 'Quicksand',
        css: 'Quicksand, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Quicksand:wght@300..700&display=swap',
      },
      heading: {
        name: 'Quicksand',
        css: 'Quicksand, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Quicksand:wght@300..700&display=swap',
      },
      code: {
        name: 'OS Default (monospace)',
        css: 'ui-monospace, monospace',
        href: null,
      },
      longform: {
        name: 'Crimson Pro',
        css: '"Crimson Pro", serif',
        href: 'https://fonts.bunny.net/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&display=swap',
      },
    },
    icons: {
      family: 'classic',
      weight: 2,
    },
    palette: {
      name: 'Bright',
      filename: 'bright.css',
    },
    colorBrand: {
      color: 'blue',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'Quicksand, sans-serif',
      '--wa-font-family-heading': 'var(--wa-font-family-body)',
      '--wa-font-family-code': 'ui-monospace, monospace',
      '--wa-font-family-longform': '"Crimson Pro", serif',
      '--wa-font-weight-body': 500,
      '--wa-font-weight-heading': 700,
      '--wa-font-weight-code': 500,
      '--wa-font-weight-longform': 500,

      // Elements
      '--wa-border-radius-scale': 1.5,
      '--wa-space-scale': 1,
      '--wa-border-width-scale': 2,
    },
  },
  // #endregion

  //
  // #region Shoelace
  //
  {
    name: 'Shoelace',
    description: 'The original, familiar look you know and love from Shoelace.',
    filename: 'shoelace.css',
    isPro: false,
    fonts: {
      body: {
        name: 'OS Default (sans-serif)',
        css: 'ui-sans-serif, system-ui, sans-serif',
        href: null,
      },
      heading: {
        name: 'OS Default (sans-serif)',
        css: 'ui-sans-serif, system-ui, sans-serif',
        href: null,
      },
      code: {
        name: 'OS Default (monospace)',
        css: 'ui-monospace, monospace',
        href: null,
      },
      longform: {
        name: 'OS Default (serif)',
        css: 'ui-serif, serif',
        href: null,
      },
    },
    icons: {
      family: 'classic',
      weight: 1,
    },
    palette: {
      name: 'Shoelace',
      filename: 'shoelace.css',
    },
    colorBrand: {
      color: 'blue',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'ui-sans-serif, system-ui, sans-serif',
      '--wa-font-family-heading': 'var(--wa-font-family-body)',
      '--wa-font-family-code': 'ui-monospace, monospace',
      '--wa-font-family-longform': 'ui-serif, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 600,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 0.7,
      '--wa-space-scale': 1,
      '--wa-border-width-scale': 1,
    },
  },
  // #endregion

  //
  // #region Active
  //
  {
    name: 'Active',
    description: 'Energetic and tactile, always in motion.',
    filename: 'active.css',
    isPro: true,
    fonts: {
      body: {
        name: 'Inter',
        css: 'Inter, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap',
      },
      heading: {
        name: 'Inter',
        css: 'Inter, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap',
      },
      code: {
        name: 'Geist Mono',
        css: '"Geist Mono", monospace',
        href: 'https://fonts.bunny.net/css2?family=Geist+Mono:wght@100..900&display=swap',
      },
      longform: {
        name: 'Aleo',
        css: 'Aleo, serif',
        href: 'https://fonts.bunny.net/css2?family=Aleo:ital,wght@0,100..900;1,100..900&display=swap',
      },
    },
    icons: {
      family: 'classic',
      weight: 1,
    },
    palette: {
      name: 'Rudimentary',
      filename: 'rudimentary.css',
    },
    colorBrand: {
      color: 'green',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'Inter, sans-serif',
      '--wa-font-family-heading': 'var(--wa-font-family-body)',
      '--wa-font-family-code': '"Geist Mono", monospace',
      '--wa-font-family-longform': 'Aleo, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 650,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 1.75,
      '--wa-space-scale': 1,
      '--wa-border-width-scale': 1,
    },
  },
  // #endregion

  //
  // #region Brutalist
  //
  {
    name: 'Brutalist',
    description: 'Sharp, square, and unapologetically bold.',
    filename: 'brutalist.css',
    isPro: true,
    fonts: {
      body: {
        name: 'Space Grotesk',
        css: '"Space Grotesk", sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Space+Grotesk:wght@300..700&display=swap',
      },
      heading: {
        name: 'IBM Plex Sans Condensed',
        css: '"IBM Plex Sans Condensed", sans-serif',
        href: 'https://fonts.bunny.net/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
      },
      code: {
        name: 'Space Mono',
        css: '"Space Mono", monospace',
        href: 'https://fonts.bunny.net/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap',
      },
      longform: {
        name: 'Podkova',
        css: 'Podkova, serif',
        href: 'https://fonts.bunny.net/css2?family=Podkova:wght@400..800&display=swap',
      },
    },
    icons: {
      family: 'classic',
      weight: 2,
    },
    palette: {
      name: 'Default',
      filename: 'default.css',
    },
    colorBrand: {
      color: 'blue',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'Space Grotesk, sans-serif',
      '--wa-font-family-heading': 'IBM Plex Sans Condensed, sans-serif',
      '--wa-font-family-code': 'Space Mono, monospace',
      '--wa-font-family-longform': 'Podkova, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 500,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 0,
      '--wa-space-scale': 1.125,
      '--wa-border-width-scale': 2,
    },
  },
  // #endregion

  //
  // #region Glossy
  //
  {
    name: 'Glossy',
    description: 'Bustling with plenty of luster and shine.',
    filename: 'glossy.css',
    isPro: true,
    fonts: {
      body: {
        name: 'Figtree',
        css: 'Figtree, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap',
      },
      heading: {
        name: 'Figtree',
        css: 'Figtree, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap',
      },
      code: {
        name: 'Chivo Mono',
        css: '"Chivo Mono", monospace',
        href: 'https://fonts.bunny.net/css2?family=Chivo+Mono:ital,wght@0,100..900;1,100..900&display=swap',
      },
      longform: {
        name: 'Fraunces',
        css: 'Fraunces, serif',
        href: 'https://fonts.bunny.net/css2?family=Fraunces:ital,wght@0,100..900;1,100..900&display=swap',
      },
    },
    icons: {
      family: 'classic',
      weight: 1,
    },
    palette: {
      name: 'Elegant',
      filename: 'elegant.css',
    },
    colorBrand: {
      color: 'indigo',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'Figtree, sans-serif',
      '--wa-font-family-heading': 'var(--wa-font-family-body)',
      '--wa-font-family-code': '"Chivo Mono", monospace',
      '--wa-font-family-longform': 'Fraunces, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 800,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 350,

      // Elements
      '--wa-border-radius-scale': 1.33,
      '--wa-space-scale': 1.125,
      '--wa-border-width-scale': 1,
    },
  },
  // #endregion

  //
  // #region Matter
  //
  {
    name: 'Matter',
    description: 'Digital design inspired by the real world.',
    filename: 'matter.css',
    isPro: true,
    fonts: {
      body: {
        name: 'Wix Madefor Text',
        css: '"Wix Madefor Text", sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Wix+Madefor+Text:ital,wght@0,400..800;1,400..800&display=swap',
      },
      heading: {
        name: 'Wix Madefor Text',
        css: '"Wix Madefor Text", sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Wix+Madefor+Text:ital,wght@0,400..800;1,400..800&display=swap',
      },
      code: {
        name: 'Roboto Mono',
        css: '"Roboto Mono", monospace',
        href: 'https://fonts.bunny.net/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap',
      },
      longform: {
        name: 'Roboto Serif',
        css: '"Roboto Serif", serif',
        href: 'https://fonts.bunny.net/css2?family=Roboto+Serif:ital,wght@0,100..900;1,100..900&display=swap',
      },
    },
    icons: {
      family: 'classic',
      weight: 1,
    },
    palette: {
      name: 'Mild',
      filename: 'mild.css',
    },
    colorBrand: {
      color: 'purple',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'Wix Madefor Text, sans-serif',
      '--wa-font-family-heading': 'var(--wa-font-family-body)',
      '--wa-font-family-code': 'Roboto Mono, monospace',
      '--wa-font-family-longform': 'Roboto Serif, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 500,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 1.33,
      '--wa-space-scale': 1,
      '--wa-border-width-scale': 1,
    },
  },
  // #endregion

  //
  // #region Mellow
  //
  {
    name: 'Mellow',
    description: 'Soft and soothing, like a lazy Sunday morning.',
    filename: 'mellow.css',
    isPro: true,
    fonts: {
      body: {
        name: 'Mulish',
        css: 'Mulish, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap',
      },
      heading: {
        name: 'Lora',
        css: 'Lora, serif',
        href: 'https://fonts.bunny.net/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap',
      },
      code: {
        name: 'OS Default (monospace)',
        css: 'ui-monospace, monospace',
        href: null,
      },
      longform: {
        name: 'Lora',
        css: 'Lora, serif',
        href: 'https://fonts.bunny.net/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap',
      },
    },
    icons: {
      family: 'classic',
      weight: 1.5,
    },
    palette: {
      name: 'Natural',
      filename: 'natural.css',
    },
    colorBrand: {
      color: 'blue',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'Mulish, sans-serif',
      '--wa-font-family-heading': 'Lora, serif',
      '--wa-font-family-code': 'ui-monospace, monospace',
      '--wa-font-family-longform': 'Lora, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 700,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 1,
      '--wa-space-scale': 1.125,
      '--wa-border-width-scale': 1.5,
    },
  },
  // #endregion

  //
  // #region Playful
  //
  {
    name: 'Playful',
    description: 'Cheerful and engaging, like a playground on screen.',
    filename: 'playful.css',
    isPro: true,
    fonts: {
      body: {
        name: 'Nunito',
        css: 'Nunito, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap',
      },
      heading: {
        name: 'Fredoka',
        css: 'Fredoka, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Fredoka:wght@300..700&display=swap',
      },
      code: {
        name: 'Azeret Mono',
        css: '"Azeret Mono", monospace',
        href: 'https://fonts.bunny.net/css2?family=Azeret+Mono:ital,wght@0,100..900;1,100..900&display=swap',
      },
      longform: {
        name: 'BioRhyme',
        css: 'BioRhyme, serif',
        href: 'https://fonts.bunny.net/css2?family=BioRhyme:wght@200..800&display=swap',
      },
    },
    icons: {
      family: 'classic',
      weight: 3,
    },
    palette: {
      name: 'Rudimentary',
      filename: 'rudimentary.css',
    },
    colorBrand: {
      color: 'purple',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'Nunito, sans-serif',
      '--wa-font-family-heading': 'Fredoka, sans-serif',
      '--wa-font-family-code': 'Azeret Mono, monospace',
      '--wa-font-family-longform': 'BioRhyme, serif',
      '--wa-font-weight-body': 500,
      '--wa-font-weight-heading': 600,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 2,
      '--wa-space-scale': 1,
      '--wa-border-width-scale': 3,
    },
  },
  // #endregion

  //
  // #region Premium
  //
  {
    name: 'Premium',
    description: 'The ultimate in sophistication and style.',
    filename: 'premium.css',
    isPro: true,
    fonts: {
      body: {
        name: 'DM Sans',
        css: '"DM Sans", sans-serif',
        href: 'https://fonts.bunny.net/css2?family=DM+Sans:ital,wght@0,100..1000;1,100..1000&display=swap',
      },
      heading: {
        name: 'Playfair Display',
        css: '"Playfair Display", serif',
        href: 'https://fonts.bunny.net/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
      },
      code: {
        name: 'OS Default (monospace)',
        css: 'ui-monospace, monospace',
        href: null,
      },
      longform: {
        name: 'Playfair',
        css: 'Playfair, serif',
        href: 'https://fonts.bunny.net/css2?family=Playfair:ital,wght@0,300..900;1,300..900&display=swap',
      },
    },
    icons: {
      family: 'classic',
      weight: 1.5,
    },
    palette: {
      name: 'Anodized',
      filename: 'anodized.css',
    },
    colorBrand: {
      color: 'cyan',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'DM Sans, sans-serif',
      '--wa-font-family-heading': 'Playfair Display, serif',
      '--wa-font-family-code': 'ui-monospace, monospace',
      '--wa-font-family-longform': 'Playfair, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 500,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 0.5,
      '--wa-space-scale': 1,
      '--wa-border-width-scale': 1.5,
    },
  },
  // #endregion

  //
  // #region Tailspin
  //
  {
    name: 'Tailspin',
    description: 'Like a bird in flight, guiding you from there to here.',
    filename: 'tailspin.css',
    isPro: true,
    fonts: {
      body: {
        name: 'Inter',
        css: 'Inter, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap',
      },
      heading: {
        name: 'Inter',
        css: 'Inter, sans-serif',
        href: 'https://fonts.bunny.net/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap',
      },
      code: {
        name: 'OS Default (monospace)',
        css: 'ui-monospace, monospace',
        href: null,
      },
      longform: {
        name: 'OS Default (serif)',
        css: 'ui-serif, serif',
        href: null,
      },
    },
    icons: {
      family: 'classic',
      weight: 1,
    },
    palette: {
      name: 'Vogue',
      filename: 'vogue.css',
    },
    colorBrand: {
      color: 'indigo',
    },
    tokens: {
      // Fonts
      '--wa-font-family-body': 'Inter, sans-serif',
      '--wa-font-family-heading': 'var(--wa-font-family-body)',
      '--wa-font-family-code': 'ui-monospace, monospace',
      '--wa-font-family-longform': 'ui-serif, serif',
      '--wa-font-weight-body': 400,
      '--wa-font-weight-heading': 700,
      '--wa-font-weight-code': 400,
      '--wa-font-weight-longform': 400,

      // Elements
      '--wa-border-radius-scale': 1,
      '--wa-space-scale': 0.875,
      '--wa-border-width-scale': 1,
    },
  },
  // #endregion
];

/**
 * All fonts used by themes, collected from the four font categories.
 */
export const fonts = themes
  .flatMap(theme => [theme.fonts.body, theme.fonts.heading, theme.fonts.code, theme.fonts.longform])
  .filter(
    (font, index, array) =>
      array.findIndex(f => f.name === font.name && f.css === font.css && f.href === font.href) === index,
  );

/**
 * Font presets derived from themes, with unique font names in order: heading > body > code > longform
 */
export const fontPresets = themes
  .map(theme => {
    const fontNames = [
      theme.fonts.heading.name,
      theme.fonts.body.name,
      theme.fonts.code.name,
      theme.fonts.longform.name,
    ];
    const uniqueFonts = fontNames.filter((name, index) => fontNames.indexOf(name) === index);

    return {
      name: theme.name,
      displayName: uniqueFonts.join(' · '),
      fontFamilyBody: theme.fonts.body.css,
      fontFamilyHeading: theme.fonts.heading.css,
      fontFamilyCode: theme.fonts.code.css,
      fontFamilyLongform: theme.fonts.longform.css,
      fontWeightBody: theme.tokens['--wa-font-weight-body'],
      fontWeightHeading: theme.tokens['--wa-font-weight-heading'],
      fontWeightCode: theme.tokens['--wa-font-weight-code'],
      fontWeightLongform: theme.tokens['--wa-font-weight-longform'],
    };
  })
  .filter((preset, index, array) => array.findIndex(p => p.displayName === preset.displayName) === index);

/**
 * Element presets derived from themes.
 */
export const elementPresets = themes.map(theme => ({
  name: theme.name,
  borderRadiusScale: theme.tokens['--wa-border-radius-scale'],
  spaceScale: theme.tokens['--wa-space-scale'],
  borderWidthScale: theme.tokens['--wa-border-width-scale'],
}));

/**
 * All palettes used by themes in a simple array.
 */
export const palettes = themes
  .map(theme => ({
    ...theme.palette,
    isPro: theme.isPro,
  }))
  .filter(
    (palette, index, array) =>
      array.findIndex(p => p.name === palette.name && p.filename === palette.filename) === index,
  );

/**
 * Available icons.
 */
export const icons = [
  { name: 'Classic', libraryName: 'classic' },
  { name: 'Sharp', libraryName: 'sharp' },
  { name: 'Duotone', libraryName: 'duotone' },
  { name: 'Sharp Duotone', libraryName: 'sharp-duotone' },
];

export const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'gray'];
export const tints = ['95', '90', '80', '70', '60', '50', '40', '30', '20', '10', '05'];
