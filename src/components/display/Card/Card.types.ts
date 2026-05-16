import type { BaseProps } from '@/types/component';
import type * as React from 'react';

export interface CardProps extends BaseProps {
	/** 卡片内容 */
  children: React.ReactNode;
	/** 卡片标题 */
  title?: React.ReactNode;
	/** 卡片副标题 */
  subtitle?: React.ReactNode;
	/** 卡片操作区域 */
  extra?: React.ReactNode;
	/** 卡片封面 */
  cover?: React.ReactNode;
	/** 卡片操作按钮 */
  actions?: React.ReactNode[];
	/** 是否可点击 */
  hoverable?: boolean;
	/** 是否显示边框 */
  bordered?: boolean;
	/** 阴影级别 */
  shadow?: 'none' | 'small' | 'default' | 'large';
	/** 加载状态 */
  loading?: boolean;
	/** 点击事件 */
  onPress?: (_event: React.MouseEvent | any) => void;
	/** 长按事件 */
  onLongPress?: (_event: React.MouseEvent | any) => void;
	/** 卡片变体 */
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
	/** 卡片尺寸 */
  size?: 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg';
	/** 是否可点击（别名） */
  clickable?: boolean;
	/** 点击事件 */
  onClick?: (_event: any) => void;
	/** 卡片头部 */
  header?: React.ReactNode;
	/** 卡片底部 */
  footer?: React.ReactNode;
	/** 卡片阴影（别名） */
  shadows?: any;
}

export interface CardRef {
	/** 获取卡片元素 */
  getElement: () => HTMLElement | null;
	/** 获取卡片标题 */
  getTitle: () => string | null;
	/** 获取卡片内容 */
  getContent: () => HTMLElement | null;
}

export interface CardStyleProps {
	/** 平台类型 */
  platform: string;
	/** 阴影级别 */
  shadow: CardProps['shadow'];
	/** 是否可点击 */
  hoverable: boolean;
	/** 是否显示边框 */
  bordered: boolean;
	/** 加载状态 */
  loading: boolean;
}
