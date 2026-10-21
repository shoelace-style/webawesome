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

:::info
<strong>Slotted code is parsed as HTML.</strong><br />
Most code works as is, but some `<` and `&` characters need escaping. See [Escaping Code](#escaping-code) for when. Common indentation and surrounding blank lines are removed, so you can indent code to match your markup.
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

| Language    | Value         | Aliases              | Loading                                                                   |
| ----------- | ------------- | -------------------- | ------------------------------------------------------------------------- |
| Assembly    | `assembly`    |                      | On demand                                                                 |
| Astro       | `astro`       |                      | On demand                                                                 |
| Bash        | `bash`        | `sh`, `shell`, `zsh` | On demand                                                                 |
| C           | `c`           |                      | On demand                                                                 |
| C++         | `cpp`         |                      | On demand                                                                 |
| C#          | `csharp`      |                      | On demand                                                                 |
| CSS         | `css`         |                      | <wa-badge appearance="outlined" variant="neutral" pill>bundled</wa-badge> |
| Dart        | `dart`        |                      | On demand                                                                 |
| Dockerfile  | `dockerfile`  | `docker`             | On demand                                                                 |
| Elixir      | `elixir`      |                      | On demand                                                                 |
| Git diff    | `git-diff`    |                      | On demand                                                                 |
| Go          | `go`          |                      | On demand                                                                 |
| GraphQL     | `graphql`     | `gql`                | On demand                                                                 |
| HEEx        | `heex`        |                      | On demand                                                                 |
| HTML        | `html`        |                      | <wa-badge appearance="outlined" variant="neutral" pill>bundled</wa-badge> |
| INI         | `ini`         |                      | On demand                                                                 |
| Java        | `java`        |                      | On demand                                                                 |
| JavaScript  | `javascript`  | `js`, `jsx`          | <wa-badge appearance="outlined" variant="neutral" pill>bundled</wa-badge> |
| JSON        | `json`        |                      | <wa-badge appearance="outlined" variant="neutral" pill>bundled</wa-badge> |
| Kotlin      | `kotlin`      |                      | On demand                                                                 |
| Lua         | `lua`         |                      | On demand                                                                 |
| Markdown    | `markdown`    | `md`                 | On demand                                                                 |
| Nginx       | `nginx`       |                      | On demand                                                                 |
| Objective-C | `objective-c` |                      | On demand                                                                 |
| Perl        | `perl`        |                      | On demand                                                                 |
| PHP         | `php`         |                      | On demand                                                                 |
| PowerShell  | `powershell`  |                      | On demand                                                                 |
| Python      | `python`      | `py`                 | On demand                                                                 |
| R           | `r`           |                      | On demand                                                                 |
| Ruby        | `ruby`        | `rb`                 | On demand                                                                 |
| Rust        | `rust`        |                      | On demand                                                                 |
| SCSS        | `scss`        | `sass`               | On demand                                                                 |
| SQL         | `sql`         |                      | On demand                                                                 |
| Svelte      | `svelte`      |                      | On demand                                                                 |
| Swift       | `swift`       |                      | On demand                                                                 |
| TOML        | `toml`        |                      | On demand                                                                 |
| TSX         | `tsx`         |                      | On demand                                                                 |
| TypeScript  | `typescript`  | `ts`                 | <wa-badge appearance="outlined" variant="neutral" pill>bundled</wa-badge> |
| Vue         | `vue`         |                      | On demand                                                                 |
| YAML        | `yaml`        | `yml`                | On demand                                                                 |

</wa-details>

### Loading Grammars

Bundled grammars ship with the component and highlight before the code block first paints. The rest load on demand the first time a language is used, from `assets/grammars/<name>.js` relative to the [base path](/docs/#setting-the-base-path), like other library assets. Each grammar is a plain ES module, so self-hosting the library's `assets` folder self-hosts the grammars too.

While a grammar loads, the element has the `loading` custom state. When the code is highlighted, the `wa-load` event is emitted. If no grammar matches the language, the `error` custom state is applied, the `wa-error` event is emitted, and the code renders as plain text. To add a language, see [Custom Grammars](#custom-grammars).

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

Add the `without-dedent` attribute to keep slotted whitespace exactly as written, like a `<pre>` element. A single newline right after the opening tag is ignored.

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

### Copy Button

A copy button appears when the pointer is over the code block or when it has focus. On touch devices, it's always visible. Add the `without-copy` attribute to remove it.

```html {.example}
<wa-code-highlighter language="css" without-copy>
  .catfish {
    border-radius: 50%;
  }
</wa-code-highlighter>
```

### Customizing

Token colors come from custom properties. Each one colors a group of related tokens, and its default is a pair of palette tokens for light and dark mode.

| Custom property    | Colors                                                                  | Default (light / dark)                          |
| ------------------ | ----------------------------------------------------------------------- | ----------------------------------------------- |
| `--comment-color`  | Comments and quotes                                                     | `--wa-color-gray-40` / `--wa-color-gray-60`     |
| `--keyword-color`  | Keywords, storage modifiers, at-rules, doctypes, `!important`, sections | `--wa-color-purple-40` / `--wa-color-purple-60` |
| `--operator-color` | Operators and punctuation                                               | `--wa-color-gray-30` / `--wa-color-gray-80`     |
| `--string-color`   | Strings, regular expressions, attribute values, links, raw text         | `--wa-color-green-40` / `--wa-color-green-60`   |
| `--constant-color` | Numbers, booleans, constants, symbols, entities                         | `--wa-color-orange-40` / `--wa-color-orange-60` |
| `--function-color` | Functions, decorators, animation names                                  | `--wa-color-blue-40` / `--wa-color-blue-60` |
| `--type-color`     | Types and built-ins                                                     | `--wa-color-blue-40` / `--wa-color-blue-60`     |
| `--variable-color` | Variables and interpolations                                            | `--wa-color-blue-40` / `--wa-color-blue-60` |
| `--property-color` | Properties, keys, attribute names                                       | `--wa-color-blue-40` / `--wa-color-blue-60`     |
| `--tag-color`      | Tags                                                                    | `--wa-color-purple-40` / `--wa-color-purple-60`       |
| `--selector-color` | CSS selectors                                                           | `--wa-color-purple-40` / `--wa-color-purple-60` |
| `--inserted-color` | Inserted lines in diffs                                                 | `--wa-color-green-40` / `--wa-color-green-60`   |
| `--deleted-color`  | Deleted lines in diffs                                                  | `--wa-color-red-40` / `--wa-color-red-60`       |

Set the custom properties to recolor tokens. Use `light-dark()` to pick a color for each mode.

```html {.example}
<wa-code-highlighter language="js" class="code-highlighter-colors">
  // Count the fish in the sea
  const fish = ['catfish', 'swordfish', 'pufferfish'];
  console.log(`There are ${fish.length} kinds of fish`);
</wa-code-highlighter>

<style>
  .code-highlighter-colors {
    --comment-color: light-dark(var(--wa-color-pink-40), var(--wa-color-pink-70));
    --keyword-color: light-dark(var(--wa-color-orange-40), var(--wa-color-orange-70));
    --string-color: light-dark(var(--wa-color-cyan-40), var(--wa-color-cyan-70));
  }
</style>
```

The default colors follow the theme's color scheme. To show one code block in dark mode, add `class="wa-dark"` to it.

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

:::info
<strong>Tokens can only change color, background color, and text decoration.</strong><br />
The CSS Custom Highlight API doesn't support other properties, so tokens can't be bold or italic.
:::

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
