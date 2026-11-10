import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaLightbox from './lightbox.js';

/** A tiny image that loads instantly, so thumbnails and slides have real dimensions. */
function image(color: string, width = 30, height = 20) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${color}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Three items. Animations are turned off so tests don't have to wait for them. */
const gallery = (attributes: { loop?: boolean; thumbnails?: boolean; withoutZoom?: boolean } = {}) => html`
  <wa-lightbox
    label="Photos"
    style="--show-duration: 0s; --hide-duration: 0s"
    ?loop=${attributes.loop}
    ?with-thumbnails=${attributes.thumbnails}
    ?without-zoom=${attributes.withoutZoom}
  >
    <wa-lightbox-item id="red" src=${image('red', 300, 200)} width="300" height="200" caption="A red image">
      <img src=${image('red')} alt="Red" />
    </wa-lightbox-item>
    <wa-lightbox-item id="green" src=${image('green', 300, 200)} width="300" height="200">
      <img src=${image('green')} alt="Green" />
    </wa-lightbox-item>
    <wa-lightbox-item id="blue" src=${image('blue', 300, 200)} width="300" height="200">
      <img src=${image('blue')} alt="Blue" />
    </wa-lightbox-item>
  </wa-lightbox>
`;

/** Adds a button after the lightbox that opens it with a data-lightbox invoker. */
function addInvoker(el: WaLightbox, value: string) {
  const button = document.createElement('button');
  button.textContent = 'Open';
  button.setAttribute('data-lightbox', value);
  el.after(button);
  return button;
}

/** Waits for the lightbox to find its items, which happens after its first render. */
async function ready(el: WaLightbox, count = 3) {
  await waitUntil(() => el.items.length === count, 'the lightbox should find its items');
  await el.updateComplete;
}

async function open(el: WaLightbox) {
  await expectEvent(el, 'wa-after-show', () => {
    el.open = true;
  });
}

async function close(el: WaLightbox) {
  await expectEvent(el, 'wa-after-hide', () => {
    el.open = false;
  });
}

const part = <T extends HTMLElement = HTMLElement>(el: WaLightbox, name: string) =>
  el.shadowRoot!.querySelector<T>(`[part~="${name}"]`)!;

describe('<wa-lightbox>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible when closed', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);

          await expect(el).to.be.accessible();
        });

        it('should be accessible when open', async () => {
          const el = await fixture<WaLightbox>(gallery({ thumbnails: true }));
          await ready(el);
          await open(el);

          // The slides scroll with the arrow keys from anywhere in the lightbox, so the scroll container itself is kept
          // out of the tab order. Axe only looks for a focusable scroller.
          await expect(el).to.be.accessible({ ignoredRules: ['scrollable-region-focusable'] });
        });

        it('should name the dialog from its label', async () => {
          const el = await fixture<WaLightbox>(gallery());

          expect(part(el, 'dialog').getAttribute('aria-label')).to.equal('Photos');
        });

        it('should give the dialog a default name when it has no label', async () => {
          const el = await fixture<WaLightbox>(html`<wa-lightbox></wa-lightbox>`);

          expect(part(el, 'dialog').getAttribute('aria-label')).to.equal('Lightbox');
        });

        it('should return focus to the current item when closed', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);

          el.next();
          await close(el);
          await aTimeout(0);

          expect(document.activeElement).to.equal(el.items[1]);
        });

        it('should only expose the current slide', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);

          const slides = [...el.shadowRoot!.querySelectorAll<HTMLElement>('[part~="slide"]')];

          expect(slides.map(slide => slide.inert)).to.deep.equal([false, true, true]);
        });
      });

      describe('items', () => {
        it('should find items at any depth', async () => {
          const el = await fixture<WaLightbox>(html`
            <wa-lightbox>
              <article>
                <p>Text</p>
                <figure>
                  <wa-lightbox-item src=${image('red')}><img src=${image('red')} alt="Red" /></wa-lightbox-item>
                </figure>
                <section>
                  <div>
                    <wa-lightbox-item src=${image('blue')}><img src=${image('blue')} alt="Blue" /></wa-lightbox-item>
                  </div>
                </section>
              </article>
            </wa-lightbox>
          `);
          await ready(el, 2);

          expect(el.items.map(item => item.resolvedAlt)).to.deep.equal(['Red', 'Blue']);
        });

        it('should include items that have no thumbnail', async () => {
          const el = await fixture<WaLightbox>(html`
            <wa-lightbox>
              <wa-lightbox-item src=${image('red')}><img src=${image('red')} alt="Red" /></wa-lightbox-item>
              <wa-lightbox-item src=${image('blue')} alt="Blue"></wa-lightbox-item>
            </wa-lightbox>
          `);
          await ready(el, 2);

          expect(getComputedStyle(el.items[1]).display).to.equal('none');
          expect(el.items).to.have.length(2);
        });

        it('should stay on the same item when items are added before it', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          el.index = 1;
          const green = el.currentItem;

          const added = document.createElement('wa-lightbox-item');
          added.src = image('black');
          el.prepend(added);
          await ready(el, 4);

          expect(el.currentItem).to.equal(green);
          expect(el.index).to.equal(2);
        });

        it('should keep the index within the available items', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);

          el.index = 99;
          await el.updateComplete;

          expect(el.currentItem).to.equal(el.items[2]);
        });
      });

      describe('opening and closing', () => {
        it('should open at the item that was clicked', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);

          await expectEvent(el, 'wa-after-show', () => {
            el.items[2].click();
          });

          expect(el.open).to.be.true;
          expect(el.index).to.equal(2);
        });

        it('should leave modified clicks to the link', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          let wasIntercepted = true;

          // Registered after the lightbox's own listener, so this sees what it decided and then stops the navigation
          el.addEventListener('click', event => {
            wasIntercepted = event.defaultPrevented;
            event.preventDefault();
          });
          el.items[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true }));
          await el.updateComplete;

          expect(wasIntercepted).to.be.false;
          expect(el.open).to.be.false;
        });

        it('should emit wa-show and wa-after-show when opened', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);

          await expectEvent(el, ['wa-show', 'wa-after-show'], () => {
            el.open = true;
          });

          expect(part<HTMLDialogElement>(el, 'dialog').open).to.be.true;
        });

        it('should emit wa-hide and wa-after-hide when closed', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);

          await expectEvent(el, ['wa-hide', 'wa-after-hide'], () => {
            el.open = false;
          });

          expect(part<HTMLDialogElement>(el, 'dialog').open).to.be.false;
        });

        it('should not open when wa-show is prevented', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          el.addEventListener('wa-show', event => event.preventDefault());

          el.open = true;
          await el.updateComplete;
          await aTimeout(50);

          expect(el.open).to.be.false;
        });

        it('should not close when wa-hide is prevented', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);
          el.addEventListener('wa-hide', event => event.preventDefault());

          await sendKeys({ press: 'Escape' });
          await aTimeout(50);

          expect(el.open).to.be.true;
        });

        it('should close when pressing Escape', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);

          await expectEvent(el, 'wa-after-hide', async () => {
            await sendKeys({ press: 'Escape' });
          });

          expect(el.open).to.be.false;
        });

        it('should report the close button as the source when it closes the lightbox', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);
          const closeButton = part(el, 'close-button');

          const [hideEvent] = await expectEvent(el, 'wa-hide', () => {
            closeButton.click();
          });

          expect((hideEvent as CustomEvent).detail.source).to.equal(closeButton);
        });

        it('should lock page scrolling only while open', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);

          await open(el);
          expect(document.documentElement.classList.contains('wa-scroll-lock')).to.be.true;

          await close(el);
          expect(document.documentElement.classList.contains('wa-scroll-lock')).to.be.false;
        });

        it('should leave nothing behind after animating open and closed', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          el.style.setProperty('--show-duration', '50ms');
          el.style.setProperty('--hide-duration', '50ms');

          await expectEvent(el, 'wa-after-show', () => el.items[0].click());
          await close(el);

          expect(el.shadowRoot!.querySelector<HTMLElement>('.ghost')!.hidden).to.be.true;
          expect(el.shadowRoot!.querySelector('.media.morphing')).to.be.null;
          expect(el.items.some(item => item.matches(':state(morphing)'))).to.be.false;
        });
      });

      describe('declarative invokers', () => {
        it('should open at the first item from an element with data-lightbox="open id"', async () => {
          const el = await fixture<WaLightbox>(gallery());
          el.id = 'invoked';
          const button = addInvoker(el, 'open invoked');
          await ready(el);
          el.index = 2;

          await expectEvent(el, 'wa-after-show', () => {
            button.click();
          });

          expect(el.index).to.equal(0);
        });

        it('should open at a specific item when its id is given', async () => {
          const el = await fixture<WaLightbox>(gallery());
          el.id = 'invoked';
          const button = addInvoker(el, 'open invoked blue');
          await ready(el);

          await expectEvent(el, 'wa-after-show', () => {
            button.click();
          });

          expect(el.currentItem!.id).to.equal('blue');
        });

        it('should close from a slotted element with data-lightbox="close"', async () => {
          const el = await fixture<WaLightbox>(gallery());
          const button = document.createElement('button');
          button.slot = 'actions';
          button.textContent = 'Done';
          button.setAttribute('data-lightbox', 'close');
          el.append(button);
          await ready(el);
          await open(el);

          const [hideEvent] = await expectEvent(el, ['wa-hide', 'wa-after-hide'], () => {
            button.click();
          });

          expect((hideEvent as CustomEvent).detail.source).to.equal(button);
          expect(el.open).to.be.false;
        });
      });

      describe('navigation', () => {
        it('should stop at the first and last items', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);

          el.previous();
          expect(el.index).to.equal(0);

          el.index = 2;
          el.next();
          expect(el.index).to.equal(2);
        });

        it('should wrap around when loop is set', async () => {
          const el = await fixture<WaLightbox>(gallery({ loop: true }));
          await ready(el);

          el.previous();
          expect(el.index).to.equal(2);

          el.next();
          expect(el.index).to.equal(0);
        });

        it('should navigate with the arrow, Home, and End keys', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);

          await sendKeys({ press: 'ArrowRight' });
          expect(el.index).to.equal(1);

          await sendKeys({ press: 'End' });
          expect(el.index).to.equal(2);

          await sendKeys({ press: 'ArrowLeft' });
          expect(el.index).to.equal(1);

          await sendKeys({ press: 'Home' });
          expect(el.index).to.equal(0);
        });

        it('should emit wa-item-change with the new and previous items', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);

          const [changeEvent] = await expectEvent(el, 'wa-item-change', () => {
            el.index = 2;
          });

          expect((changeEvent as CustomEvent).detail).to.deep.equal({
            index: 2,
            previousIndex: 0,
            item: el.items[2],
            previousItem: el.items[0],
          });
        });

        it('should not emit wa-item-change when it first finds its items', async () => {
          let count = 0;
          const handleItemChange = () => count++;

          // Listening on the document catches anything emitted before the fixture hands the lightbox back
          document.addEventListener('wa-item-change', handleItemChange);
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await aTimeout(50);
          document.removeEventListener('wa-item-change', handleItemChange);

          expect(count).to.equal(0);
        });

        it('should show the current item in the counter and caption', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);

          expect(part(el, 'counter').textContent!.trim()).to.equal('1 of 3');
          expect(part(el, 'caption').textContent!.trim()).to.equal('A red image');

          el.next();
          await el.updateComplete;

          expect(part(el, 'counter').textContent!.trim()).to.equal('2 of 3');
          expect(part(el, 'caption').hidden).to.be.true;
        });

        it('should keep the same slide elements as items come and go from view', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);
          const slides = [...el.shadowRoot!.querySelectorAll('[part~="slide"]')];

          el.index = 2;
          await el.updateComplete;
          el.index = 0;
          await el.updateComplete;

          // Safari jumps to a neighboring slide if a snap target is replaced
          expect([...el.shadowRoot!.querySelectorAll('[part~="slide"]')]).to.deep.equal(slides);
        });

        it('should hide the counter, navigation, and thumbnails when there is one item', async () => {
          const el = await fixture<WaLightbox>(html`
            <wa-lightbox with-thumbnails>
              <wa-lightbox-item src=${image('red')}><img src=${image('red')} alt="Red" /></wa-lightbox-item>
            </wa-lightbox>
          `);
          await ready(el, 1);

          expect(part(el, 'counter').hidden).to.be.true;
          expect(part(el, 'navigation-button-next').hidden).to.be.true;
          expect(part(el, 'thumbnails').hidden).to.be.true;
        });
      });

      describe('thumbnails', () => {
        it('should render a thumbnail for each item and mark the current one', async () => {
          const el = await fixture<WaLightbox>(gallery({ thumbnails: true }));
          await ready(el);
          await open(el);

          const thumbnails = [...el.shadowRoot!.querySelectorAll('[part~="thumbnail"]')];

          expect(thumbnails).to.have.length(3);
          expect(thumbnails.map(thumbnail => thumbnail.getAttribute('aria-selected'))).to.deep.equal([
            'true',
            'false',
            'false',
          ]);
        });

        it('should show an item when its thumbnail is clicked', async () => {
          const el = await fixture<WaLightbox>(gallery({ thumbnails: true }));
          await ready(el);
          await open(el);

          el.shadowRoot!.querySelectorAll<HTMLElement>('[part~="thumbnail"]')[2].click();

          expect(el.index).to.equal(2);
        });
      });

      describe('zoom', () => {
        it('should toggle zoom with the zoom button', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);
          const zoomButton = part(el, 'zoom-button');

          zoomButton.click();
          await el.updateComplete;

          expect(el.matches(':state(zoomed)')).to.be.true;
          expect(zoomButton.getAttribute('aria-label')).to.equal('Zoom out');

          zoomButton.click();
          await el.updateComplete;

          expect(el.matches(':state(zoomed)')).to.be.false;
          expect(zoomButton.getAttribute('aria-label')).to.equal('Zoom in');
        });

        it('should toggle zoom when the image is clicked with a mouse', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);
          await waitUntil(() => part<HTMLImageElement>(el, 'image').naturalWidth > 0);

          await clickOnElement(part(el, 'image'));
          await el.updateComplete;
          expect(el.matches(':state(zoomed)')).to.be.true;

          await clickOnElement(part(el, 'image'));
          await el.updateComplete;
          expect(el.matches(':state(zoomed)')).to.be.false;
        });

        it('should reset zoom when the current item changes', async () => {
          const el = await fixture<WaLightbox>(gallery());
          await ready(el);
          await open(el);

          el.zoomIn();
          await el.updateComplete;
          el.next();
          await el.updateComplete;

          expect(el.matches(':state(zoomed)')).to.be.false;
        });

        it('should not zoom when without-zoom is set', async () => {
          const el = await fixture<WaLightbox>(gallery({ withoutZoom: true }));
          await ready(el);
          await open(el);

          el.zoomIn();
          await el.updateComplete;

          expect(el.matches(':state(zoomed)')).to.be.false;
          expect(part(el, 'zoom-button').hidden).to.be.true;
        });
      });

      describe('videos and custom content', () => {
        it('should render a video with the thumbnail as its poster', async () => {
          const poster = image('black', 160, 90);
          const el = await fixture<WaLightbox>(html`
            <wa-lightbox style="--show-duration: 0s; --hide-duration: 0s">
              <wa-lightbox-item type="video"><img src=${poster} alt="A video" /></wa-lightbox-item>
            </wa-lightbox>
          `);
          await ready(el, 1);
          await open(el);

          expect(part<HTMLVideoElement>(el, 'video').getAttribute('poster')).to.equal(poster);
          expect(part(el, 'zoom-button').hidden).to.be.true;
        });

        it('should copy the template of an item into its slide when the lightbox opens', async () => {
          const el = await fixture<WaLightbox>(html`
            <wa-lightbox style="--show-duration: 0s; --hide-duration: 0s">
              <wa-lightbox-item>
                <img src=${image('red')} alt="Red" />
                <template><p class="custom">Custom content</p></template>
              </wa-lightbox-item>
            </wa-lightbox>
          `);
          await ready(el, 1);

          expect(el.querySelector('[slot] .custom')).to.be.null;

          await open(el);
          const content = el.querySelector<HTMLElement>('[slot] .custom')!;
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(`slot[name="${content.parentElement!.slot}"]`)!;

          expect(content.textContent).to.equal('Custom content');
          expect(slot.closest('[part~="slide"]')).to.exist;
        });
      });
    });
  }
});
