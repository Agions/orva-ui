/**
 * Avatar 头像组件
 * @module components/display/Avatar
 * @description 显示用户头像或首字母，支持图片、图标和文本三种内容模式。
 * 支持多种尺寸和形状，并具有微交动动画和无障碍支持。
 *
 * @example
 * ```tsx
 * <Avatar src="https://example.com/avatar.jpg" alt="User" size="large" />
 * <Avatar icon={<UserIcon />} shape="square" />
 * <Avatar>JD</Avatar>
 * ```
 */

import { View, Image, Text } from '@tarojs/components';
import { createNamespace } from '@/utils/createComponent';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import type { AvatarProps, AvatarRef } from './Avatar.types';
import { avatarStyles } from './Avatar.styles';
import { createLogger } from '../../../utils/logger';

const logger = createLogger('Avatar');

const { bem } = createNamespace('avatar');

/**
 * Avatar 头像组件
 * @description 基于 createComponent 构建的头像组件，支持图片加载失败回退、可访问性属性和交互动画。
 *
 * @param props - 头像属性
 * @param ref - 引用转发对象
 * @returns 头像 JSX 元素
 */
export const Avatar = createComponent<AvatarProps, AvatarRef>({
  name: 'Avatar',
  render: (props, ref) => {
    const { src, alt, size = 'medium', shape = 'circle', icon, children, style, className, onClick, ...rest } = props;
    const { theme } = useTheme();
    const hasInteraction = !!onClick;
    const animation = useMicroAnimation({ type: 'micro', enabled: hasInteraction });
    const a11y = useAccessibility({
      role: ARIA_ROLES.button,
      label: alt || 'Avatar',
      focusable: hasInteraction,
    });

    const handleClick = (event: any) => {
      onClick?.(event);
    };

    const getAvatarContent = () => {
      if (src) {
        return (
          <Image
            src={src}
            className={bem('image')}
            mode="aspectFill"
            onError={(e) => {
              logger.error('Avatar image load error:', e);
            }}
          />
        );
      }

      if (icon) {
        return <View className={bem('icon')}>{icon}</View>;
      }

      if (children) {
        return <Text className={bem('text')}>{children}</Text>;
      }

      return (
        <Text className={bem('text')}>
          {String(alt || 'U')
            .charAt(0)
            .toUpperCase()}
        </Text>
      );
    };

    const baseStyle = {
      ...avatarStyles.base,
      backgroundColor: theme.colors.surface,
      color: theme.colors.textSecondary,
      ...avatarStyles[size],
      ...avatarStyles[shape],
      ...style,
    };

    const mergedStyle = animation.getMergedStyle(baseStyle);

    return (
      <View
        ref={ref}
        className={`${bem()} ${bem('size-' + size)} ${bem('shape-' + shape)} ${className || ''}`.trim()}
        style={mergedStyle}
        onClick={handleClick}
        {...a11y.getAriaAttributes()}
        {...rest}
      >
        {getAvatarContent()}
      </View>
    );
  },
});

export default Avatar;
