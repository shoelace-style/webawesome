import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { discover } from './autoloader.js';

describe('autoloader', () => {
  describe('discover()', () => {
    it('should dispatch wa-discovery-complete event after discovering components', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const handler = sinon.spy();
      container.addEventListener('wa-discovery-complete', handler);

      // Add an undefined component
      container.innerHTML = '<wa-button>Test</wa-button>';

      await discover(container);

      expect(handler).to.have.been.calledOnce;

      container.remove();
    });

    it('should dispatch wa-discovery-complete even when no components need registration', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const handler = sinon.spy();
      container.addEventListener('wa-discovery-complete', handler);

      // No components in the container
      container.innerHTML = '<div>No components here...</div>';

      await discover(container);

      expect(handler).to.have.been.calledOnce;

      container.remove();
    });

    it('should wait for component updateComplete before dispatching wa-discovery-complete', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      // Add a component that needs to be discovered
      container.innerHTML = '<wa-spinner></wa-spinner>';

      // Track the order of events
      const events: string[] = [];

      container.addEventListener('wa-discovery-complete', () => {
        events.push('discovery-complete');
      });

      await discover(container);

      // After discover completes, the spinner should be rendered
      const spinner = container.querySelector('wa-spinner');
      expect(spinner).to.exist;

      // The component should be defined
      expect(customElements.get('wa-spinner')).to.exist;

      // The component should have a shadow root with content (indicating it has rendered)
      expect(spinner!.shadowRoot).to.exist;
      expect(spinner!.shadowRoot!.children.length).to.be.greaterThan(0);

      container.remove();
    });

    it('should have components fully rendered when wa-discovery-complete fires', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      // Add multiple WA components
      container.innerHTML = `
        <wa-button>Button</wa-button>
        <wa-badge>Badge</wa-badge>
      `;

      let buttonRendered = false;
      let badgeRendered = false;

      container.addEventListener('wa-discovery-complete', () => {
        const button = container.querySelector('wa-button');
        const badge = container.querySelector('wa-badge');

        // Check that shadow DOM content exists (component has rendered)
        buttonRendered = !!(button?.shadowRoot && button.shadowRoot.children.length > 0);
        badgeRendered = !!(badge?.shadowRoot && badge.shadowRoot.children.length > 0);
      });

      await discover(container);

      expect(buttonRendered).to.be.true;
      expect(badgeRendered).to.be.true;

      container.remove();
    });

    it('should handle nested components', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      // Add nested components
      container.innerHTML = `
        <wa-card>
          <wa-button slot="footer">Action</wa-button>
        </wa-card>
      `;

      const handler = sinon.spy();
      container.addEventListener('wa-discovery-complete', handler);

      await discover(container);

      expect(handler).to.have.been.calledOnce;

      const card = container.querySelector('wa-card');
      const button = container.querySelector('wa-button');

      // Both components should be defined and rendered
      expect(card?.shadowRoot).to.exist;
      expect(button?.shadowRoot).to.exist;

      container.remove();
    });

    it('should not fail when components fail to import', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      // Add a non-existent component (will fail to import)
      container.innerHTML = '<wa-nonexistent-component-xyz></wa-nonexistent-component-xyz>';

      const handler = sinon.spy();
      container.addEventListener('wa-discovery-complete', handler);

      // Suppress the expected console warning
      const warnStub = sinon.stub(console, 'warn');

      await discover(container);

      // Event should still fire even if some imports fail
      expect(handler).to.have.been.calledOnce;

      // Warning should have been logged
      expect(warnStub).to.have.been.called;

      warnStub.restore();
      container.remove();
    });

    it('should handle components that are already defined', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      // First, ensure wa-button is defined by discovering it
      container.innerHTML = '<wa-button>First</wa-button>';
      await discover(container);

      // Now add another component (already defined)
      const container2 = document.createElement('div');
      document.body.appendChild(container2);
      container2.innerHTML = '<wa-button>Second</wa-button>';

      const handler = sinon.spy();
      container2.addEventListener('wa-discovery-complete', handler);

      await discover(container2);

      // Should still complete successfully
      expect(handler).to.have.been.calledOnce;

      container.remove();
      container2.remove();
    });
  });
});
