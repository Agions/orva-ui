import type { BaseProps } from '@/types/component';
import type { ReactNode } from 'react';
import type { ITouchEvent } from '@tarojs/components';

/** Menu 无障碍属性 */
export interface MenuAccessibilityProps {
	/** 无障碍支持 */
  accessible?: boolean;
	/** 无障碍标签 */
  accessibilityLabel?: string;
	/** 无障碍角色 */
  accessibilityRole?: 'navigation' | 'menu' | 'menubar';
	/** 无障碍状态 */
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    expanded?: boolean;
    busy?: boolean;
    checked?: boolean;
  };
}

/** 菜单引用接口 */
export interface MenuRef {
	/** 获取当前选中的菜单项 */
  getSelectedKeys: () => string[];
	/** 设置选中的菜单项 */
  setSelectedKeys: (_keys: string[]) => void;
	/** 获取展开的子菜单 */
  getOpenKeys: () => string[];
	/** 设置展开的子菜单 */
  setOpenKeys: (_keys: string[]) => void;
	/** 折叠/展开菜单 */
  setCollapsed: (_collapsed: boolean) => void;
	/** 获取菜单项数据 */
  getItem: (_key: string) => MenuItem | null;
	/** 添加菜单项 */
  addItem: (_item: MenuItem, parentKey?: string) => void;
	/** 删除菜单项 */
  removeItem: (_key: string) => void;
	/** 更新菜单项 */
  updateItem: (_key: string, newItem: Partial<MenuItem>) => void;
	/** 展开所有 */
  expandAll: () => void;
	/** 折叠所有 */
  collapseAll: () => void;
	/** 获取菜单元素 */
  element: any;
	/** 聚焦菜单 */
  focus: () => void;
	/** 失焦菜单 */
  blur: () => void;
}

/** 菜单配置接口 */
export interface MenuConfig {
	/** 默认菜单模式 */
  defaultMode?: MenuMode;
	/** 默认菜单主题 */
  defaultTheme?: MenuTheme;
	/** 默认菜单尺寸 */
  defaultSize?: MenuSize;
	/** 默认触发方式 */
  defaultTrigger?: MenuTrigger;
	/** 默认内联缩进 */
  defaultInlineIndent?: number;
	/** 是否默认可折叠 */
  defaultCollapsible?: boolean;
	/** 是否默认手风琴模式 */
  defaultAccordion?: boolean;
	/** 动画持续时间 */
  animationDuration?: number;
	/** 响应式断点 */
  responsiveBreakpoint?: number;
	/** 最大展开深度 */
  maxExpandDepth?: number;
}

/** 默认菜单配置 */
export const DEFAULT_MENU_CONFIG: MenuConfig = {
  defaultMode: 'vertical',
  defaultTheme: 'light',
  defaultSize: 'medium',
  defaultTrigger: 'click',
  defaultInlineIndent: 24,
  defaultCollapsible: false,
  defaultAccordion: false,
  animationDuration: 300,
  responsiveBreakpoint: 768,
  maxExpandDepth: 3,
};

/** 菜单模式 */
export type MenuMode = 'vertical' | 'horizontal' | 'inline';

/** 菜单主题 */
export type MenuTheme = 'light' | 'dark';

/** 菜单尺寸 */
export type MenuSize = 'small' | 'medium' | 'large';

/** 菜单触发方式 */
export type MenuTrigger = 'click' | 'hover';

/** 菜单项数据 */
export interface MenuItem {
  /** 唯一标识 */
  key: string;
  /** 显示标签 */
  label: ReactNode;
  /** 图标 */
  icon?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否选中 */
  selected?: boolean;
  /** 子菜单项 */
  children?: MenuItem[];
  /** 点击回调 */
  onClick?: (item: MenuItem) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 链接地址 */
  href?: string;
  /** 是否分隔线 */
  divider?: boolean;
  /** 分组标题 */
  groupTitle?: string;
  /** 徽章内容 */
  badge?: ReactNode;
  /** 额外信息 */
  extra?: ReactNode;
  /** 是否为危险操作 */
  danger?: boolean;
  /** 是否为分组 */
  isGroup?: boolean;
  /** 链接打开方式 */
  target?: string;
}

/** 菜单属性 */
export interface MenuProps extends BaseProps, MenuAccessibilityProps {
  /** 菜单模式 */
  mode?: MenuMode;
  /** 菜单主题 */
  theme?: MenuTheme;
  /** 菜单尺寸 */
  size?: MenuSize;
  /** 触发方式 */
  trigger?: MenuTrigger;
  /** 默认选中项 */
  defaultSelectedKeys?: string[];
  /** 选中项（受控） */
  selectedKeys?: string[];
  /** 默认展开项 */
  defaultOpenKeys?: string[];
  /** 展开项（受控） */
  openKeys?: string[];
  /** 菜单项数据 */
  items?: MenuItem[];
  /** 选中回调 */
  onSelect?: (keys: string[], item: MenuItem | null) => void;
  /** 展开回调 */
  onOpenChange?: (keys: string[]) => void;
  /** 点击回调 */
  onClick?: (key: string, item: MenuItem, event: ITouchEvent) => void;
  /** 是否可折叠 */
  collapsible?: boolean;
  /** 折叠状态（受控） */
  collapsed?: boolean;
  /** 折叠图标 */
  _collapsedIcon?: ReactNode;
  /** 展开图标 */
  expandIcon?: ReactNode;
  /** 是否右键菜单 */
  contextMenu?: boolean;
  /** 是否手风琴模式 */
  accordion?: boolean;
  /** 默认展开深度 */
  defaultExpandDepth?: number;
  /** 内联缩进 */
  inlineIndent?: number;
  /** 子菜单展开动画 */
  expandAnimation?: boolean;
  /** 折叠回调 */
  onCollapse?: (collapsed: boolean) => void;
  /** 右键菜单回调 */
  onContextMenu?: (key: string, item: MenuItem | null, event: ITouchEvent) => void;
  /** 自定义菜单项渲染 */
  itemRender?: (item: MenuItem) => ReactNode;
  /** 自定义子菜单标题渲染 */
  subMenuTitleRender?: (item: MenuItem) => ReactNode;
  /** 自定义渲染 */
  renderMenuItem?: (item: MenuItem) => ReactNode;
}

/** 菜单项样式类型 */
export interface MenuItemStyles {
	/** 容器样式 */
  container: React.CSSProperties;
	/** 菜单项样式 */
  item: React.CSSProperties;
	/** 选中样式 */
  selected: React.CSSProperties;
	/** 禁用样式 */
  disabled: React.CSSProperties;
	/** 悬停样式 */
  hover: React.CSSProperties;
	/** 危险样式 */
  danger: React.CSSProperties;
	/** 子菜单样式 */
  subMenu: React.CSSProperties;
	/** 分组标题样式 */
  groupTitle: React.CSSProperties;
	/** 图标样式 */
  icon: React.CSSProperties;
	/** 标签样式 */
  label: React.CSSProperties;
	/** 额外信息样式 */
  extra: React.CSSProperties;
	/** 徽章样式 */
  badge: React.CSSProperties;
	/** 折叠按钮样式 */
  collapseButton: React.CSSProperties;
	/** 响应式样式 */
  responsive: React.CSSProperties;
}

/** 菜单尺寸样式映射 */
export type MenuSizeStyles = Record<MenuSize, Partial<MenuItemStyles>>;

/** 菜单主题样式映射 */
export type MenuThemeStyles = Record<MenuTheme, Partial<MenuItemStyles>>;

/** 菜单模式样式映射 */
export type MenuModeStyles = Record<MenuMode, Partial<MenuItemStyles>>;
