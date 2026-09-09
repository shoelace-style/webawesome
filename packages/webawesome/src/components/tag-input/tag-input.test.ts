import { aTimeout, expect, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import { serialize } from '../../utilities/form.js';
import type WaTag from '../tag/tag.js';
import type WaTagInput from './tag-input.js';

function getInput(el: WaTagInput) {
  return el.shadowRoot!.querySelector<HTMLInputElement>('[part~="input"]')!;
}

function getTags(el: WaTagInput) {
  return [...el.shadowRoot!.querySelectorAll<WaTag>('[part~="tag"]')];
}

function getTagTexts(el: WaTagInput) {
  return getTags(el).map(tag => tag.textContent?.trim());
}

function getClearButton(el: WaTagInput) {
  return el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="clear-button"]');
}

async function type(el: WaTagInput, text: string) {
  el.focus();
  await sendKeys({ type: text });
  await el.updateComplete;
}

async function press(el: WaTagInput, key: string) {
  await sendKeys({ press: key });
  await el.updateComplete;
  // Tag additions and removals emit after updateComplete, so give them a tick to settle
  await aTimeout(0);
}

function paste(el: WaTagInput, text: string) {
  const clipboardData = new DataTransfer();
  clipboardData.setData('text/plain', text);
  getInput(el).dispatchEvent(
    new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true, composed: true }),
  );
}

// Firefox ignores the clipboardData passed to the ClipboardEvent constructor and dispatches an empty, protected
// DataTransfer instead, so a synthetic paste can't carry text there. Paste tests skip when that's the case.
function supportsSyntheticPaste() {
  const clipboardData = new DataTransfer();
  clipboardData.setData('text/plain', 'probe');
  const event = new ClipboardEvent('paste', { clipboardData });
  return event.clipboardData?.getData('text/plain') === 'probe';
}

// clickOnElement() only rounds the center position, and sendMouse() rejects fractional coordinates
async function clickAt(el: Element, xFraction: number) {
  const { x, y, width, height } = el.getBoundingClientRect();
  await sendMouse({
    type: 'click',
    position: [Math.round(x + window.pageXOffset + width * xFraction), Math.round(y + window.pageYOffset + height / 2)],
  });
}

describe('<wa-tag-input>', () => {
  runFormControlBaseTests('wa-tag-input');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input label="Tags"></wa-tag-input>`);
          await expect(el).to.be.accessible();
        });

        it('should pass accessibility tests with tags', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input label="Tags" value="Red, Green"></wa-tag-input>`);
          await expect(el).to.be.accessible();

          const list = el.shadowRoot!.querySelector('[part~="tags"]')!;
          expect(list.getAttribute('role')).to.equal('list');
          expect(getTags(el).every(tag => tag.getAttribute('role') === 'listitem')).to.equal(true);
        });

        it('should describe how to remove a focused tag', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input label="Tags" value="Red, Green"></wa-tag-input>`);
          const [tag] = getTags(el);
          const helpId = tag.getAttribute('aria-describedby')!;
          const help = el.shadowRoot!.getElementById(helpId)!;

          expect(helpId).to.not.equal(null);
          expect(help.textContent?.trim()).to.equal('Press Backspace or Delete to remove this tag.');
        });

        it('should not describe removal when readonly', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input label="Tags" value="Red" readonly></wa-tag-input>`);
          const [tag] = getTags(el);

          expect(tag.hasAttribute('aria-describedby')).to.equal(false);
        });

        it('should focus the text box when clicking on the label', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input label="Tags"></wa-tag-input>`);
          const label = el.shadowRoot!.querySelector<HTMLLabelElement>('[part~="form-control-label"]')!;
          const focusHandler = sinon.spy();

          el.addEventListener('focus', focusHandler);
          label.click();
          await waitUntil(() => focusHandler.calledOnce);

          expect(focusHandler).to.have.been.calledOnce;
          expect(el.shadowRoot!.activeElement).to.equal(getInput(el));
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          expect(el.value).to.deep.equal([]);
          expect(el.defaultValue).to.equal(null);
          expect(el.inputValue).to.equal('');
          expect(el.delimiter).to.equal(',');
          expect(el.maxTags).to.equal(undefined);
          expect(el.minTags).to.equal(undefined);
          expect(el.allowDuplicates).to.equal(false);
          expect(el.withClear).to.equal(false);
          expect(el.appearance).to.equal('outlined');
          expect(el.size).to.equal('m');
          expect(el.pill).to.equal(false);
          expect(el.disabled).to.equal(false);
          expect(el.readonly).to.equal(false);
          expect(el.required).to.equal(false);
          expect(el.label).to.equal('');
          expect(el.hint).to.equal('');
          expect(el.placeholder).to.equal('');
          expect(el.name).to.equal(null);
        });

        it('should not reflect a value attribute when none was set', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          expect(el.hasAttribute('value')).to.equal(false);
        });

        it('should render the label from the attribute and the slot', async () => {
          const withAttribute = await fixture<WaTagInput>(html`<wa-tag-input label="Tags"></wa-tag-input>`);
          const withSlot = await fixture<WaTagInput>(html`<wa-tag-input><span slot="label">Tags</span></wa-tag-input>`);
          const withoutLabel = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          expect(
            withAttribute.shadowRoot!.querySelector('[part~="form-control-label"]')!.classList.contains('has-label'),
          ).to.equal(true);
          expect(
            withSlot.shadowRoot!.querySelector('[part~="form-control-label"]')!.classList.contains('has-label'),
          ).to.equal(true);
          expect(
            withoutLabel.shadowRoot!.querySelector('[part~="form-control-label"]')!.classList.contains('has-label'),
          ).to.equal(false);
        });

        it('should render the hint from the attribute and the slot', async () => {
          const withAttribute = await fixture<WaTagInput>(html`<wa-tag-input hint="Some hint"></wa-tag-input>`);
          const withSlot = await fixture<WaTagInput>(
            html`<wa-tag-input><span slot="hint">Slotted hint</span></wa-tag-input>`,
          );

          expect(withAttribute.shadowRoot!.querySelector('[part~="hint"]')!.textContent).to.contain('Some hint');
          expect(withSlot.shadowRoot!.querySelector('[part~="hint"]')!.classList.contains('has-slotted')).to.equal(
            true,
          );
        });

        it('should pass the placeholder to the text box', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input placeholder="Add a tag"></wa-tag-input>`);
          expect(getInput(el).placeholder).to.equal('Add a tag');
        });

        it('should disable the text box when disabled', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a" disabled></wa-tag-input>`);
          expect(getInput(el).disabled).to.equal(true);
        });

        it('should make the text box readonly and hide remove buttons when readonly', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b" readonly></wa-tag-input>`);
          expect(getInput(el).readOnly).to.equal(true);
          expect(getTags(el).every(tag => !tag.hasAttribute('with-remove'))).to.equal(true);
          expect(el.customStates.has('readonly')).to.equal(true);
        });

        it('should show remove buttons on tags when not readonly', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b"></wa-tag-input>`);
          expect(getTags(el).every(tag => tag.hasAttribute('with-remove'))).to.equal(true);
        });

        it('should reflect size, appearance, and pill and pass size and pill to the tags', async () => {
          const el = await fixture<WaTagInput>(
            html`<wa-tag-input value="a" size="l" appearance="filled" pill></wa-tag-input>`,
          );

          expect(el.getAttribute('size')).to.equal('l');
          expect(el.getAttribute('appearance')).to.equal('filled');
          expect(el.hasAttribute('pill')).to.equal(true);

          const [tag] = getTags(el);
          expect(tag.getAttribute('size')).to.equal('l');
          expect(tag.hasAttribute('pill')).to.equal(true);
        });

        it('should inset tags evenly when there are no start or end decorations', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);
          const box = el.shadowRoot!.querySelector<HTMLElement>('[part~="tag-input"]')!;
          const start = el.shadowRoot!.querySelector<HTMLElement>('[part~="start"]')!;
          const end = el.shadowRoot!.querySelector<HTMLElement>('[part~="end"]')!;
          const [tag] = getTags(el);
          const boxRect = box.getBoundingClientRect();
          const tagRect = tag.getBoundingClientRect();
          const borderWidth = parseFloat(getComputedStyle(box).borderTopWidth);
          const blockInset = tagRect.top - boxRect.top - borderWidth;
          const inlineInset = tagRect.left - boxRect.left - borderWidth;

          expect(getComputedStyle(start).display).to.equal('none');
          expect(getComputedStyle(end).display).to.equal('none');
          expect(Math.abs(inlineInset - blockInset)).to.be.lessThan(1);
        });

        it('should show the start and end slots only when they have content', async () => {
          const el = await fixture<WaTagInput>(
            html`<wa-tag-input value="a"><wa-icon slot="start" name="envelope"></wa-icon></wa-tag-input>`,
          );
          const start = el.shadowRoot!.querySelector<HTMLElement>('[part~="start"]')!;
          const end = el.shadowRoot!.querySelector<HTMLElement>('[part~="end"]')!;

          expect(getComputedStyle(start).display).to.not.equal('none');
          expect(getComputedStyle(end).display).to.equal('none');
        });
      });

      describe('value', () => {
        it('should parse the value attribute into tags', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="Red, Green, Blue"></wa-tag-input>`);
          expect(el.value).to.deep.equal(['Red', 'Green', 'Blue']);
          expect(getTagTexts(el)).to.deep.equal(['Red', 'Green', 'Blue']);
        });

        it('should trim whitespace and drop empty segments', async () => {
          const padded = await fixture<WaTagInput>(html`<wa-tag-input value="  one ,  two  , three  "></wa-tag-input>`);
          const empties = await fixture<WaTagInput>(html`<wa-tag-input value="one,,two,"></wa-tag-input>`);

          expect(padded.value).to.deep.equal(['one', 'two', 'three']);
          expect(empties.value).to.deep.equal(['one', 'two']);
        });

        it('should parse a custom delimiter regardless of attribute order', async () => {
          const before = await fixture<WaTagInput>(html`<wa-tag-input delimiter=";" value="a;b"></wa-tag-input>`);
          const after = await fixture<WaTagInput>(html`<wa-tag-input value="a;b" delimiter=";"></wa-tag-input>`);
          const multi = await fixture<WaTagInput>(html`<wa-tag-input delimiter=",;" value="a;b,c"></wa-tag-input>`);

          expect(before.value).to.deep.equal(['a', 'b']);
          expect(after.value).to.deep.equal(['a', 'b']);
          expect(multi.value).to.deep.equal(['a', 'b', 'c']);
        });

        it('should fall back to commas when parsing the value attribute with an empty delimiter', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input delimiter="" value="a, b"></wa-tag-input>`);
          expect(el.value).to.deep.equal(['a', 'b']);
        });

        it('should render tags when the value property is set to an array', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          el.value = ['x', 'y'];
          await el.updateComplete;

          expect(getTagTexts(el)).to.deep.equal(['x', 'y']);
        });

        it('should accept a delimited string when the value property is set', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          el.value = 'x, y';
          await el.updateComplete;

          expect(el.value).to.deep.equal(['x', 'y']);
        });

        it('should return a copy of the value that does not share state with the control', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          const given = ['x', 'y'];

          el.value = given;
          given.push('z');
          await el.updateComplete;
          expect(el.value).to.deep.equal(['x', 'y']);

          const returned = el.value;
          returned.push('z');
          expect(el.value).to.deep.equal(['x', 'y']);
        });

        it('should not emit input or change when the value is set programmatically', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          el.addEventListener('input', () => expect.fail('input should not be emitted'));
          el.addEventListener('change', () => expect.fail('change should not be emitted'));
          el.value = ['a'];

          await el.updateComplete;
          await aTimeout(10);
        });

        it('should toggle the blank custom state', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          expect(el.customStates.has('blank')).to.equal(true);

          el.value = ['a'];
          await el.updateComplete;
          expect(el.customStates.has('blank')).to.equal(false);
        });
      });

      describe('adding tags', () => {
        it('should add the typed text as a tag on Enter and clear the text box', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          await type(el, 'hello');
          expect(el.inputValue).to.equal('hello');

          await press(el, 'Enter');
          expect(el.value).to.deep.equal(['hello']);
          expect(el.inputValue).to.equal('');
          expect(getInput(el).value).to.equal('');
          expect(getTagTexts(el)).to.deep.equal(['hello']);
        });

        it('should submit the form on Enter when the text box is empty', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-tag-input name="tags"></wa-tag-input>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);
          const el = form.querySelector<WaTagInput>('wa-tag-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          el.focus();
          await press(el, 'Enter');
          await waitUntil(() => submitHandler.calledOnce);

          expect(submitHandler).to.have.been.calledOnce;
        });

        it('should not submit the form on Enter when the text box has text', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-tag-input name="tags"></wa-tag-input>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);
          const el = form.querySelector<WaTagInput>('wa-tag-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', submitHandler);
          await type(el, 'hello');
          await press(el, 'Enter');
          await aTimeout(100);

          expect(submitHandler).to.not.have.been.called;
          expect(el.value).to.deep.equal(['hello']);
        });

        it('should add a tag when a delimiter is typed and keep the remainder', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          await type(el, 'a,b');
          await aTimeout(0);

          expect(el.value).to.deep.equal(['a']);
          expect(el.inputValue).to.equal('b');
          expect(getInput(el).value).to.equal('b');
        });

        it('should support a custom delimiter when typing', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input delimiter=" "></wa-tag-input>`);

          await type(el, 'one two');
          await aTimeout(0);

          expect(el.value).to.deep.equal(['one']);
          expect(el.inputValue).to.equal('two');
        });

        it('should only add tags on Enter when the delimiter is empty', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input delimiter=""></wa-tag-input>`);

          await type(el, 'a,b');
          expect(el.value).to.deep.equal([]);
          expect(el.inputValue).to.equal('a,b');

          await press(el, 'Enter');
          expect(el.value).to.deep.equal(['a,b']);
        });

        it('should split pasted text on delimiters into tags', async function () {
          if (!supportsSyntheticPaste()) this.skip();
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          el.focus();
          paste(el, 'a, b,c');
          await el.updateComplete;
          await aTimeout(0);

          expect(el.value).to.deep.equal(['a', 'b', 'c']);
          expect(el.inputValue).to.equal('');
        });

        it('should combine pasted text with the text already in the text box', async function () {
          if (!supportsSyntheticPaste()) this.skip();
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          await type(el, 'ab');
          paste(el, 'c,d');
          await el.updateComplete;
          await aTimeout(0);

          expect(el.value).to.deep.equal(['abc', 'd']);
        });

        it('should leave pasted text without a delimiter to the browser', async function () {
          if (!supportsSyntheticPaste()) this.skip();
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          const pasteHandler = sinon.spy();

          getInput(el).addEventListener('paste', pasteHandler);
          el.focus();
          paste(el, 'plain');
          await el.updateComplete;

          expect(pasteHandler.firstCall.args[0].defaultPrevented).to.equal(false);
          expect(el.value).to.deep.equal([]);
        });

        it('should add the pending text as a tag on blur', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          await type(el, 'hello');
          el.blur();
          await el.updateComplete;
          await aTimeout(0);

          expect(el.value).to.deep.equal(['hello']);
          expect(el.inputValue).to.equal('');
        });

        it('should clear rejected text on blur without adding a tag', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="hello"></wa-tag-input>`);

          await type(el, 'hello');
          el.blur();
          await el.updateComplete;
          await aTimeout(0);

          expect(el.value).to.deep.equal(['hello']);
          expect(el.inputValue).to.equal('');
        });

        it('should reject duplicates by default and keep the text in the text box', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);

          await type(el, 'a');
          await press(el, 'Enter');

          expect(el.value).to.deep.equal(['a']);
          expect(el.inputValue).to.equal('a');
        });

        it('should allow duplicates with allow-duplicates', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a" allow-duplicates></wa-tag-input>`);

          await type(el, 'a');
          await press(el, 'Enter');

          expect(el.value).to.deep.equal(['a', 'a']);
        });

        it('should ignore additions beyond max-tags and make the text box readonly at the limit', async () => {
          const el = await fixture<WaTagInput>(
            html`<wa-tag-input max-tags="2" value="a" placeholder="Add"></wa-tag-input>`,
          );

          expect(getInput(el).readOnly).to.equal(false);
          expect(getInput(el).placeholder).to.equal('Add');

          await type(el, 'b');
          await press(el, 'Enter');
          expect(el.value).to.deep.equal(['a', 'b']);
          expect(getInput(el).readOnly).to.equal(true);
          expect(getInput(el).hasAttribute('placeholder')).to.equal(false);

          el.value = ['a', 'b', 'c'];
          await el.updateComplete;
          expect(el.value).to.deep.equal(['a', 'b', 'c']);

          // The readonly text box rejects typing at the limit, so nothing can be added
          el.value = ['a', 'b'];
          await el.updateComplete;
          await type(el, 'c');
          await press(el, 'Enter');
          expect(el.value).to.deep.equal(['a', 'b']);
          expect(el.inputValue).to.equal('');
        });

        it('should still remove tags with Backspace at max-tags', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input max-tags="2" value="a, b"></wa-tag-input>`);

          el.focus();
          await press(el, 'Backspace');

          expect(el.value).to.deep.equal(['a']);
          expect(getInput(el).readOnly).to.equal(false);
        });

        it('should never add empty or whitespace-only tags', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          await type(el, '   ');
          await press(el, 'Enter');
          expect(el.value).to.deep.equal([]);

          await sendKeys({ press: 'Backspace' });
          await sendKeys({ press: 'Backspace' });
          await sendKeys({ press: 'Backspace' });
          await type(el, ',');
          await aTimeout(0);
          expect(el.value).to.deep.equal([]);
          expect(el.inputValue).to.equal('');
        });

        it('should emit wa-create with the pending text and allow it to be canceled', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          const createHandler = sinon.spy((event: CustomEvent) => {
            if (event.detail.inputValue === 'no') {
              event.preventDefault();
            }
          });

          el.addEventListener('wa-create', createHandler);

          await type(el, 'no');
          await press(el, 'Enter');
          expect(createHandler).to.have.been.calledOnce;
          expect(createHandler.firstCall.args[0].detail).to.deep.equal({ inputValue: 'no' });
          expect(el.value).to.deep.equal([]);
          expect(el.inputValue).to.equal('no');

          await sendKeys({ press: 'Backspace' });
          await sendKeys({ press: 'Backspace' });
          await type(el, 'yes');
          await press(el, 'Enter');
          expect(createHandler).to.have.been.calledTwice;
          expect(el.value).to.deep.equal(['yes']);
        });

        it('should not emit wa-create for programmatic value changes', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          const createHandler = sinon.spy();

          el.addEventListener('wa-create', createHandler);
          el.value = ['a'];
          await el.updateComplete;

          expect(createHandler).to.not.have.been.called;
        });
      });

      describe('removing tags', () => {
        it('should remove the last tag on Backspace when the text box is empty', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b"></wa-tag-input>`);

          el.focus();
          await press(el, 'Backspace');

          expect(el.value).to.deep.equal(['a']);
          expect(el.shadowRoot!.activeElement).to.equal(getInput(el));
        });

        it('should only edit text on Backspace when the text box has text', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);

          await type(el, 'xy');
          await press(el, 'Backspace');

          expect(el.value).to.deep.equal(['a']);
          expect(el.inputValue).to.equal('x');
        });

        it('should remove a tag when its remove button is clicked and refocus the text box', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b, c"></wa-tag-input>`);
          const [, second] = getTags(el);
          const removeButton = second.shadowRoot!.querySelector<HTMLElement>('[part~="remove-button"]')!;

          await clickOnElement(removeButton, 'center', 1, 1);
          await el.updateComplete;
          await aTimeout(0);

          expect(el.value).to.deep.equal(['a', 'c']);
          expect(getTagTexts(el)).to.deep.equal(['a', 'c']);
          expect(el.shadowRoot!.activeElement).to.equal(getInput(el));
        });

        it('should not leak wa-remove from the inner tags', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);
          const removeHandler = sinon.spy();
          const [tag] = getTags(el);
          const removeButton = tag.shadowRoot!.querySelector<HTMLElement>('[part~="remove-button"]')!;

          el.addEventListener('wa-remove', removeHandler);
          removeButton.click();
          await el.updateComplete;
          await aTimeout(0);

          expect(removeHandler).to.not.have.been.called;
          expect(el.value).to.deep.equal([]);
        });

        it('should not remove tags when disabled', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b" disabled></wa-tag-input>`);
          const [tag] = getTags(el);
          const removeButton = tag.shadowRoot!.querySelector<HTMLElement>('[part~="remove-button"]')!;

          removeButton.click();
          await el.updateComplete;
          await aTimeout(0);

          expect(el.value).to.deep.equal(['a', 'b']);
        });

        it('should not remove tags with Backspace when readonly', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b" readonly></wa-tag-input>`);

          el.focus();
          await press(el, 'Backspace');

          expect(el.value).to.deep.equal(['a', 'b']);
        });
      });

      describe('keyboard navigation', () => {
        it('should focus the last tag on ArrowLeft from an empty text box', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b"></wa-tag-input>`);
          const tags = getTags(el);

          el.focus();
          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[1]);

          expect(el.shadowRoot!.activeElement).to.equal(tags[1]);
          expect(tags[1].classList.contains('tag--focused')).to.equal(true);
        });

        it('should not leave the text box on ArrowLeft when it has text', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);

          await type(el, 'x');
          await press(el, 'ArrowLeft');
          await press(el, 'ArrowLeft');

          expect(el.shadowRoot!.activeElement).to.equal(getInput(el));
        });

        it('should move between tags with the arrow keys, Home, and End', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b, c"></wa-tag-input>`);
          const tags = getTags(el);
          const input = getInput(el);

          el.focus();
          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[2]);

          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[1]);

          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[0]);

          // Stops at the first tag
          await press(el, 'ArrowLeft');
          await aTimeout(10);
          expect(el.shadowRoot!.activeElement).to.equal(tags[0]);

          await press(el, 'ArrowRight');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[1]);

          await press(el, 'End');
          await waitUntil(() => el.shadowRoot!.activeElement === input);

          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[2]);

          await press(el, 'Home');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[0]);

          // ArrowRight from the last tag returns to the text box
          await press(el, 'End');
          await waitUntil(() => el.shadowRoot!.activeElement === input);
          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[2]);
          await press(el, 'ArrowRight');
          await waitUntil(() => el.shadowRoot!.activeElement === input);
        });

        it('should remove a focused tag with Backspace and focus the previous tag', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b, c"></wa-tag-input>`);
          const tags = getTags(el);

          el.focus();
          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[2]);

          await press(el, 'Backspace');
          expect(el.value).to.deep.equal(['a', 'b']);
          await waitUntil(() => el.shadowRoot!.activeElement === getTags(el)[1]);
          expect(getTags(el)[1].textContent?.trim()).to.equal('b');
        });

        it('should focus the text box when the only tag is removed with Backspace', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);
          const tags = getTags(el);

          el.focus();
          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[0]);

          await press(el, 'Backspace');
          expect(el.value).to.deep.equal([]);
          await waitUntil(() => el.shadowRoot!.activeElement === getInput(el));
        });

        it('should remove a focused tag with Delete and focus the next tag', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b, c"></wa-tag-input>`);
          const tags = getTags(el);

          el.focus();
          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[2]);
          await press(el, 'Home');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[0]);

          await press(el, 'Delete');
          expect(el.value).to.deep.equal(['b', 'c']);
          await waitUntil(() => el.shadowRoot!.activeElement === getTags(el)[0]);
          expect(getTags(el)[0].textContent?.trim()).to.equal('b');
        });

        it('should focus the text box on Escape from a focused tag', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);
          const tags = getTags(el);

          el.focus();
          await press(el, 'ArrowLeft');
          await waitUntil(() => el.shadowRoot!.activeElement === tags[0]);

          await press(el, 'Escape');
          await waitUntil(() => el.shadowRoot!.activeElement === getInput(el));
        });

        it('should do nothing on tag keys when readonly', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b" readonly></wa-tag-input>`);
          const tags = getTags(el);

          tags[1].focus();
          await press(el, 'Backspace');
          await press(el, 'Delete');

          expect(el.value).to.deep.equal(['a', 'b']);
        });

        it('should clear typed text on Escape and emit input', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          await type(el, 'abc');
          await expectEvent(el, 'input', () => press(el, 'Escape'));

          expect(el.inputValue).to.equal('');
          expect(getInput(el).value).to.equal('');
        });

        it('should not emit input on Escape when the text box is empty', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          const inputHandler = sinon.spy();

          el.addEventListener('input', inputHandler);
          el.focus();
          await press(el, 'Escape');

          expect(inputHandler).to.not.have.been.called;
        });
      });

      describe('events', () => {
        it('should emit input for every keystroke', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          const inputHandler = sinon.spy();

          el.addEventListener('input', inputHandler);
          await type(el, 'abc');

          expect(inputHandler).to.have.been.calledThrice;
        });

        it('should not emit change while typing', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          const changeHandler = sinon.spy();

          el.addEventListener('change', changeHandler);
          await type(el, 'abc');
          await aTimeout(10);

          expect(changeHandler).to.not.have.been.called;
        });

        it('should emit input and change once when a tag is added', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          await type(el, 'abc');
          await expectEvent(el, ['input', 'change'], () => press(el, 'Enter'));
        });

        it('should emit input and change once when a tag is removed', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);

          el.focus();
          await expectEvent(el, ['input', 'change'], () => press(el, 'Backspace'));
        });

        it('should emit wa-clear, input, and change when cleared', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b" with-clear></wa-tag-input>`);

          await expectEvent(el, ['wa-clear', 'input', 'change'], () => getClearButton(el)!.click());
          expect(el.value).to.deep.equal([]);
        });

        it('should emit wa-invalid on reportValidity() when required and empty', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input required></wa-tag-input>`);

          await expectEvent(el, 'wa-invalid', () => {
            el.reportValidity();
          });

          await clickOnElement(document.body);
          await aTimeout(100);
        });
      });

      describe('clearable', () => {
        it('should only show the clear button with with-clear and at least one tag', async () => {
          const noAttribute = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);
          const noTags = await fixture<WaTagInput>(html`<wa-tag-input with-clear></wa-tag-input>`);
          const withTags = await fixture<WaTagInput>(html`<wa-tag-input value="a" with-clear></wa-tag-input>`);

          expect(getClearButton(noAttribute)).to.equal(null);
          expect(getClearButton(noTags)).to.equal(null);
          expect(getClearButton(withTags)).to.not.equal(null);
        });

        it('should hide the clear button when disabled or readonly', async () => {
          const disabled = await fixture<WaTagInput>(html`<wa-tag-input value="a" with-clear disabled></wa-tag-input>`);
          const readonly = await fixture<WaTagInput>(html`<wa-tag-input value="a" with-clear readonly></wa-tag-input>`);

          expect(getClearButton(disabled)).to.equal(null);
          expect(getClearButton(readonly)).to.equal(null);
        });

        it('should clear all tags and keep focus on the text box', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b" with-clear></wa-tag-input>`);

          await type(el, 'pending');
          await clickOnElement(getClearButton(el)!);
          await el.updateComplete;
          await aTimeout(0);

          expect(el.value).to.deep.equal([]);
          expect(el.inputValue).to.equal('');
          expect(getClearButton(el)).to.equal(null);
          expect(el.shadowRoot!.activeElement).to.equal(getInput(el));
        });
      });

      describe('forms', () => {
        it('should serialize one entry per tag with FormData and JSON', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-tag-input name="tags" value="a, b"></wa-tag-input></form>`,
          );

          expect(new FormData(form).getAll('tags')).to.deep.equal(['a', 'b']);
          expect((serialize(form) as { tags: string[] }).tags).to.deep.equal(['a', 'b']);
        });

        it('should update the form value as tags are added and removed', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-tag-input name="tags" value="a, b"></wa-tag-input></form>`,
          );
          const el = form.querySelector<WaTagInput>('wa-tag-input')!;

          await type(el, 'c');
          await press(el, 'Enter');
          expect(new FormData(form).getAll('tags')).to.deep.equal(['a', 'b', 'c']);

          el.value = [];
          await el.updateComplete;
          expect(new FormData(form).getAll('tags')).to.deep.equal([]);
        });

        it('should submit nothing when disabled', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form><wa-tag-input name="tags" value="a, b" disabled></wa-tag-input></form>`,
          );

          expect(new FormData(form).getAll('tags')).to.deep.equal([]);
        });

        it('should submit nothing inside a disabled fieldset', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <fieldset disabled><wa-tag-input name="tags" value="a, b"></wa-tag-input></fieldset>
            </form>
          `);
          const el = form.querySelector<WaTagInput>('wa-tag-input')!;
          await el.updateComplete;

          expect(new FormData(form).getAll('tags')).to.deep.equal([]);
        });

        it('should associate with a form via the form attribute', async () => {
          const el = await fixture<HTMLElement>(html`
            <div>
              <form id="f"></form>
              <wa-tag-input form="f" name="tags" value="a"></wa-tag-input>
            </div>
          `);
          const form = el.querySelector<HTMLFormElement>('form')!;

          expect(new FormData(form).getAll('tags')).to.deep.equal(['a']);
        });

        it('should reset to the initial value and clear the text box', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-tag-input name="tags" value="a"></wa-tag-input>
              <wa-button type="reset">Reset</wa-button>
            </form>
          `);
          const button = form.querySelector('wa-button')!;
          const el = form.querySelector<WaTagInput>('wa-tag-input')!;

          await type(el, 'b');
          await press(el, 'Enter');
          await type(el, 'pending');
          expect(el.value).to.deep.equal(['a', 'b']);
          expect(el.hasInteracted).to.equal(true);

          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          // The reset event fires before the browser resets the form's controls, so wait a task for that to finish
          await aTimeout(0);
          await el.updateComplete;

          expect(el.value).to.deep.equal(['a']);
          expect(el.inputValue).to.equal('');
          expect(getInput(el).value).to.equal('');
          expect(el.hasInteracted).to.equal(false);
          expect(new FormData(form).getAll('tags')).to.deep.equal(['a']);

          el.defaultValue = '';
          setTimeout(() => button.click());
          await oneEvent(form, 'reset');
          await aTimeout(0);
          await el.updateComplete;

          expect(el.value).to.deep.equal([]);
        });

        it('should block submission when required and empty', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-tag-input name="tags" required></wa-tag-input>
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);
          const el = form.querySelector<WaTagInput>('wa-tag-input')!;
          const submitHandler = sinon.spy((event: SubmitEvent) => event.preventDefault());
          const invalidHandler = sinon.spy();

          form.addEventListener('submit', submitHandler);
          el.addEventListener('wa-invalid', invalidHandler);
          form.requestSubmit();
          await aTimeout(100);

          expect(submitHandler).to.not.have.been.called;
          expect(invalidHandler).to.have.been.calledOnce;

          await clickOnElement(document.body);
          await aTimeout(100);
        });
      });

      describe('validation', () => {
        it('should be valid when empty and not required', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          expect(el.checkValidity()).to.equal(true);
        });

        it('should be invalid when required and empty', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input required></wa-tag-input>`);

          expect(el.checkValidity()).to.equal(false);
          expect(el.validity.valueMissing).to.equal(true);
          expect(el.validationMessage).to.not.equal('');

          el.value = ['a'];
          await el.updateComplete;
          expect(el.checkValidity()).to.equal(true);
        });

        it('should enforce min-tags only when there is at least one tag', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input min-tags="2"></wa-tag-input>`);
          expect(el.checkValidity()).to.equal(true);

          el.value = ['a'];
          await el.updateComplete;
          expect(el.checkValidity()).to.equal(false);
          expect(el.validity.rangeUnderflow).to.equal(true);
          expect(el.validationMessage).to.contain('2');

          el.value = ['a', 'b'];
          await el.updateComplete;
          expect(el.checkValidity()).to.equal(true);
        });

        it('should report rangeOverflow when the value exceeds max-tags', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input max-tags="2"></wa-tag-input>`);

          el.value = ['a', 'b', 'c'];
          await el.updateComplete;

          expect(el.checkValidity()).to.equal(false);
          expect(el.validity.rangeOverflow).to.equal(true);
          expect(el.validationMessage).to.contain('2');
        });

        it('should support setCustomValidity()', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);

          el.setCustomValidity('x');
          expect(el.checkValidity()).to.equal(false);
          expect(el.validationMessage).to.equal('x');

          el.setCustomValidity('');
          expect(el.checkValidity()).to.equal(true);
        });

        it('should only set user-invalid and user-valid after interaction', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input required></wa-tag-input>`);

          expect(el.customStates.has('invalid')).to.equal(true);
          expect(el.customStates.has('user-invalid')).to.equal(false);

          await type(el, 'a');
          await press(el, 'Enter');
          expect(el.customStates.has('user-valid')).to.equal(true);
          expect(el.customStates.has('user-invalid')).to.equal(false);

          el.focus();
          await press(el, 'Backspace');
          expect(el.customStates.has('user-invalid')).to.equal(true);
        });
      });

      describe('announcements', () => {
        it('should announce additions and removals in a live region', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);

          await type(el, 'hello');
          await press(el, 'Enter');

          const log = document.body.querySelector('[role="log"][aria-live="polite"]')!;
          expect(log).to.not.equal(null);
          expect(log.textContent).to.contain('hello added');

          await press(el, 'Backspace');
          expect(log.textContent).to.contain('hello removed');
        });

        it('should announce when a duplicate is rejected', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="hello"></wa-tag-input>`);

          await type(el, 'hello');
          await press(el, 'Enter');

          const log = document.body.querySelector('[role="log"][aria-live="polite"]')!;
          expect(log.textContent).to.contain('hello is already added');
          expect(getTagTexts(el)).to.deep.equal(['hello']);
        });

        it('should announce when all tags are cleared', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b" with-clear></wa-tag-input>`);

          getClearButton(el)!.click();
          await el.updateComplete;

          const log = document.body.querySelector('[role="log"][aria-live="polite"]')!;
          expect(log.textContent).to.contain('All tags removed');
          expect(getTagTexts(el)).to.deep.equal([]);
        });
      });

      describe('focus', () => {
        it('should focus and blur the text box with focus() and blur()', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input></wa-tag-input>`);
          const focusHandler = sinon.spy();
          const blurHandler = sinon.spy();

          el.addEventListener('focus', focusHandler);
          el.addEventListener('blur', blurHandler);

          el.focus();
          await waitUntil(() => focusHandler.calledOnce);
          expect(el.shadowRoot!.activeElement).to.equal(getInput(el));

          el.blur();
          await waitUntil(() => blurHandler.calledOnce);
          expect(el.shadowRoot!.activeElement).to.equal(null);
        });

        it('should focus the text box when clicking the padding of the box', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a"></wa-tag-input>`);
          const wrapper = el.shadowRoot!.querySelector<HTMLElement>('[part~="tag-input"]')!;

          await clickAt(wrapper, 0.95);
          await waitUntil(() => el.shadowRoot!.activeElement === getInput(el));
        });

        it('should focus a tag when clicking on it', async () => {
          const el = await fixture<WaTagInput>(html`<wa-tag-input value="a, b"></wa-tag-input>`);
          const [first] = getTags(el);

          await clickAt(first, 0.25);
          await waitUntil(() => el.shadowRoot!.activeElement === first);
        });
      });
    });
  }
});
