import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'id',
  $name: 'Bahasa Indonesia',
  $dir: 'ltr',

  carousel: 'Karousel',
  captions: 'Teks',
  chooseDecade: 'Pilih dekade',
  chooseMonth: 'Pilih bulan',
  chooseYear: 'Pilih tahun',
  clearEntry: 'Hapus entri',
  createOption: value => `Buat "${value}"`,
  close: 'Tutup',
  copied: 'Disalin',
  copy: 'Salin',
  currentValue: 'Nilai saat ini',
  decrement: 'Kurangi',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Kesalahan',
  enterFullscreen: 'Masuk layar penuh',
  exitFullscreen: 'Keluar layar penuh',
  goToSlide: (slide, count) => `Pergi ke slide ${slide} dari ${count}`,
  hidePassword: 'Sembunyikan sandi',
  increment: 'Tambah',
  loading: 'Memuat',
  moreOptions: 'Lebih banyak opsi',
  mute: 'Bisukan',
  nextDecade: 'Dekade berikutnya',
  nextMonth: 'Bulan berikutnya',
  nextSlide: 'Slide berikutnya',
  nextVideo: 'Video berikutnya',
  nextYear: 'Tahun berikutnya',
  numCharacters: num => {
    if (num === 1) return '1 karakter';
    return `${num} karakter`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 karakter tersisa';
    return `${num} karakter tersisa`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Tidak ada opsi yang dipilih';
    if (num === 1) return '1 opsi yang dipilih';
    return `${num} opsi yang dipilih`;
  },
  pause: 'Jeda',
  pauseAnimation: 'Jeda animasi',
  pictureInPicture: 'Gambar dalam gambar',
  play: 'Putar',
  playbackSpeed: 'Kecepatan putar',
  playlist: 'Daftar putar',
  playAnimation: 'Putar animasi',
  previousDecade: 'Dekade sebelumnya',
  previousMonth: 'Bulan sebelumnya',
  previousSlide: 'Slide sebelumnya',
  previousVideo: 'Video sebelumnya',
  previousYear: 'Tahun sebelumnya',
  progress: 'Kemajuan',
  remove: 'Hapus',
  resize: 'Ubah ukuran',
  scrollableRegion: 'Area yang dapat digulir',
  scrollToEnd: 'Gulir ke akhir',
  scrollToStart: 'Gulir ke awal',
  selectAColorFromTheScreen: 'Pilih warna dari layar',
  showPassword: 'Tampilkan sandi',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Beralih format warna',
  seek: 'Cari',
  seekProgress: (current, duration) => `${current} dari ${duration}`,
  currentlyPlaying: 'sedang diputar',
  unmute: 'Aktifkan suara',
  videoPlayer: 'Pemutar video',
  volume: 'Volume',
  zoomIn: 'Perbesar',
  zoomOut: 'Perkecil',
};

registerTranslation(translation);

export default translation;
