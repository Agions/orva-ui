import React from 'react';
import { View, Text, Input } from '@tarojs/components';
import type { InputProps } from '@tarojs/components';
import { CascaderStyles } from '../Cascader.styles';
import type { CascaderOption, CascaderValue } from '../Cascader.types';

export interface CascaderMenuProps {
  open: boolean;
  options: CascaderOption[];
  expandedValues: CascaderValue[];
  selectedOptions: CascaderOption[];
  showSearch: boolean;
  showPath: boolean;
  pathSeparator: string;
  searchValue: string;
  popupStyle?: React.CSSProperties;
  popupClassName?: string;
  fields: {
    value: string;
    label: string;
    children: string;
    disabled: string;
    isLeaf: string;
  };
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode;
  optionRender?: (option: CascaderOption, index: number) => React.ReactNode;
  getOptionValue: (option: CascaderOption) => CascaderValue;
  getOptionLabel: (option: CascaderOption) => React.ReactNode;
  hasChildren: (option: CascaderOption) => boolean;
  isOptionDisabled?: (option: CascaderOption) => boolean | undefined;
  handleOptionClick: (option: CascaderOption, level: number) => void;
  handleInputChange: (event: Parameters<Required<InputProps>['onInput']>[0]) => void;
}

export const CascaderMenu: React.FC<CascaderMenuProps> = React.memo((props) => {
  const {
    open,
    options,
    expandedValues,
    selectedOptions,
    showSearch,
    showPath,
    pathSeparator,
    searchValue,
    popupStyle,
    popupClassName,
    fields,
    dropdownRender,
    optionRender,
    getOptionValue,
    getOptionLabel,
    hasChildren,
    isOptionDisabled,
    handleOptionClick,
    handleInputChange,
  } = props;

  const renderMenuItem = React.useCallback(
    (option: CascaderOption, level: number) => {
      const optionValue = getOptionValue(option);
      const optionLabel = getOptionLabel(option);
      const isSelected = selectedOptions[level] && getOptionValue(selectedOptions[level]!) === optionValue;
      const isExpanded = expandedValues.some((value) => value === optionValue);
      const optionHasChildren = hasChildren(option);

      const itemStyle = {
        ...CascaderStyles['getMenuItemStyle'](isOptionDisabled?.(option) ?? false, isSelected, isExpanded),
        ...(option.style || {}),
      };

      return (
        <View
          key={String(optionValue)}
          style={itemStyle}
          className={option.className}
          onClick={() => handleOptionClick(option, level)}
        >
          <Text>{optionRender ? optionRender(option, level) : optionLabel}</Text>
          {optionHasChildren && (
            <Text
              style={{
                ...CascaderStyles['getMenuItemExpandIconStyle'](),
                ...(isExpanded ? CascaderStyles['getMenuItemExpandIconRotatedStyle']() : {}),
              }}
            >
              ▶
            </Text>
          )}
          {option.loading && <Text style={CascaderStyles['getLoadingIconStyle']()}>⏳</Text>}
        </View>
      );
    },
    [
      selectedOptions,
      expandedValues,
      getOptionValue,
      getOptionLabel,
      hasChildren,
      isOptionDisabled,
      handleOptionClick,
      optionRender,
    ],
  );

  const renderMenuColumn = React.useCallback(
    (columnOptions: CascaderOption[], level: number) => {
      const columnStyle = {
        ...CascaderStyles['getMenuColumnStyle'](),
        ...(level === expandedValues.length ? CascaderStyles['getMenuColumnLastStyle']() : {}),
      };

      return (
        <View key={level} style={columnStyle}>
          {columnOptions.map((option) => renderMenuItem(option, level))}
          {columnOptions.length === 0 && (
            <View style={CascaderStyles['getEmptyStyle']()}>
              <Text>无数据</Text>
            </View>
          )}
        </View>
      );
    },
    [expandedValues.length, renderMenuItem],
  );

  if (!open) return null;

  // 获取当前显示的列
  const columns: CascaderOption[][] = [];
  let currentOptions = options;

  for (let i = 0; i <= expandedValues.length; i++) {
    if (currentOptions.length > 0) {
      columns.push(currentOptions);
    }

    if (i < expandedValues.length) {
      const levelValue = expandedValues[i];
      if (levelValue && levelValue.length > 0) {
        const optionValue = levelValue[levelValue.length - 1];
        const nextOption = currentOptions.find((opt: CascaderOption) => {
          const currentValue = getOptionValue(opt);
          return currentValue.length > 0 && currentValue[0] === optionValue;
        });

        if (nextOption && hasChildren(nextOption)) {
          currentOptions = nextOption[fields.children as keyof typeof nextOption] as CascaderOption[];
        } else {
          break;
        }
      } else {
        break;
      }
    } else {
      break;
    }
  }

  const menuContent = dropdownRender ? (
    dropdownRender(
      <View style={{ display: 'flex' }}>
        {columns.map((columnOptions, level) => renderMenuColumn(columnOptions, level))}
      </View>,
    )
  ) : (
    <View style={{ display: 'flex' }}>
      {columns.map((columnOptions, level) => renderMenuColumn(columnOptions, level))}
    </View>
  );

  const dropdownStyle = {
    ...CascaderStyles['getDropdownStyle'](),
    ...(popupStyle || {}),
  };

  return (
    <View style={dropdownStyle} className={popupClassName}>
      {showSearch && (
        <View style={CascaderStyles['getSearchStyle']()}>
          <Input
            style={CascaderStyles['getSearchInputStyle']()}
            value={searchValue}
            placeholder="搜索选项"
            onInput={handleInputChange}
            onFocus={(e) => e.stopPropagation()}
          />
        </View>
      )}
      {showPath && selectedOptions.length > 0 && (
        <View style={CascaderStyles['getPathStyle']()}>
          {selectedOptions.map((option, index) => (
            <React.Fragment key={index}>
              <Text style={CascaderStyles['getPathItemStyle']()}>{String(getOptionLabel(option))}</Text>
              {index < selectedOptions.length - 1 && (
                <Text style={CascaderStyles['getPathSeparatorStyle']()}>{pathSeparator}</Text>
              )}
            </React.Fragment>
          ))}
        </View>
      )}
      {menuContent}
    </View>
  );
});

CascaderMenu.displayName = 'CascaderMenu';
