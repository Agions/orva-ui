/**
 * 选择器组件 (Select)
 * @module components/basic/Select
 * @description 用于从列表中选择单个或多个选项的组件，支持单选、多选、搜索和虚拟滚动
 * @example
 * ```tsx
 * import { Select } from 'orva-ui';
 *
 * <Select
 *   options={[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }]}
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */

import { useCallback, useState, useMemo, useRef } from 'react';
import { View, Text } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { useAccessibility, ARIA_ROLES, type AccessibilityProps } from '@/hooks/ui/useAccessibility';
import type { SelectProps, SelectRef, SelectOption } from './Select.types';

// ==================== 尺寸映射（模块级常量） ====================
const SIZE_STYLES: Record<string, React.CSSProperties> = {
  xs: { fontSize: 12, padding: '4px 8px', height: 24 },
  sm: { fontSize: 14, padding: '6px 10px', height: 28 },
  md: { fontSize: 16, padding: '8px 12px', height: 34 },
  lg: { fontSize: 18, padding: '10px 14px', height: 40 },
};

// ==================== 主组件 ====================

export const Select = createComponent<SelectProps & AccessibilityProps, SelectRef>({
  name: 'Select',

  defaultProps: {
    size: 'md',
    disabled: false,
    placeholder: '请选择',
    multiple: false,
    clearable: false,
    searchable: false,
    border: true,
    focusable: true,
    tabIndex: 0,
  },

  render: (props) => {
    const {
      size = 'md',
      disabled = false,
      placeholder = '请选择',
      value,
      defaultValue,
      onChange,
      options = [],
      className = '',
      style,
      multiple = false,
      clearable = false,
      searchable = false,
      border = true,
      focusable = true,
      tabIndex = 0,
      ...rest
    } = props;

    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // 内部状态管理（非受控模式）
    const [internalValue, setInternalValue] = useState(defaultValue || (multiple ? [] : ''));
    const displayValue = value !== undefined ? value : internalValue;

    const { state: interactionState } = useInteractionState({
      disabledPress: disabled,
    });

    const { handleKeyDown: _handleKeyDown } = useAccessibility({
      focusable,
      tabIndex,
      role: ARIA_ROLES.combobox,
      expanded: isOpen,
    });

    const sizeStyle = SIZE_STYLES[size] ?? SIZE_STYLES.md;

    // 过滤选项
    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      return options.filter(opt => 
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    // 样式计算
    const selectStyle = useMemo(() => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      minWidth: 120,
      backgroundColor: disabled ? theme.colors.backgroundDisabled : theme.colors.background,
      border: border ? `1px solid ${interactionState.isFocused || isOpen ? theme.colors.primary : theme.colors.border}` : 'none',
      borderRadius: theme.borderRadius.md,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      color: disabled ? theme.colors.textDisabled : theme.colors.text,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease',
      ...(style || {}),
    }), [theme, disabled, interactionState.isFocused, isOpen, sizeStyle, border, style]);

    const handleToggle = useCallback(() => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    }, [disabled, isOpen]);

    const handleSelect = useCallback((option: SelectOption) => {
      if (multiple) {
        const currentValues = (displayValue as (string | number)[]) || [];
        const newValue = currentValues.includes(option.value)
          ? currentValues.filter(v => v !== option.value)
          : [...currentValues, option.value];
        onChange?.(newValue);
        if (value === undefined) {
          setInternalValue(newValue);
        }
      } else {
        onChange?.(option.value);
        if (value === undefined) {
          setInternalValue(option.value);
        }
        setIsOpen(false);
      }
    }, [multiple, displayValue, value, onChange]);

    const handleClear = useCallback(() => {
      onChange?.(multiple ? [] : '');
      if (value === undefined) {
        setInternalValue(multiple ? [] : '');
      }
    }, [multiple, value, onChange]);

    // 显示选中的值
    const displayLabel = useMemo(() => {
      if (multiple) {
        const selected = (displayValue as string[]).map(v => 
          options.find(opt => opt.value === v)?.label
        ).filter(Boolean);
        return selected.length > 0 ? selected.join(', ') : placeholder;
      }
      return options.find(opt => opt.value === displayValue)?.label || placeholder;
    }, [displayValue, options, placeholder, multiple]);

    return (
      <View
        ref={containerRef}
        style={selectStyle}
        className={className}
        onClick={handleToggle}
        {...(rest as Record<string, unknown>)}
      >
        <Text style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayLabel}
        </Text>
        
        {clearable && displayLabel !== placeholder && (
          <View onClick={(e) => { e.stopPropagation(); handleClear(); }} style={{ marginLeft: 8, cursor: 'pointer' }}>
            <Text>✕</Text>
          </View>
        )}
        
        <View style={{ marginLeft: 8 }}>
          <Text>{isOpen ? '▲' : '▼'}</Text>
        </View>
      </View>
    );
  },
});

Select.displayName = 'Select';

export default Select;
