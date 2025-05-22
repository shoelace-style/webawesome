import { aTimeout, elementUpdated, expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';

// Make sure this is `dist-cdn/` otherwise you will get an error.
import { registerIconLibrary } from '../../../dist-cdn/webawesome.js';
import type { WaErrorEvent } from '../../events/error.js';
import type { WaLoadEvent } from '../../events/load.js';
import type WaIcon from './icon.js';

const testLibraryIcons = {
  'test-icon1': `
    <svg id="test-icon1">
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,
  'test-icon2': `
    <svg id="test-icon2">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
    </svg>
  `,
  'bad-icon': `<div></div>`,
};

describe('<wa-icon>', () => {
  before(() => {
    registerIconLibrary('test-library', {
      resolver: (name: keyof typeof testLibraryIcons) => {
        // only for testing a bad request
        if (name === ('bad-request' as keyof typeof testLibraryIcons)) {
          return `data:image/svg+xml`;
        }

        if (name in testLibraryIcons) {
          return `data:image/svg+xml,${encodeURIComponent(testLibraryIcons[name])}`;
        }
        return '';
      },
      mutator: (svg: SVGElement) => svg.setAttribute('fill', 'currentColor'),
    });
  });

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('defaults ', () => {
        it('default properties', async () => {
          const el = await fixture<WaIcon>(html` <wa-icon></wa-icon> `);

          expect(el.name).to.be.undefined;
          expect(el.src).to.be.undefined;
          expect(el.label).to.equal('');
          expect(el.library).to.equal('default');
        });

        it('renders pre-loaded system icons and emits wa-load event', async () => {
          const el = await fixture<WaIcon>(html` <wa-icon library="system"></wa-icon> `);
          const listener = oneEvent(el, 'wa-load') as Promise<WaLoadEvent>;

          el.name = 'check';
          const ev = await listener;
          await elementUpdated(el);

          expect(el.shadowRoot?.querySelector('svg')).to.exist;
          expect(ev).to.exist;
        });

        it('the icon is accessible', async () => {
          const el = await fixture<WaIcon>(html` <wa-icon library="system" name="check"></wa-icon> `);
          await expect(el).to.be.accessible();
        });

        it('the icon has the correct default aria attributes', async () => {
          const el = await fixture<WaIcon>(html` <wa-icon library="system" name="check"></wa-icon> `);

          expect(el.getAttribute('role')).to.be.null;
          expect(el.getAttribute('aria-label')).to.be.null;
          expect(el.getAttribute('aria-hidden')).to.equal('true');
        });
      });

      describe('when a label is provided', () => {
        it('the icon has the correct default aria attributes', async () => {
          const fakeLabel = 'a label';
          const el = await fixture<WaIcon>(html`
            <wa-icon label="${fakeLabel}" library="system" name="check"></wa-icon>
          `);

          expect(el.getAttribute('role')).to.equal('img');
          expect(el.getAttribute('aria-label')).to.equal(fakeLabel);
          expect(el.getAttribute('aria-hidden')).to.be.null;
        });
      });

      describe('when a valid src is provided', () => {
        it('the svg is rendered', async () => {
          const fakeId = 'test-src';
          const el = await fixture<WaIcon>(html` <wa-icon></wa-icon> `);

          const listener = oneEvent(el, 'wa-load');
          el.src = `data:image/svg+xml,${encodeURIComponent(`<svg id="${fakeId}"></svg>`)}`;

          await listener;
          await elementUpdated(el);

          expect(el.shadowRoot?.querySelector('svg')).to.exist;
          expect(el.shadowRoot?.querySelector('svg')?.part.contains('svg')).to.be.true;
          expect(el.shadowRoot?.querySelector('svg')?.getAttribute('id')).to.equal(fakeId);
        });
      });

      describe('new library', () => {
        it('renders icons from the new library and emits wa-load event', async () => {
          const el = await fixture<WaIcon>(html` <wa-icon library="test-library"></wa-icon> `);
          const listener = oneEvent(el, 'wa-load') as Promise<WaLoadEvent>;

          el.name = 'test-icon1';
          const ev = await listener;
          await elementUpdated(el);

          expect(el.shadowRoot?.querySelector('svg')).to.exist;
          expect(ev.isTrusted).to.exist;
        });

        it('runs mutator from new library', async () => {
          const el = await fixture<WaIcon>(html` <wa-icon library="test-library" name="test-icon1"></wa-icon> `);
          await elementUpdated(el);
          await elementUpdated(el);
          await aTimeout(1);

          const svg = el.shadowRoot?.querySelector('svg');
          expect(svg?.getAttribute('fill')).to.equal('currentColor');
        });
      });

      describe('negative cases', () => {
        // using new library so we can test for malformed icons when registered
        it("svg not rendered with an icon that doesn't exist in the library", async () => {
          const el = await fixture<WaIcon>(html` <wa-icon library="test-library" name="does-not-exist"></wa-icon> `);

          // Still renders svgs for empty icons.
          expect(el.shadowRoot?.querySelector('svg')).to.be.instanceof(SVGElement);

          expect(el.getBoundingClientRect().height).to.equal(16);
          expect(el.getBoundingClientRect().width).to.equal(16);
        });

        it('emits wa-error when the file cant be retrieved', async () => {
          const el = await fixture<WaIcon>(html` <wa-icon library="test-library"></wa-icon> `);
          const listener = oneEvent(el, 'wa-error') as Promise<WaErrorEvent>;

          el.name = 'bad-request';
          const ev = await listener;
          await elementUpdated(el);

          expect(el.shadowRoot?.querySelector('svg')).to.be.null;
          expect(ev).to.exist;
        });

        it("emits wa-error when there isn't an svg element in the registered icon", async () => {
          const el = await fixture<WaIcon>(html` <wa-icon library="test-library"></wa-icon> `);
          const listener = oneEvent(el, 'wa-error') as Promise<WaErrorEvent>;

          el.name = 'bad-icon';
          const ev = await listener;
          await elementUpdated(el);

          expect(el.shadowRoot?.querySelector('svg')).to.be.null;
          expect(ev).to.exist;
        });
      });

      describe('svg sprite sheets', () => {
        // TODO: this test is skipped because Bootstrap sprite.svg doesn't seem to be available in CI. Will fix in a future PR. [Konnor]
        it.skip('Should properly grab an SVG and render it from bootstrap icons', async () => {
          registerIconLibrary('sprite', {
            resolver: name => `/docs/assets/images/sprite.svg#${name}`,
            mutator: svg => svg.setAttribute('fill', 'currentColor'),
            spriteSheet: true,
          });

          const el = await fixture<WaIcon>(html`<wa-icon name="arrow-left" library="sprite"></wa-icon>`);

          await elementUpdated(el);

          const svg = el.shadowRoot?.querySelector("svg[part='svg']");
          const use = svg?.querySelector(`use[href='/docs/assets/images/sprite.svg#arrow-left']`);

          expect(svg).to.be.instanceof(SVGElement);
          expect(use).to.be.instanceof(SVGUseElement);

          // This is kind of hacky...but with no way to check "load", we just use a timeout
          await aTimeout(1000);

          // Theres no way to really test that the icon rendered properly. We just gotta trust the browser to do it's thing :)
          // However, we can check the <use> size. It should be greater than 0x0 if loaded properly.
          const rect = use?.getBoundingClientRect();
          expect(rect?.width).to.be.greaterThan(0);
          expect(rect?.width).to.be.greaterThan(0);
        });

        it('Should render nothing if the sprite hash is wrong', async () => {
          registerIconLibrary('sprite', {
            resolver: name => `/docs/assets/images/sprite.svg#${name}`,
            mutator: svg => svg.setAttribute('fill', 'currentColor'),
            spriteSheet: true,
          });

          const el = await fixture<WaIcon>(html`<wa-icon name="non-existent" library="sprite"></wa-icon>`);

          await elementUpdated(el);

          const svg = el.shadowRoot?.querySelector("svg[part='svg']");
          const use = svg?.querySelector('use');

          // TODO: Theres no way to really test that the icon rendered properly. We just gotta trust the browser to do it's thing :)
          // However, we can check the <use> size. If it never loaded, it should be 0x0. Ideally, we could have error tracking...
          const rect = use?.getBoundingClientRect();
          expect(rect?.width).to.equal(0);
          expect(rect?.width).to.equal(0);

          // Make sure the mutator is applied.
          // https://github.com/shoelace-style/shoelace/issues/1925
          expect(svg?.getAttribute('fill')).to.equal('currentColor');
        });

        it('Should properly produce a `<use>` element', async function () {
          registerIconLibrary('sprite', {
            resolver(name) {
              return `/docs/assets/images/sprite.svg#${name}`;
            },
            mutator(svg) {
              return svg.setAttribute('fill', 'currentColor');
            },
            spriteSheet: true,
          });

          const el = await fixture<WaIcon>(html`<wa-icon name="bad-icon" library="sprite"></wa-icon>`);

          const href = el.shadowRoot!.querySelector('use')?.getAttribute('href');
          expect(href).to.equal('/docs/assets/images/sprite.svg#bad-icon');
        });

        // TODO: <use> svg icons don't emit a "load" or "error" event...if we can figure out how to get the event to emit errors.
        // Once we figure out how to emit errors / loading perhaps we can actually test this?
        it.skip("Should produce an error if the icon doesn't exist.", async () => {
          registerIconLibrary('sprite', {
            resolver(name) {
              return `/docs/assets/images/sprite.svg#${name}`;
            },
            mutator(svg) {
              return svg.setAttribute('fill', 'currentColor');
            },
            spriteSheet: true,
          });

          const el = await fixture<WaIcon>(html`<wa-icon name="bad-icon" library="sprite"></wa-icon>`);
          const listener = oneEvent(el, 'wa-error') as Promise<WaErrorEvent>;

          el.name = 'bad-icon';
          const ev = await listener;
          await elementUpdated(el);
          expect(ev).to.exist;
        });
      });
      /* eslint-enable */
    });
  }
});
