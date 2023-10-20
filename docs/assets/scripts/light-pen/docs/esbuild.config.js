// @ts-check
const { spawn } = require("child_process");

// const glob = require("glob")
const build = require("./config/esbuild.defaults.js")

const AssetMapper = require("asset-mapper-esbuild").default
// Update this if you need to configure a destination folder other than `output`
const outputFolder = "src"

// You can customize this as you wish, perhaps to add new esbuild plugins.
//
// ```
const path = require("path")
const esbuildCopy = require('esbuild-plugin-copy').default
// const esbuildOptions = {
// }
// ```
//
// You can also support custom base_path deployments via changing `publicPath`.
//
// ```
// const esbuildOptions = { publicPath: "/my_subfolder/_bridgetown/static" }
// ```
const watch = process.argv.includes("--watch")

const esbuildOptions = {
  target: "es2020",
  entryPoints: {
    "javascript/index": "frontend/javascript/index.js",
    "javascript/defer": "frontend/javascript/defer.js",
    "light-pen/exports/light-pen": "../exports/light-pen.js",
    "light-pen/exports/light-preview": "../exports/light-preview.js",
  },
  define: {
    "process.env.BASE_PATH": `"${process.env.BASE_PATH}"`
  },
  publicPath: path.join(process.env.BASE_PATH, "bridgetown", "static"),
  outdir: path.join(process.cwd(), outputFolder, "bridgetown", "static"),
  splitting: true,
  format: "esm",
  plugins: [
    esbuildCopy({
      assets: {
        from: [path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets/icons/**/*.svg')],
        to: [path.resolve(__dirname, 'src/shoelace-assets/assets/icons')],
      },
      verbose: false
    }),
    AssetMapper({
      manifestFile: path.join(process.cwd(), ".bridgetown-cache", "asset-mapper-manifest.json"),
      // outputRoot: path.join(process.cwd(), process.env.BASE_PATH)
    }),
  ]
}

build(outputFolder, esbuildOptions)
