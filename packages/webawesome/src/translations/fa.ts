import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fa',
  $name: 'فارسی',
  $dir: 'rtl',

  carousel: 'چرخ‌فلک',
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
  goToSlide: (slide, count) => `رفتن به اسلاید ${slide} از ${count}`,
  hidePassword: 'پنهان کردن رمز',
  increment: 'افزایش',
  loading: 'بارگزاری',
  nextSlide: 'اسلاید بعدی',
  numOptionsSelected: num => {
    if (num === 0) return 'هیچ گزینه‌ای انتخاب نشده است';
    return `${num} گزینه انتخاب شده است`;
  },
  pauseAnimation: 'توقف انیمیشن',
  playAnimation: 'پخش انیمیشن',
  previousSlide: 'اسلاید قبلی',
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
  zoomIn: 'بزرگ‌نمایی',
  zoomOut: 'کوچک‌نمایی',
};

registerTranslation(translation);

export default translation;
