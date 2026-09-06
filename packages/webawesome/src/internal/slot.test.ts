import { expect } from '@open-wc/testing';
import { HasSlotController } from './slot.js';

describe('HasSlotController', () => {
  it('should assume named slots are present when DOM APIs are unavailable during SSR', () => {
    const host = {
      addController() {},
    } as HasSlotController['host'];
    const controller = new HasSlotController(host, 'reference');

    expect(controller.test('reference')).to.be.true;
  });
});
