import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './video.css';

/**
 * @summary Short summary of the component's intended use.
 * @documentation https://webawesome.com/docs/components/video
 * @status experimental
 * @since 3.0
 *
 * @dependency wa-example
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('wa-video')
export default class WaVideo extends WebAwesomeElement {
  static css = styles;

  @property({ type: String }) src: string = '';
  @property({ type: String }) poster: string = '';
  @property({ type: Boolean, reflect: true }) autoplay: boolean = false;
  @property({ type: Boolean, reflect: true }) muted: boolean = false;
  @property({ type: Boolean, reflect: true }) loop: boolean = false;
  @property({ type: String }) preload: 'none' | 'metadata' | 'auto' = 'metadata';
  @property({ type: Boolean, reflect: true }) playsinline: boolean = false;
  @property({ type: String, attribute: 'data-title' }) dataTitle: string = '';

  @state() private duration = 0;
  @state() private current = 0;
  @state() private volume = 1;
  @state() private isPlaying = false;
  @state() private captionsOn = false;
  @state() private bufferedEnd = 0; // seconds

  @state() private hoverTime: number | null = null;
  @state() private hoverLeftPct = 0; // 0..100
  @state() private isScrubbing = false;
  @state() private scrubTime: number | null = null; // live time preview during drag

  @query('video') private videoEl!: HTMLVideoElement;
  @query('.progress-wrap') private progressWrapEl!: HTMLDivElement;
  @query('input.progress') private progressEl!: HTMLInputElement;

  firstUpdated() {
    const v = this.videoEl;
    if (this.src) v.src = this.src;
    if (this.poster) v.poster = this.poster;
    v.autoplay = this.autoplay;
    v.muted = this.muted;
    v.loop = this.loop;
    v.preload = this.preload;
    if (this.playsinline) v.setAttribute('playsinline', '');
    else v.removeAttribute('playsinline');

    // Copy light-DOM <source>/<track>
    const sources = Array.from(this.querySelectorAll('source'));
    const tracks = Array.from(this.querySelectorAll('track'));
    if (!this.src && sources.length) {
      for (const s of sources) {
        const el = document.createElement('source');
        el.src = s.getAttribute('src') || '';
        const t = s.getAttribute('type');
        if (t) el.type = t;
        v.appendChild(el);
      }
    }
    for (const t of tracks) {
      const el = document.createElement('track');
      el.kind = (t.getAttribute('kind') as TextTrackKind) || 'subtitles';
      el.label = t.getAttribute('label') || '';
      el.srclang = t.getAttribute('srclang') || '';
      el.src = t.getAttribute('src') || '';
      if (t.hasAttribute('default')) el.default = true;
      v.appendChild(el);
    }

    v.addEventListener('loadedmetadata', () => {
      this.duration = v.duration || 0;
      this.current = v.currentTime || 0;
      this.volume = v.volume;
      this.#updateBuffered();
      this.#updateCaptionsState();
    });
    v.addEventListener('timeupdate', () => {
      this.current = v.currentTime || 0;
    });
    v.addEventListener('progress', () => this.#updateBuffered());
    v.addEventListener('play', () => {
      this.isPlaying = true;
    });
    v.addEventListener('pause', () => {
      this.isPlaying = false;
    });
    v.addEventListener('volumechange', () => {
      this.volume = v.volume;
    });

    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
    this.addEventListener('keydown', (e: KeyboardEvent) => this.#onKeydown(e));

    // Hover + scrubbing
    this.progressWrapEl.addEventListener('mousemove', e => this.#onProgressHover(e as MouseEvent));
    this.progressWrapEl.addEventListener('mouseleave', () => {
      this.hoverTime = null;
    });

    const input = this.progressEl;
    input.addEventListener('pointerdown', e => this.#onScrubStart(e as PointerEvent));
    input.addEventListener('pointermove', e => this.#onScrubMove(e as PointerEvent));
    input.addEventListener('pointerup', e => this.#onScrubEnd(e as PointerEvent));
    input.addEventListener('pointercancel', e => this.#onScrubEnd(e as PointerEvent));
  }

  // UI actions
  get video() {
    return this.videoEl;
  }
  play() {
    return this.videoEl.play();
  }
  pause() {
    this.videoEl.pause();
  }
  toggle() {
    this.videoEl.paused ? this.videoEl.play() : this.videoEl.pause();
  }

  // Helpers
  #fmt(sec: number) {
    sec = Math.max(0, Math.floor(sec));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${m}:${String(s).padStart(2, '0')}`;
  }

  #onKeydown(e: KeyboardEvent) {
    const k = e.key.toLowerCase();
    if (k === ' ' || k === 'k') {
      e.preventDefault();
      this.toggle();
    }
    if (k === 'm') this.videoEl.muted = !this.videoEl.muted;
    if (k === 'arrowright')
      this.videoEl.currentTime = Math.min(this.videoEl.currentTime + 5, this.videoEl.duration || Infinity);
    if (k === 'arrowleft') this.videoEl.currentTime = Math.max(this.videoEl.currentTime - 5, 0);
    if (k === 'arrowup') this.videoEl.volume = Math.min(this.videoEl.volume + 0.05, 1);
    if (k === 'arrowdown') this.videoEl.volume = Math.max(this.videoEl.volume - 0.05, 0);
    if (k === 'f') this.#toggleFullscreen();
    if (k === 'c') this.#toggleCaptions();
    if (k === 'p') this.#togglePiP();
  }

  #noTextTracks() {
    const list = this.videoEl?.textTracks;
    return !list || list.length === 0;
  }
  #updateCaptionsState = () => {
    const list = this.videoEl?.textTracks;
    if (!list) {
      this.captionsOn = false;
      return;
    }
    let on = false;
    for (const t of Array.from(list))
      if (t.mode === 'showing') {
        on = true;
        break;
      }
    this.captionsOn = on;
  };
  #toggleCaptions = () => {
    const list = this.videoEl?.textTracks;
    if (!list || list.length === 0) return;
    const any = Array.from(list).some(t => t.mode === 'showing');
    for (const t of Array.from(list)) t.mode = any ? 'disabled' : 'showing';
    this.captionsOn = !any;
  };

  async #togglePiP() {
    try {
      const doc: any = document;
      if (doc.pictureInPictureElement) await doc.exitPictureInPicture();
      else if (doc.pictureInPictureEnabled) await (this.videoEl as any).requestPictureInPicture();
    } catch {}
  }
  #toggleFullscreen() {
    const root: any = this;
    const isFull = document.fullscreenElement === root || (this.renderRoot as ShadowRoot).fullscreenElement === root;
    if (!isFull) root.requestFullscreen?.().catch?.(() => {});
    else document.exitFullscreen?.();
  }
  #onFrameBgClick(e: MouseEvent) {
    const path = e.composedPath();
    const inControls = path.some((el: any) => el?.classList?.contains?.('controls'));
    if (!inControls && !this.isScrubbing) this.toggle();
  }

  #updateBuffered() {
    const v = this.videoEl;
    const ranges = v.buffered;
    let end = 0;
    for (let i = 0; i < ranges.length; i++) {
      end = Math.max(end, ranges.end(i));
    }
    this.bufferedEnd = end;
  }

  // Hover preview
  #onProgressHover(e: MouseEvent) {
    if (!this.duration) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(1, Math.max(0, x / rect.width));
    this.hoverLeftPct = pct * 100;
    const t = pct * this.duration;
    this.hoverTime = t;
    if (!this.isScrubbing) this.scrubTime = null;
  }

  // Input-based scrubbing (keeps native accessibility) + pointer drag UX
  #onInputScrub = (e: Event) => {
    // keeps keyboard + a11y working
    const t = Number((e.target as HTMLInputElement).value) / 1000; // ms->s
    if (!this.isScrubbing) {
      // keyboard or fine input
      this.videoEl.currentTime = t;
    } else {
      this.scrubTime = t; // live preview while dragging
    }
  };

  #onScrubStart(e: PointerEvent) {
    this.isScrubbing = true;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const rect = this.progressWrapEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(1, Math.max(0, x / rect.width));
    this.hoverLeftPct = pct * 100;
    this.scrubTime = pct * this.duration;
  }
  #onScrubMove(e: PointerEvent) {
    if (!this.isScrubbing) return;
    const rect = this.progressWrapEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(1, Math.max(0, x / rect.width));
    this.hoverLeftPct = pct * 100;
    this.scrubTime = pct * this.duration;
  }
  #onScrubEnd(e: PointerEvent) {
    if (!this.isScrubbing) return;
    this.isScrubbing = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    if (this.scrubTime != null) {
      this.videoEl.currentTime = this.scrubTime;
    }
    this.scrubTime = null;
  }

  render() {
    const dur = this.#fmt(this.duration);
    const cur = this.#fmt(this.current);
    const pipSupported = (document as any).pictureInPictureEnabled;

    const bufferedPct = this.duration > 0 ? (this.bufferedEnd / this.duration) * 100 : 0;
    const effectiveTime = this.isScrubbing && this.scrubTime != null ? this.scrubTime : (this.hoverTime ?? null);
    const effectiveLeft = this.isScrubbing && this.scrubTime != null ? this.hoverLeftPct : this.hoverLeftPct; // same source
    const showPreview = effectiveTime != null;

    const bufferedTip = this.duration > 0 ? this.#fmt(this.bufferedEnd) : null;

    return html`
      <div class="frame" @click=${this.#onFrameBgClick} role="region" aria-label="Video player">
        ${this.dataTitle ? html`<div class="title">${this.dataTitle}</div>` : 'nothing'}
        <video crossorigin="anonymous" @loadeddata=${this.#updateCaptionsState}></video>

        <div class="bar">
          <div class="progress-wrap">
            <div class="buffered" style="width:${bufferedPct}%"></div>
            <input
              class="progress"
              type="range"
              min="0"
              .max=${Math.max(1, Math.floor(this.duration * 1000))}
              .value=${Math.floor(this.current * 1000)}
              step="1"
              aria-label="Seek"
              @input=${this.#onInputScrub}
            />
            ${showPreview
              ? html` <div class="hover" style="left:${effectiveLeft}%">
                  <span class="bubble">${this.#fmt(effectiveTime!)}</span>
                  ${bufferedTip ? html`<span class="bubble secondary">Buffered: ${bufferedTip}</span>` : 'nothing'}
                </div>`
              : 'nothing'}
          </div>
        </div>

        <div class="controls" role="group" aria-label="Controls">
          <button class="play" aria-label="Play/Pause" aria-pressed=${this.isPlaying} @click=${this.toggle.bind(this)}>
            ${this.isPlaying ? 'Pause' : 'Play'}
          </button>
          <span class="time">${cur}</span><span class="time">/</span><span class="time">${dur}</span>
          <div class="spacer"></div>
          <button
            class="mute"
            aria-label="Mute/Unmute"
            aria-pressed=${this.videoEl?.muted || this.volume === 0}
            @click=${() => (this.videoEl.muted = !this.videoEl.muted)}
          >
            Mute
          </button>
          <input
            class="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            .value=${this.volume}
            aria-label="Volume"
            @input=${(e: Event) => {
              const v = Number((e.target as HTMLInputElement).value);
              this.videoEl.volume = v;
              this.videoEl.muted = v === 0;
            }}
          />
          <select
            aria-label="Playback speed"
            @change=${(e: Event) => (this.videoEl.playbackRate = Number((e.target as HTMLSelectElement).value))}
          >
            ${[0.5, 0.75, 1, 1.25, 1.5, 2].map(r => html`<option value=${r} ?selected=${r === 1}>${r}×</option>`)}
          </select>
          <button
            class="captions"
            aria-label="Toggle captions"
            ?hidden=${this.#noTextTracks()}
            aria-pressed=${this.captionsOn}
            @click=${this.#toggleCaptions}
          >
            CC
          </button>
          <button class="pip" aria-label="Picture in Picture" ?hidden=${!pipSupported} @click=${this.#togglePiP}>
            PiP
          </button>
          <button class="fs" aria-label="Fullscreen" @click=${this.#toggleFullscreen}>FS</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-video': WaVideo;
  }
}
