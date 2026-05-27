/**
 * Button — 新架构示范版 (Headless + CVA 样式)
 * @module components/basic/Button/Button.next
 * @description 演示 Headless Hook + CVA 样式分离的新架构模式
 */

import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Button as TaroButton, View } from '@tarojs/components';

import { useButton } from './useButton';
import { useTheme } from '@/hooks/ui/useTheme';
import { cn } from '@/utils/cva';
import type { ButtonProps } from './Button.types';

// ==================== Loading Spinner ====================

function LoadingSpinner({ color, size }: { color: string; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        border: `2px solid ${color}30`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );
}

// ==================== ButtonNext ====================

export function ButtonNext(props: ButtonProps) {
  const {
    type = 'default',
    size = 'md',
    variant = 'solid',
    disabled = false,
    loading = false,
    block = false,
    flat = false,
    ripple = true,
    icon,
    children,
    className = '',
    style,
    onClick,
    onKeyDown,
    ...rest
  } = props;

  // Headless Hook
  const { handleClick: _handleClick } = useButton({
    type,
    size,
    variant,
    disabled,
    loading,
    block,
    flat,
    onClick,
    onKeyDown,
  });

  // Theme
  const { colors } = useTheme();

  // 主色调
  const mainColor = (() => {
    const map: Record<string, string> = {
      default: '#1f2937',
      primary: colors.primary,
      success: colors.success,
      warning: colors.warning,
      danger: colors.error,
      info: colors.info,
    };
    return map[type] || map.default;
  })();

  // 尺寸配置
  const sizeConfig = ({
    xs: { p: '4px 10px', fz: 12, h: 24, minW: 24, iconSize: 12 },
    sm: { p: '6px 12px', fz: 14, h: 28, minW: 28, iconSize: 14 },
    md: { p: '8px 16px', fz: 16, h: 34, minW: 34, iconSize: 16 },
    lg: { p: '10px 20px', fz: 18, h: 40, minW: 40, iconSize: 18 },
    xl: { p: '12px 24px', fz: 20, h: 48, minW: 48, iconSize: 20 },
  } as const)[size] || { p: '8px 16px', fz: 16, h: 34, minW: 34, iconSize: 16 };

  // 变体样式
  let bg: string, fg: string, border: string;
  switch (variant) {
    case 'outline': bg = 'transparent'; fg = mainColor; border = mainColor; break;
    case 'ghost':
    case 'text': bg = 'transparent'; fg = mainColor; border = 'transparent'; break;
    case 'soft': bg = `${mainColor}15`; fg = mainColor; border = 'transparent'; break;
    default: bg = mainColor; fg = type === 'default' ? '#1f2937' : '#ffffff'; border = mainColor; break;
  }

  // 交互状态
  const interactive = !disabled && !loading;

  // 基础样式
  const baseStyle: CSSProperties = useMemo(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    fontWeight: 500,
    cursor: interactive ? 'pointer' : 'not-allowed',
    width: block ? '100%' : 'auto',
    transition: 'all 150ms ease-in-out',
    padding: sizeConfig.p,
    fontSize: sizeConfig.fz,
    height: sizeConfig.h,
    minWidth: sizeConfig.minW,
    backgroundColor: bg,
    color: fg,
    borderColor: border,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: size === 'xs' ? 6 : size === 'sm' ? 8 : 12,
    boxShadow: flat || variant !== 'solid' ? 'none' : `0 2px 6px ${mainColor}30`,
    opacity: disabled || loading ? 0.5 : 1,
    pointerEvents: disabled || loading ? 'none' : 'auto',
  }), [interactive, block, sizeConfig, bg, fg, border, size, flat, variant, mainColor, disabled, loading]);

  return (
    <TaroButton
      data-testid="button-next"
      type={type === 'primary' ? 'primary' : 'default'}
      size={size === 'xs' || size === 'sm' ? 'mini' : 'default'}
      disabled={disabled || loading}
      style={{ ...baseStyle, ...(style || {}) }}
      className={cn(className)}
      onClick={_handleClick}
      {...(rest as Record<string, unknown>)}
    >
      {loading && <LoadingSpinner color={variant === 'solid' && type !== 'default' ? '#ffffff' : fg} size={sizeConfig.iconSize} />}
      {!loading && icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </TaroButton>
  );
}

export default ButtonNext;