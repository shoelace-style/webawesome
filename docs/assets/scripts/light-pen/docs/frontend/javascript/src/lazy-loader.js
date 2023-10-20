import LazyLoader from "web-component-lazy-loader";

export default function lazyLoader() {
  return new LazyLoader({
    components: {
      "light-pen": {
        register () {
          import("light-pen/exports/light-pen-register.js")
        }
      },
      "light-preview": {
        register () {
          import("light-pen/exports/light-preview-register.js")
        }
      },
      "clipboard-copy": {
        register() {
          import("@github/clipboard-copy-element");
        },
      },
      "external-icon": {
        register() {
          import("./external-icon.js");
        },
      },

      // Shoelace
      "sl-alert": {
        register() {
          import("@shoelace-style/shoelace/dist/components/alert/alert.js");
        },
      },
      // "sl-breadcrumb": {
      // register () { import("@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js"); }
      // },
      // "sl-breadcrumb-item": {
      // register () { import("@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js"); }
      // },
      "sl-button": {
        register() {
          import("@shoelace-style/shoelace/dist/components/button/button.js");
        },
      },
      "sl-divider": {
        register() {
          import("@shoelace-style/shoelace/dist/components/divider/divider.js");
        },
      },
      "sl-drawer": {
        register() {
          import("@shoelace-style/shoelace/dist/components/drawer/drawer.js");
        },
      },
      "sl-dropdown": {
        register() {
          import(
            "@shoelace-style/shoelace/dist/components/dropdown/dropdown.js"
          );
        },
      },
      "sl-icon": {
        register() {
          import("@shoelace-style/shoelace/dist/components/icon/icon.js");
        },
      },
      "sl-icon-button": {
        register() {
          import(
            "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js"
          );
        },
      },
      "sl-menu": {
        register() {
          import("@shoelace-style/shoelace/dist/components/menu/menu.js");
        },
      },
      "sl-menu-item": {
        register() {
          import(
            "@shoelace-style/shoelace/dist/components/menu-item/menu-item.js"
          );
        },
      },
      "sl-menu-label": {
        register() {
          import(
            "@shoelace-style/shoelace/dist/components/menu-label/menu-label.js"
          );
        },
      },
      "sl-visually-hidden": {
        register() {
          import(
            "@shoelace-style/shoelace/dist/components/visually-hidden/visually-hidden.js"
          );
        },
      },
    },
  }).start();
}
