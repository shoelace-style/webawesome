import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaInclude from './include.js';

const stubbedFetchResponse: Response = {
  headers: new Headers(),
  ok: true,
  redirected: false,
  status: 200,
  statusText: 'OK',
  type: 'default',
  url: '',
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(''),
  blob: sinon.fake() as unknown as () => Promise<Blob>,
  arrayBuffer: sinon.fake() as unknown as () => Promise<ArrayBuffer>,
  formData: sinon.fake() as unknown as () => Promise<FormData>,
  bodyUsed: false,
  body: null,
  clone: sinon.fake() as unknown as () => Response,
  bytes: sinon.fake() as unknown as () => Promise<Uint8Array<ArrayBuffer>>,
};

async function delayResolve(resolveValue: string) {
  await aTimeout(10);
  return resolveValue;
}

describe('<wa-include>', () => {
  afterEach(() => {
    sinon.verifyAndRestore();
  });

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaInclude>(html`<wa-include></wa-include>`);

          expect(el.src).to.be.undefined;
          expect(el.mode).to.equal('cors');
          expect(el.allowScripts).to.be.false;
        });

        it('should set the src property via attribute', async () => {
          sinon.stub(window, 'fetch').resolves({
            ...stubbedFetchResponse,
            ok: true,
            status: 200,
            text: () => delayResolve('content'),
          });

          const el = await fixture<WaInclude>(html`<wa-include src="/test-src"></wa-include>`);
          expect(el.src).to.equal('/test-src');
        });

        it('should set the mode property via attribute', async () => {
          const el = await fixture<WaInclude>(html`<wa-include mode="same-origin"></wa-include>`);
          expect(el.mode).to.equal('same-origin');
        });

        it('should set the allow-scripts property via attribute', async () => {
          const el = await fixture<WaInclude>(html`<wa-include allow-scripts></wa-include>`);
          expect(el.allowScripts).to.be.true;
        });
      });

      describe('events', () => {
        it('should emit wa-load when content is successfully loaded', async () => {
          sinon.stub(window, 'fetch').resolves({
            ...stubbedFetchResponse,
            ok: true,
            status: 200,
            text: () => delayResolve('<p>Hello</p>'),
          });

          const loadHandler = sinon.spy();
          document.addEventListener('wa-load', loadHandler);

          const el = await fixture<WaInclude>(html`<wa-include src="/found"></wa-include>`);

          await waitUntil(() => loadHandler.calledOnce);
          document.removeEventListener('wa-load', loadHandler);

          expect(el.innerHTML).to.contain('<p>Hello</p>');
          expect(loadHandler).to.have.been.calledOnce;
        });

        it('should emit wa-include-error when content fails to load', async () => {
          sinon.stub(window, 'fetch').resolves({
            ...stubbedFetchResponse,
            ok: false,
            status: 404,
            text: () => delayResolve(''),
          });

          const errorHandler = sinon.spy();
          document.addEventListener('wa-include-error', errorHandler);

          await fixture<WaInclude>(html`<wa-include src="/not-found"></wa-include>`);

          await waitUntil(() => errorHandler.calledOnce);
          document.removeEventListener('wa-include-error', errorHandler);

          expect(errorHandler).to.have.been.calledOnce;
          const event = errorHandler.firstCall.args[0] as CustomEvent;
          expect(event.detail).to.have.property('status', 404);
        });

        it('should emit wa-include-error with status -1 when fetch throws', async () => {
          sinon.stub(window, 'fetch').rejects(new Error('Network error'));

          const errorHandler = sinon.spy();
          document.addEventListener('wa-include-error', errorHandler);

          await fixture<WaInclude>(html`<wa-include src="/network-error"></wa-include>`);

          await waitUntil(() => errorHandler.calledOnce);
          document.removeEventListener('wa-include-error', errorHandler);

          expect(errorHandler).to.have.been.calledOnce;
          const event = errorHandler.firstCall.args[0] as CustomEvent;
          expect(event.detail).to.have.property('status', -1);
        });
      });

      describe('behavior', () => {
        it('should inject loaded HTML into its innerHTML', async () => {
          sinon.stub(window, 'fetch').resolves({
            ...stubbedFetchResponse,
            ok: true,
            status: 200,
            text: () => delayResolve('<span class="test-content">Loaded</span>'),
          });

          const loadHandler = sinon.spy();
          document.addEventListener('wa-load', loadHandler);

          const el = await fixture<WaInclude>(html`<wa-include src="/content"></wa-include>`);

          await waitUntil(() => loadHandler.calledOnce);
          document.removeEventListener('wa-load', loadHandler);

          const span = el.querySelector('.test-content');
          expect(span).to.exist;
          expect(span!.textContent).to.equal('Loaded');
        });

        it('should not update innerHTML if src changes before the request completes', async () => {
          // Unique per fixture iteration so the module-level requestInclude cache doesn't leak between runs
          const firstSrc = `/first-${fixture.type}`;
          const secondSrc = `/second-${fixture.type}`;

          let resolveFirst: (value: string) => void;
          const firstPromise = new Promise<string>(resolve => {
            resolveFirst = resolve;
          });

          const fetchStub = sinon.stub(window, 'fetch');
          fetchStub.onFirstCall().resolves({
            ...stubbedFetchResponse,
            ok: true,
            status: 200,
            text: () => firstPromise,
          });
          fetchStub.onSecondCall().resolves({
            ...stubbedFetchResponse,
            ok: true,
            status: 200,
            text: () => delayResolve('Second content'),
          });

          const loadHandler = sinon.spy();
          document.addEventListener('wa-load', loadHandler);
          document.addEventListener('wa-error', loadHandler);

          const el = await fixture<WaInclude>(html`<wa-include src="${firstSrc}"></wa-include>`);

          // Change src before first request completes
          el.src = secondSrc;
          await el.updateComplete;

          // Now resolve the first request
          resolveFirst!('First content');
          await aTimeout(50);

          await waitUntil(() => loadHandler.calledOnce);
          document.removeEventListener('wa-load', loadHandler);

          // Should contain second content, not first
          expect(el.innerHTML).to.contain('Second content');
        });
      });

      describe('same-page fragments', () => {
        it('should clone the content of a same-page template referenced by id', async () => {
          const template = document.createElement('template');
          template.id = `tpl-${fixture.type}`;
          template.innerHTML = '<span class="from-template">Templated</span>';
          document.body.append(template);

          try {
            const el = await fixture<WaInclude>(html`<wa-include src="#tpl-${fixture.type}"></wa-include>`);
            await el.updateComplete;

            const span = el.querySelector('.from-template');
            expect(span).to.exist;
            expect(span!.textContent).to.equal('Templated');
            // The original template should be left untouched (we clone its content)
            expect(el.querySelector('template')).to.not.exist;
          } finally {
            template.remove();
          }
        });

        it('should clone the content of a non-template same-page element referenced by id', async () => {
          const source = document.createElement('div');
          source.id = `frag-${fixture.type}`;
          source.innerHTML = '<span class="from-div">Fragment</span>';
          document.body.append(source);

          try {
            const el = await fixture<WaInclude>(html`<wa-include src="#frag-${fixture.type}"></wa-include>`);
            await el.updateComplete;

            const span = el.querySelector('.from-div');
            expect(span).to.exist;
            expect(span!.textContent).to.equal('Fragment');
            // The wrapping element's content is inserted, not the element itself, so the id isn't duplicated
            expect(el.querySelector(`#frag-${fixture.type}`)).to.not.exist;
            // The original should still be in the document (we clone, not move)
            expect(document.body.querySelector(`#frag-${fixture.type}`)).to.equal(source);
          } finally {
            source.remove();
          }
        });

        it('should clear its contents when a same-page id is not found', async () => {
          const el = await fixture<WaInclude>(html`<wa-include src="#does-not-exist-${fixture.type}"></wa-include>`);
          await el.updateComplete;
          expect(el.children.length).to.equal(0);
        });
      });

      describe('remote fragments', () => {
        it('should extract the content of an element by id from a fetched file', async () => {
          sinon.stub(window, 'fetch').resolves({
            ...stubbedFetchResponse,
            ok: true,
            status: 200,
            text: () =>
              delayResolve('<div id="ignored">Ignored</div><section id="wanted"><b class="pick">Picked</b></section>'),
          });

          const loadHandler = sinon.spy();
          document.addEventListener('wa-load', loadHandler);

          const el = await fixture<WaInclude>(html`<wa-include src="/remote-fragment#wanted"></wa-include>`);

          await waitUntil(() => loadHandler.calledOnce);
          document.removeEventListener('wa-load', loadHandler);

          expect(el.querySelector('.pick')).to.exist;
          expect(el.querySelector('#ignored')).to.not.exist;
          // The wrapping element's content is inserted, not the element itself
          expect(el.querySelector('#wanted')).to.not.exist;
        });

        it('should clone the content of a template extracted from a fetched file', async () => {
          sinon.stub(window, 'fetch').resolves({
            ...stubbedFetchResponse,
            ok: true,
            status: 200,
            text: () => delayResolve('<template id="tpl"><span class="from-remote-tpl">Remote</span></template>'),
          });

          const loadHandler = sinon.spy();
          document.addEventListener('wa-load', loadHandler);

          const el = await fixture<WaInclude>(html`<wa-include src="/remote-template#tpl"></wa-include>`);

          await waitUntil(() => loadHandler.calledOnce);
          document.removeEventListener('wa-load', loadHandler);

          expect(el.querySelector('.from-remote-tpl')).to.exist;
          expect(el.querySelector('template')).to.not.exist;
        });

        it('should emit wa-include-error when the id is missing from a fetched file', async () => {
          sinon.stub(window, 'fetch').resolves({
            ...stubbedFetchResponse,
            ok: true,
            status: 200,
            text: () => delayResolve('<div id="other">Nope</div>'),
          });

          const errorHandler = sinon.spy();
          document.addEventListener('wa-include-error', errorHandler);

          const el = await fixture<WaInclude>(html`<wa-include src="/remote-missing#absent"></wa-include>`);

          await waitUntil(() => errorHandler.calledOnce);
          document.removeEventListener('wa-include-error', errorHandler);

          expect(errorHandler).to.have.been.calledOnce;
          expect(el.children.length).to.equal(0);
        });
      });
    });
  }
});
