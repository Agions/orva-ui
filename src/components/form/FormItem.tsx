/**
 * FormItem 复合组件
 * 提供表单项的标准布局、标签、错误提示和帮助文本支持
 */

import { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import type { BaseProps } from '@/types/component';

export interface FormItemProps extends BaseProps {
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 错误消息
   */
  error?: string;
  /**
   * 帮助文本
   */
  helpText?: string;
  /**
   * 子元素
   */
  children: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 标签样式
   */
  labelStyle?: React.CSSProperties;
  /**
   * 错误文本样式
   */
  errorStyle?: React.CSSProperties;
  /**
   * 帮助文本样式
   */
  helpTextStyle?: React.CSSProperties;
}

export interface FormLabelProps extends BaseProps {
  /**
   * 标签文本
   */
  label: string;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export interface FormErrorProps extends BaseProps {
  /**
   * 错误消息
   */
  error: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export interface FormHelpProps extends BaseProps {
  /**
   * 帮助文本
   */
  text?: string;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

// ==================== FormItem 主组件 ====================

function FormItemComponent(props: FormItemProps) {
  const {
    label,
    required = false,
    error,
    helpText,
    children,
    style,
    labelStyle,
    errorStyle,
    helpTextStyle,
    ...rest
  } = props;

  const { theme } = useTheme();
  const spacing = theme.spacing;

  const containerStyle: React.CSSProperties = useMemo(() => ({
    marginBottom: spacing.lg,
    ...style,
  }), [spacing.lg, style]);

  return (
    <View style={containerStyle} {...rest}>
      {label && <FormLabel label={label} required={required} style={labelStyle} />}
      
      <View style={{ marginTop: label ? spacing.xs : 0 }}>
        {children}
      </View>

      {helpText && (
        <FormHelp text={helpText} style={helpTextStyle} />
      )}

      {error && (
        <FormError error={error} style={errorStyle} />
      )}
    </View>
  );
}

// ==================== FormLabel 组件 ====================

function FormLabelComponent(props: FormLabelProps) {
  const { label, required = false, style, ...rest } = props;

  const { theme } = useTheme();
  const spacing = theme.spacing;

  const labelStyle: React.CSSProperties = useMemo(() => ({
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    ...style,
  }), [theme.typography.fontSize.sm, theme.colors.text, theme.typography.fontWeight.medium, spacing.xs, style]);

  return (
    <View style={labelStyle} {...rest}>
      <Text style={{ color: theme.colors.text }}>
        {label}
        {required && (
          <Text style={{ color: theme.colors.error }}>*</Text>
        )}
      </Text>
    </View>
  );
}

// ==================== FormError 组件 ====================

function FormErrorComponent(props: FormErrorProps & { children?: React.ReactNode }) {
  const { error, style, children, ...rest } = props;

  const { theme } = useTheme();
  const spacing = theme.spacing;

  const errorStyle: React.CSSProperties = useMemo(() => ({
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error,
    marginTop: spacing.xs,
    lineHeight: 16,
    ...style,
  }), [theme.typography.fontSize.xs, theme.colors.error, spacing.xs, style]);

  return (
    <Text style={errorStyle} {...rest}>
      {children}
    </Text>
  );
}

// ==================== FormHelp 组件 ====================

function FormHelpComponent(props: FormHelpProps) {
  const { children, style, ...rest } = props;

  const { theme } = useTheme();
  const spacing = theme.spacing;

  const helpTextStyle: React.CSSProperties = useMemo(() => ({
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 16,
    ...style,
  }), [theme.typography.fontSize.xs, theme.colors.textSecondary, spacing.xs, style]);

  return (
    <Text style={helpTextStyle} {...rest}>
      {children}
    </Text>
  );
}

// ==================== 组件配置 ====================

export const FormItem = createComponent<FormItemProps>({
  name: 'FormItem',
  render: (props) => FormItemComponent(props),
});

// ==================== 便捷类型别名 ====================

export const FormLabel = FormLabelComponent;
export const FormError = FormErrorComponent;
export const FormHelp = FormHelpComponent;

// ==================== 默认导出 ====================

export default FormItem;
