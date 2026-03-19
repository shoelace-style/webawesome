import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hi',
  $name: 'हिन्दी',
  $dir: 'ltr',
  carousel: 'कैरोसेल',
  captions: 'कैप्शन',
  clearEntry: 'प्रविष्टि साफ़ करें',
  createOption: value => `"${value}" बनाएँ`,
  close: 'बंद करें',
  copied: 'कॉपी किया गया',
  copy: 'कॉपी करें',
  currentValue: 'वर्तमान मान',
  decrement: 'घटाएं',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'त्रुटि',
  enterFullscreen: 'पूर्ण स्क्रीन में जाएं',
  exitFullscreen: 'पूर्ण स्क्रीन से बाहर निकलें',
  goToSlide: (slide, count) => `${count} में से स्लाइड ${slide} पर जाएं`,
  hidePassword: 'पासवर्ड छुपाएं',
  increment: 'बढ़ाएं',
  loading: 'लोड हो रहा है',
  moreOptions: 'अधिक विकल्प',
  mute: 'म्यूट',
  nextSlide: 'अगली स्लाइड',
  nextVideo: 'अगला वीडियो',
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
  previousSlide: 'पिछली स्लाइड',
  previousVideo: 'पिछला वीडियो',
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
  seek: 'खोजें',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'अभी चल रहा है',
  unmute: 'अनम्यूट',
  videoPlayer: 'वीडियो प्लेयर',
  volume: 'वॉल्यूम',
  zoomIn: 'ज़ूम इन',
  zoomOut: 'ज़ूम आउट',
};

registerTranslation(translation);

export default translation;
