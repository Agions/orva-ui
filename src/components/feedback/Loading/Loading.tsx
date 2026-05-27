/**
 * Loading 加载组件
 * @module components/feedback/Loading
 * @description 用于显示加载状态的组件，支持多种动画类型（spinner/dots/pulse/bars）和延迟显示。
 *
 * @example
 * ```tsx
 * <Loading />
 * <Loading type="spinner" size="large" text="加载中..." />
 * <Loading type="dots" delay={500}>加载中</Loading>
 * ```
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { cn } from '@/utils';
import { LoadingStyles } from './Loading.styles';
import type { LoadingProps, LoadingRef } from './Loading.types';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import type { ARIARole } from '@/hooks/ui/useAccessibility';

export const Loading = createComponent<LoadingProps, LoadingRef>({
  name: 'Loading',
  render: (props, ref) => {
    const { type = 'spinner', size = 'default', text, delay = 0, style, className, ...rest } = props;

    const [visible, setVisible] = useState(delay === 0);
    const elementRef = useRef<HTMLDivElement>(null);
    const a11y = useAccessibility({
      role: 'status' as ARIARole,
      label: text || 'Loading',
    });

    useEffect(() => {
      if (delay > 0) {
        const timer = setTimeout(() => { setVisible(true); }, delay);
        return () => clearTimeout(timer);
      }
      setVisible(true);
    }, [delay]);

    const renderSpinner = () => {
      const baseSpinnerStyle = LoadingStyles['spinner'] as React.CSSProperties;
      const sizeStyle = (LoadingStyles['spinnerSize'] as Record<string, React.CSSProperties>)[size] as React.CSSProperties;
      const spinnerStyle = { ...baseSpinnerStyle, ...sizeStyle };
      return (
        <View style={spinnerStyle}>
          <View style={LoadingStyles['spinnerInner'] as React.CSSProperties} />
        </View>
      );
    };

    const renderDots = () => {
      const baseDotStyle = LoadingStyles['dot'] as React.CSSProperties;
      const sizeStyle = (LoadingStyles['dotSize'] as Record<string, React.CSSProperties>)[size] as React.CSSProperties;
      const dotStyle = { ...baseDotStyle, ...sizeStyle };
      return (
        <View style={LoadingStyles['dots'] as React.CSSProperties}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={{ ...dotStyle, animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </View>
      );
    };

    const renderPulse = () => {
      const basePulseStyle = LoadingStyles['pulse'] as React.CSSProperties;
      const sizeStyle = (LoadingStyles['pulseSize'] as Record<string, React.CSSProperties>)[size] as React.CSSProperties;
      const pulseStyle = { ...basePulseStyle, ...sizeStyle };
      return (
        <View style={LoadingStyles['pulseContainer'] as React.CSSProperties}>
          <View style={pulseStyle} />
        </View>
      );
    };

    const renderBars = () => {
      const baseBarStyle = LoadingStyles['bar'] as React.CSSProperties;
      const sizeStyle = (LoadingStyles['barSize'] as Record<string, React.CSSProperties>)[size] as React.CSSProperties;
      const barStyle = { ...baseBarStyle, ...sizeStyle };
      return (
        <View style={LoadingStyles['bars'] as React.CSSProperties}>
          {[0, 1, 2, 3].map((index) => (
            <View
              key={index}
              style={{ ...barStyle, animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </View>
      );
    };

    const renderContent = () => {
      switch (type) {
        case 'spinner': return renderSpinner();
        case 'dots': return renderDots();
        case 'pulse': return renderPulse();
        case 'bars': return renderBars();
        default: return renderSpinner();
      }
    };

    const loadingClasses = cn('orva-ui-loading', `orva-ui-loading--${size}`, className);

    if (!visible) return null;

    return (
      <View
        ref={elementRef}
        className={loadingClasses}
        style={{ ...(LoadingStyles['base'] as React.CSSProperties), ...style }}
        {...a11y.getAriaAttributes()}
        {...rest}
      >
        {renderContent()}
        {text && <Text style={LoadingStyles['text'] as React.CSSProperties}>{text}</Text>}
      </View>
    );
  },
});

export default Loading;