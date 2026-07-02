import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hr',
  $name: 'Hrvatski',
  $dir: 'ltr',

  am: 'AM',
  autosizeColumn: 'Automatski prilagodi veličinu stupca',
  captions: 'Titlovi',
  carousel: 'Vrtuljak',
  chooseDate: 'Odaberi datum',
  chooseDecade: 'Odaberi desetljeće',
  chooseMonth: 'Odaberi mjesec',
  chooseTime: 'Odaberi vrijeme',
  chooseYear: 'Odaberi godinu',
  clearEntry: 'Očisti unos',
  clearSort: 'Poništi sortiranje',
  close: 'Zatvori',
  closeCalendar: 'Zatvori kalendar',
  closeTimeInput: 'Zatvori birač vremena',
  collapseRow: 'Sažmi redak',
  columnMenu: 'Opcije stupca',
  columnMovedToPosition: (label, position, total) => `${label} premješten na poziciju ${position} od ${total}`,
  columns: 'Stupci',
  compactPageXOfY: (page, total) => `${page} od ${total}`,
  copied: 'Kopirano',
  copy: 'Kopiraj',
  createOption: value => `Stvori "${value}"`,
  currentlyPlaying: 'trenutno se reproducira',
  currentValue: 'Trenutna vrijednost',
  date: 'Datum',
  datePickerKeyboardHelp: 'Strelicama mijenjajte vrijednosti; pritisnite Alt+Strelica dolje za otvaranje kalendara.',
  day: 'Dan',
  dayPeriod: 'AM/PM',
  decrement: 'Smanji',
  deselectAllRows: 'Poništi odabir svih redaka',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Prazno',
  endDate: 'Datum završetka',
  enterFullscreen: 'Uđi u cijeli zaslon',
  error: 'Greška',
  exitFullscreen: 'Izađi iz cijelog zaslona',
  expandRow: 'Proširi redak',
  filterByColumn: label => `Filtriraj po stupcu ${label}`,
  filterMax: 'Maks',
  filterMin: 'Min',
  firstPage: 'Prva stranica',
  goToSlide: (slide, count) => `Idi na slajd ${slide} od ${count}`,
  hideColumn: 'Sakrij stupac',
  hidePassword: 'Sakrij lozinku',
  hour: 'Sat',
  incompleteDate: 'Unesite valjani datum.',
  increment: 'Povećaj',
  jumpBackwardX: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `Skoči ${count} stranicu unatrag`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Skoči ${count} stranice unatrag`;
    return `Skoči ${count} stranica unatrag`;
  },
  jumpForwardX: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `Skoči ${count} stranicu unaprijed`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Skoči ${count} stranice unaprijed`;
    return `Skoči ${count} stranica unaprijed`;
  },
  lastPage: 'Posljednja stranica',
  loading: 'Učitavanje',
  minute: 'Minuta',
  month: 'Mjesec',
  moreOptions: 'Više opcija',
  mute: 'Utišaj',
  nextDecade: 'Sljedeće desetljeće',
  nextMonth: 'Sljedeći mjesec',
  nextPage: 'Sljedeća stranica',
  nextSlide: 'Sljedeći slajd',
  nextVideo: 'Sljedeći video',
  nextYear: 'Sljedeća godina',
  noData: 'Nema podataka',
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
  numRowsSelected: num => {
    if (num === 1) return '1 redak odabran';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} retka odabrana`;
    return `${num} redaka odabrano`;
  },
  pageXOfY: (page, total) => `Stranica ${page} od ${total}`,
  pagination: 'Straničenje',
  pause: 'Pauziraj',
  pauseAnimation: 'Pauziraj animaciju',
  pictureInPicture: 'Slika u slici',
  pinLeft: 'Prikvači lijevo',
  pinRight: 'Prikvači desno',
  play: 'Reproduciraj',
  playAnimation: 'Reproduciraj animaciju',
  playbackSpeed: 'Brzina reprodukcije',
  playlist: 'Popis za reprodukciju',
  pm: 'PM',
  previousDecade: 'Prethodno desetljeće',
  previousMonth: 'Prethodni mjesec',
  previousPage: 'Prethodna stranica',
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
  resizeColumn: 'Promijeni veličinu stupca',
  rowsPerPage: 'Redaka po stranici',
  scrollableRegion: 'Područje s mogućnošću pomicanja',
  scrollToEnd: 'Skrolaj do kraja',
  scrollToStart: 'Skrolaj na početak',
  search: 'Pretraži',
  second: 'Sekunda',
  seek: 'Traži',
  seekProgress: (current, duration) => `${current} od ${duration}`,
  selectAColorFromTheScreen: 'Odaberi boju sa ekrana',
  selectAllRows: 'Odaberi sve retke',
  selected: 'Odabrano',
  selectedDateLabel: date => `Odabrano: ${date}`,
  selectedRangeLabel: range => `Odabrani raspon: ${range}`,
  selectGroup: 'Odaberi grupu',
  selectionCleared: 'Odabir poništen',
  selectRow: 'Odaberi redak',
  showingNofMRows: (shown, total) => `Prikazuje se ${shown} od ${total} redaka`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} od ${total}`,
  showPassword: 'Pokaži lozinku',
  slideNum: slide => `Slajd ${slide}`,
  sortAscending: 'Sortiraj uzlazno',
  sortColumn: 'Sortiraj stupac',
  sortDescending: 'Sortiraj silazno',
  startDate: 'Datum početka',
  time: 'Vrijeme',
  timeInputKeyboardHelp:
    'Strelicama mijenjajte vrijednosti; pritisnite Alt+Strelica dolje za otvaranje birača vremena.',
  today: 'Danas',
  toggleColorFormat: 'Zamijeni format boje',
  unmute: 'Uključi zvuk',
  unpin: 'Otkvači',
  unpinColumn: 'Otkvači stupac',
  videoPlayer: 'Video player',
  volume: 'Glasnoća',
  year: 'Godina',
  zoomIn: 'Povećaj',
  zoomOut: 'Smanji',
};

registerTranslation(translation);

export default translation;
