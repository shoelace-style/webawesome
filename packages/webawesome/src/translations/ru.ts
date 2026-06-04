import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  am: 'AM',
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
  closeTimePicker: 'Закрыть выбор времени',
  copied: 'Скопировано',
  copy: 'Скопировать',
  currentValue: 'Текущее значение',
  date: 'Дата',
  datePickerKeyboardHelp:
    'Используйте стрелки для изменения значений; нажмите Alt+Стрелка вниз, чтобы открыть календарь.',
  day: 'День',
  dayPeriod: 'AM/PM',
  decrement: 'Уменьшить',
  dropFileHere: 'Перетащите файл сюда или нажмите, чтобы выбрать',
  dropFilesHere: 'Перетащите файлы сюда или нажмите, чтобы выбрать',
  empty: 'Пусто',
  error: 'Ошибка',
  enterFullscreen: 'Перейти в полноэкранный режим',
  endDate: 'Дата окончания',
  exitFullscreen: 'Выйти из полноэкранного режима',
  goToSlide: (slide, count) => `Перейти к слайду ${slide} из ${count}`,
  hidePassword: 'Скрыть пароль',
  hour: 'Час',
  incompleteDate: 'Введите полную дату.',
  increment: 'Увеличить',
  loading: 'Загрузка',
  minute: 'Минута',
  moreOptions: 'Дополнительные параметры',
  month: 'Месяц',
  mute: 'Выключить звук',
  nextDecade: 'Следующее десятилетие',
  nextMonth: 'Следующий месяц',
  nextSlide: 'Следующий слайд',
  nextVideo: 'Следующее видео',
  nextYear: 'Следующий год',
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
  pause: 'Пауза',
  pauseAnimation: 'Приостановить анимацию',
  pictureInPicture: 'Картинка в картинке',
  play: 'Воспроизвести',
  playbackSpeed: 'Скорость воспроизведения',
  playlist: 'Плейлист',
  playAnimation: 'Воспроизвести анимацию',
  pm: 'PM',
  previousDecade: 'Предыдущее десятилетие',
  previousMonth: 'Предыдущий месяц',
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
  remove: 'Удалить',
  resize: 'Изменить размер',
  scrollableRegion: 'Прокручиваемая область',
  scrollToEnd: 'Пролистать до конца',
  scrollToStart: 'Пролистать к началу',
  second: 'Секунда',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  selected: 'Выбрано',
  selectedDateLabel: date => `Выбрано: ${date}`,
  selectedRangeLabel: range => `Выбранный диапазон: ${range}`,
  selectionCleared: 'Выбор очищен',
  showPassword: 'Показать пароль',
  slideNum: slide => `Слайд ${slide}`,
  startDate: 'Дата начала',
  time: 'Время',
  timePickerKeyboardHelp:
    'Используйте стрелки для изменения значений; нажмите Alt+Стрелка вниз, чтобы открыть выбор времени.',
  today: 'Сегодня',
  toggleColorFormat: 'Переключить цветовую модель',
  seek: 'Поиск',
  seekProgress: (current, duration) => `${current} из ${duration}`,
  currentlyPlaying: 'воспроизводится сейчас',
  unmute: 'Включить звук',
  videoPlayer: 'Видеоплеер',
  volume: 'Громкость',
  year: 'Год',
  zoomIn: 'Увеличить',
  zoomOut: 'Уменьшить',
};

registerTranslation(translation);

export default translation;
