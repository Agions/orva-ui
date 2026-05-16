import type { BaseProps } from '@/types/component';

/**
 * RichText Component Types
 * 富文本展示组件类型定义
 */

export interface RichTextStyle {
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  lineHeight?: string | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export interface ParagraphStyle {
  spacing?: string | number;
  indent?: string | number;
}

export interface ImageStyle {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export interface Link {
  href: string;
  type?: 'internal' | 'external';
}

export interface RichTextNode {
  type: string;
  content: string | RichTextNode[];
  style?: RichTextStyle;
  imgProps?: { src: string; alt?: string };
  linkProps?: { href: string; type?: 'internal' | 'external' };
  listItems?: ListItem[];
  tableProps?: RichTextTable;
}

export interface ListItem {
  content: string | RichTextNode[];
  style?: RichTextStyle;
}

export interface TableCell {
  content: string | RichTextNode[];
  style?: RichTextStyle;
  colSpan?: number;
}

export interface TableRow {
  cells: TableCell[];
}

export interface RichTextTable {
  headers: TableCell[];
  rows: TableRow[];
}

export interface RichTextRef {
  getHeight: () => number;
  reset: () => void;
}

export interface RichTextProps extends BaseProps {
  /** 富文本内容（JSON字符串或节点数组） */
  content?: string | RichTextNode[];
  /** 最大宽度 */
  maxWidth?: string | number;
  /** 是否启用图片缩放 */
  enableImageZoom?: boolean;
  /** 是否启用链接点击 */
  enableLinkClick?: boolean;
  /** 自定义图片点击事件 */
  onImageClick?: (src: string) => void;
  /** 自定义链接点击事件 */
  onLinkClick?: (href: string, type: 'internal' | 'external') => boolean | void;
  /** 自定义样式配置 */
  customStyles?: {
    /** 全局文本样式 */
    text?: RichTextStyle;
    /** 段落样式 */
    paragraph?: ParagraphStyle;
    /** 标题样式 */
    heading?: {
      h1?: RichTextStyle;
      h2?: RichTextStyle;
      h3?: RichTextStyle;
      h4?: RichTextStyle;
      h5?: RichTextStyle;
      h6?: RichTextStyle;
    };
  };
}
