import { aTimeout, elementUpdated, expect, oneEvent, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';

// Make sure this is `dist-cdn/` otherwise you will get an error.
import { registerIconLibrary } from '../../../dist-cdn/webawesome.js';
import type WaIcon from './icon.js';
import type { IconAnimation } from './icon.js';

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
      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check"></wa-icon>`);
          await expect(el).to.be.accessible();
        });

        it('should set aria-hidden when no label is provided', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check"></wa-icon>`);
          expect(el.getAttribute('role')).to.be.null;
          expect(el.getAttribute('aria-label')).to.be.null;
          expect(el.getAttribute('aria-hidden')).to.equal('true');
        });

        it('should set role and aria-label when a label is provided', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon label="Checkmark" library="system" name="check"></wa-icon>`);
          expect(el.getAttribute('role')).to.equal('img');
          expect(el.getAttribute('aria-label')).to.equal('Checkmark');
          expect(el.getAttribute('aria-hidden')).to.be.null;
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon></wa-icon>`);
          expect(el.name).to.be.undefined;
          expect(el.src).to.be.undefined;
          expect(el.label).to.equal('');
          expect(el.library).to.equal('default');
        });

        it('should render an SVG for a system icon', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system"></wa-icon>`);
          const listener = oneEvent(el, 'wa-load');
          el.name = 'check';
          await listener;
          await elementUpdated(el);
          expect(el.shadowRoot?.querySelector('svg')).to.exist;
        });
      });

      describe('events', () => {
        it('should emit wa-load when a valid icon loads', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="test-library"></wa-icon>`);
          await expectEvent(el, 'wa-load', async () => {
            el.name = 'test-icon1';
          });
          await elementUpdated(el);
          expect(el.shadowRoot?.querySelector('svg')).to.exist;
        });

        it('should emit wa-error when the icon file cannot be retrieved', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="test-library"></wa-icon>`);
          await expectEvent(el, 'wa-error', async () => {
            el.name = 'bad-request';
          });
          await elementUpdated(el);
          expect(el.shadowRoot?.querySelector('svg')).to.be.null;
        });

        it('should emit wa-error when the response is not a valid SVG', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="test-library"></wa-icon>`);
          await expectEvent(el, 'wa-error', async () => {
            el.name = 'bad-icon';
          });
          await elementUpdated(el);
          expect(el.shadowRoot?.querySelector('svg')).to.be.null;
        });
      });

      describe('libraries', () => {
        it('should render icons from a custom library', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="test-library"></wa-icon>`);
          const listener = oneEvent(el, 'wa-load');
          el.name = 'test-icon1';
          await listener;
          await elementUpdated(el);
          expect(el.shadowRoot?.querySelector('svg')).to.exist;
        });

        it('should apply the mutator from a custom library', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="test-library" name="test-icon1"></wa-icon>`);
          await elementUpdated(el);
          await elementUpdated(el);
          await aTimeout(1);
          const svg = el.shadowRoot?.querySelector('svg');
          expect(svg?.getAttribute('fill')).to.equal('currentColor');
        });

        it('should render icons from an async resolver', async () => {
          registerIconLibrary('async-library', {
            resolver: async name => {
              await new Promise(resolve => requestAnimationFrame(resolve));
              return `data:image/svg+xml,${encodeURIComponent(testLibraryIcons[name as keyof typeof testLibraryIcons])}`;
            },
          });

          const el = await fixture<WaIcon>(html`<wa-icon library="async-library"></wa-icon>`);
          const listener = oneEvent(el, 'wa-load');
          el.name = 'test-icon1';
          await listener;
          await elementUpdated(el);
          expect(el.shadowRoot?.querySelector('svg')).to.exist;
        });
      });

      describe('src', () => {
        it('should render an SVG when a valid src is provided', async () => {
          const fakeId = 'test-src';
          const el = await fixture<WaIcon>(html`<wa-icon></wa-icon>`);
          const listener = oneEvent(el, 'wa-load');
          el.src = `data:image/svg+xml,${encodeURIComponent(`<svg id="${fakeId}"></svg>`)}`;
          await listener;
          await elementUpdated(el);
          expect(el.shadowRoot?.querySelector('svg')).to.exist;
          expect(el.shadowRoot?.querySelector('svg')?.part.contains('svg')).to.be.true;
          expect(el.shadowRoot?.querySelector('svg')?.getAttribute('id')).to.equal(fakeId);
        });
      });

      describe('sprite sheets', () => {
        it.only('should produce a <use> element with the correct href', async () => {
          // With SSR, this `registerIconLibrary` won't cross the server  boundary.
          registerIconLibrary('sprite', {
            resolver: name => `/docs/assets/images/sprite.svg#${name}`,
            mutator: svg => svg.setAttribute('fill', 'currentColor'),
            spriteSheet: true,
          });

          const el = await fixture<WaIcon>(html`<wa-icon name="bad-icon" library="sprite"></wa-icon>`);
          console.log(el.shadowRoot)
          let href = null
          await waitUntil(() => {
            href = el.shadowRoot!.querySelector('use')?.getAttribute('href');
            return href
          })
          expect(href).to.equal('/docs/assets/images/sprite.svg#bad-icon');
        });

        it('should apply the mutator when using sprite sheets', async () => {
          registerIconLibrary('sprite', {
            resolver: name => `/docs/assets/images/sprite.svg#${name}`,
            mutator: svg => svg.setAttribute('fill', 'currentColor'),
            spriteSheet: true,
          });

          const el = await fixture<WaIcon>(html`<wa-icon name="non-existent" library="sprite"></wa-icon>`);
          await elementUpdated(el);
          const svg = el.shadowRoot?.querySelector("svg[part='svg']");
          expect(svg?.getAttribute('fill')).to.equal('currentColor');
        });
      });

      describe('transformations', () => {
        it('should rotate 0 degrees when rotate is 0', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check" rotate="0"></wa-icon>`);
          await elementUpdated(el);
          await el.updateComplete;
          const computedStyle = getComputedStyle(el);
          expect(['matrix(1, 0, 0, 1, 0, 0)', 'none']).to.include(computedStyle.transform);
        });

        it('should rotate 90 degrees when rotate is 90', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check" rotate="90"></wa-icon>`);
          await elementUpdated(el);
          await el.updateComplete;
          expect(getComputedStyle(el).transform).to.equal('matrix(0, 1, -1, 0, 0, 0)');
        });

        it('should rotate 180 degrees when rotate is 180', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check" rotate="180"></wa-icon>`);
          await elementUpdated(el);
          await el.updateComplete;
          expect(getComputedStyle(el).transform).to.equal('matrix(-1, 0, 0, -1, 0, 0)');
        });

        it('should rotate 270 degrees when rotate is 270', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check" rotate="270"></wa-icon>`);
          await elementUpdated(el);
          await el.updateComplete;
          expect(getComputedStyle(el).transform).to.equal('matrix(0, -1, 1, 0, 0, 0)');
        });

        it('should flip horizontally when flip is "x"', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check" flip="x"></wa-icon>`);
          await elementUpdated(el);
          await el.updateComplete;
          expect(getComputedStyle(el).transform).to.equal('matrix(-1, 0, 0, 1, 0, 0)');
        });

        it('should flip vertically when flip is "y"', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check" flip="y"></wa-icon>`);
          await elementUpdated(el);
          await el.updateComplete;
          expect(getComputedStyle(el).transform).to.equal('matrix(1, 0, 0, -1, 0, 0)');
        });

        it('should flip on both axes when flip is "both"', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="system" name="check" flip="both"></wa-icon>`);
          await elementUpdated(el);
          await el.updateComplete;
          expect(getComputedStyle(el).transform).to.equal('matrix(-1, 0, 0, -1, 0, 0)');
        });
      });

      describe('animations', () => {
        const animations: IconAnimation[] = [
          'beat',
          'beat-fade',
          'bounce',
          'fade',
          'flip',
          'shake',
          'spin',
          'spin-pulse',
        ];

        animations.forEach(animation => {
          it(`should apply the "${animation}" animation`, async () => {
            const el = await fixture<WaIcon>(html`
              <wa-icon library="system" name="check" animation=${animation}></wa-icon>
            `);
            await elementUpdated(el);
            await el.updateComplete;
            expect(getComputedStyle(el).animationName).to.equal(animation);
          });
        });

        it('should apply spin-reverse with reverse direction', async () => {
          const el = await fixture<WaIcon>(html`
            <wa-icon library="system" name="check" animation="spin-reverse"></wa-icon>
          `);
          await elementUpdated(el);
          await el.updateComplete;
          const computedStyle = getComputedStyle(el);
          expect(computedStyle.animationName).to.equal('spin');
          expect(computedStyle.animationDirection).to.equal('reverse');
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the svg CSS part', async () => {
          const el = await fixture<WaIcon>(html`<wa-icon library="test-library"></wa-icon>`);
          const listener = oneEvent(el, 'wa-load');
          el.name = 'test-icon1';
          await listener;
          await elementUpdated(el);
          const svg = el.shadowRoot?.querySelector('svg');
          expect(svg?.part.contains('svg')).to.be.true;
        });
      });
    });
  }
});
