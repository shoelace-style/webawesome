import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fa',
  $name: 'فارسی',
  $dir: 'rtl',

  carousel: 'چرخ‌فلک',
  captions: 'زیرنویس',
  clearEntry: 'پاک کردن ورودی',
  createOption: value => `ایجاد "${value}"`,
  close: 'بستن',
  copied: 'کپی شد',
  copy: 'کپی',
  currentValue: 'مقدار فعلی',
  decrement: 'کاهش',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'خطا',
  enterFullscreen: 'ورود به حالت تمام‌صفحه',
  exitFullscreen: 'خروج از حالت تمام‌صفحه',
  goToSlide: (slide, count) => `رفتن به اسلاید ${slide} از ${count}`,
  hidePassword: 'پنهان کردن رمز',
  increment: 'افزایش',
  loading: 'بارگزاری',
  moreOptions: 'گزینه‌های بیشتر',
  mute: 'بی‌صدا',
  nextSlide: 'اسلاید بعدی',
  nextVideo: 'ویدیوی بعدی',
  numCharacters: num => {
    if (num === 1) return '1 نویسه';
    return `${num} نویسه`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 نویسه باقیمانده';
    return `${num} نویسه باقیمانده`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'هیچ گزینه‌ای انتخاب نشده است';
    return `${num} گزینه انتخاب شده است`;
  },
  pause: 'مکث',
  pauseAnimation: 'توقف انیمیشن',
  pictureInPicture: 'تصویر در تصویر',
  play: 'پخش',
  playbackSpeed: 'سرعت پخش',
  playlist: 'لیست پخش',
  playAnimation: 'پخش انیمیشن',
  previousSlide: 'اسلاید قبلی',
  previousVideo: 'ویدیوی قبلی',
  progress: 'پیشرفت',
  remove: 'حذف',
  resize: 'تغییر اندازه',
  scrollableRegion: 'ناحیه قابل اسکرول',
  scrollToEnd: 'اسکرول به انتها',
  scrollToStart: 'اسکرول به ابتدا',
  selectAColorFromTheScreen: 'انتخاب یک رنگ از صفحه نمایش',
  showPassword: 'نمایش رمز',
  slideNum: slide => `اسلاید ${slide}`,
  toggleColorFormat: 'تغییر قالب رنگ',
  seek: 'جستجو',
  seekProgress: (current, duration) => `${current} از ${duration}`,
  currentlyPlaying: 'در حال پخش',
  unmute: 'لغو بی‌صدا',
  videoPlayer: 'پخش‌کننده ویدیو',
  volume: 'صدا',
  zoomIn: 'بزرگ‌نمایی',
  zoomOut: 'کوچک‌نمایی',
};

registerTranslation(translation);

export default translation;
