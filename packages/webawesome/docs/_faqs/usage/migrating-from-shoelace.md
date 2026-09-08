---
question: I'm coming from Shoelace. Where do I start?
order: 15
synonyms: [shoelace, migrate, sl-, upgrade, migration, getting started]
source: webawesome/docs/docs/resources/migrating-from-shoelace.md (TL;DR, "Choose Your Migration Path", "Frequent Gotchas"); webawesome/docs/docs/resources/migration-checklist.njk
---
The <a href="/docs/resources/migrating-from-shoelace">migration guide</a> is written for exactly this. It starts with the mechanical find-and-replace (<code>@shoelace-style/shoelace</code> to <code>@awesome.me/webawesome</code>, then <code>sl-</code> to <code>wa-</code> across elements, events, and CSS variables), then walks component by component through what actually changed. Track your progress with the <a href="/docs/resources/migration-checklist">interactive checklist</a>, or hand the mechanical passes to a coding agent using the prompt the guide provides. Its Frequent Gotchas section collects the surprises we hear about most.
