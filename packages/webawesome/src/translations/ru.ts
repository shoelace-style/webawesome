import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  alignCenter: 'Выровнять по центру',
  alignEnd: 'Выровнять по концу',
  alignJustify: 'Выровнять по ширине',
  alignment: 'Выравнивание',
  alignStart: 'Выровнять по началу',
  allTagsRemoved: 'Все теги удалены',
  alternativeText: 'Альтернативный текст',
  am: 'AM',
  apply: 'Применить',
  autosizeColumn: 'Подогнать ширину столбца',
  blockquote: 'Цитата',
  bold: 'Полужирный',
  bulletList: 'Маркированный список',
  caption: 'Подпись',
  captions: 'Субтитры',
  carousel: 'Карусель',
  chooseDate: 'Выбрать дату',
  chooseDecade: 'Выбрать десятилетие',
  chooseMonth: 'Выбрать месяц',
  chooseTime: 'Выбрать время',
  chooseYear: 'Выбрать год',
  clearEntry: 'Очистить запись',
  clearFilter: 'Очистить фильтр',
  clearFormatting: 'Очистить форматирование',
  clearSort: 'Очистить сортировку',
  close: 'Закрыть',
  closeCalendar: 'Закрыть календарь',
  closeTimeInput: 'Закрыть выбор времени',
  code: 'Код',
  codeBlock: 'Блок кода',
  collapseRow: 'Свернуть строку',
  colorBlue: 'Синий',
  colorGray: 'Серый',
  colorGreen: 'Зелёный',
  colorOrange: 'Оранжевый',
  colorPink: 'Розовый',
  colorPurple: 'Фиолетовый',
  colorRed: 'Красный',
  colorYellow: 'Жёлтый',
  columnMenu: 'Параметры столбца',
  columnMovedToPosition: (label, position, total) => `${label} перемещён на позицию ${position} из ${total}`,
  columns: 'Столбцы',
  compactPageXOfY: (page, total) => `${page} из ${total}`,
  completed: 'Завершено',
  copied: 'Скопировано',
  copy: 'Скопировать',
  createOption: value => `Создать «${value}»`,
  currentlyPlaying: 'воспроизводится сейчас',
  currentValue: 'Текущее значение',
  date: 'Дата',
  datePickerKeyboardHelp:
    'Используйте стрелки для изменения значений; нажмите Alt+Стрелка вниз, чтобы открыть календарь.',
  day: 'День',
  dayPeriod: 'AM/PM',
  decrement: 'Уменьшить',
  deleteColumn: 'Удалить столбец',
  deleteRow: 'Удалить строку',
  deleteTable: 'Удалить таблицу',
  deselectAllRows: 'Снять выделение со всех строк',
  disabled: 'Отключено',
  dropFileHere: 'Перетащите файл сюда или нажмите, чтобы выбрать',
  dropFilesHere: 'Перетащите файлы сюда или нажмите, чтобы выбрать',
  editEmbed: 'Изменить встраиваемый контент',
  editImage: 'Изменить изображение',
  editLink: 'Изменить ссылку',
  embed: 'Встраиваемый контент',
  embedPlaceholder: 'Вставьте URL или код для встраивания',
  embedRemoved: 'Встраиваемый контент удалён',
  embedUrl: 'URL встраиваемого контента',
  empty: 'Пусто',
  endDate: 'Дата окончания',
  enterAtLeastNumCharacters: min => {
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 === 1 && mod100 !== 11) return `Введите не менее ${min} символа`;
    return `Введите не менее ${min} символов`;
  },
  enterFullscreen: 'Перейти в полноэкранный режим',
  enterUpToNumCharacters: max => {
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 === 1 && mod100 !== 11) return `Введите не более ${max} символа`;
    return `Введите не более ${max} символов`;
  },
  error: 'Ошибка',
  exitFullscreen: 'Выйти из полноэкранного режима',
  expandRow: 'Развернуть строку',
  filterByColumn: label => `Фильтровать по «${label}»`,
  filterFrom: 'С',
  filterMax: 'Макс.',
  filterMin: 'Мин.',
  filterTo: 'По',
  firstPage: 'Первая страница',
  formatMenu: 'Дополнительное форматирование',
  formatting: 'Форматирование',
  goToSlide: (slide, count) => `Перейти к слайду ${slide} из ${count}`,
  heading: 'Заголовок',
  headingLevel: level => `Заголовок ${level}`,
  hideColumn: 'Скрыть столбец',
  hidePassword: 'Скрыть пароль',
  highlight: 'Выделение цветом',
  highlightColor: 'Цвет выделения',
  horizontalRule: 'Горизонтальная линия',
  hour: 'Час',
  image: 'Изображение',
  imageRemoved: 'Изображение удалено',
  imageUrl: 'URL изображения',
  incompleteDate: 'Введите корректную дату.',
  increment: 'Увеличить',
  indent: 'Увеличить отступ',
  insertColumnAfter: 'Вставить столбец после текущего',
  insertColumnBefore: 'Вставить столбец перед текущим',
  insertEmbed: 'Вставить встраиваемый контент',
  insertImage: 'Вставить изображение',
  insertLink: 'Вставить ссылку',
  insertRowAbove: 'Вставить строку выше',
  insertRowBelow: 'Вставить строку ниже',
  insertTable: 'Вставить таблицу',
  insertTableOfSize: (rows, columns) => `Вставить таблицу ${rows} × ${columns}`,
  italic: 'Курсив',
  jumpBackwardX: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `Назад на ${count} страницу`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Назад на ${count} страницы`;
    return `Назад на ${count} страниц`;
  },
  jumpForwardX: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `Вперёд на ${count} страницу`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Вперёд на ${count} страницы`;
    return `Вперёд на ${count} страниц`;
  },
  keyAlt: 'Alt',
  keyCtrl: 'Ctrl',
  keyShift: 'Shift',
  lastPage: 'Последняя страница',
  link: 'Ссылка',
  linkRemoved: 'Ссылка удалена',
  linkUrl: 'URL ссылки',
  lists: 'Списки',
  loading: 'Загрузка',
  locked: 'Заблокировано',
  mergeCells: 'Объединить ячейки',
  minute: 'Минута',
  month: 'Месяц',
  moreOptions: 'Дополнительные параметры',
  moveColumnAfter: 'Переместить столбец вперёд',
  moveColumnBefore: 'Переместить столбец назад',
  moveRowDown: 'Переместить строку вниз',
  moveRowUp: 'Переместить строку вверх',
  mute: 'Выключить звук',
  nextDecade: 'Следующее десятилетие',
  nextMonth: 'Следующий месяц',
  nextPage: 'Следующая страница',
  nextSlide: 'Следующий слайд',
  nextVideo: 'Следующее видео',
  nextYear: 'Следующий год',
  noData: 'Нет данных',
  noOptions: 'Нет вариантов',
  noResults: 'Нет совпадений',
  noSuggestions: 'Нет предложений',
  notCompleted: 'Не завершено',
  now: 'Сейчас',
  numCharacters: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `${num} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} символа`;
    return `${num} символов`;
  },
  numCharactersRemaining: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Остался ${num} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Осталось ${num} символа`;
    return `Осталось ${num} символов`;
  },
  numOptionsAvailable: num => {
    if (num === 0) return 'Нет доступных вариантов';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Доступен ${num} вариант`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Доступно ${num} варианта`;
    return `Доступно ${num} вариантов`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'выбрано 0 вариантов';
    if (num === 1) return 'Выбран 1 вариант';
    return `выбрано ${num} варианта`;
  },
  numRowsCopied: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Скопирована ${num} строка`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Скопировано ${num} строки`;
    return `Скопировано ${num} строк`;
  },
  numRowsSelected: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Выбрана ${num} строка`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Выбрано ${num} строки`;
    return `Выбрано ${num} строк`;
  },
  openInNewTab: 'Открыть в новой вкладке',
  openLink: 'Открыть ссылку',
  optionPosition: (label, position, total) => `${label}, ${position} из ${total}`,
  optionsLoadError: 'Не удалось загрузить варианты',
  orderedList: 'Нумерованный список',
  outdent: 'Уменьшить отступ',
  pageXOfY: (page, total) => `Страница ${page} из ${total}`,
  pagination: 'Постраничная навигация',
  paragraph: 'Абзац',
  pasteAsPlainText: 'Вставить как обычный текст',
  pause: 'Пауза',
  pauseAnimation: 'Приостановить анимацию',
  pictureInPicture: 'Картинка в картинке',
  pinLeft: 'Закрепить слева',
  pinRight: 'Закрепить справа',
  play: 'Воспроизвести',
  playAnimation: 'Воспроизвести анимацию',
  playbackSpeed: 'Скорость воспроизведения',
  playlist: 'Плейлист',
  pm: 'PM',
  previousDecade: 'Предыдущее десятилетие',
  previousMonth: 'Предыдущий месяц',
  previousPage: 'Предыдущая страница',
  previousSlide: 'Предыдущий слайд',
  previousVideo: 'Предыдущее видео',
  previousYear: 'Предыдущий год',
  progress: 'Прогресс',
  rangeTooLong: max => {
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 === 1 && mod100 !== 11) return `Выберите диапазон не длиннее ${max} дня`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Выберите диапазон не длиннее ${max} дней`;
    return `Выберите диапазон не длиннее ${max} дней`;
  },
  rangeTooShort: min => {
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 === 1 && mod100 !== 11) return `Выберите диапазон длиной не менее ${min} дня`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14))
      return `Выберите диапазон длиной не менее ${min} дней`;
    return `Выберите диапазон длиной не менее ${min} дней`;
  },
  readonly: 'Только для чтения',
  redo: 'Повторить',
  remove: 'Удалить',
  removeColors: 'Убрать цвета',
  removeLink: 'Удалить ссылку',
  resetColumns: 'Сбросить столбцы',
  resize: 'Изменить размер',
  resizeColumn: 'Изменить ширину столбца',
  rowsAndColumns: (rows, columns) => {
    const plural = (n: number, one: string, few: string, many: string) => {
      const mod10 = n % 10;
      const mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return `${n} ${one}`;
      if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${n} ${few}`;
      return `${n} ${many}`;
    };
    return `${plural(rows, 'строка', 'строки', 'строк')}, ${plural(columns, 'столбец', 'столбца', 'столбцов')}`;
  },
  rowsPerPage: 'Строк на странице',
  scrollableRegion: 'Прокручиваемая область',
  scrollToEnd: 'Пролистать до конца',
  scrollToStart: 'Пролистать к началу',
  search: 'Поиск',
  second: 'Секунда',
  seek: 'Поиск',
  seekProgress: (current, duration) => `${current} из ${duration}`,
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  selectAllRows: 'Выделить все строки',
  selectCell: 'Выделить ячейку',
  selected: 'Выбрано',
  selectedDateLabel: date => `Выбрано: ${date}`,
  selectedRangeLabel: range => `Выбранный диапазон: ${range}`,
  selectGroup: 'Выделить группу',
  selectionCleared: 'Выбор очищен',
  selectRow: 'Выделить строку',
  selectTable: 'Выделить таблицу',
  showingNofMRows: (shown, total) => `Показано ${shown} из ${total} строк`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} из ${total}`,
  showPassword: 'Показать пароль',
  slideNum: slide => `Слайд ${slide}`,
  sortAscending: 'Сортировать по возрастанию',
  sortColumn: 'Сортировать столбец',
  sortDescending: 'Сортировать по убыванию',
  splitCell: 'Разделить ячейку',
  startDate: 'Дата начала',
  steps: 'Шаги',
  stepXOfY: (step, total) => `Шаг ${step} из ${total}`,
  strikethrough: 'Зачёркнутый',
  subscript: 'Подстрочный',
  suggestions: 'Предложения',
  suggestionsAvailable: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return `Доступно ${count} предложение`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Доступно ${count} предложения`;
    return `Доступно ${count} предложений`;
  },
  suggestionsLoadError: 'Не удалось загрузить предложения',
  superscript: 'Надстрочный',
  tableInserted: 'Таблица вставлена',
  tableOptions: 'Параметры таблицы',
  tableSize: 'Размер таблицы',
  tagAdded: tag => `${tag} добавлен`,
  tagAlreadyAdded: tag => `Тег ${tag} уже добавлен`,
  tagInputKeyboardHelp: 'Нажмите Backspace или Delete, чтобы удалить этот тег.',
  tagRemoved: tag => `${tag} удалён`,
  textColor: 'Цвет текста',
  textStyle: 'Стиль текста',
  time: 'Время',
  timeInputKeyboardHelp:
    'Используйте стрелки для изменения значений; нажмите Alt+Стрелка вниз, чтобы открыть выбор времени.',
  title: 'Название',
  today: 'Сегодня',
  toggleColorFormat: 'Переключить цветовую модель',
  toggleHeaderColumn: 'Столбец заголовков',
  toggleHeaderRow: 'Строка заголовков',
  tooFewTags: min => {
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 === 1 && mod100 !== 11) return `Добавьте не менее ${min} тега`;
    return `Добавьте не менее ${min} тегов`;
  },
  tooManyTags: max => {
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 === 1 && mod100 !== 11) return `Добавьте не более ${max} тега`;
    return `Добавьте не более ${max} тегов`;
  },
  underline: 'Подчёркнутый',
  undo: 'Отменить',
  unmute: 'Включить звук',
  unpin: 'Открепить',
  unpinColumn: 'Открепить столбец',
  url: 'URL',
  videoPlayer: 'Видеоплеер',
  volume: 'Громкость',
  wrapTextEnd: 'Изображение в конце, текст обтекает',
  wrapTextStart: 'Изображение в начале, текст обтекает',
  year: 'Год',
  zoomIn: 'Увеличить',
  zoomOut: 'Уменьшить',
};

registerTranslation(translation);

export default translation;
