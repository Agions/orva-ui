import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Mock @tarojs/runtime
vi.mock('@tarojs/runtime', () => ({ default: {} }));

const filterProps = (props: Record<string, unknown>) => {
  const {
    children,
    className,
    style,
    id,
    role,
    hidden,
    dangerouslySetInnerHTML,
    onClick,
    onChange,
    onScroll,
    onBlur,
    onFocus,
    onKeyDown,
    onSubmit,
    onReset,
    value,
    type,
    name,
    placeholder,
    disabled,
    readOnly,
    required,
    checked,
    ...rest
  } = props as any;
  const allowed: Record<string, unknown> = {
    children,
    className,
    style,
    id,
    role,
    hidden,
    dangerouslySetInnerHTML,
    onClick,
    onChange,
    onScroll,
    onBlur,
    onFocus,
    onKeyDown,
    onSubmit,
    onReset,
    value,
    type,
    name,
    placeholder,
    disabled,
    readOnly,
    required,
    checked,
  };
  Object.keys(rest).forEach((key) => {
    if (key.startsWith('aria-') || key.startsWith('data-')) {
      allowed[key] = (rest as any)[key];
    }
  });
  return allowed;
};

const createComponent = (tag: string) => {
  const Comp = React.forwardRef<any, Record<string, any>>((props, ref) => {
    const allowed = filterProps(props);
    if ((tag === 'input' || tag === 'textarea' || tag === 'select') && 'value' in allowed && !allowed.onChange) {
      allowed.onChange = () => { };
    }
    return React.createElement(tag, { ...allowed, ref }, allowed.children as React.ReactNode);
  });
  Comp.displayName = `Mock${String(tag)}`;
  return Comp;
};

// Mock @tarojs/components
vi.mock('@tarojs/components', () => ({
  View: createComponent('div'),
  Text: createComponent('span'),
  Button: createComponent('button'),
  Image: createComponent('img'),
  Input: createComponent('input'),
  Textarea: createComponent('textarea'),
  ScrollView: createComponent('div'),
  Swiper: createComponent('div'),
  SwiperItem: createComponent('div'),
  Video: createComponent('video'),
  Canvas: createComponent('canvas'),
  Map: createComponent('div'),
  WebView: createComponent('iframe'),
  CoverView: createComponent('div'),
  CoverImage: createComponent('img'),
  Icon: createComponent('i'),
  RichText: createComponent('div'),
  Progress: createComponent('progress'),
  Checkbox: createComponent('input'),
  CheckboxGroup: createComponent('div'),
  Form: createComponent('form'),
  Label: createComponent('label'),
  Picker: createComponent('select'),
  PickerView: createComponent('div'),
  PickerViewColumn: createComponent('div'),
  Radio: createComponent('input'),
  RadioGroup: createComponent('div'),
  Slider: createComponent('input'),
  Switch: createComponent('input'),
  Navigator: createComponent('a'),
  Audio: createComponent('audio'),
  Camera: createComponent('div'),
  LivePlayer: createComponent('video'),
  LivePusher: createComponent('video'),
  FunctionalPageNavigator: createComponent('div'),
  OfficialAccount: createComponent('div'),
  OpenData: createComponent('div'),
  NavigationBar: createComponent('div'),
  PageMeta: createComponent('div'),
  PageContainer: createComponent('div'),
  ShareButton: createComponent('button'),
  Ad: createComponent('div'),
  AdContentPage: createComponent('div'),
  CustomWrapper: createComponent('div'),
  Embed: createComponent('iframe'),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation(() => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage (needed by ThemeProvider persistency)
// Use a proper in-memory implementation so setItem/getItem actually work
const localStorageStore: Record<string, string> = {};
Object.defineProperty(window, 'localStorage', {
  writable: true,
  configurable: true,
  value: {
    getItem: vi.fn((key: string) => localStorageStore[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { localStorageStore[key] = value; }),
    removeItem: vi.fn((key: string) => { delete localStorageStore[key]; }),
    clear: vi.fn(() => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); }),
    key: vi.fn((index: number) => Object.keys(localStorageStore)[index] ?? null),
    get length() { return Object.keys(localStorageStore).length; },
  },
});
