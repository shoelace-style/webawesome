import { createComponent } from '@lit/react';
import * as React from 'react';
import Component from '../../components/dialog/dialog.js';

import { type EventName } from '@lit/react';
import type { WaAfterHideEvent, WaAfterShowEvent, WaHideEvent, WaShowEvent } from '../../events/events.js';
export type { WaAfterHideEvent, WaAfterShowEvent, WaHideEvent, WaShowEvent } from '../../events/events.js';

const tagName = 'wa-dialog';

/**
 * @summary Dialogs, sometimes called "modals", appear above the page and require the user's immediate attention.
 * @documentation https://backers.webawesome.com/docs/components/dialog
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button
 *
 * @slot - The dialog's main content.
 * @slot label - The dialog's label. Alternatively, you can use the `label` attribute.
 * @slot header-actions - Optional actions to add to the header. Works best with `<wa-button>`.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 *
 * @event wa-show - Emitted when the dialog opens.
 * @event wa-after-show - Emitted after the dialog opens and all animations are complete.
 * @event {{ source: Element }} wa-hide - Emitted when the dialog is requested to close. Calling
 *  `event.preventDefault()` will prevent the dialog from closing. You can inspect `event.detail.source` to see which
 *  element caused the dialog to close. If the source is the dialog element itself, the user has pressed [[Escape]] or
 *  the dialog has been closed programmatically. Avoid using this unless closing the dialog will result in destructive
 *  behavior such as data loss.
 * @event wa-after-hide - Emitted after the dialog closes and all animations are complete.
 *
 * @csspart header - The dialog's header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header. Works best with `<wa-button>`.
 * @csspart title - The dialog's title.
 * @csspart close-button - The close button, a `<wa-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 * @csspart body - The dialog's body.
 * @csspart footer - The dialog's footer.
 *
 * @cssproperty --background-color - The dialog's background color.
 * @cssproperty --border-radius - The radius of the dialog's corners.
 * @cssproperty --box-shadow - The shadow effects around the edges of the dialog.
 * @cssproperty --spacing - The amount of space around and between the dialog's content.
 * @cssproperty --width - The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens.
 * @cssproperty [--show-duration=200ms] - The animation duration when showing the dialog.
 * @cssproperty [--hide-duration=200ms] - The animation duration when hiding the dialog.
 */
const reactWrapper = createComponent({
  tagName,
  elementClass: Component,
  react: React,
  events: {
    onWaShow: 'wa-show' as EventName<WaShowEvent>,
    onWaAfterShow: 'wa-after-show' as EventName<WaAfterShowEvent>,
    onWaHide: 'wa-hide' as EventName<WaHideEvent>,
    onWaAfterHide: 'wa-after-hide' as EventName<WaAfterHideEvent>,
  },
  displayName: 'WaDialog',
});

export default reactWrapper;
