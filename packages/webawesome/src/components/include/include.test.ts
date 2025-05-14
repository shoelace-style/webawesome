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
  blob: sinon.fake(),
  arrayBuffer: sinon.fake(),
  formData: sinon.fake(),
  bodyUsed: false,
  body: null,
  clone: sinon.fake(),
};

async function delayResolve(resolveValue: string) {
  // Delay the fetch response to give time for the event listener to attach
  await aTimeout(10);
  return resolveValue;
}

describe('<wa-include>', () => {
  afterEach(() => {
    sinon.verifyAndRestore();
  });

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should load content and emit wa-load', async () => {
        sinon.stub(window, 'fetch').resolves({
          ...stubbedFetchResponse,
          ok: true,
          status: 200,
          text: () => delayResolve('"id": 1'),
        });
        const loadHandler = sinon.spy();
        document.addEventListener('wa-load', loadHandler);
        const el = await fixture<WaInclude>(html` <wa-include src="/found"></wa-include> `);

        await waitUntil(() => loadHandler.calledOnce);

        document.removeEventListener('wa-load', loadHandler);

        expect(el.innerHTML).to.contain('"id": 1');
        expect(loadHandler).to.have.been.calledOnce;
      });

      it('should emit wa-include-error when content cannot be loaded', async () => {
        sinon.stub(window, 'fetch').resolves({
          ...stubbedFetchResponse,
          ok: false,
          status: 404,
          text: () => delayResolve('{}'),
        });
        const loadHandler = sinon.spy();
        document.addEventListener('wa-include-error', loadHandler);

        await fixture<WaInclude>(html` <wa-include src="/not-found"></wa-include> `);
        await waitUntil(() => loadHandler.calledOnce);
        document.removeEventListener('wa-include-error', loadHandler);

        expect(loadHandler).to.have.been.calledOnce;
      });
    });
  }
});
