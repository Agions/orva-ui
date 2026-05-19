import React, { forwardRef, useRef, useCallback, useMemo, useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import type { ITouchEvent, InputProps } from '@tarojs/components';
import { CascaderStyles } from './Cascader.styles';
import type { CascaderProps, CascaderRef, CascaderOption, CascaderValue } from './Cascader.types';
import { CascaderMenu } from './components/CascaderMenu';
import { useCascaderFieldNames } from './hooks/useCascaderFieldNames';
import { useCascaderOptions } from './hooks/useCascaderOptions';
import { useCascaderState } from './hooks/useCascaderState';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import { createLogger } from '@/utils/logger';

/**
 * 级联选择器组件 (Cascader)
 * @module components/form/Cascader
 * @description 用于选择多级分类数据的表单组件，支持单选和多选模式
 * @example
 * ```tsx
 * import { Cascader } from 'orva-ui';
 *
 * const options = [
 *   { label: '浙江', value: 'zhejiang', children: [
 *     { label: '杭州', value: 'hangzhou' },
 *     { label: '宁波', value: 'ningbo' }
 *   ]}
 * ];
 *
 * <Cascader
 *   options={options}
 *   placeholder="请选择城市"
 *   onChange={(value, selectedOptions) => console.log(value)}
 * />
 * ```
 */
const logger = createLogger('Cascader');

export const Cascader = createComponent<CascaderProps, CascaderRef>({
  name: 'Cascader',

  defaultProps: {
    options: [],
    placeholder: '请选择',
    disabled: false,
    readonly: false,
    allowClear: false,
    size: 'medium',
    status: 'default',
    variant: 'outlined',
    expandTrigger: 'click',
    direction: 'ltr',
    multiple: false,
    showSearch: false,
    bordered: true,
    inputReadOnly: false,
    maxTagCount: undefined,
    maxTagPlaceholder: undefined,
    popupStyle: undefined,
    popupClassName: undefined,
    suffixIcon: undefined,
    prefix: undefined,
    clearIcon: undefined,
    loading: false,
    showPath: false,
    pathSeparator: ' / ',
    changeOnSelect: false,
    fieldNames: undefined,
    loadData: undefined,
    filterOption: undefined,
    optionRender: undefined,
    dropdownRender: undefined,
    tagRender: undefined,
    displayRender: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onClear: undefined,
    onSelect: undefined,
    onDeselect: undefined,
    onExpand: undefined,
    onSearch: undefined,
    onDropdownVisibleChange: undefined,
    className: '',
    style: undefined,
    accessible: true,
    accessibilityLabel: undefined,
    accessibilityRole: 'combobox',
    accessibilityState: undefined,
  },

  render: (props, ref) => {
    const {
      options = [],
      placeholder = '请选择',
      disabled = false,
      readonly = false,
      allowClear = false,
      size = 'medium',
      status = 'default',
      variant = 'outlined',
      expandTrigger = 'click',
      direction = 'ltr',
      multiple = false,
      showSearch = false,
      bordered = true,
      inputReadOnly = false,
      maxTagCount,
      maxTagPlaceholder,
      popupStyle,
      popupClassName,
      suffixIcon,
      prefix,
      clearIcon,
      loading = false,
      showPath = false,
      pathSeparator = ' / ',
      changeOnSelect = false,
      fieldNames,
      loadData,
      filterOption,
      optionRender,
      dropdownRender,
      tagRender,
      displayRender,
      onFocus,
      onBlur,
      onClear,
      onSelect,
      onDeselect,
      onExpand,
      onSearch,
      onDropdownVisibleChange,
      className,
      style,
      accessible = true,
      accessibilityLabel,
      accessibilityRole = 'combobox',
      accessibilityState,
      ...restProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const fields = useCascaderFieldNames(fieldNames);
    const {
      findOptionPath,
      getOptionValue,
      getOptionLabel,
      hasChildren,
      isOptionDisabled,
      isOptionLeaf,
      filterOptions: filterOptionsUtil,
    } = useCascaderOptions(options, fieldNames);

    const state = useCascaderState(options, props as CascaderProps);
    const {
      value,
      open,
      selectedOptions,
      expandedValues,
      searchValue,
      setValue,
      setOpen,
      setSelectedOptions,
      setExpandedValues,
      setSearchValue,
      clearAll,
      reset,
      isControlled: _isControlled,
    } = state;

    // 内部状态
    const [internalDisabled, setInternalDisabled] = React.useState(disabled);
    const [internalReadonly, setInternalReadonly] = React.useState(readonly);
    const [focused, setFocused] = React.useState(false);
    const [_filteredOptions, setFilteredOptions] = useState<CascaderOption[]>([]);

    // 更新内部状态
    React.useEffect(() => {
      setInternalDisabled(disabled);
    }, [disabled]);

    React.useEffect(() => {
      setInternalReadonly(readonly);
    }, [readonly]);

    // 处理输入变化
    const handleInputChange = useCallback(
      (event: Parameters<Required<InputProps>['onInput']>[0]) => {
        const inputValue = event.detail.value;
        setSearchValue(inputValue);
        onSearch?.(inputValue);

        if (showSearch && inputValue) {
          const filtered = filterOptionsUtil(inputValue);
          setFilteredOptions(filtered);
        } else {
          setFilteredOptions([]);
        }
      },
      [showSearch, filterOptionsUtil, onSearch, setSearchValue],
    );

    // 处理选项点击
    const handleOptionClick = useCallback(
      (option: CascaderOption, level: number) => {
        if (isOptionDisabled(option) || internalDisabled || internalReadonly) return;

        const optionValue = getOptionValue(option);
        const newSelectedOptions = selectedOptions.slice(0, level);
        newSelectedOptions.push(option);

        setSelectedOptions(newSelectedOptions);

        // 处理展开
        const newExpandedValues = expandedValues.slice(0, level);
        newExpandedValues.push(optionValue);
        setExpandedValues(newExpandedValues);

        // 触发展开事件
        onExpand?.(newExpandedValues.flat(), newSelectedOptions);

        // 处理选择
        if (changeOnSelect || isOptionLeaf(option) || !hasChildren(option)) {
          setValue(newExpandedValues.flat(), newSelectedOptions);
          onSelect?.(newExpandedValues.flat(), newSelectedOptions);

          // 如果是叶子节点或者不是多选模式，关闭下拉框
          if (isOptionLeaf(option) || !multiple) {
            setOpen(false);
          }
        }

        // 处理异步加载
        if (loadData && !isOptionLeaf(option) && !hasChildren(option)) {
          loadData(newSelectedOptions).then(() => {
            // 加载完成后自动展开
            setExpandedValues(newExpandedValues.concat(optionValue));
          });
        }
      },
      [
        selectedOptions,
        expandedValues,
        internalDisabled,
        internalReadonly,
        changeOnSelect,
        multiple,
        loadData,
        setSelectedOptions,
        setExpandedValues,
        setValue,
        setOpen,
        onExpand,
        onSelect,
        getOptionValue,
        isOptionDisabled,
        isOptionLeaf,
        hasChildren,
      ],
    );

    // 处理清除
    const handleClear = useCallback(
      (event: ITouchEvent) => {
        event.stopPropagation();
        clearAll();
        onClear?.();
      },
      [clearAll, onClear],
    );

    // 处理聚焦
    const handleFocus = useCallback(
      (event: Parameters<Required<InputProps>['onFocus']>[0]) => {
        if (internalDisabled || internalReadonly) return;

        setFocused(true);
        setOpen(true);
        onFocus?.(event as any);
      },
      [internalDisabled, internalReadonly, setOpen, onFocus],
    );

    // 处理失焦
    const handleBlur = useCallback(
      (event: Parameters<Required<InputProps>['onBlur']>[0]) => {
        setFocused(false);
        onBlur?.(event as any);
      },
      [onBlur],
    );

    // 处理下拉框显示状态变化
    const handleDropdownVisibleChange = useCallback(
      (visible: boolean) => {
        if (internalDisabled || internalReadonly) return;
        setOpen(visible);
      },
      [internalDisabled, internalReadonly, setOpen],
    );



    // 格式化显示值
    const formatDisplayValue = useCallback(() => {
      if (!selectedOptions.length) return '';

      const labels = selectedOptions.map((option) => String(getOptionLabel(option)));

      if (displayRender) {
        return displayRender(labels, selectedOptions);
      }

      return CascaderStyles['formatDisplayValue'](labels, selectedOptions, { showPath, pathSeparator });
    }, [selectedOptions, displayRender, showPath, pathSeparator, getOptionLabel]);

    // 暴露给外部的引用方法
    React.useImperativeHandle(
      ref,
      () => ({
        input: inputRef.current,
        getValue: () => value,
        setValue: (newValue: CascaderValue | null) => {
          const newSelectedOptions = newValue ? findOptionPath(newValue) : [];
          setValue(newValue, newSelectedOptions);
        },
        getSelectedOptions: () => selectedOptions,
        setOptions: () => {
          // 选项通过props管理，这里提供兼容性
          logger.warn('setOptions is deprecated. Options should be managed through props.');
        },
        focus: () => {
          if (inputRef.current && !internalDisabled && !internalReadonly) {
            inputRef.current.focus();
          }
        },
        blur: () => {
          if (inputRef.current) {
            inputRef.current.blur();
          }
        },
        open: () => handleDropdownVisibleChange(true),
        close: () => handleDropdownVisibleChange(false),
        clear: () => {
          clearAll();
          onClear?.();
        },
        disable: () => setInternalDisabled(true),
        enable: () => setInternalDisabled(false),
        search: (searchTerm: string) => {
          setSearchValue(searchTerm);
          onSearch?.(searchTerm);
        },
        expandToPath: (path: CascaderValue) => {
          const foundPath = findOptionPath(path);
          if (foundPath.length > 0) {
            setSelectedOptions(foundPath);
            setExpandedValues([path]);
          }
        },
        reset: () => {
          reset();
        },
      }),
      [
        value,
        selectedOptions,
        internalDisabled,
        internalReadonly,
        handleDropdownVisibleChange,
        clearAll,
        onClear,
        onSearch,
        findOptionPath,
        setValue,
        setSelectedOptions,
        setExpandedValues,
        setSearchValue,
        reset,
      ],
    );

    // 生成输入框样式
    const getInputStyle = useMemo(() => {
      const baseStyle = {
        ...CascaderStyles['getInputStyle'](size, internalDisabled),
        ...(focused ? { borderColor: '#40a9ff', boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)' } : {}),
        ...(style || {}),
      };

      return baseStyle;
    }, [size, internalDisabled, focused, style]);

    // 生成容器样式
    const containerStyle = useMemo(
      () => ({
        ...CascaderStyles['getStyle']({
          size,
          variant,
          status,
          disabled: internalDisabled,
          readonly: internalReadonly,
          loading,
          style: {},
        }),
        ...style,
      }),
      [size, variant, status, internalDisabled, internalReadonly, loading, style],
    );

    // 生成输入框包装器样式
    const inputWrapperStyle = useMemo(
      () => ({
        position: 'relative' as const,
        display: 'flex' as const,
        alignItems: 'center' as const,
        ...CascaderStyles['getSizeStyle'](size),
      }),
      [size],
    );

    // 无障碍状态
    const finalAccessibilityState = useMemo(
      () => ({
        disabled: internalDisabled,
        readonly: internalReadonly,
        expanded: open,
        busy: loading,
        ...accessibilityState,
      }),
      [internalDisabled, internalReadonly, open, loading, accessibilityState],
    );

    return (
      <View
        style={containerStyle}
        className={CascaderStyles['getClassName']({
          size,
          variant,
          status,
          disabled: internalDisabled,
          readonly: internalReadonly,
          loading,
          className,
        })}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessibilityState={finalAccessibilityState}
        {...restProps}
      >
        <View style={inputWrapperStyle}>
          {prefix && <View style={{ position: 'absolute', left: '12px', zIndex: 1 }}>{prefix}</View>}

          <Input
            ref={inputRef}
            style={getInputStyle}
            value={String(formatDisplayValue())}
            placeholder={placeholder}
            disabled={internalDisabled || inputReadOnly || internalReadonly}
            onInput={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {allowClear && value && (
            <View style={CascaderStyles['getClearStyle']()} onClick={handleClear}>
              <Text>{clearIcon || '×'}</Text>
            </View>
          )}

          <View
            style={{
              ...CascaderStyles['getSuffixStyle'](),
              ...(open ? CascaderStyles['getSuffixExpandedStyle']() : {}),
            }}
          >
            {loading ? <Text style={CascaderStyles['getLoadingIconStyle']()}>⏳</Text> : <Text>{suffixIcon || '▼'}</Text>}
          </View>
        </View>

        {(() => {
          const _isOptionDisabled = ((opt: CascaderOption): boolean => Boolean(isOptionDisabled?.(opt))) as (option: CascaderOption) => boolean;
          return (
          <CascaderMenu
          open={open}
          options={options}
          expandedValues={expandedValues}
          selectedOptions={selectedOptions}
          showSearch={showSearch}
          showPath={showPath}
          pathSeparator={pathSeparator}
          searchValue={searchValue}
          popupStyle={popupStyle}
          popupClassName={popupClassName}
          fields={fields}
          dropdownRender={dropdownRender}
          optionRender={optionRender}
          getOptionValue={getOptionValue}
          getOptionLabel={getOptionLabel}
          hasChildren={hasChildren}
          isOptionDisabled={_isOptionDisabled} // @ts-expect-error
          handleOptionClick={handleOptionClick}
          handleInputChange={handleInputChange}
        />
          );
        })()}
      </View>
    );
  },
});

Cascader.displayName = 'Cascader';

export default Cascader;