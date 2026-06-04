import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hi',
  $name: 'हिन्दी',
  $dir: 'ltr',
  am: 'पूर्वाह्न',
  carousel: 'कैरोसेल',
  captions: 'कैप्शन',
  chooseDate: 'तारीख़ चुनें',
  chooseDecade: 'दशक चुनें',
  chooseMonth: 'महीना चुनें',
  chooseTime: 'समय चुनें',
  chooseYear: 'वर्ष चुनें',
  clearEntry: 'प्रविष्टि साफ़ करें',
  createOption: value => `"${value}" बनाएँ`,
  close: 'बंद करें',
  closeCalendar: 'कैलेंडर बंद करें',
  closeTimePicker: 'समय चयनकर्ता बंद करें',
  copied: 'कॉपी किया गया',
  copy: 'कॉपी करें',
  currentValue: 'वर्तमान मान',
  date: 'तारीख़',
  datePickerKeyboardHelp: 'मान बदलने के लिए तीर कुंजियों का उपयोग करें; कैलेंडर खोलने के लिए Alt+नीचे तीर दबाएं.',
  day: 'दिन',
  dayPeriod: 'पूर्वाह्न/अपराह्न',
  decrement: 'घटाएं',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'खाली',
  error: 'त्रुटि',
  enterFullscreen: 'पूर्ण स्क्रीन में जाएं',
  endDate: 'समाप्ति तिथि',
  exitFullscreen: 'पूर्ण स्क्रीन से बाहर निकलें',
  goToSlide: (slide, count) => `${count} में से स्लाइड ${slide} पर जाएं`,
  hidePassword: 'पासवर्ड छुपाएं',
  hour: 'घंटा',
  incompleteDate: 'पूरी तारीख़ दर्ज करें.',
  increment: 'बढ़ाएं',
  loading: 'लोड हो रहा है',
  minute: 'मिनट',
  moreOptions: 'अधिक विकल्प',
  month: 'महीना',
  mute: 'म्यूट',
  nextDecade: 'अगला दशक',
  nextMonth: 'अगला महीना',
  nextSlide: 'अगली स्लाइड',
  nextVideo: 'अगला वीडियो',
  nextYear: 'अगला वर्ष',
  now: 'अभी',
  numCharacters: num => {
    if (num === 1) return '1 अक्षर';
    return `${num} अक्षर`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 अक्षर शेष';
    return `${num} अक्षर शेष`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'कोई विकल्प चयनित नहीं';
    if (num === 1) return '1 विकल्प चयनित';
    return `${num} विकल्प चयनित`;
  },
  pause: 'रोकें',
  pauseAnimation: 'एनिमेशन रोकें',
  pictureInPicture: 'पिक्चर इन पिक्चर',
  play: 'चलाएं',
  playbackSpeed: 'प्लेबैक गति',
  playlist: 'प्लेलिस्ट',
  playAnimation: 'एनिमेशन चलाएं',
  pm: 'अपराह्न',
  previousDecade: 'पिछला दशक',
  previousMonth: 'पिछला महीना',
  previousSlide: 'पिछली स्लाइड',
  previousVideo: 'पिछला वीडियो',
  previousYear: 'पिछला वर्ष',
  progress: 'प्रगति',
  readonly: 'केवल-पढ़ने योग्य',
  rangeTooLong: max => {
    if (max === 1) return '1 दिन से अधिक लंबी श्रेणी न चुनें';
    return `${max} दिन से अधिक लंबी श्रेणी न चुनें`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'कम से कम 1 दिन लंबी श्रेणी चुनें';
    return `कम से कम ${min} दिन लंबी श्रेणी चुनें`;
  },
  remove: 'हटाएं',
  resize: 'आकार बदलें',
  scrollableRegion: 'स्क्रॉल करने योग्य क्षेत्र',
  scrollToEnd: 'अंत तक स्क्रॉल करें',
  scrollToStart: 'आरंभ तक स्क्रॉल करें',
  second: 'सेकंड',
  selectAColorFromTheScreen: 'स्क्रीन से एक रंग चुनें',
  selected: 'चयनित',
  selectedDateLabel: date => `चयनित: ${date}`,
  selectedRangeLabel: range => `चयनित श्रेणी: ${range}`,
  selectionCleared: 'चयन साफ़ किया गया',
  showPassword: 'पासवर्ड दिखाएं',
  slideNum: slide => `स्लाइड ${slide}`,
  startDate: 'आरंभ तिथि',
  time: 'समय',
  timePickerKeyboardHelp: 'मान बदलने के लिए तीर कुंजियों का उपयोग करें; समय चयनकर्ता खोलने के लिए Alt+नीचे तीर दबाएं.',
  today: 'आज',
  toggleColorFormat: 'रंग प्रारूप बदलें',
  seek: 'खोजें',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'अभी चल रहा है',
  unmute: 'अनम्यूट',
  videoPlayer: 'वीडियो प्लेयर',
  volume: 'वॉल्यूम',
  year: 'वर्ष',
  zoomIn: 'ज़ूम इन',
  zoomOut: 'ज़ूम आउट',
};

registerTranslation(translation);

export default translation;
