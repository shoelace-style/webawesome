import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ar',
  $name: 'العربية',
  $dir: 'rtl',

  carousel: 'كاروسيل',
  captions: 'تسميات توضيحية',
  clearEntry: 'حذف الخيارات',
  close: 'اغلاق',
  copied: 'تم النسخ',
  copy: 'نسخ',
  currentValue: 'القيمة الحالية',
  decrement: 'إنقاص',
  dropFileHere: 'أسقط الملف هنا أو انقر للتصفح',
  dropFilesHere: 'أسقط الملفات هنا أو انقر للتصفح',
  error: 'خطأ',
  enterFullscreen: 'دخول وضع ملء الشاشة',
  exitFullscreen: 'الخروج من وضع ملء الشاشة',
  goToSlide: (slide, count) => `عرض شريحة رقم ${slide} من ${count}`,
  hidePassword: 'اخفاء كلمة المرور',
  increment: 'زيادة',
  loading: 'جاري التحميل',
  moreOptions: 'مزيد من الخيارات',
  mute: 'كتم الصوت',
  nextSlide: 'الشريحة التالية',
  nextVideo: 'الفيديو التالي',
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
  previousSlide: 'الشريحة السابقة',
  previousVideo: 'الفيديو السابق',
  progress: 'مقدار التقدم',
  remove: 'حذف',
  resize: 'تغيير الحجم',
  scrollableRegion: 'منطقة قابلة للتمرير',
  scrollToEnd: 'الانتقال الى النهاية',
  scrollToStart: 'الانتقال الى البداية',
  selectAColorFromTheScreen: 'اختر لون من الشاشة',
  showPassword: 'عرض كلمة المرور',
  slideNum: slide => `شريحة ${slide}`,
  toggleColorFormat: 'تغيير صيغة عرض  اللون',
  seek: 'بحث',
  seekProgress: (current, duration) => `${current} من ${duration}`,
  currentlyPlaying: 'يُشغَّل الآن',
  unmute: 'إلغاء كتم الصوت',
  videoPlayer: 'مشغل الفيديو',
  volume: 'مستوى الصوت',
  zoomIn: 'تكبير',
  zoomOut: 'تصغير',
};

registerTranslation(translation);

export default translation;
