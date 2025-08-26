// TODO: Write logic around custom element definitions, no defs, conflicting defs, same defs, etc.
import { expect } from '@open-wc/testing';
import { readFile } from '@web/test-runner-commands';

import WaButton from '../../dist-cdn/components/button/button.js';

// We don't use WebAwesomeElement directly because it shouldn't exist in the final bundle.
/* eslint-disable */
const WebAwesomeElement = Object.getPrototypeOf(WaButton);
/* eslint-enable */

// @ts-expect-error Isn't written in TS.
import { getAllComponents } from '../../scripts/shared.js';

import Sinon from 'sinon';

const getMetadata = () => readFile({ path: '../../dist/custom-elements.json' }) as unknown as Promise<string>;

let counter = 0;

// These tests all run in the same tab so they pollute the global custom element registry.
// Some tests use this stub to be able to just test registration.
function stubCustomElements() {
  const map = new Map<string, CustomElementConstructor>();

  Sinon.stub(window.customElements, 'get').callsFake(str => {
    return map.get(str);
  });

  const stub = Sinon.stub(window.customElements, 'define');
  stub.callsFake((str, ctor) => {
    if (map.get(str)) {
      return;
    }

    // Assign it a random string so it doesn't pollute globally.
    const randomTagName = str + '-' + counter.toString();
    counter++;
    stub.wrappedMethod.apply(window.customElements, [randomTagName, ctor]);
    map.set(str, ctor);
  });
}

beforeEach(() => {
  Sinon.restore();
  stubCustomElements();
});

// This looks funky here. This grabs all of our components and tests for side effects.
// We "abuse" mocha and dynamically define tests.
before(async () => {
  const metadata = JSON.parse(await getMetadata()) as Record<string, unknown>;

  const tagNames: string[] = [];

  const relevantMetadata: { tagName: string; path: string }[] = getAllComponents(metadata).map(
    (component: { tagName: string; path: string }) => {
      const { tagName, path } = component;
      tagNames.push(tagName);

      return { tagName, path };
    },
  );

  relevantMetadata.forEach(({ tagName, path }) => {
    it(`Should not register any components: ${tagName}`, async () => {
      await import('../../dist-cdn/' + path);

      // Need to make sure we remove the current tag from the tagNames and *then* see whats been registered.
      const registeredTags = tagNames.filter(tag => tag !== tagName && Boolean(window.customElements.get(tag)));

      const errorMessage =
        `Expected ${path} to not register any tags, but it registered the following tags: ` +
        registeredTags.map(tag => tag).join(', ');
      expect(registeredTags.length).to.equal(0, errorMessage);
    });
  });
});
