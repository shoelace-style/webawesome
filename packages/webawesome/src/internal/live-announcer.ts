/**
 * A shared, light-DOM live region for announcing dynamic updates to screen readers.
 *
 * Live regions rendered inside a shadow root are not reliably announced — notably, JAWS + Firefox ignores them
 * entirely. To work around this, we maintain a single visually-hidden live region appended to `document.body` (light
 * DOM) and update its contents imperatively. This mirrors the approach used by Adobe's React Aria `LiveAnnouncer` and is
 * the most robust way to ensure announcements are picked up across screen readers.
 *
 * The region is created lazily and persists for the lifetime of the page. Each announcement appends a fresh node (so
 * repeating the same message still announces) and removes it shortly after, preventing stale text from accumulating or
 * being re-read when focus returns.
 */

type Politeness = 'polite' | 'assertive';

let politeLog: HTMLElement | null = null;
let assertiveLog: HTMLElement | null = null;

/** How long an announcement node lingers before it's removed, in milliseconds. */
const CLEAR_DELAY = 7_000;

function createLog(politeness: Politeness): HTMLElement {
  const log = document.createElement('div');
  log.setAttribute('role', 'log');
  log.setAttribute('aria-live', politeness);
  log.setAttribute('aria-relevant', 'additions');

  // Visually hidden, but not removed from the accessibility tree (which `display: none` / `hidden` would do).
  Object.assign(log.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    padding: '0',
    border: '0',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  } satisfies Partial<CSSStyleDeclaration>);

  return log;
}

function getLog(politeness: Politeness): HTMLElement {
  if (politeness === 'assertive') {
    assertiveLog ??= document.body.appendChild(createLog('assertive'));
    return assertiveLog;
  }

  politeLog ??= document.body.appendChild(createLog('polite'));
  return politeLog;
}

/**
 * Announces a message to assistive technology via a shared light-DOM live region.
 *
 * @param message - The text to announce. Empty strings are ignored.
 * @param politeness - Whether to announce politely (default) or assertively.
 */
export function announce(message: string, politeness: Politeness = 'polite') {
  if (!message) return;

  const log = getLog(politeness);
  const node = document.createElement('div');
  node.textContent = message;
  log.appendChild(node);

  setTimeout(() => node.remove(), CLEAR_DELAY);
}
