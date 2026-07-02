---
title: Angular
description: Tips for using Web Awesome in your Angular app.
layout: framework
officialDocs: https://angular.dev
---

Angular [plays nice](https://custom-elements-everywhere.com/#angular) with custom elements, so you can use Web Awesome in your Angular apps with ease.

## Installation

To add Web Awesome to your Angular app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

## Configuration

### Load the Theme

[Include a theme](/docs/themes) by adding the stylesheet to the `styles` array in your `angular.json` file:

```json
"architect": {
  "build": {
    ...
    "options": {
      ...
      "styles": [
        "src/styles.scss",
        "@awesome.me/webawesome/dist/styles/webawesome.css"
       ]
      ...
    }
  }
}
```

### Apply the Custom Elements Schema

Apply the custom elements schema so Angular allows Web Awesome's `wa-*` tags:

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

## Usage

Reference Web Awesome components from your component code. Import both the component and its type — otherwise Angular tree-shakes the component out of your build:

```js
import type { WaDrawer } from '@awesome.me/webawesome/dist/components/drawer/drawer.js';
import '@awesome.me/webawesome/dist/components/drawer/drawer.js';

@Component({
  selector: 'app-drawer-example',
  template: '<div id="page"><button (click)="showDrawer()">Show drawer</button><wa-drawer #drawer label="Drawer" class="drawer-focus" style="--size: 50vw"><p>Drawer content</p></wa-drawer></div>',
})
export class DrawerExampleComponent {
  // @ViewChild gives a typed reference to the <wa-drawer> element
  @ViewChild('drawer')
  drawer?: ElementRef<WaDrawer>;

  showDrawer() {
    // Access Web Awesome methods via nativeElement
    this.drawer?.nativeElement.show();
  }
}
```

<wa-callout variant="success">
  <strong>Web Awesome is ready to use.</strong><br />
  Explore components, utilities, and theming to start building.
</wa-callout>
