/**
 * [ComponentName] 组件
 * 
 * @description 专业的[FormType]组件，遵循 orva-ui 设计规范
 * @author orva-ui team
 * @version 1.0.0
 */

import { useMemo, useCallback } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

// === 导入依赖 ===
import { createComponent } from '../../utils/createComponent';
import { useTheme } from '../../hooks/ui/useTheme';
import { useMicroAnimation } from '../../hooks/ui/useMicroAnimation';
import type { BaseProps } from '../../types/component';

// === 类型定义 ===
export interface [ComponentName]Props extends BaseProps {
  /**
   * 输入值
   */
  value?: string | number;
  /**
   * 默认值
   */
  defaultValue?: string | number;
  /**
   * 占位符文本
   */
  placeholder?: string;
  /**
   * 是否禁用状态
   */
  disabled?: boolean;
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
   * 变化回调
   */
  onChange?: (value: string) => void;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
}

// === 主组件实现 ===
export const [ComponentName] = createComponent<[ComponentName]Props>({
  name: '[ComponentName]',
  
  defaultProps: {
    disabled: false,
    required: false,
  },
  
  render: (props) => {
    const {
      value,
      defaultValue = '',
      placeholder = '请输入...',
      disabled = false,
      required = false,
      error,
      helpText,
      onChange,
      style,
      ...rest
    } = props;

    // === 获取主题和动画 ===
    const { theme } = useTheme();
    const animation = useMicroAnimation({
      type: 'input',
      enabled: !disabled,
    });

    // === 计算样式 ===
    const baseStyle: ViewStyle = useMemo(() => ({
      backgroundColor: theme.colors.surface,
      borderColor: error ? theme.colors.error : theme.colors.border,
      color: disabled ? theme.colors.textSecondary : theme.colors.text,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      fontSize: theme.typography.fontSize.base,
      minHeight: 44,
      ...style,
    }), [theme, error, disabled, style]);

    const handleChange = useCallback((newValue: string) => {
      if (!disabled && onChange) {
        onChange(newValue);
      }
    }, [disabled, onChange]);

    return (
      <View>
        {/* 基础输入框 */}
        <Input
          value={value || defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          onChangeText={handleChange}
          style={animation.getMergedStyle(baseStyle)}
          {...rest}
        />
        
        {/* 错误提示 */}
        {error && (
          <Text style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.error,
            marginTop: theme.spacing.xs,
          }}>
            {error}
          </Text>
        )}
        
        {/* 帮助文本 */}
        {helpText && !error && (
          <Text style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.xs,
          }}>
            {helpText}
          </Text>
        )}
      </View>
    );
  },
});

export default [ComponentName];
