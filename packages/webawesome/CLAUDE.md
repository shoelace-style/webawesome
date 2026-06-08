# CLAUDE.md

Web Awesome — free/open-source Lit-based web component library (`@awesome.me/webawesome`). Part of a monorepo; the pro package (`webawesome-pro`) extends this one.

## Commands

```bash
npm start                  # Dev server with watch mode
npm run build              # Production build (esbuild)
npm test                   # Run all component tests (web-test-runner)
npm run test:component -- --watch --group button  # Watch single component tests
npm run create             # Create new component (interactive Plop prompt)
npm run verify             # prettier + build + test (full check)
npm run check-types        # TypeScript type checking
npm run prettier:fix       # Format code
```

## Component Anatomy

Each component lives in `src/components/<name>/` with three files:

- `<name>.ts` — Component class (Lit web component)
- `<name>.styles.ts` — Styles using Lit `css` tagged template
- `<name>.test.ts` — Tests (web-test-runner + @open-wc/testing)

Create new components with `npm run create` (Plop templates in `scripts/plop/`). Names must start with `wa-`.

## Base Classes

**Never extend `LitElement` directly.** Use these base classes from `src/internal/`:

- **`WebAwesomeElement`** (`webawesome-element.ts`) — Base for all components. Use `static css` (not Lit's `static styles`) — host styles are auto-prepended. Supports SSR, ElementInternals, custom states.
- **`WebAwesomeFormAssociatedElement`** (`webawesome-form-associated-element.ts`) — For form controls. Adds form association, constraint validation, `ElementInternals`. Override `static get validators()` to return an array of validation rules.

## Decorators & Reactivity

- `@customElement('wa-name')` — Registers the custom element.
- `@property({ reflect: true })` — Reactive public property, reflects to HTML attribute.
- `@state()` — Reactive internal state (no attribute reflection).
- `@query('.selector')` — Cached shadow DOM query.
- `@watch('propertyName')` — Runs handler when a property changes. Use `{ waitUntilFirstUpdate: true }` to skip the initial value.

## Controllers

Instantiate in the class body (not constructor):

- `HasSlotController(this, 'slot-name')` — Tracks whether named slots have content. Used for conditional rendering.
- `LocalizeController(this)` — i18n/l10n for component strings. Translations in `src/translations/`.

## Style Conventions

- Export default `css` tagged template literal from `component.styles.ts`.
- Wrap component styles in `@layer wa-component { ... }`.
- Use CSS custom properties with `--wa-*` prefix.
- Import shared styles: `variantStyles` (neutral/brand/success/warning/danger), `sizeStyles` (small/medium/large) from `src/styles/component/`.
- Combine via `static css = [styles, variantStyles, sizeStyles]`.
- Style host states via `:host(:state(loading))`, variants via `:host([variant='brand'])`.

## JSDoc Requirements (Critical)

Every component class **must** have these JSDoc tags — they drive Custom Elements Manifest (CEM) generation and documentation:

```
@summary       — One-line description
@documentation — URL to docs page (https://webawesome.com/docs/components/...)
@status        — stable | experimental | deprecated
@since         — Version number (e.g., 1.0)
@dependency    — Each wa-* sub-component used (one tag per dependency)
@slot          — Each slot (use `@slot -` for the default slot)
@event         — Each custom event emitted (e.g., `wa-change`)
@csspart       — Each shadow DOM part exposed
@cssstate      — Each CSS custom state (e.g., disabled, loading)
@cssproperty   — Each CSS custom property exposed
```

Missing tags will cause missing documentation and incomplete CEM output.

## Testing

- **Framework**: `@open-wc/testing` with `web-test-runner` (Playwright: Chromium, Firefox, WebKit).
- **Fixture**: Import `{ fixtures }` from `src/internal/test/fixture.js` — an array of CSR/SSR-aware fixture functions (`clientFixture`, `hydratedFixture`). For simple CSR-only tests, `fixture` from `@open-wc/testing` also works.
- **Accessibility**: `await expect(el).to.be.accessible();`
- **Form controls**: `runFormControlBaseTests({ tagName: 'wa-input' })` from `src/internal/test/form-control-base-tests.js` — runs standard form behavior tests.
- **Spies/stubs**: Sinon. **Async helpers**: `aTimeout(ms)`, `waitUntil(() => condition)`.
- **Run single component**: `npm run test:component -- --watch --group <name>` (group = component name without `wa-` prefix).

## Build System

Custom esbuild-based build (`scripts/build.js`). Generates:

- `dist/` — Unbundled ES modules + TypeScript declarations
- `dist-cdn/` — Bundled for CDN use
- Custom Elements Manifest (`custom-elements.json`)
- React wrappers (`src/react/`)
- Agent skill (`dist/skills/webawesome/`) and `dist/llms.txt` — AI-ready component API docs

## Key Directories

- `src/components/` — All components
- `src/internal/` — Base classes, decorators (`watch.ts`), controllers (`slot.ts`), validators
- `src/styles/` — Shared styles, themes, color palettes, CSS utilities
- `src/events/` — Custom event class definitions
- `src/translations/` — i18n message files (30+ locales)
- `docs/` — Component documentation (11ty/Nunjucks)

## Common Tasks

- **New component**: Run `npm run create`, enter `wa-component-name`. Generates three files in `src/components/<name>/`. Add JSDoc tags (see above), implement `render()`, add styles.
- **Add a property**: `@property({ reflect: true }) propName: Type = default;` — use `reflect: true` if it should be settable via HTML attribute.
- **Add a slot**: Add `<slot name="name"></slot>` in `render()`, add `@slot name` JSDoc tag, optionally track with `HasSlotController`.
- **Add a CSS part**: Add `part="name"` to element in `render()`, add `@csspart name` JSDoc tag.
- **Add a custom event**: Create event class in `src/events/`, dispatch with `this.dispatchEvent(new WaEventClass())`, add `@event wa-event-name` JSDoc tag.
- **Add a test**: Import `{ fixtures }` from `src/internal/test/fixture.js`, loop `for (const fixture of fixtures)`, use `await fixture<Type>(html`...`)`.
- **Doc page**: Create `docs/docs/components/name.md` with front matter (`title`, `description`, `layout: component`, `category`). Use ` ```html {.example} ` for live code blocks.
- **Update the changelog**: Add entries to the "Unreleased" section in `docs/docs/resources/changelog.md`. Create the section if it doesn't exist. Group entries under `:::added`, `:::fixed`, `:::changed`, `:::deprecated`, `:::removed`, `:::breaking` containers in that order; omit any category with no entries. **Keep entries clear and succinct** — announce what changed at a glance, trim redundant prose, and nest closely related additions as sub-bullets so the parent reads as a topic and children carry the detail.
