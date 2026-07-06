import { expect } from '@open-wc/testing';
import { readFile } from '@web/test-runner-commands';

describe('package metadata', () => {
  it('should expose the custom elements manifest from the npm package exports', async () => {
    const packageJson = JSON.parse(await readFile({ path: '../../package.json' }));
    const customElementsPath = packageJson.customElements;

    expect(customElementsPath).to.equal('dist/custom-elements.json');
    expect(packageJson.exports).to.have.property(`./${customElementsPath}`);
  });
});
