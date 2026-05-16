/**
 * 颜色设计令牌
 * 统一管理所有颜色相关的设计令牌
 */

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled?: string;
  inverse?: string;
  placeholder?: string;
  link?: string;
  card?: string;
  input?: string;
  mask?: string;
  hover?: string;
  active?: string;
}

export interface ColorTokens {
  // 基础颜色比例尺
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  neutral: ColorScale;

  // 语义化颜色
  text: SemanticColors;
  background: SemanticColors;
  border: {
    default: string;
    light: string;
    focus?: string;
    error?: string;
    success?: string;
    warning?: string;
  };
  shadow: {
    default: string;
    light: string;
    medium: string;
    dark: string;
    colored: string;
  };
  status: {
    online: string;
    offline: string;
    busy: string;
    away: string;
  };
  interactive: {
    hover: string;
    active: string;
    focus: string;
    selected: string;
    disabled: string;
  };
}

// 默认颜色令牌
// Nano-UI 设计系统 - 现代紫罗兰主题
export const colorTokens: ColorTokens = {
  primary: {
    // 主色: 紫罗兰 - 现代、优雅、科技感
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',  // 主色调
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  secondary: {
    // 次要色: 珊瑚橙 - 活力、温暖
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  info: {
    // 信息色: 天青蓝
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  text: {
    primary: '#18181b',      // 更深的中性色
    secondary: '#52525b',
    tertiary: '#71717a',
    disabled: '#a1a1aa',
    inverse: '#ffffff',
    link: '#a855f7',         // 紫罗兰链接色
    placeholder: '#a1a1aa',
  },
  background: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f4f4f5',
    card: '#ffffff',
    input: '#fafafa',
    mask: 'rgba(0, 0, 0, 0.45)',  // 稍轻的遮罩
    hover: 'rgba(168, 85, 247, 0.08)',  // 紫罗兰悬浮
    active: 'rgba(168, 85, 247, 0.12)',  // 紫罗兰激活
  },
  border: {
    default: '#e4e4e7',
    light: '#f4f4f5',
    focus: '#a855f7',        // 紫罗兰聚焦
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
  },
  shadow: {
    default: 'rgba(168, 85, 247, 0.08)',  // 紫罗兰色调阴影
    light: 'rgba(0, 0, 0, 0.04)',
    medium: 'rgba(168, 85, 247, 0.12)',
    dark: 'rgba(0, 0, 0, 0.2)',
    colored: 'rgba(168, 85, 247, 0.2)',   // 紫罗兰彩色阴影
  },
  status: {
    online: '#22c55e',
    offline: '#6b7280',
    busy: '#ef4444',
    away: '#f59e0b',
  },
  interactive: {
    hover: 'rgba(168, 85, 247, 0.08)',     // 紫罗兰悬浮
    active: 'rgba(168, 85, 247, 0.12)',    // 紫罗兰激活
    focus: 'rgba(168, 85, 247, 0.15)',     // 紫罗兰聚焦
    selected: 'rgba(168, 85, 247, 0.2)',   // 紫罗兰选中
    disabled: 'rgba(0, 0, 0, 0.25)',
  },
};

// 暗色主题颜色令牌
export const darkColorTokens: Partial<ColorTokens> = {
  text: {
    primary: '#fafafa',
    secondary: '#d4d4d8',
    tertiary: '#a1a1aa',
    disabled: '#52525b',
    inverse: '#18181b',
    link: '#c084fc',          // 亮紫罗兰
    placeholder: '#52525b',
  },
  background: {
    primary: '#18181b',
    secondary: '#27272a',
    tertiary: '#3f3f46',
    card: '#27272a',
    input: '#3f3f46',
    mask: 'rgba(0, 0, 0, 0.75)',
    hover: 'rgba(168, 85, 247, 0.1)',  // 紫罗兰悬浮
    active: 'rgba(168, 85, 247, 0.15)',  // 紫罗兰激活
  },
  border: {
    default: '#3f3f46',
    light: '#52525b',
    focus: '#c084fc',         // 亮紫罗兰聚焦
    error: '#f87171',
    success: '#4ade80',
    warning: '#fbbf24',
  },
  shadow: {
    default: 'rgba(0, 0, 0, 0.4)',
    light: 'rgba(0, 0, 0, 0.2)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.6)',
    colored: 'rgba(192, 132, 252, 0.15)',  // 亮紫罗兰彩色阴影
  },
};
