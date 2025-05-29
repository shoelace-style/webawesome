# Web Awesome

- Works with all frameworks 🧩
- Works with CDNs 🚛
- Fully customizable with CSS 🎨
- Includes an official dark theme 🌛
- Built with accessibility in mind ♿️
- Open source 😸

Built by the folks behind [Font Awesome](https://fontawesome.com/).

---

Documentation: [webawesome.com](https://webawesome.com)

Source: [github.com/shoelace-style/webawesome](https://github.com/shoelace-style/webawesome)

Twitter: [@webawesomer](https://twitter.com/webawesomer)

---

## Developers ✨

Developers can use this documentation to learn how to build Web Awesome from source. You will need Node >= 14.17 to build and run the project locally.

**You don't need to do any of this to use Web Awesome!** This page is for people who want to contribute to the project, tinker with the source, or create a custom build of Web Awesome.

If that's not what you're trying to do, the [documentation website](https://webawesome.com) is where you want to be.

### What are you using to build Web Awesome?

Components are built with [LitElement](https://lit-element.polymer-project.org/), a custom elements base class that provides an intuitive API and reactive data binding. The build is a custom script with bundling powered by [esbuild](https://esbuild.github.io/).

### Why is Web Awesome a monorepo?

Web Awesome uses [NPM workspaces](https://docs.npmjs.com/cli/v11/using-npm/workspaces)

By using a NPM workspaces and a monorepo, we can get consistent builds, shared configurations, and reduced duplication across repositories which reduces regressions and forces consistency across `webawesome`, `webawesome-pro`, and `webawesome-app`.

Generally, if you plan to only work with the free version of `webawesome` it is easiest to go to `packages/webawesome` and run all commands from there.

### Dependency philosophy

Any dependencies intended to be used across all packages (IE: `prettier`, `eslint`) that are _NOT_ used at runtime (such as `lit`) should be in the root `devDependencies` of `package.json`.

```bash
npm install -D -w prettier
```

Any dependencies that will be used at runtime by a package should be part of the specific package's `"dependencies"` such as `lit`. This is required because if that dependency is not in the `packages/*/package.json`, it will not be installed when used via NPM.

Individual packages are also free to install devDependencies as needed as long as they are specific to that package only.

### Forking the Repo

Start by [forking the repo](https://github.com/shoelace-style/webawesome/fork) on GitHub, then clone it locally and install dependencies.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/webawesome
cd webawesome/packages/webawesome
npm install
```

### Developing

Once you've cloned the repo, run the following command from the respective directory within `packages/*`

```bash
npm start
```

This will spin up the dev server. After the initial build, a browser will open automatically. There is currently no hot module reloading (HMR), as browser's don't provide a way to reregister custom elements, but most changes to the source will reload the browser automatically.

### Building

To generate a production build, run the following command.

```bash
npm run build
```

You can also run `npm run build:serve` to start an [`http-server`](https://www.npmjs.com/package/http-server) instance on `http://localhost:4000` after the build completes, so you can preview the production build.

### Creating New Components

To scaffold a new component, run the following command, replacing `wa-tag-name` with the desired tag name.

```bash
npm run create wa-tag-name
```

This will generate a source file, a stylesheet, and a docs page for you. When you start the dev server, you'll find the new component in the "Components" section of the sidebar.

### Contributing

Web Awesome is an open source project and contributions are encouraged! If you're interesting in contributing, please review the [contribution guidelines](CONTRIBUTING.md) first.

## License

Web Awesome is available under the terms of the MIT license.