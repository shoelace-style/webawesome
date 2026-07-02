import { expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaPagination from './pagination.js';

/** Returns the visible page-number buttons/links (excludes nav and ellipsis). */
function getPageButtons(el: WaPagination) {
  return [...el.shadowRoot!.querySelectorAll<HTMLElement>('[part~="page"]')];
}

function getButtonByPart(el: WaPagination, part: string) {
  return el.shadowRoot!.querySelector<HTMLElement>(`[part~="${part}"]`);
}

/**
 * Serializes the rendered page list into a compact string like `"1 … 4 5 6 … 20"`, so range behavior can be asserted
 * against the actual DOM. Page numbers become their label; ellipses become `…`.
 */
function renderedRange(el: WaPagination): string {
  const items = [...el.shadowRoot!.querySelectorAll<HTMLElement>('[part~="pages"] > li')]
    .map(li => li.querySelector<HTMLElement>('[part~="page"], [part~="ellipsis"]'))
    .filter((button): button is HTMLElement => button !== null)
    .map(button => (button.matches('[part~="ellipsis"]') ? '…' : button.textContent!.trim()));
  return items.join(' ');
}

describe('<wa-pagination>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="3"></wa-pagination>`,
          );
          await expect(el).to.be.accessible();
        });

        it('should render a <nav> landmark with a localized label', async () => {
          const el = await fixture<WaPagination>(html`<wa-pagination total="100" page-size="10"></wa-pagination>`);
          const nav = el.shadowRoot!.querySelector('nav');
          expect(nav).to.exist;
          expect(nav!.getAttribute('aria-label')).to.equal('Pagination');
        });

        it('should allow the nav label to be overridden', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="100" page-size="10" label="Search results"></wa-pagination>`,
          );
          expect(el.shadowRoot!.querySelector('nav')!.getAttribute('aria-label')).to.equal('Search results');
        });

        it('should mark exactly one item with aria-current="page"', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="3"></wa-pagination>`,
          );
          const current = el.shadowRoot!.querySelectorAll('[aria-current="page"]');
          expect(current.length).to.equal(1);
          expect(current[0].textContent?.trim()).to.equal('3');
        });

        it('should NOT add aria-label to numbered items (visible number is the name)', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="50" page-size="10" page="1"></wa-pagination>`,
          );
          getPageButtons(el).forEach(button => {
            expect(button.hasAttribute('aria-label')).to.be.false;
          });
        });

        it('should give icon-only nav buttons localized aria-labels', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="3" with-edges></wa-pagination>`,
          );
          expect(getButtonByPart(el, 'previous-button')!.getAttribute('aria-label')).to.equal('Previous page');
          expect(getButtonByPart(el, 'next-button')!.getAttribute('aria-label')).to.equal('Next page');
          expect(getButtonByPart(el, 'first-button')!.getAttribute('aria-label')).to.equal('First page');
          expect(getButtonByPart(el, 'last-button')!.getAttribute('aria-label')).to.equal('Last page');
        });

        it('should render the list with role="list"/"listitem"', async () => {
          const el = await fixture<WaPagination>(html`<wa-pagination total="50" page-size="10"></wa-pagination>`);
          expect(el.shadowRoot!.querySelector('[part~="pages"]')!.getAttribute('role')).to.equal('list');
          el.shadowRoot!.querySelectorAll('li').forEach(li => {
            // Ellipsis list items are aria-hidden; page/nav items carry listitem.
            if (!li.hasAttribute('aria-hidden')) {
              expect(li.getAttribute('role')).to.equal('listitem');
            }
          });
        });

        it('should render a labeled ellipsis button for collapsed pages', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="500" page-size="10" page="25"></wa-pagination>`,
          );
          const ellipses = el.shadowRoot!.querySelectorAll<HTMLButtonElement>('[part~="ellipsis"]');
          // With page 25 of 50, both a start and end ellipsis are shown.
          expect(ellipses.length).to.equal(2);
          ellipses.forEach(ellipsis => {
            expect(ellipsis.tagName.toLowerCase()).to.equal('button');
            expect(ellipsis.getAttribute('aria-label')).to.be.a('string').and.not.empty;
          });
        });

        it('should jump backward five pages when the start ellipsis is clicked', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="500" page-size="10" page="25"></wa-pagination>`,
          );
          const start = el.shadowRoot!.querySelector<HTMLButtonElement>('[data-ellipsis="1"]')!;
          start.click();
          await el.updateComplete;
          expect(el.page).to.equal(20);
        });

        it('should jump forward five pages when the end ellipsis is clicked', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="500" page-size="10" page="25"></wa-pagination>`,
          );
          const end = el.shadowRoot!.querySelector<HTMLButtonElement>('[data-ellipsis="2"]')!;
          end.click();
          await el.updateComplete;
          expect(el.page).to.equal(30);
        });

        it('should clamp an ellipsis jump to the last page', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="500" page-size="10" page="47"></wa-pagination>`,
          );
          // Page 47 of 50: an end ellipsis isn't shown, but the start one jumps back without underflowing.
          const start = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="ellipsis"]')!;
          start.click();
          await el.updateComplete;
          expect(el.page).to.equal(42);
        });
      });

      describe('math & properties', () => {
        it('should compute totalPages from total and pageSize', async () => {
          const el = await fixture<WaPagination>(html`<wa-pagination total="237" page-size="10"></wa-pagination>`);
          expect(el.totalPages).to.equal(24);
        });

        it('should always have at least one page', async () => {
          const el = await fixture<WaPagination>(html`<wa-pagination total="0" page-size="10"></wa-pagination>`);
          expect(el.totalPages).to.equal(1);
        });

        it('should clamp an out-of-range page', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="50" page-size="10" page="99"></wa-pagination>`,
          );
          await el.updateComplete;
          expect(el.page).to.equal(5);
        });

        it('should reflect page to an attribute', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="50" page-size="10" page="3"></wa-pagination>`,
          );
          expect(el.getAttribute('page')).to.equal('3');
        });

        it('should clamp the page property when set above the last page after mount', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="50" page-size="10" page="2"></wa-pagination>`,
          );
          el.page = 99;
          await el.updateComplete;
          expect(el.page).to.equal(5);
        });

        it('should clamp the page property to 1 when set to zero or a negative value', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="50" page-size="10" page="3"></wa-pagination>`,
          );
          el.page = 0;
          await el.updateComplete;
          expect(el.page).to.equal(1);

          el.page = -5;
          await el.updateComplete;
          expect(el.page).to.equal(1);
        });
      });

      describe('events', () => {
        it('should emit wa-page-change with { page, pageSize } when a page is clicked', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="1"></wa-pagination>`,
          );
          const handler = sinon.spy();
          el.addEventListener('wa-page-change', handler);

          const pageTwo = getPageButtons(el).find(b => b.textContent?.trim() === '2')!;
          expect(pageTwo, 'page 2 button should exist').to.exist;
          pageTwo.click();
          await waitUntil(() => handler.calledOnce);

          const detail = (handler.firstCall.args[0] as CustomEvent).detail;
          expect(detail.page).to.equal(2);
          expect(detail.pageSize).to.equal(10);
          expect(el.page).to.equal(2);
        });

        it('should NOT emit wa-page-change on first render', async () => {
          const handler = sinon.spy();
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="2"></wa-pagination>`,
          );
          el.addEventListener('wa-page-change', handler);
          await el.updateComplete;
          expect(handler.called).to.be.false;
        });

        it('should emit wa-before-page-change before wa-page-change', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="1"></wa-pagination>`,
          );
          const order: string[] = [];
          el.addEventListener('wa-before-page-change', () => order.push('before'));
          el.addEventListener('wa-page-change', () => order.push('after'));

          getButtonByPart(el, 'next-button')!.click();
          await waitUntil(() => order.length === 2);
          expect(order).to.deep.equal(['before', 'after']);
        });

        it('should let wa-before-page-change veto the change', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="1"></wa-pagination>`,
          );
          const afterHandler = sinon.spy();
          el.addEventListener('wa-before-page-change', event => event.preventDefault());
          el.addEventListener('wa-page-change', afterHandler);

          getButtonByPart(el, 'next-button')!.click();
          await el.updateComplete;

          expect(el.page).to.equal(1);
          expect(afterHandler.called).to.be.false;
        });
      });

      describe('navigation buttons', () => {
        it('should advance with next and go back with previous', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="5"></wa-pagination>`,
          );
          getButtonByPart(el, 'next-button')!.click();
          await el.updateComplete;
          expect(el.page).to.equal(6);

          getButtonByPart(el, 'previous-button')!.click();
          await el.updateComplete;
          expect(el.page).to.equal(5);
        });

        it('should jump to first and last with edge buttons', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="10" with-edges></wa-pagination>`,
          );
          getButtonByPart(el, 'last-button')!.click();
          await el.updateComplete;
          expect(el.page).to.equal(20);

          getButtonByPart(el, 'first-button')!.click();
          await el.updateComplete;
          expect(el.page).to.equal(1);
        });

        it('should hide nav buttons with without-nav', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" without-nav></wa-pagination>`,
          );
          expect(getButtonByPart(el, 'previous-button')).to.not.exist;
          expect(getButtonByPart(el, 'next-button')).to.not.exist;
        });

        it('should keep a constant number of items when stepping next through every page', async () => {
          // 200 items / 10 per page = 20 pages.
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="1"></wa-pagination>`,
          );

          const countItems = () => el.shadowRoot!.querySelectorAll('[part~="pages"] > li').length;
          const initialCount = countItems();
          const next = () => getButtonByPart(el, 'next-button')!;

          for (let page = 1; page < 20; page++) {
            next().click();
            await el.updateComplete;
            expect(countItems(), `item count changed on page ${el.page}`).to.equal(initialCount);
          }

          expect(el.page).to.equal(20);
        });
      });

      describe('boundary semantics', () => {
        it('should mark previous/first as aria-disabled on the first page (not native disabled)', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="1" with-edges></wa-pagination>`,
          );
          const prev = getButtonByPart(el, 'previous-button')!;
          expect(prev.getAttribute('aria-disabled')).to.equal('true');
          expect(prev.hasAttribute('disabled')).to.be.false; // stays focusable/perceivable
          expect(getButtonByPart(el, 'first-button')!.getAttribute('aria-disabled')).to.equal('true');
        });

        it('should mark next/last as aria-disabled on the last page', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="20" with-edges></wa-pagination>`,
          );
          expect(getButtonByPart(el, 'next-button')!.getAttribute('aria-disabled')).to.equal('true');
          expect(getButtonByPart(el, 'last-button')!.getAttribute('aria-disabled')).to.equal('true');
        });

        it('should not change page when an aria-disabled boundary button is clicked', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="1"></wa-pagination>`,
          );
          getButtonByPart(el, 'previous-button')!.click();
          await el.updateComplete;
          expect(el.page).to.equal(1);
        });
      });

      describe('disabled', () => {
        it('should set the disabled custom state', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" disabled></wa-pagination>`,
          );
          el.disabled = false;
          await el.updateComplete;
          el.disabled = true;
          await el.updateComplete;
          expect(el.matches(':state(disabled)')).to.be.true;
        });

        it('should not change pages when disabled', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="2" disabled></wa-pagination>`,
          );
          const pageThree = getPageButtons(el).find(b => b.textContent?.trim() === '3');
          if (pageThree) pageThree.click();
          await el.updateComplete;
          expect(el.page).to.equal(2);
        });
      });

      describe('hide-single-page', () => {
        it('should render nothing when there is one page', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="5" page-size="10" hide-single-page></wa-pagination>`,
          );
          expect(el.shadowRoot!.querySelector('nav')).to.not.exist;
        });

        it('should render when there is more than one page', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="50" page-size="10" hide-single-page></wa-pagination>`,
          );
          expect(el.shadowRoot!.querySelector('nav')).to.exist;
        });
      });

      describe('format', () => {
        it('should default to the standard layout (full page list)', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="1"></wa-pagination>`,
          );
          expect(el.format).to.equal('standard');
          // The standard layout renders numbered page buttons; the compact "1 of N" label part is absent.
          expect(getPageButtons(el).length).to.be.greaterThan(0);
          expect(getButtonByPart(el, 'label')).to.not.exist;
        });

        it('should render a "1 of N" label and no page numbers in the compact format', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="1" format="compact"></wa-pagination>`,
          );
          expect(getPageButtons(el).length).to.equal(0);
          const label = getButtonByPart(el, 'label')!;
          expect(label, 'compact label part should exist').to.exist;
          // "1 of 24" — assert the page and total-page numbers are present rather than the exact localized phrasing.
          const text = label.textContent!.replace(/\s+/g, ' ').trim();
          expect(text).to.contain('1');
          expect(text).to.contain('24');
        });

        it('should still render previous/next nav buttons in the compact format', async () => {
          // Pass with-edges to prove the compact layout ignores it (edge buttons belong to the standard layout only).
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="3" format="compact" with-edges></wa-pagination>`,
          );
          expect(getButtonByPart(el, 'previous-button')).to.exist;
          expect(getButtonByPart(el, 'next-button')).to.exist;
          expect(getButtonByPart(el, 'first-button')).to.not.exist;
          expect(getButtonByPart(el, 'last-button')).to.not.exist;
        });

        it('should navigate via next/previous in the compact format', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="3" format="compact"></wa-pagination>`,
          );
          getButtonByPart(el, 'next-button')!.click();
          await el.updateComplete;
          expect(el.page).to.equal(4);

          getButtonByPart(el, 'previous-button')!.click();
          await el.updateComplete;
          expect(el.page).to.equal(3);
        });

        it('should reflect format to an attribute', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="50" page-size="10" format="compact"></wa-pagination>`,
          );
          expect(el.getAttribute('format')).to.equal('compact');
        });

        it('should combine the compact format with the summary', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="1" format="compact" with-summary></wa-pagination>`,
          );
          const summary = el.shadowRoot!.querySelector('[part~="summary"]')!;
          expect(summary, 'summary should render alongside the compact layout').to.exist;
          expect(summary.textContent!.replace(/\s+/g, ' ').trim()).to.equal('1–10 of 237');
        });

        it('should be accessible in the compact format', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="3" format="compact"></wa-pagination>`,
          );
          await expect(el).to.be.accessible();
        });

        it('should render nothing in the compact format with hide-single-page and one page', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="5" page-size="10" format="compact" hide-single-page></wa-pagination>`,
          );
          expect(el.shadowRoot!.querySelector('nav')).to.not.exist;
        });
      });

      describe('sibling-count & boundary-count', () => {
        it('should default sibling-count to 2', async () => {
          const el = await fixture<WaPagination>(html`<wa-pagination total="500" page-size="10"></wa-pagination>`);
          expect(el.siblingCount).to.equal(2);
        });

        it('should show two siblings on each side of the current page by default', async () => {
          // Page 25 of 50: with the default sibling-count of 2, the window is 23–27.
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="500" page-size="10" page="25"></wa-pagination>`,
          );
          const labels = getPageButtons(el).map(b => b.textContent?.trim());
          expect(labels).to.include.members(['23', '24', '25', '26', '27']);
          // One more page out on each side falls outside the window and collapses into an ellipsis.
          expect(labels).to.not.include('22');
          expect(labels).to.not.include('28');
        });

        it('should widen the visible window with a larger sibling-count', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="500" page-size="10" page="25" sibling-count="3"></wa-pagination>`,
          );
          const labels = getPageButtons(el).map(b => b.textContent?.trim());
          expect(labels).to.include.members(['22', '23', '24', '25', '26', '27', '28']);
        });

        it('should narrow the visible window with sibling-count="0"', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="500" page-size="10" page="25" sibling-count="0"></wa-pagination>`,
          );
          const labels = getPageButtons(el).map(b => b.textContent?.trim());
          expect(labels).to.include('25');
          expect(labels).to.not.include('24');
          expect(labels).to.not.include('26');
        });

        it('should pin extra boundary pages with a larger boundary-count', async () => {
          // boundary-count of 2 pins pages 1, 2 at the start and 49, 50 at the end.
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="500" page-size="10" page="25" boundary-count="2"></wa-pagination>`,
          );
          const labels = getPageButtons(el).map(b => b.textContent?.trim());
          expect(labels).to.include.members(['1', '2', '49', '50']);
        });
      });

      describe('page range rendering', () => {
        // These cases use sibling-count="1" boundary-count="1" so the expected sequences stay compact and readable.
        it('should show every page when the total fits within the window', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="50" page-size="10" page="1" sibling-count="1" boundary-count="1"></wa-pagination>`,
          );
          expect(renderedRange(el)).to.equal('1 2 3 4 5');
        });

        it('should collapse both sides when the current page is in the middle', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination
              total="200"
              page-size="10"
              page="5"
              sibling-count="1"
              boundary-count="1"
            ></wa-pagination>`,
          );
          expect(renderedRange(el)).to.equal('1 … 4 5 6 … 20');
        });

        it('should extend the run near the start to keep the width constant', async () => {
          // Near the start there's no leading ellipsis, so the freed slot grows the visible run instead of shrinking.
          const el = await fixture<WaPagination>(
            html`<wa-pagination
              total="200"
              page-size="10"
              page="2"
              sibling-count="1"
              boundary-count="1"
            ></wa-pagination>`,
          );
          expect(renderedRange(el)).to.equal('1 2 3 4 5 … 20');
        });

        it('should extend the run near the end to keep the width constant', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination
              total="200"
              page-size="10"
              page="19"
              sibling-count="1"
              boundary-count="1"
            ></wa-pagination>`,
          );
          expect(renderedRange(el)).to.equal('1 … 16 17 18 19 20');
        });

        it('should never render two adjacent ellipses, repeat a page, or misorder pages', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination
              total="10"
              page-size="10"
              page="1"
              sibling-count="1"
              boundary-count="1"
            ></wa-pagination>`,
          );

          for (let totalPages = 1; totalPages <= 30; totalPages++) {
            el.total = totalPages * 10;
            for (let page = 1; page <= totalPages; page++) {
              el.page = page;
              await el.updateComplete;

              const tokens = renderedRange(el).split(' ').filter(Boolean);
              const context = `page ${page}/${totalPages}`;

              tokens.forEach((token, i) => {
                if (token === '…' && i > 0) {
                  expect(tokens[i - 1], `adjacent ellipses at ${context}`).to.not.equal('…');
                }
              });

              const pages = tokens.filter(t => t !== '…').map(Number);
              const sorted = [...pages].sort((a, b) => a - b);
              expect(pages, `out of order at ${context}`).to.deep.equal(sorted);
              expect(new Set(pages).size, `duplicate at ${context}`).to.equal(pages.length);

              // The first, last, and current page are always visible.
              expect(pages, `missing page 1 at ${context}`).to.include(1);
              expect(pages, `missing last page at ${context}`).to.include(totalPages);
              expect(pages, `missing current page at ${context}`).to.include(page);
            }
          }
        });

        it('should keep a constant item count for a variety of truncated configurations', async () => {
          const configs = [
            { totalPages: 20, siblingCount: 1, boundaryCount: 1 },
            { totalPages: 20, siblingCount: 2, boundaryCount: 2 },
            { totalPages: 20, siblingCount: 0, boundaryCount: 1 },
            { totalPages: 30, siblingCount: 3, boundaryCount: 1 },
          ];
          const el = await fixture<WaPagination>(html`<wa-pagination total="200" page-size="10"></wa-pagination>`);
          const countItems = () => el.shadowRoot!.querySelectorAll('[part~="pages"] > li').length;

          for (const config of configs) {
            el.total = config.totalPages * 10;
            el.siblingCount = config.siblingCount;
            el.boundaryCount = config.boundaryCount;
            const counts = new Set<number>();
            for (let page = 1; page <= config.totalPages; page++) {
              el.page = page;
              await el.updateComplete;
              counts.add(countItems());
            }
            expect(
              counts.size,
              `width varied for ${JSON.stringify(config)}: got lengths {${[...counts].join(', ')}}`,
            ).to.equal(1);
          }
        });
      });

      describe('page-size changes', () => {
        it('should reclamp the current page when page-size grows', async () => {
          // 200 items at 10/page = 20 pages; on page 18, growing to 50/page (4 pages) clamps to 4.
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="18"></wa-pagination>`,
          );
          el.pageSize = 50;
          await el.updateComplete;
          expect(el.totalPages).to.equal(4);
          expect(el.page).to.equal(4);
        });
      });

      describe('link mode (href-template)', () => {
        it('should render anchors with interpolated hrefs', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="3" href-template="/p?page={page}"></wa-pagination>`,
          );
          const anchors = [...el.shadowRoot!.querySelectorAll<HTMLAnchorElement>('a[part~="page"]')];
          expect(anchors.length).to.be.greaterThan(0);
          const pageTwo = anchors.find(a => a.textContent?.trim() === '2')!;
          expect(pageTwo.getAttribute('href')).to.equal('/p?page=2');
        });

        it('should drop href on the current page and mark aria-current', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="3" href-template="/p?page={page}"></wa-pagination>`,
          );
          const current = el.shadowRoot!.querySelector<HTMLAnchorElement>('[aria-current="page"]')!;
          expect(current.tagName.toLowerCase()).to.equal('a');
          expect(current.hasAttribute('href')).to.be.false;
        });

        it('should drop href on disabled boundary links', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="200" page-size="10" page="1" href-template="/p?page={page}"></wa-pagination>`,
          );
          const prev = getButtonByPart(el, 'previous-button')!;
          expect(prev.hasAttribute('href')).to.be.false;
          expect(prev.getAttribute('aria-disabled')).to.equal('true');
        });
      });

      describe('summary', () => {
        it('should render a "start–end of total" summary', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="1" with-summary></wa-pagination>`,
          );
          const summary = el.shadowRoot!.querySelector('[part~="summary"]')!;
          expect(summary.textContent!.replace(/\s+/g, ' ').trim()).to.equal('1–10 of 237');
        });

        it('should reflect the current page in the summary', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="3" with-summary></wa-pagination>`,
          );
          const summary = el.shadowRoot!.querySelector('[part~="summary"]')!;
          expect(summary.textContent!.replace(/\s+/g, ' ').trim()).to.equal('21–30 of 237');
        });

        it('should update the summary range when page-size changes', async () => {
          const el = await fixture<WaPagination>(
            html`<wa-pagination total="237" page-size="10" page="2" with-summary></wa-pagination>`,
          );
          const summary = el.shadowRoot!.querySelector('[part~="summary"]')!;
          expect(summary.textContent!.replace(/\s+/g, ' ').trim()).to.equal('11–20 of 237');

          el.pageSize = 25;
          await el.updateComplete;
          // Page 2 at 25/page spans items 26–50.
          expect(summary.textContent!.replace(/\s+/g, ' ').trim()).to.equal('26–50 of 237');
        });
      });
    });
  }
});
