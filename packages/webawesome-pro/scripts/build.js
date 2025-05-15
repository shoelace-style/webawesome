// @ts-check
import {
  bundleEverything,
  build
} from "./utils/build.js"

import * as fs from "node:fs/promises"
import * as path from "node:path"

import * as url from 'url';

;(async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

  await bundleEverything()
  await import("./sync.js")
  const packageRoot = path.resolve(path.join(__dirname, ".."))
  await fs.cp(path.join(packageRoot, "package.json"), path.join(process.env.ROOT_DIR, "package.json"))
  await fs.cp(path.join(packageRoot, "tsconfig.prod.json"), path.join(process.env.ROOT_DIR, "tsconfig.prod.json"))
  await build()

  // Copy dist, dist-cdn, and _site to the root of the package.
  const bundleRoot = process.env.ROOT_DIR || "."

  await Promise.allSettled(
    ["dist", "dist-cdn", "_site"].map((str) => {
      const src = path.join(bundleRoot, str)
      const dest = path.join(packageRoot, str)
      console.log("Copying " + src + " to " + dest)
      return fs.cp(src, dest, { recursive: true })
    })
  )
})()
