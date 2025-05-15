// @ts-check
import {runScript} from "../../../webawesome/scripts/utils.js"
import * as url from 'url';
import * as path from 'node:path';
import * as fs from "node:fs/promises"
import copy from "recursive-copy"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..", "..")

const BUNDLED_DIR = path.resolve(path.join(ROOT_DIR, "_bundle_"))
const PAGES_DIR = path.resolve(path.join(BUNDLED_DIR, "pages"))

const FREE_DIR = path.resolve(path.join(ROOT_DIR, "..", "webawesome"))
const FREE_SRC_DIR = path.join(FREE_DIR, "src")
const FREE_DOCS_DIR = path.join(FREE_DIR, "docs")

const PRO_DOCS_DIR = path.resolve(path.join(ROOT_DIR, "docs"))
const PRO_SRC_DIR = path.resolve(path.join(ROOT_DIR, "src"))

const DIST_DIR = path.resolve(path.join(ROOT_DIR, "dist"))
const DIST_CDN_DIR = path.resolve(path.join(ROOT_DIR, "dist-cdn"))

// Set env vars for the build.js process.
process.env.ROOT_DIR = BUNDLED_DIR
process.env.DIST_DIR = path.join(ROOT_DIR, "dist")
process.env.CDN_DIR = path.join(ROOT_DIR, "dist-cdn")
process.env.DOCS_DIR = path.join(BUNDLED_DIR, "pages", "")
process.env.SKIP_ELEVENTY = "true" // We're going to run our own.

/**
 * Copies all files into 1 giant "_bundle_" directory to then run ESBuild + 11ty on top of.
 */
export async function bundleEverything () {
  await fs.rm(BUNDLED_DIR, { recursive: true, force: true })
  await fs.mkdir(BUNDLED_DIR)

  // Bundle src files to run esbuild on them.
  await fs.cp(FREE_SRC_DIR, path.join(BUNDLED_DIR, "src"), { recursive: true })
  await fs.cp(PRO_SRC_DIR, path.join(BUNDLED_DIR, "src"), { recursive: true })

  // Bundle docs directories to run 11ty on them.
  // Copy "docs" to "pages" so that 11ty has full context.
  await fs.cp(FREE_DOCS_DIR, PAGES_DIR, { recursive: true })
  await fs.cp(PRO_DOCS_DIR, PAGES_DIR, { recursive: true })
}

export async function buildDocs () {
  // For some reason 11ty has to be run separately. If its run "in process", it caches incorrectly and breaks.
  await runScript(path.join(ROOT_DIR, "scripts", "docs.js"), [])
}

export async function copyCdnBuild () {
  // These need to be copied separately into "_site" because 11ty doesn't copy them over.
  await copy(DIST_CDN_DIR, path.join(ROOT_DIR, "_site", "dist"))
}

export async function buildPackage () {

}
