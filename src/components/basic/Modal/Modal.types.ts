/**
 * Modal 模态框组件类型定义
 * @module components/basic/Modal/Modal.types
 */

import type { BaseProps, ChildrenProps } from '@/types/component';

/** Modal 属性 */
export interface ModalProps extends BaseProps, ChildrenProps {
  /** 是否可见 */
  visible: boolean;
  
  /** 标题 */
  title?: string;
  
  /** 是否显示关闭按钮 */
  closable?: boolean;
  
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  
  /** 是否显示底部操作栏 */
  showFooter?: boolean;
  
  /** 是否居中显示 */
  centered?: boolean;
  
  /** 宽度 */
  width?: number | string;
  
  /** z-index */
  zIndex?: number;
  
  /** 取消回调 */
  onCancel?: () => void;
  
  /** 确认回调 */
  onConfirm?: () => void;
  
  /** 自定义底部内容 */
  footer?: React.ReactNode;
  
  /** 确认按钮文本 */
  confirmText?: string;
  
  /** 取消按钮文本 */
  cancelText?: string;
  
  /** 是否加载中 */
  loading?: boolean;
  
  /** 是否可聚焦 */
  focusable?: boolean;
  
  /** Tab 键顺序 */
  tabIndex?: number;
}

/** Modal Ref */
export interface ModalRef {
  /** 打开模态框 */
  open: () => void;
  /** 关闭模态框 */
  close: () => void;
  /** 获取模态框 DOM 元素 */
  getContainer: () => HTMLDivElement | null;
}
