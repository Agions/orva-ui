/**
 * Divider 分割线组件
 * @module components/basic/Divider
 * @description 支持水平/垂直方向、多种线型、文本/图标内容、渐变色、动画效果、响应式布局的高级分割线组件。
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider type="dashed">文字分隔</Divider>
 * ```
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View } from '@tarojs/components';
import type { CommonEventFunction } from '@tarojs/components';
import { dividerStyles } from './Divider.styles';
import type { DividerProps, DividerRef } from './Divider.types';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import type { ARIARole } from '@/hooks/ui/useAccessibility';

/**
 * Divider 分割线组件
 * @description 高级分割线组件，支持水平/垂直方向、文本和图标内容、多种颜色与线型、渐变和动画效果。
 *
 * @param props - 分割线属性
 * @param ref - 引用转发对象，类型为 DividerRef
 * @returns 分割线 JSX 元素
 *
 * @example
 * ```tsx
 * <Divider orientation="horizontal" type="solid" />
 * <Divider position="left">左侧文字</Divider>
 * <Divider gradient={{ direction: 'to right', start: '#ff0000', end: '#00ff00' }} />
 * ```
 */
export const Divider = createComponent<DividerProps, DividerRef>({
  name: 'Divider',
  render: (props, ref) => {
    const {
      orientation = 'horizontal',
      type = 'solid',
      position = 'center',
      size = 'md',
      color = 'border',
      variant = 'default',
      children,
      inset = false,
      centered = false,
      className,
      style,
      width,
      height,
      margin,
      padding,
      opacity = 1,
      borderRadius = 0,
      gradient,
      animated = false,
      animationDuration = 300,
      shadow = false,
      clickable = false,
      onClick,
      accessible = true,
      accessibilityLabel,
      accessibilityRole = 'separator',
      spacing,
      align = 'center',
      verticalAlign = 'middle',
      icon,
      iconPosition = 'center',
      textStyle,
      textSpacing = 16,
      textBackground = '#ffffff',
      textPadding = '0 16px',
      textBorderRadius = 4,
      responsive = false,
      breakpoint = 'md',
      ...restProps
    } = props;

    const dividerRef = useRef<HTMLDivElement>(null);
    const [internalVariant, setInternalVariant] = useState(variant);
    const { theme } = useTheme();
    const animation = useMicroAnimation({ type: 'micro', enabled: clickable });
    const a11y = useAccessibility({
      role: clickable ? ARIA_ROLES.button : (accessibilityRole as unknown as ARIARole),
      focusable: clickable,
      label: accessibilityLabel,
    });

    // 更新内部变体状态
    useEffect(() => {
      if (children && icon) {
        setInternalVariant('with-icon');
      } else if (children) {
        setInternalVariant('text');
      } else if (icon) {
        setInternalVariant('with-icon');
      } else {
        setInternalVariant(variant);
      }
    }, [children, icon, variant]);

    // 处理点击事件
    const handleClick = useCallback<CommonEventFunction<Record<string, unknown>>>(
      (_event) => {
        if (!clickable) return;
        onClick?.();
      },
      [onClick, clickable],
    );

    // 渲染文本内容
    const renderText = () => {
      if (!children) return null;

      const textStyles: React.CSSProperties = {
        padding: `${typeof textPadding === 'number' ? `${textPadding}px` : textPadding}`,
        backgroundColor: textBackground,
        borderRadius: `${typeof textBorderRadius === 'number' ? `${textBorderRadius}px` : textBorderRadius}`,
        margin:
          orientation === 'horizontal'
            ? `0 ${typeof textSpacing === 'number' ? `${textSpacing}px` : textSpacing}`
            : `${typeof textSpacing === 'number' ? `${textSpacing}px` : textSpacing} 0`,
      };

      if (textStyle) {
        Object.assign(textStyles, textStyle);
      }

      return (
        <View className="orva-ui-divider__text" style={textStyles} data-testid="divider-text">
          {children}
        </View>
      );
    };

    // 渲染图标内容
    const renderIcon = () => {
      if (!icon) return null;

      const iconStyles = {
        margin:
          iconPosition === 'center'
            ? `0 ${typeof spacing === 'number' ? `${spacing}px` : spacing}`
            : iconPosition === 'left'
              ? `0 ${typeof spacing === 'number' ? `${spacing}px` : spacing} 0 0`
              : `0 0 0 ${typeof spacing === 'number' ? `${spacing}px` : spacing}`,
      };

      const iconContent = React.isValidElement(icon)
        ? React.cloneElement(icon, {
            ...(icon.props || {}),
            'data-testid': 'icon-content',
          } as React.Attributes & { 'data-testid': string })
        : icon;

      return (
        <View className="orva-ui-divider__icon" style={iconStyles} data-testid="icon-wrapper">
          {iconContent}
        </View>
      );
    };

    // Build styles manually
    const dividerStyle = {
      display: 'flex',
      width:
        width !== undefined
          ? `${typeof width === 'number' ? `${width}px` : width}`
          : orientation === 'horizontal'
            ? '100%'
            : '1px',
      height:
        height !== undefined
          ? `${typeof height === 'number' ? `${height}px` : height}`
          : orientation === 'vertical'
            ? '100%'
            : '1px',
      ...(orientation === 'horizontal'
        ? {
            ['borderBottom']: `1px ${type} ${typeof color === 'string' ? color : dividerStyles.COLOR_MAP[String(color)] || dividerStyles.COLOR_MAP['border'] || '#e5e7eb'}`,
          }
        : {
            ['borderRight']: `1px ${type} ${typeof color === 'string' ? color : dividerStyles.COLOR_MAP[String(color)] || dividerStyles.COLOR_MAP['border'] || '#e5e7eb'}`,
          }),
      margin:
        margin !== undefined
          ? `${typeof margin === 'number' ? `${margin}px` : margin}`
          : `${dividerStyles.SIZE_MAP[size].margin}px 0`,
      ...(padding !== undefined ? { padding: `${typeof padding === 'number' ? `${padding}px` : padding}` } : {}),
      ...(opacity !== undefined ? { opacity } : {}),
      ...(borderRadius !== undefined
        ? { borderRadius: `${typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius}` }
        : {}),
      ...(spacing !== undefined ? { gap: `${typeof spacing === 'number' ? `${spacing}px` : spacing}` } : {}),
      justifyContent:
        align !== undefined
          ? align === 'start'
            ? 'flex-start'
            : align === 'end'
              ? 'flex-end'
              : 'center'
          : position === 'left'
            ? 'flex-start'
            : position === 'right'
              ? 'flex-end'
              : 'center',
      alignItems:
        verticalAlign !== undefined
          ? verticalAlign === 'top'
            ? 'flex-start'
            : verticalAlign === 'bottom'
              ? 'flex-end'
              : 'center'
          : 'center',
      ...(gradient && typeof gradient === 'object'
        ? {
            backgroundImage: `linear-gradient(${gradient.direction || 'to right'}, ${gradient.start}, ${gradient.end})`,
            border: 'none',
          }
        : {}),
      ...(animated ? { transition: `all ${animationDuration}ms ease-in-out` } : {}),
      ...style,
    };

    const textDividerStyle = dividerStyles['getTextDividerStyle']({
      children,
      orientation,
      textSpacing: textSpacing ?? undefined,
      textBackground: textBackground ?? undefined,
      textPadding: textPadding !== undefined ? String(textPadding) : undefined,
      textBorderRadius: textBorderRadius !== undefined ? String(textBorderRadius) : undefined,
      textStyle: textStyle || {},
    });

    const iconDividerStyle = dividerStyles['getIconDividerStyle']({
      icon,
      iconPosition,
      iconSpacing: spacing ?? undefined,
    });

    const responsiveStyle = responsive
      ? dividerStyles['getResponsiveStyle']({
          breakpoint,
          orientation,
        })
      : {};

    const baseClassName = className || '';
    const dividerClassName =
      baseClassName +
      ' orva-ui-h5-divider' +
      ` orva-ui-h5-divider--${orientation}` +
      ` orva-ui-h5-divider--${type}` +
      ` orva-ui-h5-divider--${position}` +
      ` orva-ui-h5-divider--${size}` +
      ` orva-ui-h5-divider--${color}` +
      ` orva-ui-h5-divider--${variant}` +
      (inset ? ' orva-ui-h5-divider--inset' : '') +
      (centered ? ' orva-ui-h5-divider--centered' : '') +
      (animated ? ' orva-ui-h5-divider--animated' : '') +
      (shadow ? ' orva-ui-h5-divider--shadow' : '') +
      (clickable ? ' orva-ui-h5-divider--clickable' : '') +
      (responsive ? ' orva-ui-h5-divider--responsive' : '') +
      (internalVariant === 'with-icon' ? ' orva-ui-divider--with-icon orva-ui-h5-divider--with-icon' : '') +
      (internalVariant === 'text' ? ' orva-ui-divider--text orva-ui-h5-divider--text' : '');

    React.useImperativeHandle(
      ref,
      () => ({
        element: dividerRef.current,
        getOrientation: () => orientation,
        getType: () => type,
        getPosition: () => position,
        getSize: () => size,
        getVariant: () => variant,
        getColor: (() => {
          if (typeof color === 'string') {
            const colorMap = dividerStyles.COLOR_MAP;
            if (colorMap[color]) {
              return colorMap[color];
            }
            return color;
          }
          const colorMap = dividerStyles.COLOR_MAP;
          return colorMap[String(color)] || colorMap['border'] || '#e5e7eb';
        }) as () => string,
        setOrientation: (newOrientation: typeof orientation) => {
          if (dividerRef.current) {
            dividerRef.current.setAttribute('data-orientation', newOrientation);
          }
        },
        setType: (newType: typeof type) => {
          if (dividerRef.current) {
            dividerRef.current.setAttribute('data-type', newType);
          }
        },
        setPosition: (newPosition: typeof position) => {
          if (dividerRef.current) {
            dividerRef.current.setAttribute('data-position', newPosition);
          }
        },
        setSize: (newSize: typeof size) => {
          if (dividerRef.current) {
            const sizeStyles = dividerStyles.SIZE_MAP[newSize];
            dividerRef.current.style.width = orientation === 'horizontal' ? `${sizeStyles.width}%` : 'auto';
            dividerRef.current.style.height = orientation === 'vertical' ? `${sizeStyles.height}px` : 'auto';
          }
        },
        setColor: (newColor: string) => {
          if (dividerRef.current) {
            const element = dividerRef.current;
            element.style.borderColor = newColor;
            if (orientation === 'horizontal') {
              element.style.borderBottomColor = newColor;
            } else {
              element.style.borderRightColor = newColor;
            }
          }
        },
        focus: () => {
          if (dividerRef.current) {
            (dividerRef.current as unknown as { focus?: () => void }).focus?.();
          }
        },
        blur: () => {
          if (dividerRef.current) {
            (dividerRef.current as unknown as { blur?: () => void }).blur?.();
          }
        },
        scrollIntoView: (options?: ScrollIntoViewOptions) => {
          if (dividerRef.current) {
            const element = dividerRef.current as HTMLDivElement & { scrollIntoViewOptions?: ScrollIntoViewOptions; scrollIntoView?: (opts?: ScrollIntoViewOptions) => void };
            element.scrollIntoViewOptions = options;
            if (!element.scrollIntoView) {
              const mockFn = (_opts?: ScrollIntoViewOptions) => {};
              element.scrollIntoView = mockFn;
            }
            element.scrollIntoView(options);
          }
        },
      }),
      [orientation, type, position, size, color],
    );

    const renderDivider = () => {
      const mergedStyle = animation.getMergedStyle({ ...dividerStyle, ...responsiveStyle });

      if (internalVariant === 'text') {
        return (
          <View
            ref={dividerRef as unknown as React.RefObject<typeof View>}
            className={`${dividerClassName} orva-ui-divider--text`}
            style={{ ...mergedStyle, ...textDividerStyle }}
            onClick={handleClick}
            {...a11y.getAriaAttributes()}
            {...restProps}
          >
            {icon && renderIcon()}
            {renderText()}
          </View>
        );
      }

      if (internalVariant === 'with-icon') {
        return (
          <View
            ref={dividerRef as unknown as React.RefObject<typeof View>}
            className={`${dividerClassName} orva-ui-divider--with-icon`}
            style={{ ...mergedStyle, ...iconDividerStyle }}
            onClick={handleClick}
            {...a11y.getAriaAttributes()}
            {...restProps}
          >
            {renderIcon()}
          </View>
        );
      }

      return (
        <View
          ref={dividerRef as unknown as React.RefObject<typeof View>}
          className={dividerClassName}
          style={mergedStyle}
          onClick={handleClick}
          {...a11y.getAriaAttributes()}
          {...restProps}
        />
      );
    };

    return renderDivider();
  },
});

export default Divider;