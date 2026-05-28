import { expect, fixture, html } from '@open-wc/testing';
import { LitElement, html as litHtml, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  SegmentedFieldController,
  type SegmentBounds,
  type SegmentField,
  type SegmentGroup,
  type TypeDigitResult,
} from './segmented-field-controller.js';

//
// A minimal test host
//
// We build a `<test-segments>` element that renders three numeric segments and exposes the controller along with a
// plain `{ a, b, c } | { from: ..., to: ... }` value store. The rules are simple — single-digit segments (0–9) that
// commit and advance on every keystroke, no buffering — so the tests stay focused on the controller's mechanics
// (focus, navigation, buffers, separators, RTL, …) rather than on numeric semantics.

interface SegmentValues {
  [field: string]: number | null;
}

interface HostValueStore {
  [group: string]: SegmentValues;
}

@customElement('test-segments')
class TestSegments extends LitElement {
  groups: SegmentGroup[] = ['single'];
  fields: SegmentField[] = ['a', 'b', 'c'];
  values: HostValueStore = { single: { a: null, b: null, c: null } };
  rtl = false;
  readonlyMode = false;
  disabledMode = false;
  commitLog: Array<{ group: SegmentGroup; field: SegmentField; value: unknown }> = [];

  /** Per-field digit rules — host-defined. Default: single-digit segments. */
  digitRule: (group: SegmentGroup, field: SegmentField, buffer: string, digit: string) => TypeDigitResult = (
    _g,
    _f,
    _b,
    digit,
  ) => ({ value: Number(digit), buffer: '', advance: true });

  /** Per-field bounds — defaults to 0–9. */
  boundsRule: (group: SegmentGroup, field: SegmentField) => SegmentBounds = () => ({ min: 0, max: 9 });

  /** Per-field step — defaults to ±1 with wraparound 0–9. */
  stepRule: (group: SegmentGroup, field: SegmentField, delta: -1 | 1) => { value: unknown } | null = (g, f, delta) => {
    const current = (this.values[g]?.[f] as number | null) ?? 0;
    const next = (((current + delta) % 10) + 10) % 10;
    this.values[g][f] = next;
    return { value: next };
  };

  controller = new SegmentedFieldController(this, {
    getLayout: () => ({
      tokens: [
        { kind: 'segment', field: 'a' },
        { kind: 'literal', text: ':' },
        { kind: 'segment', field: 'b' },
        { kind: 'literal', text: ':' },
        { kind: 'segment', field: 'c' },
      ],
      order: ['a', 'b', 'c'],
    }),
    isRtl: () => this.rtl,
    isReadonly: () => this.readonlyMode,
    isDisabled: () => this.disabledMode,
    rules: {
      typeDigit: (g, f, b, d) => {
        const r = this.digitRule(g, f, b, d);
        if (r.value !== null && r.buffer === '') {
          // Commit immediately for our simple single-digit rule.
          this.values[g][f] = r.value as number;
        }
        return r;
      },
      step: (g, f, delta) => this.stepRule(g, f, delta),
      bounds: (g, f) => this.boundsRule(g, f),
      commitBuffer: (g, f, buffer) => {
        const n = Number(buffer);
        if (Number.isFinite(n)) {
          this.values[g][f] = n;
          return n;
        }
        return null;
      },
      clear: (g, f) => {
        if (this.values[g][f] != null) {
          this.values[g][f] = null;
          return true;
        }
        return false;
      },
    },
    onCommit: (group, field, value) => {
      this.commitLog.push({ group, field, value });
      this.requestUpdate();
    },
  });

  protected render(): TemplateResult {
    const handlers = this.controller.eventHandlers();
    const renderGroup = (group: SegmentGroup): TemplateResult[] => {
      const out: TemplateResult[] = [];
      for (const field of this.fields) {
        const value = this.values[group]?.[field];
        const buffer = this.controller.getBuffer(group, field);
        const display = buffer || (value == null ? `_${field}_` : String(value));
        out.push(
          litHtml`<span
            data-group=${group}
            data-segment=${field}
            role="spinbutton"
            tabindex="0"
            @keydown=${handlers.keydown}
            @focus=${handlers.focus}
            @blur=${handlers.blur}
            >${display}</span
          >`,
        );
      }
      return out;
    };
    return litHtml`<div>${this.groups.flatMap(renderGroup)}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-segments': TestSegments;
  }
}

//
// Helpers
//

function getSegment(el: TestSegments, field: SegmentField, group: SegmentGroup = 'single'): HTMLElement {
  return el.shadowRoot!.querySelector<HTMLElement>(`[data-group="${group}"][data-segment="${field}"]`)!;
}

function getSegments(el: TestSegments): HTMLElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[data-segment]'));
}

function press(el: HTMLElement, key: string, modifiers: { altKey?: boolean; ctrlKey?: boolean } = {}) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true, ...modifiers }));
}

//
// Tests
//

describe('SegmentedFieldController', () => {
  describe('segmentElements / segmentElementFor', () => {
    it('returns segments in DOM order', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      const segments = el.controller.segmentElements();
      expect(segments.map(s => s.dataset.segment)).to.deep.equal(['a', 'b', 'c']);
    });

    it('locates a segment by group and field', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      const target = el.controller.segmentElementFor('single', 'b');
      expect(target).to.equal(getSegment(el, 'b'));
    });

    it('returns null for a missing segment', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      expect(el.controller.segmentElementFor('nope', 'a')).to.equal(null);
    });
  });

  describe('roving tabindex on focus', () => {
    it('sets the focused segment to tabindex=0 and the rest to -1', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      const middle = getSegment(el, 'b');
      middle.focus();
      const segments = getSegments(el);
      const tabIndices = segments.map(s => s.tabIndex);
      expect(tabIndices).to.deep.equal([-1, 0, -1]);
    });

    it('tracks the active segment for restore', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'b').focus();
      expect(el.controller.getActiveSegment()).to.deep.equal({ group: 'single', field: 'b' });
    });
  });

  describe('digit typing', () => {
    it('forwards digit keys to rules.typeDigit and notifies onCommit', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), '5');
      expect(el.values.single.a).to.equal(5);
      expect(el.commitLog.at(-1)).to.deep.equal({ group: 'single', field: 'a', value: 5 });
    });

    it('advances focus to the next segment when result.advance is true', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), '5');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'b'));
    });

    it('does not advance when result.advance is false', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.digitRule = (_g, _f, buffer, digit) => ({ value: null, buffer: buffer + digit, advance: false });
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), '1');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'a'));
      expect(el.controller.getBuffer('single', 'a')).to.equal('1');
    });

    it('writes the buffer to the controller and not to the host value', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.digitRule = (_g, _f, buffer, digit) => ({ value: null, buffer: buffer + digit, advance: false });
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), '1');
      expect(el.controller.getBuffer('single', 'a')).to.equal('1');
      expect(el.values.single.a).to.equal(null);
    });

    it('ignores digit keys in readonly mode', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.readonlyMode = true;
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), '5');
      expect(el.values.single.a).to.equal(null);
    });

    it('ignores digit keys in disabled mode', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.disabledMode = true;
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), '5');
      expect(el.values.single.a).to.equal(null);
    });
  });

  describe('stepping (Arrow Up / Down)', () => {
    it('calls rules.step on Arrow Up and notifies onCommit', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.values.single.a = 3;
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'ArrowUp');
      expect(el.values.single.a).to.equal(4);
      expect(el.commitLog.at(-1)).to.deep.equal({ group: 'single', field: 'a', value: 4 });
    });

    it('calls rules.step on Arrow Down', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.values.single.a = 3;
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'ArrowDown');
      expect(el.values.single.a).to.equal(2);
    });

    it('preventDefault on arrow keys (does not scroll the page)', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true, cancelable: true });
      getSegment(el, 'a').dispatchEvent(event);
      expect(event.defaultPrevented).to.equal(true);
    });

    it('flushes a pending buffer before stepping', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.controller.setBuffer('single', 'a', '7');
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'ArrowUp');
      // Flush wrote 7 → step wrote 8 (7+1 mod 10).
      expect(el.values.single.a).to.equal(8);
      expect(el.controller.getBuffer('single', 'a')).to.equal('');
    });

    it('skips stepping in readonly mode', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.readonlyMode = true;
      el.values.single.a = 3;
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'ArrowUp');
      expect(el.values.single.a).to.equal(3);
    });

    it('treats a null step result as a no-op (no onCommit)', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.stepRule = () => null;
      getSegment(el, 'a').focus();
      const before = el.commitLog.length;
      press(getSegment(el, 'a'), 'ArrowUp');
      expect(el.commitLog.length).to.equal(before);
    });
  });

  describe('horizontal navigation', () => {
    it('Arrow Right moves to the next segment in LTR', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'ArrowRight');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'b'));
    });

    it('Arrow Left moves to the previous segment in LTR', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'b').focus();
      press(getSegment(el, 'b'), 'ArrowLeft');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'a'));
    });

    it('Arrow Left moves to the *next* segment in RTL (logical-direction navigation)', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.rtl = true;
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'ArrowLeft');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'b'));
    });

    it('Arrow Right moves to the *previous* segment in RTL', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.rtl = true;
      getSegment(el, 'b').focus();
      press(getSegment(el, 'b'), 'ArrowRight');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'a'));
    });

    it('stops at the first segment when moving back', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'ArrowLeft');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'a'));
    });

    it('stops at the last segment when moving forward', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'c').focus();
      press(getSegment(el, 'c'), 'ArrowRight');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'c'));
    });

    it('Home jumps to the first segment', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'c').focus();
      press(getSegment(el, 'c'), 'Home');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'a'));
    });

    it('End jumps to the last segment', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'End');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'c'));
    });

    it('flushes a buffer before navigating away', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.controller.setBuffer('single', 'a', '4');
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'ArrowRight');
      expect(el.values.single.a).to.equal(4);
      expect(el.controller.getBuffer('single', 'a')).to.equal('');
    });
  });

  describe('Tab', () => {
    it('does not preventDefault (lets the browser handle the focus move)', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, composed: true, cancelable: true });
      getSegment(el, 'a').dispatchEvent(event);
      expect(event.defaultPrevented).to.equal(false);
    });

    it('flushes a pending buffer before allowing Tab to leave', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.controller.setBuffer('single', 'a', '9');
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'Tab');
      expect(el.values.single.a).to.equal(9);
      expect(el.controller.getBuffer('single', 'a')).to.equal('');
    });
  });

  describe('Backspace / Delete', () => {
    it('Backspace wipes a pending buffer without affecting the committed value', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.values.single.a = 7;
      el.controller.setBuffer('single', 'a', '4');
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'Backspace');
      expect(el.controller.getBuffer('single', 'a')).to.equal('');
      expect(el.values.single.a).to.equal(7);
    });

    it('Backspace clears a committed value when no buffer is pending', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.values.single.a = 7;
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'Backspace');
      expect(el.values.single.a).to.equal(null);
      expect(el.commitLog.at(-1)).to.deep.equal({ group: 'single', field: 'a', value: null });
    });

    it('Backspace on an already-empty segment jumps to the previous segment', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'b').focus();
      press(getSegment(el, 'b'), 'Backspace');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'a'));
    });

    it('Backspace on the first empty segment stays put', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'Backspace');
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'a'));
    });

    it('Delete clears the committed value but does not jump focus', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.values.single.b = 7;
      getSegment(el, 'b').focus();
      press(getSegment(el, 'b'), 'Delete');
      expect(el.values.single.b).to.equal(null);
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'b'));
    });

    it('Delete on an empty segment is a no-op', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'b').focus();
      const before = el.commitLog.length;
      press(getSegment(el, 'b'), 'Delete');
      expect(el.commitLog.length).to.equal(before);
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'b'));
    });

    it('Backspace is a no-op in readonly mode', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.readonlyMode = true;
      el.values.single.a = 7;
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), 'Backspace');
      expect(el.values.single.a).to.equal(7);
    });
  });

  describe('separator keys', () => {
    it('a default separator advances focus and flushes the buffer', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.controller.setBuffer('single', 'a', '5');
      getSegment(el, 'a').focus();
      press(getSegment(el, 'a'), '/');
      expect(el.values.single.a).to.equal(5);
      expect(el.shadowRoot!.activeElement).to.equal(getSegment(el, 'b'));
    });

    it('honors all default separators (/, ., -, :, comma, space)', async () => {
      for (const sep of ['/', '.', '-', ':', ',', ' ']) {
        const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
        getSegment(el, 'a').focus();
        press(getSegment(el, 'a'), sep);
        expect(el.shadowRoot!.activeElement, `separator: "${sep}"`).to.equal(getSegment(el, 'b'));
      }
    });
  });

  describe('blur', () => {
    it('flushes a pending buffer when focus leaves the segment', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.controller.setBuffer('single', 'a', '6');
      const seg = getSegment(el, 'a');
      seg.focus();
      seg.blur();
      expect(el.values.single.a).to.equal(6);
      expect(el.controller.getBuffer('single', 'a')).to.equal('');
    });
  });

  describe('flushAllBuffers / clearBuffers', () => {
    it('flushAllBuffers commits every pending buffer', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.controller.setBuffer('single', 'a', '1');
      el.controller.setBuffer('single', 'b', '2');
      el.controller.setBuffer('single', 'c', '3');
      el.controller.flushAllBuffers();
      expect(el.values.single).to.deep.equal({ a: 1, b: 2, c: 3 });
      expect(el.controller.getBuffer('single', 'a')).to.equal('');
    });

    it('clearBuffers drops every pending buffer without committing', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.controller.setBuffer('single', 'a', '1');
      el.controller.clearBuffers();
      expect(el.controller.getBuffer('single', 'a')).to.equal('');
      expect(el.values.single.a).to.equal(null);
    });
  });

  describe('findFocusableSegment', () => {
    it('returns the first empty segment when one exists', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.values.single.a = 1; // not empty
      const isEmpty = (g: SegmentGroup, f: SegmentField) => el.values[g][f] == null;
      expect(el.controller.findFocusableSegment(isEmpty)).to.equal(getSegment(el, 'b'));
    });

    it('returns the first segment when none are empty', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.values.single = { a: 1, b: 2, c: 3 };
      const isEmpty = (g: SegmentGroup, f: SegmentField) => el.values[g][f] == null;
      expect(el.controller.findFocusableSegment(isEmpty)).to.equal(getSegment(el, 'a'));
    });

    it('ignores segments that have a buffer (treats them as non-empty)', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.controller.setBuffer('single', 'a', '1');
      const isEmpty = (g: SegmentGroup, f: SegmentField) => el.values[g][f] == null;
      expect(el.controller.findFocusableSegment(isEmpty)).to.equal(getSegment(el, 'b'));
    });
  });

  describe('multi-group hosts (e.g. date range)', () => {
    it('navigates across groups in DOM order', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.groups = ['from', 'to'];
      el.values = { from: { a: null, b: null, c: null }, to: { a: null, b: null, c: null } };
      el.requestUpdate();
      await el.updateComplete;

      const segments = el.controller.segmentElements();
      // 3 fields × 2 groups = 6 segments
      expect(segments).to.have.length(6);

      const fromC = el.shadowRoot!.querySelector<HTMLElement>('[data-group="from"][data-segment="c"]')!;
      fromC.focus();
      press(fromC, 'ArrowRight');
      const active = el.shadowRoot!.activeElement as HTMLElement;
      expect(active.dataset.group).to.equal('to');
      expect(active.dataset.segment).to.equal('a');
    });

    it('keeps buffers separate per (group, field)', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      el.groups = ['from', 'to'];
      el.values = { from: { a: null, b: null, c: null }, to: { a: null, b: null, c: null } };
      el.requestUpdate();
      await el.updateComplete;

      el.controller.setBuffer('from', 'a', '1');
      el.controller.setBuffer('to', 'a', '2');
      expect(el.controller.getBuffer('from', 'a')).to.equal('1');
      expect(el.controller.getBuffer('to', 'a')).to.equal('2');
    });
  });

  describe('handleKeyDownEvent (host pre-handler integration)', () => {
    it('returns true when the controller consumed the event', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      const seg = getSegment(el, 'a');
      seg.focus();
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true, cancelable: true });
      // A real `@keydown`-bound event has `currentTarget` set to the segment; emulate that here since the event
      // is never dispatched. Without it the handler can't resolve which segment fired and consumes nothing.
      Object.defineProperty(event, 'currentTarget', { value: seg });
      const consumed = el.controller.handleKeyDownEvent(event);
      expect(consumed).to.equal(true);
    });

    it('returns false when the controller did not consume the event', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      const seg = getSegment(el, 'a');
      seg.focus();
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true });
      // Have to dispatch first because handleKeyDownEvent reads currentTarget; emulate by setting it.
      Object.defineProperty(event, 'currentTarget', { value: seg });
      const consumed = el.controller.handleKeyDownEvent(event);
      expect(consumed).to.equal(false);
    });
  });

  describe('non-handled keys', () => {
    it('does not preventDefault on unrelated keys', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true, cancelable: true });
      getSegment(el, 'a').dispatchEvent(event);
      expect(event.defaultPrevented).to.equal(false);
    });

    it('does not preventDefault on Shift+Tab', async () => {
      const el = await fixture<TestSegments>(html`<test-segments></test-segments>`);
      getSegment(el, 'a').focus();
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        composed: true,
        cancelable: true,
      });
      getSegment(el, 'a').dispatchEvent(event);
      expect(event.defaultPrevented).to.equal(false);
    });
  });
});
