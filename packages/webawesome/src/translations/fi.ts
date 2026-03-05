import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fi',
  $name: 'Suomi',
  $dir: 'ltr',

  carousel: 'Karuselli',
  captions: 'Tekstitys',
  clearEntry: 'Poista merkintä',
  close: 'Sulje',
  copied: 'Kopioitu',
  copy: 'Kopioi',
  currentValue: 'Nykyinen arvo',
  decrement: 'Vähennä',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Virhe',
  enterFullscreen: 'Siirry koko näytölle',
  exitFullscreen: 'Poistu koko näytöltä',
  goToSlide: (slide, count) => `Siirry diaan ${slide} / ${count}`,
  hidePassword: 'Piilota salasana',
  increment: 'Lisää',
  loading: 'Ladataan',
  mute: 'Mykistä',
  nextSlide: 'Seuraava dia',
  nextVideo: 'Seuraava video',
  numOptionsSelected: num => {
    if (num === 0) return 'Ei valittuja vaihtoehtoja';
    if (num === 1) return 'Yksi vaihtoehto valittu';
    return `${num} vaihtoehtoa valittu`;
  },
  pause: 'Keskeytä',
  pauseAnimation: 'Keskeytä animaatio',
  pictureInPicture: 'Kuva kuvassa',
  play: 'Toista',
  playbackSpeed: 'Toistonopeus',
  playlist: 'Soittolista',
  playAnimation: 'Toista animaatio',
  previousSlide: 'Edellinen dia',
  previousVideo: 'Edellinen video',
  progress: 'Edistyminen',
  remove: 'Poista',
  resize: 'Muuta kokoa',
  scrollableRegion: 'Vieritettävä alue',
  scrollToEnd: 'Vieritä loppuun',
  scrollToStart: 'Vieritä alkuun',
  selectAColorFromTheScreen: 'Valitse väri näytöltä',
  showPassword: 'Näytä salasana',
  slideNum: slide => `Dia ${slide}`,
  toggleColorFormat: 'Vaihda väriformaattia',
  unmute: 'Poista mykistys',
  videoPlayer: 'Videosoitin',
  volume: 'Äänenvoimakkuus',
  zoomIn: 'Lähennä',
  zoomOut: 'Loitonna',
};

registerTranslation(translation);

export default translation;
