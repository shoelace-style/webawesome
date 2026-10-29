import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ar',
  $name: 'العربية',
  $dir: 'rtl',

  alignCenter: 'توسيط',
  alignEnd: 'محاذاة إلى النهاية',
  alignJustify: 'ضبط',
  alignment: 'المحاذاة',
  alignStart: 'محاذاة إلى البداية',
  allTagsRemoved: 'تمت إزالة كل الوسوم',
  alternativeText: 'نص بديل',
  am: 'ص',
  apply: 'تطبيق',
  autosizeColumn: 'ملاءمة حجم العمود تلقائيًا',
  blockquote: 'اقتباس',
  bold: 'غامق',
  bulletList: 'قائمة نقطية',
  caption: 'تسمية توضيحية',
  captions: 'تسميات توضيحية',
  carousel: 'كاروسيل',
  chooseDate: 'اختر التاريخ',
  chooseDecade: 'اختر العقد',
  chooseMonth: 'اختر الشهر',
  chooseTime: 'اختر الوقت',
  chooseYear: 'اختر السنة',
  clearEntry: 'حذف الخيارات',
  clearFilter: 'مسح التصفية',
  clearFormatting: 'مسح التنسيق',
  clearSort: 'مسح الفرز',
  close: 'اغلاق',
  closeCalendar: 'إغلاق التقويم',
  closeTimeInput: 'إغلاق منتقي الوقت',
  code: 'رمز برمجي',
  codeBlock: 'كتلة رمز برمجي',
  collapseRow: 'طي الصف',
  colorBlue: 'أزرق',
  colorGray: 'رمادي',
  colorGreen: 'أخضر',
  colorOrange: 'برتقالي',
  colorPink: 'وردي',
  colorPurple: 'أرجواني',
  colorRed: 'أحمر',
  colorYellow: 'أصفر',
  columnMenu: 'خيارات العمود',
  columnMovedToPosition: (label, position, total) => `تم نقل ${label} إلى الموضع ${position} من ${total}`,
  columns: 'الأعمدة',
  compactPageXOfY: (page, total) => `${page} من ${total}`,
  completed: 'مكتمل',
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
  deleteColumn: 'حذف العمود',
  deleteRow: 'حذف الصف',
  deleteTable: 'حذف الجدول',
  deselectAllRows: 'إلغاء تحديد كل الصفوف',
  disabled: 'معطل',
  dropFileHere: 'أسقط الملف هنا أو انقر للتصفح',
  dropFilesHere: 'أسقط الملفات هنا أو انقر للتصفح',
  editEmbed: 'تحرير المحتوى المضمّن',
  editImage: 'تحرير الصورة',
  editLink: 'تحرير الرابط',
  embed: 'محتوى مضمّن',
  embedPlaceholder: 'الصق عنوان URL أو رمز التضمين',
  embedRemoved: 'تمت إزالة المحتوى المضمّن',
  embedUrl: 'عنوان URL للمحتوى المضمّن',
  empty: 'فارغ',
  endDate: 'تاريخ الانتهاء',
  enterAtLeastNumCharacters: min => {
    if (min === 1) return 'أدخل حرفًا واحدًا على الأقل';
    if (min === 2) return 'أدخل حرفين على الأقل';
    if (min > 2 && min < 11) return `أدخل ${min} أحرف على الأقل`;
    return `أدخل ${min} حرفًا على الأقل`;
  },
  enterFullscreen: 'دخول وضع ملء الشاشة',
  enterUpToNumCharacters: max => {
    if (max === 1) return 'أدخل حرفًا واحدًا كحد أقصى';
    if (max === 2) return 'أدخل حرفين كحد أقصى';
    if (max > 2 && max < 11) return `أدخل ${max} أحرف كحد أقصى`;
    return `أدخل ${max} حرفًا كحد أقصى`;
  },
  error: 'خطأ',
  exitFullscreen: 'الخروج من وضع ملء الشاشة',
  expandRow: 'توسيع الصف',
  filterByColumn: label => `التصفية حسب ${label}`,
  filterFrom: 'من',
  filterMax: 'الحد الأقصى',
  filterMin: 'الحد الأدنى',
  filterTo: 'إلى',
  firstPage: 'الصفحة الأولى',
  formatMenu: 'مزيد من التنسيق',
  formatting: 'التنسيق',
  goToSlide: (slide, count) => `عرض شريحة رقم ${slide} من ${count}`,
  heading: 'عنوان',
  headingLevel: level => `عنوان ${level}`,
  hideColumn: 'إخفاء العمود',
  hidePassword: 'اخفاء كلمة المرور',
  highlight: 'تمييز',
  highlightColor: 'لون التمييز',
  horizontalRule: 'خط أفقي',
  hour: 'الساعة',
  image: 'صورة',
  imageRemoved: 'تمت إزالة الصورة',
  imageUrl: 'عنوان URL للصورة',
  incompleteDate: 'أدخل تاريخًا صالحًا.',
  increment: 'زيادة',
  indent: 'زيادة المسافة البادئة',
  insertColumnAfter: 'إدراج عمود بعد',
  insertColumnBefore: 'إدراج عمود قبل',
  insertEmbed: 'إدراج محتوى مضمّن',
  insertImage: 'إدراج صورة',
  insertLink: 'إدراج رابط',
  insertRowAbove: 'إدراج صف أعلى',
  insertRowBelow: 'إدراج صف أسفل',
  insertTable: 'إدراج جدول',
  insertTableOfSize: (rows, columns) => `إدراج جدول ${rows} × ${columns}`,
  italic: 'مائل',
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
  keyAlt: 'Alt',
  keyCtrl: 'Ctrl',
  keyShift: 'Shift',
  lastPage: 'الصفحة الأخيرة',
  link: 'رابط',
  linkRemoved: 'تمت إزالة الرابط',
  linkUrl: 'عنوان URL للرابط',
  lists: 'القوائم',
  loading: 'جاري التحميل',
  locked: 'مقفل',
  mergeCells: 'دمج الخلايا',
  minute: 'الدقيقة',
  month: 'الشهر',
  moreOptions: 'مزيد من الخيارات',
  moveColumnAfter: 'نقل العمود إلى الموضع التالي',
  moveColumnBefore: 'نقل العمود إلى الموضع السابق',
  moveRowDown: 'نقل الصف لأسفل',
  moveRowUp: 'نقل الصف لأعلى',
  mute: 'كتم الصوت',
  nextDecade: 'العقد التالي',
  nextMonth: 'الشهر التالي',
  nextPage: 'الصفحة التالية',
  nextSlide: 'الشريحة التالية',
  nextVideo: 'الفيديو التالي',
  nextYear: 'السنة التالية',
  noData: 'لا توجد بيانات',
  noOptions: 'لا توجد خيارات',
  noResults: 'لا توجد نتائج مطابقة',
  noSuggestions: 'لا توجد اقتراحات',
  notCompleted: 'غير مكتمل',
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
  numOptionsAvailable: num => {
    if (num === 0) return 'لا توجد خيارات متاحة';
    if (num === 1) return 'خيار واحد متاح';
    if (num === 2) return 'خياران متاحان';
    if (num > 2 && num < 11) return `${num} خيارات متاحة`;
    return `${num} خيارًا متاحًا`;
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
  openInNewTab: 'فتح في علامة تبويب جديدة',
  openLink: 'فتح الرابط',
  optionPosition: (label, position, total) => `${label}، ${position} من ${total}`,
  optionsLoadError: 'تعذر تحميل الخيارات',
  orderedList: 'قائمة مرقمة',
  outdent: 'إنقاص المسافة البادئة',
  pageXOfY: (page, total) => `الصفحة ${page} من ${total}`,
  pagination: 'ترقيم الصفحات',
  paragraph: 'فقرة',
  pasteAsPlainText: 'لصق كنص عادي',
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
  redo: 'إعادة',
  remove: 'حذف',
  removeColors: 'إزالة الألوان',
  removeLink: 'إزالة الرابط',
  resetColumns: 'إعادة تعيين الأعمدة',
  resize: 'تغيير الحجم',
  resizeColumn: 'تغيير حجم العمود',
  rowsAndColumns: (rows, columns) => `الصفوف: ${rows}، الأعمدة: ${columns}`,
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
  selectCell: 'تحديد الخلية',
  selected: 'محدد',
  selectedDateLabel: date => `المحدد: ${date}`,
  selectedRangeLabel: range => `النطاق المحدد: ${range}`,
  selectGroup: 'تحديد المجموعة',
  selectionCleared: 'تم مسح التحديد',
  selectRow: 'تحديد الصف',
  selectTable: 'تحديد الجدول',
  showingNofMRows: (shown, total) => `عرض ${shown} من ${total} صفوف`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} من ${total}`,
  showPassword: 'عرض كلمة المرور',
  slideNum: slide => `شريحة ${slide}`,
  sortAscending: 'فرز تصاعدي',
  sortColumn: 'فرز العمود',
  sortDescending: 'فرز تنازلي',
  splitCell: 'تقسيم الخلية',
  startDate: 'تاريخ البدء',
  steps: 'الخطوات',
  stepXOfY: (step, total) => `الخطوة ${step} من ${total}`,
  strikethrough: 'يتوسطه خط',
  subscript: 'منخفض',
  suggestions: 'اقتراحات',
  suggestionsAvailable: count => {
    if (count === 0) return 'لا توجد اقتراحات متاحة';
    if (count === 1) return 'اقتراح واحد متاح';
    if (count === 2) return 'اقتراحان متاحان';
    if (count > 2 && count < 11) return `${count} اقتراحات متاحة`;
    return `${count} اقتراحًا متاحًا`;
  },
  suggestionsLoadError: 'تعذر تحميل الاقتراحات',
  superscript: 'مرتفع',
  tableInserted: 'تم إدراج الجدول',
  tableOptions: 'خيارات الجدول',
  tableSize: 'حجم الجدول',
  tagAdded: tag => `تمت إضافة ${tag}`,
  tagAlreadyAdded: tag => `الوسم ${tag} مضاف بالفعل`,
  tagInputKeyboardHelp: 'اضغط Backspace أو Delete لإزالة هذا الوسم.',
  tagRemoved: tag => `تمت إزالة ${tag}`,
  textColor: 'لون النص',
  textStyle: 'نمط النص',
  time: 'الوقت',
  timeInputKeyboardHelp: 'استخدم مفاتيح الأسهم لتغيير القيم؛ اضغط Alt+سهم الأسفل لفتح منتقي الوقت.',
  title: 'العنوان',
  today: 'اليوم',
  toggleColorFormat: 'تغيير صيغة عرض  اللون',
  toggleHeaderColumn: 'عمود الرأس',
  toggleHeaderRow: 'صف الرأس',
  tooFewTags: min => {
    if (min === 1) return 'أضف وسمًا واحدًا على الأقل';
    if (min === 2) return 'أضف وسمين على الأقل';
    if (min > 2 && min < 11) return `أضف ${min} وسوم على الأقل`;
    return `أضف ${min} وسمًا على الأقل`;
  },
  tooManyTags: max => {
    if (max === 1) return 'لا تضف أكثر من وسم واحد';
    if (max === 2) return 'لا تضف أكثر من وسمين';
    if (max > 2 && max < 11) return `لا تضف أكثر من ${max} وسوم`;
    return `لا تضف أكثر من ${max} وسمًا`;
  },
  underline: 'تسطير',
  undo: 'تراجع',
  unmute: 'إلغاء كتم الصوت',
  unpin: 'إلغاء التثبيت',
  unpinColumn: 'إلغاء تثبيت العمود',
  url: 'عنوان URL',
  videoPlayer: 'مشغل الفيديو',
  volume: 'مستوى الصوت',
  wrapTextEnd: 'الصورة في النهاية، والنص يلتف حولها',
  wrapTextStart: 'الصورة في البداية، والنص يلتف حولها',
  year: 'السنة',
  zoomIn: 'تكبير',
  zoomOut: 'تصغير',
};

registerTranslation(translation);

export default translation;
