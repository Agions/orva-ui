/**
 * Video 组件工具函数
 * @module components/basic/Video/utils
 */
import { createLogger } from '@/utils/logger';

const logger = createLogger('VideoUtils');

/**
 * 格式化时间（秒 -> HH:MM:SS 或 MM:SS）
 * @param seconds 秒数
 * @returns 格式化后的时间字符串
 */
export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '00:00';

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * 格式化字节大小
 * @param bytes 字节数
 * @returns 格式化后的大小字符串
 */
export function formatFileSize(bytes: number): string {
  if (!bytes) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);

  return `${size.toFixed(2)} ${units[i]}`;
}

/**
 * 计算视频比特率
 * @param fileSize 文件大小（字节）
 * @param duration 视频时长（秒）
 * @returns 比特率（kbps）
 */
export function calculateBitrate(fileSize: number, duration: number): number {
  if (!duration || duration === 0) return 0;
  return Math.round((fileSize * 8) / duration / 1000);
}

/**
 * 检测浏览器是否支持某项视频功能
 * @param feature 功能名称
 * @returns 是否支持
 */
export function supportsVideoFeature(feature: string): boolean {
  if (typeof window === 'undefined') return false;

  const video = document.createElement('video');

  const features: Record<string, () => boolean> = {
    'picture-in-picture': () => 'requestPictureInPicture' in video,
    'fullscreen': () => 'fullscreenEnabled' in document,
    'playback-rate': () => 'playbackRate' in video,
    'loop': () => 'loop' in video,
    'muted': () => 'muted' in video,
    'poster': () => 'poster' in video,
    'preload': () => 'preload' in video,
  };

  return features[feature]?.() ?? false;
}

/**
 * 生成视频缩略图
 * @param video 视频元素
 * @param time 时间点（秒）
 * @returns 缩略图 Data URL
 */
export async function generateThumbnail(
  video: HTMLVideoElement,
  time: number,
): Promise<string | null> {
  if (!video || typeof window === 'undefined') return null;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 设置当前时间
    video.currentTime = time;

    // 等待数据加载
    await new Promise((resolve) => {
      const onSeeked = () => {
        video.removeEventListener('seeked', onSeeked);
        resolve(true);
      };
      video.addEventListener('seeked', onSeeked);
      setTimeout(resolve, 500); // 超时保护
    });

    // 绘制到 canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.8);
  } catch (error) {
    logger.error('Failed to generate thumbnail:', error);
    return null;
  }
}

/**
 * 下载视频文件
 * @param url 视频 URL
 * @param filename 文件名
 */
export function downloadVideo(url: string, filename: string = 'video.mp4'): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 计算进度百分比
 * @param current 当前值
 * @param total 总值
 * @returns 百分比（0-100）
 */
export function calculateProgress(current: number, total: number): number {
  if (!total || total === 0) return 0;
  return Math.min(100, Math.max(0, (current / total) * 100));
}

/**
 * 防抖函数
 * @param fn 函数
 * @param delay 延迟（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 函数
 * @param limit 限制时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
