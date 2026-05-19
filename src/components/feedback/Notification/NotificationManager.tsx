/**
 * 通知管理器组件 (NotificationManager)
 * @module components/feedback/Notification/NotificationManager
 * @description 管理和显示多个通知提醒的容器，支持添加、移除通知和全局配置
 * @example
 * ```tsx
 * import { NotificationManager } from 'orva-ui';
 *
 * const managerRef = useRef<NotificationManagerRef>();
 * <NotificationManager ref={managerRef} maxCount={5} />
 * ```
 */

import React, { useRef, useState, useCallback } from 'react';
import { View } from '@tarojs/components';
import type {
  NotificationManagerProps,
  NotificationManagerRef,
  NotificationItem,
  NotificationPlacement,
} from './Notification.types';
import { Notification } from './Notification';
import { notificationStyleHelpers } from './Notification.styles';
import { cn } from '@/utils';
import { isMobile } from '@/utils/platform';
import { useThemeContext } from '@/providers/ThemeProvider';
import { DEFAULT_NOTIFICATION_CONFIG, NotificationUtils } from './Notification.types';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import type { ARIARole } from '@/hooks/ui/useAccessibility';
import { createLogger } from '@/utils/logger';

/**
 * NotificationManager 通知管理器组件
 * @module components/feedback/Notification/NotificationManager
 * @description 用于全局管理通知提醒的组件，支持添加、移除、批量管理和自动清除通知。
 *
 * @example
 * ```tsx
 * <NotificationManager>
 *   <App />
 * </NotificationManager>
 * ```
 */

const logger = createLogger('NotificationManager');
interface InternalNotificationItem extends NotificationItem {
  key: string;
  stackIndex: number;
  isClosing: boolean;
}

const updateStackIndices = (notificationsList: InternalNotificationItem[], stack: boolean): InternalNotificationItem[] => {
  if (!stack) return notificationsList;
  return notificationsList.map((notification, index) => ({ ...notification, stackIndex: index }));
};

const getPlacementStyle = (placement: NotificationPlacement, theme: any, mobile: boolean) => {
  return notificationStyleHelpers.getPlacementStyle(placement, { theme, isMobile: mobile }).container;
};

/** 通知管理器组件 */
export const NotificationManager = createComponent<NotificationManagerProps, NotificationManagerRef>({
  name: 'NotificationManager',
  render: (props, ref) => {
    const {
      maxCount = DEFAULT_NOTIFICATION_CONFIG.defaultMaxCount,
      defaultPlacement = DEFAULT_NOTIFICATION_CONFIG.defaultPlacement,
      defaultDuration = DEFAULT_NOTIFICATION_CONFIG.defaultDuration,
      defaultAnimation = DEFAULT_NOTIFICATION_CONFIG.defaultAnimation,
      stack = DEFAULT_NOTIFICATION_CONFIG.defaultStack,
      containerStyle,
      containerClassName,
      onEnter,
      onLeave,
      onAllClose,
    } = props;

    const theme = useThemeContext();
    const [notifications, setNotifications] = useState<InternalNotificationItem[]>([]);
    const [history, setHistory] = useState<NotificationItem[]>([]);
    const [isAllPaused, setIsAllPaused] = useState(false);
    const notificationRefs = useRef<Map<string, { current: any }>>(new Map());

    const a11y = useAccessibility({
      role: ((ARIA_ROLES as Record<string, string>).status || 'status') as unknown as ARIARole,
      label: 'Notifications',
    });

    const addNotification = useCallback(
      (config: Omit<NotificationItem, 'key' | 'createdAt'>): string => {
        const key = NotificationUtils.generateKey();
        const newNotification: InternalNotificationItem = {
          ...config,
          key,
          createdAt: Date.now(),
          placement: config.placement || defaultPlacement,
          duration: config.duration ?? defaultDuration,
          animation: config.animation || defaultAnimation,
          stackIndex: 0,
          isClosing: false,
        };
        setNotifications((prev) => {
          let updatedNotifications = [...prev, newNotification];
          if (updatedNotifications.length > maxCount) {
            const removed = updatedNotifications.shift();
            if (removed) {
              setHistory((prevHistory) => [...prevHistory.slice(-DEFAULT_NOTIFICATION_CONFIG.maxHistoryCount!), removed]);
              onLeave?.(removed.key);
            }
          }
          return updateStackIndices(updatedNotifications, stack);
        });
        onEnter?.(key);
        return key;
      },
      [maxCount, defaultPlacement, defaultDuration, defaultAnimation, onEnter, onLeave, stack],
    );

    const closeNotification = useCallback(
      (key: string) => {
        setNotifications((prev) => {
          const notificationIndex = prev.findIndex((n) => n.key === key);
          if (notificationIndex === -1) return prev;
          const notification = prev[notificationIndex];
          const updatedNotifications = prev.filter((_, index) => index !== notificationIndex);
          setHistory((prevHistory) => [...prevHistory.slice(-DEFAULT_NOTIFICATION_CONFIG.maxHistoryCount!), notification as NotificationItem]);
          return updateStackIndices(updatedNotifications, stack);
        });
        onLeave?.(key);
      },
      [onLeave, stack],
    );

    const closeAllNotifications = useCallback(() => {
      setNotifications((prev) => {
        setHistory((prevHistory) => [...prevHistory.slice(-DEFAULT_NOTIFICATION_CONFIG.maxHistoryCount!), ...prev]);
        const firstKey = prev[0]?.key;
        if (firstKey) onLeave?.(firstKey);
        onAllClose?.();
        return [];
      });
    }, [onLeave, onAllClose]);

    const updateNotification = useCallback((key: string, config: Partial<NotificationItem>) => {
      setNotifications((prev) => prev.map((notification) => (notification.key === key ? { ...notification, ...config, key: notification.key, createdAt: notification.createdAt } : notification)));
    }, []);

    const open = useCallback((config: Omit<NotificationItem, 'key' | 'createdAt'>) => addNotification(config), [addNotification]);
    const success = useCallback((config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => open({ ...config, type: 'success' }), [open]);
    const info = useCallback((config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => open({ ...config, type: 'info' }), [open]);
    const warning = useCallback((config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => open({ ...config, type: 'warning' }), [open]);
    const error = useCallback((config: Omit<NotificationItem, 'key' | 'createdAt' | 'type'>) => open({ ...config, type: 'error' }), [open]);
    const close = useCallback((key: string) => closeNotification(key), [closeNotification]);
    const destroyAll = useCallback(() => closeAllNotifications(), [closeAllNotifications]);
    const getNotifications = useCallback(() => notifications.map(({ isClosing, stackIndex, ...rest }) => rest), [notifications]);
    const getCount = useCallback(() => notifications.length, [notifications]);
    const setMaxCount = useCallback((_count: number) => { logger.warn('setMaxCount should be controlled by props'); }, []);
    const setDefaultPlacement = useCallback((_placement: NotificationPlacement) => { logger.warn('setDefaultPlacement should be controlled by props'); }, []);
    const setDefaultDuration = useCallback((_duration: number) => { logger.warn('setDefaultDuration should be controlled by props'); }, []);
    const pauseAll = useCallback(() => { setIsAllPaused(true); notificationRefs.current.forEach((refObject) => { if (refObject?.current?.pauseProgress) refObject.current.pauseProgress(); }); }, []);
    const resumeAll = useCallback(() => { setIsAllPaused(false); notificationRefs.current.forEach((ref) => { if (ref?.current?.resumeProgress) ref.current.resumeProgress(); }); }, []);
    const clearHistory = useCallback(() => { setHistory([]); }, []);
    const getHistory = useCallback(() => [...history], [history]);

    React.useImperativeHandle(
      ref,
      () => ({ open, success, info, warning, error, close, destroyAll, update: updateNotification, getNotifications, getCount, setMaxCount, setDefaultPlacement, setDefaultDuration, pauseAll, resumeAll, clearHistory, getHistory }),
      [open, success, info, warning, error, close, destroyAll, updateNotification, getNotifications, getCount, setMaxCount, setDefaultPlacement, setDefaultDuration, pauseAll, resumeAll, clearHistory, getHistory],
    );

    const handleNotificationClose = useCallback((key: string) => closeNotification(key), [closeNotification]);
    const handleNotificationClick = useCallback(
      (key: string) => {
        const notification = notifications.find((n) => n.key === key);
        if (notification?.onClick) notification.onClick();
      },
      [notifications],
    );

    const getContainerStyle = () => ({ ...notificationStyleHelpers.getContainerStyle({ theme, isMobile: isMobile() }), ...containerStyle });
    const getContainerClassName = () => cn('orva-ui-notification-container', containerClassName);

    const renderNotificationsByPlacement = () => {
      const notificationsByPlacement: Record<NotificationPlacement, InternalNotificationItem[]> = {
        topRight: [], topLeft: [], bottomRight: [], bottomLeft: [], top: [], bottom: [],
      };
      notifications.forEach((notification) => {
        const placement = notification.placement || defaultPlacement;
        notificationsByPlacement[placement].push(notification);
      });
      return Object.entries(notificationsByPlacement).map(([placement, placementNotifications]) => {
        if (placementNotifications.length === 0) return null;
        const sortedNotifications = NotificationUtils.sortNotifications(placementNotifications);
        return (
          <View key={placement} className={`orva-ui-notification-placement-${placement}`} style={{ position: 'absolute', pointerEvents: 'none', ...getPlacementStyle(placement as NotificationPlacement, theme, isMobile()) }}>
            {sortedNotifications.map((notification) => {
              const { key, ...notificationConfig } = notification;
              if (!key) return null;
              return (
                <Notification
                  key={key}
                  ref={(ref) => { if (ref) notificationRefs.current.set(key, { current: ref }); else notificationRefs.current.delete(key); }}
                  {...notificationConfig}
                  onClose={() => handleNotificationClose(key)}
                  onClick={() => handleNotificationClick(key)}
                />
              );
            })}
          </View>
        );
      });
    };

    return (
      <View className={getContainerClassName()} style={getContainerStyle()} {...a11y.getAriaAttributes()}>
        {renderNotificationsByPlacement()}
      </View>
    );
  },
});

export default NotificationManager;