import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fi',
  $name: 'Suomi',
  $dir: 'ltr',

  carousel: 'Karuselli',
  captions: 'Tekstitys',
  chooseDecade: 'Valitse vuosikymmen',
  chooseMonth: 'Valitse kuukausi',
  chooseYear: 'Valitse vuosi',
  clearEntry: 'Poista merkintä',
  createOption: value => `Luo "${value}"`,
  close: 'Sulje',
  copied: 'Kopioitu',
  copy: 'Kopioi',
  currentValue: 'Nykyinen arvo',
  decrement: 'Vähennä',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Virhe',
  enterFullscreen: 'Siirry koko näytölle',
  exitFullscreen: 'Poistu koko näytöltä',
  goToSlide: (slide, count) => `Siirry diaan ${slide} / ${count}`,
  hidePassword: 'Piilota salasana',
  increment: 'Lisää',
  loading: 'Ladataan',
  moreOptions: 'Lisää vaihtoehtoja',
  mute: 'Mykistä',
  nextDecade: 'Seuraava vuosikymmen',
  nextMonth: 'Seuraava kuukausi',
  nextSlide: 'Seuraava dia',
  nextVideo: 'Seuraava video',
  nextYear: 'Seuraava vuosi',
  numCharacters: num => {
    if (num === 1) return '1 merkki';
    return `${num} merkkiä`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 merkki jäljellä';
    return `${num} merkkiä jäljellä`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Ei valittuja vaihtoehtoja';
    if (num === 1) return 'Yksi vaihtoehto valittu';
    return `${num} vaihtoehtoa valittu`;
  },
  pause: 'Keskeytä',
  pauseAnimation: 'Keskeytä animaatio',
  pictureInPicture: 'Kuva kuvassa',
  play: 'Toista',
  playbackSpeed: 'Toistonopeus',
  playlist: 'Soittolista',
  playAnimation: 'Toista animaatio',
  previousDecade: 'Edellinen vuosikymmen',
  previousMonth: 'Edellinen kuukausi',
  previousSlide: 'Edellinen dia',
  previousVideo: 'Edellinen video',
  previousYear: 'Edellinen vuosi',
  progress: 'Edistyminen',
  remove: 'Poista',
  resize: 'Muuta kokoa',
  scrollableRegion: 'Vieritettävä alue',
  scrollToEnd: 'Vieritä loppuun',
  scrollToStart: 'Vieritä alkuun',
  selectAColorFromTheScreen: 'Valitse väri näytöltä',
  showPassword: 'Näytä salasana',
  slideNum: slide => `Dia ${slide}`,
  toggleColorFormat: 'Vaihda väriformaattia',
  seek: 'Siirry',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'toistetaan parhaillaan',
  unmute: 'Poista mykistys',
  videoPlayer: 'Videosoitin',
  volume: 'Äänenvoimakkuus',
  zoomIn: 'Lähennä',
  zoomOut: 'Loitonna',
};

registerTranslation(translation);

export default translation;
