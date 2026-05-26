import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hu',
  $name: 'Magyar',
  $dir: 'ltr',

  carousel: 'Körhinta',
  captions: 'Feliratok',
  chooseDate: 'Dátum kiválasztása',
  chooseDecade: 'Évtized kiválasztása',
  chooseMonth: 'Hónap kiválasztása',
  chooseYear: 'Év kiválasztása',
  clearEntry: 'Bejegyzés törlése',
  createOption: value => `„${value}" létrehozása`,
  close: 'Bezárás',
  closeCalendar: 'Naptár bezárása',
  copied: 'Másolva',
  copy: 'Másolás',
  currentValue: 'Aktuális érték',
  date: 'Dátum',
  datePickerKeyboardHelp: 'A nyílbillentyűkkel módosíthatja az értékeket; az Alt+Lefelé nyíl megnyitja a naptárat.',
  day: 'Nap',
  decrement: 'Csökkentés',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Üres',
  error: 'Hiba',
  enterFullscreen: 'Teljes képernyő',
  endDate: 'Befejező dátum',
  exitFullscreen: 'Kilépés a teljes képernyőből',
  goToSlide: (slide, count) => `Ugrás a ${count}/${slide}. diára`,
  hidePassword: 'Jelszó elrejtése',
  increment: 'Növelés',
  loading: 'Betöltés',
  moreOptions: 'További lehetőségek',
  month: 'Hónap',
  mute: 'Elnémítás',
  nextDecade: 'Következő évtized',
  nextMonth: 'Következő hónap',
  nextSlide: 'Következő dia',
  nextVideo: 'Következő videó',
  nextYear: 'Következő év',
  numCharacters: num => {
    if (num === 1) return '1 karakter';
    return `${num} karakter`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 karakter maradt';
    return `${num} karakter maradt`;
  },
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
  previousDecade: 'Előző évtized',
  previousMonth: 'Előző hónap',
  previousSlide: 'Előző dia',
  previousVideo: 'Előző videó',
  previousYear: 'Előző év',
  progress: 'Folyamat',
  remove: 'Eltávolítás',
  resize: 'Átméretezés',
  scrollableRegion: 'Görgethető terület',
  scrollToEnd: 'Görgessen a végére',
  scrollToStart: 'Görgessen az elejére',
  selectAColorFromTheScreen: 'Szín választása a képernyőről',
  showPassword: 'Jelszó megjelenítése',
  slideNum: slide => `${slide}. dia`,
  startDate: 'Kezdő dátum',
  toggleColorFormat: 'Színformátum változtatása',
  seek: 'Keresés',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'éppen játszik',
  unmute: 'Elnémítás feloldása',
  videoPlayer: 'Videólejátszó',
  volume: 'Hangerő',
  year: 'Év',
  zoomIn: 'Nagyítás',
  zoomOut: 'Kicsinyítés',
};

registerTranslation(translation);

export default translation;
