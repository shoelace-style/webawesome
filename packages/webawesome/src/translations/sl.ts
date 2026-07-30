import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sl',
  $name: 'Slovenski',
  $dir: 'ltr',

  am: 'AM',
  autosizeColumn: 'Samodejno prilagodi velikost stolpca',
  captions: 'Podnapisi',
  carousel: 'Vrtiljak',
  chooseDate: 'Izberite datum',
  chooseDecade: 'Izberite desetletje',
  chooseMonth: 'Izberite mesec',
  chooseTime: 'Izberite čas',
  chooseYear: 'Izberite leto',
  clearEntry: 'Počisti vnos',
  clearFilter: 'Počisti filter',
  clearSort: 'Počisti razvrščanje',
  close: 'Zapri',
  closeCalendar: 'Zapri koledar',
  closeTimeInput: 'Zapri izbirnik časa',
  collapseRow: 'Strni vrstico',
  columnMenu: 'Možnosti stolpca',
  columnMovedToPosition: (label, position, total) => `${label} premaknjen na položaj ${position} od ${total}`,
  columns: 'Stolpci',
  compactPageXOfY: (page, total) => `${page} od ${total}`,
  copied: 'Kopirano',
  copy: 'Kopiraj',
  createOption: value => `Ustvari "${value}"`,
  currentlyPlaying: 'se trenutno predvaja',
  currentValue: 'Trenutna vrednost',
  date: 'Datum',
  datePickerKeyboardHelp:
    'S puščičnimi tipkami spreminjajte vrednosti; pritisnite Alt+Puščica navzdol za odpiranje koledarja.',
  day: 'Dan',
  dayPeriod: 'AM/PM',
  decrement: 'Zmanjšaj',
  deselectAllRows: 'Prekliči izbiro vseh vrstic',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Prazno',
  endDate: 'Končni datum',
  enterFullscreen: 'Vstopi v celozaslonski način',
  error: 'Napaka',
  exitFullscreen: 'Zapusti celozaslonski način',
  expandRow: 'Razširi vrstico',
  filterByColumn: label => `Filtriraj po ${label}`,
  filterFrom: 'Od',
  filterMax: 'Najv.',
  filterMin: 'Najm.',
  filterTo: 'Do',
  firstPage: 'Prva stran',
  goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
  hideColumn: 'Skrij stolpec',
  hidePassword: 'Skrij geslo',
  hour: 'Ura',
  incompleteDate: 'Vnesite veljaven datum.',
  increment: 'Povečaj',
  jumpBackwardX: count => {
    const mod100 = count % 100;
    if (mod100 === 1) return `Pomakni se ${count} stran nazaj`;
    if (mod100 === 2) return `Pomakni se ${count} strani nazaj`;
    if (mod100 === 3 || mod100 === 4) return `Pomakni se ${count} strani nazaj`;
    return `Pomakni se ${count} strani nazaj`;
  },
  jumpForwardX: count => {
    const mod100 = count % 100;
    if (mod100 === 1) return `Pomakni se ${count} stran naprej`;
    if (mod100 === 2) return `Pomakni se ${count} strani naprej`;
    if (mod100 === 3 || mod100 === 4) return `Pomakni se ${count} strani naprej`;
    return `Pomakni se ${count} strani naprej`;
  },
  lastPage: 'Zadnja stran',
  loading: 'Nalaganje',
  minute: 'Minuta',
  month: 'Mesec',
  moreOptions: 'Več možnosti',
  mute: 'Utišaj',
  nextDecade: 'Naslednje desetletje',
  nextMonth: 'Naslednji mesec',
  nextPage: 'Naslednja stran',
  nextSlide: 'Naslednji diapozitiv',
  nextVideo: 'Naslednji videoposnetek',
  nextYear: 'Naslednje leto',
  noData: 'Ni podatkov',
  noResults: 'Ni ustreznih rezultatov',
  now: 'Zdaj',
  numCharacters: num => {
    const mod100 = num % 100;
    if (mod100 === 1) return `${num} znak`;
    if (mod100 === 2) return `${num} znaka`;
    if (mod100 === 3 || mod100 === 4) return `${num} znaki`;
    return `${num} znakov`;
  },
  numCharactersRemaining: num => {
    const mod100 = num % 100;
    if (mod100 === 1) return `Preostane ${num} znak`;
    if (mod100 === 2) return `Preostaneta ${num} znaka`;
    if (mod100 === 3 || mod100 === 4) return `Preostanejo ${num} znaki`;
    return `Preostane ${num} znakov`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nobena možnost ni izbrana';
    if (num === 1) return '1 možnost izbrana';
    if (num === 2) return '2 možnosti izbrani';
    if (num === 3 || num === 4) return `${num} možnosti izbrane`;
    return `${num} možnosti izbranih`;
  },
  numRowsCopied: num => {
    const mod100 = num % 100;
    if (mod100 === 1) return `${num} kopirana vrstica`;
    if (mod100 === 2) return `${num} kopirani vrstici`;
    if (mod100 === 3 || mod100 === 4) return `${num} kopirane vrstice`;
    return `${num} kopiranih vrstic`;
  },
  numRowsSelected: num => {
    const mod100 = num % 100;
    if (mod100 === 1) return `${num} izbrana vrstica`;
    if (mod100 === 2) return `${num} izbrani vrstici`;
    if (mod100 === 3 || mod100 === 4) return `${num} izbrane vrstice`;
    return `${num} izbranih vrstic`;
  },
  pageXOfY: (page, total) => `Stran ${page} od ${total}`,
  pagination: 'Oštevilčevanje strani',
  pause: 'Premor',
  pauseAnimation: 'Zaustavi animacijo',
  pictureInPicture: 'Slika v sliki',
  pinLeft: 'Pripni levo',
  pinRight: 'Pripni desno',
  play: 'Predvajaj',
  playAnimation: 'Predvajaj animacijo',
  playbackSpeed: 'Hitrost predvajanja',
  playlist: 'Seznam predvajanja',
  pm: 'PM',
  previousDecade: 'Prejšnje desetletje',
  previousMonth: 'Prejšnji mesec',
  previousPage: 'Prejšnja stran',
  previousSlide: 'Prejšnji diapozitiv',
  previousVideo: 'Prejšnji videoposnetek',
  previousYear: 'Prejšnje leto',
  progress: 'Napredek',
  rangeTooLong: max => {
    const mod100 = max % 100;
    if (mod100 === 1) return `Izberite obdobje, ki ni daljše od ${max} dneva`;
    if (mod100 === 2) return `Izberite obdobje, ki ni daljše od ${max} dni`;
    if (mod100 === 3 || mod100 === 4) return `Izberite obdobje, ki ni daljše od ${max} dni`;
    return `Izberite obdobje, ki ni daljše od ${max} dni`;
  },
  rangeTooShort: min => {
    const mod100 = min % 100;
    if (mod100 === 1) return `Izberite obdobje, dolgo vsaj ${min} dan`;
    if (mod100 === 2) return `Izberite obdobje, dolgo vsaj ${min} dneva`;
    if (mod100 === 3 || mod100 === 4) return `Izberite obdobje, dolgo vsaj ${min} dni`;
    return `Izberite obdobje, dolgo vsaj ${min} dni`;
  },
  readonly: 'Samo za branje',
  remove: 'Odstrani',
  resetColumns: 'Ponastavi stolpce',
  resize: 'Spremeni velikost',
  resizeColumn: 'Spremeni velikost stolpca',
  rowsPerPage: 'Vrstic na stran',
  scrollableRegion: 'Področje za drsenje',
  scrollToEnd: 'Pomakni se na konec',
  scrollToStart: 'Pomakni se na začetek',
  search: 'Iskanje',
  second: 'Sekunda',
  seek: 'Išči',
  seekProgress: (current, duration) => `${current} od ${duration}`,
  selectAColorFromTheScreen: 'Izberite barvo z zaslona',
  selectAllRows: 'Izberi vse vrstice',
  selected: 'Izbrano',
  selectedDateLabel: date => `Izbrano: ${date}`,
  selectedRangeLabel: range => `Izbrano obdobje: ${range}`,
  selectGroup: 'Izberi skupino',
  selectionCleared: 'Izbira počiščena',
  selectRow: 'Izberi vrstico',
  showingNofMRows: (shown, total) => `Prikazanih ${shown} od ${total} vrstic`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} od ${total}`,
  showPassword: 'Prikaži geslo',
  slideNum: slide => `Diapozitiv ${slide}`,
  sortAscending: 'Razvrsti naraščajoče',
  sortColumn: 'Razvrsti stolpec',
  sortDescending: 'Razvrsti padajoče',
  startDate: 'Začetni datum',
  time: 'Čas',
  timeInputKeyboardHelp:
    'S puščičnimi tipkami spreminjajte vrednosti; pritisnite Alt+Puščica navzdol za odpiranje izbirnika časa.',
  today: 'Danes',
  toggleColorFormat: 'Preklopi format barve',
  unmute: 'Vklopi zvok',
  unpin: 'Odpni',
  unpinColumn: 'Odpni stolpec',
  videoPlayer: 'Videopredvajalnik',
  volume: 'Glasnost',
  year: 'Leto',
  zoomIn: 'Povečaj',
  zoomOut: 'Pomanjšaj',
};

registerTranslation(translation);

export default translation;
