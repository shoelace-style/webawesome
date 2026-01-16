---
title: Angular
description: Tips for using Web Awesome in your Angular app.
layout: page-outline
---

# Angular

Angular [plays nice](https://custom-elements-everywhere.com/#angular) with custom elements, so you can use Web Awesome in your Angular apps with ease.

## Installation

### Download the npm package

To add Web Awesome to your Angular app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

### Update the Angular Configuration

Next, [include a theme](/getting-started/themes). In this example, we'll import the light theme.

Its also important to load the components by using a `<script>` tag into the index.html file. However, the Angular way to do it is by adding a script configurations into your angular.json file as follows:

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

## Configuration

Then make sure to apply the custom elements schema as shown below.

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

## Reference Web Awesome components in your Angular component code

```js
// need to have both or Angular will tree shake the component out.
import type { WaDrawer } from '@awesome.me/webawesome/dist/components/drawer/drawer.js';
import "@awesome.me/webawesome/dist/components/drawer/drawer.js";

@Component({
  selector: 'app-drawer-example',
  template: '<div id="page"><button (click)="showDrawer()">Show drawer</button><wa-drawer #drawer label="Drawer" class="drawer-focus" style="--size: 50vw"><p>Drawer content</p></wa-drawer></div>'
})
export class DrawerExampleComponent implements OnInit {

  // use @ViewChild to get a reference to the #drawer element within component template
  @ViewChild('drawer')
  drawer?: ElementRef<WaDrawer>;

  ...

  constructor(...) {
  }

  ngOnInit() {
  }

  ...

  showDrawer() {
    // use nativeElement to access Web Awesome components
    this.drawer?.nativeElement.show();
  }
}
```

Now you can start using Web Awesome components in your app!

:::tip
Are you using Web Awesome with Angular? [Help us improve this page!](https://github.com/shoelace-style/webawesome/blob/next/docs/frameworks/angular.md)
:::