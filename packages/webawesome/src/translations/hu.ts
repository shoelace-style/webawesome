import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hu',
  $name: 'Magyar',
  $dir: 'ltr',

  carousel: 'Körhinta',
  captions: 'Feliratok',
  clearEntry: 'Bejegyzés törlése',
  createOption: value => `„${value}" létrehozása`,
  close: 'Bezárás',
  copied: 'Másolva',
  copy: 'Másolás',
  currentValue: 'Aktuális érték',
  decrement: 'Csökkentés',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Hiba',
  enterFullscreen: 'Teljes képernyő',
  exitFullscreen: 'Kilépés a teljes képernyőből',
  goToSlide: (slide, count) => `Ugrás a ${count}/${slide}. diára`,
  hidePassword: 'Jelszó elrejtése',
  increment: 'Növelés',
  loading: 'Betöltés',
  moreOptions: 'További lehetőségek',
  mute: 'Elnémítás',
  nextSlide: 'Következő dia',
  nextVideo: 'Következő videó',
  numOptionsSelected: num => {
    if (num === 0) return 'Nincsenek kiválasztva opciók';
    if (num === 1) return '1 lehetőség kiválasztva';
    return `${num} lehetőség kiválasztva`;
  },
  pause: 'Szünet',
  pauseAnimation: 'Animáció szüneteltetése',
  pictureInPicture: 'Kép a képben',
  play: 'Lejátszás',
  playbackSpeed: 'Lejátszási sebesség',
  playlist: 'Lejátszási lista',
  playAnimation: 'Animáció lejátszása',
  previousSlide: 'Előző dia',
  previousVideo: 'Előző videó',
  progress: 'Folyamat',
  remove: 'Eltávolítás',
  resize: 'Átméretezés',
  scrollableRegion: 'Görgethető terület',
  scrollToEnd: 'Görgessen a végére',
  scrollToStart: 'Görgessen az elejére',
  selectAColorFromTheScreen: 'Szín választása a képernyőről',
  showPassword: 'Jelszó megjelenítése',
  slideNum: slide => `${slide}. dia`,
  toggleColorFormat: 'Színformátum változtatása',
  seek: 'Keresés',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'éppen játszik',
  unmute: 'Elnémítás feloldása',
  videoPlayer: 'Videólejátszó',
  volume: 'Hangerő',
  zoomIn: 'Nagyítás',
  zoomOut: 'Kicsinyítés',
};

registerTranslation(translation);

export default translation;
