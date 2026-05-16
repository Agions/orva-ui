import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

export type CarouselEffect = 'slide' | 'fade';
export type CarouselDotsPosition = 'top' | 'bottom' | 'left' | 'right';

export interface CarouselProps extends BaseProps {
	/** 子元素（轮播项） */
  children?: ReactNode;
	/** 是否自动播放 */
  autoplay?: boolean;
	/** 自动播放间隔（毫秒） */
  interval?: number;
	/** 是否显示指示点 */
  showDots?: boolean;
	/** 是否显示箭头 */
  showArrows?: boolean;
	/** 是否无限循环 */
  infinite?: boolean;
	/** 切换效果 */
  effect?: CarouselEffect;
	/** 指示点位置 */
  dotsPosition?: CarouselDotsPosition;
	/** 同时显示的幻灯片数量 */
  slidesToShow?: number;
	/** 每次滚动的幻灯片数量 */
  slidesToScroll?: number;
	/** 是否垂直方向 */
  vertical?: boolean;
	/** 当前激活索引（受控） */
  activeIndex?: number;
	/** 默认激活索引 */
  defaultActiveIndex?: number;
	/** 切换前回调 */
  beforeChange?: (_from: number, _to: number) => void;
	/** 切换后回调 */
  afterChange?: (_current: number) => void;
}

export interface CarouselRef {
	/** DOM 元素 */
  element: any;
	/** 获取当前索引 */
  getCurrentIndex: () => number;
	/** 跳转到指定索引 */
  goTo: (_index: number) => void;
	/** 上一张 */
  prev: () => void;
	/** 下一张 */
  next: () => void;
	/** 开始自动播放 */
  play: () => void;
	/** 停止自动播放 */
  pause: () => void;
	/** 获取总数 */
  getTotal: () => number;
}
