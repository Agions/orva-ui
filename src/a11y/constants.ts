
/**
 * 无障碍常量
 */

// 键盘事件键码
export const KEY_CODES = {
  // 方向键
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,

  // Tab 键
  TAB: 9,

  // Enter 键
  ENTER: 13,

  // Esc 键
  ESCAPE: 27,

  // Space 键
  SPACE: 32,

  // Page Up/Down
  PAGE_UP: 33,
  PAGE_DOWN: 34,

  // Home/End
  HOME: 36,
  END: 35,

  // F 功能键
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
} as const;

// 语义化角色
export const ROLES = {
  BUTTON: 'button',
  LINK: 'link',
  MENU: 'menu',
  MENU_ITEM: 'menuitem',
  DIALOG: 'dialog',
  TOOLTIP: 'tooltip',
  ALERT: 'alert',
  PROGRESSBAR: 'progressbar',
  TREE: 'tree',
  GRID: 'grid',
  LISTBOX: 'listbox',
  COMBOBOX: 'combobox',
  SEARCHBOX: 'searchbox',
  TEXTBOX: 'textbox',
} as const;

// 状态属性
export const STATES = {
  EXPANDED: 'expanded',
  SELECTED: 'selected',
  DISABLED: 'disabled',
  CHECKED: 'checked',
  HIDDEN: 'hidden',
  VISIBLE: 'visible',
} as const;
