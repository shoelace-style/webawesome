import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fa',
  $name: 'فارسی',
  $dir: 'rtl',

  carousel: 'چرخ‌فلک',
  captions: 'زیرنویس',
  chooseDate: 'انتخاب تاریخ',
  chooseDecade: 'انتخاب دهه',
  chooseMonth: 'انتخاب ماه',
  chooseYear: 'انتخاب سال',
  clearEntry: 'پاک کردن ورودی',
  createOption: value => `ایجاد "${value}"`,
  close: 'بستن',
  closeCalendar: 'بستن تقویم',
  copied: 'کپی شد',
  copy: 'کپی',
  currentValue: 'مقدار فعلی',
  date: 'تاریخ',
  datePickerKeyboardHelp: 'از کلیدهای جهت‌نما برای تغییر مقادیر استفاده کنید؛ برای باز کردن تقویم Alt+جهت‌نمای پایین را فشار دهید.',
  day: 'روز',
  decrement: 'کاهش',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'خالی',
  error: 'خطا',
  enterFullscreen: 'ورود به حالت تمام‌صفحه',
  endDate: 'تاریخ پایان',
  exitFullscreen: 'خروج از حالت تمام‌صفحه',
  goToSlide: (slide, count) => `رفتن به اسلاید ${slide} از ${count}`,
  hidePassword: 'پنهان کردن رمز',
  increment: 'افزایش',
  loading: 'بارگزاری',
  moreOptions: 'گزینه‌های بیشتر',
  month: 'ماه',
  mute: 'بی‌صدا',
  nextDecade: 'دهه بعد',
  nextMonth: 'ماه بعد',
  nextSlide: 'اسلاید بعدی',
  nextVideo: 'ویدیوی بعدی',
  nextYear: 'سال بعد',
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
  previousDecade: 'دهه قبل',
  previousMonth: 'ماه قبل',
  previousSlide: 'اسلاید قبلی',
  previousVideo: 'ویدیوی قبلی',
  previousYear: 'سال قبل',
  progress: 'پیشرفت',
  remove: 'حذف',
  resize: 'تغییر اندازه',
  scrollableRegion: 'ناحیه قابل اسکرول',
  scrollToEnd: 'اسکرول به انتها',
  scrollToStart: 'اسکرول به ابتدا',
  selectAColorFromTheScreen: 'انتخاب یک رنگ از صفحه نمایش',
  showPassword: 'نمایش رمز',
  slideNum: slide => `اسلاید ${slide}`,
  startDate: 'تاریخ شروع',
  toggleColorFormat: 'تغییر قالب رنگ',
  seek: 'جستجو',
  seekProgress: (current, duration) => `${current} از ${duration}`,
  currentlyPlaying: 'در حال پخش',
  unmute: 'لغو بی‌صدا',
  videoPlayer: 'پخش‌کننده ویدیو',
  volume: 'صدا',
  year: 'سال',
  zoomIn: 'بزرگ‌نمایی',
  zoomOut: 'کوچک‌نمایی',
};

registerTranslation(translation);

export default translation;
