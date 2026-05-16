import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import type {
  NotificationProps,
  NotificationRef,
  NotificationType,
} from './Notification.types';
import { DEFAULT_NOTIFICATION_CONFIG } from './Notification.types';
import { notificationStyles, notificationStyleHelpers } from './Notification.styles';
import { cn } from '../../../utils';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import type { ARIARole } from '@/hooks/ui/useAccessibility';
import type { ViewStyle } from '@/hooks/ui/useMicroAnimation';

/** 通知组件 */
export const Notification = createComponent<NotificationProps, NotificationRef>({
  name: 'Notification',
  render: (props, ref) => {
    const {
      type = 'info',
      title,
      content,
      icon,
      closable = true,
      duration = DEFAULT_NOTIFICATION_CONFIG.defaultDuration,
      placement = DEFAULT_NOTIFICATION_CONFIG.defaultPlacement,
      onClose,
      onClick,
      showClose = true,
      showIcon = true,
      animation = DEFAULT_NOTIFICATION_CONFIG.defaultAnimation,
      autoClose = true,
      draggable = false,
      dragThreshold = 100,
      stackIndex = 0,
      hovered = false,
      isClosing = false,
      className,
      style,
    } = props;

    const [visible, setVisible] = useState(true);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (autoClose && duration > 0 && !paused) {
        timerRef.current = setTimeout(() => {
          setVisible(false);
          onClose?.();
        }, duration);
      }
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [autoClose, duration, paused, onClose]);

    const handleClose = useCallback(() => {
      setVisible(false);
      onClose?.();
    }, [onClose]);

    const handleClick = useCallback(() => {
      onClick?.();
    }, [onClick]);

    const pauseProgress = useCallback(() => {
      setPaused(true);
      if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    const resumeProgress = useCallback(() => {
      setPaused(false);
    }, []);

    const show = useCallback(() => {
      setVisible(true);
      return true;
    }, []);

    const hide = useCallback(() => {
      setVisible(false);
      return true;
    }, []);

    const update = useCallback((_props: Partial<NotificationProps>) => {
      return true;
    }, []);

    const getState = useCallback(() => ({
      visible,
      paused,
      closing: isClosing,
    }), [visible, paused, isClosing]);

    React.useImperativeHandle(ref, () => ({
      show,
      hide,
      update,
      pauseProgress,
      resumeProgress,
      getState,
    }), [show, hide, update, pauseProgress, resumeProgress, getState]);

    const animationHook = useMicroAnimation({ type: 'micro', enabled: visible });
    const a11y = useAccessibility({
      role: 'alert' as unknown as ARIARole,
      label: title ? String(title) : (typeof content === 'string' ? content : 'Notification'),
    });

    const typeStyle = notificationStyleHelpers.getTypeStyle(type as NotificationType);
    const placementStyle = notificationStyleHelpers.getPlacementStyle(placement, {});
    const stackStyle = notificationStyleHelpers.getStackStyle(stackIndex);
    const mergedStyle = animationHook.getMergedStyle({
      ...typeStyle,
      ...placementStyle,
      ...stackStyle,
      ...(style as unknown as ViewStyle),
      opacity: isClosing ? 0 : 1,
    } as ViewStyle);

    const renderIcon = () => {
      if (!showIcon) return null;
      if (icon) return icon;
      const iconMap: Record<string, string> = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
      };
      return (
        <View style={{ marginRight: 8, fontSize: 16 }}>
          <Text>{iconMap[type] || 'ℹ'}</Text>
        </View>
      );
    };

    return (
      <View
        ref={notificationRef as unknown as React.RefObject<typeof View>}
        className={cn(notificationStyles.base as string, `orva-ui-notification--${type}`, className)}
        style={mergedStyle}
        onClick={handleClick}
        {...a11y.getAriaAttributes()}
      >
        {renderIcon()}
        <View style={{ flex: 1 }}>
          {title && (
            <View style={{ fontWeight: 'bold', marginBottom: 4 }}>
              <Text>{title}</Text>
            </View>
          )}
          {content && (
            <View style={{ fontSize: 14 }}>
              <Text>{content}</Text>
            </View>
          )}
        </View>
        {showClose && closable && (
          <View
            style={{ marginLeft: 8, cursor: 'pointer', fontSize: 16 }}
            onClick={(e: unknown) => {
              const evt = e as { stopPropagation?: () => void };
              evt?.stopPropagation?.();
              handleClose();
            }}
          >
            <Text>×</Text>
          </View>
        )}
      </View>
    );
  },
});
