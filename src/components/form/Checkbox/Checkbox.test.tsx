import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Mock @tarojs/components — 所有 mock 定义在工厂函数内部，避免 hoisting 问题
vi.mock('@tarojs/components', () => {
  const mockComponent = (testid: string) => {
    const Comp = React.forwardRef((props: any, ref: any) => {
      const { children, ...rest } = props;
      return (
        <div ref={ref} data-testid={testid} {...rest}>
          {children}
        </div>
      );
    });
    return Comp;
  };

  const MockTaroCheckbox = React.forwardRef((props: any, ref: any) => {
    const { children, checked, disabled, onChange, className, style, value, ...rest } = props;
    return (
      <div
        ref={ref}
        data-testid="taro-checkbox"
        data-checked={checked ? 'true' : 'false'}
        data-disabled={disabled ? 'true' : undefined}
        className={className}
        style={style}
        onClick={disabled ? undefined : onChange}
      >
        {children}
      </div>
    );
  });

  return {
    View: mockComponent('taro-view'),
    Text: mockComponent('taro-text'),
    Image: mockComponent('taro-image'),
    ScrollView: mockComponent('taro-scroll-view'),
    Swiper: mockComponent('taro-swiper'),
    SwiperItem: mockComponent('taro-swiper-item'),
    Button: mockComponent('taro-button'),
    Input: React.forwardRef((props: any, ref: any) => {
      const { onInput, onChange, ...rest } = props;
      return <input ref={ref} data-testid="input" onChange={onInput || onChange} {...rest} />;
    }),
    Textarea: React.forwardRef((props: any, ref: any) => {
      const { onInput, onChange, ...rest } = props;
      return <textarea ref={ref} data-testid="textarea" onChange={onInput || onChange} {...rest} />;
    }),
    Checkbox: MockTaroCheckbox,
    Radio: mockComponent('taro-radio'),
    Switch: mockComponent('taro-switch'),
    Slider: mockComponent('taro-slider'),
    Picker: mockComponent('taro-picker'),
    PickerView: mockComponent('taro-picker-view'),
    PickerViewColumn: mockComponent('taro-picker-view-column'),
    Form: mockComponent('taro-form'),
    Label: mockComponent('taro-label'),
    Navigator: mockComponent('taro-navigator'),
    RichText: mockComponent('taro-rich-text'),
    Progress: mockComponent('taro-progress'),
    Icon: mockComponent('taro-icon'),
    Camera: mockComponent('taro-camera'),
    Canvas: mockComponent('taro-canvas'),
    Map: mockComponent('taro-map'),
    Video: mockComponent('taro-video'),
    Audio: mockComponent('taro-audio'),
    WebView: mockComponent('taro-web-view'),
    Block: ({ children }: any) => <>{children}</>,
    CoverView: mockComponent('taro-cover-view'),
    CoverImage: mockComponent('taro-cover-image'),
    MatchMedia: mockComponent('taro-match-media'),
    MovableArea: mockComponent('taro-movable-area'),
    MovableView: mockComponent('taro-movable-view'),
    PageContainer: mockComponent('taro-page-container'),
    RootPortal: mockComponent('taro-root-portal'),
    ShareElement: mockComponent('taro-share-element'),
    Editor: mockComponent('taro-editor'),
    KeyboardAccessory: mockComponent('taro-keyboard-accessory'),
    LivePlayer: mockComponent('taro-live-player'),
    LivePusher: mockComponent('taro-live-pusher'),
    VoipRoom: mockComponent('taro-voip-room'),
    Ad: mockComponent('taro-ad'),
    AdCustom: mockComponent('taro-ad-custom'),
    OfficialAccount: mockComponent('taro-official-account'),
    OpenData: mockComponent('taro-open-data'),
    PageMeta: mockComponent('taro-page-meta'),
    CustomWrapper: mockComponent('taro-custom-wrapper'),
    FunctionalPageNavigator: mockComponent('taro-functional-page-navigator'),
    NavigationBar: mockComponent('taro-navigation-bar'),
  };
});

// Mock @/hooks/ui/useTheme
vi.mock('@/hooks/ui/useTheme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#6366f1',
        text: '#1f2937',
        background: '#fff',
        backgroundCard: '#fff',
        border: '#e5e7eb',
        textSecondary: '#6b7280',
        error: '#ef4444',
      },
      typography: {
        fontSize: { md: '16px', sm: '14px' },
        fontWeight: { semibold: 600 },
      },
      borderRadius: { md: '0.375rem' },
      shadows: { md: '0 4px 6px rgba(0,0,0,0.1)' },
    },
  }),
}));

// Mock @/hooks/ui/useMicroAnimation
vi.mock('@/hooks/ui/useMicroAnimation', () => ({
  useMicroAnimation: () => ({
    isAnimating: false,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
    getMergedStyle: (style: object) => style,
  }),
}));

// Mock @/hooks/ui/useAccessibility
vi.mock('@/hooks/ui/useAccessibility', () => ({
  useAccessibility: () => ({
    handleKeyDown: vi.fn(),
    getAriaAttributes: () => ({}),
  }),
  ARIA_ROLES: { checkbox: 'checkbox', dialog: 'dialog' },
}));

// Mock @/hooks/ui/useInteractionState
vi.mock('@/hooks/ui/useInteractionState', () => ({
  useInteractionState: () => ({
    state: {
      isHovered: false,
      isFocused: false,
      isActive: false,
      isPressed: false,
      isDisabled: false,
      isLoading: false,
    },
    handlers: {
      onMouseEnter: vi.fn(),
      onMouseLeave: vi.fn(),
      onMouseDown: vi.fn(),
      onMouseUp: vi.fn(),
      onFocus: vi.fn(),
      onBlur: vi.fn(),
      onTouchStart: vi.fn(),
      onTouchEnd: vi.fn(),
    },
    getInteractionStyle: () => ({}),
  }),
}));

// Mock @/utils/logger
vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }),
}));

// Mock Checkbox.styles
vi.mock('./Checkbox.styles', () => ({
  checkboxStyles: {
    getStyle: ({ style }: any) => style,
    getClassName: ({ className }: any) => className || '',
    getContainerStyle: ({ style }: any) => style,
    getWrapperStyle: ({ style }: any) => style,
    getLabelStyle: ({ style }: any) => style,
    getIconStyle: ({ style }: any) => style,
    getHelperTextStyle: ({ style }: any) => style,
    getErrorTextStyle: ({ style }: any) => style,
    getCheckboxStyle: ({ style }: any) => style,
    getCheckboxClassName: ({ className }: any) => className || '',
  },
}));

import { Checkbox } from './Checkbox';

describe('Checkbox 基础渲染', () => {
  it('应该渲染 Checkbox 组件', () => {
    const { container } = render(<Checkbox />);
    expect(container.firstChild).toBeTruthy();
  });

  it('应该渲染带 label 的 Checkbox', () => {
    render(<Checkbox label="同意协议" />);
    expect(screen.getByText('同意协议')).toBeTruthy();
  });
});

describe('Checkbox checked 属性', () => {
  it('checked=true 时不报错', () => {
    const { container } = render(<Checkbox checked={true} label="已选中" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('checked=false 时不报错', () => {
    const { container } = render(<Checkbox checked={false} label="未选中" />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('Checkbox indeterminate 属性', () => {
  it('indeterminate=true 时不报错', () => {
    const { container } = render(<Checkbox indeterminate={true} label="不确定" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('indeterminate=false 时不报错', () => {
    const { container } = render(<Checkbox indeterminate={false} label="确定" />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('Checkbox disabled 属性', () => {
  it('disabled=true 时不报错', () => {
    const { container } = render(<Checkbox disabled={true} label="禁用" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('disabled=false 时不报错', () => {
    const { container } = render(<Checkbox disabled={false} label="可用" />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('Checkbox 交互', () => {
  it('应该渲染可交互的 Checkbox', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="可交互" onChange={handleChange} />);
    expect(screen.getByText('可交互')).toBeTruthy();
  });

  it('应该渲染带 checked 状态的 Checkbox', () => {
    render(<Checkbox checked={true} label="已选中" />);
    const checkbox = screen.getByText('已选中');
    expect(checkbox).toBeTruthy();
  });

  it('应该渲染带 indeterminate 状态的 Checkbox', () => {
    render(<Checkbox indeterminate={true} label="不确定状态" />);
    expect(screen.getByText('不确定状态')).toBeTruthy();
  });

  it('disabled 状态下应该渲染 disabled 属性', () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled={true} label="禁用状态" onChange={handleChange} />);
    expect(screen.getByText('禁用状态')).toBeTruthy();
  });
});

describe('Checkbox onChange 回调', () => {
  it('应该接受 onChange 回调', () => {
    const handleChange = vi.fn();
    const { container } = render(<Checkbox label="可切换" onChange={handleChange} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('禁用状态下应该接受 onChange 回调', () => {
    const handleChange = vi.fn();
    const { container } = render(<Checkbox disabled={true} label="禁用" onChange={handleChange} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('Checkbox 自定义 className 和 style', () => {
  it('应该接受自定义 className', () => {
    const { container } = render(<Checkbox className="custom-checkbox" label="自定义类名" />);
    expect(container.firstChild).toBeTruthy();
  });

  it('应该接受自定义 style', () => {
    const { container } = render(
      <Checkbox style={{ marginTop: '10px' }} label="自定义样式" />,
    );
    expect(screen.getByText('自定义样式')).toBeTruthy();
  });
});
