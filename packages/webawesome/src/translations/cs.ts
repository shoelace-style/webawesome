import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'cs',
  $name: 'Čeština',
  $dir: 'ltr',

  alignCenter: 'Zarovnat na střed',
  alignEnd: 'Zarovnat na konec',
  alignJustify: 'Zarovnat do bloku',
  alignment: 'Zarovnání',
  alignStart: 'Zarovnat na začátek',
  allTagsRemoved: 'Všechny štítky odebrány',
  alternativeText: 'Alternativní text',
  am: 'dop.',
  apply: 'Použít',
  autosizeColumn: 'Přizpůsobit šířku obsahu',
  blockquote: 'Citace',
  bold: 'Tučné',
  bulletList: 'Odrážkový seznam',
  caption: 'Popisek',
  captions: 'Titulky',
  carousel: 'Karusel',
  chooseDate: 'Vyberte datum',
  chooseDecade: 'Vyberte desetiletí',
  chooseMonth: 'Vyberte měsíc',
  chooseTime: 'Vyberte čas',
  chooseYear: 'Vyberte rok',
  clearEntry: 'Smazat položku',
  clearFilter: 'Zrušit filtr',
  clearFormatting: 'Vymazat formátování',
  clearSort: 'Zrušit řazení',
  close: 'Zavřít',
  closeCalendar: 'Zavřít kalendář',
  closeTimeInput: 'Zavřít výběr času',
  code: 'Kód',
  codeBlock: 'Blok kódu',
  collapseRow: 'Sbalit řádek',
  colorBlue: 'Modrá',
  colorGray: 'Šedá',
  colorGreen: 'Zelená',
  colorOrange: 'Oranžová',
  colorPink: 'Růžová',
  colorPurple: 'Fialová',
  colorRed: 'Červená',
  colorYellow: 'Žlutá',
  columnMenu: 'Možnosti sloupce',
  columnMovedToPosition: (label, position, total) => `${label} přesunut na pozici ${position} z ${total}`,
  columns: 'Sloupce',
  compactPageXOfY: (page, total) => `${page} z ${total}`,
  completed: 'Dokončeno',
  copied: 'Zkopírováno',
  copy: 'Kopírovat',
  createOption: value => `Vytvořit "${value}"`,
  currentlyPlaying: 'právě se přehrává',
  currentValue: 'Současná hodnota',
  date: 'Datum',
  datePickerKeyboardHelp: 'Pomocí šipek změňte hodnoty; stisknutím Alt+Šipka dolů otevřete kalendář.',
  day: 'Den',
  dayPeriod: 'dop./odp.',
  decrement: 'Snížit',
  deleteColumn: 'Odstranit sloupec',
  deleteRow: 'Odstranit řádek',
  deleteTable: 'Odstranit tabulku',
  deselectAllRows: 'Zrušit výběr všech řádků',
  disabled: 'Zakázáno',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  editEmbed: 'Upravit vložený obsah',
  editImage: 'Upravit obrázek',
  editLink: 'Upravit odkaz',
  embed: 'Vložený obsah',
  embedPlaceholder: 'Vložte URL nebo kód pro vložení',
  embedRemoved: 'Vložený obsah odstraněn',
  embedUrl: 'URL vloženého obsahu',
  empty: 'Prázdné',
  endDate: 'Datum ukončení',
  enterAtLeastNumCharacters: min => {
    if (min === 1) return 'Zadejte alespoň 1 znak';
    if (min >= 2 && min <= 4) return `Zadejte alespoň ${min} znaky`;
    return `Zadejte alespoň ${min} znaků`;
  },
  enterFullscreen: 'Přejít na celou obrazovku',
  enterUpToNumCharacters: max => {
    if (max === 1) return 'Zadejte nejvýše 1 znak';
    if (max >= 2 && max <= 4) return `Zadejte nejvýše ${max} znaky`;
    return `Zadejte nejvýše ${max} znaků`;
  },
  error: 'Chyba',
  exitFullscreen: 'Ukončit celou obrazovku',
  expandRow: 'Rozbalit řádek',
  filterByColumn: label => `Filtrovat podle: ${label}`,
  filterFrom: 'Od',
  filterMax: 'Max',
  filterMin: 'Min',
  filterTo: 'Do',
  firstPage: 'První stránka',
  formatMenu: 'Další formátování',
  formatting: 'Formátování',
  goToSlide: (slide, count) => `Přejít na slide ${slide} z ${count}`,
  heading: 'Nadpis',
  headingLevel: level => `Nadpis ${level}`,
  hideColumn: 'Skrýt sloupec',
  hidePassword: 'Skrýt heslo',
  highlight: 'Zvýraznit',
  highlightColor: 'Barva zvýraznění',
  horizontalRule: 'Vodorovná čára',
  hour: 'Hodina',
  image: 'Obrázek',
  imageRemoved: 'Obrázek odstraněn',
  imageUrl: 'URL obrázku',
  incompleteDate: 'Zadejte platné datum.',
  increment: 'Zvýšit',
  indent: 'Zvětšit odsazení',
  insertColumnAfter: 'Vložit sloupec za',
  insertColumnBefore: 'Vložit sloupec před',
  insertEmbed: 'Přidat vložený obsah',
  insertImage: 'Vložit obrázek',
  insertLink: 'Vložit odkaz',
  insertRowAbove: 'Vložit řádek nad',
  insertRowBelow: 'Vložit řádek pod',
  insertTable: 'Vložit tabulku',
  insertTableOfSize: (rows, columns) => `Vložit tabulku ${rows} × ${columns}`,
  italic: 'Kurzíva',
  jumpBackwardX: count => {
    if (count === 1) return 'Přejít o 1 stránku zpět';
    if (count >= 2 && count <= 4) return `Přejít o ${count} stránky zpět`;
    return `Přejít o ${count} stránek zpět`;
  },
  jumpForwardX: count => {
    if (count === 1) return 'Přejít o 1 stránku vpřed';
    if (count >= 2 && count <= 4) return `Přejít o ${count} stránky vpřed`;
    return `Přejít o ${count} stránek vpřed`;
  },
  keyAlt: 'Alt',
  keyCtrl: 'Ctrl',
  keyShift: 'Shift',
  lastPage: 'Poslední stránka',
  link: 'Odkaz',
  linkRemoved: 'Odkaz odstraněn',
  linkUrl: 'URL odkazu',
  lists: 'Seznamy',
  loading: 'Nahrává se',
  locked: 'Uzamčeno',
  mergeCells: 'Sloučit buňky',
  minute: 'Minuta',
  month: 'Měsíc',
  moreOptions: 'Další možnosti',
  moveColumnAfter: 'Přesunout sloupec na další pozici',
  moveColumnBefore: 'Přesunout sloupec na předchozí pozici',
  moveRowDown: 'Přesunout řádek dolů',
  moveRowUp: 'Přesunout řádek nahoru',
  mute: 'Ztlumit',
  nextDecade: 'Další desetiletí',
  nextMonth: 'Další měsíc',
  nextPage: 'Další stránka',
  nextSlide: 'Další slide',
  nextVideo: 'Další video',
  nextYear: 'Další rok',
  noData: 'Žádná data',
  noOptions: 'Žádné možnosti',
  noResults: 'Žádné odpovídající výsledky',
  noSuggestions: 'Žádné návrhy',
  notCompleted: 'Nedokončeno',
  now: 'Nyní',
  numCharacters: num => {
    if (num === 1) return '1 znak';
    if (num >= 2 && num <= 4) return `${num} znaky`;
    return `${num} znaků`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 zbývající znak';
    if (num >= 2 && num <= 4) return `${num} zbývající znaky`;
    return `${num} zbývajících znaků`;
  },
  numOptionsAvailable: num => {
    if (num === 0) return 'Nejsou k dispozici žádné možnosti';
    if (num === 1) return 'K dispozici je 1 možnost';
    if (num >= 2 && num <= 4) return `K dispozici jsou ${num} možnosti`;
    return `K dispozici je ${num} možností`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nejsou vybrány žádné možnosti';
    if (num === 1) return 'Je vybrána jedna možnost';
    return `Počet vybraných možností: ${num}`;
  },
  numRowsCopied: num => {
    if (num === 1) return 'Byl zkopírován 1 řádek';
    if (num >= 2 && num <= 4) return `Byly zkopírovány ${num} řádky`;
    return `Bylo zkopírováno ${num} řádků`;
  },
  numRowsSelected: num => {
    if (num === 1) return 'Je vybrán 1 řádek';
    if (num >= 2 && num <= 4) return `Jsou vybrány ${num} řádky`;
    return `Je vybráno ${num} řádků`;
  },
  openInNewTab: 'Otevřít na nové kartě',
  openLink: 'Otevřít odkaz',
  optionPosition: (label, position, total) => `${label}, ${position} z ${total}`,
  optionsLoadError: 'Možnosti se nepodařilo načíst',
  orderedList: 'Číslovaný seznam',
  outdent: 'Zmenšit odsazení',
  pageXOfY: (page, total) => `Stránka ${page} z ${total}`,
  pagination: 'Stránkování',
  paragraph: 'Odstavec',
  pasteAsPlainText: 'Vložit jako prostý text',
  pause: 'Pozastavit',
  pauseAnimation: 'Pozastavit animaci',
  pictureInPicture: 'Obraz v obraze',
  pinLeft: 'Připnout vlevo',
  pinRight: 'Připnout vpravo',
  play: 'Přehrát',
  playAnimation: 'Přehrát animaci',
  playbackSpeed: 'Rychlost přehrávání',
  playlist: 'Playlist',
  pm: 'odp.',
  previousDecade: 'Předchozí desetiletí',
  previousMonth: 'Předchozí měsíc',
  previousPage: 'Předchozí stránka',
  previousSlide: 'Předchozí slide',
  previousVideo: 'Předchozí video',
  previousYear: 'Předchozí rok',
  progress: 'Průběh',
  rangeTooLong: max => {
    if (max === 1) return 'Vyberte rozsah nejvýše 1 den';
    if (max >= 2 && max <= 4) return `Vyberte rozsah nejvýše ${max} dny`;
    return `Vyberte rozsah nejvýše ${max} dnů`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Vyberte rozsah dlouhý alespoň 1 den';
    if (min >= 2 && min <= 4) return `Vyberte rozsah dlouhý alespoň ${min} dny`;
    return `Vyberte rozsah dlouhý alespoň ${min} dnů`;
  },
  readonly: 'Jen pro čtení',
  redo: 'Znovu',
  remove: 'Odstranit',
  removeColors: 'Odebrat barvy',
  removeLink: 'Odebrat odkaz',
  resetColumns: 'Obnovit sloupce',
  resize: 'Změnit velikost',
  resizeColumn: 'Změnit šířku sloupce',
  rowsAndColumns: (rows, columns) => `Řádky: ${rows}, sloupce: ${columns}`,
  rowsPerPage: 'Řádků na stránku',
  scrollableRegion: 'Posunovatelná oblast',
  scrollToEnd: 'Scrollovat na konec',
  scrollToStart: 'Scrollovat na začátek',
  search: 'Hledat',
  second: 'Sekunda',
  seek: 'Přejít',
  seekProgress: (current, duration) => `${current} z ${duration}`,
  selectAColorFromTheScreen: 'Vybrat barvu z obrazovky',
  selectAllRows: 'Vybrat všechny řádky',
  selectCell: 'Vybrat buňku',
  selected: 'Vybráno',
  selectedDateLabel: date => `Vybráno: ${date}`,
  selectedRangeLabel: range => `Vybraný rozsah: ${range}`,
  selectGroup: 'Vybrat skupinu',
  selectionCleared: 'Výběr zrušen',
  selectRow: 'Vybrat řádek',
  selectTable: 'Vybrat tabulku',
  showingNofMRows: (shown, total) => `Zobrazeno ${shown} z ${total} řádků`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} z ${total}`,
  showPassword: 'Zobrazit heslo',
  slideNum: slide => `Slide ${slide}`,
  sortAscending: 'Seřadit vzestupně',
  sortColumn: 'Seřadit sloupec',
  sortDescending: 'Seřadit sestupně',
  splitCell: 'Rozdělit buňku',
  startDate: 'Datum zahájení',
  steps: 'Kroky',
  stepXOfY: (step, total) => `Krok ${step} z ${total}`,
  strikethrough: 'Přeškrtnuté',
  subscript: 'Dolní index',
  suggestions: 'Návrhy',
  suggestionsAvailable: count => {
    if (count === 1) return 'K dispozici je 1 návrh';
    if (count >= 2 && count <= 4) return `K dispozici jsou ${count} návrhy`;
    return `K dispozici je ${count} návrhů`;
  },
  suggestionsLoadError: 'Návrhy se nepodařilo načíst',
  superscript: 'Horní index',
  tableInserted: 'Tabulka vložena',
  tableOptions: 'Možnosti tabulky',
  tableSize: 'Velikost tabulky',
  tagAdded: tag => `${tag} přidáno`,
  tagAlreadyAdded: tag => `Štítek ${tag} již existuje`,
  tagInputKeyboardHelp: 'Stisknutím Backspace nebo Delete tento štítek odeberete.',
  tagRemoved: tag => `${tag} odebráno`,
  textColor: 'Barva textu',
  textStyle: 'Styl textu',
  time: 'Čas',
  timeInputKeyboardHelp: 'Pomocí šipek změňte hodnoty; stisknutím Alt+Šipka dolů otevřete výběr času.',
  title: 'Název',
  today: 'Dnes',
  toggleColorFormat: 'Přepnout formát barvy',
  toggleHeaderColumn: 'Sloupec záhlaví',
  toggleHeaderRow: 'Řádek záhlaví',
  tooFewTags: min => {
    if (min === 1) return 'Přidejte alespoň 1 štítek';
    if (min >= 2 && min <= 4) return `Přidejte alespoň ${min} štítky`;
    return `Přidejte alespoň ${min} štítků`;
  },
  tooManyTags: max => {
    if (max === 1) return 'Přidejte nejvýše 1 štítek';
    if (max >= 2 && max <= 4) return `Přidejte nejvýše ${max} štítky`;
    return `Přidejte nejvýše ${max} štítků`;
  },
  underline: 'Podtržené',
  undo: 'Zpět',
  unmute: 'Zapnout zvuk',
  unpin: 'Odepnout',
  unpinColumn: 'Odepnout sloupec',
  url: 'URL',
  videoPlayer: 'Přehrávač videa',
  volume: 'Hlasitost',
  wrapTextEnd: 'Obrázek na konci, text obtéká',
  wrapTextStart: 'Obrázek na začátku, text obtéká',
  year: 'Rok',
  zoomIn: 'Přiblížit',
  zoomOut: 'Oddálit',
};

registerTranslation(translation);

export default translation;
