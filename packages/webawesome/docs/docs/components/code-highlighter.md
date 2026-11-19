---
title: Code Highlighter
layout: component
category: Media
synonyms:
  - code block
  - syntax highlighting
  - pre
  - microlighter
use-cases:
  - code samples
  - install commands
  - configuration snippets
  - documentation pages
---

```html {.example}
<wa-code-highlighter language="html">
  &lt;wa-button variant="brand"&gt;
    &lt;wa-icon slot="start" name="rocket"&gt;&lt;/wa-icon&gt;
    Launch
  &lt;/wa-button&gt;
</wa-code-highlighter>
```

:::warning
<strong>Highlighting requires the CSS Custom Highlight API.</strong><br />
It's available in Chrome 105+, Safari 17.2+, and Firefox 140+. Older browsers show the code as plain, unstyled text.
:::

## Examples

### Language

Set the `language` attribute to a grammar name or alias from the supported languages below. Grammars come from [microlighter](https://github.com/davatron5000/microlighter). Leave the `language` attribute empty to display plain text.

```html {.example}
<wa-code-highlighter language="rust">
  fn main() {
      let crabs = ["Ferris", "Sebastian", "Mr. Krabs"];

      for crab in crabs.iter() {
          println!("Hello, {crab}!");
      }
  }
</wa-code-highlighter>
```

<wa-details summary="View Supported Languages">

| Language    | Value         | Aliases              | Bundled                                      |
| ----------- | ------------- | -------------------- | -------------------------------------------- |
| Assembly    | `assembly`    |                      |                                              |
| Astro       | `astro`       |                      |                                              |
| Bash        | `bash`        | `sh`, `shell`, `zsh` |                                              |
| C           | `c`           |                      |                                              |
| C++         | `cpp`         |                      |                                              |
| C#          | `csharp`      |                      |                                              |
| CSS         | `css`         |                      | <wa-icon name="check" label="Yes"></wa-icon> |
| Dart        | `dart`        |                      |                                              |
| Dockerfile  | `dockerfile`  | `docker`             |                                              |
| Elixir      | `elixir`      |                      |                                              |
| Git diff    | `git-diff`    |                      |                                              |
| Go          | `go`          |                      |                                              |
| GraphQL     | `graphql`     | `gql`                |                                              |
| HEEx        | `heex`        |                      |                                              |
| HTML        | `html`        |                      | <wa-icon name="check" label="Yes"></wa-icon> |
| INI         | `ini`         |                      |                                              |
| Java        | `java`        |                      |                                              |
| JavaScript  | `javascript`  | `js`, `jsx`          | <wa-icon name="check" label="Yes"></wa-icon> |
| JSON        | `json`        |                      | <wa-icon name="check" label="Yes"></wa-icon> |
| Kotlin      | `kotlin`      |                      |                                              |
| Lua         | `lua`         |                      |                                              |
| Markdown    | `markdown`    | `md`                 |                                              |
| Nginx       | `nginx`       |                      |                                              |
| Objective-C | `objective-c` |                      |                                              |
| Perl        | `perl`        |                      |                                              |
| PHP         | `php`         |                      |                                              |
| PowerShell  | `powershell`  |                      |                                              |
| Python      | `python`      | `py`                 |                                              |
| R           | `r`           |                      |                                              |
| Ruby        | `ruby`        | `rb`                 |                                              |
| Rust        | `rust`        |                      |                                              |
| SCSS        | `scss`        | `sass`               |                                              |
| SQL         | `sql`         |                      |                                              |
| Svelte      | `svelte`      |                      |                                              |
| Swift       | `swift`       |                      |                                              |
| TOML        | `toml`        |                      |                                              |
| TSX         | `tsx`         |                      |                                              |
| TypeScript  | `typescript`  | `ts`                 | <wa-icon name="check" label="Yes"></wa-icon> |
| Vue         | `vue`         |                      |                                              |
| YAML        | `yaml`        | `yml`                |                                              |

</wa-details>

### Loading Grammars

Bundled grammars ship with the component and highlight before the code block first paints. The rest load on demand the first time a language is used. Like other library assets, they load from `assets/grammars/<name>.js` relative to the [base path](/docs/#setting-the-base-path). Each grammar is a plain ES module, so self-hosting the library's `assets` folder self-hosts the grammars too.

The element reports each stage of highlighting with a custom state and an event.

| Stage                           | Custom state  | Event      |
| ------------------------------- | ------------- | ---------- |
| The grammar is loading          | `loading`     | None       |
| The code is highlighted         | `highlighted` | `wa-load`  |
| No grammar matches the language | `error`       | `wa-error` |

When no grammar matches, the code renders as plain text. To add a language, see [Custom Grammars](#custom-grammars).

### Escaping Code

Slotted code is parsed as HTML, so escape `<` as `&lt;` and `&` as `&amp;` where they'd be read as markup, such as in tags, generics, and character references. Comparisons and operators like `x < 10` and `a && b` work as written.

```html {.example}
<wa-code-highlighter language="ts">
  function firstOrDefault&lt;T>(items: T[], fallback: T): T {
    return items.length > 0 && items[0] !== undefined ? items[0] : fallback;
  }
</wa-code-highlighter>
```

To skip escaping, wrap the code in a `<script type="text/plain">` element. Its content is read exactly as written. Code that contains `</script>` can't go in a script, so escape it or set the `code` property instead.

```html {.example}
<wa-code-highlighter language="html">
  <script type="text/plain">
    <p class="menu">Fish &amp; chips</p>
  </script>
</wa-code-highlighter>
```

HTML formatters and minifiers leave `<pre>` alone, but they may collapse the whitespace inside custom elements. Exclude code highlighters from them, or set the `code` property instead.

### Preserving Indentation

Common indentation and surrounding blank lines are removed by default, so slotted code can be indented to match the surrounding markup. Add the `without-dedent` attribute to keep slotted whitespace exactly as written, like a `<pre>` element. A single newline right after the opening tag is ignored.

```html {.example}
<wa-code-highlighter language="yaml" without-dedent>
    # This block keeps its four-space indent
    name: Web Awesome
    version: 3</wa-code-highlighter>
```

### Wrapping Long Lines

Long lines scroll horizontally by default. Add the `wrap` attribute to wrap them instead.

```html {.example}
<wa-code-highlighter language="js" wrap>
  const message = 'This line is long enough to wrap onto the next line instead of making the code block scroll horizontally.';
</wa-code-highlighter>
```

### Label

The code block is a region with the accessible name "Code". Use the `label` attribute to describe what the code is for.

```html {.example}
<wa-code-highlighter language="bash" label="Install command">
  npm install @awesome.me/webawesome
</wa-code-highlighter>
```

### Removing the Copy Button

A copy button appears when the pointer is over the code block or when it has focus. On touch devices, it's always visible. Add the `without-copy` attribute to remove it.

```html {.example}
<wa-code-highlighter language="css" without-copy>
  .catfish {
    border-radius: 50%;
  }
</wa-code-highlighter>
```

### Customizing

Token colors come from custom properties. Each one colors a group of related tokens, and its default is a pair of palette tokens for light and dark mode. Tokens can only change color, background color, and text decoration. The CSS Custom Highlight API doesn't support other properties, so tokens can't be bold or italic.

| Custom property    | Colors                                                                  | Default (light / dark)                          |
| ------------------ | ----------------------------------------------------------------------- | ----------------------------------------------- |
| `--comment-color`  | Comments and quotes                                                     | `--wa-color-gray-40` / `--wa-color-gray-60`     |
| `--keyword-color`  | Keywords, storage modifiers, at-rules, doctypes, `!important`, sections | `--wa-color-purple-40` / `--wa-color-purple-60` |
| `--operator-color` | Operators and punctuation                                               | `--wa-color-gray-30` / `--wa-color-gray-80`     |
| `--string-color`   | Strings, regular expressions, attribute values, links, raw text         | `--wa-color-green-40` / `--wa-color-green-60`   |
| `--constant-color` | Numbers, booleans, constants, symbols, entities, anchors                | `--wa-color-orange-40` / `--wa-color-orange-60` |
| `--function-color` | Functions, decorators, animation names                                  | `--wa-color-blue-40` / `--wa-color-blue-60`     |
| `--type-color`     | Types and built-ins                                                     | `--wa-color-blue-40` / `--wa-color-blue-60`     |
| `--variable-color` | Variables and interpolations                                            | `--wa-color-blue-40` / `--wa-color-blue-60`     |
| `--property-color` | Properties, keys, attribute names                                       | `--wa-color-blue-40` / `--wa-color-blue-60`     |
| `--tag-color`      | Tags                                                                    | `--wa-color-purple-40` / `--wa-color-purple-60` |
| `--selector-color` | CSS selectors                                                           | `--wa-color-purple-40` / `--wa-color-purple-60` |
| `--inserted-color` | Inserted lines in diffs                                                 | `--wa-color-green-40` / `--wa-color-green-60`   |
| `--deleted-color`  | Deleted lines in diffs                                                  | `--wa-color-red-40` / `--wa-color-red-60`       |

To recolor every code block on a page, set the custom properties on `wa-code-highlighter` in a stylesheet, like any other [component custom property](/docs/customizing#custom-properties). To set them from `:root` or any ancestor instead, use the `--syntax-*` names described in [Using microlighter Themes](#using-microlighter-themes).

```css
wa-code-highlighter {
  --keyword-color: light-dark(var(--wa-color-pink-40), var(--wa-color-pink-60));
  --string-color: light-dark(var(--wa-color-blue-40), var(--wa-color-blue-60));
}
```

To recolor a single block, set the custom properties on that element. Use `light-dark()` to pick a color for each mode.

```html {.example}
<wa-code-highlighter language="js" class="code-highlighter-colors">
  // Count the fish in the sea
  const fish = ['catfish', 'swordfish', 'pufferfish'];
  console.log(`There are ${fish.length} kinds of fish`);
</wa-code-highlighter>

<style>
  .code-highlighter-colors {
    --comment-color: light-dark(var(--wa-color-pink-40), var(--wa-color-pink-60));
    --keyword-color: light-dark(var(--wa-color-orange-40), var(--wa-color-orange-60));
    --string-color: light-dark(var(--wa-color-cyan-40), var(--wa-color-cyan-60));
  }
</style>
```

The default and microlighter theme colors follow the [color scheme](/docs/customizing#light-and-dark-mode). To show one code block in dark mode, add `class="wa-dark"` to it.

```html {.example}
<wa-code-highlighter language="css" class="wa-dark">
  .moonwalk {
    animation: slide-back 2s ease-in-out infinite;
  }
</wa-code-highlighter>
```

Style the container with the `pre` part and the copy button with the `copy-button__button` part.

```html {.example}
<wa-code-highlighter language="html" class="code-highlighter-container">
  &lt;wa-badge variant="success"&gt;Shipped&lt;/wa-badge&gt;
</wa-code-highlighter>

<style>
  .code-highlighter-container::part(pre) {
    background-color: var(--wa-color-surface-default);
    border: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-l);
  }

  .code-highlighter-container::part(copy-button__button) {
    color: var(--wa-color-brand-on-quiet);
  }
</style>
```

### Using microlighter Themes

The component reads the `--syntax-*` custom properties that [microlighter themes](https://github.com/davatron5000/microlighter/tree/main/src/themes) set, so any theme stylesheet from the `microlighter` package works without changes. Load one and set the `data-syntax-theme` attribute on the `<html>` element. Every code highlighter on the page follows the theme.

```html
<html data-syntax-theme="dracula">
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/microlighter@2/dist/themes/dracula.css" />
  </head>
  <body>
    <wa-code-highlighter language="js">
      const fish = ['catfish', 'swordfish', 'pufferfish'];
    </wa-code-highlighter>
  </body>
</html>
```

Each `--syntax-*` custom property becomes the default for the matching token custom property, such as `--syntax-keyword` for `--keyword-color`. The `--syntax-background` and `--syntax-foreground` custom properties color the `pre` part. Custom properties set on the element still win, so one block can override part of a theme.

To scope a theme, set the attribute on another element or on one code highlighter. This example sets it on the code highlighter and loads the stylesheet for the selected theme.

```html {.example}
<div id="code-highlighter__microlighter">
  <wa-code-highlighter language="js">
    // Count the fish in the sea
    const fish = ['catfish', 'swordfish', 'pufferfish'];
    console.log(`There are ${fish.length} kinds of fish`);
  </wa-code-highlighter>

  <wa-divider></wa-divider>

  <wa-select label="Theme" value="dracula" style="width: 12rem">
    <wa-option value="none">None</wa-option>
    <wa-option value="cobalt2">Cobalt2</wa-option>
    <wa-option value="dracula">Dracula</wa-option>
    <wa-option value="github">GitHub</wa-option>
    <wa-option value="gruvbox">Gruvbox</wa-option>
    <wa-option value="min">Min</wa-option>
    <wa-option value="monokai">Monokai</wa-option>
    <wa-option value="night-owl">Night Owl</wa-option>
    <wa-option value="solarized-light">Solarized Light</wa-option>
    <wa-option value="tokyo-night">Tokyo Night</wa-option>
    <wa-option value="vesper">Vesper</wa-option>
    <wa-option value="vscode-plus">VS Code Plus</wa-option>
  </wa-select>
</div>

<script type="module">
  const container = document.getElementById('code-highlighter__microlighter');
  const highlighter = container.querySelector('wa-code-highlighter');
  const select = container.querySelector('wa-select');

  function applyTheme(name) {
    if (name === 'none') {
      highlighter.removeAttribute('data-syntax-theme');
      return;
    }

    if (!container.querySelector(`link[data-theme="${name}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://cdn.jsdelivr.net/npm/microlighter@2.2.0/dist/themes/${name}.css`;
      link.dataset.theme = name;
      container.append(link);
    }

    highlighter.setAttribute('data-syntax-theme', name);
  }

  await customElements.whenDefined('wa-select');
  applyTheme(select.value);
  select.addEventListener('change', () => applyTheme(select.value));
</script>
```

Themes follow Web Awesome's color scheme, not the operating system.

| Goal                             | How                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------- |
| Dark colors on the whole page    | Add `class="wa-dark"` to the `<html>` element                                                |
| Follow the user's system setting | See [Detecting Color Scheme Preference](/docs/customizing#detecting-color-scheme-preference) |
| One block in a different mode    | Add `class="wa-dark"` or `class="wa-light"` to that code highlighter                         |

### Providing Code Programmatically

Set the `code` property to display code from JavaScript. It takes precedence over slotted content and renders verbatim, without dedenting. Clear it to show the slotted code again.

```html {.example}
<div id="code-highlighter__programmatic">
  <wa-code-highlighter language="css"></wa-code-highlighter>
  <wa-divider></wa-divider>
  <wa-textarea label="CSS" rows="4"></wa-textarea>
</div>

<script type="module">
  const container = document.getElementById('code-highlighter__programmatic');
  const highlighter = container.querySelector('wa-code-highlighter');
  const textarea = container.querySelector('wa-textarea');

  await customElements.whenDefined('wa-textarea');
  textarea.value = '.bookworm {\n  font-family: var(--wa-font-family-longform);\n}';
  highlighter.code = textarea.value;

  textarea.addEventListener('input', () => {
    highlighter.code = textarea.value;
  });
</script>
```

### Custom Grammars

Register a [TextMate grammar](https://macromates.com/manual/en/language_grammars) with the `registerCodeGrammar()` function to highlight another language or replace a built-in one. Language names can contain lowercase letters, numbers, hyphens, and underscores. Registered grammars apply immediately, even to code highlighters already on the page.

```html {.example}
<wa-code-highlighter language="haiku">
  # An old silent pond
  frog jumps into the pond 1 time
  # Splash! Silence again
</wa-code-highlighter>

<script type="module">
  import { registerCodeGrammar } from '/dist/webawesome.js';

  registerCodeGrammar('haiku', {
    scopeName: 'source.haiku',
    patterns: [
      { match: '#.*$', name: 'comment.line.haiku' },
      { match: '\\b(jumps|into)\\b', name: 'keyword.control.haiku' },
      { match: '\\b\\d+\\b', name: 'constant.numeric.haiku' },
    ],
  });
</script>
```

Scope names pick the token colors. Most scopes map by their first segment, such as `comment`, `keyword`, or `string`, so the [token custom properties](#customizing) apply to custom grammars too.

## Accessibility Considerations

The code block is a region named "Code" in the user's language, or by the `label` attribute when set. It joins the tab order only when the code overflows, so keyboard users can reach and scroll it without an extra tab stop on short snippets. The copy button is labeled and announces when the code is copied.

When the code block has focus:

| Key                                                 | Behavior                         |
| --------------------------------------------------- | -------------------------------- |
| <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> | Scrolls the code                 |
| <kbd>Home</kbd>                                     | Scrolls to the start of the code |
| <kbd>End</kbd>                                      | Scrolls to the end of the code   |
