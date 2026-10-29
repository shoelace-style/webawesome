import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sl',
  $name: 'Slovenski',
  $dir: 'ltr',

  alignCenter: 'Poravnaj na sredino',
  alignEnd: 'Poravnaj na konec',
  alignJustify: 'Obojestranska poravnava',
  alignment: 'Poravnava',
  alignStart: 'Poravnaj na začetek',
  allTagsRemoved: 'Vse oznake odstranjene',
  alternativeText: 'Nadomestno besedilo',
  am: 'AM',
  apply: 'Uporabi',
  autosizeColumn: 'Samodejno prilagodi velikost stolpca',
  blockquote: 'Citat',
  bold: 'Krepko',
  bulletList: 'Označeni seznam',
  caption: 'Napis',
  captions: 'Podnapisi',
  carousel: 'Vrtiljak',
  chooseDate: 'Izberite datum',
  chooseDecade: 'Izberite desetletje',
  chooseMonth: 'Izberite mesec',
  chooseTime: 'Izberite čas',
  chooseYear: 'Izberite leto',
  clearEntry: 'Počisti vnos',
  clearFilter: 'Počisti filter',
  clearFormatting: 'Počisti oblikovanje',
  clearSort: 'Počisti razvrščanje',
  close: 'Zapri',
  closeCalendar: 'Zapri koledar',
  closeTimeInput: 'Zapri izbirnik časa',
  code: 'Koda',
  codeBlock: 'Blok kode',
  collapseRow: 'Strni vrstico',
  colorBlue: 'Modra',
  colorGray: 'Siva',
  colorGreen: 'Zelena',
  colorOrange: 'Oranžna',
  colorPink: 'Rožnata',
  colorPurple: 'Vijolična',
  colorRed: 'Rdeča',
  colorYellow: 'Rumena',
  columnMenu: 'Možnosti stolpca',
  columnMovedToPosition: (label, position, total) => `${label} premaknjen na položaj ${position} od ${total}`,
  columns: 'Stolpci',
  compactPageXOfY: (page, total) => `${page} od ${total}`,
  completed: 'Dokončano',
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
  deleteColumn: 'Izbriši stolpec',
  deleteRow: 'Izbriši vrstico',
  deleteTable: 'Izbriši tabelo',
  deselectAllRows: 'Prekliči izbiro vseh vrstic',
  disabled: 'Onemogočeno',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  editEmbed: 'Uredi vdelano vsebino',
  editImage: 'Uredi sliko',
  editLink: 'Uredi povezavo',
  embed: 'Vdelana vsebina',
  embedPlaceholder: 'Prilepite URL ali kodo za vdelavo',
  embedRemoved: 'Vdelana vsebina odstranjena',
  embedUrl: 'URL vdelane vsebine',
  empty: 'Prazno',
  endDate: 'Končni datum',
  enterAtLeastNumCharacters: min => {
    const mod100 = min % 100;
    if (mod100 === 1) return `Vnesite vsaj ${min} znak`;
    if (mod100 === 2) return `Vnesite vsaj ${min} znaka`;
    if (mod100 === 3 || mod100 === 4) return `Vnesite vsaj ${min} znake`;
    return `Vnesite vsaj ${min} znakov`;
  },
  enterFullscreen: 'Vstopi v celozaslonski način',
  enterUpToNumCharacters: max => {
    const mod100 = max % 100;
    if (mod100 === 1) return `Vnesite največ ${max} znak`;
    if (mod100 === 2) return `Vnesite največ ${max} znaka`;
    if (mod100 === 3 || mod100 === 4) return `Vnesite največ ${max} znake`;
    return `Vnesite največ ${max} znakov`;
  },
  error: 'Napaka',
  exitFullscreen: 'Zapusti celozaslonski način',
  expandRow: 'Razširi vrstico',
  filterByColumn: label => `Filtriraj po ${label}`,
  filterFrom: 'Od',
  filterMax: 'Najv.',
  filterMin: 'Najm.',
  filterTo: 'Do',
  firstPage: 'Prva stran',
  formatMenu: 'Več oblikovanja',
  formatting: 'Oblikovanje',
  goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
  heading: 'Naslov',
  headingLevel: level => `Naslov ${level}`,
  hideColumn: 'Skrij stolpec',
  hidePassword: 'Skrij geslo',
  highlight: 'Označevanje',
  highlightColor: 'Barva označevanja',
  horizontalRule: 'Vodoravna črta',
  hour: 'Ura',
  image: 'Slika',
  imageRemoved: 'Slika odstranjena',
  imageUrl: 'URL slike',
  incompleteDate: 'Vnesite veljaven datum.',
  increment: 'Povečaj',
  indent: 'Povečaj zamik',
  insertColumnAfter: 'Vstavi stolpec za trenutnim',
  insertColumnBefore: 'Vstavi stolpec pred trenutnim',
  insertEmbed: 'Vstavi vdelano vsebino',
  insertImage: 'Vstavi sliko',
  insertLink: 'Vstavi povezavo',
  insertRowAbove: 'Vstavi vrstico zgoraj',
  insertRowBelow: 'Vstavi vrstico spodaj',
  insertTable: 'Vstavi tabelo',
  insertTableOfSize: (rows, columns) => `Vstavi tabelo ${rows} × ${columns}`,
  italic: 'Ležeče',
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
  keyAlt: 'Alt',
  keyCtrl: 'Ctrl',
  keyShift: 'Shift',
  lastPage: 'Zadnja stran',
  link: 'Povezava',
  linkRemoved: 'Povezava odstranjena',
  linkUrl: 'URL povezave',
  lists: 'Seznami',
  loading: 'Nalaganje',
  locked: 'Zaklenjeno',
  mergeCells: 'Združi celice',
  minute: 'Minuta',
  month: 'Mesec',
  moreOptions: 'Več možnosti',
  moveColumnAfter: 'Premakni stolpec naprej',
  moveColumnBefore: 'Premakni stolpec nazaj',
  moveRowDown: 'Premakni vrstico navzdol',
  moveRowUp: 'Premakni vrstico navzgor',
  mute: 'Utišaj',
  nextDecade: 'Naslednje desetletje',
  nextMonth: 'Naslednji mesec',
  nextPage: 'Naslednja stran',
  nextSlide: 'Naslednji diapozitiv',
  nextVideo: 'Naslednji videoposnetek',
  nextYear: 'Naslednje leto',
  noData: 'Ni podatkov',
  noOptions: 'Ni možnosti',
  noResults: 'Ni ustreznih rezultatov',
  noSuggestions: 'Ni predlogov',
  notCompleted: 'Ni dokončano',
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
  numOptionsAvailable: num => {
    if (num === 0) return 'Ni razpoložljivih možnosti';
    const mod100 = num % 100;
    if (mod100 === 1) return `Na voljo je ${num} možnost`;
    if (mod100 === 2) return `Na voljo sta ${num} možnosti`;
    if (mod100 === 3 || mod100 === 4) return `Na voljo so ${num} možnosti`;
    return `Na voljo je ${num} možnosti`;
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
  openInNewTab: 'Odpri v novem zavihku',
  openLink: 'Odpri povezavo',
  optionPosition: (label, position, total) => `${label}, ${position} od ${total}`,
  optionsLoadError: 'Možnosti ni bilo mogoče naložiti',
  orderedList: 'Oštevilčeni seznam',
  outdent: 'Zmanjšaj zamik',
  pageXOfY: (page, total) => `Stran ${page} od ${total}`,
  pagination: 'Oštevilčevanje strani',
  paragraph: 'Odstavek',
  pasteAsPlainText: 'Prilepi kot navadno besedilo',
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
  redo: 'Uveljavi',
  remove: 'Odstrani',
  removeColors: 'Odstrani barve',
  removeLink: 'Odstrani povezavo',
  resetColumns: 'Ponastavi stolpce',
  resize: 'Spremeni velikost',
  resizeColumn: 'Spremeni velikost stolpca',
  rowsAndColumns: (rows, columns) => {
    const plural = (n: number, one: string, two: string, few: string, many: string) => {
      const mod100 = n % 100;
      if (mod100 === 1) return `${n} ${one}`;
      if (mod100 === 2) return `${n} ${two}`;
      if (mod100 === 3 || mod100 === 4) return `${n} ${few}`;
      return `${n} ${many}`;
    };
    return `${plural(rows, 'vrstica', 'vrstici', 'vrstice', 'vrstic')}, ${plural(columns, 'stolpec', 'stolpca', 'stolpci', 'stolpcev')}`;
  },
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
  selectCell: 'Izberi celico',
  selected: 'Izbrano',
  selectedDateLabel: date => `Izbrano: ${date}`,
  selectedRangeLabel: range => `Izbrano obdobje: ${range}`,
  selectGroup: 'Izberi skupino',
  selectionCleared: 'Izbira počiščena',
  selectRow: 'Izberi vrstico',
  selectTable: 'Izberi tabelo',
  showingNofMRows: (shown, total) => `Prikazanih ${shown} od ${total} vrstic`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} od ${total}`,
  showPassword: 'Prikaži geslo',
  slideNum: slide => `Diapozitiv ${slide}`,
  sortAscending: 'Razvrsti naraščajoče',
  sortColumn: 'Razvrsti stolpec',
  sortDescending: 'Razvrsti padajoče',
  splitCell: 'Razdeli celico',
  startDate: 'Začetni datum',
  steps: 'Koraki',
  stepXOfY: (step, total) => `Korak ${step} od ${total}`,
  strikethrough: 'Prečrtano',
  subscript: 'Podpisano',
  suggestions: 'Predlogi',
  suggestionsAvailable: count => {
    const mod100 = count % 100;
    if (mod100 === 1) return `Na voljo je ${count} predlog`;
    if (mod100 === 2) return `Na voljo sta ${count} predloga`;
    if (mod100 === 3 || mod100 === 4) return `Na voljo so ${count} predlogi`;
    return `Na voljo je ${count} predlogov`;
  },
  suggestionsLoadError: 'Predlogov ni bilo mogoče naložiti',
  superscript: 'Nadpisano',
  tableInserted: 'Tabela vstavljena',
  tableOptions: 'Možnosti tabele',
  tableSize: 'Velikost tabele',
  tagAdded: tag => `${tag} dodano`,
  tagAlreadyAdded: tag => `Oznaka ${tag} že obstaja`,
  tagInputKeyboardHelp: 'Pritisnite Backspace ali Delete, da odstranite to oznako.',
  tagRemoved: tag => `${tag} odstranjeno`,
  textColor: 'Barva besedila',
  textStyle: 'Slog besedila',
  time: 'Čas',
  timeInputKeyboardHelp:
    'S puščičnimi tipkami spreminjajte vrednosti; pritisnite Alt+Puščica navzdol za odpiranje izbirnika časa.',
  title: 'Naslov',
  today: 'Danes',
  toggleColorFormat: 'Preklopi format barve',
  toggleHeaderColumn: 'Naslovni stolpec',
  toggleHeaderRow: 'Naslovna vrstica',
  tooFewTags: min => {
    const mod100 = min % 100;
    if (mod100 === 1) return `Dodajte vsaj ${min} oznako`;
    if (mod100 === 2) return `Dodajte vsaj ${min} oznaki`;
    if (mod100 === 3 || mod100 === 4) return `Dodajte vsaj ${min} oznake`;
    return `Dodajte vsaj ${min} oznak`;
  },
  tooManyTags: max => {
    const mod100 = max % 100;
    if (mod100 === 1) return `Dodajte največ ${max} oznako`;
    if (mod100 === 2) return `Dodajte največ ${max} oznaki`;
    if (mod100 === 3 || mod100 === 4) return `Dodajte največ ${max} oznake`;
    return `Dodajte največ ${max} oznak`;
  },
  underline: 'Podčrtano',
  undo: 'Razveljavi',
  unmute: 'Vklopi zvok',
  unpin: 'Odpni',
  unpinColumn: 'Odpni stolpec',
  url: 'URL',
  videoPlayer: 'Videopredvajalnik',
  volume: 'Glasnost',
  wrapTextEnd: 'Slika na koncu, besedilo jo obliva',
  wrapTextStart: 'Slika na začetku, besedilo jo obliva',
  year: 'Leto',
  zoomIn: 'Povečaj',
  zoomOut: 'Pomanjšaj',
};

registerTranslation(translation);

export default translation;
