import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import * as url from 'node:url';
import * as path from 'node:path';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import FullReload from "vite-plugin-full-reload"

import {customElementsManifest} from "./src/js/cem.js"
import { RemarkPluginFindAndReplace } from 'remark-plugin-find-and-replace';
import rehypeExternalLinks from 'rehype-external-links'

const version = customElementsManifest.package.version
const cdndir = "cdn"
const npmdir = "dist"

function remarkFrontmatterPlugin() {
  // All remark and rehype plugins return a separate function
  return function (tree, file) {
    const frontmatter = file.data.astro.frontmatter

    frontmatter.npmdir = npmdir
    frontmatter.cdndir = cdndir
    frontmatter.version = version;

  }
}

/**
 * Finds all HTML heading nodes (`<h1>` through `<h6>`)
 */
export function findHeadings(node) {
  let headingNodes = [];
  findHeadingsRecursive(node, headingNodes);
  return headingNodes;
}

/**
 * Determines whether the given node is an HTML element.
 */
export function isHtmlElementNode(node) {
  return typeof node === "object" &&
    node.type === "element" &&
    typeof node.tagName === "string" &&
    "properties" in node &&
    typeof node.properties === "object";
}
/**
 * Determines whether the given node is an HTML heading node, according to the specified options
 */
export function isHeadingNode(node) {
  return isHtmlElementNode(node) && ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName);
}

/**
 * Recursively crawls the HAST tree and adds all HTML heading nodes to the given array.
 */
function findHeadingsRecursive(node, headingNodes) {
  if (isHeadingNode(node)) {
    headingNodes.push(node);
  }

  if (node.children) {
    let parent = node;
    for (let child of parent.children) {
      findHeadingsRecursive(child, headingNodes);
    }
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
        path.relative(__dirname, "../dist/custom-elements.json"),
        path.relative(__dirname, "./public/**/*.*"),
      ]),
    ]
  },
  outDir: "../_site",
  site: 'https://shoelace.style',
  markdown: {
    remarkPlugins: [
      remarkFrontmatterPlugin,
      RemarkPluginFindAndReplace({
        replacements: [
          { pattern: '%VERSION%', replacement: version },
          { pattern: '%CDNDIR%', replacement: cdndir },
          { pattern: '%NPMDIR%', replacement: npmdir },
        ]
      })
    ],
    rehypePlugins: [
      () => rehypeExternalLinks({
        rel: ["nofollow", "noopener", "noreferrer"],
        target: ["_blank"],
        properties: {
          class: "external-link"
        }
      }),
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
      customCss: [
      ],
      // Component overrides
      components: {
        // Override the default `Head` component.
        Head: './src/components/overrides/Head.astro',
        TableOfContents: './src/components/overrides/TableOfContents.astro',
      },
		}),
	],
});
