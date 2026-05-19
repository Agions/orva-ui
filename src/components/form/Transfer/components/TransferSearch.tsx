/**
 * Transfer 搜索组件 (TransferSearch)
 * @module components/form/Transfer/components/TransferSearch
 * @description Transfer 组件的搜索子组件，支持搜索过滤和自定义搜索渲染
 * @example
 * ```tsx
 * <TransferSearch
 *   direction="left"
 *   showSearch={true}
 *   searchValue=""
 *   onSearch={(dir, val) => console.log(dir, val)}
 * />
 * ```
 */

import React, { useCallback } from 'react';
import type { ITouchEvent } from '@tarojs/components';
import { View } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { Input } from '@/components/form/Input';
import { TransferStyles } from '../Transfer.styles';
import type { SearchRenderProps, TransferDirection } from '../Transfer.types';
import type { BaseProps } from '@/types/component';

interface TransferSearchProps extends BaseProps {
  /** 方向 */
  direction: TransferDirection;
  /** 是否显示搜索框 */
  showSearch: boolean;
  /** 搜索值 */
  searchValue: string;
  /** 搜索占位符 */
  searchPlaceholder: string;
  /** 搜索回调 */
  onSearch: (direction: TransferDirection, value: string) => void;
  /** 自定义搜索渲染 */
  searchRender?: (props: SearchRenderProps) => React.ReactNode;
  /** 是否禁用 */
  disabled: boolean;
}

/** Transfer搜索组件 */
export const TransferSearch = createComponent<TransferSearchProps>({
  name: 'TransferSearch',

  defaultProps: {
    direction: 'left',
    showSearch: false,
    searchValue: '',
    searchPlaceholder: '搜索',
    onSearch: () => {},
    searchRender: undefined,
    disabled: false,
  },

  render: (props, _ref) => {
    const { direction, showSearch, searchValue, searchPlaceholder, onSearch, searchRender, disabled } = props;

    // 处理搜索输入
    const handleSearchInput = useCallback(
      (value: string) => {
        onSearch(direction, value);
      },
      [direction, onSearch],
    );

    // 处理输入框聚焦
    const handleFocus = useCallback(() => {
      // Taro doesn't provide direct access to input element styling
      // Focus handling is handled by the native component
    }, []);

    // 处理输入框失焦
    const handleBlur = useCallback(() => {
      // Taro doesn't provide direct access to input element styling
      // Blur handling is handled by the native component
    }, []);

    // 如果不显示搜索框，返回null
    if (!showSearch) {
      return null;
    }

    // 使用自定义搜索渲染
    if (searchRender) {
      return (
        <View style={TransferStyles['getSearchStyle']() as React.CSSProperties}>
          {searchRender({
            placeholder: searchPlaceholder,
            value: searchValue,
            onChange: handleSearchInput,
            direction,
          })}
        </View>
      );
    }

    // 默认搜索渲染
    return (
      <View style={TransferStyles['getSearchStyle']() as React.CSSProperties}>
        <Input
          style={TransferStyles['getSearchInputStyle']() as React.CSSProperties}
          value={searchValue}
          placeholder={searchPlaceholder}
          onInput={(value: string, _event: ITouchEvent) => handleSearchInput(value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          aria-label={searchPlaceholder}
        />
      </View>
    );
  },
});

TransferSearch.displayName = 'TransferSearch';
