/**
 * Text 文本组件
 * @module components/basic/Text
 * @description 功能强大的文本渲染组件，支持多种样式、排版、对齐、链接、复制、选择等功能。
 * 提供丰富的文本样式控制，包括尺寸、颜色、加粗、斜体、下划线、删除线、溢出省略等。
 * 支持无障碍属性、微交互动画和安全过滤。
 *
 * @example
 * ```tsx
 * <Text size="lg" weight="bold">大号加粗文本</Text>
 * <Text color="primary" decoration="underline">下划线文本</Text>
 * <Text href="https://example.com" target="_blank">链接文本</Text>
 * <Text copyable>可复制的文本</Text>
 * <Text selectable>可选择的文本</Text>
 * ```
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text as TaroText, View } from '@tarojs/components';
import { textStyles } from './Text.styles';
import type { TextProps, TextRef } from './Text.types';
import { useSecurity } from '../../../providers/SecurityProvider';
import { useThemeContext as useTheme } from '../../../providers/ThemeProvider';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { createLogger } from '../../../utils/logger';

/**
 * Text 文本组件
 * @description 基于 createComponent 构建的功能强大的文本组件，支持丰富的样式、交互和安全特性。
 *
 * @param props - 文本属性
 * @param ref - 引用转发对象
 * @returns 文本 JSX 元素
 */
const logger = createLogger('Text');

export const Text = createComponent<TextProps, TextRef>({
  name: 'Text',
  render: (props, ref) => {
    const {
      children,
      size = 'md',
      weight = 'normal',
      color = 'inherit',
      align = 'left',
      decoration = 'none',
      transform = 'none',
      overflow = 'clip',
      direction = 'ltr',
      fontStyle = 'normal',
      variant = 'normal',
      letterSpacing = 'normal',
      lineHeight = 'normal',
      status = 'normal',
      type = 'body',
      clickable = false,
      loading = false,
      disabled = false,
      block = false,
      inlineBlock = false,
      selectable = false,
      copyable = false,
      onCopy,
      className,
      onClick,
      style,
      maxLines,
      animated = false,
      animationDuration = 300,
      href,
      target = '_self',
      underline = false,
      strikethrough = false,
      highlight = false,
      highlightColor = '#fef3c7',
      ellipsis = false,
      wrap = true,
      breakWord = false,
      textShadow,
      textOutline,
      gradient,
      fontFamily,
      wordSpacing,
      textIndent,
      whiteSpace,
      verticalAlign,
      writingMode,
      textRendering,
      ariaLabel,
      role = 'text',
      dangerouslySetInnerHTML,
      suppressContentEditableWarning,
      suppressHydrationWarning,
      ...restProps
    } = props;

    const { sanitizeInput } = useSecurity();
    const { isDark } = useTheme();
    const textRef = useRef<HTMLParagraphElement | HTMLSpanElement>(null);
    const [internalStatus, setInternalStatus] = useState(status);
    const [internalLoading, setInternalLoading] = useState(loading);
    const [internalDisabled, setInternalDisabled] = useState(disabled);
    const [isCopied, setIsCopied] = useState(false);
    const animation = useMicroAnimation({ type: 'micro', enabled: clickable as any && !disabled });
    const a11y = useAccessibility({
      role: href ? ARIA_ROLES.link : ARIA_ROLES.text,
      focusable: clickable && !disabled,
      label: ariaLabel,
    });

    const sanitizedChildren = typeof children === 'string' ? sanitizeInput(children) : children;

    // 更新内部状态
    useEffect(() => { setInternalStatus(status); }, [status]);
    useEffect(() => { setInternalLoading(loading); }, [loading]);
    useEffect(() => { setInternalDisabled(disabled); }, [disabled]);

    // 处理点击事件
    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (internalDisabled || internalLoading || !clickable) return;
        if (href) {
          if (target === '_blank') {
            window.open(href, '_blank');
          } else {
            window.location.href = href;
          }
        }
        onClick?.(event);
      },
      [onClick, href, target, internalDisabled, internalLoading, clickable],
    );

    // 处理复制功能
    const handleCopy = useCallback(async () => {
      if (!copyable || !textRef.current) return;
      try {
        const text = textRef.current.textContent || '';
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        onCopy?.();
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        logger.error('Failed to copy text:', error);
      }
    }, [copyable, onCopy]);

    // 处理选择功能
    const handleSelect = useCallback(() => {
      if (!selectable || !textRef.current) return;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }, [selectable]);

    // 渲染加载状态
    const renderLoading = () => {
      return <View className="orva-ui-text__loading" style={textStyles['getLoadingStyle']()} />;
    };

    // 渲染复制按钮
    const renderCopyButton = () => {
      if (!copyable) return null;
      return (
        <View
          className="orva-ui-text__copy-button"
          onClick={handleCopy}
          style={{
            marginLeft: '8px',
            cursor: 'pointer',
            opacity: isCopied ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {isCopied ? '✓' : '📋'}
        </View>
      );
    };

    // 计算最终样式
    const baseStyleProps = {
      size, weight, color, align, decoration, transform, overflow, direction,
      fontStyle, variant, letterSpacing, lineHeight, status: internalStatus,
      loading: internalLoading, disabled: internalDisabled, animated,
      animationDuration, underline, strikethrough, highlight, highlightColor,
      ellipsis, wrap, breakWord, style: style ?? {},
    };

    const optionalStyleProps = {
      ...(maxLines !== undefined && { maxLines }),
      ...(textShadow !== undefined && { textShadow }),
      ...(textOutline !== undefined && { textOutline }),
      ...(gradient !== undefined && { gradient }),
      ...(fontFamily !== undefined && { fontFamily }),
      ...(wordSpacing !== undefined && { wordSpacing }),
      ...(textIndent !== undefined && { textIndent }),
      ...(whiteSpace !== undefined && { whiteSpace }),
      ...(verticalAlign !== undefined && { verticalAlign }),
      ...(writingMode !== undefined && { writingMode }),
      ...(textRendering !== undefined && { textRendering }),
    };

    const getStyleProps = { ...baseStyleProps, ...optionalStyleProps } as Partial<TextProps>;
    const textStyle = textStyles['getStyle'](getStyleProps);

    // 计算最终类名
    const textClassName =
      textStyles['getClassName']({
        size, weight, color, align, decoration, transform, overflow, direction,
        fontStyle, variant, letterSpacing, lineHeight, status: internalStatus,
        type, clickable, loading: internalLoading, disabled: internalDisabled,
        block, inlineBlock, selectable, copyable, animated, underline, strikethrough,
        highlight, ellipsis, wrap, breakWord, className: className ?? '',
      }) + ` ${isDark ? 'dark' : 'light'}`;

    // 选择渲染元素
    const TextElement = href ? 'a' : block ? 'div' : inlineBlock ? 'span' : TaroText;

    // 暴露给外部的引用方法
    React.useImperativeHandle(
      ref,
      () => ({
        element: textRef.current,
        getText: () => textRef.current?.textContent || '',
        setText: (text: string) => {
          if (textRef.current) { textRef.current.textContent = text; }
        },
        copy: async () => {
          if (textRef.current) {
            const text = textRef.current.textContent || '';
            await navigator.clipboard.writeText(text);
          }
        },
        select: handleSelect,
        setDisabled: (disabled: boolean) => {
          setInternalDisabled(disabled);
          setInternalStatus(disabled ? 'disabled' : 'normal');
        },
        setLoading: (loading: boolean) => {
          setInternalLoading(loading);
          setInternalStatus(loading ? 'loading' : 'normal');
        },
        getStatus: () => internalStatus,
        getSize: () => size,
        getColor: () => color || '',
        setColor: (newColor: string) => {
          if (textRef.current) { textRef.current.style.color = newColor; }
        },
        setSize: (newSize: typeof size) => {
          if (textRef.current) {
            const sizeStyles = textStyles.SIZE_MAP[newSize];
            textRef.current.style.fontSize = `${sizeStyles['fontSize']}px`;
            textRef.current.style.lineHeight = `${sizeStyles._lineHeight}`;
          }
        },
        setWeight: (newWeight: typeof weight) => {
          if (textRef.current) {
            const weightValue = textStyles.WEIGHT_MAP[newWeight];
            textRef.current.style.fontWeight = String(weightValue);
          }
        },
        scrollIntoView: (options?: ScrollIntoViewOptions) => {
          textRef.current?.scrollIntoView(options);
        },
      }),
      [internalDisabled, internalLoading, internalStatus, size, color, weight, handleSelect],
    );

    // 处理链接属性
    const linkProps = href
      ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined }
      : {};

    const mergedStyle = animation.getMergedStyle(textStyle);

    return (
      <View className="orva-ui-text-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
        {internalLoading && renderLoading()}
        <TextElement
          ref={textRef as any}
          className={textClassName}
          style={mergedStyle}
          onClick={handleClick}
          selectable={selectable}
          aria-label={ariaLabel}
          role={role}
          {...a11y.getAriaAttributes()}
          {...linkProps}
          {...restProps}
        >
          {sanitizedChildren}
        </TextElement>
        {renderCopyButton()}
      </View>
    );
  },
});

export default Text;