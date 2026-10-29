import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hr',
  $name: 'Hrvatski',
  $dir: 'ltr',

  alignCenter: 'Poravnaj po sredini',
  alignEnd: 'Poravnaj na kraj',
  alignJustify: 'Obostrano poravnaj',
  alignment: 'Poravnanje',
  alignStart: 'Poravnaj na početak',
  allTagsRemoved: 'Sve oznake uklonjene',
  alternativeText: 'Alternativni tekst',
  am: 'AM',
  apply: 'Primijeni',
  autosizeColumn: 'Automatski prilagodi veličinu stupca',
  blockquote: 'Citat',
  bold: 'Podebljano',
  bulletList: 'Popis s grafičkim oznakama',
  caption: 'Natpis',
  captions: 'Titlovi',
  carousel: 'Vrtuljak',
  chooseDate: 'Odaberi datum',
  chooseDecade: 'Odaberi desetljeće',
  chooseMonth: 'Odaberi mjesec',
  chooseTime: 'Odaberi vrijeme',
  chooseYear: 'Odaberi godinu',
  clearEntry: 'Očisti unos',
  clearFilter: 'Poništi filtar',
  clearFormatting: 'Očisti oblikovanje',
  clearSort: 'Poništi sortiranje',
  close: 'Zatvori',
  closeCalendar: 'Zatvori kalendar',
  closeTimeInput: 'Zatvori birač vremena',
  code: 'Kod',
  codeBlock: 'Blok koda',
  collapseRow: 'Sažmi redak',
  colorBlue: 'Plava',
  colorGray: 'Siva',
  colorGreen: 'Zelena',
  colorOrange: 'Narančasta',
  colorPink: 'Ružičasta',
  colorPurple: 'Ljubičasta',
  colorRed: 'Crvena',
  colorYellow: 'Žuta',
  columnMenu: 'Opcije stupca',
  columnMovedToPosition: (label, position, total) => `${label} premješten na poziciju ${position} od ${total}`,
  columns: 'Stupci',
  compactPageXOfY: (page, total) => `${page} od ${total}`,
  completed: 'Dovršeno',
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
  deleteColumn: 'Izbriši stupac',
  deleteRow: 'Izbriši redak',
  deleteTable: 'Izbriši tablicu',
  deselectAllRows: 'Poništi odabir svih redaka',
  disabled: 'Onemogućeno',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  editEmbed: 'Uredi ugrađeni sadržaj',
  editImage: 'Uredi sliku',
  editLink: 'Uredi poveznicu',
  embed: 'Ugrađeni sadržaj',
  embedPlaceholder: 'Zalijepite URL ili kod za ugradnju',
  embedRemoved: 'Ugrađeni sadržaj uklonjen',
  embedUrl: 'URL za ugradnju',
  empty: 'Prazno',
  endDate: 'Datum završetka',
  enterAtLeastNumCharacters: min => {
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 === 1 && mod100 !== 11) return `Unesite najmanje ${min} znak`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Unesite najmanje ${min} znaka`;
    return `Unesite najmanje ${min} znakova`;
  },
  enterFullscreen: 'Uđi u cijeli zaslon',
  enterUpToNumCharacters: max => {
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 === 1 && mod100 !== 11) return `Unesite najviše ${max} znak`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Unesite najviše ${max} znaka`;
    return `Unesite najviše ${max} znakova`;
  },
  error: 'Greška',
  exitFullscreen: 'Izađi iz cijelog zaslona',
  expandRow: 'Proširi redak',
  filterByColumn: label => `Filtriraj po stupcu ${label}`,
  filterFrom: 'Od',
  filterMax: 'Maks',
  filterMin: 'Min',
  filterTo: 'Do',
  firstPage: 'Prva stranica',
  formatMenu: 'Više oblikovanja',
  formatting: 'Oblikovanje',
  goToSlide: (slide, count) => `Idi na slajd ${slide} od ${count}`,
  heading: 'Naslov',
  headingLevel: level => `Naslov ${level}`,
  hideColumn: 'Sakrij stupac',
  hidePassword: 'Sakrij lozinku',
  highlight: 'Isticanje',
  highlightColor: 'Boja isticanja',
  horizontalRule: 'Vodoravna crta',
  hour: 'Sat',
  image: 'Slika',
  imageRemoved: 'Slika uklonjena',
  imageUrl: 'URL slike',
  incompleteDate: 'Unesite valjani datum.',
  increment: 'Povećaj',
  indent: 'Povećaj uvlaku',
  insertColumnAfter: 'Umetni stupac iza',
  insertColumnBefore: 'Umetni stupac ispred',
  insertEmbed: 'Umetni ugrađeni sadržaj',
  insertImage: 'Umetni sliku',
  insertLink: 'Umetni poveznicu',
  insertRowAbove: 'Umetni redak iznad',
  insertRowBelow: 'Umetni redak ispod',
  insertTable: 'Umetni tablicu',
  insertTableOfSize: (rows, columns) => `Umetni tablicu ${rows} puta ${columns}`,
  italic: 'Kurziv',
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
  keyAlt: 'Alt',
  keyCtrl: 'Ctrl',
  keyShift: 'Shift',
  lastPage: 'Posljednja stranica',
  link: 'Poveznica',
  linkRemoved: 'Poveznica uklonjena',
  linkUrl: 'URL poveznice',
  lists: 'Popisi',
  loading: 'Učitavanje',
  locked: 'Zaključano',
  mergeCells: 'Spoji ćelije',
  minute: 'Minuta',
  month: 'Mjesec',
  moreOptions: 'Više opcija',
  moveColumnAfter: 'Pomakni stupac na sljedeće mjesto',
  moveColumnBefore: 'Pomakni stupac na prethodno mjesto',
  moveRowDown: 'Pomakni redak dolje',
  moveRowUp: 'Pomakni redak gore',
  mute: 'Utišaj',
  nextDecade: 'Sljedeće desetljeće',
  nextMonth: 'Sljedeći mjesec',
  nextPage: 'Sljedeća stranica',
  nextSlide: 'Sljedeći slajd',
  nextVideo: 'Sljedeći video',
  nextYear: 'Sljedeća godina',
  noData: 'Nema podataka',
  noOptions: 'Nema opcija',
  noResults: 'Nema odgovarajućih rezultata',
  noSuggestions: 'Nema prijedloga',
  notCompleted: 'Nije dovršeno',
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
  numOptionsAvailable: num => {
    if (num === 0) return 'Nema dostupnih opcija';
    if (num === 1) return '1 opcija je dostupna';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} opcije su dostupne`;
    return `${num} opcija je dostupno`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nije odabrana nijedna opcija';
    if (num === 1) return '1 opcija je odabrana';
    return `${num} odabranih opcija`;
  },
  numRowsCopied: num => {
    if (num === 1) return '1 redak kopiran';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} retka kopirana`;
    return `${num} redaka kopirano`;
  },
  numRowsSelected: num => {
    if (num === 1) return '1 redak odabran';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} retka odabrana`;
    return `${num} redaka odabrano`;
  },
  openInNewTab: 'Otvori u novoj kartici',
  openLink: 'Otvori poveznicu',
  optionPosition: (label, position, total) => `${label}, ${position} od ${total}`,
  optionsLoadError: 'Opcije se ne mogu učitati',
  orderedList: 'Numerirani popis',
  outdent: 'Smanji uvlaku',
  pageXOfY: (page, total) => `Stranica ${page} od ${total}`,
  pagination: 'Straničenje',
  paragraph: 'Odlomak',
  pasteAsPlainText: 'Zalijepi kao običan tekst',
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
  redo: 'Ponovi',
  remove: 'Makni',
  removeColors: 'Ukloni boje',
  removeLink: 'Ukloni poveznicu',
  resetColumns: 'Vrati zadane stupce',
  resize: 'Promijeni veličinu',
  resizeColumn: 'Promijeni veličinu stupca',
  rowsAndColumns: (rows, columns) => {
    const plural = (num: number, one: string, few: string, many: string) => {
      const mod10 = num % 10;
      const mod100 = num % 100;
      if (mod10 === 1 && mod100 !== 11) return one;
      if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
      return many;
    };
    return `${rows} ${plural(rows, 'redak', 'retka', 'redaka')}, ${columns} ${plural(columns, 'stupac', 'stupca', 'stupaca')}`;
  },
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
  selectCell: 'Odaberi ćeliju',
  selected: 'Odabrano',
  selectedDateLabel: date => `Odabrano: ${date}`,
  selectedRangeLabel: range => `Odabrani raspon: ${range}`,
  selectGroup: 'Odaberi grupu',
  selectionCleared: 'Odabir poništen',
  selectRow: 'Odaberi redak',
  selectTable: 'Odaberi tablicu',
  showingNofMRows: (shown, total) => `Prikazuje se ${shown} od ${total} redaka`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} od ${total}`,
  showPassword: 'Pokaži lozinku',
  slideNum: slide => `Slajd ${slide}`,
  sortAscending: 'Sortiraj uzlazno',
  sortColumn: 'Sortiraj stupac',
  sortDescending: 'Sortiraj silazno',
  splitCell: 'Podijeli ćeliju',
  startDate: 'Datum početka',
  steps: 'Koraci',
  stepXOfY: (step, total) => `Korak ${step} od ${total}`,
  strikethrough: 'Precrtano',
  subscript: 'Indeks',
  suggestions: 'Prijedlozi',
  suggestionsAvailable: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `${count} prijedlog je dostupan`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${count} prijedloga su dostupna`;
    return `${count} prijedloga je dostupno`;
  },
  suggestionsLoadError: 'Prijedlozi se nisu mogli učitati',
  superscript: 'Eksponent',
  tableInserted: 'Tablica umetnuta',
  tableOptions: 'Opcije tablice',
  tableSize: 'Veličina tablice',
  tagAdded: tag => `${tag} dodano`,
  tagAlreadyAdded: tag => `Oznaka ${tag} već postoji`,
  tagInputKeyboardHelp: 'Pritisnite Backspace ili Delete za uklanjanje ove oznake.',
  tagRemoved: tag => `${tag} uklonjeno`,
  textColor: 'Boja teksta',
  textStyle: 'Stil teksta',
  time: 'Vrijeme',
  timeInputKeyboardHelp:
    'Strelicama mijenjajte vrijednosti; pritisnite Alt+Strelica dolje za otvaranje birača vremena.',
  title: 'Naslov',
  today: 'Danas',
  toggleColorFormat: 'Zamijeni format boje',
  toggleHeaderColumn: 'Stupac zaglavlja',
  toggleHeaderRow: 'Redak zaglavlja',
  tooFewTags: min => {
    if (min === 1) return 'Dodajte najmanje 1 oznaku';
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Dodajte najmanje ${min} oznake`;
    return `Dodajte najmanje ${min} oznaka`;
  },
  tooManyTags: max => {
    if (max === 1) return 'Dodajte najviše 1 oznaku';
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Dodajte najviše ${max} oznake`;
    return `Dodajte najviše ${max} oznaka`;
  },
  underline: 'Podcrtano',
  undo: 'Poništi',
  unmute: 'Uključi zvuk',
  unpin: 'Otkvači',
  unpinColumn: 'Otkvači stupac',
  url: 'URL',
  videoPlayer: 'Video player',
  volume: 'Glasnoća',
  wrapTextEnd: 'Slika na kraju, tekst se prelama oko nje',
  wrapTextStart: 'Slika na početku, tekst se prelama oko nje',
  year: 'Godina',
  zoomIn: 'Povećaj',
  zoomOut: 'Smanji',
};

registerTranslation(translation);

export default translation;
