import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ar',
  $name: 'العربية',
  $dir: 'rtl',

  carousel: 'كاروسيل',
  captions: 'تسميات توضيحية',
  chooseDate: 'اختر التاريخ',
  chooseDecade: 'اختر العقد',
  chooseMonth: 'اختر الشهر',
  chooseYear: 'اختر السنة',
  clearEntry: 'حذف الخيارات',
  createOption: value => `إنشاء "${value}"`,
  close: 'اغلاق',
  closeCalendar: 'إغلاق التقويم',
  copied: 'تم النسخ',
  copy: 'نسخ',
  currentValue: 'القيمة الحالية',
  date: 'التاريخ',
  datePickerKeyboardHelp: 'استخدم مفاتيح الأسهم لتغيير القيم؛ اضغط Alt+سهم الأسفل لفتح التقويم.',
  day: 'اليوم',
  decrement: 'إنقاص',
  dropFileHere: 'أسقط الملف هنا أو انقر للتصفح',
  dropFilesHere: 'أسقط الملفات هنا أو انقر للتصفح',
  empty: 'فارغ',
  error: 'خطأ',
  enterFullscreen: 'دخول وضع ملء الشاشة',
  endDate: 'تاريخ الانتهاء',
  exitFullscreen: 'الخروج من وضع ملء الشاشة',
  goToSlide: (slide, count) => `عرض شريحة رقم ${slide} من ${count}`,
  hidePassword: 'اخفاء كلمة المرور',
  increment: 'زيادة',
  loading: 'جاري التحميل',
  moreOptions: 'مزيد من الخيارات',
  month: 'الشهر',
  mute: 'كتم الصوت',
  nextDecade: 'العقد التالي',
  nextMonth: 'الشهر التالي',
  nextSlide: 'الشريحة التالية',
  nextVideo: 'الفيديو التالي',
  nextYear: 'السنة التالية',
  numCharacters: num => {
    if (num === 0) return '0 أحرف';
    if (num === 1) return '1 حرف';
    if (num === 2) return '2 حرفان';
    if (num > 2 && num < 11) return `${num} أحرف`;
    return `${num} حرفًا`;
  },
  numCharactersRemaining: num => {
    if (num === 0) return '0 أحرف متبقية';
    if (num === 1) return '1 حرف متبقٍ';
    if (num === 2) return '2 حرفان متبقيان';
    if (num > 2 && num < 11) return `${num} أحرف متبقية`;
    return `${num} حرفًا متبقيًا`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'لم يتم تحديد أي خيارات';
    if (num === 1) return 'تم تحديد خيار واحد';
    if (num === 2) return 'تم تحديد خياران';
    if (num > 2 && num < 11) return `تم تحديد ${num} خيارات`;
    return `تم تحديد ${num} خيار`;
  },
  pause: 'إيقاف مؤقت',
  pauseAnimation: 'إيقاف الرسوم المتحركة مؤقتًا',
  pictureInPicture: 'صورة داخل صورة',
  play: 'تشغيل',
  playbackSpeed: 'سرعة التشغيل',
  playlist: 'قائمة التشغيل',
  playAnimation: 'تشغيل الرسوم المتحركة',
  previousDecade: 'العقد السابق',
  previousMonth: 'الشهر السابق',
  previousSlide: 'الشريحة السابقة',
  previousVideo: 'الفيديو السابق',
  previousYear: 'السنة السابقة',
  progress: 'مقدار التقدم',
  remove: 'حذف',
  resize: 'تغيير الحجم',
  scrollableRegion: 'منطقة قابلة للتمرير',
  scrollToEnd: 'الانتقال الى النهاية',
  scrollToStart: 'الانتقال الى البداية',
  selectAColorFromTheScreen: 'اختر لون من الشاشة',
  showPassword: 'عرض كلمة المرور',
  slideNum: slide => `شريحة ${slide}`,
  startDate: 'تاريخ البدء',
  toggleColorFormat: 'تغيير صيغة عرض  اللون',
  seek: 'بحث',
  seekProgress: (current, duration) => `${current} من ${duration}`,
  currentlyPlaying: 'يُشغَّل الآن',
  unmute: 'إلغاء كتم الصوت',
  videoPlayer: 'مشغل الفيديو',
  volume: 'مستوى الصوت',
  year: 'السنة',
  zoomIn: 'تكبير',
  zoomOut: 'تصغير',
};

registerTranslation(translation);

export default translation;
