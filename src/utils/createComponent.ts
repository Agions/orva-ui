/**
 * 组件工厂函数 - 增强版
 * 提供标准化的组件创建模式，自动注入主题、平台上下文
 * @module utils/createComponent
 * @description 统一的组件工厂模式，支持 ref 转发、memo 优化、默认 props
 */

import {
  forwardRef,
  memo,
  useContext,
  createContext,
  useMemo,
} from 'react';
import type {
  ComponentType,
  ForwardRefRenderFunction,
  RefAttributes,
  Context,
  ReactNode,
  FC,
  ForwardRefExoticComponent,
  MemoExoticComponent,
  PropsWithoutRef,
} from 'react';
import type { BaseProps } from '../types/component';

// ==================== 类型定义 ====================

/**
 * 组件工厂配置选项
 */
export interface CreateComponentOptions<
  P extends BaseProps = BaseProps,
  R = unknown
> {
  /**
   * 组件名称
   * 用于设置 displayName 和调试
   */
  name: string;

  /**
   * 组件渲染函数
   * 接收 props 和 ref，返回 ReactNode
   */
  render: ForwardRefRenderFunction<R, P>;

  /**
   * 是否使用 React.memo 优化
   * @default true
   */
  memo?: boolean;

  /**
   * 自定义 memo 比较函数
   * 返回 true 表示 props 相等，跳过重渲染
   * 仅在 memo=true 时生效
   *
   * @example
   * ```ts
   * arePropsEqual: (prev, next) => prev.children === next.children && prev.size === next.size
   * ```
   */
  arePropsEqual?: (
    prevProps: Readonly<PropsWithoutRef<P> & RefAttributes<R>>,
    nextProps: Readonly<PropsWithoutRef<P> & RefAttributes<R>>,
  ) => boolean;

  /**
   * 默认 Props
   * 会与传入的 props 合并
   */
  defaultProps?: Partial<P>;

  /**
   * 组件元数据
   */
  meta?: ComponentMeta;
}

/**
 * 组件上下文值
 */
export interface ComponentContextValue {
  /**
   * 组件前缀
   * 用于生成类名
   */
  prefix: string;

  /**
   * 是否为 RTL 布局
   */
  rtl: boolean;

  /**
   * 当前主题
   */
  theme?: string;

  /**
   * 当前平台
   */
  platform?: string;
}

/**
 * 组件元数据
 */
export interface ComponentMeta {
  /**
   * 组件名称
   */
  name: string;

  /**
   * 组件版本
   */
  version?: string;

  /**
   * 组件描述
   */
  description?: string;

  /**
   * 组件类别
   */
  category?: 'basic' | 'data-display' | 'input' | 'navigation' | 'feedback' | 'layout';

  /**
   * 是否实验性
   */
  experimental?: boolean;

  /**
   * 依赖的 hooks
   */
  dependencies?: string[];
}

/**
 * 组件工厂返回类型（带 ref）
 */
export type ComponentFactoryReturn<P extends BaseProps, R> =
  | ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<R>>
  | MemoExoticComponent<ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<R>>>;

/**
 * 组件工厂返回类型（无 ref）
 */
export type ComponentFactoryReturnNoRef<P extends BaseProps> = FC<P>;

/**
 * 组件渲染参数
 */
export interface ComponentRenderParams<P extends BaseProps, R> {
  props: P;
  ref: ForwardedRef<R> | null;
}

/**
 * ForwardedRef 类型（兼容 React 18）
 */
export type ForwardedRef<T> =
  | ((instance: T | null) => void)
  | React.MutableRefObject<T | null>
  | null;

// ==================== 上下文 ====================

/**
 * 组件上下文默认值
 */
const defaultComponentContext: ComponentContextValue = {
  prefix: 'orva-ui',
  rtl: false,
};

/**
 * 组件上下文
 */
export const ComponentContext: Context<ComponentContextValue> =
  createContext<ComponentContextValue>(defaultComponentContext);

/**
 * 获取组件上下文
 */
export function useComponentContext(): ComponentContextValue {
  return useContext(ComponentContext);
}

/**
 * 使用组件前缀
 */
export function useComponentPrefix(): string {
  const { prefix } = useComponentContext();
  return prefix;
}

// ==================== 工具函数 ====================

/**
 * 合并默认 Props
 */
function mergeDefaultProps<P extends BaseProps>(
  defaultProps: Partial<P> | undefined,
  props: P,
): P {
  if (!defaultProps) return props;
  return { ...defaultProps, ...props } as P;
}

/**
 * 生成组件类名
 */
export function generateComponentClassName(
  componentName: string,
  className?: string,
  prefix?: string,
): string {
  const componentPrefix = prefix || 'orva-ui';
  const baseName = `${componentPrefix}-${componentName.toLowerCase()}`;
  return className ? `${baseName} ${className}` : baseName;
}

// ==================== 工厂函数 ====================

/**
 * 创建标准化组件
 *
 * 功能：
 * - 自动设置 displayName
 * - 自动支持 forwardRef
 * - 可选的 React.memo 优化
 * - 合并默认 Props
 * - 严格的类型检查
 * - 支持组件元数据
 *
 * @param options - 组件配置选项
 * @returns 标准化的 React 组件
 *
 * @example
 * ```typescript
 * interface ButtonProps extends InteractiveProps {
 *   type?: 'primary' | 'default';
 *   onClick?: () => void;
 * }
 *
 * const Button = createComponent<ButtonProps, HTMLButtonElement>({
 *   name: 'Button',
 *   meta: {
 *     category: 'basic',
 *     version: '1.0.0',
 *   },
 *   defaultProps: {
 *     type: 'default',
 *   },
 *   render: (props, ref) => {
 *     const { type, children, className, style, ...rest } = props;
 *     return (
 *       <button ref={ref} className={className} style={style} {...rest}>
 *         {children}
 *       </button>
 *     );
 *   },
 * });
 * ```
 */
export function createComponent<
  P extends BaseProps = BaseProps,
  R = unknown
>(
  options: CreateComponentOptions<P, R>,
): ComponentFactoryReturn<P, R> {
  const {
    name,
    render,
    memo: useMemo = true,
    arePropsEqual,
    defaultProps,
    meta,
  } = options;

  // 创建 forwardRef 组件
  const ForwardedComponent = forwardRef<R, P>((props, ref) => {
    // 合并默认 Props
    const mergedProps = mergeDefaultProps(defaultProps, props as P);

    // 注入组件上下文，确保主题/平台上下文可用并触发重渲染
    useComponentContext();

    // 调用渲染函数
    return render(mergedProps as any as Parameters<typeof render>[0], ref);
  });

  // 设置 displayName
  ForwardedComponent.displayName = name;

  // 设置元数据（作为静态属性）
  if (meta) {
    (ForwardedComponent as unknown as Record<string, unknown>).__orva_meta__ = meta;
  }

  // 根据配置决定是否使用 memo
  if (useMemo) {
    const MemoizedComponent = memo(ForwardedComponent, arePropsEqual);
    MemoizedComponent.displayName = name;
    if (meta) {
      (MemoizedComponent as unknown as Record<string, unknown>).__orva_meta__ = meta;
    }
    return MemoizedComponent as ComponentFactoryReturn<P, R>;
  }

  return ForwardedComponent as ComponentFactoryReturn<P, R>;
}

/**
 * 创建无 ref 的标准化组件
 * 适用于不需要 ref 转发的简单组件
 *
 * @param options - 组件配置选项（render 函数不接收 ref）
 * @returns 标准化的 React 组件
 */
export function createComponentNoRef<P extends BaseProps = BaseProps>(
  options: Omit<CreateComponentOptions<P, never>, 'render'> & {
    render: (props: P) => ReactNode;
  },
): ComponentFactoryReturnNoRef<P> {
  const { name, render, defaultProps, meta } = options;

  const Component: FC<P> = (props) => {
    const mergedProps = mergeDefaultProps(defaultProps, props);
    return render(mergedProps as P);
  };

  Component.displayName = name;

  if (meta) {
    (Component as unknown as Record<string, unknown>).__orva_meta__ = meta;
  }

  return Component;
}

/**
 * 创建带默认样式的组件
 */
export function createStyledComponent<
  P extends BaseProps = BaseProps,
  R = unknown
>(
  options: CreateComponentOptions<P, R> & {
    defaultStyles?: React.CSSProperties;
  },
): ComponentFactoryReturn<P, R> {
  const { defaultStyles, ...rest } = options;

  const enhancedRender: ForwardRefRenderFunction<R, P> = (props, ref) => {
    const { style, ...restProps } = props;
    const mergedStyle = useMemo(
      () => ({ ...defaultStyles, ...style }),
      [defaultStyles, style],
    );

    return rest.render({ ...restProps, style: mergedStyle } as P, ref);
  };

  return createComponent({
    ...rest,
    render: enhancedRender,
  });
}

/**
 * 获取组件元数据
 */
export function getComponentMeta<T extends ForwardRefExoticComponent<any>>(
  component: T,
): ComponentMeta | undefined {
  return (component as Record<string, unknown>).__orva_meta__ as ComponentMeta | undefined;
}

/**
 * 检查组件是否为 Orva UI 组件
 */
export function isOrvaUIComponent<T extends ComponentType<any>>(
  component: T,
): component is T & { __orva_meta__?: ComponentMeta } {
  return '__orva_meta__' in component;
}

// ==================== BEM 工具 ====================

/**
 * 创建 BEM 类名
 * @param block - 块名
 * @param element - 元素名（可选）
 * @param modifier - 修饰符（字符串或对象，可选）
 * @returns BEM 类名字符串
 *
 * @example
 * createBEM('button') // => 'button'
 * createBEM('button', 'icon') // => 'button__icon'
 * createBEM('button', undefined, 'active') // => 'button--active'
 * createBEM('button', 'icon', 'large') // => 'button__icon--large'
 * createBEM('button', undefined, { active: true, disabled: false }) // => 'button--active'
 */
export function createBEM(
  block: string,
  element?: string,
  modifier?: string | Record<string, boolean>,
): string {
  let className = block;

  if (element) {
    className = `${className}__${element}`;
  }

  if (modifier) {
    if (typeof modifier === 'string') {
      className = `${className}--${modifier}`;
    } else {
      // modifier 是对象，只添加值为 true 的键
      const activeModifiers = Object.entries(modifier)
        .filter(([, value]) => value)
        .map(([key]) => key);
      if (activeModifiers.length > 0) {
        className = `${className} ${activeModifiers.map((m) => `${className}--${m}`).join(' ')}`;
      }
    }
  }

  return className;
}

// ==================== Namespace 工具 ====================

/**
 * 创建命名空间工具
 * 提供 BEM 风格的类名生成方法
 *
 * @example
 * const ns = createNamespace('taro-button');
 * ns.b()                    // => 'taro-button'
 * ns.b('icon')              // => 'taro-button-icon'
 * ns.e('text')              // => 'taro-button__text'
 * ns.m('primary')           // => 'taro-button--primary'
 * ns.be('icon', 'svg')      // => 'taro-button-icon__svg'
 * ns.bm('icon', 'large')    // => 'taro-button-icon--large'
 * ns.em('text', 'bold')     // => 'taro-button__text--bold'
 * ns.bem('icon', 'svg', 'animated') // => 'taro-button-icon__svg--animated'
 * ns.is('active')           // => 'is-active'
 * ns.is('disabled', false)  // => ''
 */
export function createNamespace(namespace: string) {
  const b = (blockSuffix?: string) => {
    return blockSuffix ? `${namespace}-${blockSuffix}` : namespace;
  };

  const e = (element: string) => `${namespace}__${element}`;
  const m = (modifier: string) => `${namespace}--${modifier}`;
  const be = (blockSuffix: string, element: string) =>
    `${namespace}-${blockSuffix}__${element}`;
  const bm = (blockSuffix: string, modifier: string) =>
    `${namespace}-${blockSuffix}--${modifier}`;
  const em = (element: string, modifier: string) =>
    `${namespace}__${element}--${modifier}`;
  const bem = (blockSuffix?: string, element?: string, modifier?: string) => {
    if (blockSuffix && element && modifier) return `${namespace}-${blockSuffix}__${element}--${modifier}`;
    if (blockSuffix && element) return `${namespace}-${blockSuffix}__${element}`;
    if (blockSuffix) return `${namespace}-${blockSuffix}`;
    return namespace;
  };
  const is = (state: string, active = true) =>
    active ? `is-${state}` : '';

  return { b, e, m, be, bm, em, bem, is, namespace };
}

// ==================== 组件注册表 ====================

/** 组件元数据 */
export interface ComponentMetaInfo {
  name?: string;
  version?: string;
  description?: string;
  category?: string;
  [key: string]: unknown;
}

/** 组件注册表 */
const componentRegistry = new Map<string, ComponentMetaInfo>();

/**
 * 注册组件元数据
 */
export function registerComponent(name: string, meta: ComponentMetaInfo): void {
  componentRegistry.set(name, { ...meta, name });
}

/**
 * 获取已注册的组件元数据
 */
export function getRegisteredComponent(name: string): ComponentMetaInfo | undefined {
  return componentRegistry.get(name);
}

/**
 * 获取所有已注册的组件名称
 */
export function getAllRegisteredComponents(): string[] {
  return Array.from(componentRegistry.keys());
}

// ==================== 复合组件 ====================

/**
 * 创建复合组件（带子组件的组件）
 *
 * @example
 * const Main = createCompoundComponent<MainProps, HTMLDivElement, { Item: typeof Item }>({
 *   main: { name: 'Main', render: (props, ref) => <div ref={ref}>{props.children}</div> },
 *   subComponents: { Item },
 * });
 * // Main.Item 可访问
 */
export function createCompoundComponent<
  P extends BaseProps,
  R = unknown,
  Sub extends Record<string, ComponentType<any>> = Record<string, ComponentType<any>>,
>(
  options: {
    main: CreateComponentOptions<P, R>;
    subComponents: Sub;
  },
): ComponentFactoryReturn<P, R> & Sub {
  const mainComponent = createComponent<P, R>(options.main);

  // 将子组件附加到主组件
  const compoundComponent = mainComponent as ComponentFactoryReturn<P, R> & Sub;
  for (const [key, comp] of Object.entries(options.subComponents)) {
    (compoundComponent as Record<string, unknown>)[key] = comp;
  }

  return compoundComponent;
}


