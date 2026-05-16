/**
 * Modal 模态框组件
 * @module components/basic/Modal
 * @description 基础 Modal 模态框组件，支持自定义标题、内容、操作按钮、关闭行为、遮罩层点击关闭、动画效果。
 *
 * @example
 * ```tsx
 * <Modal visible={visible} title="提示" onCancel={closeModal} onConfirm={handleConfirm}>
 *   确认要删除吗？
 * </Modal>
 * ```
 */

import { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { View, Text } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useAccessibility, ARIA_ROLES, type AccessibilityProps } from '@/hooks/ui/useAccessibility';
import type { ModalProps, ModalRef } from './Modal.types';

// ==================== 主组件 ====================

/**
 * Modal 模态框组件
 * @description 基于 createComponent 构建的模态框组件，支持显示/隐藏动画、自定义底部按钮、遮罩层点击关闭、可访问性支持。
 *
 * @param props - 模态框属性，类型为 ModalProps 与 AccessibilityProps 的组合
 * @param ref - 引用转发对象，类型为 ModalRef
 * @returns 模态框 JSX 元素
 *
 * @example
 * ```tsx
 * <Modal
 *   visible={isOpen}
 *   title="确认操作"
 *   confirmText="确认"
 *   cancelText="取消"
 *   onConfirm={handleConfirm}
 *   onCancel={handleCancel}
 * >
 *   <Text>是否确认执行此操作？</Text>
 * </Modal>
 * ```
 */
export const Modal = createComponent<ModalProps & AccessibilityProps, ModalRef>({
  name: 'Modal',

  defaultProps: {
    visible: false,
    title: '',
    closable: true,
    maskClosable: true,
    showFooter: true,
    centered: false,
    width: 400,
    zIndex: 1000,
    focusable: true,
    tabIndex: 0,
  },

  render: (props) => {
    const {
      visible = false,
      title = '',
      children,
      className = '',
      style,
      closable = true,
      maskClosable = true,
      showFooter = true,
      centered = false,
      width = 400,
      zIndex = 1000,
      onCancel,
      onConfirm,
      footer,
      confirmText = '确定',
      cancelText = '取消',
      loading = false,
      focusable = true,
      tabIndex = 0,
      ...rest
    } = props;

    const { theme } = useTheme();
    const [isAnimating, setIsAnimating] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const { state: interactionState } = useInteractionState({
      disabledPress: loading,
    });

    const { handleKeyDown: _handleKeyDown } = useAccessibility({
      focusable,
      tabIndex,
      role: ARIA_ROLES.dialog,
      'aria-modal': true,
    });

    // 显示/隐藏动画
    useEffect(() => {
      if (visible) {
        setIsAnimating(true);
      } else {
        setIsAnimating(false);
      }
    }, [visible]);

    // 样式计算
    const overlayStyle = useMemo(() => ({
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: centered ? 'center' : 'flex-start',
      justifyContent: 'center',
      zIndex,
      opacity: visible ? 1 : 0,
      transition: 'opacity 200ms ease',
      ...(style || {}),
    }), [visible, centered, zIndex, style]);

    const modalStyle = useMemo(() => ({
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      width: typeof width === 'number' ? `${width}px` : width,
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: theme.shadows.lg,
      transform: visible ? 'scale(1)' : 'scale(0.95)',
      opacity: visible ? 1 : 0,
      transition: 'all 200ms ease',
      outline: 'none',
    }), [visible, width, theme]);

    const handleMaskClick = useCallback(() => {
      if (maskClosable && !loading) {
        onCancel?.();
      }
    }, [maskClosable, loading, onCancel]);

    const handleClose = useCallback(() => {
      onCancel?.();
    }, [onCancel]);

    const handleConfirm = useCallback(() => {
      onConfirm?.();
    }, [onConfirm]);

    if (!visible && !isAnimating) {
      return null;
    }

    return (
      <View style={overlayStyle} onClick={handleMaskClick}>
        <View
          ref={modalRef}
          style={modalStyle}
          className={className}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          {...(rest as Record<string, unknown>)}
        >
          {/* 标题栏 */}
          {(title || closable) && (
            <View style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: `1px solid ${theme.colors.border}`,
            }}>
              <Text id="modal-title" style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
              }}>
                {title}
              </Text>
              
              {closable && (
                <View onClick={handleClose} style={{ cursor: 'pointer', padding: 4 }}>
                  <Text style={{ fontSize: 18, color: theme.colors.textSecondary }}>✕</Text>
                </View>
              )}
            </View>
          )}

          {/* 内容区 */}
          <View style={{ padding: '20px' }}>
            {children}
          </View>

          {/* 底部操作栏 */}
          {showFooter && (
            <View style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 12,
              padding: '16px 20px',
              borderTop: `1px solid ${theme.colors.border}`,
            }}>
              {footer || (
                <>
                  <View
                    onClick={onCancel}
                    style={{
                      padding: '8px 16px',
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${theme.colors.border}`,
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                      cursor: 'pointer',
                      fontSize: theme.typography.fontSize.md,
                    }}
                  >
                    {cancelText}
                  </View>
                  <View
                    onClick={handleConfirm}
                    style={{
                      padding: '8px 16px',
                      borderRadius: theme.borderRadius.md,
                      backgroundColor: theme.colors.primary,
                      color: '#fff',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.6 : 1,
                      fontSize: theme.typography.fontSize.md,
                    }}
                  >
                    {loading ? '处理中...' : confirmText}
                  </View>
                </>
              )}
            </View>
          )}
        </View>
      </View>
    );
  },
});

Modal.displayName = 'Modal';

export default Modal;
