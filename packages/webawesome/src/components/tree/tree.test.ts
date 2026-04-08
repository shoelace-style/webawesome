import { aTimeout, expect, triggerBlurFor, triggerFocusFor, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaTreeItem from '../tree-item/tree-item.js';
import type WaTree from './tree.js';

describe('<wa-tree>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      let el: WaTree;

      beforeEach(async () => {
        el = await fixture(html`
          <wa-tree>
            <wa-tree-item>Node 1</wa-tree-item>
            <wa-tree-item>Node 2</wa-tree-item>
            <wa-tree-item id="expandable">
              Parent Node
              <wa-tree-item>Child Node 1</wa-tree-item>
              <wa-tree-item>
                Child Node 2
                <wa-tree-item>Child Node 2 - 1</wa-tree-item>
                <wa-tree-item>Child Node 2 - 2</wa-tree-item>
              </wa-tree-item>
            </wa-tree-item>
            <wa-tree-item>Node 3</wa-tree-item>
          </wa-tree>
        `);
      });

      describe('accessibility', () => {
        it('should render with correct ARIA attributes', () => {
          expect(el).to.exist;
          expect(el).to.have.attribute('role', 'tree');
          expect(el).to.have.attribute('tabindex', '0');
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible();
        });
      });

      describe('properties', () => {
        it('should default selection to "single"', () => {
          expect(el.selection).to.equal('single');
        });

        it('should reflect the selection property', async () => {
          el.selection = 'multiple';
          await el.updateComplete;
          expect(el).to.have.attribute('aria-multiselectable', 'true');
        });

        it('should set selectable on tree items when selection is "multiple"', async () => {
          el.selection = 'multiple';
          await el.updateComplete;

          const items = el.querySelectorAll('wa-tree-item');
          await Promise.all([...items].map(item => item.updateComplete));

          for (const item of items) {
            expect(item.selectable).to.be.true;
          }
        });

        it('should not focus collapsed child nodes', async () => {
          const parentNode = el.children[2] as WaTreeItem;
          const childNode = parentNode.children[1] as WaTreeItem;
          childNode.expanded = true;
          parentNode.expanded = false;
          await el.updateComplete;

          const focusableItems = el.getFocusableItems();

          expect(focusableItems).to.have.lengthOf(4);
          expect(focusableItems).not.to.include.all.members([childNode, ...childNode.children]);
          expect(focusableItems).not.to.include.all.members([...parentNode.children]);
        });

        it('should return selected items', async () => {
          el.selection = 'single';
          const node = el.children[0] as WaTreeItem;
          node.focus();
          await el.updateComplete;

          await sendKeys({ press: 'Enter' });
          await el.updateComplete;

          expect(el.selectedItems).to.have.lengthOf(1);
          expect(el.selectedItems[0]).to.equal(node);
        });
      });

      describe('slots', () => {
        it('should render the default slot', () => {
          const items = el.querySelectorAll('wa-tree-item');
          expect(items.length).to.be.greaterThan(0);
        });

        describe('when a custom expanded/collapsed icon is provided', () => {
          beforeEach(async () => {
            el = await fixture(html`
              <wa-tree>
                <div slot="expand-icon"></div>
                <div slot="collapse-icon"></div>

                <wa-tree-item>Node 1</wa-tree-item>
                <wa-tree-item>Node 2</wa-tree-item>
              </wa-tree>
            `);
          });

          it('should append a clone of the icon in the proper slot of the tree item', async () => {
            await el.updateComplete;

            const treeItems = [...el.querySelectorAll('wa-tree-item')];

            treeItems.forEach(treeItem => {
              expect(treeItem.querySelector('div[slot="expand-icon"]')).to.be.ok;
              expect(treeItem.querySelector('div[slot="collapse-icon"]')).to.be.ok;
            });
          });
        });

        // https://github.com/shoelace-style/shoelace/issues/1916
        it("should not render 'null' if it can't find a custom icon", async () => {
          const tree = await fixture<WaTree>(html`
            <wa-tree>
              <wa-tree-item>
                Item 1
                <wa-icon name="1-circle" slot="expand-icon"></wa-icon>
                <wa-tree-item> Item A </wa-tree-item>
              </wa-tree-item>
              <wa-tree-item>
                Item 2
                <wa-tree-item>Item A</wa-tree-item>
                <wa-tree-item>Item B</wa-tree-item>
              </wa-tree-item>
              <wa-tree-item>
                Item 3
                <wa-tree-item>Item A</wa-tree-item>
                <wa-tree-item>Item B</wa-tree-item>
              </wa-tree-item>
            </wa-tree>
          `);

          expect(tree.textContent).to.not.includes('null');
        });
      });

      describe('keyboard navigation', () => {
        describe('when ArrowDown is pressed', () => {
          it('should move the focus to the next tree item', async () => {
            el.focus();
            await el.updateComplete;

            await sendKeys({ press: 'ArrowDown' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '-1');
            expect(el.children[1]).to.have.attribute('tabindex', '0');
          });
        });

        describe('when ArrowUp is pressed', () => {
          it('should move the focus to the prev tree item', async () => {
            (el.children[1] as HTMLElement).focus();
            await el.updateComplete;

            await sendKeys({ press: 'ArrowUp' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '0');
            expect(el.children[1]).to.have.attribute('tabindex', '-1');
          });
        });

        describe('when ArrowRight is pressed', () => {
          it('should move focus to the next item when node is a leaf', async () => {
            (el.children[0] as HTMLElement).focus();
            await el.updateComplete;

            await sendKeys({ press: 'ArrowRight' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '-1');
            expect(el.children[1]).to.have.attribute('tabindex', '0');
          });

          it('should expand a collapsed node', async () => {
            const parentNode = el.children[2] as WaTreeItem;
            parentNode.focus();
            await el.updateComplete;

            await sendKeys({ press: 'ArrowRight' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(parentNode).to.have.attribute('tabindex', '0');
            expect(parentNode).to.have.attribute('expanded');
          });

          it('should move focus to the first child when node is expanded', async () => {
            const parentNode = el.children[2] as WaTreeItem;
            parentNode.expanded = true;
            parentNode.focus();
            await el.updateComplete;

            await sendKeys({ press: 'ArrowRight' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(parentNode).to.have.attribute('tabindex', '-1');
            expect(parentNode.children[0]).to.have.attribute('tabindex', '0');
          });
        });

        describe('when ArrowLeft is pressed', () => {
          it('should move focus to the prev item when node is a leaf', async () => {
            (el.children[1] as HTMLElement).focus();
            await el.updateComplete;

            await sendKeys({ press: 'ArrowLeft' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '0');
            expect(el.children[1]).to.have.attribute('tabindex', '-1');
          });

          it('should move focus to the prev item when node is collapsed', async () => {
            (el.children[2] as HTMLElement).focus();
            await el.updateComplete;

            await sendKeys({ press: 'ArrowLeft' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[1]).to.have.attribute('tabindex', '0');
            expect(el.children[2]).to.have.attribute('tabindex', '-1');
          });

          it('should collapse an expanded node', async () => {
            const parentNode = el.children[2] as WaTreeItem;
            parentNode.expanded = true;
            parentNode.focus();
            await el.updateComplete;

            await sendKeys({ press: 'ArrowLeft' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(parentNode).to.have.attribute('tabindex', '0');
            expect(parentNode).not.to.have.attribute('expanded');
          });
        });

        describe('when Home is pressed', () => {
          it('should move the focus to the first tree item', async () => {
            const parentNode = el.children[3] as WaTreeItem;
            parentNode.focus();
            await el.updateComplete;

            await sendKeys({ press: 'Home' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '0');
            expect(el.children[3]).to.have.attribute('tabindex', '-1');
          });
        });

        describe('when End is pressed', () => {
          it('should move the focus to the last tree item', async () => {
            const parentNode = el.children[0] as WaTreeItem;
            parentNode.focus();
            await el.updateComplete;

            await sendKeys({ press: 'End' });

            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '-1');
            expect(el.children[3]).to.have.attribute('tabindex', '0');
          });
        });

        describe('when Enter is pressed', () => {
          describe('and selection is "single"', () => {
            it('should select only one tree item', async () => {
              el.selection = 'single';
              const node = el.children[1] as WaTreeItem;
              node.focus();
              await el.updateComplete;

              await sendKeys({ press: 'Enter' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: 'Enter' });

              expect(el.selectedItems.length).to.eq(1);
              expect(el.children[2]).to.have.attribute('selected');
            });
          });

          describe('and selection is "leaf"', () => {
            it('should select only one tree item', async () => {
              el.selection = 'leaf';
              const node = el.children[0] as WaTreeItem;
              node.focus();
              await el.updateComplete;

              await sendKeys({ press: 'Enter' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: 'Enter' });

              expect(el.selectedItems.length).to.eq(1);
            });

            it('should expand/collapse a parent node', async () => {
              el.selection = 'leaf';
              const parentNode = el.children[2] as WaTreeItem;
              parentNode.focus();
              await el.updateComplete;

              await sendKeys({ press: 'Enter' });

              expect(el).to.have.attribute('tabindex', '-1');
              expect(el.selectedItems.length).to.eq(0);
              expect(parentNode).to.have.attribute('expanded');
            });
          });

          describe('and selection is "multiple"', () => {
            it('should toggle the selection on the tree item', async () => {
              el.selection = 'multiple';
              const node = el.children[1] as WaTreeItem;
              node.focus();
              await el.updateComplete;

              await sendKeys({ press: 'Enter' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: 'Enter' });

              expect(el.selectedItems.length).to.eq(6);
            });
          });
        });

        describe('when Space is pressed', () => {
          describe('and selection is "single"', () => {
            it('should select only one tree item', async () => {
              el.selection = 'single';
              const node = el.children[1] as WaTreeItem;
              node.focus();
              await el.updateComplete;

              await sendKeys({ press: ' ' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: ' ' });

              expect(el.selectedItems.length).to.eq(1);
            });
          });

          describe('and selection is "leaf"', () => {
            it('should select only one tree item', async () => {
              el.selection = 'leaf';
              const node = el.children[0] as WaTreeItem;
              node.focus();
              await el.updateComplete;

              await sendKeys({ press: ' ' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: ' ' });

              expect(el.selectedItems.length).to.eq(1);
            });

            it('should expand/collapse a parent node', async () => {
              el.selection = 'leaf';
              const parentNode = el.children[2] as WaTreeItem;
              parentNode.focus();
              await el.updateComplete;

              await sendKeys({ press: ' ' });

              expect(el).to.have.attribute('tabindex', '-1');
              expect(el.selectedItems.length).to.eq(0);
              expect(parentNode).to.have.attribute('expanded');
            });
          });

          describe('and selection is "multiple"', () => {
            it('should toggle the selection on the tree item', async () => {
              el.selection = 'multiple';
              const node = el.children[0] as WaTreeItem;
              node.focus();
              await el.updateComplete;

              await sendKeys({ press: ' ' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: ' ' });

              expect(el.selectedItems.length).to.eq(2);
            });
          });
        });
      });

      describe('events', () => {
        it('should emit wa-selection-change when selecting via keyboard', async () => {
          el.selection = 'single';
          const node = el.children[0] as WaTreeItem;
          node.focus();
          await el.updateComplete;

          const events = await expectEvent(el, 'wa-selection-change', async () => {
            await sendKeys({ press: 'Enter' });
          });

          expect(events).to.have.lengthOf(1);
          expect((events[0] as CustomEvent).detail.selection).to.deep.equal([node]);
        });

        describe('when selection is "leaf"', () => {
          it('should not emit wa-selection-change when clicking an expandable item', async () => {
            el.selection = 'leaf';
            await el.updateComplete;

            const selectedChangeSpy = sinon.spy();
            el.addEventListener('wa-selection-change', selectedChangeSpy);

            const node = el.querySelector<WaTreeItem>('#expandable')!;

            await clickOnElement(node);
            await Promise.all([node.updateComplete, el.updateComplete]);

            expect(selectedChangeSpy).to.not.have.been.called;
          });
        });
      });

      describe('interactions', () => {
        it('should set the focus to the last focused item when the tree receives focus', async () => {
          const node = el.children[1] as WaTreeItem;
          node.focus();
          await el.updateComplete;

          triggerBlurFor(node);
          triggerFocusFor(el);

          expect(el).to.have.attribute('tabindex', '-1');
          expect(node).to.have.attribute('tabindex', '0');
        });
      });

      describe('checkbox synchronization', () => {
        it('should select all nested children when a parent node is selected', async () => {
          const tree = await fixture<WaTree>(html`
            <wa-tree selection="multiple">
              <wa-tree-item selected>
                Parent Node
                <wa-tree-item selected>Child Node 1</wa-tree-item>
                <wa-tree-item>
                  Child Node 2
                  <wa-tree-item>Child Node 2 - 1</wa-tree-item>
                  <wa-tree-item>Child Node 2 - 2</wa-tree-item>
                </wa-tree-item>
              </wa-tree-item>
            </wa-tree>
          `);
          const treeItems = Array.from<WaTreeItem>(tree.querySelectorAll('wa-tree-item'));

          await tree.updateComplete;
          await Promise.allSettled(treeItems.map(treeItem => treeItem.updateComplete));

          treeItems.forEach(treeItem => {
            expect(treeItem).to.have.attribute('selected');
          });
        });

        it('should select the parent node when all children are selected', async () => {
          const tree = await fixture<WaTree>(html`
            <wa-tree selection="multiple">
              <wa-tree-item>
                Parent Node
                <wa-tree-item selected>Child Node 1</wa-tree-item>
                <wa-tree-item selected>
                  Child Node 2
                  <wa-tree-item>Child Node 2 - 1</wa-tree-item>
                  <wa-tree-item>Child Node 2 - 2</wa-tree-item>
                </wa-tree-item>
              </wa-tree-item>
            </wa-tree>
          `);
          const treeItems = Array.from<WaTreeItem>(tree.querySelectorAll('wa-tree-item'));

          await tree.updateComplete;
          await Promise.allSettled(treeItems.map(treeItem => treeItem.updateComplete));

          treeItems.forEach(treeItem => {
            expect(treeItem).to.have.attribute('selected');
          });
          expect(treeItems[0].indeterminate).to.be.false;
        });

        it('should set the parent node to indeterminate when some children are selected', async () => {
          const tree = await fixture<WaTree>(html`
            <wa-tree selection="multiple">
              <wa-tree-item>
                Parent Node
                <wa-tree-item selected>Child Node 1</wa-tree-item>
                <wa-tree-item>
                  Child Node 2
                  <wa-tree-item>Child Node 2 - 1</wa-tree-item>
                  <wa-tree-item>Child Node 2 - 2</wa-tree-item>
                </wa-tree-item>
              </wa-tree-item>
            </wa-tree>
          `);
          const treeItems = Array.from<WaTreeItem>(tree.querySelectorAll('wa-tree-item'));

          await tree.updateComplete;
          await Promise.allSettled(treeItems.map(treeItem => treeItem.updateComplete));

          expect(treeItems[0]).not.to.have.attribute('selected');
          expect(treeItems[0].indeterminate).to.be.true;
          expect(treeItems[1]).to.have.attribute('selected');
          expect(treeItems[2]).not.to.have.attribute('selected');
          expect(treeItems[3]).not.to.have.attribute('selected');
          expect(treeItems[4]).not.to.have.attribute('selected');
        });
      });
    });
  }
});
