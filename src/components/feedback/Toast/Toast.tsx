/**
 * Toast 轻提示组件
 * @module components/feedback/Toast
 * @description 用于显示简短消息的轻提示组件，支持多种类型（info/success/warning/error）、位置、自定义图标和自动关闭。
 *
 * @example
 * ```tsx
 * <Toast message="操作成功" type="success" />
 * <Toast message="加载中..." type="loading" position="center" />
 * ```
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { toastStyles } from './Toast.styles';
import type { ToastProps, ToastRef, ToastMethodConfig, ToastStatic } from './Toast.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

// ==================== 模块级常量 ====================

const TOAST_ICON_MAP: Record<string, string> = {
  success: '✓', error: '✗', warning: '⚠', info: 'ℹ', loading: '⟳',
};

const TOAST_TYPE_COLORS: Record<string, string> = {
  success: 'rgba(82, 196, 26, 0.9)',
  error: 'rgba(245, 34, 45, 0.9)',
  warning: 'rgba(250, 173, 20, 0.9)',
  info: 'rgba(24, 144, 255, 0.9)',
  loading: 'rgba(24, 144, 255, 0.9)',
};

/** Toast 组件 */
export const Toast = createComponent<ToastProps, ToastRef>({
  name: 'Toast',
  render: (props, ref) => {
    const {
      visible: controlledVisible,
      defaultVisible = false,
      message,
      type = 'info',
      position = 'top',
      duration = 3000,
      closable = false,
      showIcon = true,
      icon,
      animationDuration = 300,
      closeable = false,
      onShow,
      onHide,
      onClose,
      onClick,
      className,
      style,
    } = props;

    const toastRef = useRef<HTMLDivElement>(null);
    const [internalVisible, setInternalVisible] = useState(defaultVisible);
    const [internalMessage, setInternalMessage] = useState(message);
    const [internalType, setInternalType] = useState(type);
    const [internalPosition, setInternalPosition] = useState(position);
    const [internalDuration, setInternalDuration] = useState(duration);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: closable || closeable });
    const a11y = useAccessibility({
      role: ARIA_ROLES.alert,
      focusable: closable || closeable,
      label: 'Toast',
    });

    // 处理受控模式
    useEffect(() => { if (controlledVisible !== undefined) setInternalVisible(controlledVisible); }, [controlledVisible]);
    useEffect(() => { setInternalMessage(message); }, [message]);
    useEffect(() => { setInternalType(type); }, [type]);
    useEffect(() => { setInternalPosition(position); }, [position]);
    useEffect(() => { setInternalDuration(duration); }, [duration]);

    // 处理显示/隐藏
    useEffect(() => {
      if (internalVisible) {
        onShow?.();
        if (internalDuration > 0) {
          timerRef.current = setTimeout(() => { handleHide(); }, internalDuration);
        }
      } else {
        onHide?.();
      }
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [internalVisible, internalDuration, onShow, onHide]);

    const handleHide = useCallback(() => {
      if (controlledVisible === undefined) setInternalVisible(false);
    }, [controlledVisible]);

    const handleClose = useCallback(() => {
      if (timerRef.current) clearTimeout(timerRef.current);
      handleHide();
      onClose?.();
    }, [handleHide, onClose]);

    const handleClick = useCallback((event: React.MouseEvent) => { onClick?.(event); }, [onClick]);

    const getIcon = useCallback(() => {
      if (icon) return icon;
      if (!showIcon) return null;
      return TOAST_ICON_MAP[internalType] || 'ℹ';
    }, [icon, showIcon, internalType]);

    const getPositionStyle = useCallback(() => {
      const baseStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 9999,
        display: internalVisible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: internalVisible ? 1 : 0,
        transition: `opacity ${animationDuration}ms ease-in-out`,
      };
      if (internalPosition === 'center') {
        return { ...baseStyle, top: '50%', transform: 'translateX(-50%) translateY(-50%)' };
      }
      if (internalPosition === 'bottom') {
        return { ...baseStyle, bottom: '80px' };
      }
      return { ...baseStyle, top: '80px' };
    }, [internalVisible, internalPosition, animationDuration]);

    const toastStyle = { ...getPositionStyle(), ...style };
    const toastClassName = `${toastStyles.container} ${toastStyles[internalType] || toastStyles.info} ${className || ''}`;

    React.useImperativeHandle(
      ref,
      () => ({
        element: toastRef.current,
        show: () => { if (controlledVisible === undefined) setInternalVisible(true); },
        hide: () => { if (controlledVisible === undefined) setInternalVisible(false); },
        isVisible: () => internalVisible,
        setMessage: (newMessage: string) => setInternalMessage(newMessage),
        setType: (newType: string) => setInternalType(newType as 'success' | 'error' | 'warning' | 'info' | 'loading'),
        setPosition: (newPosition: string) => setInternalPosition(newPosition as 'top' | 'center' | 'bottom'),
        setDuration: (newDuration: number) => setInternalDuration(newDuration),
      }),
      [internalVisible, controlledVisible],
    );

    if (!internalVisible) return null;

    const mergedStyle = animation.getMergedStyle(toastStyle);

    return (
      <View ref={toastRef} className={toastClassName} style={mergedStyle} onClick={handleClick} {...a11y.getAriaAttributes()}>
        {getIcon() && (
          <View className="orva-ui-toast__icon" style={{ marginRight: '8px', fontSize: '16px' }}>
            {getIcon()}
          </View>
        )}
        <View className="orva-ui-toast__message" style={{ flex: 1, color: 'white' }}>
          <Text>{internalMessage}</Text>
        </View>
        {(closable || closeable) && (
          <View
            className="orva-ui-toast__close"
            style={{ marginLeft: '8px', fontSize: '16px', color: 'white' }}
            onClick={handleClose}
          >
            ×
          </View>
        )}
      </View>
    );
  },
});

// 全局 Toast 实例管理
let globalToastInstance: { element: HTMLElement | null; hide: () => void } | null = null;

const createGlobalToastContainer = () => {
  if (typeof document === 'undefined') return null;
  let container = document.getElementById('orva-ui-global-toast');
  if (!container) {
    container = document.createElement('div');
    container.id = 'orva-ui-global-toast';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.zIndex = '99999';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
  }
  return container;
};

const getIconText = (type: string) => TOAST_ICON_MAP[type] || 'ℹ';

const getTypeColor = (type: string) => TOAST_TYPE_COLORS[type] || TOAST_TYPE_COLORS.info;

// ---- Imperative API (Toast.show / Toast.success / etc.) ----

const imperativeApi: ToastStatic = {
  show: (config: ToastMethodConfig | string) => {
    const container = createGlobalToastContainer();
    if (!container) return undefined as unknown as ToastRef;
    const props = typeof config === 'string' ? { message: config } : config;

    const toastElement = document.createElement('div');
    toastElement.style.cssText = `
      position: fixed;
      top: ${props.position === 'top' ? '80px' : props.position === 'bottom' ? 'auto' : '50%'};
      bottom: ${props.position === 'bottom' ? '80px' : 'auto'};
      left: 50%;
      transform: translateX(-50%) ${props.position === 'center' ? 'translateY(-50%)' : ''};
      z-index: 99999;
      display: flex;
      align-items: center;
      padding: 12px 20px;
      border-radius: 8px;
      background-color: ${getTypeColor(props.type || 'info')};
      color: white;
      font-size: 14px;
      max-width: 80%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: opacity 0.3s ease;
      opacity: 0;
    `;

    if (props.showIcon !== false) {
      const iconElement = document.createElement('span');
      iconElement.style.cssText = 'margin-right: 8px; font-size: 16px;';
      iconElement.textContent = getIconText(props.type || 'info');
      toastElement.appendChild(iconElement);
    }

    const messageElement = document.createElement('span');
    messageElement.textContent = String(props.message || '');
    toastElement.appendChild(messageElement);
    container.appendChild(toastElement);

    setTimeout(() => { toastElement.style.opacity = '1'; }, 10);

    const duration = props.duration || 3000;
    const hideTimer = setTimeout(() => {
      toastElement.style.opacity = '0';
      setTimeout(() => {
        if (toastElement.parentNode) toastElement.parentNode.removeChild(toastElement);
      }, 300);
    }, duration);

    globalToastInstance = {
      element: toastElement,
      hide: () => {
        clearTimeout(hideTimer);
        toastElement.style.opacity = '0';
        setTimeout(() => {
          if (toastElement.parentNode) toastElement.parentNode.removeChild(toastElement);
        }, 300);
      },
    };
    return globalToastInstance as unknown as ToastRef;
  },

  info: (config: ToastMethodConfig | string) =>
    imperativeApi.show(typeof config === 'string' ? { message: config, type: 'info' } : { ...config, type: 'info' }),

  success: (config: ToastMethodConfig | string) =>
    imperativeApi.show(typeof config === 'string' ? { message: config, type: 'success' } : { ...config, type: 'success' }),

  warning: (config: ToastMethodConfig | string) =>
    imperativeApi.show(typeof config === 'string' ? { message: config, type: 'warning' } : { ...config, type: 'warning' }),

  error: (config: ToastMethodConfig | string) =>
    imperativeApi.show(typeof config === 'string' ? { message: config, type: 'error' } : { ...config, type: 'error' }),

  loading: (config: ToastMethodConfig | string) =>
    imperativeApi.show(typeof config === 'string' ? { message: config, type: 'loading', duration: 0 } : { ...config, type: 'loading', duration: 0 }),

  hide: () => {
    if (globalToastInstance) {
      globalToastInstance.hide();
      globalToastInstance = null;
    }
  },
};

// Attach static methods to the component
Object.assign(Toast, imperativeApi);

export default Toast;