---
question: Why doesn't dark mode work?
order: 40
synonyms: [dark mode, wa-dark, color scheme, light mode, theme]
source: webawesome/docs/docs/theming-overview.md ("Light & Dark Mode"); webawesome/docs/docs/customizing.md ("Light and Dark Mode")
---
Light mode applies by default, and dark mode is a class you add: <code>class="wa-dark"</code> on <code>&lt;html&gt;</code> for the whole page, or on any section to darken just that part. If you're coming from another library, make sure you swapped its color-scheme class name for this one. Don't put <code>wa-dark</code> (or <code>wa-light</code>, or <code>wa-invert</code>) directly on a component, though. Those classes reset the variant color tokens on whatever element they land on, which stomps the component's own variant styles. Put the class on a wrapper instead. <a href="/docs/customizing#light-and-dark-mode">Light and Dark Mode</a> has the snippet for detecting the system preference and toggling.
