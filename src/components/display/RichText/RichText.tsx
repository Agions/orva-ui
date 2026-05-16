import Taro from '@tarojs/taro';
import React, { useRef } from 'react';
import { View, Text, Image } from '@tarojs/components';
import type { RichTextProps, RichTextRef, RichTextNode } from './RichText.types';
import {
  BaseStyles,
  getHeadingStyle,
  getListStyle,
  mergeStyles,
  transformTextStyle,
  transformImageStyle,
} from './RichText.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** 处理链接点击 */
const handleLinkClick = (href: string, type: 'internal' | 'external' = 'external', onLinkClick?: RichTextProps['onLinkClick']) => {
  if (onLinkClick) {
    const shouldPrevent = onLinkClick(href, type);
    if (shouldPrevent) return;
  }
  if (type === 'external') {
    if (typeof Taro !== 'undefined' && typeof (Taro as any as { openUrl: (opts: { url: string }) => void }).openUrl === 'function') (Taro as any as { openUrl: (opts: { url: string }) => void }).openUrl({ url: href });
    else if (typeof Taro !== 'undefined') Taro.navigateTo({ url: href } as Parameters<typeof Taro.navigateTo>[0]);
    else window.open(href, '_blank');
  } else {
    if (typeof Taro !== 'undefined') Taro.navigateTo({ url: href });
    else window.location.href = href;
  }
};

/** 处理图片点击 */
const handleImageClick = (src: string, onImageClick?: RichTextProps['onImageClick']) => {
  onImageClick?.(src);
};

/** 渲染单个富文本节点 */
const renderNode = (node: RichTextNode, index: number, onLinkClick?: RichTextProps['onLinkClick'], onImageClick?: RichTextProps['onImageClick']) => {
  const mergedStyle = mergeStyles(getNodeBaseStyle(node.type), transformTextStyle(node.style));

  switch (node.type) {
    case 'text':
      return <Text key={`${node.type}-${index}`} style={mergeStyles(BaseStyles.text, mergedStyle)}>{node.content as string}</Text>;
    case 'p':
    case 'div':
      return (
        <View key={`${node.type}-${index}`} style={mergeStyles(BaseStyles.paragraph, mergedStyle)}>
          {Array.isArray(node.content) ? node.content.map((n, i) => renderNode(n, i, onLinkClick, onImageClick)) : node.content}
        </View>
      );
    case 'span':
      return (
        <Text key={`${node.type}-${index}`} style={mergeStyles(BaseStyles.inline, mergedStyle)}>
          {Array.isArray(node.content) ? node.content.map((n, i) => renderNode(n, i, onLinkClick, onImageClick)) : node.content}
        </Text>
      );
    case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
      return (
        <View key={`${node.type}-${index}`} style={mergeStyles(getHeadingStyle(node.type as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'), mergedStyle)}>
          {Array.isArray(node.content) ? node.content.map((n, i) => renderNode(n, i, onLinkClick, onImageClick)) : node.content}
        </View>
      );
    case 'img':
      return node.imgProps ? (
        <View key={`${node.type}-${index}`} style={mergeStyles(BaseStyles.image, transformImageStyle(node.imgProps), transformImageStyle(node.style))} onClick={() => handleImageClick(node.imgProps!.src, onImageClick)}>
          <Image src={node.imgProps!.src} mode="aspectFit" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
        </View>
      ) : null;
    case 'a':
      return node.linkProps ? (
        <Text key={`${node.type}-${index}`} style={mergeStyles(BaseStyles.link, mergedStyle)} onClick={() => handleLinkClick(node.linkProps!.href, node.linkProps!.type || 'external', onLinkClick)}>
          {Array.isArray(node.content) ? node.content.map((n, i) => renderNode(n, i, onLinkClick, onImageClick)) : node.content}
        </Text>
      ) : null;
    case 'ul':
      return (
        <View key={`${node.type}-${index}`} style={mergeStyles(getListStyle('ul'), mergedStyle)}>
          {node.listItems?.map((item, itemIndex) => (
            <View key={`li-${itemIndex}`} style={mergeStyles(BaseStyles.list.li, transformTextStyle(item.style))}>
              {Array.isArray(item.content) ? item.content.map((n, i) => renderNode(n, i, onLinkClick, onImageClick)) : item.content}
            </View>
          ))}
        </View>
      );
    case 'ol':
      return (
        <View key={`${node.type}-${index}`} style={mergeStyles(getListStyle('ol'), mergedStyle)}>
          {node.listItems?.map((item, itemIndex) => (
            <View key={`li-${itemIndex}`} style={mergeStyles(BaseStyles.list.li, transformTextStyle(item.style))}>
              {Array.isArray(item.content) ? item.content.map((n, i) => renderNode(n, i, onLinkClick, onImageClick)) : item.content}
            </View>
          ))}
        </View>
      );
    case 'table':
      return node.tableProps ? (
        <View key={`${node.type}-${index}`} style={mergedStyle}>
          <View style={BaseStyles.table.container}>
            {node.tableProps.headers.length > 0 && (
              <View style={{ display: 'flex', width: '100%' }}>
                {node.tableProps.headers.map((header, headerIndex) => (
                  <View key={`header-${headerIndex}`} style={mergeStyles(BaseStyles.table.header, transformTextStyle(header.style), { flex: header.colSpan || 1 })}>
                    {Array.isArray(header.content) ? header.content.map((n, i) => renderNode(n, i, onLinkClick, onImageClick)) : header.content}
                  </View>
                ))}
              </View>
            )}
            {node.tableProps.rows.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={{ display: 'flex', width: '100%' }}>
                {row.cells.map((cell, cellIndex) => (
                  <View key={`cell-${cellIndex}`} style={{ ...mergeStyles(BaseStyles.table.cell, transformTextStyle(cell.style)), flex: cell.colSpan || 1 }}>
                    {Array.isArray(cell.content) ? cell.content.map((n, i) => renderNode(n, i, onLinkClick, onImageClick)) : cell.content}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      ) : null;
    default:
      return null;
  }
};

const getNodeBaseStyle = (type: string) => {
  switch (type) {
    case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': return getHeadingStyle(type as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
    case 'ul': case 'ol': return getListStyle(type as 'ul' | 'ol');
    case 'p': return BaseStyles.paragraph;
    case 'span': return BaseStyles.inline;
    case 'img': return BaseStyles.image;
    case 'a': return BaseStyles.link;
    case 'table': return BaseStyles.table.container;
    default: return {};
  }
};

/**
 * RichText 富文本组件
 * @module components/display/RichText
 * @description 用于渲染富文本内容的组件，支持自定义节点、HTML 字符串、图片处理等功能。
 *
 * @example
 * ```tsx
 * <RichText nodes={nodes} />
 * <RichText html="<p>Hello</p>" />
 * ```
 */

/** 富文本组件 */
export const RichText = createComponent<RichTextProps, RichTextRef>({
  name: 'RichText',
  render: (props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const animation = useMicroAnimation({ type: 'micro', enabled: true });
    const a11y = useAccessibility({
      role: ARIA_ROLES.article,
      label: 'Rich Text',
    });

    const processContent = (content: string | RichTextNode[] | undefined): RichTextNode[] => {
      if (!content) return [];
      if (typeof content === 'string') {
        try { return JSON.parse(content) as RichTextNode[]; }
        catch { return [{ type: 'p', content }]; }
      }
      return content;
    };

    React.useImperativeHandle(
      ref,
      () => ({
        getHeight: () => containerRef.current?.offsetHeight || 0,
        reset: () => { /* reset logic */ },
      }),
      [],
    );

    const processedContent = processContent(props.content);
    const mergedStyle = animation.getMergedStyle(mergeStyles(BaseStyles.container, props.style, props.maxWidth ? { maxWidth: props.maxWidth } : {}));

    return (
      <View ref={containerRef} style={mergedStyle} className={props.className} {...a11y.getAriaAttributes()}>
        {processedContent.map((node, index) => renderNode(node, index, props.onLinkClick, props.onImageClick))}
      </View>
    );
  },
});

/** 带默认属性的富文本组件 */
const RichTextWithDefaults = (props: RichTextProps) => {
  const defaultProps: Partial<RichTextProps> = { enableImageZoom: true, enableLinkClick: true };
  return <RichText {...defaultProps} {...props} />;
};

export const RichTextWithDefaultsExport = RichTextWithDefaults;
export type { RichTextProps, RichTextRef, RichTextNode };
export default RichTextWithDefaults;