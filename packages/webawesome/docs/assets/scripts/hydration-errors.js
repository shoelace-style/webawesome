/** TODO: This should probably get abstracted into an actual package. This is listens to the "lit-hydration-error" and then will add a button to show a dialog of the diff. */
(async () => {
  const hostname = new URL(document.baseURI).hostname;

  // Only diff on localhost. We don't need to show hydration errors on main site. Only locally.
  if (hostname !== 'localhost') {
    return;
  }

  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  async function handleLitHydrationError(e) {
    const { diffLines } = await import('https://cdn.jsdelivr.net/npm/diff@5.2.0/+esm');
    const { getDiffableHTML } = await import(
      'https://cdn.jsdelivr.net/npm/@open-wc/semantic-dom-diff@0.20.1/get-diffable-html.js/+esm'
    );

    const element = e.target;
    const scratch = document.createElement('div');
    const node = element.cloneNode(true);
    scratch.append(node);
    document.body.append(scratch);
    customElements.upgrade(node);
    node.updateComplete.then(() => {
      // Render styles.
      const elementStyles = element.constructor.elementStyles;
      const finalStyles = [];
      if (elementStyles !== undefined && elementStyles.length > 0) {
        for (const style of elementStyles) {
          finalStyles.push(style.cssText);
        }
      }

      let innerHTML = scratch.firstElementChild?.shadowRoot.innerHTML;

      if (finalStyles?.length) {
        const styleTag = `<style>${finalStyles.join('\n')}</style>`;
        innerHTML = styleTag + '\n' + innerHTML;
      }

      const clientHTML = getDiffableHTML(innerHTML);
      const serverHTML = getDiffableHTML(element.shadowRoot?.innerHTML);

      const diffDebugger = document.createElement('div');
      diffDebugger.className = 'diff-debugger';

      diffDebugger.innerHTML = `
      <button class="diff-dialog-toggle">
        Show Hydration Mismatch
      </button>
      <wa-dialog class="diff-dialog" light-dismiss>
        <div class="diff-grid">
          <div>
            <div>Diff (Green is Client, Red is Server)</div>
            <pre class="diff-viewer"><code></code></pre>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
            <div>
              <div>Server</div>
              <pre class="diff diff-server"><code></code></pre>
            </div>
            <div>
              <div>Client</div>
              <pre class="diff diff-client"><code></code></pre>
            </div>
          </div>
        </div>
      </wa-dialog>
    `;

      console.log(element);
      element.focus();
      wrap(element, diffDebugger);

      // const diffViewer = diffDebugger.querySelector('diff-view-element');
      // diffViewer.oldValue = serverHTML
      // diffViewer.newValue = clientHTML
      const diffViewer = diffDebugger.querySelector('.diff-viewer');

      diffViewer.appendChild(
        createDiff(
          diffLines(serverHTML, clientHTML, {
            ignoreWhitespace: false,
            newLineIsToken: true,
          }),
        ),
      );

      diffDebugger.querySelector('.diff-server > code').textContent = serverHTML;
      diffDebugger.querySelector('.diff-client > code').textContent = clientHTML;
    });
  }

  function createDiff(diff) {
    const fragment = document.createDocumentFragment();
    for (var i = 0; i < diff.length; i++) {
      if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
        var swap = diff[i];
        diff[i] = diff[i + 1];
        diff[i + 1] = swap;
      }

      var node;
      if (diff[i].removed) {
        node = document.createElement('del');
        node.appendChild(document.createTextNode(diff[i].value));
      } else if (diff[i].added) {
        node = document.createElement('ins');
        node.appendChild(document.createTextNode(diff[i].value));
      } else {
        node = document.createTextNode(diff[i].value);
      }
      fragment.appendChild(node);
    }

    return fragment;
  }

  function handleDialogToggle(e) {
    const button = e.composedPath().find(el => {
      return el.classList && el.classList.contains('diff-dialog-toggle');
    });

    if (button) {
      button.parentElement.querySelector('.diff-dialog').open = true;
    }
  }
  document.addEventListener('lit-hydration-error', handleLitHydrationError);
  document.addEventListener('click', handleDialogToggle);
})();
