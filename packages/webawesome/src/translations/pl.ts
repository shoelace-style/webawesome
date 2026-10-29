import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  alignCenter: 'Wyśrodkuj',
  alignEnd: 'Wyrównaj do końca',
  alignJustify: 'Wyjustuj',
  alignment: 'Wyrównanie',
  alignStart: 'Wyrównaj do początku',
  allTagsRemoved: 'Usunięto wszystkie tagi',
  alternativeText: 'Tekst alternatywny',
  am: 'AM',
  apply: 'Zastosuj',
  autosizeColumn: 'Dopasuj szerokość kolumny',
  blockquote: 'Cytat blokowy',
  bold: 'Pogrubienie',
  bulletList: 'Lista punktowana',
  caption: 'Podpis',
  captions: 'Napisy',
  carousel: 'Karuzela',
  chooseDate: 'Wybierz datę',
  chooseDecade: 'Wybierz dekadę',
  chooseMonth: 'Wybierz miesiąc',
  chooseTime: 'Wybierz godzinę',
  chooseYear: 'Wybierz rok',
  clearEntry: 'Wyczyść wpis',
  clearFilter: 'Wyczyść filtr',
  clearFormatting: 'Wyczyść formatowanie',
  clearSort: 'Wyczyść sortowanie',
  close: 'Zamknij',
  closeCalendar: 'Zamknij kalendarz',
  closeTimeInput: 'Zamknij selektor godziny',
  code: 'Kod',
  codeBlock: 'Blok kodu',
  collapseRow: 'Zwiń wiersz',
  colorBlue: 'Niebieski',
  colorGray: 'Szary',
  colorGreen: 'Zielony',
  colorOrange: 'Pomarańczowy',
  colorPink: 'Różowy',
  colorPurple: 'Fioletowy',
  colorRed: 'Czerwony',
  colorYellow: 'Żółty',
  columnMenu: 'Opcje kolumny',
  columnMovedToPosition: (label, position, total) => `Przeniesiono ${label} na pozycję ${position} z ${total}`,
  columns: 'Kolumny',
  compactPageXOfY: (page, total) => `${page} z ${total}`,
  completed: 'Ukończono',
  copied: 'Skopiowane',
  copy: 'Kopiuj',
  createOption: value => `Utwórz "${value}"`,
  currentlyPlaying: 'aktualnie odtwarzane',
  currentValue: 'Aktualna wartość',
  date: 'Data',
  datePickerKeyboardHelp:
    'Użyj klawiszy strzałek, aby zmienić wartości; naciśnij Alt+Strzałka w dół, aby otworzyć kalendarz.',
  day: 'Dzień',
  dayPeriod: 'AM/PM',
  decrement: 'Zmniejsz',
  deleteColumn: 'Usuń kolumnę',
  deleteRow: 'Usuń wiersz',
  deleteTable: 'Usuń tabelę',
  deselectAllRows: 'Odznacz wszystkie wiersze',
  disabled: 'Wyłączone',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  editEmbed: 'Edytuj osadzoną treść',
  editImage: 'Edytuj obraz',
  editLink: 'Edytuj link',
  embed: 'Osadzona treść',
  embedPlaceholder: 'Wklej adres URL lub kod osadzania',
  embedRemoved: 'Usunięto osadzoną treść',
  embedUrl: 'Adres URL osadzonej treści',
  empty: 'Puste',
  endDate: 'Data końcowa',
  enterAtLeastNumCharacters: min => {
    if (min === 1) return 'Wprowadź co najmniej 1 znak';
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Wprowadź co najmniej ${min} znaki`;
    return `Wprowadź co najmniej ${min} znaków`;
  },
  enterFullscreen: 'Włącz pełny ekran',
  enterUpToNumCharacters: max => {
    if (max === 1) return 'Wprowadź maksymalnie 1 znak';
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Wprowadź maksymalnie ${max} znaki`;
    return `Wprowadź maksymalnie ${max} znaków`;
  },
  error: 'Błąd',
  exitFullscreen: 'Wyłącz pełny ekran',
  expandRow: 'Rozwiń wiersz',
  filterByColumn: label => `Filtruj według: ${label}`,
  filterFrom: 'Od',
  filterMax: 'Maks.',
  filterMin: 'Min.',
  filterTo: 'Do',
  firstPage: 'Pierwsza strona',
  formatMenu: 'Więcej formatowania',
  formatting: 'Formatowanie',
  goToSlide: (slide, count) => `Przejdź do slajdu ${slide} z ${count}`,
  heading: 'Nagłówek',
  headingLevel: level => `Nagłówek ${level}`,
  hideColumn: 'Ukryj kolumnę',
  hidePassword: 'Ukryj hasło',
  highlight: 'Wyróżnienie',
  highlightColor: 'Kolor wyróżnienia',
  horizontalRule: 'Linia pozioma',
  hour: 'Godzina',
  image: 'Obraz',
  imageRemoved: 'Usunięto obraz',
  imageUrl: 'Adres URL obrazu',
  incompleteDate: 'Wprowadź prawidłową datę.',
  increment: 'Zwiększ',
  indent: 'Zwiększ wcięcie',
  insertColumnAfter: 'Wstaw kolumnę za bieżącą',
  insertColumnBefore: 'Wstaw kolumnę przed bieżącą',
  insertEmbed: 'Wstaw osadzoną treść',
  insertImage: 'Wstaw obraz',
  insertLink: 'Wstaw link',
  insertRowAbove: 'Wstaw wiersz powyżej',
  insertRowBelow: 'Wstaw wiersz poniżej',
  insertTable: 'Wstaw tabelę',
  insertTableOfSize: (rows, columns) => `Wstaw tabelę ${rows} × ${columns}`,
  italic: 'Kursywa',
  jumpBackwardX: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Cofnij o ${count} strony`;
    return `Cofnij o ${count} stron`;
  },
  jumpForwardX: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Przejdź o ${count} strony do przodu`;
    return `Przejdź o ${count} stron do przodu`;
  },
  keyAlt: 'Alt',
  keyCtrl: 'Ctrl',
  keyShift: 'Shift',
  lastPage: 'Ostatnia strona',
  link: 'Link',
  linkRemoved: 'Usunięto link',
  linkUrl: 'Adres URL linku',
  lists: 'Listy',
  loading: 'Ładowanie',
  locked: 'Zablokowano',
  mergeCells: 'Scal komórki',
  minute: 'Minuta',
  month: 'Miesiąc',
  moreOptions: 'Więcej opcji',
  moveColumnAfter: 'Przesuń kolumnę do przodu',
  moveColumnBefore: 'Przesuń kolumnę do tyłu',
  moveRowDown: 'Przesuń wiersz w dół',
  moveRowUp: 'Przesuń wiersz w górę',
  mute: 'Wycisz',
  nextDecade: 'Następna dekada',
  nextMonth: 'Następny miesiąc',
  nextPage: 'Następna strona',
  nextSlide: 'Następny slajd',
  nextVideo: 'Następny film',
  nextYear: 'Następny rok',
  noData: 'Brak danych',
  noOptions: 'Brak opcji',
  noResults: 'Brak pasujących wyników',
  noSuggestions: 'Brak sugestii',
  notCompleted: 'Nieukończono',
  now: 'Teraz',
  numCharacters: num => {
    if (num === 1) return '1 znak';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} znaki`;
    return `${num} znaków`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return 'Pozostał 1 znak';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Pozostały ${num} znaki`;
    return `Pozostało ${num} znaków`;
  },
  numOptionsAvailable: num => {
    if (num === 0) return 'Brak dostępnych opcji';
    if (num === 1) return 'Dostępna 1 opcja';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Dostępne ${num} opcje`;
    return `Dostępnych ${num} opcji`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nie wybrano opcji';
    if (num === 1) return 'Wybrano 1 opcję';
    return `Wybrano ${num} opcje`;
  },
  numRowsCopied: num => {
    if (num === 1) return 'Skopiowano 1 wiersz';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Skopiowano ${num} wiersze`;
    return `Skopiowano ${num} wierszy`;
  },
  numRowsSelected: num => {
    if (num === 1) return 'Wybrano 1 wiersz';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Wybrano ${num} wiersze`;
    return `Wybrano ${num} wierszy`;
  },
  openInNewTab: 'Otwórz w nowej karcie',
  openLink: 'Otwórz link',
  optionPosition: (label, position, total) => `${label}, ${position} z ${total}`,
  optionsLoadError: 'Nie udało się wczytać opcji',
  orderedList: 'Lista numerowana',
  outdent: 'Zmniejsz wcięcie',
  pageXOfY: (page, total) => `Strona ${page} z ${total}`,
  pagination: 'Paginacja',
  paragraph: 'Akapit',
  pasteAsPlainText: 'Wklej jako zwykły tekst',
  pause: 'Wstrzymaj',
  pauseAnimation: 'Wstrzymaj animację',
  pictureInPicture: 'Obraz w obrazie',
  pinLeft: 'Przypnij do lewej',
  pinRight: 'Przypnij do prawej',
  play: 'Odtwórz',
  playAnimation: 'Odtwórz animację',
  playbackSpeed: 'Prędkość odtwarzania',
  playlist: 'Lista odtwarzania',
  pm: 'PM',
  previousDecade: 'Poprzednia dekada',
  previousMonth: 'Poprzedni miesiąc',
  previousPage: 'Poprzednia strona',
  previousSlide: 'Poprzedni slajd',
  previousVideo: 'Poprzedni film',
  previousYear: 'Poprzedni rok',
  progress: 'Postęp',
  rangeTooLong: max => {
    if (max === 1) return 'Wybierz zakres nie dłuższy niż 1 dzień';
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Wybierz zakres nie dłuższy niż ${max} dni`;
    return `Wybierz zakres nie dłuższy niż ${max} dni`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Wybierz zakres o długości co najmniej 1 dnia';
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14))
      return `Wybierz zakres o długości co najmniej ${min} dni`;
    return `Wybierz zakres o długości co najmniej ${min} dni`;
  },
  readonly: 'Tylko do odczytu',
  redo: 'Ponów',
  remove: 'Usunąć',
  removeColors: 'Usuń kolory',
  removeLink: 'Usuń link',
  resetColumns: 'Resetuj kolumny',
  resize: 'Zmień rozmiar',
  resizeColumn: 'Zmień szerokość kolumny',
  rowsAndColumns: (rows, columns) => {
    const plural = (n: number, one: string, few: string, many: string) => {
      if (n === 1) return `${n} ${one}`;
      const mod10 = n % 10;
      const mod100 = n % 100;
      if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${n} ${few}`;
      return `${n} ${many}`;
    };
    return `${plural(rows, 'wiersz', 'wiersze', 'wierszy')}, ${plural(columns, 'kolumna', 'kolumny', 'kolumn')}`;
  },
  rowsPerPage: 'Wierszy na stronę',
  scrollableRegion: 'Obszar przewijalny',
  scrollToEnd: 'Przewiń do końca',
  scrollToStart: 'Przewiń do początku',
  search: 'Szukaj',
  second: 'Sekunda',
  seek: 'Szukaj',
  seekProgress: (current, duration) => `${current} z ${duration}`,
  selectAColorFromTheScreen: 'Próbkuj z ekranu',
  selectAllRows: 'Zaznacz wszystkie wiersze',
  selectCell: 'Zaznacz komórkę',
  selected: 'Wybrano',
  selectedDateLabel: date => `Wybrano: ${date}`,
  selectedRangeLabel: range => `Wybrany zakres: ${range}`,
  selectGroup: 'Zaznacz grupę',
  selectionCleared: 'Wyczyszczono wybór',
  selectRow: 'Zaznacz wiersz',
  selectTable: 'Zaznacz tabelę',
  showingNofMRows: (shown, total) => `Wyświetlono ${shown} z ${total} wierszy`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} z ${total}`,
  showPassword: 'Pokaż hasło',
  slideNum: slide => `Slajd ${slide}`,
  sortAscending: 'Sortuj rosnąco',
  sortColumn: 'Sortuj kolumnę',
  sortDescending: 'Sortuj malejąco',
  splitCell: 'Podziel komórkę',
  startDate: 'Data początkowa',
  steps: 'Kroki',
  stepXOfY: (step, total) => `Krok ${step} z ${total}`,
  strikethrough: 'Przekreślenie',
  subscript: 'Indeks dolny',
  suggestions: 'Sugestie',
  suggestionsAvailable: count => {
    if (count === 1) return 'Dostępna 1 sugestia';
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Dostępne ${count} sugestie`;
    return `Dostępnych ${count} sugestii`;
  },
  suggestionsLoadError: 'Nie udało się wczytać sugestii',
  superscript: 'Indeks górny',
  tableInserted: 'Wstawiono tabelę',
  tableOptions: 'Opcje tabeli',
  tableSize: 'Rozmiar tabeli',
  tagAdded: tag => `Dodano ${tag}`,
  tagAlreadyAdded: tag => `Tag ${tag} już istnieje`,
  tagInputKeyboardHelp: 'Naciśnij Backspace lub Delete, aby usunąć ten tag.',
  tagRemoved: tag => `Usunięto ${tag}`,
  textColor: 'Kolor tekstu',
  textStyle: 'Styl tekstu',
  time: 'Godzina',
  timeInputKeyboardHelp:
    'Użyj klawiszy strzałek, aby zmienić wartości; naciśnij Alt+Strzałka w dół, aby otworzyć selektor godziny.',
  title: 'Tytuł',
  today: 'Dzisiaj',
  toggleColorFormat: 'Przełącz format',
  toggleHeaderColumn: 'Kolumna nagłówka',
  toggleHeaderRow: 'Wiersz nagłówka',
  tooFewTags: min => {
    if (min === 1) return 'Dodaj co najmniej 1 tag';
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Dodaj co najmniej ${min} tagi`;
    return `Dodaj co najmniej ${min} tagów`;
  },
  tooManyTags: max => {
    if (max === 1) return 'Dodaj nie więcej niż 1 tag';
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Dodaj nie więcej niż ${max} tagi`;
    return `Dodaj nie więcej niż ${max} tagów`;
  },
  underline: 'Podkreślenie',
  undo: 'Cofnij',
  unmute: 'Włącz dźwięk',
  unpin: 'Odepnij',
  unpinColumn: 'Odepnij kolumnę',
  url: 'Adres URL',
  videoPlayer: 'Odtwarzacz wideo',
  volume: 'Głośność',
  wrapTextEnd: 'Obraz na końcu, tekst go opływa',
  wrapTextStart: 'Obraz na początku, tekst go opływa',
  year: 'Rok',
  zoomIn: 'Powiększ',
  zoomOut: 'Pomniejsz',
};

registerTranslation(translation);

export default translation;
