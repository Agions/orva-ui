/**
 * 可访问性 Hook - 增强版
 * 提供 ARIA 标签、键盘导航和屏幕阅读器支持
 * @module hooks/ui/useAccessibility
 * @description 完整的 WAI-ARIA 可访问性支持
 */

import { useCallback, useMemo, type KeyboardEvent, type FocusEvent } from 'react';

// ==================== 类型定义 ====================

/** ARIA 角色 */
export type ARIARole =
  | 'button'
  | 'checkbox'
  | 'radio'
  | 'textbox'
  | 'menuitem'
  | 'dialog'
  | 'tooltip'
  | 'alert'
  | 'progressbar'
  | 'slider'
  | 'switch'
  | 'tab'
  | 'tabpanel'
  | 'listbox'
  | 'option'
  | 'combobox'
  | 'searchbox'
  | 'spinbutton'
  | 'list'
  | 'listitem'
  | 'heading'
  | 'navigation'
  | 'main'
  | 'banner'
  | 'complementary'
  | 'contentinfo'
  | 'form'
  | 'region'
  | 'search'
  | 'application'
  | 'document'
  | 'img'
  | 'link'
  | 'menu'
  | 'menubar'
  | 'toolbar'
  | 'grid'
  | 'log'
  | 'none'
  | 'presentation'
  | 'article'
  | 'paragraph'
  | 'text'
  | 'toolbar'
  | 'table'
  | 'tabs';

/** ARIA 状态 */
export type ARIAState =
  | 'checked'
  | 'expanded'
  | 'selected'
  | 'disabled'
  | 'hidden'
  | 'busy'
  | 'invalid'
  | 'pressed'
  | 'readonly'
  | 'required';

/** ARIA 属性 */
export interface ARIAAttributes {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-expanded'?: boolean | 'true' | 'false';
  'aria-checked'?: boolean | 'true' | 'false' | 'mixed';
  'aria-selected'?: boolean | 'true' | 'false';
  'aria-disabled'?: boolean | 'true' | 'false';
  'aria-pressed'?: boolean | 'true' | 'false' | 'mixed';
  'aria-required'?: boolean | 'true' | 'false';
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling';
  'aria-readonly'?: boolean | 'true' | 'false';
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  'aria-modal'?: boolean | 'true' | 'false';
  'aria-roledescription'?: string;
  role?: ARIARole;
}

/** 键盘事件处理选项 */
export interface KeyboardHandlerOptions {
  /** Enter 键回调 */
  onEnter?: (event: KeyboardEvent) => void;
  /** 空格键回调 */
  onSpace?: (event: KeyboardEvent) => void;
  /** Escape 键回调 */
  onEscape?: (event: KeyboardEvent) => void;
  /** 上箭头键回调 */
  onArrowUp?: (event: KeyboardEvent) => void;
  /** 下箭头键回调 */
  onArrowDown?: (event: KeyboardEvent) => void;
  /** 左箭头键回调 */
  onArrowLeft?: (event: KeyboardEvent) => void;
  /** 右箭头键回调 */
  onArrowRight?: (event: KeyboardEvent) => void;
  /** Home 键回调 */
  onHome?: (event: KeyboardEvent) => void;
  /** End 键回调 */
  onEnd?: (event: KeyboardEvent) => void;
  /** 自定义键盘处理 */
  onKeyDown?: (event: KeyboardEvent) => void;
}

/** 可访问性属性 */
export interface AccessibilityProps extends ARIAAttributes {
  /** 是否可聚焦 */
  focusable?: boolean;
  /** Tab 顺序 */
  tabIndex?: number;
  /** 键盘事件处理 */
  keyboardHandlers?: KeyboardHandlerOptions;
  /** 是否禁用键盘导航 */
  disableKeyboardNav?: boolean;
  /** 快捷 label 属性（设置 aria-label） */
  label?: string;
  /** 自定义 HTML 属性 */
  attributes?: Record<string, string | boolean | undefined>;
  /** 是否展开（aria-expanded） */
  expanded?: boolean;
}

/** useAccessibility 返回值 */
export interface UseAccessibilityReturn {
  /** 处理键盘事件 */
  handleKeyDown: (event: KeyboardEvent) => void;
  /** 处理焦点事件 */
  handleFocus?: (event: FocusEvent) => void;
  /** 处理失焦事件 */
  handleBlur?: (event: FocusEvent) => void;
  /** 获取 ARIA 属性 */
  getAriaAttributes: () => ARIAAttributes;
  /** 获取所有可访问性属性 */
  getAccessibilityProps: () => Record<string, unknown>;
  /** 是否支持键盘操作 */
  isKeyboardAccessible: boolean;
  /** 是否可聚焦 */
  isFocusable: boolean;
}

// ==================== ARIA 常量 ====================

/** 预定义的 ARIA 角色 */
export const ARIA_ROLES = {
  button: 'button' as const,
  checkbox: 'checkbox' as const,
  radio: 'radio' as const,
  textbox: 'textbox' as const,
  menuitem: 'menuitem' as const,
  dialog: 'dialog' as const,
  tooltip: 'tooltip' as const,
  alert: 'alert' as const,
  progressbar: 'progressbar' as const,
  slider: 'slider' as const,
  switch: 'switch' as const,
  tab: 'tab' as const,
  tabpanel: 'tabpanel' as const,
  listbox: 'listbox' as const,
  option: 'option' as const,
  combobox: 'combobox' as const,
  searchbox: 'searchbox' as const,
  spinbutton: 'spinbutton' as const,
  list: 'list' as const,
  listitem: 'listitem' as const,
  heading: 'heading' as const,
  navigation: 'navigation' as const,
  main: 'main' as const,
  banner: 'banner' as const,
  complementary: 'complementary' as const,
  contentinfo: 'contentinfo' as const,
  form: 'form' as const,
  region: 'region' as const,
  group: 'group' as const,
  grid: 'grid' as const,
  log: 'log' as const,
  search: 'search' as const,
  application: 'application' as const,
  document: 'document' as const,
  img: 'img' as const,
  link: 'link' as const,
  menu: 'menu' as const,
  menubar: 'menubar' as const,
  none: 'none' as const,
  presentation: 'presentation' as const,
  article: 'article' as const,
  paragraph: 'paragraph' as const,
  text: 'text' as const,
  toolbar: 'toolbar' as const,
  table: 'table' as const,
  tabs: 'tabs' as const,
} as const;

/** 预定义的 ARIA 状态 */
export const ARIA_STATES = {
  checked: 'checked' as const,
  expanded: 'expanded' as const,
  selected: 'selected' as const,
  disabled: 'disabled' as const,
  hidden: 'hidden' as const,
  busy: 'busy' as const,
  invalid: 'invalid' as const,
  pressed: 'pressed' as const,
  readonly: 'readonly' as const,
  required: 'required' as const,
} as const;

/** 键盘键常量 */
export const KEY_CODES = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  TAB: 'Tab',
} as const;

/** 预定义的 ARIA 标签 */
export const ARIA_LABELS = {
  videoPlayer: 'Video player',
  videoAd: 'Video advertisement',
  videoChapters: 'Video chapters',
  videoControls: 'Video controls',
  videoStatus: 'Video status',
} as const;

// ==================== Hook 实现 ====================

/**
 * 可访问性 Hook
 */
export function useAccessibility(
  props: AccessibilityProps = {}
): UseAccessibilityReturn {
  const {
    'aria-label': ariaLabelProp,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-hidden': ariaHidden,
    'aria-expanded': ariaExpanded,
    'aria-checked': ariaChecked,
    'aria-selected': ariaSelected,
    'aria-disabled': ariaDisabled,
    'aria-pressed': ariaPressed,
    'aria-required': ariaRequired,
    'aria-invalid': ariaInvalid,
    'aria-readonly': ariaReadonly,
    role,
    focusable = true,
    tabIndex = 0,
    keyboardHandlers,
    disableKeyboardNav = false,
    label,
    attributes,
  } = props;

  // Use label as aria-label if provided
  const ariaLabel = ariaLabelProp ?? label;

  // 处理键盘事件
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disableKeyboardNav) return;

      const { key } = event;

      // Enter 键
      if (key === KEY_CODES.ENTER && keyboardHandlers?.onEnter) {
        event.preventDefault();
        keyboardHandlers.onEnter(event);
      }

      // 空格键
      if (key === KEY_CODES.SPACE && keyboardHandlers?.onSpace) {
        event.preventDefault();
        keyboardHandlers.onSpace(event);
      }

      // Escape 键
      if (key === KEY_CODES.ESCAPE && keyboardHandlers?.onEscape) {
        keyboardHandlers.onEscape(event);
      }

      // 方向键
      if (key === KEY_CODES.ARROW_UP && keyboardHandlers?.onArrowUp) {
        keyboardHandlers.onArrowUp(event);
      }
      if (key === KEY_CODES.ARROW_DOWN && keyboardHandlers?.onArrowDown) {
        keyboardHandlers.onArrowDown(event);
      }
      if (key === KEY_CODES.ARROW_LEFT && keyboardHandlers?.onArrowLeft) {
        keyboardHandlers.onArrowLeft(event);
      }
      if (key === KEY_CODES.ARROW_RIGHT && keyboardHandlers?.onArrowRight) {
        keyboardHandlers.onArrowRight(event);
      }

      // Home/End 键
      if (key === KEY_CODES.HOME && keyboardHandlers?.onHome) {
        keyboardHandlers.onHome(event);
      }
      if (key === KEY_CODES.END && keyboardHandlers?.onEnd) {
        keyboardHandlers.onEnd(event);
      }

      // 调用用户自定义的键盘处理函数
      keyboardHandlers?.onKeyDown?.(event);
    },
    [disableKeyboardNav, keyboardHandlers]
  );

  // 获取 ARIA 属性
  const getAriaAttributes = useCallback((): ARIAAttributes => {
    const attributesResult: ARIAAttributes = {};

    if (ariaLabel !== undefined) attributesResult['aria-label'] = ariaLabel;
    if (ariaLabelledBy !== undefined) attributesResult['aria-labelledby'] = ariaLabelledBy;
    if (ariaDescribedBy !== undefined) attributesResult['aria-describedby'] = ariaDescribedBy;
    if (ariaHidden !== undefined) attributesResult['aria-hidden'] = ariaHidden;
    if (ariaExpanded !== undefined) attributesResult['aria-expanded'] = ariaExpanded;
    if (ariaChecked !== undefined) attributesResult['aria-checked'] = ariaChecked;
    if (ariaSelected !== undefined) attributesResult['aria-selected'] = ariaSelected;
    if (ariaDisabled !== undefined) attributesResult['aria-disabled'] = ariaDisabled;
    if (ariaPressed !== undefined) attributesResult['aria-pressed'] = ariaPressed;
    if (ariaRequired !== undefined) attributesResult['aria-required'] = ariaRequired;
    if (ariaInvalid !== undefined) attributesResult['aria-invalid'] = ariaInvalid;
    if (ariaReadonly !== undefined) attributesResult['aria-readonly'] = ariaReadonly;
    if (role !== undefined) attributesResult.role = role;

    // 合并自定义 attributes（来自 Input 组件的 attributes 参数）
    if (attributes) {
      Object.assign(attributesResult, attributes);
    }

    return attributesResult;
  }, [
    ariaLabel, ariaLabelledBy, ariaDescribedBy, ariaHidden,
    ariaExpanded, ariaChecked, ariaSelected, ariaDisabled,
    ariaPressed, ariaRequired, ariaInvalid, ariaReadonly, role,
    attributes,
  ]);

  // 获取所有可访问性属性
  const getAccessibilityProps = useCallback((): Record<string, unknown> => {
    return {
      ...getAriaAttributes(),
      tabIndex: focusable ? tabIndex : -1,
    };
  }, [getAriaAttributes, focusable, tabIndex]);

  // 检查是否支持键盘操作
  const isKeyboardAccessible = useMemo(() => {
    return focusable && !disableKeyboardNav;
  }, [focusable, disableKeyboardNav]);

  // 检查是否可聚焦
  const isFocusable = useMemo(() => {
    return focusable && tabIndex >= 0;
  }, [focusable, tabIndex]);

  return {
    handleKeyDown,
    getAriaAttributes,
    getAccessibilityProps,
    isKeyboardAccessible,
    isFocusable,
  };
}

/**
 * 创建按钮的可访问性配置
 */
export function useButtonAccessibility(
  props: Omit<AccessibilityProps, 'role'> = {}
): UseAccessibilityReturn {
  return useAccessibility({
    ...props,
    role: ARIA_ROLES.button,
  });
}

/**
 * 创建链接的可访问性配置
 */
export function useLinkAccessibility(
  props: Omit<AccessibilityProps, 'role'> = {}
): UseAccessibilityReturn {
  return useAccessibility({
    ...props,
    role: ARIA_ROLES.link,
  });
}

/**
 * 创建表单控件的可访问性配置
 */
export function useFormControlAccessibility(
  props: Omit<AccessibilityProps, 'role'> & {
    invalid?: boolean;
    required?: boolean;
    readonly?: boolean;
  } = {}
): UseAccessibilityReturn {
  const { invalid, required, readonly, ...rest } = props;

  return useAccessibility({
    ...rest,
    'aria-invalid': invalid != null ? Boolean(invalid) : undefined,
    'aria-required': required != null ? Boolean(required) : undefined,
    'aria-readonly': readonly != null ? Boolean(readonly) : undefined,
  });
}

// ==================== 导出 ====================

// ARIARole, ARIAState, ARIAAttributes, KeyboardHandlerOptions, AccessibilityProps, UseAccessibilityReturn
// 已在上方直接 export interface/type 导出

// ARIA_ROLES, ARIA_STATES, KEY_CODES, useButtonAccessibility, useLinkAccessibility, useFormControlAccessibility
// 已在上方直接 export const/function 导出

export default useAccessibility;