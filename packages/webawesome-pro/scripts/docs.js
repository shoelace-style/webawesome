import * as path from "node:path";
import * as os from "node:os";
import * as fs from "node:fs/promises";
import Eleventy from "@11ty/eleventy"
import { getRootDir } from "../src/utilities/file";

async function buildDocs () {
  // This looks weird, but by writing to a temp directory first, and then deleting + copying, we reduce the amount of "downtime"
  const tmpPath = path.join(os.tmpdir(), "site")
  const outputPath = path.join(getRootDir(), "_site")

  // We could *probably* do incremental builds, but may need to diff before / after.
  // eleventy.setIncrementalBuild(true)

  const eleventy = new Eleventy(getRootDir(), tmpPath, {
    quietMode: true,
    configPath: path.join(getRootDir(), ".eleventy.js")
  });

  // Write to a temp directory
  console.log("Writing 11ty docs...")

  await eleventy.write()

  // Delete the current site
  console.log("Deleting 11ty build...")
  await fs.rm(outputPath, { force: true, recursive: true })

  // Copy to the current site
  console.log("Copying new 11ty build...")

  await fs.cp(tmpPath, outputPath, { force: true, recursive: true })
  await fs.rm(tmpPath, { force: true, recursive: true })

  console.log("11ty build complete!")
}

await buildDocs()

