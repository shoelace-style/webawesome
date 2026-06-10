import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hr',
  $name: 'Hrvatski',
  $dir: 'ltr',

  am: 'AM',
  carousel: 'Vrtuljak',
  captions: 'Titlovi',
  chooseDate: 'Odaberi datum',
  chooseTime: 'Odaberi vrijeme',
  chooseDecade: 'Odaberi desetljeće',
  chooseMonth: 'Odaberi mjesec',
  chooseYear: 'Odaberi godinu',
  clearEntry: 'Očisti unos',
  createOption: value => `Stvori "${value}"`,
  close: 'Zatvori',
  closeCalendar: 'Zatvori kalendar',
  closeTimeInput: 'Zatvori birač vremena',
  copied: 'Kopirano',
  copy: 'Kopiraj',
  currentValue: 'Trenutna vrijednost',
  date: 'Datum',
  datePickerKeyboardHelp: 'Strelicama mijenjajte vrijednosti; pritisnite Alt+Strelica dolje za otvaranje kalendara.',
  day: 'Dan',
  dayPeriod: 'AM/PM',
  decrement: 'Smanji',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Prazno',
  error: 'Greška',
  enterFullscreen: 'Uđi u cijeli zaslon',
  endDate: 'Datum završetka',
  exitFullscreen: 'Izađi iz cijelog zaslona',
  goToSlide: (slide, count) => `Idi na slajd ${slide} od ${count}`,
  hidePassword: 'Sakrij lozinku',
  hour: 'Sat',
  incompleteDate: 'Unesite potpuni datum.',
  increment: 'Povećaj',
  loading: 'Učitavanje',
  minute: 'Minuta',
  moreOptions: 'Više opcija',
  month: 'Mjesec',
  mute: 'Utišaj',
  nextDecade: 'Sljedeće desetljeće',
  nextMonth: 'Sljedeći mjesec',
  nextSlide: 'Sljedeći slajd',
  nextVideo: 'Sljedeći video',
  nextYear: 'Sljedeća godina',
  now: 'Sada',
  numCharacters: num => {
    if (num === 1) return '1 znak';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} znaka`;
    return `${num} znakova`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 preostali znak';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} preostala znaka`;
    return `${num} preostalih znakova`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nije odabrana nijedna opcija';
    if (num === 1) return '1 opcija je odabrana';
    return `${num} odabranih opcija`;
  },
  pause: 'Pauziraj',
  pauseAnimation: 'Pauziraj animaciju',
  pictureInPicture: 'Slika u slici',
  pm: 'PM',
  play: 'Reproduciraj',
  playbackSpeed: 'Brzina reprodukcije',
  playlist: 'Popis za reprodukciju',
  playAnimation: 'Reproduciraj animaciju',
  previousDecade: 'Prethodno desetljeće',
  previousMonth: 'Prethodni mjesec',
  previousSlide: 'Prethodni slajd',
  previousVideo: 'Prethodni video',
  previousYear: 'Prethodna godina',
  progress: 'Napredak',
  rangeTooLong: max => {
    if (max === 1) return 'Odaberite raspon ne dulji od 1 dana';
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Odaberite raspon ne dulji od ${max} dana`;
    return `Odaberite raspon ne dulji od ${max} dana`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Odaberite raspon dug najmanje 1 dan';
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Odaberite raspon dug najmanje ${min} dana`;
    return `Odaberite raspon dug najmanje ${min} dana`;
  },
  readonly: 'Samo za čitanje',
  remove: 'Makni',
  resize: 'Promijeni veličinu',
  scrollableRegion: 'Područje s mogućnošću pomicanja',
  scrollToEnd: 'Skrolaj do kraja',
  scrollToStart: 'Skrolaj na početak',
  second: 'Sekunda',
  selectAColorFromTheScreen: 'Odaberi boju sa ekrana',
  selected: 'Odabrano',
  selectedDateLabel: date => `Odabrano: ${date}`,
  selectedRangeLabel: range => `Odabrani raspon: ${range}`,
  selectionCleared: 'Odabir poništen',
  showPassword: 'Pokaži lozinku',
  slideNum: slide => `Slajd ${slide}`,
  startDate: 'Datum početka',
  time: 'Vrijeme',
  timeInputKeyboardHelp:
    'Strelicama mijenjajte vrijednosti; pritisnite Alt+Strelica dolje za otvaranje birača vremena.',
  today: 'Danas',
  toggleColorFormat: 'Zamijeni format boje',
  seek: 'Traži',
  seekProgress: (current, duration) => `${current} od ${duration}`,
  currentlyPlaying: 'trenutno se reproducira',
  unmute: 'Uključi zvuk',
  videoPlayer: 'Video player',
  volume: 'Glasnoća',
  year: 'Godina',
  zoomIn: 'Povećaj',
  zoomOut: 'Smanji',
};

registerTranslation(translation);

export default translation;
