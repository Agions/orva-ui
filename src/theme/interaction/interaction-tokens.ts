/**
 * Nano-UI 交互状态设计令牌
 * 统一管理组件的 hover、focus、active、pressed 等状态
 * 确保跨组件一致的用户体验
 * @module theme/interaction/interaction-tokens
 */



/** 交互状态类型 */
export type InteractionState = 'idle' | 'hover' | 'focus' | 'active' | 'pressed' | 'disabled' | 'loading' | 'selected' | 'error' | 'success';

/** 状态颜色变化 */
export interface StateColorModifiers {
  /** 悬停状态 - 亮度提升 8% */
  hover: { brightness: number; opacity: number };
  /** 焦点状态 - 添加光晕 */
  focus: { brightness: number; ringWidth: number; ringOpacity: number };
  /** 激活状态 - 亮度降低 8% */
  active: { brightness: number; scale: number };
  /** 按下状态 - 轻微缩放 */
  pressed: { brightness: number; scale: number };
  /** 禁用状态 */
  disabled: { opacity: number; saturation: number };
  /** 加载状态 */
  loading: { opacity: number };
}

/** 默认状态修饰符 */
export const defaultStateModifiers: StateColorModifiers = {
  hover: { brightness: 1.08, opacity: 1 },
  focus: { brightness: 1, ringWidth: 3, ringOpacity: 0.2 },
  active: { brightness: 0.92, scale: 0.98 },
  pressed: { brightness: 0.95, scale: 0.96 },
  disabled: { opacity: 0.4, saturation: 0 },
  loading: { opacity: 0.7 },
};

/** 组件状态配置 */
export interface ComponentStateConfig {
  /** 是否支持悬停 */
  hoverable: boolean;
  /** 是否支持焦点 */
  focusable: boolean;
  /** 是否支持激活 */
  activatable: boolean;
  /** 是否支持按下 */
  pressable: boolean;
  /** 是否支持选中 */
  selectable: boolean;
  /** 是否支持错误 */
  errorable: boolean;
  /** 是否支持成功 */
  successable: boolean;
}

/** 默认组件状态配置 */
export const defaultComponentStateConfig: ComponentStateConfig = {
  hoverable: true,
  focusable: true,
  activatable: true,
  pressable: true,
  selectable: false,
  errorable: true,
  successable: false,
};

/** 特定组件的状态配置 */
export const componentStateConfigs: Record<string, Partial<ComponentStateConfig>> = {
  button: { hoverable: true, focusable: true, activatable: true, pressable: true, selectable: false, errorable: false },
  card: { hoverable: true, focusable: true, activatable: false, pressable: true, selectable: true, errorable: false },
  input: { hoverable: true, focusable: true, activatable: false, pressable: false, selectable: false, errorable: true, successable: true },
  link: { hoverable: true, focusable: true, activatable: true, pressable: false },
  listItem: { hoverable: true, focusable: true, activatable: true, pressable: true, selectable: true },
  menuItem: { hoverable: true, focusable: true, activatable: true, selectable: true },
  tab: { hoverable: true, focusable: true, activatable: true, selectable: true },
  chip: { hoverable: true, focusable: true, activatable: true, pressable: true, selectable: true },
  switch: { hoverable: false, focusable: true, activatable: true },
  checkbox: { hoverable: true, focusable: true, activatable: true },
  radio: { hoverable: true, focusable: true, activatable: true },
};

/**
 * 获取组件状态配置
 */
export function getComponentStateConfig(componentName: string): ComponentStateConfig {
  const specific = componentStateConfigs[componentName];
  return { ...defaultComponentStateConfig, ...specific };
}

/**
 * 计算状态样式
 * 根据主题和状态计算最终样式
 */
export interface ComputedStateStyle {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  boxShadow?: string;
  opacity?: number;
  transform?: string;
  filter?: string;
  outline?: string;
  outlineOffset?: string;
}

/**
 * 调整颜色亮度
 * @param color hex 颜色
 * @param factor 亮度系数 (1 = 不变，>1 变亮，<1 变暗)
 */
export function adjustBrightness(color: string, factor: number): string {
  // 简化版本：将颜色转换为 rgb，调整亮度
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const newR = Math.min(255, Math.max(0, Math.round(r * factor)));
  const newG = Math.min(255, Math.max(0, Math.round(g * factor)));
  const newB = Math.min(255, Math.max(0, Math.round(b * factor)));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

/**
 * 调整颜色透明度
 */
export function adjustOpacity(color: string, opacity: number): string {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (color.startsWith('rgb(')) {
    const match = color.match(/\d+/g);
    if (match) {
      return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${opacity})`;
    }
  }
  return color;
}

/**
 * 计算 focus ring 样式
 */
export function computeFocusRing(
  color: string,
  ringWidth: number = 3,
  ringOpacity: number = 0.2,
): string {
  return `0 0 0 ${ringWidth}px ${adjustOpacity(color, ringOpacity)}`;
}

/**
 * 计算状态样式
 */
export function computeStateStyle(
  baseColor: string,
  state: InteractionState,
  modifiers: StateColorModifiers = defaultStateModifiers,
): ComputedStateStyle {
  switch (state) {
    case 'hover':
      return {
        backgroundColor: adjustBrightness(baseColor, modifiers.hover.brightness),
      };
    case 'focus':
      return {
        boxShadow: computeFocusRing(baseColor, modifiers.focus.ringWidth, modifiers.focus.ringOpacity),
      };
    case 'active':
      return {
        backgroundColor: adjustBrightness(baseColor, modifiers.active.brightness),
        transform: `scale(${modifiers.active.scale})`,
      };
    case 'pressed':
      return {
        backgroundColor: adjustBrightness(baseColor, modifiers.pressed.brightness),
        transform: `scale(${modifiers.pressed.scale})`,
      };
    case 'disabled':
      return {
        opacity: modifiers.disabled.opacity,
      };
    case 'loading':
      return {
        opacity: modifiers.loading.opacity,
      };
    default:
      return {};
  }
}

export default {
  defaultStateModifiers,
  defaultComponentStateConfig,
  componentStateConfigs,
  getComponentStateConfig,
  adjustBrightness,
  adjustOpacity,
  computeFocusRing,
  computeStateStyle,
};
