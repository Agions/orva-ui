/**
 * Button 组件
 * 
 * @description 专业的[ComponentType]组件，遵循 orva-ui 设计规范
 * @author orva-ui team
 * @version 1.0.0
 */

import { useMemo, useCallback } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

// === 导入依赖 ===
import { createComponent } from '../../utils/createComponent';
import { useTheme } from '../../hooks/ui/useTheme';
import { useMicroAnimation } from '../../hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '../../hooks/ui/useAccessibility';
import type { BaseProps } from '../../types/component';
import type { AccessibilityProps } from '../../types/accessibility';

// === 类型定义 ===
export interface ButtonProps extends BaseProps {
  /**
   * 是否禁用状态
   */
  disabled?: boolean;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 自定义样式
   */
  style?: ViewStyle;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

// === 主组件实现 ===
export const Button = createComponent<ButtonProps & AccessibilityProps>({
  name: 'Button',
  
  defaultProps: {
    disabled: false,
    loading: false,
    focusable: true,
    tabIndex: 0,
  },
  
  render: (props) => {
    const {
      disabled = false,
      loading = false,
      children,
      style,
      ariaLabel,
      onKeyDown,
      ...rest
    } = props;

    // === 获取主题和交互状态 ===
    const { theme } = useTheme();
    const animation = useMicroAnimation({
      type: 'button', // 根据组件类型调整
      enabled: !disabled && !loading,
    });
    
    const { handleKeyDown, getAriaAttributes } = useAccessibility({
      ariaLabel,
      onKeyDown,
      role: ARIA_ROLES.button, // 根据组件类型调整
      focusable: !disabled,
    });

    // === 计算基础样式 ===
    const baseStyle: ViewStyle = useMemo(() => ({
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 44, // 可点击区域最小高度
      ...style,
    }), [theme, style]);

    // === 处理点击事件 ===
    const handlePress = useCallback(() => {
      if (!disabled && !loading) {
        // TODO: 添加组件特定的业务逻辑
        console.log('Button pressed');
      }
    }, [disabled, loading]);

    // === 渲染内容 ===
    return (
      <View
        style={animation.getMergedStyle(baseStyle)}
        onClick={handlePress}
        {...getAriaAttributes()}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children || (
          <Text style={{ color: theme.colors.text }}>
            Button
          </Text>
        )}
      </View>
    );
  },
});

// === 默认导出 ===
export default Button;
