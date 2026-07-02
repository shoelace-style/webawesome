import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  am: 'AM',
  autosizeColumn: 'Dopasuj szerokość kolumny',
  carousel: 'Karuzela',
  captions: 'Napisy',
  chooseDate: 'Wybierz datę',
  chooseDecade: 'Wybierz dekadę',
  chooseMonth: 'Wybierz miesiąc',
  chooseTime: 'Wybierz godzinę',
  chooseYear: 'Wybierz rok',
  clearEntry: 'Wyczyść wpis',
  clearSort: 'Wyczyść sortowanie',
  collapseRow: 'Zwiń wiersz',
  columnMenu: 'Opcje kolumny',
  columnMovedToPosition: (label, position, total) => `Przeniesiono ${label} na pozycję ${position} z ${total}`,
  columns: 'Kolumny',
  createOption: value => `Utwórz "${value}"`,
  close: 'Zamknij',
  closeCalendar: 'Zamknij kalendarz',
  closeTimeInput: 'Zamknij selektor godziny',
  copied: 'Skopiowane',
  copy: 'Kopiuj',
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
  error: 'Błąd',
  enterFullscreen: 'Włącz pełny ekran',
  endDate: 'Data końcowa',
  exitFullscreen: 'Wyłącz pełny ekran',
  expandRow: 'Rozwiń wiersz',
  filterByColumn: label => `Filtruj według: ${label}`,
  filterMax: 'Maks.',
  filterMin: 'Min.',
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
  moreOptions: 'Więcej opcji',
  month: 'Miesiąc',
  mute: 'Wycisz',
  nextDecade: 'Następna dekada',
  nextMonth: 'Następny miesiąc',
  nextSlide: 'Następny slajd',
  nextVideo: 'Następny film',
  nextPage: 'Następna strona',
  nextYear: 'Następny rok',
  noData: 'Brak danych',
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
  numRowsSelected: num => {
    if (num === 1) return 'Wybrano 1 wiersz';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Wybrano ${num} wiersze`;
    return `Wybrano ${num} wierszy`;
  },
  pageXOfY: (page, total) => `Strona ${page} z ${total}`,
  compactPageXOfY: (page, total) => `${page} z ${total}`,
  pagination: 'Paginacja',
  pause: 'Wstrzymaj',
  pauseAnimation: 'Wstrzymaj animację',
  pictureInPicture: 'Obraz w obrazie',
  pinLeft: 'Przypnij do lewej',
  pinRight: 'Przypnij do prawej',
  pm: 'PM',
  play: 'Odtwórz',
  playbackSpeed: 'Prędkość odtwarzania',
  playlist: 'Lista odtwarzania',
  playAnimation: 'Odtwórz animację',
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
  resize: 'Zmień rozmiar',
  resizeColumn: 'Zmień szerokość kolumny',
  rowsPerPage: 'Wierszy na stronę',
  scrollableRegion: 'Obszar przewijalny',
  scrollToEnd: 'Przewiń do końca',
  scrollToStart: 'Przewiń do początku',
  search: 'Szukaj',
  second: 'Sekunda',
  selectAColorFromTheScreen: 'Próbkuj z ekranu',
  selectAllRows: 'Zaznacz wszystkie wiersze',
  selectRow: 'Zaznacz wiersz',
  selectGroup: 'Zaznacz grupę',
  selected: 'Wybrano',
  selectedDateLabel: date => `Wybrano: ${date}`,
  selectedRangeLabel: range => `Wybrany zakres: ${range}`,
  selectionCleared: 'Wyczyszczono wybór',
  showPassword: 'Pokaż hasło',
  showingNofMRows: (shown, total) => `Wyświetlono ${shown} z ${total} wierszy`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} z ${total}`,
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
  unpin: 'Odepnij',
  unpinColumn: 'Odepnij kolumnę',
  seek: 'Szukaj',
  seekProgress: (current, duration) => `${current} z ${duration}`,
  currentlyPlaying: 'aktualnie odtwarzane',
  unmute: 'Włącz dźwięk',
  videoPlayer: 'Odtwarzacz wideo',
  volume: 'Głośność',
  year: 'Rok',
  zoomIn: 'Powiększ',
  zoomOut: 'Pomniejsz',
};

registerTranslation(translation);

export default translation;
