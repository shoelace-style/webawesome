---
question: Why isn't my icon showing up?
order: 10
synonyms: [blank icons, missing icons, icon not rendering, wa-icon, icon library]
source: webawesome/src/components/icon/icon.ts (resolveIcon, setIcon); webawesome/docs/docs/components/icon.md (icon libraries, custom icons, third-party libraries)
---
A blank space means the name didn't resolve to an SVG. Without a <code>library</code> attribute, <a href="/docs/components/icon"><code>&lt;wa-icon&gt;</code></a> looks the name up in the <code>default</code> library, which is Font Awesome's free icons, so a name borrowed from another set won't be found. Check yours against <a href="https://fontawesome.com/search?o=r&amp;m=free&amp;f=brands%2Cclassic" target="_blank" rel="noopener noreferrer">Font Awesome's icon search</a>. The other two usual suspects are a custom library that hasn't registered yet and a URL the browser refused, since icons load over CORS. Whichever it is, the icon fires a <code>wa-error</code> event when a fetch fails, so listen for that to catch any of them. If you're pulling from another set on purpose, register it with <code>registerIconLibrary()</code> and point the icon at it with <code>library</code>.
