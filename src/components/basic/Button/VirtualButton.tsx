/**
 * 虚拟滚动 Button 列表组件
 * 用于大量按钮的高效渲染
 */

import React, { useRef, useCallback, useMemo } from 'react';
import { createComponent } from '@/utils/createComponent';
import type { ButtonProps } from './Button.types';
import type { BaseProps } from '@/types/component';

/** 虚拟按钮配置 */
export interface VirtualButtonConfig {
  /** 单个按钮高度 (px) */
  buttonHeight: number;
  /** 可见区域外预渲染数量 */
  overscanCount?: number;
  /** 按钮间距 (px) */
  gap?: number;
}

/** 虚拟按钮项 */
export interface VirtualButtonItem {
  /** 唯一标识 */
  id: string | number;
  /** 按钮配置 */
  config: ButtonProps;
  /** 自定义渲染函数 */
  render?: (props: ButtonProps) => React.ReactNode;
}

/** 虚拟按钮列表 Props */
export interface VirtualButtonProps extends BaseProps {
  /** 按钮列表数据 */
  buttons: VirtualButtonItem[];
  /** 虚拟滚动配置 */
  config: VirtualButtonConfig;
  /** 按钮点击回调 */
  onButtonClick?: (index: number, button: VirtualButtonItem) => void;
  /** 容器样式 */
  containerStyle?: React.CSSProperties;
}

/** 虚拟滚动 Hook */
export function useVirtualScroll(
  items: VirtualButtonItem[],
  config: VirtualButtonConfig
) {
  const { buttonHeight, overscanCount = 5, gap = 0 } = config;

  const totalHeight = useMemo(() => {
    return items.length * (buttonHeight + gap);
  }, [items.length, buttonHeight, gap]);

  const getVisibleItems = useCallback((scrollTop: number, containerHeight: number) => {
    const startIndex = Math.max(0, Math.floor(scrollTop / (buttonHeight + gap)) - overscanCount);
    const endIndex = Math.min(
      items.length,
      Math.ceil((scrollTop + containerHeight) / (buttonHeight + gap)) + overscanCount
    );

    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index,
      position: (startIndex + index) * (buttonHeight + gap),
    }));
  }, [items, buttonHeight, gap, overscanCount]);

  return {
    totalHeight,
    getVisibleItems,
    buttonHeight,
    gap,
  };
}

// 简化的 VirtualButton 组件
export const VirtualButton = createComponent<VirtualButtonProps, unknown>({
  name: 'VirtualButton',

  defaultProps: {
    buttons: [],
    config: {
      buttonHeight: 40,
      overscanCount: 5,
      gap: 8,
    },
  },

  render: (props) => {
    const { buttons, config, containerStyle } = props;
    const { totalHeight, getVisibleItems } = useVirtualScroll(buttons, config);

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTop = useRef(0);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      scrollTop.current = e.currentTarget.scrollTop;
    }, []);

    const visibleItems = getVisibleItems(scrollTop.current, 600); // 假设容器高度 600px

    return (
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: 600,
          overflow: 'auto',
          position: 'relative',
          ...containerStyle,
        }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {visibleItems.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: item.position,
                height: config.buttonHeight,
              }}
            >
              {item.render ? (
                item.render(item.config)
              ) : (
                <div>{/* 占位 - 实际应渲染 Button 组件 */}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
});

VirtualButton.displayName = 'VirtualButton';

export default VirtualButton;