import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'tr',
  $name: 'Türkçe',
  $dir: 'ltr',

  carousel: 'Atlıkarınca',
  captions: 'Altyazılar',
  clearEntry: 'Girişi sil',
  createOption: value => `"${value}" oluştur`,
  close: 'Kapat',
  copied: 'Kopyalandı',
  copy: 'Kopya',
  currentValue: 'Mevcut değer',
  decrement: 'Azalt',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Hata',
  enterFullscreen: 'Tam ekrana gir',
  exitFullscreen: 'Tam ekrandan çık',
  goToSlide: (slide, count) => `${count} slayttan ${slide} slayta gidin`,
  hidePassword: 'Şifreyi sakla',
  increment: 'Artır',
  loading: 'Yükleme',
  moreOptions: 'Daha fazla seçenek',
  mute: 'Sesi kapat',
  nextSlide: 'Sonraki slayt',
  nextVideo: 'Sonraki video',
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
  previousSlide: 'Bir onceki slayt',
  previousVideo: 'Önceki video',
  progress: 'İlerleme',
  remove: 'Kaldır',
  resize: 'Yeniden boyutlandır',
  scrollableRegion: 'Kaydırılabilir alan',
  scrollToEnd: 'Sona kay',
  scrollToStart: 'Başa kay',
  selectAColorFromTheScreen: 'Ekrandan bir renk seçin',
  showPassword: 'Şifreyi göster',
  slideNum: slide => `Slayt ${slide}`,
  toggleColorFormat: 'Renk biçimini değiştir',
  seek: 'Ara',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'şu an oynatılıyor',
  unmute: 'Sesi aç',
  videoPlayer: 'Video oynatıcı',
  volume: 'Ses seviyesi',
  zoomIn: 'Yakınlaştır',
  zoomOut: 'Uzaklaştır',
};

registerTranslation(translation);

export default translation;
