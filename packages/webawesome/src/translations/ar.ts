import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ar',
  $name: 'العربية',
  $dir: 'rtl',

  am: 'ص',
  autosizeColumn: 'ملاءمة حجم العمود تلقائيًا',
  captions: 'تسميات توضيحية',
  carousel: 'كاروسيل',
  chooseDate: 'اختر التاريخ',
  chooseDecade: 'اختر العقد',
  chooseMonth: 'اختر الشهر',
  chooseTime: 'اختر الوقت',
  chooseYear: 'اختر السنة',
  clearEntry: 'حذف الخيارات',
  clearSort: 'مسح الفرز',
  close: 'اغلاق',
  closeCalendar: 'إغلاق التقويم',
  closeTimeInput: 'إغلاق منتقي الوقت',
  collapseRow: 'طي الصف',
  columnMenu: 'خيارات العمود',
  columnMovedToPosition: (label, position, total) => `تم نقل ${label} إلى الموضع ${position} من ${total}`,
  columns: 'الأعمدة',
  compactPageXOfY: (page, total) => `${page} من ${total}`,
  copied: 'تم النسخ',
  copy: 'نسخ',
  createOption: value => `إنشاء "${value}"`,
  currentlyPlaying: 'يُشغَّل الآن',
  currentValue: 'القيمة الحالية',
  date: 'التاريخ',
  datePickerKeyboardHelp: 'استخدم مفاتيح الأسهم لتغيير القيم؛ اضغط Alt+سهم الأسفل لفتح التقويم.',
  day: 'اليوم',
  dayPeriod: 'ص/م',
  decrement: 'إنقاص',
  deselectAllRows: 'إلغاء تحديد كل الصفوف',
  dropFileHere: 'أسقط الملف هنا أو انقر للتصفح',
  dropFilesHere: 'أسقط الملفات هنا أو انقر للتصفح',
  empty: 'فارغ',
  endDate: 'تاريخ الانتهاء',
  enterFullscreen: 'دخول وضع ملء الشاشة',
  error: 'خطأ',
  exitFullscreen: 'الخروج من وضع ملء الشاشة',
  expandRow: 'توسيع الصف',
  filterByColumn: label => `التصفية حسب ${label}`,
  filterFrom: 'من',
  filterMax: 'الحد الأقصى',
  filterMin: 'الحد الأدنى',
  filterTo: 'إلى',
  firstPage: 'الصفحة الأولى',
  goToSlide: (slide, count) => `عرض شريحة رقم ${slide} من ${count}`,
  hideColumn: 'إخفاء العمود',
  hidePassword: 'اخفاء كلمة المرور',
  hour: 'الساعة',
  incompleteDate: 'أدخل تاريخًا صالحًا.',
  increment: 'زيادة',
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
  lastPage: 'الصفحة الأخيرة',
  loading: 'جاري التحميل',
  minute: 'الدقيقة',
  month: 'الشهر',
  moreOptions: 'مزيد من الخيارات',
  mute: 'كتم الصوت',
  nextDecade: 'العقد التالي',
  nextMonth: 'الشهر التالي',
  nextPage: 'الصفحة التالية',
  nextSlide: 'الشريحة التالية',
  nextVideo: 'الفيديو التالي',
  nextYear: 'السنة التالية',
  noData: 'لا توجد بيانات',
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
  numRowsCopied: num => {
    if (num === 0) return 'لم يتم نسخ أي صفوف';
    if (num === 1) return 'تم نسخ صف واحد';
    if (num === 2) return 'تم نسخ صفان';
    if (num > 2 && num < 11) return `تم نسخ ${num} صفوف`;
    return `تم نسخ ${num} صفًا`;
  },
  numRowsSelected: num => {
    if (num === 0) return 'لم يتم تحديد أي صفوف';
    if (num === 1) return 'تم تحديد صف واحد';
    if (num === 2) return 'تم تحديد صفان';
    if (num > 2 && num < 11) return `تم تحديد ${num} صفوف`;
    return `تم تحديد ${num} صفًا`;
  },
  pageXOfY: (page, total) => `الصفحة ${page} من ${total}`,
  pagination: 'ترقيم الصفحات',
  pause: 'إيقاف مؤقت',
  pauseAnimation: 'إيقاف الرسوم المتحركة مؤقتًا',
  pictureInPicture: 'صورة داخل صورة',
  pinLeft: 'التثبيت إلى اليسار',
  pinRight: 'التثبيت إلى اليمين',
  play: 'تشغيل',
  playAnimation: 'تشغيل الرسوم المتحركة',
  playbackSpeed: 'سرعة التشغيل',
  playlist: 'قائمة التشغيل',
  pm: 'م',
  previousDecade: 'العقد السابق',
  previousMonth: 'الشهر السابق',
  previousPage: 'الصفحة السابقة',
  previousSlide: 'الشريحة السابقة',
  previousVideo: 'الفيديو السابق',
  previousYear: 'السنة السابقة',
  progress: 'مقدار التقدم',
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
  readonly: 'للقراءة فقط',
  remove: 'حذف',
  resize: 'تغيير الحجم',
  resizeColumn: 'تغيير حجم العمود',
  rowsPerPage: 'الصفوف في الصفحة',
  scrollableRegion: 'منطقة قابلة للتمرير',
  scrollToEnd: 'الانتقال الى النهاية',
  scrollToStart: 'الانتقال الى البداية',
  search: 'بحث',
  second: 'الثانية',
  seek: 'بحث',
  seekProgress: (current, duration) => `${current} من ${duration}`,
  selectAColorFromTheScreen: 'اختر لون من الشاشة',
  selectAllRows: 'تحديد كل الصفوف',
  selected: 'محدد',
  selectedDateLabel: date => `المحدد: ${date}`,
  selectedRangeLabel: range => `النطاق المحدد: ${range}`,
  selectGroup: 'تحديد المجموعة',
  selectionCleared: 'تم مسح التحديد',
  selectRow: 'تحديد الصف',
  showingNofMRows: (shown, total) => `عرض ${shown} من ${total} صفوف`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} من ${total}`,
  showPassword: 'عرض كلمة المرور',
  slideNum: slide => `شريحة ${slide}`,
  sortAscending: 'فرز تصاعدي',
  sortColumn: 'فرز العمود',
  sortDescending: 'فرز تنازلي',
  startDate: 'تاريخ البدء',
  time: 'الوقت',
  timeInputKeyboardHelp: 'استخدم مفاتيح الأسهم لتغيير القيم؛ اضغط Alt+سهم الأسفل لفتح منتقي الوقت.',
  today: 'اليوم',
  toggleColorFormat: 'تغيير صيغة عرض  اللون',
  unmute: 'إلغاء كتم الصوت',
  unpin: 'إلغاء التثبيت',
  unpinColumn: 'إلغاء تثبيت العمود',
  videoPlayer: 'مشغل الفيديو',
  volume: 'مستوى الصوت',
  year: 'السنة',
  zoomIn: 'تكبير',
  zoomOut: 'تصغير',
};

registerTranslation(translation);

export default translation;
