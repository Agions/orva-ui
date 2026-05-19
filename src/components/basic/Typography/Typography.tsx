/**
 * 排版组件 (Typography)
 * @module components/basic/Typography
 * @description 用于展示文本内容的排版组件，支持标题、段落、文本等类型，以及丰富的样式定制
 * @example
 * ```tsx
 * import { Typography } from 'orva-ui';
 *
 * <Typography.Title level={1}>标题一</Typography.Title>
 * <Typography.Paragraph>段落内容</Typography.Paragraph>
 * <Typography.Text>普通文本</Typography.Text>
 * ```
 */

import React, { useState, useCallback, useImperativeHandle } from 'react';
import { Text as TaroText, View, Input, Button } from '@tarojs/components';
import { TypographyProps, TypographyRef, TitleProps, ParagraphProps, TypographyTextProps } from './Typography.types';
import type { BaseProps } from '@/types/component';
import { calculateTypographyStyles } from './Typography.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { createLogger } from '@/utils/logger';

// 扩展 Typography 组件类型，包含子组件
const logger = createLogger('Typography');

export interface TypographyComponent
  extends React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<TypographyRef>> {
  Title: React.ForwardRefExoticComponent<TitleProps & React.RefAttributes<TypographyRef>>;
  Paragraph: React.ForwardRefExoticComponent<ParagraphProps & React.RefAttributes<TypographyRef>>;
  Text: React.ForwardRefExoticComponent<TypographyTextProps & React.RefAttributes<TypographyRef>>;
}

/**
 * Typography 排版组件
 * 提供丰富的文本排版功能，包括标题、段落、文本、链接等
 */
export const Typography = createComponent<TypographyProps, TypographyRef>({
  name: 'Typography',
  render: (props, ref) => {
    const {
      children,
      variant = 'p',
      type,
      align,
      disabled = false,
      copyable = false,
      editable = false,
      delete: isDelete = false,
      underline = false,
      code = false,
      keyboard = false,
      strong = false,
      italic = false,
      className,
      style,
      onClick,
      onCopy,
      onEdit,
      ...restProps
    } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const animation = useMicroAnimation({ type: 'micro', enabled: copyable || editable });
    const a11y = useAccessibility({
      role: variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4' || variant === 'h5' || variant === 'h6'
        ? ARIA_ROLES.heading
        : variant === 'p' ? ARIA_ROLES.paragraph : ARIA_ROLES.text,
      focusable: copyable || editable,
    });

    // 处理复制功能
    const handleCopy = useCallback(async () => {
      try {
        const text = typeof children === 'string' ? children : String(children);
        await navigator.clipboard.writeText(text);
        onCopy?.();
      } catch (error) {
        logger.error('Failed to copy text:', error);
      }
    }, [children, onCopy]);

    // 处理编辑功能
    const handleEdit = useCallback(() => {
      const text = typeof children === 'string' ? children : String(children);
      setEditText(text);
      setIsEditing(true);
    }, [children]);

    // 处理编辑完成
    const handleEditComplete = useCallback(() => {
      onEdit?.(editText);
      setIsEditing(false);
      setEditText('');
    }, [editText, onEdit]);

    // 处理编辑取消
    const handleEditCancel = useCallback(() => {
      setIsEditing(false);
      setEditText('');
    }, []);

    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
      getText: () => typeof children === 'string' ? children : String(children),
      copy: handleCopy,
      edit: (text: string) => {
        setEditText(text);
        setIsEditing(true);
      },
    }));

    // 计算样式
    const styles = calculateTypographyStyles(props);

    // 处理点击事件
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (copyable) {
          e.preventDefault();
          handleCopy();
        } else if (editable) {
          e.preventDefault();
          handleEdit();
        } else {
          onClick?.(e);
        }
      },
      [copyable, editable, handleCopy, handleEdit, onClick],
    );

    // 渲染编辑状态
    if (isEditing) {
      return (
        <View style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Input
            type="text"
            value={editText}
            onInput={(e) => setEditText(e.detail.value)}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: styles.fontSize,
              fontFamily: styles.fontFamily,
            }}
            autoFocus
          />
          <Button
            onClick={handleEditComplete}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            确定
          </Button>
          <Button
            onClick={handleEditCancel}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            取消
          </Button>
        </View>
      );
    }

    // 根据变体渲染不同的元素
    const renderContent = () => {
      const commonProps = {
        style: animation.getMergedStyle(styles),
        className,
        onClick: handleClick,
        ...a11y.getAriaAttributes(),
        ...restProps,
      };
      return <TaroText {...commonProps}>{children}</TaroText>;
    };

    return (
      <>
        {renderContent()}
        {copyable && (
          <TaroText
            style={{
              marginLeft: '8px',
              fontSize: '12px',
              color: '#6b7280',
              cursor: 'pointer',
            }}
            onClick={handleCopy}
          >
            📋
          </TaroText>
        )}
        {editable && (
          <TaroText
            style={{
              marginLeft: '8px',
              fontSize: '12px',
              color: '#6b7280',
              cursor: 'pointer',
            }}
            onClick={handleEdit}
          >
            ✏️
          </TaroText>
        )}
      </>
    );
  },
});

// Title 子组件
const Title = createComponent<any, TypographyRef>({
  name: 'Typography.Title',
  render: (props, ref) => {
    const { level = 1, children, ...restProps } = props as TitleProps;
    let variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    if (typeof level === 'string') {
      variant = level as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    } else {
      variant = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }
    return (
      <Typography ref={ref} variant={variant} {...restProps}>
        {children}
      </Typography>
    );
  },
});

// Paragraph 子组件
const Paragraph = createComponent<any, TypographyRef>({
  name: 'Typography.Paragraph',
  render: (props, ref) => {
    return (
      <Typography ref={ref} variant="p" {...props as ParagraphProps}>
        {(props as ParagraphProps).children}
      </Typography>
    );
  },
});

// Text 子组件
const Text = createComponent<any, TypographyRef>({
  name: 'Typography.Text',
  render: (props, ref) => {
    return (
      <Typography ref={ref} variant="span" {...props as TypographyTextProps}>
        {(props as TypographyTextProps).children}
      </Typography>
    );
  },
});

// 将子组件附加到 Typography 组件上
(Typography as TypographyComponent).Title = Title;
(Typography as TypographyComponent).Paragraph = Paragraph;
(Typography as TypographyComponent).Text = Text;

export default Typography as TypographyComponent;