import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sl',
  $name: 'Slovenski',
  $dir: 'ltr',

  carousel: 'Vrtiljak',
  captions: 'Podnapisi',
  clearEntry: 'Počisti vnos',
  close: 'Zapri',
  copied: 'Kopirano',
  copy: 'Kopiraj',
  currentValue: 'Trenutna vrednost',
  decrement: 'Zmanjšaj',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Napaka',
  enterFullscreen: 'Vstopi v celozaslonski način',
  exitFullscreen: 'Zapusti celozaslonski način',
  goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
  hidePassword: 'Skrij geslo',
  increment: 'Povečaj',
  loading: 'Nalaganje',
  mute: 'Utišaj',
  nextSlide: 'Naslednji diapozitiv',
  nextVideo: 'Naslednji videoposnetek',
  numOptionsSelected: num => {
    if (num === 0) return 'Nobena možnost ni izbrana';
    if (num === 1) return '1 možnost izbrana';
    if (num === 2) return '2 možnosti izbrani';
    if (num === 3 || num === 4) return `${num} možnosti izbrane`;
    return `${num} možnosti izbranih`;
  },
  pause: 'Premor',
  pauseAnimation: 'Zaustavi animacijo',
  pictureInPicture: 'Slika v sliki',
  play: 'Predvajaj',
  playbackSpeed: 'Hitrost predvajanja',
  playlist: 'Seznam predvajanja',
  playAnimation: 'Predvajaj animacijo',
  previousSlide: 'Prejšnji diapozitiv',
  previousVideo: 'Prejšnji videoposnetek',
  progress: 'Napredek',
  remove: 'Odstrani',
  resize: 'Spremeni velikost',
  scrollableRegion: 'Področje za drsenje',
  scrollToEnd: 'Pomakni se na konec',
  scrollToStart: 'Pomakni se na začetek',
  selectAColorFromTheScreen: 'Izberite barvo z zaslona',
  showPassword: 'Prikaži geslo',
  slideNum: slide => `Diapozitiv ${slide}`,
  toggleColorFormat: 'Preklopi format barve',
  seek: 'Išči',
  seekProgress: (current, duration) => `${current} od ${duration}`,
  currentlyPlaying: 'se trenutno predvaja',
  unmute: 'Vklopi zvok',
  videoPlayer: 'Videopredvajalnik',
  volume: 'Glasnost',
  zoomIn: 'Povečaj',
  zoomOut: 'Pomanjšaj',
};

registerTranslation(translation);

export default translation;
