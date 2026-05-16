/**
 * 可访问性类型定义
 */

// React types imported as needed

// ARIA属性类型
export interface AriaAttributes {
  /**
   * 元素的描述性标签，用于屏幕阅读器
   */
  'aria-label'?: string;
  /**
   * 指向描述该元素的其他元素的ID
   */
  'aria-describedby'?: string;
  /**
   * 元素的语义角色
   */
  role?: string;
  /**
   * 指示元素是否被选中（如按钮、菜单项等）
   */
  'aria-checked'?: 'true' | 'false' | 'mixed';
  /**
   * 指示元素是否已展开（如折叠面板、树节点等）
   */
  'aria-expanded'?: 'true' | 'false';
  /**
   * 指示元素是否处于活动状态
   */
  'aria-busy'?: 'true' | 'false';
  /**
   * 指示元素是否被禁用
   */
  'aria-disabled'?: 'true' | 'false';
  /**
   * 指示元素是否隐藏
   */
  'aria-hidden'?: 'true' | 'false';
  /**
   * 指示元素是否可聚焦
   */
  'aria-focusable'?: 'true' | 'false';
  /**
   * 指示元素是否无效或验证失败
   */
  'aria-invalid'?: 'true' | 'false' | 'grammar' | 'spelling';
  /**
   * 指示元素是否处于加载状态
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';
  /**
   * 指示元素是否是多选的
   */
  'aria-multiselectable'?: 'true' | 'false';
  /**
   * 指示元素是否是多值的
   */
  'aria-multivalued'?: 'true' | 'false';
  /**
   * 指示元素是否只读
   */
  'aria-readonly'?: 'true' | 'false';
  /**
   * 指示元素是否是可搜索的
   */
  'aria-search'?: 'true' | 'false';
  /**
   * 指示元素是否可选择多个值
   */
  'aria-selected'?: 'true' | 'false';
  /**
   * 元素的当前排序方式
   */
  'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
  /**
   * 指示元素是否是可拖拽的
   */
  'aria-dragging'?: 'true' | 'false';
  /**
   * 指示元素是否是可排序的
   */
  'aria-grabbed'?: 'true' | 'false';
  /**
   * 指示元素是否可调整大小
   */
  'aria-resizable'?: 'true' | 'false';
  /**
   * 指示元素是否是可缩放的
   */
  'aria-level'?: number;
  /**
   * 指示元素在层次结构中的位置
   */
  'aria-posinset'?: number;
  /**
   * 指示元素的总数量
   */
  'aria-setsize'?: number;
  /**
   * 元素的当前状态
   */
  'aria-valuenow'?: number;
  /**
   * 元素的最小值
   */
  'aria-valuemin'?: number;
  /**
   * 元素的最大值
   */
  'aria-valuemax'?: number;
}

// 键盘快捷键类型
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  description: string;
}

// 焦点管理配置
export interface FocusManagementConfig {
  /**
   * 是否自动获得焦点
   */
  autoFocus?: boolean;
  /**
   * 焦点循环模式
   */
  focusLoop?: boolean;
  /**
   * 焦点陷阱（对话框等）
   */
  focusTrap?: boolean;
  /**
   * 焦点顺序
   */
  tabOrder?: 'sequential' | 'linear' | 'custom';
}

// 屏幕阅读器通知类型
export type ScreenReaderNotificationType = 
  | 'polite'
  | 'assertive'
  | 'off'
  | 'liveRegion';

// 颜色对比检查配置
export interface ColorContrastConfig {
  /**
   * 最低对比度要求
   */
  minRatio: number;
  /**
   * 背景色
   */
  backgroundColor: string;
  /**
   * 文本色
   */
  textColor: string;
  /**
   * 是否启用高对比度模式
   */
  highContrast?: boolean;
}

// 组件可访问性配置
export interface ComponentAccessibilityConfig<T = any> {
  /**
   * 组件名称
   */
  componentName: string;
  /**
   * 默认ARIA属性
   */
  defaultAriaAttributes?: Partial<AriaAttributes>;
  /**
   * 键盘快捷键
   */
  keyboardShortcuts?: KeyboardShortcut[];
  /**
   * 焦点管理
   */
  focusConfig?: FocusManagementConfig;
  /**
   * 自定义验证函数
   */
  validateAccessibility?: (props: T) => string | null;
}

// 导出类型别名
export type AriaProps<T> = T & AriaAttributes;
export type AccessibleComponentProps<T extends Record<string, any>> = 
  T & {
    accessibilityLabel?: string;
    ariaRole?: string;
    onAccessiblePress?: () => void;
  };
