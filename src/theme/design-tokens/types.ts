/**
 * 设计令牌系统
 * 统一的设计变量和CSS自定义属性
 * 提供类型安全的设计令牌管理
 */

// Design tokens don't depend on ThemeConfig types to avoid circular imports

// 设计令牌类型定义
export interface DesignTokens {
  // 颜色令牌
  colors: {
    // 基础颜色
    primary: {
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
    };
    secondary: {
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
    };
    success: {
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
    };
    warning: {
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
    };
    error: {
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
    };
    info: {
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
    };

    // 中性颜色
    neutral: {
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
    };

    // 语义化颜色
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
      link: string;
      placeholder: string;
    };

    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      card: string;
      input: string;
      mask: string;
      hover: string;
      active: string;
    };

    border: {
      default: string;
      focus: string;
      error: string;
      success: string;
      warning: string;
      light: string;
    };

    shadow: {
      default: string;
      light: string;
      medium: string;
      dark: string;
      colored: string;
    };

    // 状态颜色
    status: {
      online: string;
      offline: string;
      busy: string;
      away: string;
    };

    // 交互颜色
    interactive: {
      hover: string;
      active: string;
      focus: string;
      selected: string;
      disabled: string;
    };
  };

  // 间距令牌
  spacing: {
    // 基础间距
    px: string; // 1px
    '0.5': string; // 2px
    '1': string; // 4px
    '1.5': string; // 6px
    '2': string; // 8px
    '2.5': string; // 10px
    '3': string; // 12px
    '3.5': string; // 14px
    '4': string; // 16px
    '5': string; // 20px
    '6': string; // 24px
    '7': string; // 28px
    '8': string; // 32px
    '9': string; // 36px
    '10': string; // 40px
    '11': string; // 44px
    '12': string; // 48px
    '14': string; // 56px
    '16': string; // 64px
    '18': string; // 72px
    '20': string; // 80px
    '24': string; // 96px
    '28': string; // 112px
    '32': string; // 128px
    '36': string; // 144px
    '40': string; // 160px
    '44': string; // 176px
    '48': string; // 192px
    '52': string; // 208px
    '56': string; // 224px
    '60': string; // 240px
    '64': string; // 256px
    '72': string; // 288px
    '80': string; // 320px
    '96': string; // 384px

    // 组件间距
    component: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };

    // 布局间距
    layout: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  };

  // 字体令牌
  typography: {
    // 字体族
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
      display: string[];
      body: string[];
    };

    // 字体大小
    fontSize: {
      '3xs': string; // 10px
      '2xs': string; // 12px
      xs: string; // 14px
      sm: string; // 16px
      base: string; // 18px
      lg: string; // 20px
      xl: string; // 24px
      '2xl': string; // 30px
      '3xl': string; // 36px
      '4xl': string; // 48px
      '5xl': string; // 60px
      '6xl': string; // 72px
      '7xl': string; // 96px
      '8xl': string; // 128px
      '9xl': string; // 160px
    };

    // 字体粗细
    fontWeight: {
      thin: string;
      extralight: string;
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
      black: string;
    };

    // 行高
    lineHeight: {
      none: string;
      tight: string;
      snug: string;
      normal: string;
      relaxed: string;
      loose: string;
      '3': string;
      '4': string;
      '5': string;
      '6': string;
      '7': string;
      '8': string;
      '9': string;
      '10': string;
    };

    // 字母间距
    letterSpacing: {
      tighter: string;
      tight: string;
      normal: string;
      wide: string;
      wider: string;
      widest: string;
    };

    // 段落间距
    paragraphSpacing: {
      none: string;
      tight: string;
      normal: string;
      relaxed: string;
      loose: string;
    };
  };

  // 边框令牌
  borderRadius: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;

    // 组件专用
    button: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };

    input: {
      sm: string;
      md: string;
      lg: string;
    };

    card: {
      sm: string;
      md: string;
      lg: string;
    };

    modal: string;
    dropdown: string;
  };

  // 阴影令牌
  boxShadow: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    inner: string;
    colored: string;

    // 组件专用
    button: {
      sm: string;
      md: string;
      lg: string;
    };

    card: {
      sm: string;
      md: string;
      lg: string;
    };

    modal: string;
    tooltip: string;
    dropdown: string;
  };

  // 动画令牌
  animation: {
    // 持续时间
    duration: {
      '75': string;
      '100': string;
      '150': string;
      '200': string;
      '300': string;
      '500': string;
      '700': string;
      '1000': string;
    };

    // 缓动函数
    easing: {
      linear: string;
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      'in-quad': string;
      'in-cubic': string;
      'in-quart': string;
      'in-quint': string;
      'in-sine': string;
      'in-expo': string;
      'in-circ': string;
      'in-back': string;
      'out-quad': string;
      'out-cubic': string;
      'out-quart': string;
      'out-quint': string;
      'out-sine': string;
      'out-expo': string;
      'out-circ': string;
      'out-back': string;
      'in-out-quad': string;
      'in-out-cubic': string;
      'in-out-quart': string;
      'in-out-quint': string;
      'in-out-sine': string;
      'in-out-expo': string;
      'in-out-circ': string;
      'in-out-back': string;
    };

    // 延迟
    delay: {
      '75': string;
      '100': string;
      '150': string;
      '200': string;
      '300': string;
      '500': string;
      '700': string;
      '1000': string;
    };
  };

  // 断点令牌
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };

  // Z-index 令牌
  zIndex: {
    hide: string;
    auto: string;
    base: string;
    dropdown: string;
    sticky: string;
    fixed: string;
    'modal-backdrop': string;
    modal: string;
    'popover-backdrop': string;
    popover: string;
    tooltip: string;
    max: string;
  };

  // 过渡令牌
  transition: {
    none: string;
    all: string;
    common: string;
    colors: string;
    opacity: string;
    shadow: string;
    transform: string;

    // 组件专用
    button: string;
    input: string;
    modal: string;
    tooltip: string;
    dropdown: string;
  };

  // 混合模式
  blendMode: {
    normal: string;
    multiply: string;
    screen: string;
    overlay: string;
    darken: string;
    lighten: string;
    'color-dodge': string;
    'color-burn': string;
    hardlight: string;
    softlight: string;
    difference: string;
    exclusion: string;
    hue: string;
    saturation: string;
    color: string;
    luminosity: string;
  };

  // 光标
  cursor: {
    auto: string;
    default: string;
    pointer: string;
    wait: string;
    text: string;
    move: string;
    'not-allowed': string;
    grab: string;
    grabbing: string;
    'zoom-in': string;
    'zoom-out': string;
  };
}
