/**
 * Tag 标签组件
 * @module components/display/Tag
 * @description 用于标记和分类的标签组件，支持多种颜色、尺寸、变体。可关闭、可选中。
 *
 * @example
 * ```tsx
 * <Tag>默认标签</Tag>
 * <Tag color="primary" size="small">小标签</Tag>
 * <Tag closable onClose={() => {}}>可关闭</Tag>
 * <Tag checkable checked>选中状态</Tag>
 * ```
 */

import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { tagStyles } from './Tag.styles';
import type { TagProps, TagRef } from './Tag.types';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** 标签组件 */
export const Tag = createComponent<TagProps, TagRef>({
  name: 'Tag',
  render: (props, ref) => {
    const {
      children,
      color = 'default',
      size = 'medium',
      variant = 'solid',
      closable = false,
      checkable = false,
      checked = false,
      icon,
      onClick,
      onClose,
      onCheckedChange,
      style,
      className,
      ...rest
    } = props;

    const [checkedState, setCheckedState] = useState(checked);
    const [visible, setVisible] = useState(true);
    const { theme } = useTheme();
    const animation = useMicroAnimation({ type: 'micro', enabled: !!onClick || checkable });
    const a11y = useAccessibility({
      role: checkable ? ARIA_ROLES.checkbox : ARIA_ROLES.button,
      focusable: true,
      label: typeof children === 'string' ? children : undefined,
    });

    const handleClick = (event: any) => {
      event.stopPropagation();

      if (checkable) {
        const newChecked = !checkedState;
        setCheckedState(newChecked);
        onCheckedChange?.(newChecked);
      }

      onClick?.(event);
    };

    const handleClose = (event: any) => {
      event.stopPropagation();
      setVisible(false);
      onClose?.(event);
    };

    const getTagStyle = () => {
      const colorKey = `${color}${variant.charAt(0).toUpperCase() + variant.slice(1)}`;

      const baseStyle = {
        ...tagStyles['base'],
        ...tagStyles[size],
        ...(tagStyles[colorKey as keyof typeof tagStyles] || tagStyles['defaultSolid']),
        ...style,
      };

      if (onClick || checkable) {
        Object.assign(baseStyle, tagStyles['clickable']);
      }

      if (checkable) {
        Object.assign(baseStyle, tagStyles['checkable']);
        if (checkedState) {
          Object.assign(baseStyle, tagStyles['checked']);
        }
      }

      // 处理自定义颜色
      if (!['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(color)) {
        if (variant === 'solid') {
          baseStyle.backgroundColor = color;
          baseStyle.borderColor = color;
          baseStyle.color = '#ffffff';
        } else if (variant === 'outline') {
          baseStyle.backgroundColor = 'transparent';
          baseStyle.borderColor = color;
          baseStyle.color = color;
        } else if (variant === 'light') {
          baseStyle.backgroundColor = `${color}20`;
          baseStyle.borderColor = 'transparent';
          baseStyle.color = color;
        }
      }

      return baseStyle;
    };

    const getCloseIconStyle = () => {
      const baseStyle = {
        ...tagStyles['closeIcon'],
      };

      return baseStyle;
    };

    if (!visible) {
      return null;
    }

    const mergedStyle = animation.getMergedStyle(getTagStyle());

    return (
      <View ref={ref} style={mergedStyle} className={className} onClick={handleClick} {...a11y.getAriaAttributes()} {...rest}>
        <View style={tagStyles['content']}>
          {icon && <View style={tagStyles['icon']}>{icon}</View>}
          {children && <Text style={tagStyles['text']}>{children}</Text>}
          {closable && (
            <Text style={getCloseIconStyle()} onClick={handleClose}>
              ×
            </Text>
          )}
        </View>
      </View>
    );
  },
});

export default Tag;