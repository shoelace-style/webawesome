import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import * as url from 'node:url';
import * as path from 'node:path';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import FullReload from "vite-plugin-full-reload"

import {customElementsManifest} from "./src/js/cem.js"

const version = customElementsManifest.package.version
const cdndir = "cdn"
const npmdir = "dist"

export function remarkFrontmatterPlugin() {
  // All remark and rehype plugins return a separate function
  return function (tree, file) {
    const frontmatter = file.data.astro.frontmatter

    frontmatter.npmdir = npmdir
    frontmatter.cdndir = cdndir
    frontmatter.version = version;
  }
}

// https://astro.build/config
export default defineConfig({
  server: {
    open: true
  },
  vite: {
    plugins: [
      FullReload([
        path.relative(__dirname, "../dist/custom-elements.json")
      ])
    ]
  },
	integrations: [
		starlight({
			title: 'Web Awesome',
			social: {
				github: 'https://github.com/shoelace-style/shoelace',
			},
			sidebar: [
        {
          label: "Experimental",
          autogenerate: { directory: "experimental" }
        },
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" }
        },
        {
          label: "Frameworks",
          autogenerate: { directory: "frameworks" }
        },
        {
          label: "Resources",
          autogenerate: { directory: "resources" }
        },
				{
					label: 'Components',
					autogenerate: { directory: 'components' },
				},
        {
          label: "Design Tokens",
          autogenerate: { directory: "tokens" }
        },
        {
          label: "Tutorials",
          autogenerate: { directory: "tutorials" }
        },
			],
			// Global CSS
      customCss: ['../dist/themes/default.css'],
      // Component overrides
      components: {
        // Override the default `Head` component.
        Head: './src/components/Head.astro',
      },
		}),

	],
});
