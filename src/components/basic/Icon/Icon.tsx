import React, { useRef } from 'react';
import { View as TaroView, Text as TaroText, Image as TaroImage } from '@tarojs/components';
import type { IconProps, IconRef, IconSource } from './Icon.types';
import { IconUtils } from './IconManager';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** 图标组件 */
export const Icon = createComponent<IconProps, IconRef>({
  name: 'Icon',
  render: (props, ref) => {
    const { size = 'md', color = 'currentColor', className, style, onClick, 'data-testid': dataTestId } = props;

    const iconRef = useRef<SVGElement | HTMLImageElement | HTMLSpanElement>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: !!onClick });
    const a11y = useAccessibility({
      role: ARIA_ROLES.img,
      focusable: !!onClick,
      label: typeof props['aria-label'] === 'string' ? props['aria-label'] : undefined,
    });

    const resolveIconSource = (props: IconProps): IconSource => {
      const { source, theme = 'outlined', prefix = '', suffix = '' } = props;
      if (typeof source !== 'string') return source;
      if (source.startsWith('http') || source.startsWith('data:image') || source.includes('<svg')) return source;
      const iconName = `${prefix}${source}${suffix}`;
      const resolvedSource = IconUtils.getIcon(iconName, theme);
      if (resolvedSource) return resolvedSource;
      return source;
    };

    const getIconType = (source: IconSource): 'image' | 'svg' | 'font' | 'custom' => {
      if (typeof source === 'string') {
        if (source.startsWith('http') || source.startsWith('data:image')) return 'image';
        if (source.includes('<svg') || source.endsWith('.svg')) return 'svg';
        return 'font';
      }
      if (React.isValidElement(source)) return 'custom';
      return 'font';
    };

    const getSizeValue = (size: string | number): number => {
      if (typeof size === 'number') return size;
      const sizeMap: Record<string, number> = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32, xxl: 48 };
      return sizeMap[size] || 20;
    };

    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: getSizeValue(size),
      height: getSizeValue(size),
      color,
      ...style,
    };

    const renderIcon = (): React.ReactNode => {
      const resolvedSource = resolveIconSource(props);
      const iconType = getIconType(resolvedSource);

      switch (iconType) {
        case 'svg':
          if (typeof resolvedSource === 'string') {
            return (
              <TaroView
                ref={iconRef as React.RefObject<HTMLElement>}
                style={baseStyle}
                dangerouslySetInnerHTML={{ __html: resolvedSource }}
                data-testid={dataTestId}
              />
            );
          }
          return null;

        case 'image':
          return (
            <TaroImage
              ref={iconRef as React.RefObject<HTMLImageElement>}
              style={baseStyle}
              src={resolvedSource as string}
              mode="aspectFit"
              data-testid={dataTestId}
            />
          );

        case 'font':
          return (
            <TaroText
              ref={iconRef as React.RefObject<HTMLSpanElement>}
              style={baseStyle}
              className={`${className || ''} ${resolvedSource}`.trim()}
              data-testid={dataTestId}
            />
          );

        case 'custom':
          return (
            <TaroView
              ref={iconRef as React.RefObject<HTMLElement>}
              style={baseStyle}
              className={className}
              data-testid={dataTestId}
            >
              {React.isValidElement(resolvedSource) ? resolvedSource : null}
            </TaroView>
          );

        default:
          return (
            <TaroText
              ref={iconRef as React.RefObject<HTMLSpanElement>}
              style={baseStyle}
              className={`${className || ''} ${resolvedSource}`.trim()}
              data-testid={dataTestId}
            />
          );
      }
    };

    React.useImperativeHandle(
      ref,
      () => ({
        element: iconRef.current,
        click: () => {
          if (iconRef.current) {
            const event = new MouseEvent('click', { bubbles: true });
            iconRef.current.dispatchEvent(event);
          }
        },
        setDisabled: () => {},
        setLoading: () => {},
        getStatus: () => 'normal',
        getSize: () => size,
        getColor: () => color,
        rotate: () => {},
        setColor: () => {},
        setSize: () => {},
      }),
      [size, color],
    );

    const mergedStyle = animation.getMergedStyle({ display: 'inline-flex' });

    return (
      <TaroView style={mergedStyle} onClick={onClick} {...a11y.getAriaAttributes()}>
        {renderIcon()}
      </TaroView>
    );
  },
});

export default Icon;