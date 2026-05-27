/**
 * useButton — Headless Button Hook
 * @module components/basic/Button/useButton
 * @description Button 组件的纯逻辑层，不包含任何样式。
 * 管理交互状态、无障碍、键盘导航、Ripple 状态。
 * 与 UI 层完全解耦。
 */

import { useCallback, useMemo, useRef } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import type {
  ButtonType,
  ButtonSize,
  ButtonVariant,
  ButtonShape,
  ButtonEmphasis,
  ButtonIconPosition,
  ButtonState,
  ButtonInteractionState,
} from './Button.types';

// ==================== 类型定义 ====================

export interface UseButtonOptions {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 按钮变体 */
  variant?: ButtonVariant;
  /** 按钮形状 */
  shape?: ButtonShape;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否块级 */
  block?: boolean;
  /** 是否平面（无阴影） */
  flat?: boolean;
  /** 是否可聚焦 */
  focusable?: boolean;
  /** Tab 索引 */
  tabIndex?: number;
  /** ARIA 标签 */
  ariaLabel?: string;
  /** 强调效果 */
  emphasis?: ButtonEmphasis;
  /** 图标位置 */
  iconPosition?: ButtonIconPosition;
  /** 是否启用 Ripple */
  ripple?: boolean;
  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void;
  /** 键盘事件 */
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export interface UseButtonReturn {
  /** 按钮状态 */
  state: ButtonState;
  /** 交互状态 */
  interaction: ButtonInteractionState;
  /** 是否可交互 */
  isInteractive: boolean;
  /** 点击处理器 */
  handleClick: (event: ITouchEvent) => void;
  /** 键盘事件处理器 */
  handleKeyDown: (event: React.KeyboardEvent) => void;
  /** HTML 属性（无障碍、交互） */
  htmlProps: {
    role: string;
    tabIndex: number;
    'aria-disabled': boolean | undefined;
    'aria-label': string | undefined;
    'aria-busy': boolean | undefined;
  };
  /** 交互事件绑定 */
  eventHandlers: ReturnType<typeof useInteractionState>['handlers'];
  /** 触发程序化点击 */
  click: () => void;
  /** 触发聚焦 */
  focus: () => void;
  /** 触发失焦 */
  blur: () => void;
}

// ==================== 默认值 ====================

const DEFAULT_OPTIONS: Required<Pick<UseButtonOptions, 'type' | 'size' | 'variant' | 'shape' | 'disabled' | 'loading' | 'block' | 'flat' | 'focusable' | 'tabIndex' | 'ripple' | 'iconPosition'>> = {
  type: 'default',
  size: 'md',
  variant: 'solid',
  shape: 'default',
  disabled: false,
  loading: false,
  block: false,
  flat: false,
  focusable: true,
  tabIndex: 0,
  ripple: true,
  iconPosition: 'left',
};

// ==================== Hook ====================

export function useButton(options: UseButtonOptions = {}): UseButtonReturn {
  const merged = { ...DEFAULT_OPTIONS, ...options };
  const elementRef = useRef<HTMLElement | null>(null);

  // 交互状态
  const { state: interactionState, handlers } = useInteractionState({
    disabledPress: merged.disabled || merged.loading,
    onPress: () => {
      // 内部按下处理
    },
  });

  // 无障碍
  const { handleKeyDown: _a11yKeyDown } = useAccessibility({
    focusable: merged.focusable,
    tabIndex: merged.tabIndex,
    role: ARIA_ROLES.button,
  });

  // 是否可交互
  const isInteractive = !merged.disabled && !merged.loading;

  // 按钮状态
  const state: ButtonState = useMemo(() => ({
    disabled: merged.disabled,
    loading: merged.loading,
    interaction: {
      isHovered: interactionState.isHovered,
      isFocused: interactionState.isFocused,
      isPressed: interactionState.isPressed,
    },
  }), [merged.disabled, merged.loading, interactionState.isHovered, interactionState.isFocused, interactionState.isPressed]);

  // 点击处理器
  const handleClick = useCallback((event: ITouchEvent) => {
    if (isInteractive) {
      merged.onClick?.(event);
    }
  }, [isInteractive, merged.onClick]);

  // 键盘事件
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    merged.onKeyDown?.(event);
    _a11yKeyDown(event as unknown as React.KeyboardEvent);
  }, [merged.onKeyDown, _a11yKeyDown]);

  // HTML 属性
  const htmlProps = useMemo(() => ({
    role: ARIA_ROLES.button,
    tabIndex: merged.focusable ? merged.tabIndex : -1,
    'aria-disabled': merged.disabled || undefined,
    'aria-label': merged.ariaLabel,
    'aria-busy': merged.loading || undefined,
  }), [merged.focusable, merged.tabIndex, merged.disabled, merged.ariaLabel, merged.loading]);

  // 程序化控制
  const click = useCallback(() => {
    elementRef.current?.click();
  }, []);

  const focus = useCallback(() => {
    elementRef.current?.focus();
  }, []);

  const blur = useCallback(() => {
    elementRef.current?.blur();
  }, []);

  return {
    state,
    interaction: state.interaction,
    isInteractive,
    handleClick,
    handleKeyDown,
    htmlProps,
    eventHandlers: handlers,
    click,
    focus,
    blur,
  };
}