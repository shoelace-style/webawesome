import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import FullReload from 'vite-plugin-full-reload'

// https://astro.build/config
export default defineConfig({
  server: {
    open: true
  },
  vite: {
    plugins: [
      FullReload([
        "../custom-elements.json",
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
          autogenerate: { directory: "tokens" }
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
