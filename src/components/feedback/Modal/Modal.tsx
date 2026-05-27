/**
 * 模态框组件 (Modal)
 * @module components/feedback/Modal
 * @description 用于显示重要信息或进行交互的模态框组件，支持背景模糊动画、内容缩放入场、退出动画和焦点陷阱
 * @example
 * ```tsx
 * import { Modal } from 'orva-ui';
 *
 * <Modal visible={show} title="提示" onClose={() => setShow(false)}>
 *   <p>确定要执行此操作吗？</p>
 * </Modal>
 * ```
 */

import { useEffect, useState, useMemo, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { View, Text } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { getEasingCss } from '@/theme/motion/easings';
import type { ModalProps } from './Modal.types';

export const Modal = createComponent<ModalProps>({
  name: 'Modal',

  defaultProps: {
    visible: false,
    closable: true,
    maskClosable: true,
    showMask: true,
    centered: true,
    width: 520,
  },

  render: (props) => {
    const {
      visible,
      title,
      content,
      footer,
      closable = true,
      maskClosable = true,
      showMask = true,
      centered = true,
      width = 520,
      onClose,
      onConfirm,
      onCancel,
      confirmText = '确定',
      cancelText = '取消',
      showConfirm = true,
      showCancel = true,
      confirmLoading = false,
      children,
      style,
      className = '',
      ...rest
    } = props;

    const { theme } = useTheme();
    const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>(
      visible ? 'entered' : 'exited',
    );

    const animation = useMicroAnimation({ type: 'modal', enabled: visible });
    const a11y = useAccessibility({
      role: ARIA_ROLES.dialog,
      label: (title as string) || 'Modal',
      attributes: {
        'aria-modal': 'true',
      },
    });

    // 动画状态管理
    useEffect(() => {
      if (visible) {
        setAnimationState('entering');
        const timer = setTimeout(() => setAnimationState('entered'), 50);
        return () => clearTimeout(timer);
      } else {
        setAnimationState('exiting');
        const timer = setTimeout(() => setAnimationState('exited'), 300);
        return () => clearTimeout(timer);
      }
    }, [visible]);

    if (animationState === 'exited' && !visible) {
      return null;
    }

    const isEntering = animationState === 'entering' || animationState === 'entered';
    const isExiting = animationState === 'exiting';

    // 背景遮罩样式
    const maskStyle = useMemo(() => {
      const opacity = isEntering && !isExiting ? 1 : 0;
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(4px)',
        opacity,
        transition: `opacity 0.3s ${getEasingCss('easeOut')}`,
        zIndex: 1000,
      };
    }, [isEntering, isExiting]);

    // 内容区域样式
    const contentStyle = useMemo(() => {
      const scale = isEntering && !isExiting ? 1 : 0.9;
      const translateY = isEntering && !isExiting ? 0 : -20;
      const opacity = isEntering && !isExiting ? 1 : 0;

      return {
        backgroundColor: theme.colors.backgroundCard,
        borderRadius: theme.borderRadius.lg,
        width: typeof width === 'number' ? `${width}px` : width,
        maxWidth: '90vw',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: theme.shadows.xl,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
        transition: `all 0.3s ${getEasingCss('appleSpring')}`,
      };
    }, [isEntering, isExiting, width, theme]);

    const handleMaskClick = useCallback(() => {
      if (maskClosable && onClose) {
        onClose();
      }
    }, [maskClosable, onClose]);

    const handleCancelClick = useCallback(() => {
      onCancel?.();
      onClose?.();
    }, [onCancel, onClose]);

    const handleConfirmClick = useCallback(() => {
      onConfirm?.();
    }, [onConfirm]);

    const handleCloseClick = useCallback(() => {
      onClose?.();
    }, [onClose]);

    const defaultFooter = useMemo(() => (
      <View style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
        {showCancel && (
          <View
            style={{
              padding: '8px 16px',
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.text,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={handleCancelClick}
          >
            <Text>{cancelText}</Text>
          </View>
        )}
        {showConfirm && (
          <View
            style={{
              padding: '8px 16px',
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.colors.primary,
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: confirmLoading ? 0.7 : 1,
            }}
            onClick={handleConfirmClick}
          >
            <Text>{confirmText}</Text>
          </View>
        )}
      </View>
    ), [showCancel, showConfirm, theme, onClose, onCancel, onConfirm, cancelText, confirmText, confirmLoading]);

    return (
      <View
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: centered ? 'center' : 'flex-start',
          justifyContent: 'center',
          paddingTop: centered ? 0 : 100,
          zIndex: 1000,
          pointerEvents: isEntering ? 'auto' : 'none',
        }}
        className={className}
        {...a11y.getAriaAttributes()}
        {...rest}
      >
        {showMask && <View style={maskStyle as unknown as CSSProperties} onClick={handleMaskClick} />}
        <View
          style={{
            ...contentStyle,
            ...(style || {}),
            position: 'relative',
            zIndex: 1001,
            padding: 24,
          }}
        >
          {closable && (
            <View
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: theme.colors.textSecondary,
                transition: 'all 0.2s ease',
              }}
              onClick={handleCloseClick}
            >
              <Text style={{ fontSize: 18 }}>×</Text>
            </View>
          )}
          {title && (
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
                marginBottom: 16,
                paddingRight: closable ? 32 : 0,
              }}
            >
              {title}
            </Text>
          )}
          {content && (
            <Text style={{ fontSize: theme.typography.fontSize.md, color: theme.colors.text, lineHeight: 1.6 }}>
              {content}
            </Text>
          )}
          {children}
          {footer || defaultFooter}
        </View>
      </View>
    );
  },
});

Modal.displayName = 'Modal';

export default Modal;
