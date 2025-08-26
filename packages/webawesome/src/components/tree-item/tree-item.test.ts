import { expect, oneEvent, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTreeItem from './tree-item.js';

describe('<wa-tree-item>', () => {
  let leafItem: WaTreeItem;
  let parentItem: WaTreeItem;

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      beforeEach(async () => {
        leafItem = await fixture(html` <wa-tree-item>Node 1</wa-tree-item> `);
        parentItem = await fixture(html`
          <wa-tree-item>
            Parent Node
            <wa-tree-item>Node 1</wa-tree-item>
            <wa-tree-item>Node 1</wa-tree-item>
          </wa-tree-item>
        `);
      });

      it('should render a component', () => {
        expect(leafItem).to.exist;
        expect(parentItem).to.exist;

        expect(leafItem).to.have.attribute('role', 'treeitem');
        expect(leafItem).to.have.attribute('aria-selected', 'false');
        expect(leafItem).to.have.attribute('aria-disabled', 'false');
      });

      describe('when it contains child tree items', () => {
        it('should set isLeaf to false', () => {
          // Assert
          expect(parentItem.isLeaf).to.be.false;
        });

        it('should show the expand button', () => {
          // Arrange
          const expandButton = parentItem.shadowRoot?.querySelector('.expand-button');

          // Act

          // Assert
          expect(expandButton?.childElementCount).to.be.greaterThan(0);
        });

        it('should set the aria-expanded attribute', () => {
          expect(parentItem).to.have.attribute('aria-expanded', 'false');
        });
      });

      describe('when the user clicks the expand button', () => {
        describe('and the item is collapsed', () => {
          it('should emit wa-expand and wa-after-expand events', async () => {
            // Arrange
            const expandSpy = sinon.spy();
            const afterExpandSpy = sinon.spy();

            parentItem.addEventListener('wa-expand', expandSpy);
            parentItem.addEventListener('wa-after-expand', afterExpandSpy);

            // Act
            parentItem.expanded = true;
            await waitUntil(() => expandSpy.calledOnce);
            await waitUntil(() => afterExpandSpy.calledOnce);

            // Assert
            expect(expandSpy).to.have.been.calledOnce;
            expect(afterExpandSpy).to.have.been.calledOnce;
          });
        });

        describe('and the item is expanded', () => {
          it('should emit wa-collapse and wa-after-collapse events', async () => {
            // Arrange
            const collapseSpy = sinon.spy();
            const afterCollapseSpy = sinon.spy();

            parentItem.addEventListener('wa-collapse', collapseSpy);
            parentItem.addEventListener('wa-after-collapse', afterCollapseSpy);

            parentItem.expanded = true;
            await oneEvent(parentItem, 'wa-after-expand');

            // Act
            parentItem.expanded = false;
            await waitUntil(() => collapseSpy.calledOnce);
            await waitUntil(() => afterCollapseSpy.calledOnce);

            // Assert
            expect(collapseSpy).to.have.been.calledOnce;
            expect(afterCollapseSpy).to.have.been.calledOnce;
          });

          describe('and the item is disabled', () => {
            it('should not expand', async () => {
              // Arrange
              const expandButton: HTMLElement = parentItem.shadowRoot!.querySelector('.expand-button')!;
              parentItem.disabled = true;

              // Act
              expandButton.click();
              await parentItem.updateComplete;

              // Assert
              expect(parentItem).not.to.have.attribute('expanded');
              expect(parentItem).to.have.attribute('aria-expanded', 'false');
            });
          });
        });
      });

      describe('when the item is selected', () => {
        it('should update the aria-selected attribute', async () => {
          // Act
          leafItem.selected = true;
          await leafItem.updateComplete;

          // Assert
          expect(leafItem).to.have.attribute('aria-selected', 'true');
        });

        it('should set selected part', async () => {
          // Act
          leafItem.selected = true;
          await leafItem.updateComplete;

          // Assert
          expect(leafItem.customStates.has('selected')).to.be.true;
        });
      });

      describe('when the item is disabled', () => {
        it('should update the aria-disabled attribute', async () => {
          // Act
          leafItem.disabled = true;
          await leafItem.updateComplete;

          // Assert
          expect(leafItem).to.have.attribute('aria-disabled', 'true');
        });
      });

      describe('when the item is expanded', () => {
        it('should set expanded state', async () => {
          // Act
          leafItem.expanded = true;
          await leafItem.updateComplete;

          // Assert
          expect(leafItem.customStates.has('expanded')).to.be.true;
        });
      });

      describe('when the item is lazy', () => {
        it('should emit wa-lazy-change when the lazy attribute is added and removed', async () => {
          // Arrange
          const lazyChangeSpy = sinon.spy();

          parentItem.addEventListener('wa-lazy-change', lazyChangeSpy);
          parentItem.lazy = true;

          // Act
          await waitUntil(() => lazyChangeSpy.calledOnce);
          parentItem.lazy = false;
          await waitUntil(() => lazyChangeSpy.calledOnce);

          // Assert
          expect(lazyChangeSpy).to.have.been.calledTwice;
        });
      });
    });
  }
});
