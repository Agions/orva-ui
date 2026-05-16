import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

export interface AvatarProps extends BaseProps {
	/** 图片地址 */
  src?: string;
	/** 替代文本 */
  alt?: string;
	/** 点击事件 */
  onClick?: (_event: any) => void;
	/** 头像尺寸 */
  size?: 'small' | 'medium' | 'large' | number;
	/** 头像形状 */
  shape?: 'circle' | 'square';
	/** 图标 */
  icon?: ReactNode;
	/** 子元素 */
  children?: ReactNode;
}

export interface AvatarRef {
	/** DOM 元素 */
  element: any;
	/** 获取头像尺寸 */
  getSize: () => number;
	/** 获取头像形状 */
  getShape: () => 'circle' | 'square';
	/** 检查是否有图片 */
  hasImage: () => boolean;
	/** 检查是否有图标 */
  hasIcon: () => boolean;
	/** 检查是否有文字 */
  hasText: () => boolean;
}

export type AvatarSize = 'small' | 'medium' | 'large' | number;
export type AvatarShape = 'circle' | 'square';
