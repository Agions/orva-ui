import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

export interface CalendarEvent {
  id: string;
  startTime?: string;
  color?: string;
  [key: string]: any;
}

export interface CalendarDate {
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  disabled: boolean;
  events: CalendarEvent[];
  /** 无障碍标签 */
  ariaLabel?: string;
  /** 无障碍角色 */
  role?: string;
}

export interface CalendarProps extends BaseProps {
  /** 当前选中日期 */
  value?: Date;
  /** 默认日期 */
  defaultValue?: Date;
  /** 显示模式 */
  mode?: 'month' | 'year';
  /** 是否显示"今天"按钮 */
  showToday?: boolean;
  /** 是否显示事件标记 */
  showEvents?: boolean;
  /** 事件列表 */
  events?: CalendarEvent[];
  /** 禁用日期判断函数 */
  disabledDate?: (date: Date) => boolean;
  /** 自定义日期渲染 */
  dateRender?: (date: CalendarDate) => ReactNode;
  /** 自定义月份渲染 */
  monthRender?: (monthIndex: number, year: number) => ReactNode;
  /** 选中日期回调 */
  onSelect?: (date: Date) => void;
  /** 日期变化回调 */
  onChange?: (date: Date) => void;
  /** 模式切换回调 */
  onModeChange?: (mode: 'month' | 'year') => void;
  /** 无障碍标签 */
  ariaLabel?: string;
  /** ARIA 角色 */
  role?: string;
  /** 内联样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export interface CalendarRef {
	/** DOM 元素 */
  element: any;
	/** 获取当前日期 */
  getCurrentDate: () => Date;
	/** 设置日期 */
  setDate: (_date: Date) => void;
	/** 获取显示模式 */
  getMode: () => 'month' | 'year';
	/** 设置显示模式 */
  setMode: (_mode: 'month' | 'year') => void;
	/** 跳转到今天 */
  goToToday: () => void;
	/** 上一个月/年 */
  goPrev: () => void;
	/** 下一个月/年 */
  goNext: () => void;
}
