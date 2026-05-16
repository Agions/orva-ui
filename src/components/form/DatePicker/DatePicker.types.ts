import type { FormItemProps } from '@/types/component';
import type { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** 日期范围类型 */
export type DateRange = [string | number | Date | null, string | number | Date | null];
/** 日期格式 */
export type DatePickerFormat = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'DD-MM-YYYY' | string;

/** 日期选择器尺寸 */
export type DatePickerSize = 'small' | 'medium' | 'large' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** 日期选择器变体 */
export type DatePickerVariant = 'outlined' | 'filled' | 'borderless';
/** 日期选择器状态 */
export type DatePickerStatus = 'default' | 'success' | 'warning' | 'error' | 'normal' | 'disabled';

/** DatePicker 组件属性 */
export interface DatePickerProps {
  value?: string | number | Date | null;
  defaultValue?: string | number | Date | null;
  format?: DatePickerFormat;
  disabled?: boolean;
  readonly?: boolean;
  allowClear?: boolean;
  size?: DatePickerSize;
  status?: DatePickerStatus;
  variant?: DatePickerVariant;
  placeholder?: string;
  onChange?: (value: string | number | Date | null, dateString: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onClear?: () => void;
  className?: string;
  style?: any;
  showToday?: boolean;
  disabledDate?: (date: Date) => boolean;
  [key: string]: any;
}

/** 日期选择器组件引用类型 */
export type DatePickerRef = {
  getValue: () => Date | null;
  setValue: (_value: Date | null) => void;
  getRangeValue: () => DateRange | null;
  setRangeValue: (_value: DateRange | null) => void;
  getDateString: () => string;
  getRangeDateString: () => [string, string] | null;
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
  clear: () => void;
  disable: () => void;
  enable: () => void;
  isOpen: () => boolean;
  isDisabled: () => boolean;
  isReadOnly: () => boolean;
  element: HTMLDivElement | null;
};

/** 禁用日期函数 */
export type DisabledDate = (date: Date) => boolean;

/** DatePicker 原生事件属性 */
export interface DatePickerNativeProps extends FormItemProps {
  onFocus?: (_event: ITouchEvent) => void;
  onBlur?: (_event: ITouchEvent) => void;
  onClick?: (_event: ITouchEvent) => void;
  onOpenChange?: (_open: boolean) => void;
  minDate?: Date;
  maxDate?: Date;
  showTime?: boolean;
  timeFormat?: string;
  dateRender?: (_currentDate: Date) => ReactNode;
  renderExtraFooter?: () => ReactNode;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
}

/** 日期选择器工具函数接口 */
export interface DatePickerUtils {
  formatDate: (_date: Date, format: DatePickerFormat) => string;
  parseDate: (_dateString: string, format: DatePickerFormat) => Date | null;
  isDateInRange: (_date: Date, min?: Date, max?: Date) => boolean;
  isSameDate: (_date1: Date, date2: Date) => boolean;
  isSameMonth: (_date1: Date, date2: Date) => boolean;
  isSameYear: (_date1: Date, date2: Date) => boolean;
  getDaysInMonth: (_year: number, month: number) => number;
  getFirstDayOfMonth: (_year: number, month: number) => Date;
  getLastDayOfMonth: (_year: number, month: number) => Date;
  getMonthInfo: (year: number, month: number) => {
    firstDay: Date;
    lastDay: Date;
    days: number;
    startDay: number;
  };
  addDays: (_date: Date, days: number) => Date;
  addMonths: (_date: Date, months: number) => Date;
  addYears: (_date: Date, years: number) => Date;
  getDateRange: (_start: Date, end: Date) => Date[];
  isValidDate: (_date: Date) => boolean;
  getTimestamp: (_date: Date) => number;
  fromDateTimestamp: (_timestamp: number) => Date;
}

/** 日期选择器样式配置接口 */
export interface DatePickerStyleConfig {
  base: React.CSSProperties;
  sizes: Record<DatePickerSize, React.CSSProperties>;
  variants: Record<DatePickerVariant, React.CSSProperties>;
  statuses: Record<DatePickerStatus, React.CSSProperties>;
  input: React.CSSProperties;
  inputSizes: Record<DatePickerSize, React.CSSProperties>;
  panel: React.CSSProperties;
  calendar: React.CSSProperties;
  cell: React.CSSProperties;
  selectedCell: React.CSSProperties;
  disabledCell: React.CSSProperties;
  todayCell: React.CSSProperties;
  rangeCell: React.CSSProperties;
  clearButton: React.CSSProperties;
  icon: React.CSSProperties;
}

/** 日期选择器上下文接口 */
export interface DatePickerContext {
  rangeValue: DateRange | null;
  format: DatePickerFormat;
  minDate?: Date;
  maxDate?: Date;
  disabledDate?: (_date: Date) => boolean;
  utils: DatePickerUtils;
  styleConfig: DatePickerStyleConfig;
  setValue: (_value: Date | null) => void;
  setRangeValue: (_value: DateRange | null) => void;
  openPanel: () => void;
  closePanel: () => void;
}
