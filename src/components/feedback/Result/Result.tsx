import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import type { ResultProps, ResultRef, ResultStatus } from './Result.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import type { ARIARole } from '@/hooks/ui/useAccessibility';

/** 结果组件 */
export const Result = createComponent<ResultProps, ResultRef>({
  name: 'Result',
  render: (props, ref) => {
    const {
      status = 'info',
      title: propTitle,
      subTitle: propSubTitle,
      icon,
      extra,
      children,
      size = 'medium',
      className,
      style,
      ...restProps
    } = props;

    const containerRef = useRef<any>(null);
    const [internalStatus, setInternalStatus] = useState<ResultStatus>(status);
    const [internalTitle, setInternalTitle] = useState(propTitle);
    const [internalSubTitle, setInternalSubTitle] = useState(propSubTitle);

    const getStatusText = useCallback(() => {
      const textMap: Record<ResultStatus, string> = {
        success: '成功', error: '失败', info: '信息', warning: '警告', loading: '加载中',
        '404': '页面不存在', '403': '无权访问', '500': '服务器错误',
      };
      return textMap[internalStatus] || internalStatus;
    }, [internalStatus]);

    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ((ARIA_ROLES as Record<string, string>).status || 'status') as unknown as ARIARole,
      label: getStatusText(),
    });

    useEffect(() => { setInternalStatus(status); }, [status]);
    useEffect(() => { setInternalTitle(propTitle); }, [propTitle]);
    useEffect(() => { setInternalSubTitle(propSubTitle); }, [propSubTitle]);

    const getStatusIcon = useCallback(() => {
      if (icon) return icon;
      const iconMap: Record<ResultStatus, string> = {
        success: '✓', error: '✗', info: 'ℹ', warning: '⚠', loading: '⏳',
        '404': '404', '403': '403', '500': '500',
      };
      return iconMap[internalStatus] || '';
    }, [icon, internalStatus]);

    const getStatusColor = useCallback(() => {
      const colorMap: Record<ResultStatus, string> = {
        success: '#22c55e', error: '#ef4444', info: '#0ea5e9', warning: '#f59e0b',
        loading: '#6b7280', '404': '#6b7280', '403': '#6b7280', '500': '#6b7280',
      };
      return colorMap[internalStatus] || '#6b7280';
    }, [internalStatus]);

    React.useImperativeHandle(
      ref,
      () => ({
        element: containerRef.current,
        getStatus: () => internalStatus,
        setStatus: (newStatus: ResultStatus) => setInternalStatus(newStatus),
        setTitle: (newTitle: React.ReactNode) => setInternalTitle(newTitle),
        setSubTitle: (newSubTitle: React.ReactNode) => setInternalSubTitle(newSubTitle),
        reset: () => {
          setInternalStatus(status);
          setInternalTitle(propTitle);
          setInternalSubTitle(propSubTitle);
        },
      }),
      [internalStatus, status, propTitle, propSubTitle],
    );

    const containerStyle = {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: size === 'small' ? '16px' : size === 'large' ? '48px' : '32px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      ...style,
    };

    const iconContainerStyle = {
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const iconStyle = {
      fontSize: size === 'small' ? '24px' : size === 'large' ? '48px' : '36px',
      color: getStatusColor(),
      fontWeight: 'bold' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size === 'small' ? '40px' : size === 'large' ? '80px' : '60px',
      height: size === 'small' ? '40px' : size === 'large' ? '80px' : '60px',
      borderRadius: '50%',
      backgroundColor: `${getStatusColor()}20`,
      border: `2px solid ${getStatusColor()}`,
    };

    const contentStyle = {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
      gap: '8px',
    };

    const titleStyle = {
      fontSize: size === 'small' ? '16px' : size === 'large' ? '24px' : '20px',
      fontWeight: 'bold' as const,
      color: '#1f2937',
      margin: 0,
    };

    const subTitleStyle = {
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
      color: '#6b7280',
      margin: 0,
      lineHeight: 1.5,
    };

    const childrenStyle = { marginTop: '16px', width: '100%' };
    const extraStyle = { marginTop: '16px', display: 'flex', gap: '8px' };

    const mergedStyle = animation.getMergedStyle(containerStyle);

    return (
      <View ref={containerRef} style={mergedStyle} {...a11y.getAriaAttributes()} {...restProps}>
        <View style={iconContainerStyle}>
          <View style={iconStyle}>
            <Text>{getStatusIcon()}</Text>
          </View>
        </View>
        <View style={contentStyle}>
          <View style={titleStyle}>
            <Text>{internalTitle || getStatusText()}</Text>
          </View>
          {internalSubTitle && (
            <View style={subTitleStyle}>
              <Text>{internalSubTitle}</Text>
            </View>
          )}
          {children && <View style={childrenStyle}>{children}</View>}
          {extra && <View style={extraStyle}>{extra}</View>}
        </View>
      </View>
    );
  },
});

export default Result;