import { expect, fixture, html } from '@open-wc/testing';
import { resetMouse } from '@web/test-runner-commands';
import '../../../dist/shoelace.js';
import type WaDockPanel from './dock-panel.js';

describe('<wa-dock-panel>', () => {
  afterEach(async () => {
    await resetMouse();
  });

  it('should render a component', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    expect(dockPanel).to.exist;
  });

  it('should render with a layout', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'tabs',
      tabs: [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ],
      activeTabId: 'tab1',
    };
    await dockPanel.updateComplete;

    const tabs = dockPanel.shadowRoot!.querySelectorAll('.dock-panel__tab');
    expect(tabs.length).to.equal(2);
  });

  it('should switch active tab when clicked', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'tabs',
      tabs: [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ],
      activeTabId: 'tab1',
    };
    await dockPanel.updateComplete;

    const tab2 = dockPanel.shadowRoot!.querySelector('.dock-panel__tab:nth-child(2)')! as HTMLElement;
    tab2.click();
    await dockPanel.updateComplete;

    expect(dockPanel.layout.activeTabId).to.equal('tab2');
  });

  it('should add a tab to a panel', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'tabs',
      tabs: [{ id: 'tab1', label: 'Tab 1' }],
      activeTabId: 'tab1',
    };
    await dockPanel.updateComplete;

    dockPanel.addTab('root', { id: 'tab2', label: 'Tab 2' });
    await dockPanel.updateComplete;

    expect(dockPanel.layout.tabs!.length).to.equal(2);
    expect(dockPanel.layout.tabs![1].id).to.equal('tab2');
  });

  it('should remove a tab', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'tabs',
      tabs: [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ],
      activeTabId: 'tab1',
    };
    await dockPanel.updateComplete;

    dockPanel.removeTab('tab1');
    await dockPanel.updateComplete;

    expect(dockPanel.layout.tabs!.length).to.equal(1);
    expect(dockPanel.layout.tabs![0].id).to.equal('tab2');
  });

  it('should render closable tabs', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'tabs',
      tabs: [{ id: 'tab1', label: 'Tab 1', closable: true }],
      activeTabId: 'tab1',
    };
    await dockPanel.updateComplete;

    const closeButton = dockPanel.shadowRoot!.querySelector('.dock-panel__tab-close');
    expect(closeButton).to.exist;
  });

  it('should render split panels', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'split',
      direction: 'horizontal',
      sizes: [50, 50],
      children: [
        {
          id: 'panel1',
          type: 'tabs',
          tabs: [{ id: 'tab1', label: 'Tab 1' }],
          activeTabId: 'tab1',
        },
        {
          id: 'panel2',
          type: 'tabs',
          tabs: [{ id: 'tab2', label: 'Tab 2' }],
          activeTabId: 'tab2',
        },
      ],
    };
    await dockPanel.updateComplete;

    const splitContainer = dockPanel.shadowRoot!.querySelector('.dock-panel__split');
    expect(splitContainer).to.exist;

    const divider = dockPanel.shadowRoot!.querySelector('.dock-panel__divider');
    expect(divider).to.exist;
  });

  it('should emit wa-dock-tab-show event when activating a tab', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'tabs',
      tabs: [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ],
      activeTabId: 'tab1',
    };
    await dockPanel.updateComplete;

    let eventFired = false;
    dockPanel.addEventListener('wa-dock-tab-show', () => {
      eventFired = true;
    });

    dockPanel.activateTab('root', 'tab2');
    await dockPanel.updateComplete;

    expect(eventFired).to.be.true;
  });

  it('should emit wa-dock-tab-close event when close button is clicked', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'tabs',
      tabs: [{ id: 'tab1', label: 'Tab 1', closable: true }],
      activeTabId: 'tab1',
    };
    await dockPanel.updateComplete;

    let eventDetail: { panelId: string; tabId: string } | null = null;
    dockPanel.addEventListener('wa-dock-tab-close', ((e: CustomEvent<{ panelId: string; tabId: string }>) => {
      eventDetail = e.detail;
    }) as EventListener);

    const closeButton = dockPanel.shadowRoot!.querySelector('.dock-panel__tab-close')! as HTMLButtonElement;
    closeButton.click();
    await dockPanel.updateComplete;

    expect(eventDetail).to.deep.equal({ panelId: 'root', tabId: 'tab1' });
  });

  it('should be accessible', async () => {
    const dockPanel = await fixture<WaDockPanel>(html`<wa-dock-panel></wa-dock-panel>`);

    dockPanel.layout = {
      id: 'root',
      type: 'tabs',
      tabs: [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ],
      activeTabId: 'tab1',
    };
    await dockPanel.updateComplete;

    await expect(dockPanel).to.be.accessible();
  });
});
