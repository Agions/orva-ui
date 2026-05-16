/**
 * Taro-Uno Menu Component
 * 导航菜单组件，支持多种模式、主题和交互功能
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { menuStyles } from './Menu.styles';
import { MenuUtils } from './Menu.utils';
import MenuItemComponent from './MenuItem';
import { SubMenuComponent } from './SubMenu';
import type { MenuProps, MenuRef, MenuItem } from './Menu.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** Menu 导航菜单组件 */
export const Menu = createComponent<MenuProps, MenuRef>({
  name: 'Menu',
  render: (props, ref) => {
    const {
      items = [],
      selectedKeys: controlledSelectedKeys,
      defaultSelectedKeys = [],
      openKeys: controlledOpenKeys,
      defaultOpenKeys = [],
      mode = 'vertical',
      theme = 'light',
      size = 'medium',
      trigger = 'click',
      accordion = false,
      inlineIndent = 24,
      collapsible = false,
      collapsed: controlledCollapsed = false,
      _collapsedIcon,
      expandIcon,
      contextMenu = false,
      onClick,
      onSelect,
      onOpenChange,
      onCollapse,
      onContextMenu,
      itemRender,
      subMenuTitleRender,
      className,
      style,
      accessible = true,
      accessibilityLabel,
      accessibilityRole = 'navigation',
      accessibilityState,
      ...restProps
    } = props;

    const menuRef = useRef<any>(null);
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
    const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(defaultOpenKeys);
    const [internalCollapsed, setInternalCollapsed] = useState(controlledCollapsed);

    const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : internalSelectedKeys;
    const openKeys = controlledOpenKeys !== undefined ? controlledOpenKeys : internalOpenKeys;
    const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.navigation,
      label: accessibilityLabel,
      attributes: {
        'aria-expanded': String(!collapsed),
        ...accessibilityState,
      },
    });

    useEffect(() => {
      if (controlledSelectedKeys !== undefined) setInternalSelectedKeys(controlledSelectedKeys);
    }, [controlledSelectedKeys]);

    useEffect(() => {
      if (controlledOpenKeys !== undefined) setInternalOpenKeys(controlledOpenKeys);
    }, [controlledOpenKeys]);

    useEffect(() => {
      if (controlledCollapsed !== undefined) setInternalCollapsed(controlledCollapsed);
    }, [controlledCollapsed]);

    const handleItemClick = useCallback(
      (key: string, event: ITouchEvent) => {
        const item = MenuUtils.findItem(items, key);
        if (!item) return;

        onClick?.(key, item, event);

        if (item.href) {
          MenuUtils.handleExternalLink(item);
          return;
        }

        const newSelectedKeys = [key];
        if (controlledSelectedKeys === undefined) setInternalSelectedKeys(newSelectedKeys);
        onSelect?.(newSelectedKeys, item);
      },
      [items, onClick, onSelect, controlledSelectedKeys],
    );

    const handleSubMenuToggle = useCallback(
      (key: string) => {
        if (accordion) {
          const parentItem = MenuUtils.findParentItem(items, key);
          if (parentItem) {
            const siblings = parentItem.children?.filter((child) => child.key !== key && child.children) || [];
            const siblingKeys = siblings.map((sibling) => sibling.key);
            const newOpenKeys = openKeys.filter((k) => !siblingKeys.includes(k));

            if (openKeys.includes(key)) {
              const finalOpenKeys = newOpenKeys.filter((k) => k !== key);
              if (controlledOpenKeys === undefined) setInternalOpenKeys(finalOpenKeys);
              onOpenChange?.(finalOpenKeys);
            } else {
              const finalOpenKeys = [...newOpenKeys, key];
              if (controlledOpenKeys === undefined) setInternalOpenKeys(finalOpenKeys);
              onOpenChange?.(finalOpenKeys);
            }
          }
        } else {
          if (openKeys.includes(key)) {
            const newOpenKeys = openKeys.filter((k) => k !== key);
            if (controlledOpenKeys === undefined) setInternalOpenKeys(newOpenKeys);
            onOpenChange?.(newOpenKeys);
          } else {
            const newOpenKeys = [...openKeys, key];
            if (controlledOpenKeys === undefined) setInternalOpenKeys(newOpenKeys);
            onOpenChange?.(newOpenKeys);
          }
        }
      },
      [items, openKeys, accordion, controlledOpenKeys, onOpenChange],
    );

    const handleCollapse = useCallback(() => {
      const newCollapsed = !collapsed;
      if (controlledCollapsed === undefined) setInternalCollapsed(newCollapsed);
      onCollapse?.(newCollapsed);
    }, [collapsed, controlledCollapsed, onCollapse]);

    const handleContextMenu = useCallback(
      (event: ITouchEvent) => {
        if (!contextMenu) return;
        onContextMenu?.('', undefined as any, event);
      },
      [contextMenu, onContextMenu],
    );

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
      const isSelected = selectedKeys.includes(item.key);
      const isOpen = openKeys.includes(item.key);

      if (item.children && item.children.length > 0) {
        return (
          <SubMenuComponent
            key={item.key}
            item={item}
            level={level}
            mode={mode}
            theme={theme}
            size={size}
            open={isOpen}
            trigger={trigger}
            collapsed={collapsed}
            inlineIndent={inlineIndent}
            onToggle={handleSubMenuToggle}
            onItemClick={handleItemClick}
            expandIcon={expandIcon}
            subMenuTitleRender={subMenuTitleRender}
            itemRender={itemRender}
          />
        );
      }

      return (
        <MenuItemComponent
          key={item.key}
          item={item}
          level={level}
          mode={mode}
          theme={theme}
          size={size}
          selected={isSelected}
          trigger={trigger}
          collapsed={collapsed}
          inlineIndent={inlineIndent}
          onItemClick={handleItemClick}
          itemRender={itemRender}
        />
      );
    };

    React.useImperativeHandle(
      ref,
      () => ({
        element: menuRef.current,
        getSelectedKeys: () => selectedKeys,
        setSelectedKeys: (keys: string[]) => {
          if (controlledSelectedKeys === undefined) setInternalSelectedKeys(keys);
          onSelect?.(keys, MenuUtils.findItem(items, keys[0] || ''));
        },
        getOpenKeys: () => openKeys,
        setOpenKeys: (keys: string[]) => {
          if (controlledOpenKeys === undefined) setInternalOpenKeys(keys);
          onOpenChange?.(keys);
        },
        setCollapsed: (newCollapsed: boolean) => {
          if (controlledCollapsed === undefined) setInternalCollapsed(newCollapsed);
          onCollapse?.(newCollapsed);
        },
        getItem: (key: string) => MenuUtils.findItem(items, key),
        addItem: (_item: MenuItem, _parentKey?: string) => { /* static method */ },
        removeItem: (_key: string) => { /* static method */ },
        updateItem: (_key: string, _newItem: Partial<MenuItem>) => { /* static method */ },
        expandAll: () => {
          const allKeys = MenuUtils.flattenItems(items)
            .filter((item) => item.children && item.children.length > 0)
            .map((item) => item.key);
          if (controlledOpenKeys === undefined) setInternalOpenKeys(allKeys);
          onOpenChange?.(allKeys);
        },
        collapseAll: () => {
          if (controlledOpenKeys === undefined) setInternalOpenKeys([]);
          onOpenChange?.([]);
        },
        focus: () => { /* Taro environment */ },
        blur: () => { /* Taro environment */ },
      }),
      [selectedKeys, openKeys, collapsed, items, controlledSelectedKeys, controlledOpenKeys, controlledCollapsed, onSelect, onOpenChange, onCollapse],
    );

    const classNames = [
      'orva-ui-h5-menu',
      `orva-ui-h5-menu--${mode}`,
      `orva-ui-h5-menu--${theme}`,
      `orva-ui-h5-menu--${size}`,
      collapsed ? 'orva-ui-h5-menu--collapsed' : '',
      className,
    ].filter(Boolean).join(' ');

    const containerStyle = menuStyles.getContainerStyle({ mode, theme, size, collapsed, style });

    return (
      <View
        ref={menuRef}
        style={containerStyle}
        className={classNames}
        accessible={accessible}
        aria-label={accessibilityLabel}
        aria-role={accessibilityRole}
        aria-state={accessibilityState ? JSON.stringify(accessibilityState) : undefined}
        onLongPress={contextMenu ? handleContextMenu : undefined}
        {...a11y.getAriaAttributes()}
        {...restProps}
      >
        {collapsible && (
          <View
            style={menuStyles.getCollapseButtonStyle({ size, theme, collapsed })}
            onClick={handleCollapse}
            data-testid="collapse-button"
          >
            <Text>{collapsed ? '»' : '«'}</Text>
          </View>
        )}
        {items.map((item) => renderMenuItem(item))}
      </View>
    );
  },
});

export default Menu;