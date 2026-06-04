import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hu',
  $name: 'Magyar',
  $dir: 'ltr',

  am: 'de.',
  carousel: 'Körhinta',
  captions: 'Feliratok',
  chooseDate: 'Dátum kiválasztása',
  chooseDecade: 'Évtized kiválasztása',
  chooseMonth: 'Hónap kiválasztása',
  chooseTime: 'Idő kiválasztása',
  chooseYear: 'Év kiválasztása',
  clearEntry: 'Bejegyzés törlése',
  createOption: value => `„${value}" létrehozása`,
  close: 'Bezárás',
  closeCalendar: 'Naptár bezárása',
  closeTimeInput: 'Időválasztó bezárása',
  copied: 'Másolva',
  copy: 'Másolás',
  currentValue: 'Aktuális érték',
  date: 'Dátum',
  datePickerKeyboardHelp: 'A nyílbillentyűkkel módosíthatja az értékeket; az Alt+Lefelé nyíl megnyitja a naptárat.',
  day: 'Nap',
  dayPeriod: 'de./du.',
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
  hour: 'Óra',
  incompleteDate: 'Adjon meg egy teljes dátumot.',
  increment: 'Növelés',
  loading: 'Betöltés',
  minute: 'Perc',
  moreOptions: 'További lehetőségek',
  month: 'Hónap',
  mute: 'Elnémítás',
  nextDecade: 'Következő évtized',
  nextMonth: 'Következő hónap',
  nextSlide: 'Következő dia',
  nextVideo: 'Következő videó',
  nextYear: 'Következő év',
  now: 'Most',
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
  pm: 'du.',
  previousDecade: 'Előző évtized',
  previousMonth: 'Előző hónap',
  previousSlide: 'Előző dia',
  previousVideo: 'Előző videó',
  previousYear: 'Előző év',
  progress: 'Folyamat',
  rangeTooLong: max => {
    if (max === 1) return 'Válasszon legfeljebb 1 napos tartományt';
    return `Válasszon legfeljebb ${max} napos tartományt`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Válasszon legalább 1 napos tartományt';
    return `Válasszon legalább ${min} napos tartományt`;
  },
  readonly: 'Csak olvasható',
  remove: 'Eltávolítás',
  resize: 'Átméretezés',
  scrollableRegion: 'Görgethető terület',
  scrollToEnd: 'Görgessen a végére',
  scrollToStart: 'Görgessen az elejére',
  second: 'Másodperc',
  selectAColorFromTheScreen: 'Szín választása a képernyőről',
  selected: 'Kiválasztva',
  selectedDateLabel: date => `Kiválasztva: ${date}`,
  selectedRangeLabel: range => `Kiválasztott tartomány: ${range}`,
  selectionCleared: 'Kijelölés törölve',
  showPassword: 'Jelszó megjelenítése',
  slideNum: slide => `${slide}. dia`,
  startDate: 'Kezdő dátum',
  toggleColorFormat: 'Színformátum változtatása',
  seek: 'Keresés',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'éppen játszik',
  time: 'Idő',
  timeInputKeyboardHelp: 'A nyílbillentyűkkel módosíthatja az értékeket; az Alt+Lefelé nyíl megnyitja az időválasztót.',
  today: 'Ma',
  unmute: 'Elnémítás feloldása',
  videoPlayer: 'Videólejátszó',
  volume: 'Hangerő',
  year: 'Év',
  zoomIn: 'Nagyítás',
  zoomOut: 'Kicsinyítés',
};

registerTranslation(translation);

export default translation;
