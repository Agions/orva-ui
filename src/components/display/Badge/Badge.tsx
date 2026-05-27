/**
 * Badge 徽章组件
 * @module components/display/Badge
 * @description 用于显示计数、状态或标记的徽章组件。支持数字计数、圆点模式和溢出显示。
 *
 * @example
 * ```tsx
 * <Badge count={5}><Icon /></Badge>
 * <Badge dot><NotificationIcon /></Badge>
 * <Badge count={120} overflowCount={99}><MessageIcon /></Badge>
 * ```
 */

import { View, Text } from '@tarojs/components';
import { createNamespace, createComponent } from '@/utils/createComponent';
import {
  getBadgeIndicatorClassName,
  getBadgeCountClassName,
} from './Badge.styles';
import type { BadgeProps, BadgeRef } from './Badge.types';

const { bem } = createNamespace('badge');

/**
 * Badge 徽章组件
 * @description 基于 createComponent 构建的徽章组件，支持计数溢出、圆点模式和零值显示。
 *
 * @param props - 徽章属性
 * @param ref - 引用转发对象
 * @returns 徽章 JSX 元素
 */
export const Badge = createComponent<BadgeProps, BadgeRef>({
  name: 'Badge',
  render: (props, ref) => {
    const {
      count,
      dot = false,
      overflowCount = 99,
      showZero = false,
      type = 'default',
      size = 'md',
      children,
      style,
      className,
      ...rest
    } = props;

    const displayCount = count !== undefined && count > overflowCount ? `${overflowCount}+` : count;

    const shouldShowBadge = dot || (count !== undefined && (count > 0 || showZero));

    const indicatorClassName = getBadgeIndicatorClassName({
      type,
      size,
      dot,
    });

    const countClassName = getBadgeCountClassName({ size });

    return (
      <View ref={ref} className={`${bem('wrapper')} ${className || ''}`.trim()} style={style} {...rest}>
        {children}
        {shouldShowBadge && (
          <View className={indicatorClassName}>
            {dot ? null : <Text className={countClassName}>{displayCount}</Text>}
          </View>
        )}
      </View>
    );
  },
});

export default Badge;
