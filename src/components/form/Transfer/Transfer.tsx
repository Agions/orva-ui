import React, { useCallback } from 'react';
import { View } from '@tarojs/components';
import { TransferStyles } from './Transfer.styles';
import type { TransferProps, TransferRef, TransferOption, TransferDirection, TransferValue } from './Transfer.types';
import type { BaseProps } from '@/types/component';
import { useTransferState } from './hooks';
import { TransferList, TransferOperations } from './components';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { createLogger } from '@/utils/logger';

/**
 * 穿梭框组件 (Transfer)
 * @module components/form/Transfer
 * @description 用于在两个列表之间移动数据的表单组件，常用于权限分配或批量选择
 * @example
 * ```tsx
 * import { Transfer } from 'orva-ui';
 *
 * const dataSource = [
 *   { key: '1', title: '选项 1' },
 *   { key: '2', title: '选项 2' },
 *   { key: '3', title: '选项 3' },
 * ];
 *
 * <Transfer
 *   dataSource={dataSource}
 *   targetKeys={['1']}
 *   onChange={(targetKeys, direction) => console.log(targetKeys)}
 * />
 * ```
 */
const logger = createLogger('Transfer');

export const Transfer = createComponent<TransferProps & BaseProps, TransferRef>({
  name: 'Transfer',
  render: (props, ref) => {
    const {
      dataSource = [],
      targetKeys: controlledTargetKeys,
      defaultTargetKeys = [],
      selectedKeys: controlledSelectedKeys,
      defaultSelectedKeys = [],
      size = 'medium',
      status = 'default',
      layout = 'horizontal',
      disabled = false,
      showSearch = false,
      showSelectAll = true,
      showOperations = true,
      oneWay = false,
      pagination = false,
      operations = ['>', '<'],
      titles = ['源列表', '目标列表'],
      notFoundContent = '无数据',
      searchPlaceholder = '请搜索',
      filterOption,
      render,
      footer,
      optionRender,
      rowRender,
      searchRender,
      operationRender,
      emptyRender,
      onChange,
      onSelectChange,
      onSearch,
      onScroll,
      className,
      style,
      accessible = true,
      accessibilityLabel,
      accessibilityRole = 'application',
      accessibilityState,
      ...restProps
    } = props;

    const {
      targetKeys,
      selectedKeys,
      leftSelectedKeys,
      rightSelectedKeys,
      leftSearchValue,
      rightSearchValue,
      internalDisabled,
      leftPage,
      rightPage,
      updateTargetKeys,
      updateSelectedKeys,
      updateLeftRightSelectedKeys,
      setSearchValue,
      setPage,
      reset,
    } = useTransferState(controlledTargetKeys, defaultTargetKeys, controlledSelectedKeys, defaultSelectedKeys, disabled);

    const animation = useMicroAnimation({ type: 'micro', enabled: !internalDisabled });
    const a11y = useAccessibility({
      'aria-label': accessibilityLabel,
      role: ARIA_ROLES.application,
      'aria-disabled': internalDisabled,
      ...accessibilityState,
    });

    const handleItemClick = useCallback(
      (item: TransferOption, _direction: TransferDirection) => {
        if (item.disabled || internalDisabled) return;
        const itemKey = item.key;
        const newSelectedKeys = selectedKeys.includes(itemKey)
          ? selectedKeys.filter((key: string | number) => key !== itemKey)
          : [...selectedKeys, itemKey];
        updateSelectedKeys(newSelectedKeys);
        updateLeftRightSelectedKeys(newSelectedKeys, targetKeys);
        onSelectChange?.(
          newSelectedKeys.filter((key: string | number) => !targetKeys.includes(key)),
          newSelectedKeys.filter((key: string | number) => targetKeys.includes(key)),
        );
      },
      [selectedKeys, targetKeys, internalDisabled, updateSelectedKeys, updateLeftRightSelectedKeys, onSelectChange],
    );

    const handleSelectAll = useCallback(
      (direction: TransferDirection) => {
        if (internalDisabled) return;
        const sourceData = direction === 'left'
          ? dataSource.filter((item: TransferOption) => !targetKeys.includes(item.key))
          : dataSource.filter((item: TransferOption) => targetKeys.includes(item.key));
        const searchValue = direction === 'left' ? leftSearchValue : rightSearchValue;
        const filteredData = searchValue
          ? sourceData.filter((item: TransferOption) => {
              if (filterOption) return filterOption(searchValue, item);
              const searchText = searchValue.toLowerCase();
              const title = String(item.title).toLowerCase();
              const description = item.description ? String(item.description).toLowerCase() : '';
              return title.includes(searchText) || description.includes(searchText);
            })
          : sourceData;
        const enabledData = filteredData.filter((item: TransferOption) => !item.disabled);
        const currentSelectedKeys = direction === 'left' ? leftSelectedKeys : rightSelectedKeys;
        const allSelected = enabledData.every((item: TransferOption) => currentSelectedKeys.includes(item.key));
        const newSelectedKeys = allSelected
          ? selectedKeys.filter((key: string | number) => !enabledData.some((item: TransferOption) => item.key === key))
          : [...selectedKeys, ...enabledData.map((item: TransferOption) => item.key)];
        updateSelectedKeys(newSelectedKeys);
        updateLeftRightSelectedKeys(newSelectedKeys, targetKeys);
        onSelectChange?.(
          newSelectedKeys.filter((key: string | number) => !targetKeys.includes(key)),
          newSelectedKeys.filter((key: string | number) => targetKeys.includes(key)),
        );
      },
      [dataSource, targetKeys, leftSearchValue, rightSearchValue, leftSelectedKeys, rightSelectedKeys, selectedKeys, internalDisabled, filterOption, updateSelectedKeys, updateLeftRightSelectedKeys, onSelectChange],
    );

    const handleMove = useCallback(
      (direction: TransferDirection) => {
        if (internalDisabled) return;
        const moveKeys = direction === 'right' ? leftSelectedKeys : rightSelectedKeys;
        if (moveKeys.length === 0) return;
        const newTargetKeys = direction === 'right' ? [...targetKeys, ...moveKeys] : targetKeys.filter((key: string | number) => !moveKeys.includes(key));
        updateTargetKeys(newTargetKeys);
        const newSelectedKeys = selectedKeys.filter((key: string | number) => !moveKeys.includes(key));
        updateSelectedKeys(newSelectedKeys);
        updateLeftRightSelectedKeys(newSelectedKeys, newTargetKeys);
        onChange?.(newTargetKeys, direction, moveKeys);
        onSelectChange?.(
          newSelectedKeys.filter((key: string | number) => !newTargetKeys.includes(key)),
          newSelectedKeys.filter((key: string | number) => newTargetKeys.includes(key)),
        );
      },
      [targetKeys, leftSelectedKeys, rightSelectedKeys, selectedKeys, internalDisabled, updateTargetKeys, updateSelectedKeys, updateLeftRightSelectedKeys, onChange, onSelectChange],
    );

    const handleSearch = useCallback(
      (direction: TransferDirection, value: string) => {
        setSearchValue(direction, value);
        onSearch?.(direction, value);
      },
      [setSearchValue, onSearch],
    );

    const handlePageChange = useCallback(
      (direction: TransferDirection, page: number) => {
        setPage(direction, page);
      },
      [setPage],
    );

    React.useImperativeHandle(
      ref,
      () => ({
        getTargetKeys: () => targetKeys,
        setTargetKeys: (keys: TransferValue) => {
          updateTargetKeys(keys);
          onChange?.(keys, 'right', keys.filter((key: string | number) => !targetKeys.includes(key)));
        },
        getSelectedKeys: () => selectedKeys,
        setSelectedKeys: (keys: TransferValue) => {
          updateSelectedKeys(keys);
          updateLeftRightSelectedKeys(keys, targetKeys);
          onSelectChange?.(
            keys.filter((key: string | number) => !targetKeys.includes(key)),
            keys.filter((key: string | number) => targetKeys.includes(key)),
          );
        },
        getDataSource: () => dataSource,
        setDataSource: (_data) => { logger.warn('setDataSource should be updated through props'); },
        moveTo: (direction: TransferDirection, keys: TransferValue) => {
          const newTargetKeys = direction === 'right' ? [...targetKeys, ...keys] : targetKeys.filter((key: string | number) => !keys.includes(key));
          updateTargetKeys(newTargetKeys);
          onChange?.(newTargetKeys, direction, keys);
        },
        selectAll: (direction: TransferDirection) => handleSelectAll(direction),
        clearSelect: (direction: TransferDirection) => {
          const newSelectedKeys = selectedKeys.filter((key: string | number) => direction === 'left' ? targetKeys.includes(key) : !targetKeys.includes(key));
          updateSelectedKeys(newSelectedKeys);
          updateLeftRightSelectedKeys(newSelectedKeys, targetKeys);
          onSelectChange?.(
            newSelectedKeys.filter((key: string | number) => !targetKeys.includes(key)),
            newSelectedKeys.filter((key: string | number) => targetKeys.includes(key)),
          );
        },
        search: (direction: TransferDirection, value: string) => handleSearch(direction, value),
        clearSearch: (direction: TransferDirection) => handleSearch(direction, ''),
        disable: () => { logger.warn('disable should be updated through props'); },
        enable: () => { logger.warn('enable should be updated through props'); },
        reset,
        getSelectedItems: () => dataSource.filter((item: TransferOption) => selectedKeys.includes(item.key)),
        getTargetItems: () => dataSource.filter((item: TransferOption) => targetKeys.includes(item.key)),
        getSourceItems: () => dataSource.filter((item: TransferOption) => !targetKeys.includes(item.key)),
      }),
      [targetKeys, selectedKeys, dataSource, updateTargetKeys, updateSelectedKeys, updateLeftRightSelectedKeys, onChange, onSelectChange, handleSelectAll, handleSearch, reset],
    );

    const containerStyle = animation.getMergedStyle({ ...TransferStyles['getStyle']({ size, status, layout, disabled: internalDisabled, style: {} }), ...style });

    return (
      <View
        style={containerStyle}
        className={TransferStyles['getClassName']({ size, status, layout, disabled: internalDisabled, className })}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={accessibilityState}
        role={accessibilityRole}
        {...a11y.getAriaAttributes()}
        {...restProps}
      >
        <TransferList
          direction="left"
          dataSource={dataSource}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          showSearch={showSearch}
          showSelectAll={showSelectAll}
          pagination={pagination}
          title={titles[0]}
          notFoundContent={notFoundContent}
          searchPlaceholder={searchPlaceholder}
          searchValue={leftSearchValue}
          currentPage={leftPage}
          disabled={internalDisabled}
          onItemClick={handleItemClick}
          onSelectAll={handleSelectAll}
          onSearch={handleSearch}
          onPageChange={(page) => handlePageChange('left', page)}
          render={render}
          optionRender={optionRender}
          rowRender={rowRender}
          searchRender={searchRender}
          emptyRender={emptyRender}
          footer={footer}
          filterOption={filterOption}
        />
        <TransferOperations
          showOperations={showOperations}
          operations={operations}
          leftSelectedKeys={leftSelectedKeys}
          rightSelectedKeys={rightSelectedKeys}
          disabled={internalDisabled}
          onMove={handleMove}
          operationRender={operationRender}
        />
        {!oneWay && (
          <TransferList
            direction="right"
            dataSource={dataSource}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            showSearch={showSearch}
            showSelectAll={showSelectAll}
            pagination={pagination}
            title={titles[1] || titles[0]}
            notFoundContent={notFoundContent}
            searchPlaceholder={searchPlaceholder}
            searchValue={rightSearchValue}
            currentPage={rightPage}
            disabled={internalDisabled}
            onItemClick={handleItemClick}
            onSelectAll={handleSelectAll}
            onSearch={handleSearch}
            onPageChange={(page) => handlePageChange('right', page)}
            render={render}
            optionRender={optionRender}
            rowRender={rowRender}
            searchRender={searchRender}
            emptyRender={emptyRender}
            footer={footer}
            filterOption={filterOption}
          />
        )}
      </View>
    );
  },
});

export default Transfer;