/**
 * Divider 组件样式工具类
 */

import type { DividerProps, DividerOrientation, DividerType, DividerSize, DividerColor } from './Divider.types';

export class DividerStylesClass {
  private static getPlatformPrefix(): string { return 'orva-ui-divider'; }

  static readonly SIZE_MAP: Record<string, { width: number; height: number; margin: number }> = {
    thin: { width: 100, height: 1, margin: 8 }, default: { width: 100, height: 2, margin: 16 },
    thick: { width: 100, height: 3, margin: 24 }, xs: { width: 100, height: 1, margin: 4 },
    sm: { width: 100, height: 1, margin: 8 }, md: { width: 100, height: 2, margin: 16 },
    lg: { width: 100, height: 2, margin: 20 }, xl: { width: 100, height: 3, margin: 24 },
  };

  static readonly COLOR_MAP: Record<string, string> = {
    primary: '#0ea5e9', secondary: '#6b7280', success: '#22c55e',
    warning: '#f59e0b', error: '#ef4444', info: '#3b82f6',
    light: '#f3f4f6', dark: '#1f2937', border: '#e5e7eb',
  };

  static readonly TYPE_STYLES: Record<DividerType, { borderStyle: string }> = {
    solid: { borderStyle: 'solid' }, dashed: { borderStyle: 'dashed' }, dotted: { borderStyle: 'dotted' },
  };

  static readonly POSITION_MAP: Record<string, { textAlign: string }> = {
    left: { textAlign: 'left' }, right: { textAlign: 'right' }, center: { textAlign: 'center' },
  };

  static readonly ORIENTATION_MAP: Record<DividerOrientation, { flexDirection: string; width: string; height: string }> = {
    horizontal: { flexDirection: 'row', width: '100%', height: 'auto' },
    vertical: { flexDirection: 'column', width: 'auto', height: '100%' },
  };

  static getSizeStyles(size: DividerSize) {
    return (DividerStylesClass.SIZE_MAP[size] || DividerStylesClass.SIZE_MAP['default']) as { width: number; height: number; margin: number };
  }

  static getColorStyle(color: DividerColor) {
    const c = String(color);
    return (DividerStylesClass.COLOR_MAP[c] || DividerStylesClass.COLOR_MAP['border']) as string;
  }

  static getTypeStyle(type: DividerType) {
    return (DividerStylesClass.TYPE_STYLES[type] || DividerStylesClass.TYPE_STYLES.solid) as { borderStyle: string };
  }

  static getPositionStyle(position: string) {
    return (DividerStylesClass.POSITION_MAP[position] || DividerStylesClass.POSITION_MAP['left']) as { textAlign: string };
  }

  static getOrientationStyle(orientation: DividerOrientation) {
    return (DividerStylesClass.ORIENTATION_MAP[orientation] || DividerStylesClass.ORIENTATION_MAP.horizontal) as { flexDirection: string; width: string; height: string };
  }

  static computeStyles(props: Partial<DividerProps>): React.CSSProperties {
    const { orientation = 'horizontal', type = 'solid', size = 'default', color, inset } = props;
    const sizeStyles = DividerStylesClass.getSizeStyles(size);
    const colorStyle = color ? DividerStylesClass.getColorStyle(color) : DividerStylesClass.COLOR_MAP['border'];
    const typeStyle = DividerStylesClass.getTypeStyle(type);
    const isHorizontal = orientation === 'horizontal';
    const borderWidth = isHorizontal ? sizeStyles.height : sizeStyles.width;
    const margin = sizeStyles.margin;
    
    return {
      boxSizing: 'border-box' as const,
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
      width: isHorizontal ? '100%' : 'auto',
      height: isHorizontal ? 'auto' : '100%',
      borderWidth,
      borderStyle: typeStyle.borderStyle,
      borderColor: colorStyle,
      margin,
      ...(inset !== undefined ? (isHorizontal ? { marginLeft: inset, marginRight: inset } : { marginTop: inset, marginBottom: inset }) : {}),
    };
  }

  static getClassName(props: Partial<DividerProps>): string {
    const { orientation, type, size, variant } = props;
    const parts = [DividerStylesClass.getPlatformPrefix()];
    if (orientation) parts.push(String(orientation));
    if (type) parts.push(String(type));
    if (size) parts.push(String(size));
    if (variant) parts.push(String(variant));
    return parts.join('-');
  }

  /** 获取文本分隔线样式 */
  static getTextDividerStyle(options: {
    children?: React.ReactNode;
    orientation?: DividerOrientation;
    textSpacing?: number;
    textBackground?: string;
    textPadding?: string;
    textBorderRadius?: string;
    textStyle?: React.CSSProperties;
  }): React.CSSProperties {
    const {
      orientation = 'horizontal',
      textSpacing = 16,
      textBackground,
      textPadding = '4px 12px',
      textBorderRadius = '4px',
      textStyle = {},
    } = options;

    const isHorizontal = orientation === 'horizontal';

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(isHorizontal
        ? {
            gap: textSpacing,
          }
        : {
            flexDirection: 'column',
            gap: textSpacing,
          }),
      ...(textBackground
        ? {
            backgroundColor: textBackground,
            padding: textPadding,
            borderRadius: textBorderRadius,
          }
        : {}),
      ...textStyle,
    };
  }

  /** 获取图标分隔线样式 */
  static getIconDividerStyle(options: {
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'center' | 'right';
    iconSpacing?: number;
  }): React.CSSProperties {
    const { iconPosition = 'left', iconSpacing = 12 } = options;

    return {
      display: 'flex',
      alignItems: 'center',
      gap: iconSpacing,
      ...(iconPosition === 'right' ? { flexDirection: 'row-reverse' } : {}),
    };
  }

  /** 获取响应式样式 */
  static getResponsiveStyle(options: {
    breakpoint?: string;
    orientation?: DividerOrientation;
  }): React.CSSProperties {
    const { breakpoint } = options;

    if (!breakpoint) return {};

    // 返回空对象，响应式由外部处理
    return {};
  }
}

export const dividerStyles = DividerStylesClass;
export default DividerStylesClass;
