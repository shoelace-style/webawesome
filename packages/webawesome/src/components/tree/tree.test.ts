import { aTimeout, expect, triggerBlurFor, triggerFocusFor } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaTreeItem from '../tree-item/tree-item.js';
import type WaTree from './tree.js';

describe('<wa-tree>', () => {
  let el: WaTree;

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
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

      it('should render a component', () => {
        expect(el).to.exist;
        expect(el).to.have.attribute('role', 'tree');
        expect(el).to.have.attribute('tabindex', '0');
      });

      it('should pass accessibility tests', async () => {
        await expect(el).to.be.accessible();
      });

      it('should not focus collapsed nodes', async () => {
        // Arrange
        const parentNode = el.children[2] as WaTreeItem;
        const childNode = parentNode.children[1] as WaTreeItem;
        childNode.expanded = true;
        parentNode.expanded = false;

        await el.updateComplete;

        // Act
        const focusableItems = el.getFocusableItems();

        // Assert
        expect(focusableItems).to.have.lengthOf(4);
        expect(focusableItems).not.to.include.all.members([childNode, ...childNode.children]);
        expect(focusableItems).not.to.include.all.members([...parentNode.children]);
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
          // Arrange
          await el.updateComplete;

          // Act
          const treeItems = [...el.querySelectorAll('wa-tree-item')];

          // Assert
          treeItems.forEach(treeItem => {
            expect(treeItem.querySelector('div[slot="expand-icon"]')).to.be.ok;
            expect(treeItem.querySelector('div[slot="collapse-icon"]')).to.be.ok;
          });
        });
      });

      describe('Keyboard navigation', () => {
        describe('when ArrowDown is pressed', () => {
          it('should move the focus to the next tree item', async () => {
            // Arrange
            el.focus();
            await el.updateComplete;
            // Act
            await sendKeys({ press: 'ArrowDown' });
            // Assert
            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '-1');
            expect(el.children[1]).to.have.attribute('tabindex', '0');
          });
        });
        describe('when ArrowUp is pressed', () => {
          it('should move the focus to the prev tree item', async () => {
            // Arrange
            (el.children[1] as HTMLElement).focus();
            await el.updateComplete;
            // Act
            await sendKeys({ press: 'ArrowUp' });
            // Assert
            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '0');
            expect(el.children[1]).to.have.attribute('tabindex', '-1');
          });
        });
        describe('when ArrowRight is pressed', () => {
          describe('and node is a leaf', () => {
            it('should move the focus to the next tree item', async () => {
              // Arrange
              (el.children[0] as HTMLElement).focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'ArrowRight' });
              // Assert
              expect(el).to.have.attribute('tabindex', '-1');
              expect(el.children[0]).to.have.attribute('tabindex', '-1');
              expect(el.children[1]).to.have.attribute('tabindex', '0');
            });
          });
          describe('and node is collapsed', () => {
            it('should expand the tree item', async () => {
              // Arrange
              const parentNode = el.children[2] as WaTreeItem;
              parentNode.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'ArrowRight' });
              // Assert
              expect(el).to.have.attribute('tabindex', '-1');
              expect(parentNode).to.have.attribute('tabindex', '0');
              expect(parentNode).to.have.attribute('expanded');
            });
          });
          describe('and node is expanded', () => {
            it('should move the focus to the next tree item', async () => {
              // Arrange
              const parentNode = el.children[2] as WaTreeItem;
              parentNode.expanded = true;
              parentNode.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'ArrowRight' });
              // Assert
              expect(el).to.have.attribute('tabindex', '-1');
              expect(parentNode).to.have.attribute('tabindex', '-1');
              expect(parentNode.children[0]).to.have.attribute('tabindex', '0');
            });
          });
        });
        describe('when ArrowLeft is pressed', () => {
          describe('and node is a leaf', () => {
            it('should move the focus to the prev tree item', async () => {
              // Arrange
              (el.children[1] as HTMLElement).focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'ArrowLeft' });
              // Assert
              expect(el).to.have.attribute('tabindex', '-1');
              expect(el.children[0]).to.have.attribute('tabindex', '0');
              expect(el.children[1]).to.have.attribute('tabindex', '-1');
            });
          });
          describe('and node is collapsed', () => {
            it('should move the focus to the prev tree item', async () => {
              // Arrange
              (el.children[2] as HTMLElement).focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'ArrowLeft' });
              // Assert
              expect(el).to.have.attribute('tabindex', '-1');
              expect(el.children[1]).to.have.attribute('tabindex', '0');
              expect(el.children[2]).to.have.attribute('tabindex', '-1');
            });
          });
          describe('and node is expanded', () => {
            it('should collapse the tree item', async () => {
              // Arrange
              const parentNode = el.children[2] as WaTreeItem;
              parentNode.expanded = true;
              parentNode.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'ArrowLeft' });
              // Assert
              expect(el).to.have.attribute('tabindex', '-1');
              expect(parentNode).to.have.attribute('tabindex', '0');
              expect(parentNode).not.to.have.attribute('expanded');
            });
          });
        });
        describe('when Home is pressed', () => {
          it('should move the focus to the first tree item in the tree', async () => {
            // Arrange
            const parentNode = el.children[3] as WaTreeItem;
            parentNode.focus();
            await el.updateComplete;
            // Act
            await sendKeys({ press: 'Home' });
            // Assert
            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '0');
            expect(el.children[3]).to.have.attribute('tabindex', '-1');
          });
        });
        describe('when End is pressed', () => {
          it('should move the focus to the last tree item in the tree', async () => {
            // Arrange
            const parentNode = el.children[0] as WaTreeItem;
            parentNode.focus();
            await el.updateComplete;
            // Act
            await sendKeys({ press: 'End' });
            // Assert
            expect(el).to.have.attribute('tabindex', '-1');
            expect(el.children[0]).to.have.attribute('tabindex', '-1');
            expect(el.children[3]).to.have.attribute('tabindex', '0');
          });
        });
        describe('when Enter is pressed', () => {
          describe('and selection is "single"', () => {
            it('should select only one tree item', async () => {
              // Arrange
              el.selection = 'single';
              const node = el.children[1] as WaTreeItem;
              node.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'Enter' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: 'Enter' });
              // Assert
              expect(el.selectedItems.length).to.eq(1);
              expect(el.children[2]).to.have.attribute('selected');
            });
          });
          describe('and selection is "leaf"', () => {
            it('should select only one tree item', async () => {
              // Arrange
              el.selection = 'leaf';
              const node = el.children[0] as WaTreeItem;
              node.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'Enter' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: 'Enter' });
              // Assert
              expect(el.selectedItems.length).to.eq(1);
            });
            it('should expand/collapse a parent node', async () => {
              // Arrange
              el.selection = 'leaf';
              const parentNode = el.children[2] as WaTreeItem;
              parentNode.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'Enter' });
              // Assert
              expect(el).to.have.attribute('tabindex', '-1');
              expect(el.selectedItems.length).to.eq(0);
              expect(parentNode).to.have.attribute('expanded');
            });
          });
          describe('and selection is "multiple"', () => {
            it('should toggle the selection on the tree item', async () => {
              // Arrange
              el.selection = 'multiple';
              const node = el.children[1] as WaTreeItem;
              node.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: 'Enter' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: 'Enter' });
              // Assert
              expect(el.selectedItems.length).to.eq(6);
            });
          });
        });
        describe('when Space is pressed', () => {
          describe('and selection is "single"', () => {
            it('should select only one tree item', async () => {
              // Arrange
              el.selection = 'single';
              const node = el.children[1] as WaTreeItem;
              node.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: ' ' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: ' ' });
              // Assert
              expect(el.selectedItems.length).to.eq(1);
            });
          });
          describe('and selection is "leaf"', () => {
            it('should select only one tree item', async () => {
              // Arrange
              el.selection = 'leaf';
              const node = el.children[0] as WaTreeItem;
              node.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: ' ' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: ' ' });
              // Assert
              expect(el.selectedItems.length).to.eq(1);
            });
            it('should expand/collapse a parent node', async () => {
              // Arrange
              el.selection = 'leaf';
              const parentNode = el.children[2] as WaTreeItem;
              parentNode.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: ' ' });
              // Assert
              expect(el).to.have.attribute('tabindex', '-1');
              expect(el.selectedItems.length).to.eq(0);
              expect(parentNode).to.have.attribute('expanded');
            });
          });
          describe('and selection is "multiple"', () => {
            it('should toggle the selection on the tree item', async () => {
              // Arrange
              el.selection = 'multiple';
              const node = el.children[0] as WaTreeItem;
              node.focus();
              await el.updateComplete;
              // Act
              await sendKeys({ press: ' ' });
              await sendKeys({ press: 'ArrowRight' });
              await sendKeys({ press: ' ' });
              // Assert
              expect(el.selectedItems.length).to.eq(2);
            });
          });
        });
      });

      describe('Interactions', () => {
        describe('when the tree is about to receive the focus', () => {
          it('should set the focus to the last focused item', async () => {
            // Arrange
            const node = el.children[1] as WaTreeItem;
            node.focus();
            await el.updateComplete;

            // Act
            triggerBlurFor(node);
            triggerFocusFor(el);

            // Assert
            expect(el).to.have.attribute('tabindex', '-1');
            expect(node).to.have.attribute('tabindex', '0');
          });
        });

        describe('when the user clicks the expand button', () => {
          it.skip('should expand the tree item', async () => {
            // Arrange
            el.selection = 'single';
            await el.updateComplete;

            const node = el.children[2] as WaTreeItem;
            await node.updateComplete;

            const expandButton: HTMLElement = node.shadowRoot!.querySelector('.expand-button')!;

            // Act
            await clickOnElement(expandButton);
            await el.updateComplete;

            // Assert
            expect(node).to.have.attribute('expanded');
          });
        });

        describe('when the user clicks on a tree item', () => {
          describe('and selection is "single"', () => {
            it.skip('should select only one tree item', async () => {
              // Arrange
              el.selection = 'single';
              const node0 = el.children[0] as WaTreeItem;
              const node1 = el.children[1] as WaTreeItem;
              await el.updateComplete;
              // Act
              await clickOnElement(node0);
              await el.updateComplete;
              await clickOnElement(node1);
              await el.updateComplete;
              // Assert
              expect(el.selectedItems.length).to.eq(1);
            });
          });
          describe('and selection is "leaf"', () => {
            it.skip('should select only one tree item', async () => {
              // Arrange
              el.selection = 'leaf';
              const node0 = el.children[0] as WaTreeItem;
              const node1 = el.children[1] as WaTreeItem;
              await el.updateComplete;
              // Act
              await clickOnElement(node0);
              await el.updateComplete;
              await clickOnElement(node1);
              await el.updateComplete;
              // Assert
              expect(el.selectedItems.length).to.eq(1);
            });

            it.skip('should expand/collapse a parent node', async () => {
              // Arrange
              el.selection = 'leaf';
              const parentNode = el.children[2] as WaTreeItem;
              await el.updateComplete;
              // Act
              await clickOnElement(parentNode);
              await parentNode.updateComplete;
              // Assert
              expect(el.selectedItems.length).to.eq(0);
              expect(parentNode).to.have.attribute('expanded');
            });
          });

          describe('and selection is "multiple"', () => {
            it.skip('should toggle the selection on the tree item', async () => {
              // Arrange
              el.selection = 'multiple';
              const node0 = el.children[0] as WaTreeItem;
              const node1 = el.children[1] as WaTreeItem;
              await el.updateComplete;
              // Act
              await clickOnElement(node0);
              await el.updateComplete;
              await clickOnElement(node1);
              await el.updateComplete;
              // Assert
              expect(el.selectedItems.length).to.eq(2);
            });

            it.skip('should select all the child tree items', async () => {
              // Arrange
              el.selection = 'multiple';
              await el.updateComplete;
              const parentNode = el.children[2] as WaTreeItem;
              // Act
              await clickOnElement(parentNode);
              await el.updateComplete;
              // Assert
              expect(parentNode).to.have.attribute('selected');
              expect(parentNode.indeterminate).to.be.false;
              parentNode.getChildrenItems().forEach(child => {
                expect(child).to.have.attribute('selected');
              });
            });

            it.skip('should set the indeterminate state to tree items if a child is selected', async () => {
              // Arrange
              el.selection = 'multiple';
              await el.updateComplete;
              const parentNode = el.children[2] as WaTreeItem;
              const childNode = parentNode.children[0] as WaTreeItem;
              // Act
              parentNode.expanded = true;
              await parentNode.updateComplete;
              await aTimeout(300);
              await clickOnElement(childNode);
              await el.updateComplete;
              // Assert
              expect(parentNode).not.to.have.attribute('selected');
              expect(parentNode.indeterminate).to.be.true;
            });
          });
        });

        describe('when selection is "single"', () => {
          describe('and user clicks on same item twice', () => {
            it.skip('should emit `wa-selection-change` event once', async () => {
              // Arrange
              el.selection = 'single';
              await el.updateComplete;

              const selectedChangeSpy = sinon.spy();
              el.addEventListener('wa-selection-change', selectedChangeSpy);

              const node = el.children[0] as WaTreeItem;

              // Act
              await clickOnElement(node);
              await el.updateComplete;
              await clickOnElement(node);
              await Promise.all([node.updateComplete, el.updateComplete]);

              // Assert
              expect(selectedChangeSpy).to.have.been.calledOnce;
              expect(selectedChangeSpy.args[0][0]).to.deep.include({ detail: { selection: [node] } });
            });
          });
        });
      });

      describe('when selection is "leaf"', () => {
        describe('and user clicks on same leaf item twice', () => {
          it.skip('should emit `wa-selection-change` event once', async () => {
            // Arrange
            el.selection = 'leaf';
            await el.updateComplete;

            const selectedChangeSpy = sinon.spy();
            el.addEventListener('wa-selection-change', selectedChangeSpy);

            const node = el.children[0] as WaTreeItem;

            // Act
            await clickOnElement(node);
            await el.updateComplete;
            await clickOnElement(node);
            await Promise.all([node.updateComplete, el.updateComplete]);

            // Assert
            expect(selectedChangeSpy).to.have.been.calledOnce;
            expect(selectedChangeSpy.args[0][0]).to.deep.include({ detail: { selection: [node] } });
          });
        });

        describe('and user clicks on expandable item', () => {
          it('should not emit `wa-selection-change` event', async () => {
            // Arrange
            el.selection = 'leaf';
            await el.updateComplete;

            const selectedChangeSpy = sinon.spy();
            el.addEventListener('wa-selection-change', selectedChangeSpy);

            const node = el.querySelector<WaTreeItem>('#expandable')!;

            // Act
            await clickOnElement(node);
            await Promise.all([node.updateComplete, el.updateComplete]);

            // Assert
            expect(selectedChangeSpy).to.not.have.been.called;
          });
        });
      });

      describe('when selection is "multiple"', () => {
        describe('and user clicks on same item twice', () => {
          it.skip('should emit `wa-selection-change` event twice', async () => {
            // Arrange
            el.selection = 'multiple';
            await el.updateComplete;

            const selectedChangeSpy = sinon.spy();
            el.addEventListener('wa-selection-change', selectedChangeSpy);

            const node = el.children[0] as WaTreeItem;

            // Act
            await clickOnElement(node);
            await Promise.all([node.updateComplete, el.updateComplete]);
            await clickOnElement(node);
            await Promise.all([node.updateComplete, el.updateComplete]);

            // Assert
            expect(selectedChangeSpy).to.have.been.calledTwice;
            expect(selectedChangeSpy.args[0][0]).to.deep.include({ detail: { selection: [node] } });
            expect(selectedChangeSpy.args[1][0]).to.deep.include({ detail: { selection: [] } });
          });
        });
      });

      describe('Checkboxes synchronization', () => {
        describe('when the tree gets initialized', () => {
          describe('and a parent node is selected', () => {
            it('should select all the nested children', async () => {
              // Arrange
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
              // Act
              await tree.updateComplete;
              await Promise.allSettled(treeItems.map(treeItem => treeItem.updateComplete));
              // Assert
              treeItems.forEach(treeItem => {
                expect(treeItem).to.have.attribute('selected');
              });
            });
          });

          describe('and a parent node is not selected', () => {
            describe('and all the children are selected', () => {
              it('should select the parent node', async () => {
                // Arrange
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
                // Act
                await tree.updateComplete;
                await Promise.allSettled(treeItems.map(treeItem => treeItem.updateComplete));
                // Assert
                treeItems.forEach(treeItem => {
                  expect(treeItem).to.have.attribute('selected');
                });
                expect(treeItems[0].indeterminate).to.be.false;
              });
            });

            describe('and some of the children are selected', () => {
              it('should set the parent node to indeterminate state', async () => {
                // Arrange
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
                // Act
                await tree.updateComplete;
                await Promise.allSettled(treeItems.map(treeItem => treeItem.updateComplete));
                // Assert
                expect(treeItems[0]).not.to.have.attribute('selected');
                expect(treeItems[0].indeterminate).to.be.true;
                expect(treeItems[1]).to.have.attribute('selected');
                expect(treeItems[2]).not.to.have.attribute('selected');
                expect(treeItems[3]).not.to.have.attribute('selected');
                expect(treeItems[4]).not.to.have.attribute('selected');
              });
            });
          });
        });
      });

      // https://github.com/shoelace-style/shoelace/issues/1916
      it("Should not render 'null' if it can't find a custom icon", async () => {
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
  }
});
