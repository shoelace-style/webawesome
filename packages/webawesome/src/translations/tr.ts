import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'tr',
  $name: 'Türkçe',
  $dir: 'ltr',

  am: 'ÖÖ',
  carousel: 'Atlıkarınca',
  captions: 'Altyazılar',
  chooseDate: 'Tarih seçin',
  chooseDecade: 'On yıl seçin',
  chooseMonth: 'Ay seçin',
  chooseTime: 'Saat seçin',
  chooseYear: 'Yıl seçin',
  clearEntry: 'Girişi sil',
  createOption: value => `"${value}" oluştur`,
  close: 'Kapat',
  closeCalendar: 'Takvimi kapat',
  closeTimePicker: 'Saat seçiciyi kapat',
  copied: 'Kopyalandı',
  copy: 'Kopya',
  currentValue: 'Mevcut değer',
  date: 'Tarih',
  datePickerKeyboardHelp: 'Değerleri değiştirmek için ok tuşlarını kullanın; takvimi açmak için Alt+Aşağı Ok tuşuna basın.',
  day: 'Gün',
  dayPeriod: 'ÖÖ/ÖS',
  decrement: 'Azalt',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Boş',
  endDate: 'Bitiş tarihi',
  error: 'Hata',
  enterFullscreen: 'Tam ekrana gir',
  exitFullscreen: 'Tam ekrandan çık',
  goToSlide: (slide, count) => `${count} slayttan ${slide} slayta gidin`,
  hidePassword: 'Şifreyi sakla',
  hour: 'Saat',
  incompleteDate: 'Tam bir tarih girin.',
  increment: 'Artır',
  loading: 'Yükleme',
  minute: 'Dakika',
  moreOptions: 'Daha fazla seçenek',
  month: 'Ay',
  mute: 'Sesi kapat',
  nextDecade: 'Sonraki on yıl',
  nextMonth: 'Sonraki ay',
  nextSlide: 'Sonraki slayt',
  nextVideo: 'Sonraki video',
  nextYear: 'Sonraki yıl',
  now: 'Şimdi',
  numCharacters: num => {
    if (num === 1) return '1 karakter';
    return `${num} karakter`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 karakter kaldı';
    return `${num} karakter kaldı`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Hiçbir seçenek seçilmedi';
    if (num === 1) return '1 seçenek seçildi';
    return `${num} seçenek seçildi`;
  },
  pause: 'Duraklat',
  pauseAnimation: 'Animasyonu duraklat',
  pictureInPicture: 'Görüntü içinde görüntü',
  play: 'Oynat',
  playbackSpeed: 'Oynatma hızı',
  playlist: 'Oynatma listesi',
  playAnimation: 'Animasyonu oynat',
  pm: 'ÖS',
  previousDecade: 'Önceki on yıl',
  previousMonth: 'Önceki ay',
  previousSlide: 'Bir onceki slayt',
  previousVideo: 'Önceki video',
  previousYear: 'Önceki yıl',
  progress: 'İlerleme',
  rangeTooLong: max => {
    if (max === 1) return '1 günden uzun olmayan bir aralık seçin';
    return `${max} günden uzun olmayan bir aralık seçin`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'En az 1 gün uzunluğunda bir aralık seçin';
    return `En az ${min} gün uzunluğunda bir aralık seçin`;
  },
  remove: 'Kaldır',
  resize: 'Yeniden boyutlandır',
  scrollableRegion: 'Kaydırılabilir alan',
  scrollToEnd: 'Sona kay',
  scrollToStart: 'Başa kay',
  second: 'Saniye',
  selectAColorFromTheScreen: 'Ekrandan bir renk seçin',
  showPassword: 'Şifreyi göster',
  slideNum: slide => `Slayt ${slide}`,
  startDate: 'Başlangıç tarihi',
  time: 'Saat',
  timePickerKeyboardHelp: 'Değerleri değiştirmek için ok tuşlarını kullanın; saat seçiciyi açmak için Alt+Aşağı Ok tuşuna basın.',
  today: 'Bugün',
  toggleColorFormat: 'Renk biçimini değiştir',
  seek: 'Ara',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'şu an oynatılıyor',
  unmute: 'Sesi aç',
  videoPlayer: 'Video oynatıcı',
  volume: 'Ses seviyesi',
  year: 'Yıl',
  zoomIn: 'Yakınlaştır',
  zoomOut: 'Uzaklaştır',
};

registerTranslation(translation);

export default translation;
