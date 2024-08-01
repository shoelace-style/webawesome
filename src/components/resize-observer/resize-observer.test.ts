import { clientFixture, hydratedFixture } from '../../internal/test/fixture.js';
import { expect } from '@open-wc/testing';
import { html } from "lit"

describe('<wa-resize-observer>', () => {
  for (const fixture of [clientFixture, hydratedFixture]) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should be accessible', async () => {

        const el = await fixture(html`<wa-resize-observer>
          <div>Resize this box and watch the console 👉</div>
        </wa-resize-observer>`)

        await expect(el).to.be.accessible()
      })
    })
  }
})
