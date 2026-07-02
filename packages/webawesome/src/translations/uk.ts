import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'uk',
  $name: 'Українська',
  $dir: 'ltr',

  am: 'AM',
  autosizeColumn: 'Автоматичний розмір стовпця',
  captions: 'Субтитри',
  carousel: 'Карусель',
  chooseDate: 'Виберіть дату',
  chooseDecade: 'Виберіть десятиліття',
  chooseMonth: 'Виберіть місяць',
  chooseTime: 'Виберіть час',
  chooseYear: 'Виберіть рік',
  clearEntry: 'Очистити поле',
  clearSort: 'Скасувати сортування',
  close: 'Закрити',
  closeCalendar: 'Закрити календар',
  closeTimeInput: 'Закрити вибір часу',
  collapseRow: 'Згорнути рядок',
  columnMenu: 'Параметри стовпця',
  columnMovedToPosition: (label, position, total) => `${label} переміщено на позицію ${position} з ${total}`,
  columns: 'Стовпці',
  compactPageXOfY: (page, total) => `${page} з ${total}`,
  copied: 'Скопійовано',
  copy: 'Скопіювати',
  createOption: value => `Створити «${value}»`,
  currentlyPlaying: 'зараз відтворюється',
  currentValue: 'Поточне значення',
  date: 'Дата',
  datePickerKeyboardHelp:
    'Використовуйте стрілки для зміни значень; натисніть Alt+Стрілка вниз, щоб відкрити календар.',
  day: 'День',
  dayPeriod: 'AM/PM',
  decrement: 'Зменшити',
  deselectAllRows: 'Скасувати вибір усіх рядків',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Порожньо',
  endDate: 'Дата завершення',
  enterFullscreen: 'Перейти в повноекранний режим',
  error: 'Збій',
  exitFullscreen: 'Вийти з повноекранного режиму',
  expandRow: 'Розгорнути рядок',
  filterByColumn: label => `Фільтрувати за «${label}»`,
  filterMax: 'Макс.',
  filterMin: 'Мін.',
  firstPage: 'Перша сторінка',
  goToSlide: (slide, count) => `Перейти до слайда №${slide} з ${count}`,
  hideColumn: 'Приховати стовпець',
  hidePassword: 'Приховати пароль',
  hour: 'Година',
  incompleteDate: 'Введіть коректну дату.',
  increment: 'Збільшити',
  jumpBackwardX: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `Назад на ${count} сторінку`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Назад на ${count} сторінки`;
    return `Назад на ${count} сторінок`;
  },
  jumpForwardX: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `Уперед на ${count} сторінку`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Уперед на ${count} сторінки`;
    return `Уперед на ${count} сторінок`;
  },
  lastPage: 'Остання сторінка',
  loading: 'Завантаження',
  minute: 'Хвилина',
  month: 'Місяць',
  moreOptions: 'Більше параметрів',
  mute: 'Вимкнути звук',
  nextDecade: 'Наступне десятиліття',
  nextMonth: 'Наступний місяць',
  nextPage: 'Наступна сторінка',
  nextSlide: 'Наступний слайд',
  nextVideo: 'Наступне відео',
  nextYear: 'Наступний рік',
  noData: 'Немає даних',
  now: 'Зараз',
  numCharacters: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `${num} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} символи`;
    return `${num} символів`;
  },
  numCharactersRemaining: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Залишився ${num} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Залишилося ${num} символи`;
    return `Залишилося ${num} символів`;
  },
  numOptionsSelected: num => {
    const n = num % 10;
    if (n === 0) return 'не вибрано варіантів';
    if (n === 1) return 'вибрано 1 варіант';
    if (n === 2 || n === 3 || n === 4) return `вибрано ${num} варіанти`;
    return `вибрано ${num} варіантів`;
  },
  numRowsSelected: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Вибрано ${num} рядок`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Вибрано ${num} рядки`;
    return `Вибрано ${num} рядків`;
  },
  pageXOfY: (page, total) => `Сторінка ${page} з ${total}`,
  pagination: 'Нумерація сторінок',
  pause: 'Пауза',
  pauseAnimation: 'Призупинити анімацію',
  pictureInPicture: 'Картинка в картинці',
  pinLeft: 'Закріпити ліворуч',
  pinRight: 'Закріпити праворуч',
  play: 'Відтворити',
  playAnimation: 'Відтворити анімацію',
  playbackSpeed: 'Швидкість відтворення',
  playlist: 'Плейлист',
  pm: 'PM',
  previousDecade: 'Попереднє десятиліття',
  previousMonth: 'Попередній місяць',
  previousPage: 'Попередня сторінка',
  previousSlide: 'Попередній слайд',
  previousVideo: 'Попереднє відео',
  previousYear: 'Попередній рік',
  progress: 'Поступ',
  rangeTooLong: max => {
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 === 1 && mod100 !== 11) return `Виберіть діапазон не довший за ${max} день`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Виберіть діапазон не довший за ${max} дні`;
    return `Виберіть діапазон не довший за ${max} днів`;
  },
  rangeTooShort: min => {
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 === 1 && mod100 !== 11) return `Виберіть діапазон завдовжки щонайменше ${min} день`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14))
      return `Виберіть діапазон завдовжки щонайменше ${min} дні`;
    return `Виберіть діапазон завдовжки щонайменше ${min} днів`;
  },
  readonly: 'Лише для читання',
  remove: 'Видалити',
  resize: 'Змінити розмір',
  resizeColumn: 'Змінити розмір стовпця',
  rowsPerPage: 'Рядків на сторінці',
  scrollableRegion: 'Область з можливістю прокрутки',
  scrollToEnd: 'Прокрутити в кінець',
  scrollToStart: 'Прокрутити на початок',
  search: 'Пошук',
  second: 'Секунда',
  seek: 'Пошук',
  seekProgress: (current, duration) => `${current} з ${duration}`,
  selectAColorFromTheScreen: 'Виберіть колір на екрані',
  selectAllRows: 'Вибрати всі рядки',
  selected: 'Вибрано',
  selectedDateLabel: date => `Вибрано: ${date}`,
  selectedRangeLabel: range => `Вибраний діапазон: ${range}`,
  selectGroup: 'Вибрати групу',
  selectionCleared: 'Вибір очищено',
  selectRow: 'Вибрати рядок',
  showingNofMRows: (shown, total) => `Показано ${shown} з ${total} рядків`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} з ${total}`,
  showPassword: 'Показати пароль',
  slideNum: slide => `Слайд ${slide}`,
  sortAscending: 'Сортувати за зростанням',
  sortColumn: 'Сортувати стовпець',
  sortDescending: 'Сортувати за спаданням',
  startDate: 'Дата початку',
  time: 'Час',
  timeInputKeyboardHelp:
    'Використовуйте стрілки для зміни значень; натисніть Alt+Стрілка вниз, щоб відкрити засіб вибору часу.',
  today: 'Сьогодні',
  toggleColorFormat: 'Переключити кольорову модель',
  unmute: 'Увімкнути звук',
  unpin: 'Відкріпити',
  unpinColumn: 'Відкріпити стовпець',
  videoPlayer: 'Відеоплеєр',
  volume: 'Гучність',
  year: 'Рік',
  zoomIn: 'Збільшити',
  zoomOut: 'Зменшити',
};

registerTranslation(translation);

export default translation;
