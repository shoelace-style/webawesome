import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'he',
  $name: 'עברית',
  $dir: 'rtl',

  carousel: 'קרוסלה',
  captions: 'כתוביות',
  clearEntry: 'נקה קלט',
  createOption: value => `יצירת "${value}"`,
  close: 'סגור',
  copied: 'מוּעֲתָק',
  copy: 'העתק',
  currentValue: 'ערך נוכחי',
  decrement: 'הקטן',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'שְׁגִיאָה',
  enterFullscreen: 'כניסה למסך מלא',
  exitFullscreen: 'יציאה ממסך מלא',
  goToSlide: (slide, count) => `עבור לשקופית ${slide} של ${count}`,
  hidePassword: 'הסתר סיסמא',
  increment: 'הגדל',
  loading: 'טוען',
  moreOptions: 'אפשרויות נוספות',
  mute: 'השתקה',
  nextSlide: 'השקף הבא',
  nextVideo: 'הסרטון הבא',
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
  previousSlide: 'שקופית קודמת',
  previousVideo: 'הסרטון הקודם',
  progress: 'התקדמות',
  remove: 'לְהַסִיר',
  resize: 'שנה גודל',
  scrollableRegion: 'אזור גלילה',
  scrollToEnd: 'גלול עד הסוף',
  scrollToStart: 'גלול להתחלה',
  selectAColorFromTheScreen: 'בחור צבע מהמסך',
  showPassword: 'הראה סיסמה',
  slideNum: slide => `שקופית ${slide}`,
  toggleColorFormat: 'החלף פורמט צבע',
  seek: 'חפש',
  seekProgress: (current, duration) => `${current} מתוך ${duration}`,
  currentlyPlaying: 'מתנגן כעת',
  unmute: 'ביטול השתקה',
  videoPlayer: 'נגן וידאו',
  volume: 'עוצמת קול',
  zoomIn: 'התקרב',
  zoomOut: 'התרחק',
};

registerTranslation(translation);

export default translation;
