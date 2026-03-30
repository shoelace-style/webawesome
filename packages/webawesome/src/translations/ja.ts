import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ja',
  $name: '日本語',
  $dir: 'ltr',

  carousel: 'カルーセル',
  captions: '字幕',
  clearEntry: 'クリア',
  createOption: value => `「${value}」を作成`,
  close: '閉じる',
  copied: 'コピーしました',
  copy: 'コピー',
  currentValue: '現在の値',
  decrement: '減らす',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'エラー',
  enterFullscreen: '全画面表示',
  exitFullscreen: '全画面表示を終了',
  goToSlide: (slide, count) => `${count} 枚中 ${slide} 枚のスライドに移動`,
  hidePassword: 'パスワードを隠す',
  increment: '増やす',
  loading: '読み込み中',
  moreOptions: 'その他のオプション',
  mute: 'ミュート',
  nextSlide: '次のスライド',
  nextVideo: '次の動画',
  numCharacters: num => `${num}文字`,
  numCharactersRemaining: num => `残り${num}文字`,
  numOptionsSelected: num => {
    if (num === 0) return '項目が選択されていません';
    return `${num} 個の項目が選択されました`;
  },
  pause: '一時停止',
  pauseAnimation: 'アニメーションを一時停止',
  pictureInPicture: 'ピクチャー・イン・ピクチャー',
  play: '再生',
  playbackSpeed: '再生速度',
  playlist: 'プレイリスト',
  playAnimation: 'アニメーションを再生',
  previousSlide: '前のスライド',
  previousVideo: '前の動画',
  progress: '進行',
  remove: '削除',
  resize: 'サイズ変更',
  scrollableRegion: 'スクロール可能領域',
  scrollToEnd: '最後にスクロールする',
  scrollToStart: '最初にスクロールする',
  selectAColorFromTheScreen: '画面から色を選択してください',
  showPassword: 'パスワードを表示',
  slideNum: slide => `スライド ${slide}`,
  toggleColorFormat: '色のフォーマットを切り替える',
  seek: 'シーク',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: '再生中',
  unmute: 'ミュート解除',
  videoPlayer: 'ビデオプレーヤー',
  volume: '音量',
  zoomIn: 'ズームイン',
  zoomOut: 'ズームアウト',
};

registerTranslation(translation);

export default translation;
