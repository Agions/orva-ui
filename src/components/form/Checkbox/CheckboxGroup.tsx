import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { checkboxStyles } from './Checkbox.styles';
import type { CheckboxGroupProps, CheckboxGroupRef, CheckboxStatus } from './Checkbox.types';
import { Checkbox } from './Checkbox';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES, type ARIARole } from '@/hooks/ui/useAccessibility';

/**
 * 复选框组组件 (CheckboxGroup)
 * @module components/form/CheckboxGroup
 * @description 用于多选场景的复选框组组件，支持全选、数量限制和选项数组模式
 * @example
 * ```tsx
 * import { CheckboxGroup } from 'orva-ui';
 *
 * const options = [
 *   { label: '苹果', value: 'apple' },
 *   { label: '香蕉', value: 'banana' },
 *   { label: '橙子', value: 'orange' },
 * ];
 *
 * <CheckboxGroup
 *   options={options}
 *   defaultValue={['apple']}
 *   onChange={(values) => console.log(values)}
 * />
 * ```
 */
export const CheckboxGroup = createComponent<CheckboxGroupProps, CheckboxGroupRef>({
  name: 'CheckboxGroup',
  render: (props, ref) => {
    const {
      children,
      value: controlledValue,
      defaultValue = [],
      size = 'md',
      status: propStatus = 'normal',
      variant = 'default',
      color = 'primary',
      disabled = false,
      readonly = false,
      direction = 'horizontal',
      align = 'center',
      spacing = 8,
      options,
      onChange,
      onAllChange,
      maxCount,
      minCount,
      showSelectAll = false,
      selectAllText = '全选',
      showCount = false,
      countText = (_selected, _total) => `已选择 ${_selected} 项`,
      allowDeselectAll = true,
      compact = false,
      block = false,
      groupTitle,
      groupDescription,
      accessible = true,
      accessibilityLabel,
      accessibilityRole = 'group',
      accessibilityState,
      className,
      style,
    } = props;

    const groupRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useState<Array<string | number>>(defaultValue);
    const [internalStatus, setInternalStatus] = useState<CheckboxStatus>(propStatus);
    const [internalDisabled, setInternalDisabled] = useState(disabled);
    const [internalReadonly, setInternalReadonly] = useState(readonly);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    useEffect(() => { setInternalStatus(propStatus); }, [propStatus]);
    useEffect(() => { setInternalDisabled(disabled); }, [disabled]);
    useEffect(() => { setInternalReadonly(readonly); }, [readonly]);

    const groupState = useCallback(() => {
      const availableOptions = options?.filter((opt) => !opt.disabled) || [];
      const selectedValues = value.filter((val) => availableOptions.some((opt) => opt.value === val));
      return {
        allSelected: availableOptions.length > 0 && selectedValues.length === availableOptions.length,
        indeterminate: selectedValues.length > 0 && selectedValues.length < availableOptions.length,
        selectedCount: selectedValues.length,
        totalCount: availableOptions.length,
      };
    }, [value, options]);

    const handleCheckboxChange = useCallback(
      (checked: boolean, checkboxValue: string | number, _event: ITouchEvent) => {
        if (internalDisabled || internalReadonly) return;
        let newValue: Array<string | number>;
        if (checked) {
          newValue = [...value, checkboxValue];
          if (maxCount !== undefined && newValue.length > maxCount) return;
        } else {
          newValue = value.filter((val) => val !== checkboxValue);
          if (minCount !== undefined && newValue.length < minCount) return;
        }
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
      },
      [internalDisabled, internalReadonly, value, isControlled, maxCount, minCount, onChange],
    );

    const handleSelectAll = useCallback(
      (_event: ITouchEvent) => {
        if (internalDisabled || internalReadonly) return;
        const { allSelected } = groupState();
        const availableOptions = options?.filter((opt) => !opt.disabled) || [];
        let newValue: Array<string | number>;
        if (allSelected && allowDeselectAll) newValue = [];
        else if (!allSelected) newValue = availableOptions.map((opt) => opt.value);
        else return;
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
        onAllChange?.(!allSelected);
      },
      [internalDisabled, internalReadonly, groupState, options, isControlled, allowDeselectAll, onChange, onAllChange],
    );

    const isOptionSelected = useCallback((optionValue: string | number) => value.includes(optionValue), [value]);
    const isOptionDisabled = useCallback((optionValue: string | number) => {
      const option = options?.find((opt) => opt.value === optionValue);
      return internalDisabled || option?.disabled || false;
    }, [internalDisabled, options]);
    const isOptionReadonly = useCallback(() => internalReadonly, [internalReadonly]);

    const renderOptions = useCallback(() => {
      if (!options) return null;
      return options.map((option) => (
        <View key={option.value} style={checkboxStyles['getGroupItemStyle']({ direction, compact })}>
          <Checkbox
            value={option.value}
            checked={isOptionSelected(option.value)}
            disabled={isOptionDisabled(option.value)}
            readonly={isOptionReadonly()}
            size={size}
            status={internalStatus}
            variant={variant}
            color={option.color || color}
            label={option.label}
            icon={option.icon}
            onChange={(checked, event) => handleCheckboxChange(checked, option.value, event)}
            style={option.style}
            className={option.className}
            data={option.data}
          />
          {option.description && (
            <Text style={{ fontSize: (checkboxStyles.SIZE_MAP as Record<string, { fontSize: number; padding: number }>)[size].fontSize * 0.85, color: '#6b7280', marginLeft: (checkboxStyles.SIZE_MAP as Record<string, { fontSize: number; padding: number }>)[size].padding }}>
              {option.description}
            </Text>
          )}
        </View>
      ));
    }, [options, size, internalStatus, variant, color, isOptionSelected, isOptionDisabled, isOptionReadonly, handleCheckboxChange, direction, compact]);

    const animation = useMicroAnimation({ type: 'micro', enabled: !internalDisabled });
    const a11y = useAccessibility({
      role: 'group' as unknown as ARIARole,
      label: accessibilityLabel,
      attributes: {
        'aria-disabled': internalDisabled,
        'aria-readonly': internalReadonly,
        ...accessibilityState,
      },
    });

    React.useImperativeHandle(
      ref,
      () => ({
        getValue: () => value,
        setValue: (newValue) => { if (!isControlled) setInternalValue(newValue); },
        selectAll: () => {
          const availableOptions = options?.filter((opt) => !opt.disabled) || [];
          const newValue: Array<string | number> = availableOptions.map((opt) => opt.value);
          if (!isControlled) setInternalValue(newValue);
          onChange?.(newValue);
          onAllChange?.(true);
        },
        unselectAll: () => {
          if (!isControlled) setInternalValue([]);
          onChange?.([]);
          onAllChange?.(false);
        },
        toggleAll: () => {
          const { allSelected } = groupState();
          if (allSelected) {
            const newValue: Array<string | number> = [];
            if (!isControlled) setInternalValue(newValue);
            onChange?.(newValue);
            onAllChange?.(false);
          } else {
            const availableOptions = options?.filter((opt) => !opt.disabled) || [];
            const newValue: Array<string | number> = availableOptions.map((opt) => opt.value);
            if (!isControlled) setInternalValue(newValue);
            onChange?.(newValue);
            onAllChange?.(true);
          }
        },
        getCheckedCount: () => groupState().selectedCount,
        getTotalCount: () => groupState().totalCount,
        isAllSelected: () => groupState().allSelected,
        isIndeterminate: () => groupState().indeterminate,
        setDisabled: (newDisabled) => setInternalDisabled(newDisabled),
        setReadonly: (newReadonly) => setInternalReadonly(newReadonly),
        setStatus: (newStatus) => setInternalStatus(newStatus),
        validate: async () => {
          const { selectedCount } = groupState();
          if (minCount !== undefined && selectedCount < minCount) return { valid: false, message: `最少需要选择 ${minCount} 项` };
          if (maxCount !== undefined && selectedCount > maxCount) return { valid: false, message: `最多允许选择 ${maxCount} 项` };
          return { valid: true };
        },
        reset: () => { if (!isControlled) setInternalValue(defaultValue); setInternalStatus('normal'); },
        getSelectedOptions: () => options?.filter((opt) => value.includes(opt.value)) || [],
        getOptionByValue: (optionValue) => options?.find((opt) => opt.value === optionValue),
        setOptionDisabled: (_optionValue, _optionDisabled) => { /* set option disabled */ },
        setOptionsDisabled: (_optionValues, _optionDisabled) => { /* batch set */ },
        focus: () => { if (groupRef.current) groupRef.current.focus(); },
        blur: () => { if (groupRef.current) groupRef.current.blur(); },
      }),
      [value, isControlled, options, groupState, minCount, maxCount, defaultValue, onChange, onAllChange],
    );

    const { allSelected, indeterminate, selectedCount, totalCount } = groupState();

    const mergedStyle = animation.getMergedStyle({
      ...checkboxStyles['getGroupStyle']({ direction, align, spacing, compact, block, style }),
      width: block ? '100%' : 'auto',
    });

    return (
      <View ref={groupRef} style={mergedStyle} className={className} accessible={accessible} aria-label={accessibilityLabel} aria-role={accessibilityRole} role={accessibilityRole} {...a11y.getAriaAttributes()}>
        {groupTitle && (
          <Text style={{ fontSize: (checkboxStyles.SIZE_MAP as Record<string, { fontSize: number; padding: number }>)[size].fontSize * 1.2, fontWeight: 'bold', color: '#374151', marginBottom: 8 }}>{groupTitle}</Text>
        )}
        {groupDescription && (
          <Text style={{ fontSize: (checkboxStyles.SIZE_MAP as Record<string, { fontSize: number; padding: number }>)[size].fontSize * 0.9, color: '#6b7280', marginBottom: 12 }}>{groupDescription}</Text>
        )}
        {showSelectAll && options && options.length > 0 && (
          <View style={checkboxStyles['getSelectAllStyle']({ size, disabled: internalDisabled || internalReadonly })} onClick={handleSelectAll}>
            <Checkbox checked={allSelected} indeterminate={indeterminate} disabled={internalDisabled || internalReadonly} size={size} onChange={() => {}} />
            <Text style={{ marginLeft: 8 }}>{selectAllText}</Text>
          </View>
        )}
        {options && options.length > 0 ? (
          <View style={{ display: 'flex', flexDirection: direction === 'horizontal' ? 'row' : 'column', flexWrap: 'wrap' }}>
            {renderOptions()}
          </View>
        ) : (
          children
        )}
        {showCount && <Text style={checkboxStyles['getCountStyle']({ size })}>{countText(selectedCount, totalCount)}</Text>}
      </View>
    );
  },
});

export default CheckboxGroup;