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

  @state() private duration: number = 0; // seconds
  @state() private current: number = 0; // seconds
  @state() private isPlaying: boolean = false;

  @query('video') private videoEl!: HTMLVideoElement;
  @query('input.progress') private progressEl!: HTMLInputElement;

  firstUpdated() {
    const v = this.videoEl;

    // Reflect initial attributes to the native <video>
    if (this.src) v.src = this.src;
    if (this.poster) v.poster = this.poster;
    v.autoplay = this.autoplay;
    v.muted = this.muted;
    v.loop = this.loop;
    v.preload = this.preload;
    if (this.playsinline) v.setAttribute('playsinline', '');
    else v.removeAttribute('playsinline');

    // Media events
    v.addEventListener('loadedmetadata', () => {
      this.duration = v.duration || 0;
      this.current = v.currentTime || 0;
      // progress max tracks seconds; we keep 1s steps for simplicity
      if (this.progressEl) this.progressEl.max = String(Math.max(1, Math.floor(this.duration)));
    });

    v.addEventListener('timeupdate', () => {
      this.current = v.currentTime || 0;
      if (this.progressEl) this.progressEl.value = String(Math.floor(this.current));
    });

    v.addEventListener('play', () => {
      this.isPlaying = true;
    });
    v.addEventListener('pause', () => {
      this.isPlaying = false;
    });

    // Make host focusable for keyboard control
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
    this.addEventListener('keydown', (e: KeyboardEvent) => this.onKeydown(e));
  }
  private onKeydown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (key === ' ' || key === 'k') {
      e.preventDefault();
      this.togglePlay();
    }
    if (key === 'arrowright') this.seekTo(this.videoEl.currentTime + 5);
    if (key === 'arrowleft') this.seekTo(this.videoEl.currentTime - 5);
    if (key === 'arrowup') this.setVolume(this.videoEl.volume + 0.05);
    if (key === 'arrowdown') this.setVolume(this.videoEl.volume - 0.05);
    if (key === 'm') this.videoEl.muted = !this.videoEl.muted;
  }

  // UI actions
  private togglePlay() {
    if (this.videoEl.paused) void this.videoEl.play();
    else this.videoEl.pause();
  }

  private onScrub(e: Event) {
    const target = e.target as HTMLInputElement;
    const t = Number(target.value);
    this.seekTo(t);
  }

  private seekTo(t: number) {
    const v = this.videoEl;
    if (!Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(0, t), v.duration || 0);
  }

  private setVolume(x: number) {
    const v = this.videoEl;
    v.volume = Math.min(1, Math.max(0, x));
    if (v.volume === 0) v.muted = true;
  }

  private fmt(sec: number): string {
    sec = Math.max(0, Math.floor(sec));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      : `${m}:${String(s).padStart(2, '0')}`;
  }

  render() {
    const dur = this.fmt(this.duration);
    const cur = this.fmt(this.current);
    return html`
      <div class="frame">
        ${this.dataTitle ? html`<div class="title">${this.dataTitle}</div>` : null}
        <video></video>
        <div class="controls">
          <button class="play" @click=${this.togglePlay.bind(this)}>${this.isPlaying ? 'Pause' : 'Play'}</button>
          <span class="time time-now">${cur}</span>
          <input class="progress" type="range" min="0" value="0" step="1" @input=${this.onScrub.bind(this)} />
          <span class="time time-total">${dur}</span>
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
