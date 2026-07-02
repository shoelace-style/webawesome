import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  am: 'AM',
  autosizeColumn: 'Подогнать ширину столбца',
  carousel: 'Карусель',
  captions: 'Субтитры',
  chooseDate: 'Выбрать дату',
  chooseDecade: 'Выбрать десятилетие',
  chooseMonth: 'Выбрать месяц',
  chooseTime: 'Выбрать время',
  chooseYear: 'Выбрать год',
  clearEntry: 'Очистить запись',
  createOption: value => `Создать «${value}»`,
  close: 'Закрыть',
  closeCalendar: 'Закрыть календарь',
  closeTimeInput: 'Закрыть выбор времени',
  clearSort: 'Очистить сортировку',
  collapseRow: 'Свернуть строку',
  columnMenu: 'Параметры столбца',
  columnMovedToPosition: (label, position, total) => `${label} перемещён на позицию ${position} из ${total}`,
  columns: 'Столбцы',
  copied: 'Скопировано',
  copy: 'Скопировать',
  currentValue: 'Текущее значение',
  date: 'Дата',
  datePickerKeyboardHelp:
    'Используйте стрелки для изменения значений; нажмите Alt+Стрелка вниз, чтобы открыть календарь.',
  day: 'День',
  dayPeriod: 'AM/PM',
  decrement: 'Уменьшить',
  deselectAllRows: 'Снять выделение со всех строк',
  dropFileHere: 'Перетащите файл сюда или нажмите, чтобы выбрать',
  dropFilesHere: 'Перетащите файлы сюда или нажмите, чтобы выбрать',
  empty: 'Пусто',
  error: 'Ошибка',
  enterFullscreen: 'Перейти в полноэкранный режим',
  endDate: 'Дата окончания',
  exitFullscreen: 'Выйти из полноэкранного режима',
  expandRow: 'Развернуть строку',
  filterByColumn: label => `Фильтровать по «${label}»`,
  filterMax: 'Макс.',
  filterMin: 'Мин.',
  firstPage: 'Первая страница',
  goToSlide: (slide, count) => `Перейти к слайду ${slide} из ${count}`,
  hideColumn: 'Скрыть столбец',
  hidePassword: 'Скрыть пароль',
  hour: 'Час',
  incompleteDate: 'Введите корректную дату.',
  increment: 'Увеличить',
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
  lastPage: 'Последняя страница',
  loading: 'Загрузка',
  minute: 'Минута',
  moreOptions: 'Дополнительные параметры',
  month: 'Месяц',
  mute: 'Выключить звук',
  nextDecade: 'Следующее десятилетие',
  nextMonth: 'Следующий месяц',
  nextPage: 'Следующая страница',
  nextSlide: 'Следующий слайд',
  nextVideo: 'Следующее видео',
  nextYear: 'Следующий год',
  noData: 'Нет данных',
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
  numOptionsSelected: num => {
    if (num === 0) return 'выбрано 0 вариантов';
    if (num === 1) return 'Выбран 1 вариант';
    return `выбрано ${num} варианта`;
  },
  numRowsSelected: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Выбрана ${num} строка`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Выбрано ${num} строки`;
    return `Выбрано ${num} строк`;
  },
  pageXOfY: (page, total) => `Страница ${page} из ${total}`,
  compactPageXOfY: (page, total) => `${page} из ${total}`,
  pagination: 'Постраничная навигация',
  pause: 'Пауза',
  pauseAnimation: 'Приостановить анимацию',
  pictureInPicture: 'Картинка в картинке',
  pinLeft: 'Закрепить слева',
  pinRight: 'Закрепить справа',
  play: 'Воспроизвести',
  playbackSpeed: 'Скорость воспроизведения',
  playlist: 'Плейлист',
  playAnimation: 'Воспроизвести анимацию',
  pm: 'PM',
  previousDecade: 'Предыдущее десятилетие',
  previousMonth: 'Предыдущий месяц',
  previousSlide: 'Предыдущий слайд',
  previousPage: 'Предыдущая страница',
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
  remove: 'Удалить',
  resize: 'Изменить размер',
  resizeColumn: 'Изменить ширину столбца',
  rowsPerPage: 'Строк на странице',
  scrollableRegion: 'Прокручиваемая область',
  scrollToEnd: 'Пролистать до конца',
  scrollToStart: 'Пролистать к началу',
  search: 'Поиск',
  second: 'Секунда',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  selectAllRows: 'Выделить все строки',
  selectRow: 'Выделить строку',
  selectGroup: 'Выделить группу',
  selected: 'Выбрано',
  selectedDateLabel: date => `Выбрано: ${date}`,
  selectedRangeLabel: range => `Выбранный диапазон: ${range}`,
  selectionCleared: 'Выбор очищен',
  showPassword: 'Показать пароль',
  showingNofMRows: (shown, total) => `Показано ${shown} из ${total} строк`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} из ${total}`,
  slideNum: slide => `Слайд ${slide}`,
  sortAscending: 'Сортировать по возрастанию',
  sortColumn: 'Сортировать столбец',
  sortDescending: 'Сортировать по убыванию',
  startDate: 'Дата начала',
  time: 'Время',
  timeInputKeyboardHelp:
    'Используйте стрелки для изменения значений; нажмите Alt+Стрелка вниз, чтобы открыть выбор времени.',
  today: 'Сегодня',
  toggleColorFormat: 'Переключить цветовую модель',
  seek: 'Поиск',
  seekProgress: (current, duration) => `${current} из ${duration}`,
  currentlyPlaying: 'воспроизводится сейчас',
  unmute: 'Включить звук',
  unpin: 'Открепить',
  unpinColumn: 'Открепить столбец',
  videoPlayer: 'Видеоплеер',
  volume: 'Громкость',
  year: 'Год',
  zoomIn: 'Увеличить',
  zoomOut: 'Уменьшить',
};

registerTranslation(translation);

export default translation;
