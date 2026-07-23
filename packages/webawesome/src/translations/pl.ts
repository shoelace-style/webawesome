import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  am: 'AM',
  autosizeColumn: 'Dopasuj szerokość kolumny',
  captions: 'Napisy',
  carousel: 'Karuzela',
  chooseDate: 'Wybierz datę',
  chooseDecade: 'Wybierz dekadę',
  chooseMonth: 'Wybierz miesiąc',
  chooseTime: 'Wybierz godzinę',
  chooseYear: 'Wybierz rok',
  clearEntry: 'Wyczyść wpis',
  clearFilter: 'Wyczyść filtr',
  clearSort: 'Wyczyść sortowanie',
  close: 'Zamknij',
  closeCalendar: 'Zamknij kalendarz',
  closeTimeInput: 'Zamknij selektor godziny',
  collapseRow: 'Zwiń wiersz',
  columnMenu: 'Opcje kolumny',
  columnMovedToPosition: (label, position, total) => `Przeniesiono ${label} na pozycję ${position} z ${total}`,
  columns: 'Kolumny',
  compactPageXOfY: (page, total) => `${page} z ${total}`,
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
  deselectAllRows: 'Odznacz wszystkie wiersze',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Puste',
  endDate: 'Data końcowa',
  enterFullscreen: 'Włącz pełny ekran',
  error: 'Błąd',
  exitFullscreen: 'Wyłącz pełny ekran',
  expandRow: 'Rozwiń wiersz',
  filterByColumn: label => `Filtruj według: ${label}`,
  filterFrom: 'Od',
  filterMax: 'Maks.',
  filterMin: 'Min.',
  filterTo: 'Do',
  firstPage: 'Pierwsza strona',
  goToSlide: (slide, count) => `Przejdź do slajdu ${slide} z ${count}`,
  hideColumn: 'Ukryj kolumnę',
  hidePassword: 'Ukryj hasło',
  hour: 'Godzina',
  incompleteDate: 'Wprowadź prawidłową datę.',
  increment: 'Zwiększ',
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
  lastPage: 'Ostatnia strona',
  loading: 'Ładowanie',
  minute: 'Minuta',
  month: 'Miesiąc',
  moreOptions: 'Więcej opcji',
  mute: 'Wycisz',
  nextDecade: 'Następna dekada',
  nextMonth: 'Następny miesiąc',
  nextPage: 'Następna strona',
  nextSlide: 'Następny slajd',
  nextVideo: 'Następny film',
  nextYear: 'Następny rok',
  noData: 'Brak danych',
  noResults: 'Brak pasujących wyników',
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
  pageXOfY: (page, total) => `Strona ${page} z ${total}`,
  pagination: 'Paginacja',
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
  remove: 'Usunąć',
  resetColumns: 'Resetuj kolumny',
  resize: 'Zmień rozmiar',
  resizeColumn: 'Zmień szerokość kolumny',
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
  selected: 'Wybrano',
  selectedDateLabel: date => `Wybrano: ${date}`,
  selectedRangeLabel: range => `Wybrany zakres: ${range}`,
  selectGroup: 'Zaznacz grupę',
  selectionCleared: 'Wyczyszczono wybór',
  selectRow: 'Zaznacz wiersz',
  showingNofMRows: (shown, total) => `Wyświetlono ${shown} z ${total} wierszy`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} z ${total}`,
  showPassword: 'Pokaż hasło',
  slideNum: slide => `Slajd ${slide}`,
  sortAscending: 'Sortuj rosnąco',
  sortColumn: 'Sortuj kolumnę',
  sortDescending: 'Sortuj malejąco',
  startDate: 'Data początkowa',
  time: 'Godzina',
  timeInputKeyboardHelp:
    'Użyj klawiszy strzałek, aby zmienić wartości; naciśnij Alt+Strzałka w dół, aby otworzyć selektor godziny.',
  today: 'Dzisiaj',
  toggleColorFormat: 'Przełącz format',
  unmute: 'Włącz dźwięk',
  unpin: 'Odepnij',
  unpinColumn: 'Odepnij kolumnę',
  videoPlayer: 'Odtwarzacz wideo',
  volume: 'Głośność',
  year: 'Rok',
  zoomIn: 'Powiększ',
  zoomOut: 'Pomniejsz',
};

registerTranslation(translation);

export default translation;
