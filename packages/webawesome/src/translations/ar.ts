import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ar',
  $name: 'العربية',
  $dir: 'rtl',

  am: 'ص',
  carousel: 'كاروسيل',
  captions: 'تسميات توضيحية',
  chooseDate: 'اختر التاريخ',
  chooseDecade: 'اختر العقد',
  chooseMonth: 'اختر الشهر',
  chooseTime: 'اختر الوقت',
  chooseYear: 'اختر السنة',
  clearEntry: 'حذف الخيارات',
  createOption: value => `إنشاء "${value}"`,
  close: 'اغلاق',
  closeCalendar: 'إغلاق التقويم',
  closeTimeInput: 'إغلاق منتقي الوقت',
  copied: 'تم النسخ',
  copy: 'نسخ',
  currentValue: 'القيمة الحالية',
  date: 'التاريخ',
  datePickerKeyboardHelp: 'استخدم مفاتيح الأسهم لتغيير القيم؛ اضغط Alt+سهم الأسفل لفتح التقويم.',
  day: 'اليوم',
  dayPeriod: 'ص/م',
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
  hour: 'الساعة',
  incompleteDate: 'أدخل تاريخًا صالحًا.',
  increment: 'زيادة',
  loading: 'جاري التحميل',
  minute: 'الدقيقة',
  moreOptions: 'مزيد من الخيارات',
  month: 'الشهر',
  mute: 'كتم الصوت',
  nextDecade: 'العقد التالي',
  nextMonth: 'الشهر التالي',
  nextSlide: 'الشريحة التالية',
  nextVideo: 'الفيديو التالي',
  nextYear: 'السنة التالية',
  now: 'الآن',
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
  pm: 'م',
  previousDecade: 'العقد السابق',
  previousMonth: 'الشهر السابق',
  previousSlide: 'الشريحة السابقة',
  previousVideo: 'الفيديو السابق',
  previousYear: 'السنة السابقة',
  progress: 'مقدار التقدم',
  readonly: 'للقراءة فقط',
  rangeTooLong: max => {
    if (max === 1) return 'اختر نطاقًا لا يتجاوز يومًا واحدًا';
    if (max === 2) return 'اختر نطاقًا لا يتجاوز يومين';
    if (max > 2 && max < 11) return `اختر نطاقًا لا يتجاوز ${max} أيام`;
    return `اختر نطاقًا لا يتجاوز ${max} يومًا`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'اختر نطاقًا لا يقل عن يوم واحد';
    if (min === 2) return 'اختر نطاقًا لا يقل عن يومين';
    if (min > 2 && min < 11) return `اختر نطاقًا لا يقل عن ${min} أيام`;
    return `اختر نطاقًا لا يقل عن ${min} يومًا`;
  },
  remove: 'حذف',
  resize: 'تغيير الحجم',
  scrollableRegion: 'منطقة قابلة للتمرير',
  scrollToEnd: 'الانتقال الى النهاية',
  scrollToStart: 'الانتقال الى البداية',
  second: 'الثانية',
  selectAColorFromTheScreen: 'اختر لون من الشاشة',
  selected: 'محدد',
  selectedDateLabel: date => `المحدد: ${date}`,
  selectedRangeLabel: range => `النطاق المحدد: ${range}`,
  selectionCleared: 'تم مسح التحديد',
  showPassword: 'عرض كلمة المرور',
  slideNum: slide => `شريحة ${slide}`,
  startDate: 'تاريخ البدء',
  time: 'الوقت',
  timeInputKeyboardHelp: 'استخدم مفاتيح الأسهم لتغيير القيم؛ اضغط Alt+سهم الأسفل لفتح منتقي الوقت.',
  today: 'اليوم',
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

  // Data grid
  noData: 'لا توجد بيانات',
  search: 'بحث',
  selectAllRows: 'تحديد كل الصفوف',
  deselectAllRows: 'إلغاء تحديد كل الصفوف',
  selectRow: 'تحديد الصف',
  selectGroup: 'تحديد المجموعة',
  resizeColumn: 'تغيير حجم العمود',
  sortColumn: 'فرز العمود',
  columns: 'الأعمدة',
  expandRow: 'توسيع الصف',
  collapseRow: 'طي الصف',
  pagination: 'ترقيم الصفحات',
  firstPage: 'الصفحة الأولى',
  previousPage: 'الصفحة السابقة',
  nextPage: 'الصفحة التالية',
  lastPage: 'الصفحة الأخيرة',
  rowsPerPage: 'الصفوف في الصفحة',
  jumpBackwardX: count => {
    if (count === 1) return 'الرجوع صفحة واحدة';
    if (count === 2) return 'الرجوع صفحتين';
    if (count > 2 && count < 11) return `الرجوع ${count} صفحات`;
    return `الرجوع ${count} صفحة`;
  },
  jumpForwardX: count => {
    if (count === 1) return 'التقدم صفحة واحدة';
    if (count === 2) return 'التقدم صفحتين';
    if (count > 2 && count < 11) return `التقدم ${count} صفحات`;
    return `التقدم ${count} صفحة`;
  },
  pageXOfY: (page, total) => `الصفحة ${page} من ${total}`,
  compactPageXOfY: (page, total) => `${page} من ${total}`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} من ${total}`,
  numRowsSelected: num => {
    if (num === 0) return 'لم يتم تحديد أي صفوف';
    if (num === 1) return 'تم تحديد صف واحد';
    if (num === 2) return 'تم تحديد صفان';
    if (num > 2 && num < 11) return `تم تحديد ${num} صفوف`;
    return `تم تحديد ${num} صفًا`;
  },
  showingNofMRows: (shown, total) => `عرض ${shown} من ${total} صفوف`,
  columnMovedToPosition: (label, position, total) => `تم نقل ${label} إلى الموضع ${position} من ${total}`,
  filterMin: 'الحد الأدنى',
  filterMax: 'الحد الأقصى',
  filterByColumn: label => `التصفية حسب ${label}`,
  columnMenu: 'خيارات العمود',
  unpinColumn: 'إلغاء تثبيت العمود',
  pinLeft: 'التثبيت إلى اليسار',
  pinRight: 'التثبيت إلى اليمين',
  unpin: 'إلغاء التثبيت',
  sortAscending: 'فرز تصاعدي',
  sortDescending: 'فرز تنازلي',
  clearSort: 'مسح الفرز',
  hideColumn: 'إخفاء العمود',
  autosizeColumn: 'ملاءمة حجم العمود تلقائيًا',
};

registerTranslation(translation);

export default translation;
