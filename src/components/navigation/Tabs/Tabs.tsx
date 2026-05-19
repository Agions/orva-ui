import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { tabsStyles } from './Tabs.styles';
import type { TabsProps, TabsRef, TabPosition, TabType, TabSize, TabItem } from './Tabs.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * Tabs 标签页组件
 * @module components/navigation/Tabs
 * @description 用于切换内容面板的组件，支持多种类型（line/card）、位置控制、禁用状态和自定义渲染。
 *
 * @example
 * ```tsx
 * <Tabs items={[{ key: '1', label: 'Tab 1' }, { key: '2', label: 'Tab 2' }]} activeKey="1" />
 * <Tabs type="card" position="left" />
 * ```
 */

/** Tabs 组件 */
export const Tabs = createComponent<TabsProps, TabsRef>({
  name: 'Tabs',
  render: (props, ref) => {
    const {
      items,
      activeKey: controlledActiveKey,
      defaultActiveKey,
      position = 'top',
      type = 'line',
      size = 'default',
      editable = false,
      addable = false,
      animated = true,
      centered = false,
      forceRender = false,
      destroyInactiveTabPane = false,
      onTabClick,
      onChange,
      onAdd,
      onRemove,
      onEdit,
      renderTabBar,
      renderTab,
      renderContent,
      className,
      style,
      ...restProps
    } = props;

    const tabsRef = useRef<any>(null);
    const [internalItems, setInternalItems] = useState<TabItem[]>(items || []);
    const [activeKey, setActiveKey] = useState<string>(defaultActiveKey || items?.[0]?.key || '');
    const [internalPosition, setInternalPosition] = useState<TabPosition>(position);
    const [internalType, setInternalType] = useState<TabType>(type);
    const [internalSize, setInternalSize] = useState<TabSize>(size);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.tabs,
      label: 'Tabs',
    });

    useEffect(() => {
      if (controlledActiveKey !== undefined) setActiveKey(controlledActiveKey);
    }, [controlledActiveKey]);

    useEffect(() => { setInternalItems(items || []); }, [items]);
    useEffect(() => { setInternalPosition(position); }, [position]);
    useEffect(() => { setInternalType(type); }, [type]);
    useEffect(() => { setInternalSize(size); }, [size]);

    const handleTabClick = useCallback(
      (key: string, event: React.MouseEvent) => {
        if (controlledActiveKey === undefined) setActiveKey(key);
        onTabClick?.(key, event);
        onChange?.(key);
      },
      [controlledActiveKey, onTabClick, onChange],
    );

    const handleAdd = useCallback(() => {
      onAdd?.();
      onEdit?.('', 'add');
    }, [onAdd, onEdit]);

    const handleRemove = useCallback(
      (key: string, event: React.MouseEvent) => {
        event.stopPropagation();
        onRemove?.(key);
        onEdit?.(key, 'remove');
      },
      [onRemove, onEdit],
    );

    const renderTabBarInternal = useCallback(() => {
      if (renderTabBar) return renderTabBar(props);

      return (
        <View className="orva-ui-tabs__tab-bar" style={tabsStyles['getTabBarStyle'](internalPosition, internalType)}>
          {internalItems.map((item, index) => {
            const isActive = activeKey === item.key;
            const isDisabled = item.disabled;

            return (
              <View
                key={item.key}
                className={`orva-ui-tabs__tab-item ${isActive ? 'orva-ui-tabs__tab-item--active' : ''} ${isDisabled ? 'orva-ui-tabs__tab-item--disabled' : ''}`}
                style={tabsStyles['getTabItemStyle']({ active: isActive, disabled: isDisabled || false, type: internalType, size: internalSize, position: internalPosition })}
                onClick={(e) => !isDisabled && handleTabClick(item.key, e)}
              >
                {renderTab ? renderTab(item, index) : (
                  <>
                    {item.icon && <View className="orva-ui-tabs__tab-icon">{item.icon}</View>}
                    <Text className="orva-ui-tabs__tab-title">{item.title}</Text>
                    {item.badge && (
                      <View className="orva-ui-tabs__tab-badge" style={tabsStyles['getBadgeStyle']()}>
                        {item.badge}
                      </View>
                    )}
                    {editable && internalItems.length > 1 && (
                      <View
                        className="orva-ui-tabs__tab-remove"
                        style={tabsStyles['getRemoveButtonStyle']()}
                        onClick={(e) => handleRemove(item.key, e)}
                      >
                        ×
                      </View>
                    )}
                  </>
                )}
              </View>
            );
          })}
          {addable && (
            <View
              className="orva-ui-tabs__tab-add"
              style={tabsStyles['getAddButtonStyle'](internalSize)}
              onClick={handleAdd}
            >
              +
            </View>
          )}
        </View>
      );
    }, [renderTabBar, props, internalPosition, internalType, internalItems, activeKey, internalSize, renderTab, editable, addable, handleTabClick, handleRemove, handleAdd]);

    const renderContentInternal = useCallback(() => {
      return (
        <View className="orva-ui-tabs__content" style={tabsStyles['getContentStyle'](internalPosition, animated)}>
          {internalItems.map((item, index) => {
            const isActive = activeKey === item.key;

            if (destroyInactiveTabPane && !isActive && !forceRender) return null;

            return (
              <View
                key={item.key}
                className={`orva-ui-tabs__tab-pane ${isActive ? 'orva-ui-tabs__tab-pane--active' : ''}`}
                style={tabsStyles['getTabContentStyle'](isActive, animated)}
              >
                {renderContent ? renderContent(item, index) : item.content}
              </View>
            );
          })}
        </View>
      );
    }, [internalPosition, animated, internalItems, activeKey, destroyInactiveTabPane, forceRender, renderContent]);

    const tabsStyle = tabsStyles['getBaseStyle']({ position: internalPosition, type: internalType, size: internalSize, centered, style: style || {} } as any);
    const tabsClassName = tabsStyles['getClassName']({ position: internalPosition, type: internalType, size: internalSize, centered, className: className || '' } as any);

    React.useImperativeHandle(
      ref,
      () => ({
        element: tabsRef.current,
        getActiveKey: () => activeKey,
        getItems: () => internalItems,
        setActiveKey: (key: string) => {
          if (controlledActiveKey === undefined) setActiveKey(key);
        },
        addItem: (item: TabItem, index?: number) => {
          const newItems = [...internalItems];
          if (index !== undefined) newItems.splice(index, 0, item);
          else newItems.push(item);
          setInternalItems(newItems);
        },
        removeItem: (key: string) => {
          const newItems = internalItems.filter((item) => item.key !== key);
          setInternalItems(newItems);
          if (activeKey === key && newItems.length > 0) setActiveKey(newItems[0]?.key || '');
        },
        updateItem: (key: string, newItem: Partial<TabItem>) => {
          const newItems = internalItems.map((item) => (item.key === key ? { ...item, ...newItem } : item));
          setInternalItems(newItems);
        },
        scrollToTab: (_key: string) => { /* scroll logic */ },
      }),
      [activeKey, internalItems, controlledActiveKey],
    );

    const mergedStyle = animation.getMergedStyle(tabsStyle);

    return (
      <View ref={tabsRef} className={tabsClassName} style={mergedStyle} {...a11y.getAriaAttributes()} {...restProps}>
        {renderTabBarInternal()}
        {renderContentInternal()}
      </View>
    );
  },
});

export default Tabs;