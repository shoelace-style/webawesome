import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'cs',
  $name: 'Čeština',
  $dir: 'ltr',

  am: 'dop.',
  autosizeColumn: 'Přizpůsobit šířku obsahu',
  captions: 'Titulky',
  carousel: 'Karusel',
  chooseDate: 'Vyberte datum',
  chooseDecade: 'Vyberte desetiletí',
  chooseMonth: 'Vyberte měsíc',
  chooseTime: 'Vyberte čas',
  chooseYear: 'Vyberte rok',
  clearEntry: 'Smazat položku',
  clearSort: 'Zrušit řazení',
  close: 'Zavřít',
  closeCalendar: 'Zavřít kalendář',
  closeTimeInput: 'Zavřít výběr času',
  collapseRow: 'Sbalit řádek',
  columnMenu: 'Možnosti sloupce',
  columnMovedToPosition: (label, position, total) => `${label} přesunut na pozici ${position} z ${total}`,
  columns: 'Sloupce',
  compactPageXOfY: (page, total) => `${page} z ${total}`,
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
  deselectAllRows: 'Zrušit výběr všech řádků',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Prázdné',
  endDate: 'Datum ukončení',
  enterFullscreen: 'Přejít na celou obrazovku',
  error: 'Chyba',
  exitFullscreen: 'Ukončit celou obrazovku',
  expandRow: 'Rozbalit řádek',
  filterByColumn: label => `Filtrovat podle: ${label}`,
  filterMax: 'Max',
  filterMin: 'Min',
  firstPage: 'První stránka',
  goToSlide: (slide, count) => `Přejít na slide ${slide} z ${count}`,
  hideColumn: 'Skrýt sloupec',
  hidePassword: 'Skrýt heslo',
  hour: 'Hodina',
  incompleteDate: 'Zadejte platné datum.',
  increment: 'Zvýšit',
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
  lastPage: 'Poslední stránka',
  loading: 'Nahrává se',
  minute: 'Minuta',
  month: 'Měsíc',
  moreOptions: 'Další možnosti',
  mute: 'Ztlumit',
  nextDecade: 'Další desetiletí',
  nextMonth: 'Další měsíc',
  nextPage: 'Další stránka',
  nextSlide: 'Další slide',
  nextVideo: 'Další video',
  nextYear: 'Další rok',
  noData: 'Žádná data',
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
  numOptionsSelected: num => {
    if (num === 0) return 'Nejsou vybrány žádné možnosti';
    if (num === 1) return 'Je vybrána jedna možnost';
    return `Počet vybraných možností: ${num}`;
  },
  numRowsSelected: num => {
    if (num === 1) return 'Je vybrán 1 řádek';
    if (num >= 2 && num <= 4) return `Jsou vybrány ${num} řádky`;
    return `Je vybráno ${num} řádků`;
  },
  pageXOfY: (page, total) => `Stránka ${page} z ${total}`,
  pagination: 'Stránkování',
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
  remove: 'Odstranit',
  resize: 'Změnit velikost',
  resizeColumn: 'Změnit šířku sloupce',
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
  selected: 'Vybráno',
  selectedDateLabel: date => `Vybráno: ${date}`,
  selectedRangeLabel: range => `Vybraný rozsah: ${range}`,
  selectGroup: 'Vybrat skupinu',
  selectionCleared: 'Výběr zrušen',
  selectRow: 'Vybrat řádek',
  showingNofMRows: (shown, total) => `Zobrazeno ${shown} z ${total} řádků`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} z ${total}`,
  showPassword: 'Zobrazit heslo',
  slideNum: slide => `Slide ${slide}`,
  sortAscending: 'Seřadit vzestupně',
  sortColumn: 'Seřadit sloupec',
  sortDescending: 'Seřadit sestupně',
  startDate: 'Datum zahájení',
  time: 'Čas',
  timeInputKeyboardHelp: 'Pomocí šipek změňte hodnoty; stisknutím Alt+Šipka dolů otevřete výběr času.',
  today: 'Dnes',
  toggleColorFormat: 'Přepnout formát barvy',
  unmute: 'Zapnout zvuk',
  unpin: 'Odepnout',
  unpinColumn: 'Odepnout sloupec',
  videoPlayer: 'Přehrávač videa',
  volume: 'Hlasitost',
  year: 'Rok',
  zoomIn: 'Přiblížit',
  zoomOut: 'Oddálit',
};

registerTranslation(translation);

export default translation;
