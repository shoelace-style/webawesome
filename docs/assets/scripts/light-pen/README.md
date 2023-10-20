# Light(weight) Code(pen)

## Demo

<https://konnorrogers.github.io/light-pen>

## Purpose

A small lightweight editor using `<pre><code></code></pre>` and a `<textarea>`

Inspired by Chris Ferdinandi

## Install

```
npm install light-pen
```

## Getting started

```js
// Auto-register <light-pen>
import "light-pen"

// Registry yourself
import LightPen "light-pen/exports/light-pen.js"

LightPen.define() // Registers `<light-pen>`

// Register under another name
import LightPen "light-pen/exports/light-pen.js"
LightPen.define("other-name")
```

## Usage

```html
<light-pen></light-pen>
```

That's it!


### Slotting in HTML / CSS / JS

```html
<light-pen>
  <script type="text/plain" slot="html">
    <div style="color: red;">
      <div>Hi there friends</div>
    </div>

    <p>
      Sup dude
    </p>
  </script>

  <script type="text/plain" slot="css">
    p {
      color: green;
    }
  </script>

  <script type="text/plain" slot="js">
    console.log("Hi")
  </script>
</light-pen>
```

### Changing the title

```html
<light-pen>
  <div slot="title">My Awesome Editor</div>
</light-pen>
```

### Opening languages by default

`<light-pen>` Takes a string of comma separated languages to open on initial render.

```
<light-pen open-languages="html,css,js">
</light-pen>
```

More to come for more docs coming on how to change things!

## Roadmap

- [ ] - Implement an extendable `LightPenBase` which includes a pluggable syntax highlighter and theme.
- [ ] - Implement `<textarea>` rendering hooks to add CodeMirror for more robuste setups.
- [ ] - Add vertical resizing of `<textarea>`
- [ ] - More documentation around customization.
- [ ] - Add a console logger
>>>>>>> 7b592c8f5f05ed82d439d7950450eec06dc3ab66
