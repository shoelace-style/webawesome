import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'zh-tw',
  $name: '正體中文',
  $dir: 'ltr',

  carousel: '幻燈片',
  captions: '字幕',
  clearEntry: '清空',
  close: '關閉',
  copied: '已複製',
  copy: '複製',
  currentValue: '當前值',
  decrement: '減少',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: '錯誤',
  enterFullscreen: '進入全螢幕',
  exitFullscreen: '退出全螢幕',
  goToSlide: (slide, count) => `轉到第 ${slide} 張幻燈片，共 ${count} 張`,
  hidePassword: '隱藏密碼',
  increment: '增加',
  loading: '載入中',
  mute: '靜音',
  nextSlide: '下一張幻燈片',
  nextVideo: '下一個影片',
  numOptionsSelected: num => {
    if (num === 0) return '未選擇任何項目';
    if (num === 1) return '已選擇 1 個項目';
    return `${num} 選擇項目`;
  },
  pause: '暫停',
  pauseAnimation: '暫停動畫',
  pictureInPicture: '子母畫面',
  play: '播放',
  playbackSpeed: '播放速度',
  playlist: '播放清單',
  playAnimation: '播放動畫',
  previousSlide: '上一張幻燈片',
  previousVideo: '上一個影片',
  progress: '進度',
  remove: '移除',
  resize: '調整大小',
  scrollableRegion: '可捲動区域',
  scrollToEnd: '捲至頁尾',
  scrollToStart: '捲至頁首',
  selectAColorFromTheScreen: '從螢幕中選擇一種顏色',
  showPassword: '顯示密碼',
  slideNum: slide => `幻燈片 ${slide}`,
  toggleColorFormat: '切換顏色格式',
  seek: '跳轉',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: '正在播放',
  unmute: '取消靜音',
  videoPlayer: '影片播放器',
  volume: '音量',
  zoomIn: '放大',
  zoomOut: '縮小',
};

registerTranslation(translation);

export default translation;
