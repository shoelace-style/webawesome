import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'uk',
  $name: 'Українська',
  $dir: 'ltr',

  alignCenter: 'Вирівняти по центру',
  alignEnd: 'Вирівняти по кінцю',
  alignJustify: 'Вирівняти по ширині',
  alignment: 'Вирівнювання',
  alignStart: 'Вирівняти по початку',
  allTagsRemoved: 'Усі теги видалено',
  alternativeText: 'Альтернативний текст',
  am: 'AM',
  apply: 'Застосувати',
  autosizeColumn: 'Автоматичний розмір стовпця',
  blockquote: 'Цитата',
  bold: 'Жирний',
  bulletList: 'Маркований список',
  caption: 'Підпис',
  captions: 'Субтитри',
  carousel: 'Карусель',
  chooseDate: 'Виберіть дату',
  chooseDecade: 'Виберіть десятиліття',
  chooseMonth: 'Виберіть місяць',
  chooseTime: 'Виберіть час',
  chooseYear: 'Виберіть рік',
  clearEntry: 'Очистити поле',
  clearFilter: 'Скасувати фільтр',
  clearFormatting: 'Очистити форматування',
  clearSort: 'Скасувати сортування',
  close: 'Закрити',
  closeCalendar: 'Закрити календар',
  closeTimeInput: 'Закрити вибір часу',
  code: 'Код',
  codeBlock: 'Блок коду',
  collapseRow: 'Згорнути рядок',
  colorBlue: 'Синій',
  colorGray: 'Сірий',
  colorGreen: 'Зелений',
  colorOrange: 'Помаранчевий',
  colorPink: 'Рожевий',
  colorPurple: 'Фіолетовий',
  colorRed: 'Червоний',
  colorYellow: 'Жовтий',
  columnMenu: 'Параметри стовпця',
  columnMovedToPosition: (label, position, total) => `${label} переміщено на позицію ${position} з ${total}`,
  columns: 'Стовпці',
  compactPageXOfY: (page, total) => `${page} з ${total}`,
  completed: 'Завершено',
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
  deleteColumn: 'Видалити стовпець',
  deleteRow: 'Видалити рядок',
  deleteTable: 'Видалити таблицю',
  deselectAllRows: 'Скасувати вибір усіх рядків',
  disabled: 'Вимкнено',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  editEmbed: 'Редагувати вбудований вміст',
  editImage: 'Редагувати зображення',
  editLink: 'Редагувати посилання',
  embed: 'Вбудований вміст',
  embedPlaceholder: 'Вставте URL або код для вбудовування',
  embedRemoved: 'Вбудований вміст видалено',
  embedUrl: 'URL вбудованого вмісту',
  empty: 'Порожньо',
  endDate: 'Дата завершення',
  enterAtLeastNumCharacters: min => {
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 === 1 && mod100 !== 11) return `Введіть щонайменше ${min} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Введіть щонайменше ${min} символи`;
    return `Введіть щонайменше ${min} символів`;
  },
  enterFullscreen: 'Перейти в повноекранний режим',
  enterUpToNumCharacters: max => {
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 === 1 && mod100 !== 11) return `Введіть не більше ніж ${max} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Введіть не більше ніж ${max} символи`;
    return `Введіть не більше ніж ${max} символів`;
  },
  error: 'Збій',
  exitFullscreen: 'Вийти з повноекранного режиму',
  expandRow: 'Розгорнути рядок',
  filterByColumn: label => `Фільтрувати за «${label}»`,
  filterFrom: 'Від',
  filterMax: 'Макс.',
  filterMin: 'Мін.',
  filterTo: 'До',
  firstPage: 'Перша сторінка',
  formatMenu: 'Більше форматування',
  formatting: 'Форматування',
  goToSlide: (slide, count) => `Перейти до слайда №${slide} з ${count}`,
  heading: 'Заголовок',
  headingLevel: level => `Заголовок ${level}`,
  hideColumn: 'Приховати стовпець',
  hidePassword: 'Приховати пароль',
  highlight: 'Виділення кольором',
  highlightColor: 'Колір виділення',
  horizontalRule: 'Горизонтальна лінія',
  hour: 'Година',
  image: 'Зображення',
  imageRemoved: 'Зображення видалено',
  imageUrl: 'URL зображення',
  incompleteDate: 'Введіть коректну дату.',
  increment: 'Збільшити',
  indent: 'Збільшити відступ',
  insertColumnAfter: 'Вставити стовпець після поточного',
  insertColumnBefore: 'Вставити стовпець перед поточним',
  insertEmbed: 'Вставити вбудований вміст',
  insertImage: 'Вставити зображення',
  insertLink: 'Вставити посилання',
  insertRowAbove: 'Вставити рядок вище',
  insertRowBelow: 'Вставити рядок нижче',
  insertTable: 'Вставити таблицю',
  insertTableOfSize: (rows, columns) => `Вставити таблицю ${rows} × ${columns}`,
  italic: 'Курсив',
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
  keyAlt: 'Alt',
  keyCtrl: 'Ctrl',
  keyShift: 'Shift',
  lastPage: 'Остання сторінка',
  link: 'Посилання',
  linkRemoved: 'Посилання видалено',
  linkUrl: 'URL посилання',
  lists: 'Списки',
  loading: 'Завантаження',
  locked: 'Заблоковано',
  mergeCells: 'Об’єднати клітинки',
  minute: 'Хвилина',
  month: 'Місяць',
  moreOptions: 'Більше параметрів',
  moveColumnAfter: 'Перемістити стовпець уперед',
  moveColumnBefore: 'Перемістити стовпець назад',
  moveRowDown: 'Перемістити рядок униз',
  moveRowUp: 'Перемістити рядок угору',
  mute: 'Вимкнути звук',
  nextDecade: 'Наступне десятиліття',
  nextMonth: 'Наступний місяць',
  nextPage: 'Наступна сторінка',
  nextSlide: 'Наступний слайд',
  nextVideo: 'Наступне відео',
  nextYear: 'Наступний рік',
  noData: 'Немає даних',
  noOptions: 'Немає варіантів',
  noResults: 'Немає відповідних результатів',
  noSuggestions: 'Немає пропозицій',
  notCompleted: 'Не завершено',
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
  numOptionsAvailable: num => {
    if (num === 0) return 'Немає доступних варіантів';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Доступний ${num} варіант`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Доступно ${num} варіанти`;
    return `Доступно ${num} варіантів`;
  },
  numOptionsSelected: num => {
    const n = num % 10;
    if (n === 0) return 'не вибрано варіантів';
    if (n === 1) return 'вибрано 1 варіант';
    if (n === 2 || n === 3 || n === 4) return `вибрано ${num} варіанти`;
    return `вибрано ${num} варіантів`;
  },
  numRowsCopied: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Скопійовано ${num} рядок`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Скопійовано ${num} рядки`;
    return `Скопійовано ${num} рядків`;
  },
  numRowsSelected: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Вибрано ${num} рядок`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Вибрано ${num} рядки`;
    return `Вибрано ${num} рядків`;
  },
  openInNewTab: 'Відкрити в новій вкладці',
  openLink: 'Відкрити посилання',
  optionPosition: (label, position, total) => `${label}, ${position} з ${total}`,
  optionsLoadError: 'Не вдалося завантажити варіанти',
  orderedList: 'Нумерований список',
  outdent: 'Зменшити відступ',
  pageXOfY: (page, total) => `Сторінка ${page} з ${total}`,
  pagination: 'Нумерація сторінок',
  paragraph: 'Абзац',
  pasteAsPlainText: 'Вставити як звичайний текст',
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
  redo: 'Повторити',
  remove: 'Видалити',
  removeColors: 'Прибрати кольори',
  removeLink: 'Видалити посилання',
  resetColumns: 'Скинути стовпці',
  resize: 'Змінити розмір',
  resizeColumn: 'Змінити розмір стовпця',
  rowsAndColumns: (rows, columns) => {
    const plural = (n: number, one: string, few: string, many: string) => {
      const mod10 = n % 10;
      const mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return `${n} ${one}`;
      if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${n} ${few}`;
      return `${n} ${many}`;
    };
    return `${plural(rows, 'рядок', 'рядки', 'рядків')}, ${plural(columns, 'стовпець', 'стовпці', 'стовпців')}`;
  },
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
  selectCell: 'Вибрати клітинку',
  selected: 'Вибрано',
  selectedDateLabel: date => `Вибрано: ${date}`,
  selectedRangeLabel: range => `Вибраний діапазон: ${range}`,
  selectGroup: 'Вибрати групу',
  selectionCleared: 'Вибір очищено',
  selectRow: 'Вибрати рядок',
  selectTable: 'Вибрати таблицю',
  showingNofMRows: (shown, total) => `Показано ${shown} з ${total} рядків`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} з ${total}`,
  showPassword: 'Показати пароль',
  slideNum: slide => `Слайд ${slide}`,
  sortAscending: 'Сортувати за зростанням',
  sortColumn: 'Сортувати стовпець',
  sortDescending: 'Сортувати за спаданням',
  splitCell: 'Розділити клітинку',
  startDate: 'Дата початку',
  steps: 'Кроки',
  stepXOfY: (step, total) => `Крок ${step} з ${total}`,
  strikethrough: 'Закреслений',
  subscript: 'Нижній індекс',
  suggestions: 'Пропозиції',
  suggestionsAvailable: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `Доступна ${count} пропозиція`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Доступно ${count} пропозиції`;
    return `Доступно ${count} пропозицій`;
  },
  suggestionsLoadError: 'Не вдалося завантажити пропозиції',
  superscript: 'Верхній індекс',
  tableInserted: 'Таблицю вставлено',
  tableOptions: 'Параметри таблиці',
  tableSize: 'Розмір таблиці',
  tagAdded: tag => `${tag} додано`,
  tagAlreadyAdded: tag => `Тег ${tag} уже додано`,
  tagInputKeyboardHelp: 'Натисніть Backspace або Delete, щоб видалити цей тег.',
  tagRemoved: tag => `${tag} видалено`,
  textColor: 'Колір тексту',
  textStyle: 'Стиль тексту',
  time: 'Час',
  timeInputKeyboardHelp:
    'Використовуйте стрілки для зміни значень; натисніть Alt+Стрілка вниз, щоб відкрити засіб вибору часу.',
  title: 'Назва',
  today: 'Сьогодні',
  toggleColorFormat: 'Переключити кольорову модель',
  toggleHeaderColumn: 'Стовпець заголовків',
  toggleHeaderRow: 'Рядок заголовків',
  tooFewTags: min => {
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 === 1 && mod100 !== 11) return `Додайте щонайменше ${min} тег`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Додайте щонайменше ${min} теги`;
    return `Додайте щонайменше ${min} тегів`;
  },
  tooManyTags: max => {
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 === 1 && mod100 !== 11) return `Додайте не більше ніж ${max} тег`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Додайте не більше ніж ${max} теги`;
    return `Додайте не більше ніж ${max} тегів`;
  },
  underline: 'Підкреслений',
  undo: 'Скасувати',
  unmute: 'Увімкнути звук',
  unpin: 'Відкріпити',
  unpinColumn: 'Відкріпити стовпець',
  url: 'URL',
  videoPlayer: 'Відеоплеєр',
  volume: 'Гучність',
  wrapTextEnd: 'Зображення в кінці, текст обтікає',
  wrapTextStart: 'Зображення на початку, текст обтікає',
  year: 'Рік',
  zoomIn: 'Збільшити',
  zoomOut: 'Зменшити',
};

registerTranslation(translation);

export default translation;
