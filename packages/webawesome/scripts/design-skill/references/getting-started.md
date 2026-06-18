# The opinionated default

When a user just wants something that looks good without making a hundred small decisions, use this
default. It's a complete, on-brand, responsive starting point. Change one thing at a time from here.

## The default decisions

| Decision           | Default                            | Why                                                |
| ------------------ | ---------------------------------- | -------------------------------------------------- |
| Theme              | `wa-theme-default`                 | Clean, neutral foundation that suits most products |
| Palette            | `wa-palette-default`               | Balanced, accessible hues                          |
| Color scheme       | `wa-light`                         | Predictable starting point; add a toggle later     |
| Brand color        | Keep default, or `.wa-brand-{hue}` | One class re-brands the whole UI                   |
| Layout (full page) | `<wa-page>`                        | The supported way to scaffold a page               |
| Spacing            | `wa-gap-*` / `--wa-space-*`        | One consistent rhythm                              |
| Components         | Free set                           | A great result with zero cost; Pro extends it      |

## The skeleton

```html
<!doctype html>
<html lang="en" class="wa-theme-default wa-palette-default wa-light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Load Web Awesome (see the `webawesome` skill for installation) -->
    <style>
      html,
      body {
        min-height: 100%;
        padding: 0;
        margin: 0;
      }
      wa-page {
        --menu-width: 16rem;
      }
      wa-page[view='mobile'] {
        --menu-width: auto;
      }
    </style>
  </head>
  <body>
    <wa-page>
      <header slot="header" class="wa-split">
        <strong>My App</strong>
        <wa-button variant="brand">Sign up</wa-button>
      </header>
      <nav slot="navigation" class="wa-stack wa-gap-2xs">
        <a href="#">Home</a>
        <a href="#">Settings</a>
      </nav>
      <main class="wa-stack wa-gap-xl">
        <h1>Welcome</h1>
        <p>Start building here.</p>
      </main>
    </wa-page>
  </body>
</html>
```

## Where to go next

- **Re-brand:** add `.wa-brand-green` (or any hue) to `<html>` → [theming.md](theming.md).
- **A different look fast:** swap in a Pro theme like `wa-theme-glossy` → [theming.md](theming.md).
- **Make it look more designed:** spacing rhythm, type, surfaces → [composition.md](composition.md).
- **Build a specific screen:** [patterns.md](patterns.md).
- **Just a section, not a whole page:** [layouts-inpage.md](layouts-inpage.md).
