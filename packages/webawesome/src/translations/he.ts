import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'he',
  $name: 'עברית',
  $dir: 'rtl',

  am: 'לפנה"צ',
  carousel: 'קרוסלה',
  captions: 'כתוביות',
  chooseDate: 'בחר תאריך',
  chooseTime: 'בחר שעה',
  chooseDecade: 'בחר עשור',
  chooseMonth: 'בחר חודש',
  chooseYear: 'בחר שנה',
  clearEntry: 'נקה קלט',
  createOption: value => `יצירת "${value}"`,
  close: 'סגור',
  closeCalendar: 'סגור לוח שנה',
  closeTimeInput: 'סגור בורר שעה',
  copied: 'מוּעֲתָק',
  copy: 'העתק',
  currentValue: 'ערך נוכחי',
  date: 'תאריך',
  datePickerKeyboardHelp: 'השתמש במקשי החיצים כדי לשנות ערכים; לחץ Alt+חץ למטה כדי לפתוח את לוח השנה.',
  day: 'יום',
  dayPeriod: 'לפנה"צ/אחה"צ',
  decrement: 'הקטן',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'ריק',
  error: 'שְׁגִיאָה',
  enterFullscreen: 'כניסה למסך מלא',
  endDate: 'תאריך סיום',
  exitFullscreen: 'יציאה ממסך מלא',
  goToSlide: (slide, count) => `עבור לשקופית ${slide} של ${count}`,
  hidePassword: 'הסתר סיסמא',
  hour: 'שעה',
  incompleteDate: 'הזן תאריך מלא.',
  increment: 'הגדל',
  loading: 'טוען',
  minute: 'דקה',
  moreOptions: 'אפשרויות נוספות',
  month: 'חודש',
  mute: 'השתקה',
  nextDecade: 'העשור הבא',
  nextMonth: 'החודש הבא',
  nextSlide: 'השקף הבא',
  nextVideo: 'הסרטון הבא',
  nextYear: 'השנה הבאה',
  now: 'עכשיו',
  numCharacters: num => {
    if (num === 1) return '1 תו';
    return `${num} תווים`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 תו נותר';
    return `${num} תווים נותרים`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'לא נבחרו אפשרויות';
    if (num === 1) return 'נבחרה אפשרות אחת';
    return `נבחרו ${num} אפשרויות`;
  },
  pause: 'השהייה',
  pauseAnimation: 'השהה אנימציה',
  pictureInPicture: 'תמונה בתוך תמונה',
  play: 'הפעלה',
  playbackSpeed: 'מהירות הפעלה',
  playlist: 'רשימת השמעה',
  playAnimation: 'נגן אנימציה',
  pm: 'אחה"צ',
  previousDecade: 'העשור הקודם',
  previousMonth: 'החודש הקודם',
  previousSlide: 'שקופית קודמת',
  previousVideo: 'הסרטון הקודם',
  previousYear: 'השנה הקודמת',
  progress: 'התקדמות',
  readonly: 'לקריאה בלבד',
  rangeTooLong: max => {
    if (max === 1) return 'בחר טווח שאינו ארוך מיום אחד';
    return `בחר טווח שאינו ארוך מ-${max} ימים`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'בחר טווח של יום אחד לפחות';
    return `בחר טווח של ${min} ימים לפחות`;
  },
  remove: 'לְהַסִיר',
  resize: 'שנה גודל',
  scrollableRegion: 'אזור גלילה',
  second: 'שנייה',
  scrollToEnd: 'גלול עד הסוף',
  scrollToStart: 'גלול להתחלה',
  selectAColorFromTheScreen: 'בחור צבע מהמסך',
  selected: 'נבחר',
  selectedDateLabel: date => `נבחר: ${date}`,
  selectedRangeLabel: range => `טווח נבחר: ${range}`,
  selectionCleared: 'הבחירה נוקתה',
  showPassword: 'הראה סיסמה',
  slideNum: slide => `שקופית ${slide}`,
  startDate: 'תאריך התחלה',
  time: 'שעה',
  timeInputKeyboardHelp: 'השתמש במקשי החיצים כדי לשנות ערכים; לחץ Alt+חץ למטה כדי לפתוח את בורר השעה.',
  today: 'היום',
  toggleColorFormat: 'החלף פורמט צבע',
  seek: 'חפש',
  seekProgress: (current, duration) => `${current} מתוך ${duration}`,
  currentlyPlaying: 'מתנגן כעת',
  unmute: 'ביטול השתקה',
  videoPlayer: 'נגן וידאו',
  volume: 'עוצמת קול',
  year: 'שנה',
  zoomIn: 'התקרב',
  zoomOut: 'התרחק',
};

registerTranslation(translation);

export default translation;
