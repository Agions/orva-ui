import { Children, isValidElement, cloneElement } from 'react';
import { View } from '@tarojs/components';
import { ListProps, ListItemProps, ListRef } from './List.types';
import { cn } from '@/utils/index';
import { ListStyles } from './List.styles';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * List 列表组件
 * @module components/display/List
 * @description 用于展示列表数据的组件，支持列表项、分割线、索引、缩略图、额外操作等功能。
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem title="标题" description="描述" />
 * </List>
 * ```
 */

export const List = createComponent<ListProps, ListRef>({
  name: 'List',
  render: (props, ref) => {
    const {
      children,
      dataSource,
      renderItem,
      header,
      footer,
      bordered = true,
      split = true,
      loading = false,
      size = 'default',
      className,
      style,
      ...rest
    } = props;
    const { theme } = useTheme();

    const renderItems = () => {
      if (dataSource && renderItem) {
        return dataSource.map((item, index) => (
          <ListItem key={item.key || index} index={index} size={size} split={split && index !== dataSource.length - 1}>
            {renderItem(item, index)}
          </ListItem>
        ));
      }

      return Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            index,
            size,
            split: split && index !== Children.count(children) - 1,
          } as Partial<ListItemProps>);
        }
        return child;
      });
    };

    const renderHeader = () => {
      if (!header) return null;
      return <View className={ListStyles['header']}>{header}</View>;
    };

    const renderFooter = () => {
      if (!footer) return null;
      return <View className={ListStyles['footer']}>{footer}</View>;
    };

    const listClasses = cn(ListStyles['base'], ListStyles['size'][size], bordered && ListStyles['bordered'], className);

    return (
      <View ref={ref} className={listClasses} style={style} {...rest}>
        {renderHeader()}
        <View className={ListStyles['content']}>
          {loading ? (
            <View className={ListStyles['loading']}>
              <View className={ListStyles['loadingItem']} />
              <View className={ListStyles['loadingItem']} />
              <View className={ListStyles['loadingItem']} />
            </View>
          ) : (
            renderItems()
          )}
        </View>
        {renderFooter()}
      </View>
    );
  },
});

export const ListItem = createComponent<ListItemProps>({
  name: 'ListItem',
  render: (props, ref) => {
    const {
      children,
      index,
      size = 'default',
      split = true,
      disabled = false,
      clickable = false,
      className,
      style,
      onPress,
      onLongPress,
      ...rest
    } = props;
    const { theme } = useTheme();
    const animation = useMicroAnimation({ type: 'micro', enabled: clickable as any && !disabled });
    const a11y = useAccessibility({
      role: ARIA_ROLES.button,
      focusable: clickable && !disabled,
    });

    const handlePress = (e: Event) => {
      if (!disabled && clickable && onPress) {
        onPress(e);
      }
    };

    const itemClasses = cn(
      ListStyles['item'],
      ListStyles['itemSize'][size],
      split && ListStyles['itemSplit'],
      disabled && ListStyles['itemDisabled'],
      clickable && ListStyles['itemClickable'],
      className,
    );

    const itemStyle = animation.getMergedStyle(style || {});

    return (
      <View ref={ref} className={itemClasses} style={itemStyle} onClick={handlePress} onLongPress={onLongPress} {...a11y.getAriaAttributes()} {...rest}>
        {children}
      </View>
    );
  },
});
