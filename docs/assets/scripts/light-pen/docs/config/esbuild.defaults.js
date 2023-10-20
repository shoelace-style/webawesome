// This file is created and managed by Bridgetown.
// Instead of editing this file, add your overrides to `esbuild.config.js`
//
// To update this file to the latest version provided by Bridgetown,
// run `bridgetown esbuild update`. Any changes to this file will be overwritten
// when an update is applied hence we strongly recommend adding overrides to
// `esbuild.config.js` instead of editing this file.
//
// Shipped with Bridgetown v1.1.0

const path = require("path")
const fsLib = require("fs")
const fs = fsLib.promises
const { pathToFileURL, fileURLToPath } = require("url")
const glob = require("glob")
const postcss = require("postcss")
const postCssImport = require("postcss-import")
const readCache = require("read-cache")

// Detect if an NPM package is available
const moduleAvailable = name => {
  try {
    require.resolve(name)
    return true
  } catch (e) { }
  return false
}

// Generate a Source Map URL (used by the Sass plugin)
const generateSourceMappingURL = sourceMap => {
  const data = Buffer.from(JSON.stringify(sourceMap), "utf-8").toString("base64")
  return `/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${data} */`
}

// Import Sass if available
let sass
if (moduleAvailable("sass")) {
  sass = require("sass")
}

// Glob plugin derived from:
// https://github.com/thomaschaaf/esbuild-plugin-import-glob
// https://github.com/xiaohui-zhangxh/jsbundling-rails/commit/b15025dcc20f664b2b0eb238915991afdbc7cb58
const importGlobPlugin = () => ({
  name: "import-glob",
  setup: (build) => {
    build.onResolve({ filter: /\*/ }, async (args) => {
      if (args.resolveDir === "") {
        return; // Ignore unresolvable paths
      }

      const adjustedPath = args.path.replace(/^bridgetownComponents\//, "../../src/_components/")

      return {
        path: adjustedPath,
        namespace: "import-glob",
        pluginData: {
          path: adjustedPath,
          resolveDir: args.resolveDir,
        },
      }
    })

    build.onLoad({ filter: /.*/, namespace: "import-glob" }, async (args) => {
      const files = glob.sync(args.pluginData.path, {
        cwd: args.pluginData.resolveDir,
      }).sort()

      const importerCode = `
        ${files
          .map((module, index) => `import * as module${index} from '${module}'`)
          .join(';')}
        const modules = {${files
          .map((module, index) => `
            "${module.replace("../../src/_components/", "")}": module${index},`)
          .join("")}
        };
        export default modules;
      `

      return { contents: importerCode, resolveDir: args.pluginData.resolveDir }
    })
  },
})

// Plugin for PostCSS
const postCssPlugin = (options, configuration) => ({
  name: "postcss",
  async setup(build) {
    // Process .css files with PostCSS
    build.onLoad({ filter: (configuration.filter || /\.css$/) }, async (args) => {
      const additionalFilePaths = []
      const css = await fs.readFile(args.path, "utf8")

      // Configure import plugin so PostCSS can properly resolve `@import`ed CSS files
      const importPlugin = postCssImport({
        filter: itemPath => !itemPath.startsWith("/"), // ensure it doesn't try to import source-relative paths
        load: async filename => {
          let contents = await readCache(filename, "utf-8")
          const filedir = path.dirname(filename)
          // We'll want to track any imports later when in watch mode:
          additionalFilePaths.push(filename)

          // We need to transform `url(...)` in imported CSS so the filepaths are properly
          // relative to the entrypoint. Seems icky to have to hack this! C'est la vie...
          contents = contents.replace(/url\(['"]?\.\/(.*?)['"]?\)/g, (_match, p1) => {
            const relpath = path.relative(args.path, path.resolve(filedir, p1)).replace(/^\.\.\//, "")
            return `url("${relpath}")`
          })
          return contents
        }
      })

      // Process the file through PostCSS
      const result = await postcss([importPlugin, ...options.plugins]).process(css, {
        map: true,
        ...options.options,
        from: args.path,
      });

      return {
        contents: result.css,
        loader: "css",
        watchFiles: [args.path, ...additionalFilePaths],
      }
    })
  },
})

// Plugin for Sass
const sassPlugin = (options) => ({
  name: "sass",
  async setup(build) {
    // Process .scss and .sass files with Sass
    build.onLoad({ filter: /\.(sass|scss)$/ }, async (args) => {
      if (!sass) {
        console.error("error: Sass is not installed. Try running `yarn add sass` and then building again.")
        return
      }

      const modulesFolder = pathToFileURL("node_modules/")

      const localOptions = {
        importers: [{
          // An importer that redirects relative URLs starting with "~" to
          // `node_modules`.
          findFileUrl(url) {
            if (!url.startsWith('~')) return null
            return new URL(url.substring(1), modulesFolder)
          }
        }],
        sourceMap: true,
        ...options
      }
      const result = sass.compile(args.path, localOptions)

      const watchPaths = result.loadedUrls
        .filter((x) => x.protocol === "file:" && !x.pathname.startsWith(modulesFolder.pathname))
        .map((x) => x.pathname)

      let cssOutput = result.css.toString()

      if (result.sourceMap) {
        const basedir = process.cwd()
        const sourceMap = result.sourceMap

        const promises = sourceMap.sources.map(async source => {
          const sourceFile = await fs.readFile(fileURLToPath(source), "utf8")
          return sourceFile
        })
        sourceMap.sourcesContent = await Promise.all(promises)

        sourceMap.sources = sourceMap.sources.map(source => {
          return path.relative(basedir, fileURLToPath(source))
        })

        cssOutput += '\n' + generateSourceMappingURL(sourceMap)
      }

      return {
        contents: cssOutput,
        loader: "css",
        watchFiles: [args.path, ...watchPaths],
      }
    })
  },
})

// Set up defaults and generate frontend bundling manifest file
const bridgetownPreset = (outputFolder) => ({
  name: "bridgetownPreset",
  async setup(build) {
    // Ensure any imports anywhere starting with `/` are left verbatim
    // so they can be used in-browser for actual `src` repo files
    build.onResolve({ filter: /^\// }, args => {
      return { path: args.path, external: true }
    })

    build.onStart(() => {
      console.log("esbuild: frontend bundling started...")
    })

    // Generate the final output manifest
    build.onEnd(async (result) => {
      if (!result.metafile) {
        console.warn("esbuild: build process error, cannot write manifest")
        return
      }
      await fs.writeFile(path.join(outputFolder, 'meta.json'), JSON.stringify(result.metafile), { encoding: "utf8" })

      const manifest = {}
      const entrypoints = []

      // We don't need `frontend/` cluttering up everything
      // const stripPrefix = (str) => str.replace(/^frontend\//, "")

      // For calculating the file size of bundle output
      const fileSize = (path) => {
        const { size } = fsLib.statSync(path)
        const i = Math.floor(Math.log(size) / Math.log(1024))
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ['B', 'KB', 'MB', 'GB', 'TB'][i]
      }

      // Let's loop through all the various outputs
      // for (const key in result.metafile.outputs) {
        // const value = result.metafile.outputs[key]
        // const inputs = Object.keys(value.inputs)
        // const pathShortener = new RegExp(`^${outputFolder}\\/_bridgetown\\/static\\/`, "g")
        // const outputPath = key.replace(pathShortener, "")

        // if (value.entryPoint) {
        //   // We have an entrypoint!
        //   manifest[stripPrefix(value.entryPoint)] = outputPath
        //   entrypoints.push([outputPath, fileSize(key)])
        // } else if (key.match(/index(\.js)?\.[^-.]*\.css/) && inputs.find(item => item.match(/\.(s?css|sass)$/))) {
        //   // Special treatment for index.css
        //   manifest[stripPrefix(inputs.find(item => item.match(/\.(s?css|sass)$/)))] = outputPath
        //   entrypoints.push([outputPath, fileSize(key)])
        // } else if (inputs.length > 0) {
        //   // Naive implementation, we'll just grab the first input and hope it's accurate
        //   manifest[stripPrefix(inputs[0])] = outputPath
        // }
      // }

      // const manifestFolder = path.join(process.cwd(), ".bridgetown-cache", "frontend-bundling")
      // await fs.mkdir(manifestFolder, { recursive: true })
      // await fs.writeFile(path.join(manifestFolder, "manifest.json"), JSON.stringify(manifest))

      console.log("esbuild: frontend bundling complete!")
      console.log("esbuild: entrypoints processed:")
      entrypoints.forEach(entrypoint => {
        const [entrypointName, entrypointSize] = entrypoint
        console.log(`         - ${entrypointName}: ${entrypointSize}`)
      })
    })
  }
})

// Load the PostCSS config from postcss.config.js or whatever else is a supported location/format
const postcssrc = require("postcss-load-config")
const postCssConfig = postcssrc.sync()

module.exports = async (outputFolder, esbuildOptions) => {
  esbuildOptions.plugins = esbuildOptions.plugins || []
  // Add the PostCSS & glob plugins to the top of the plugin stack
  esbuildOptions.plugins.unshift(postCssPlugin(postCssConfig, esbuildOptions.postCssPluginConfig || {}))
  if (esbuildOptions.postCssPluginConfig) delete esbuildOptions.postCssPluginConfig
  esbuildOptions.plugins.unshift(importGlobPlugin())
  // Add the Sass plugin
  esbuildOptions.plugins.push(sassPlugin(esbuildOptions.sassOptions || {}))
  // Add the Bridgetown preset
  esbuildOptions.plugins.push(bridgetownPreset(outputFolder))

  // esbuild, take it away!
  const esbuild = require("esbuild")

  const watch = process.argv.includes("--watch")

  const config = {
    bundle: true,
    loader: {
      ".jpg": "file",
      ".png": "file",
      ".gif": "file",
      ".svg": "file",
      ".woff": "file",
      ".woff2": "file",
      ".ttf": "file",
      ".eot": "file",
    },
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".css", ".scss", ".sass", ".json", ".js.rb"],
    nodePaths: ["frontend/javascript", "frontend/styles"],
    minify: process.argv.includes("--minify"),
    sourcemap: true,
    target: "es2016",
    entryPoints: ["frontend/javascript/index.js"],
    entryNames: "[dir]/[name].[hash]",
    outdir: path.join(process.cwd(), `${outputFolder}/bridgetown/static`),
    publicPath: "/bridgetown/static",
    metafile: true,
    ...esbuildOptions,
  }

  if (watch) {
    const context = await esbuild.context(config).catch(() => process.exit(1))
    await context.watch().catch(() => process.exit(1))
  } else {
    await esbuild.build(config).catch(() => process.exit(1))
  }
}
