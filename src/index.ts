/**
 * Orva UI 组件库统一导出文件
 * @module orva-ui
 */

// ==================== 组件导出 ====================
export * from './components';

// ==================== Hooks 导出 ====================
export {
  useTheme,
  useStyle,
  usePlatform,
  useIsH5,
  useIsMiniProgram,
  useIsReactNative,
  useIsHarmony,
  useResponsive,
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useVirtualScroll,
  useBoolean,
  useToggle,
  useCounter,
  usePrevious,
  useLocalStorage,
  useSessionStorage,
  useMount,
  useUnmount,
  useDebounce,
  useDebouncedCallback,
  useThrottle,
  useThrottledCallback,
  useDeepCompareEffect,
  useMemoizedFunction,
  useComputedCache,
  useVirtualList,
  useLazyLoad,
  useRequest,
  useMutation,
  useClickOutside,
  useEventListener,
  useClickHandler,
  useLongPress,
  useAccessibility,
  useInteractionState,
  useMicroAnimation,
  useDynamicTheme,
  ARIA_ROLES,
  ARIA_STATES,
  KEY_CODES,
} from './hooks';

// ==================== 工具函数导出 ====================
export {
  cn,
  createComponent,
  isOrvaUIComponent,
  getPlatformType,
  detectPlatform,
  detectPlatformType,
  isPlatform,
  isMiniProgram,
  isH5,
  isRN,
  isHarmony,
  debounce,
  throttle,
  useMemoizedFn,
  useDeepMemo,
} from './utils';

// ==================== 主题系统导出 ====================
export {
  defaultTheme,
  DARK_THEME,
  HIGH_CONTRAST_THEME,
  WARM_THEME,
  COOL_THEME,
  THEMES,
} from './theme';

// ==================== 类型导出 ====================
export type {
  BaseProps,
  ChildrenProps,
  StyledProps,
  InteractiveProps,
  FormItemProps as FormItemBaseProps,
  RefProps,
  FocusableProps,
  SelectableProps,
  ToggleableProps,
  StatusProps,
  FullInteractiveProps,
  FullFormItemProps,
  Size,
  ExtendedSize,
  Status,
  ExtendedStatus,
  Variant,
  ExtendedVariant,
  Shape,
  ExtendedShape,
  Direction,
  Placement,
  ExtendedPlacement,
  Align,
  ExtendedAlign,
  ThemeMode,
  Breakpoint,
  AnimationType,
  AnimationDirection,
  InputType,
  KeyboardType,
  Platform as PlatformType,
  PlatformInfo,
  RequestConfig,
  RequestResponse,
  RequestError,
  BaseEventTarget,
  BaseEvent,
  TouchPoint,
  TouchEventDetail,
  TouchEvent,
  ChangeEventDetail,
  ChangeEvent,
  InputEventDetail,
  InputEvent,
  FocusEventDetail,
  FocusEvent,
  BlurEventDetail,
  BlurEvent,
  ScrollEventDetail,
  ScrollEvent,
  KeyboardEventDetail,
  KeyboardEvent,
  LongPressEventDetail,
  LongPressEvent,
  EventHandler,
  TouchEventHandler,
  ChangeEventHandler,
  InputEventHandler,
  FocusEventHandler,
  BlurEventHandler,
  ScrollEventHandler,
  KeyboardEventHandler,
  LongPressEventHandler,
  OnClick,
  OnChange,
  OnInput,
  OnFocus,
  OnBlur,
  OnScroll,
  CSSUnit,
  CSSNumericValue,
  CSSValue,
  SizeValue,
  SpacingValue,
  BorderRadiusValue,
  HexColor,
  RGBColor,
  RGBAColor,
  HSLColor,
  ColorValue,
  StyleObject,
  PartialStyleObject,
  StyleFunction,
  StyleOrFunction,
  ResponsiveValue,
  ResponsiveStyleObject,
  ResponsiveSizeValue,
  ResponsiveSpacingValue,
  ResponsiveBoolean,
  StyleVariants,
  CompoundVariant,
  StyleRecipe,
  TransitionConfig,
  AnimationConfig,
  ShadowConfig,
  ClassNameValue,
  ClassNameObject,
  ClassNameArray,
  ClassNameArg,
  StyleMergeOptions,
  MergeableStyle,
  Nullable,
  Optional,
  RequiredKeys,
  RequiredFields,
  DeepPartial,
  DeepOptional,
  DeepRequired,
  DeepReadonly,
  DeepWriteable,
  Merge,
  DeepMerge,
  PickPartial,
  PickRequired,
  PromiseType,
  FunctionArgs,
  FunctionReturn,
  ComponentProps,
  ComponentRef,
  NonNullableType,
  Truthy,
  ArrayElement,
  CapitalizeString,
  UncapitalizeString,
  KebabCase,
  CamelCase,
  Debounced,
  Throttled,
  OptionalArgs,
  RecursiveExclude,
  RecursivePick,
  ValidationResult,
  Validator,
  AsyncState,
  AsyncOperation,
  KeyValuePair,
  RecordType,
  MapType,
  SetType,
  InferArray,
  InferPromise,
  InferArgs,
  InferReturn,
} from './types';

// ==================== 组件库版本和配置 ====================

/** 组件库版本 */
export const VERSION = '1.2.1';

/** 组件库配置 */
export const CONFIG = {
  version: VERSION,
  theme: 'light',
  platform: 'taro',
  components: {
    basic: ['Button', 'Icon', 'Text', 'Divider', 'Typography', 'Video', 'Ripple'],
    display: ['Avatar', 'Badge', 'Card', 'List', 'Rate', 'Table', 'Tag', 'Timeline', 'Calendar', 'Carousel', 'RichText'],
    feedback: ['Modal', 'Message', 'Notification', 'Loading', 'Progress', 'Tooltip', 'Result', 'Toast', 'Drawer', 'Popconfirm'],
    form: ['Form', 'Input', 'Select', 'DatePicker', 'TimePicker', 'Radio', 'Checkbox', 'Switch', 'Slider', 'Textarea', 'InputNumber', 'Cascader', 'Transfer', 'Upload', 'AutoComplete'],
    layout: ['Grid', 'Layout', 'Space', 'Affix', 'Row', 'Col', 'Container', 'ResponsiveContainer', 'ResponsiveGrid'],
    navigation: ['Menu', 'Tabs', 'Pagination', 'NavBar', 'Steps', 'Breadcrumb', 'PageHeader'],
  },
};

/** 组件库工具函数 */
export const ComponentLibraryUtils = {
  getVersion: (): string => VERSION,
  getConfig: () => CONFIG,
  hasComponent: (componentName: string): boolean => {
    return Object.values(CONFIG.components).flat().includes(componentName);
  },
  getComponentCategory: (componentName: string): string | null => {
    for (const [category, components] of Object.entries(CONFIG.components)) {
      if (components.includes(componentName)) {
        return category;
      }
    }
    return null;
  },
  getAllComponents: (): string[] => {
    return Object.values(CONFIG.components).flat();
  },
  getCategoryComponents: (category: string): string[] => {
    return CONFIG.components[category as keyof typeof CONFIG.components] || [];
  },
};

// ==================== 命名空间导出 ====================

import * as Components from './components';
import * as Hooks from './hooks';
import * as Utils from './utils';
import * as Theme from './theme';
import * as Types from './types';

export { Components, Hooks, Utils, Theme, Types };
