import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { expectEvent } from '../../internal/test/expect-event.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type WaButton from './button.js';

const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];

describe('<wa-button>', () => {
  runFormControlBaseTests({
    tagName: 'wa-button',
    variantName: 'type="button"',
    init: (control: WaButton) => {
      control.type = 'button';
    },
  });

  runFormControlBaseTests({
    tagName: 'wa-button',
    variantName: 'type="submit"',
    init: (control: WaButton) => {
      control.type = 'submit';
    },
  });

  runFormControlBaseTests({
    tagName: 'wa-button',
    variantName: 'href="xyz"',
    init: (control: WaButton) => {
      control.href = 'some-url';
    },
  });

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        variants.forEach(variant => {
          it(`should be accessible when variant is "${variant}"`, async () => {
            const el = await fixture<WaButton>(html` <wa-button variant="${variant}"> Button Label </wa-button> `);
            await expect(el).to.be.accessible();
          });
        });

        it('should be accessible when disabled', async () => {
          const el = await fixture<WaButton>(html` <wa-button disabled>Button Label</wa-button> `);
          await expect(el).to.be.accessible();
        });
      });

      describe('properties', () => {
        it('should have title if title attribute is set', async () => {
          const el = await fixture<WaButton>(html` <wa-button title="Test"></wa-button> `);
          const button = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="base"]')!;
          expect(button.title).to.equal('Test');
        });

        it('should render a spinner when loading', async () => {
          const el = await fixture<WaButton>(html` <wa-button loading>Button Label</wa-button> `);
          expect(el.shadowRoot!.querySelector('wa-spinner')).to.exist;
        });

        it('should render a caret when with-caret is set', async () => {
          const el = await fixture<WaButton>(html` <wa-button with-caret>Button Label</wa-button> `);
          expect(el.shadowRoot!.querySelector('[part~="caret"]')).to.exist;
        });

        it('should have correct default size', async () => {
          const el = await fixture<WaButton>(html` <wa-button>Button</wa-button> `);
          expect(el.size).to.equal('medium');
        });

        it('should reflect the size attribute', async () => {
          const el = await fixture<WaButton>(html` <wa-button size="small">Button</wa-button> `);
          expect(el.size).to.equal('small');
        });

        it('should have correct default variant', async () => {
          const el = await fixture<WaButton>(html` <wa-button>Button</wa-button> `);
          expect(el.variant).to.equal('neutral');
        });

        it('should have correct default type', async () => {
          const el = await fixture<WaButton>(html` <wa-button>Button</wa-button> `);
          expect(el.type).to.equal('button');
        });
      });

      describe('when disabled', () => {
        it('should disable the native <button> when rendering a <button>', async () => {
          const el = await fixture<WaButton>(html` <wa-button disabled>Button Label</wa-button> `);
          expect(el.shadowRoot!.querySelector('button[disabled]')).to.exist;
        });

        it('should not disable the native <a> when rendering an <a>', async () => {
          const el = await fixture<WaButton>(html` <wa-button href="some/path" disabled>Button Label</wa-button> `);
          expect(el.shadowRoot!.querySelector('a[disabled]')).not.to.exist;
        });

        it('should prevent clicks when disabled and rendering an <a>', async () => {
          const el = await fixture<WaButton>(html` <wa-button href="some/path" disabled>Button Label</wa-button> `);
          const clickHandler = sinon.spy();
          el.addEventListener('click', clickHandler);
          el.click();
          expect(clickHandler).not.to.have.been.called;
        });
      });

      describe('when href is present', () => {
        it('should render as an <a>', async () => {
          const el = await fixture<WaButton>(html` <wa-button href="some/path">Button Label</wa-button> `);
          expect(el.shadowRoot!.querySelector('a')).to.exist;
          expect(el.shadowRoot!.querySelector('button')).not.to.exist;
        });

        it('should render a link with a custom rel when provided', async () => {
          const el = await fixture<WaButton>(html`
            <wa-button href="https://example.com/" target="_blank" rel="1">Link</wa-button>
          `);
          const link = el.shadowRoot!.querySelector('a')!;
          expect(link?.getAttribute('rel')).to.equal('1');
        });
      });

      describe('events', () => {
        it('should emit focus and blur when the button is focused and blurred', async () => {
          const el = await fixture<WaButton>(html` <wa-button>Button</wa-button> `);
          const focusHandler = sinon.spy();
          const blurHandler = sinon.spy();

          el.addEventListener('focus', focusHandler);
          el.addEventListener('blur', blurHandler);

          el.focus();
          await waitUntil(() => focusHandler.calledOnce);

          el.blur();
          await waitUntil(() => blurHandler.calledOnce);

          expect(focusHandler).to.have.been.calledOnce;
          expect(blurHandler).to.have.been.calledOnce;
        });

        it('should emit a click event when calling click()', async () => {
          const el = await fixture<WaButton>(html` <wa-button></wa-button> `);
          const clickHandler = sinon.spy();

          el.addEventListener('click', clickHandler);
          el.click();
          await waitUntil(() => clickHandler.calledOnce);

          expect(clickHandler).to.have.been.calledOnce;
        });
      });

      describe('form integration', () => {
        it('should submit when the button is inside the form', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form action="" method="post">
              <wa-button type="submit">Submit</wa-button>
            </form>
          `);
          const button = form.querySelector<WaButton>('wa-button')!;
          const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', handleSubmit);
          button.click();

          expect(handleSubmit).to.have.been.calledOnce;
        });

        it('should submit when the button is outside the form and has a form attribute', async () => {
          const el = await fixture(html`
            <div>
              <form id="a" action="" method="post"></form>
              <wa-button type="submit" form="a">Submit</wa-button>
            </div>
          `);
          const form = el.querySelector<HTMLFormElement>('form')!;
          const button = el.querySelector<WaButton>('wa-button')!;
          const handleSubmit = sinon.spy((event: SubmitEvent) => event.preventDefault());

          form.addEventListener('submit', handleSubmit);
          button.click();

          expect(handleSubmit).to.have.been.calledOnce;
        });

        it('should override form attributes when formaction, formmethod, formnovalidate, and formtarget are used inside a form', async () => {
          const form = await fixture(html`
            <form id="a" action="foo" method="post" target="_self">
              <wa-button type="submit" form="a" formaction="bar" formmethod="get" formtarget="_blank" formnovalidate>
                Submit
              </wa-button>
            </form>
          `);
          const button = form.querySelector<WaButton>('wa-button')!;
          const handleSubmit = sinon.spy((event: SubmitEvent) => {
            submitter = event.submitter as HTMLButtonElement;
            event.preventDefault();
          });
          let submitter!: HTMLButtonElement;

          form.addEventListener('submit', handleSubmit);
          button.click();

          expect(handleSubmit).to.have.been.calledOnce;
          expect(submitter.formAction.endsWith('/bar')).to.be.true;
          expect(submitter.formMethod).to.equal('get');
          expect(submitter.formTarget).to.equal('_blank');
          expect(submitter.formNoValidate).to.be.true;
        });

        it('should override form attributes when formaction, formmethod, formnovalidate, and formtarget are used outside a form', async () => {
          const el = await fixture(html`
            <div>
              <form id="a" action="foo" method="post" target="_self"></form>
              <wa-button type="submit" form="a" formaction="bar" formmethod="get" formtarget="_blank" formnovalidate>
                Submit
              </wa-button>
            </div>
          `);
          const form = el.querySelector<HTMLFormElement>('form')!;
          const button = el.querySelector<WaButton>('wa-button')!;
          const handleSubmit = sinon.spy((event: SubmitEvent) => {
            submitter = event.submitter as HTMLButtonElement;
            event.preventDefault();
          });
          let submitter!: HTMLButtonElement;

          form.addEventListener('submit', handleSubmit);
          button.click();

          expect(handleSubmit).to.have.been.calledOnce;
          expect(submitter.formAction.endsWith('/bar')).to.be.true;
          expect(submitter.formMethod).to.equal('get');
          expect(submitter.formTarget).to.equal('_blank');
          expect(submitter.formNoValidate).to.be.true;
        });

        it('should only submit button name / value pair when the form is submitted', async () => {
          const form = await fixture<HTMLFormElement>(
            html`<form>
              <wa-button type="submit" name="btn-1" value="value-1">Button 1</wa-button>
              <wa-button type="submit" name="btn-2" value="value-2">Button 2</wa-button>
            </form>`,
          );

          let formData = new FormData(form);
          let submitter: null | HTMLButtonElement = document.createElement('button');

          form.addEventListener('submit', event => {
            event.preventDefault();
            formData = new FormData(form);
            submitter = event.submitter as HTMLButtonElement;
          });

          expect(formData.get('btn-1')).to.be.null;
          expect(formData.get('btn-2')).to.be.null;

          form.querySelector('wa-button')?.click();
          await aTimeout(0);

          expect(formData.get('btn-1')).to.be.null;
          expect(formData.get('btn-2')).to.be.null;

          expect(submitter.name).to.equal('btn-1');
          expect(submitter.value).to.equal('value-1');

          form.querySelectorAll('wa-button')[1]?.click();
          await aTimeout(0);

          expect(formData.get('btn-1')).to.be.null;
          expect(formData.get('btn-2')).to.be.null;

          expect(submitter.name).to.equal('btn-2');
          expect(submitter.value).to.equal('value-2');
        });
      });
    });
  }
});
