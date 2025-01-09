---
title: Themes
description: Everything you need to know about theming Web Awesome.
layout: page-outline
---
<style>
  wa-page > main {
    max-width: 140ch;

    .max-line-length {
      max-width: 80ch;
    }
  }

  .theme-showcase {
    container: showcase / inline-size;

    background-color: var(--wa-color-surface-lowered);
    border-radius: var(--wa-border-radius-l);
    min-height: 16lh;
    height: 65vh;
    max-height: 21lh;
    padding: var(--wa-space-xl);
    overflow: hidden;
    margin-block-end: var(--wa-space-xl);

    &.wa-flank {
      --content-percentage: 55%;
      --flank-size: 20ch;
    }
  }

  .showcase-examples-wrapper {
    inline-size: 100%;
    block-size: 100%;
  }

  .showcase-examples {
    column-gap: var(--wa-space-xl);

    & wa-card {
      display: inline-block;
      width: 100%;

      &:has(+ wa-card) {
        margin-block-end: var(--wa-space-xl);
      }
    }
  }

  @supports not (zoom: 1) {
    .showcase-examples {
      column-count: 1;
    }

    @container showcase (width > 700px) {
      .showcase-examples {
        column-count: 2;
      }
    }

    @container showcase (width > 900px) {
      .showcase-examples {
        column-count: 3;
      }
    }
  }

  @supports (zoom: 1) {
    .showcase-examples {
      column-count: 2;
      zoom: 40%;
    }

    @container showcase (width > 400px) {
      .showcase-examples {
        zoom: 55%;
      }
    }

    @container showcase (width > 700px) {
      .showcase-examples {
        zoom: 70%;
      }
    }

    @container showcase (width > 800px) {
      .showcase-examples {
        column-count: 3;
        zoom: 70%;
      }
    }
  }
</style>

<div class="theme-showcase wa-flank wa-gap-xl">
  <div>
    <h2 id="theme-showcase-name" data-theme-name></h2>
    <p id="theme-showcase-description" data-theme-description></p>
  </div>
  <div class="showcase-examples-wrapper">
    <div class="showcase-examples">
      <wa-card with-header with-footer>
        <div slot="header" class="wa-split">
          <h3 class="wa-heading-m">Your Cart</h3>
          <wa-icon-button name="xmark"></wa-icon-button>
        </div>
        <div class="wa-stack wa-gap-xl">
          <div class="wa-flank">
            <wa-avatar shape="rounded" style="--size: 3em; --background-color: var(--wa-color-green-60); --text-color: var(--wa-color-green-95);">
              <wa-icon slot="icon" name="sword-laser" family="duotone" style="font-size: 1.5em;"></wa-icon>
            </wa-avatar>
            <div class="wa-stack wa-gap-xs">
              <div class="wa-split wa-gap-xs">
                <strong>Initiate Saber</strong>
                <strong>$179.99</strong>
              </div>
              <div class="wa-split wa-gap-xs wa-caption-m">
                <span>Green</span>
                <a href="#">Remove</a>
              </div>
            </div>
          </div>
          <wa-divider></wa-divider>
          <div class="wa-flank">
            <wa-avatar shape="rounded" style="--size: 3em; --background-color: var(--wa-color-teal-60); --text-color: var(--wa-color-teal-95);">
              <wa-icon slot="icon" name="robot-astromech" family="duotone" style="font-size: 1.5em;"></wa-icon>
            </wa-avatar>
            <div class="wa-stack wa-gap-xs">
              <div class="wa-split wa-gap-xs">
                <strong>Repair Droid</strong>
                <strong>$3,049.99</strong>
              </div>
              <div class="wa-split wa-gap-xs wa-caption-m">
                <span>R-series</span>
                <a href="#">Remove</a>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="wa-stack">
          <div class="wa-split">
            <strong>Subtotal</strong>
            <strong>$3,229.98</strong>
          </div>
          <span class="wa-caption-m">Shipping and taxes calculated at checkout.</span>
          <wa-button variant="brand">
            <wa-icon slot="prefix" name="shopping-bag"></wa-icon>
            Checkout
          </wa-button>
        </div>
      </wa-card>
      <wa-card>
        <wa-avatar shape="rounded" style="--size: 1.9lh; float: left; margin-right: var(--wa-space-m);">
          <wa-icon slot="icon" name="hat-wizard" family="duotone" style="font-size: 1.75em;"></wa-icon>
        </wa-avatar>
        <p class="wa-body-l" style="margin: 0;">&ldquo;All we have to decide is what to do with the time that is given to us. There are other forces at work in this world, Frodo, besides the will of evil.&rdquo;</p>
      </wa-card>
      <wa-card>
        <div class="wa-stack">
          <h3 class="wa-heading-m">Sign In</h3>
          <wa-input label="Email" placeholder="ddjarin@mandalore.gov">
            <wa-icon slot="prefix" name="envelope" variant="regular"></wa-icon>
          </wa-input>
          <wa-input label="Password" type="password">
            <wa-icon slot="prefix" name="lock" variant="regular"></wa-icon>
          </wa-input>
          <wa-button variant="brand">Sign In</wa-button>
          <a href="#" class="wa-body-s">I forgot my password</a>
        </div>
      </wa-card>
      <wa-card with-footer>
        <div class="wa-stack">
          <div class="wa-split">
            <h3 class="wa-heading-m">To-Do</h3>
            <wa-icon-button name="plus" label="Add task"></wa-icon-button>
          </div>
          <wa-checkbox checked>Umbrella for Adelard</wa-checkbox>
          <wa-checkbox checked>Waste-paper basket for Dora</wa-checkbox>
          <wa-checkbox checked>Pen and ink for Milo</wa-checkbox>
          <wa-checkbox>Mirror for Angelica</wa-checkbox>
          <wa-checkbox>Silver spoons for Lobelia</wa-checkbox>
        </div>
        <div slot="footer">
          <a href="">View all completed</a>
        </div>
      </wa-card>
      <wa-card>
        <div class="wa-stack">
          <div class="wa-frame wa-border-radius-m" style="align-self: center; max-inline-size: 25ch;">
            <img src="https://images.unsplash.com/photo-1667514627762-521b1c815a89?q=20" alt="Album art">
          </div>
          <div class="wa-flank:end wa-align-items-start">
            <div class="wa-stack wa-gap-3xs">
              <div class="wa-cluster wa-gap-xs" style="height: 2.25em;">
                <strong>The Stone Troll</strong>
                <small><wa-badge variant="neutral" appearance="filled">E</wa-badge></small>
              </div>
              <span class="wa-caption-m">Samwise G</span>
            </div>
            <wa-icon-button name="ellipsis" label="Options"></wa-icon-button>
          </div>
          <div class="wa-stack wa-gap-2xs">
            <wa-progress-bar value="34" style="height: 0.5em"></wa-progress-bar>
            <div class="wa-split">
              <span class="wa-caption-xs">1:01</span>
              <span class="wa-caption-xs">-1:58</span>
            </div>
          </div>
          <div class="wa-grid wa-align-items-center" style="--min-column-size: 1em; justify-items: center;">
            <wa-icon-button name="backward" label="Skip backward"></wa-icon-button>
            <wa-icon-button name="pause" style="font-size: var(--wa-font-size-2xl);" label="Pause"></wa-icon-button>
            <wa-icon-button name="forward" label="Skip forward"></wa-icon-button>
          </div>
        </div>
      </wa-card>
      <wa-card>
        <div class="wa-stack">
          <h3 class="wa-heading-m">Chalmun's Spaceport Cantina</h3>
          <div class="wa-cluster wa-gap-xs">
            <wa-rating value="4.6" read-only></wa-rating>
            <strong>4.6</strong>
            <span>(419 reviews)</span>
          </div>
          <div class="wa-cluster wa-gap-xs">
            <div class="wa-cluster wa-gap-3xs">
              <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
              <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
              <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
            </div>
            <span class="wa-caption-m">&bull;</span>
            <wa-tag size="small">Cocktail Bar</wa-tag>
            <wa-tag size="small">Gastropub</wa-tag>
            <wa-tag size="small">Local Fare</wa-tag>
            <wa-tag size="small">Gluten Free</wa-tag>
          </div>
          <div class="wa-flank wa-gap-xs">
            <wa-icon name="location-dot"></wa-icon>
            <a href="#" class="wa-caption-m">Mos Eisley, Tatooine</a>
          </div>
        </div>
      </wa-card>
    </div>
  </div>
</div>

<div class="max-line-length">

Themes are collections of pre-defined CSS custom properties that thread through every Web Awesome component and pattern.

Web Awesome Free includes these pre-made themes:
- **Default** (`default.css`) for a clean look that prioritizes accessibility and performance
- **Classic** (`classic.css`) for the look and feel of Shoelace with more accessible color pairings
- **Awesome** (`awesome.css`) for the familiar, vibrant styles from your friends at Font Awesome

Even more themes are available with Web Awesome <wa-badge>Pro</wa-badge>:
- **Active** (`active.css`)
- **Brutalist** (`brutalist.css`)
- **Mellow** (`mellow.css`)
- **Tailspin** (`tailspin.css`)

To get started right away, include the following in your project, replacing `default.css` at the end with your preferred pre-made theme:
```html
<link rel="stylesheet" href="{% cdnUrl 'styles/themes/default.css' %}" />
```


## What's a Theme?

Themes are a collection of standardized [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) that cover a range of styles from colors to transitions. We use these custom properties throughout Web Awesome components for a cohesive look and feel. Our [Theming pages](/docs/theming/) document these styles so that you can use them freely throughout your project and customize them as needed.

Themes are scoped to unique classes, such as `wa-theme-default` or `wa-theme-classic`. Scoping to unique classes allows you to import multiple themes and use them interchangeably without collisions.

Each theme may also include both light and dark color schemes with the classes `wa-light` and `wa-dark`. 
You can use these classes to apply a specific color scheme to an entire page or just a section. 
In pre-made themes, we use a light color scheme by default.


Additionally, styles may be scope to the `:root` selector to be activated automatically.
For pre-made themes, *all* custom properties are scoped to `:where(:root)`, the theme class, and `wa-light`. 

:::info
We use `:where(:root)` to give these styles 0 [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) so that they can be easily overridden. If you plan on using multiple themes in your project, we recommend doing the same for your custom themes.
:::

Finally, we scope themes to `:host` and `:host-context()` to ensure the styles are applied to the shadow roots of custom elements.

For example, the default theme is set up like this:

```css
:where(:root),
:host,
.wa-theme-default,
.wa-light {
  /* all CSS custom properties for color, typography, space, etc. */
}

.wa-dark,
:host-context(.wa-dark) {
  /* subset of CSS custom properties for a dark color scheme */
}
```

## Using Themes

You can import pre-made themes from the Web Awesome CDN. Simply add the following code to the `<head>` of your page to import the **default** theme:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/themes/default.css' %}" />
```

Or the **Classic** theme:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/themes/classic.css' %}" />
```

Or any of our Pro themes, like **Brutalist**:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/themes/brutalist.css' %}" />
```

 To activate the dark color scheme of any theme, apply the class `wa-dark` to the `<html>` element on your page, like this example for the default theme:
```html
<html class="wa-theme-default wa-dark">
  <head>
    <link rel="stylesheet" href="path/to/web-awesome/dist/styles/themes/default.css" />
    <!-- other links, scripts, and metadata -->
  </head>
  <body>
    <!-- page content -->
  </body>
</html>
```

Because themes are scoped to specific classes, you can use different color schemes or even different themes throughout the page. Here, we use the default theme with a dark sidebar:

```html
<html>
  <head>
    <link rel="stylesheet" href="path/to/web-awesome/dist/styles/themes/default.css" />
  </head>

  <body>
    <nav class="wa-dark">
      <!-- dark-themed sidebar -->
    </nav>

    <!-- light-themed content -->
  </body>
</html>
```

## Creating Themes

There are two ways to create themes. The easiest way is to customize the default theme. The advanced way is to create a new theme from scratch. Which method you choose depends on your project's requirements and the amount of effort you're willing to invest.

### Customizing a Built-in Theme

Overriding the default theme is the easiest way to customize Web Awesome. You can do this by importing the default theme as-is, then creating a separate stylesheet that overrides [the theming API](/docs/customizing#design-tokens) and adds [component styles](/docs/customizing#css-parts) to your liking. You must import your theme _after_ the default theme.

If you're customizing the default light styles, scope your styles to the following selectors.

```css
:root,
:host,
.wa-theme-default,
.wa-light {
  /* your custom styles here */
}
```

If you're customizing the default dark styles, scope your styles to the following selectors.

```css
.wa-dark,
:is(:host-context(.wa-dark)) {
  /* your custom styles here */
}
```

By customizing a built-in theme, you'll maintain a smaller stylesheet containing only your changes. Contrast this to [creating a new theme](#creating-a-new-theme), where you need to explicitly define every custom property required by the library. This approach is more "future-proof," as new design tokens that emerge in subsequent versions of Web Awesome will be accounted for by built-in themes.

While this approach is easier to maintain, the drawback is that your theme can't be activated independently — it's tied to the built-in theme you're extending.

### Creating a New Theme

Creating a new theme is more of an undertaking than [customizing an existing one](#customizing-a-built-in-theme). At a minimum, you must implement all of the required custom properties. The easiest way to do this is by "forking" a built-in theme and modifying it from there.

Start by changing the selector to match your theme's name. Assuming your new theme is called "Purple Power", your theme should be scoped like this.

```css
:root,
:host,
.wa-theme-purple-power,
.wa-light {
  /* your custom styles here */
}
```

By creating a new theme, you won't be relying on a built-in theme as a foundation. Because of this, you can activate it independently as an alternative to the default theme. This is the recommended approach if you're looking to open source your theme for others to use.

You will, however, need to maintain your theme more carefully, as new versions of Web Awesome change the theming API in ways that your theme won't have accounted for. It's recommended that you clearly specify which version(s) of Web Awesome your theme is designed to work with and keep it up to date as new versions of Web Awesome are released.

## Detecting Color Scheme Preference

Web Awesome's default theme has both light and dark styles built in. However, Web Awesome doesn't try to auto-detect the user's light/dark mode preference. This should be done at the application level. As a best practice, to provide a dark theme in your app, you should:

- Check for [`prefers-color-scheme`](https://stackoverflow.com/a/57795495/567486) and use its value by default
- Allow the user to override the setting in your app
- Remember the user's preference and restore it on subsequent logins

Web Awesome avoids using the `prefers-color-scheme` media query because not all apps support dark mode, and it would break things for the ones that don't.
</div>