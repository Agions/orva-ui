/**
 * 无障碍类型定义
 */

export interface AriaAttributes {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-disabled'?: boolean;
  'aria-required'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'id'?: string;
  'role'?: string;
}

export interface FocusableProps {
  tabIndex?: number;
  autoFocus?: boolean;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface KeyboardProps {
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
}

export interface ScreenReaderProps {
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'id'?: string;
  'aria-busy'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
}