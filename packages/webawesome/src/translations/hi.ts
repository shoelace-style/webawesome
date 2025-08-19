import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hi',
  $name: 'हिन्दी',
  $dir: 'ltr',
  carousel: 'कैरोसेल',
  clearEntry: 'प्रविष्टि साफ़ करें',
  close: 'बंद करें',
  copied: 'कॉपी किया गया',
  copy: 'कॉपी करें',
  currentValue: 'वर्तमान मान',
  error: 'त्रुटि',
  goToSlide: (slide, count) => `${count} में से स्लाइड ${slide} पर जाएं`,
  hidePassword: 'पासवर्ड छुपाएं',
  loading: 'लोड हो रहा है',
  nextSlide: 'अगली स्लाइड',
  numOptionsSelected: num => {
    if (num === 0) return 'कोई विकल्प चयनित नहीं';
    if (num === 1) return '1 विकल्प चयनित';
    return `${num} विकल्प चयनित`;
  },
  pauseAnimation: 'एनिमेशन रोकें',
  playAnimation: 'एनिमेशन चलाएं',
  previousSlide: 'पिछली स्लाइड',
  progress: 'प्रगति',
  remove: 'हटाएं',
  resize: 'आकार बदलें',
  scrollableRegion: 'स्क्रॉल करने योग्य क्षेत्र',
  scrollToEnd: 'अंत तक स्क्रॉल करें',
  scrollToStart: 'आरंभ तक स्क्रॉल करें',
  selectAColorFromTheScreen: 'स्क्रीन से एक रंग चुनें',
  showPassword: 'पासवर्ड दिखाएं',
  slideNum: slide => `स्लाइड ${slide}`,
  toggleColorFormat: 'रंग प्रारूप बदलें',
  zoomIn: 'ज़ूम इन',
  zoomOut: 'ज़ूम आउट',
};

registerTranslation(translation);

export default translation;
