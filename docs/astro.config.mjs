import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import * as url from 'node:url';
import * as path from 'node:path';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import FullReload from 'vite-plugin-full-reload';

import { customElementsManifest } from './src/js/cem.js';
import { RemarkPluginFindAndReplace } from 'remark-plugin-find-and-replace';
import rehypeExternalLinks from 'rehype-external-links';
import remarkCodeHighlighter from './src/plugins/prism';
import GithubAutolink from './src/plugins/github-autolink.ts';

const version = customElementsManifest().package.version;
const cdndir = 'cdn';
const npmdir = 'dist';

function remarkFrontmatterPlugin() {
  // All remark and rehype plugins return a separate function
  return function (tree, file) {
    const frontmatter = file.data.astro.frontmatter;

    frontmatter.npmdir = npmdir;
    frontmatter.cdndir = cdndir;
    frontmatter.version = version;
  };
}

// https://astro.build/config
export default defineConfig({
  server: {
    open: true,
    port: 4000,
    host: true
  },
  vite: {
    plugins: [
      FullReload([
        path.relative(__dirname, '../dist/custom-elements.json'),
        path.relative(__dirname, './public/**/*.*')
      ])
    ]
  },
  outDir: '../_site',
  site: 'https://shoelace.style',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [
      remarkFrontmatterPlugin,
      RemarkPluginFindAndReplace({
        replacements: [
          { pattern: '%VERSION%', replacement: version },
          { pattern: '%CDNDIR%', replacement: cdndir },
          { pattern: '%NPMDIR%', replacement: npmdir }
        ]
      }),
      GithubAutolink,
      remarkCodeHighlighter
    ],
    rehypePlugins: [
      () =>
        rehypeExternalLinks({
          rel: ['nofollow', 'noopener', 'noreferrer'],
          target: ['_blank'],
          properties: {
            class: 'external-link'
          }
        })
    ]
  },
  integrations: [
    starlight({
      expressiveCode: false,
      title: 'Web Awesome',
      social: {
        github: 'https://github.com/shoelace-style/shoelace',
        twitter: 'https://twitter.com/shoelace_style'
      },
      sidebar: [
        {
          label: 'Experimental',
          autogenerate: { directory: 'experimental' }
        },
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' }
        },
        {
          label: 'Frameworks',
          autogenerate: { directory: 'frameworks' }
        },
        {
          label: 'Resources',
          autogenerate: { directory: 'resources' },
          items: [
            {
              label: 'Community',
              link: '/resources/community'
            },
            {
              label: 'Help & Support',
              link: 'https://github.com/shoelace-style/shoelace/discussions'
            },
            {
              label: 'Accessibility',
              link: '/resources/accessibility'
            },
            {
              label: 'Contributing',
              link: '/resources/contributing'
            },
            {
              label: 'Changelog',
              link: '/resources/changelog'
            }
          ]
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' }
        },
        {
          label: 'Design Tokens',
          autogenerate: { directory: 'tokens' }
        },
        {
          label: 'Tutorials',
          autogenerate: { directory: 'tutorials' }
        }
      ],
      // Component overrides
      components: {
        // Override the default `Head` component.
        Head: './src/components/overrides/Head.astro',
        TableOfContents: './src/components/overrides/TableOfContents.astro',
        Search: './src/components/overrides/Search.astro'
      }
    })
  ]
});
