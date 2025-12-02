import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import '../select/select.js';
import '../slider/slider.js';

import styles from './video.css';

/**
 * @summary Video player component with custom controls.
 * @documentation https://webawesome.com/docs/components/video
 * @status experimental
 * @since 3.0
 *
 * @dependency wa-slider
 * @dependency wa-select
 *
 * @slot - Place source and track elements here (parsed once on initialization).
 *
 * @attribute src - Direct video source URL (alternative to using source elements)
 * @attribute type - Video MIME type when using src attribute (default: video/mp4)
 * @attribute poster - Poster image URL
 *
 * @csspart base - The component's base wrapper.
 * @csspart video - The video element.
 * @csspart controls - The controls container.
 */
@customElement('wa-video')
export default class WaVideo extends WebAwesomeElement {
  static css = styles;

  @property({ type: String }) src = '';
  @property({ type: String }) type = 'video/mp4';
  @property({ type: String }) poster = '';
  @property({ type: Boolean, reflect: true }) playing = false;
  @property({ type: Boolean, reflect: true }) muted = false;
  @property({ type: Number }) volume = 1;
  @property({ type: Number }) duration = 0;
  @property({ type: Number }) currentTime = 0;

  @query('video') videoElement!: HTMLVideoElement;

  private sources: Array<{ src: string; type: string }> = [];
  private tracks: Array<{ src: string; kind: string; srclang: string; label: string }> = [];

  private handleLoadedMetadata() {
    if (this.videoElement) {
      this.duration = this.videoElement.duration;
    }
  }

  private handleTimeUpdate() {
    if (this.videoElement) {
      this.currentTime = this.videoElement.currentTime;
    }
  }

  private handlePlay() {
    this.playing = true;
  }

  private handlePause() {
    this.playing = false;
  }

  private handleVolumeChange() {
    if (this.videoElement) {
      this.volume = this.videoElement.volume;
      this.muted = this.videoElement.muted;
    }
  }

  private handleError(e: Event) {
    console.error('Video error:', e);
    if (this.videoElement?.error) {
      console.error('Error code:', this.videoElement.error.code);
      console.error('Error message:', this.videoElement.error.message);
    }
  }

  play() {
    if (this.videoElement) {
      this.videoElement.play().catch(err => {
        console.error('Play failed:', err);
      });
    }
  }

  pause() {
    if (this.videoElement) {
      this.videoElement.pause();
    }
  }

  togglePlay() {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  toggleMute() {
    if (this.videoElement) {
      this.videoElement.muted = !this.videoElement.muted;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // Parse light DOM for source elements
    const lightDomSources = Array.from(this.querySelectorAll('source'));
    if (lightDomSources.length > 0) {
      this.sources = lightDomSources.map(source => ({
        src: source.getAttribute('src') || '',
        type: source.getAttribute('type') || 'video/mp4',
      }));
    }

    // Parse light DOM for track elements
    const lightDomTracks = Array.from(this.querySelectorAll('track'));
    if (lightDomTracks.length > 0) {
      this.tracks = lightDomTracks.map(track => ({
        src: track.getAttribute('src') || '',
        kind: track.getAttribute('kind') || 'subtitles',
        srclang: track.getAttribute('srclang') || '',
        label: track.getAttribute('label') || '',
      }));
    }
  }

  render() {
    return html`
      <div class="video-container" part="base">
        <video
          part="video"
          src=${this.src || nothing}
          poster=${this.poster || nothing}
          @loadedmetadata=${this.handleLoadedMetadata}
          @timeupdate=${this.handleTimeUpdate}
          @play=${this.handlePlay}
          @pause=${this.handlePause}
          @volumechange=${this.handleVolumeChange}
          @error=${this.handleError}
        >
          ${this.sources.map(source => html` <source src=${source.src} type=${source.type} /> `)}
          ${this.tracks.map(
            track => html`
              <track src=${track.src} kind=${track.kind} srclang=${track.srclang} label=${track.label} />
            `,
          )}
        </video>

        <div class="controls" part="controls">
          <wa-button @click="${this.togglePlay}" variant="neutral" appearance="accent">
            <wa-icon name="${this.playing ? 'pause' : 'play'}" label="${this.playing ? 'Pause' : 'Play'}"></wa-icon>
          </wa-button>
          <wa-button @click="${this.toggleMute}">
            <wa-icon
              name="${this.muted ? 'volume-xmark' : 'volume'}"
              label="${this.muted ? 'Unmute' : 'Mute'}"
            ></wa-icon>
          </wa-button>
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
