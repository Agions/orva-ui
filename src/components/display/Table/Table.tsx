import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Checkbox, Button } from '@tarojs/components';
import { TableStyles } from './Table.styles';
import type { TableProps, TableRef, TableSortOrder } from './Table.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * Table 表格组件
 * @module components/display/Table
 * @description 用于展示结构化数据的表格组件，支持列排序、固定表头、斑马纹、选择行、自定义单元格渲染等功能。
 *
 * @example
 * ```tsx
 * <Table columns={columns} dataSource={data} />
 * <Table columns={columns} dataSource={data} onRowClick={handleClick} />
 * ```
 */

/** 表格组件 */
export const Table = createComponent<TableProps, TableRef>({
  name: 'Table',
  render: (props, ref) => {
    const {
      columns = [],
      dataSource: initialDataSource = [],
      rowKey = 'key',
      size = 'medium',
      bordered = false,
      striped = false,
      hoverable = true,
      loading = false,
      emptyText = '暂无数据',
      showHeader = true,
      pagination = false,
      rowSelection,
      expandable,
      scroll,
      onChange,
      onRow,
      onHeaderRow,
      className,
      style,
      ...restProps
    } = props;

    const tableRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState(initialDataSource);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<TableSortOrder>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const animation = useMicroAnimation({ type: 'micro', enabled: !loading });
    const a11y = useAccessibility({
      role: ARIA_ROLES.table,
      label: 'Data Table',
    });

    useEffect(() => { setData(initialDataSource); }, [initialDataSource]);

    const handleSort = useCallback(
      (field: string, order: TableSortOrder) => {
        setSortField(field);
        setSortOrder(order);
        onChange?.({ current: currentPage, pageSize }, {}, { field, order });
      },
      [currentPage, pageSize, onChange],
    );

    const handleRowSelect = useCallback(
      (key: string, selected: boolean) => {
        const newSelectedKeys = selected ? [...selectedRowKeys, key] : selectedRowKeys.filter((k) => k !== key);
        setSelectedRowKeys(newSelectedKeys);
        rowSelection?.onChange?.(
          newSelectedKeys,
          data.filter((item) => newSelectedKeys.includes(item[rowKey as keyof typeof item])),
        );
      },
      [selectedRowKeys, data, rowKey, rowSelection],
    );

    const handleSelectAll = useCallback(
      (selected: boolean) => {
        const newSelectedKeys = selected ? data.map((item) => String(item[rowKey as keyof typeof item])) : [];
        setSelectedRowKeys(newSelectedKeys);
        rowSelection?.onChange?.(
          newSelectedKeys,
          data.filter((item) => newSelectedKeys.includes(String(item[rowKey as keyof typeof item]))),
        );
      },
      [data, rowKey, rowSelection],
    );

    const handleExpand = useCallback(
      (key: string, expanded: boolean) => {
        const newExpandedKeys = expanded ? [...expandedRowKeys, key] : expandedRowKeys.filter((k) => k !== key);
        setExpandedRowKeys(newExpandedKeys);
        const record = data.find((item) => String(item[rowKey as keyof typeof item]) === key);
        if (record && typeof expandable === 'object' && expandable.onExpand) {
          expandable.onExpand(expanded, record);
        }
      },
      [expandedRowKeys, data, rowKey, expandable],
    );

    const handlePageChange = useCallback(
      (page: number, size?: number) => {
        setCurrentPage(page);
        if (size) setPageSize(size);
        onChange?.({ current: page, pageSize: size || pageSize }, {}, { field: sortField, order: sortOrder });
      },
      [pageSize, sortField, sortOrder, onChange],
    );

    const processedData = useMemo(() => {
      const result = [...data];
      if (sortField && sortOrder) {
        result.sort((a, b) => {
          const aValue = a[sortField as keyof typeof a];
          const bValue = b[sortField as keyof typeof b];
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'ascend' ? aValue - bValue : bValue - aValue;
          }
          const aStr = String(aValue || '');
          const bStr = String(bValue || '');
          return sortOrder === 'ascend' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
        });
      }
      return result;
    }, [data, sortField, sortOrder]);

    const paginatedData = useMemo(() => {
      if (!pagination) return processedData;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return processedData.slice(startIndex, endIndex);
    }, [processedData, currentPage, pageSize, pagination]);

    const renderHeader = () => {
      if (!showHeader) return null;
      const headerProps = onHeaderRow?.(columns, 0) || {};
      return (
        <View className="orva-ui-table__header" {...headerProps}>
          <View className="orva-ui-table__row">
            {rowSelection && (
              <View className="orva-ui-table__cell orva-ui-table__cell--selection">
                <Checkbox
                  value="all"
                  checked={selectedRowKeys.length > 0 && selectedRowKeys.length === data.length}
                  onChange={(e) => handleSelectAll(e.detail.value.length > 0)}
                  disabled={data.length === 0}
                />
              </View>
            )}
            {expandable && <View className="orva-ui-table__cell orva-ui-table__cell--expand" />}
            {columns.map((column, index) => {
              const isSortable = column.sortable || column.onSort;
              const currentSort = sortField === column.dataIndex ? sortOrder : null;
              return (
                <View
                  key={column.key || column.dataIndex || index}
                  className={`orva-ui-table__cell orva-ui-table__cell--header ${column.align ? `orva-ui-table__cell--${column.align}` : ''}`}
                  style={{ width: column.width }}
                >
                  <View className="orva-ui-table__cell-content">
                    {column.title}
                    {isSortable && (
                      <View
                        className={`orva-ui-table__sorter ${currentSort ? `orva-ui-table__sorter--${currentSort}` : ''}`}
                        onClick={() => {
                          const newOrder = currentSort === 'ascend' ? 'descend' : 'ascend';
                          handleSort(column.dataIndex, newOrder);
                        }}
                      >
                        <View className="orva-ui-table__sorter-up" />
                        <View className="orva-ui-table__sorter-down" />
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      );
    };

    const renderRow = (record: any, rowIndex: number) => {
      const key = String(record[rowKey as keyof typeof record]);
      const isSelected = selectedRowKeys.includes(key);
      const isExpanded = expandedRowKeys.includes(key);
      const rowProps = onRow?.(record, rowIndex) || {};

      return (
        <View key={key} className="orva-ui-table__body">
          <View
            className={`orva-ui-table__row ${isSelected ? 'orva-ui-table__row--selected' : ''} ${striped && rowIndex % 2 === 1 ? 'orva-ui-table__row--striped' : ''}`}
            {...rowProps}
          >
            {rowSelection && (
              <View className="orva-ui-table__cell orva-ui-table__cell--selection">
                <Checkbox
                  value={key}
                  checked={isSelected}
                  onChange={(e) => handleRowSelect(key, e.detail.value.length > 0)}
                  disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                />
              </View>
            )}
            {expandable && (
              <View className="orva-ui-table__cell orva-ui-table__cell--expand">
                {typeof expandable === 'object' && expandable.rowExpandable?.(record) && (
                  <View
                    className={`orva-ui-table__expand-icon ${isExpanded ? 'orva-ui-table__expand-icon--expanded' : ''}`}
                    onClick={() => handleExpand(key, !isExpanded)}
                  />
                )}
              </View>
            )}
            {columns.map((column, colIndex) => {
              const value = record[column.dataIndex as keyof typeof record];
              const render = column.render;
              const cellContent = render ? render(value, record, rowIndex) : String(value || '');
              return (
                <View
                  key={column.key || column.dataIndex || colIndex}
                  className={`orva-ui-table__cell ${column.align ? `orva-ui-table__cell--${column.align}` : ''}`}
                  style={{ width: column.width }}
                >
                  <View className="orva-ui-table__cell-content">{cellContent}</View>
                </View>
              );
            })}
          </View>
          {expandable && isExpanded && typeof expandable === 'object' && expandable.rowExpandable?.(record) && (
            <View className="orva-ui-table__expanded-row">
              <View className="orva-ui-table__expanded-cell">
                {typeof expandable === 'object' && expandable.expandedRowRender?.(record, rowIndex)}
              </View>
            </View>
          )}
        </View>
      );
    };

    const renderPagination = () => {
      if (!pagination) return null;
      const total = data.length;
      const totalPages = Math.ceil(total / pageSize);
      return (
        <View className="orva-ui-table__pagination">
          <View className="orva-ui-table__pagination-info">共 {total} 条记录</View>
          <View className="orva-ui-table__pagination-controls">
            <Button className="orva-ui-table__pagination-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>上一页</Button>
            <View className="orva-ui-table__pagination-current">{currentPage} / {totalPages}</View>
            <Button className="orva-ui-table__pagination-btn" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>下一页</Button>
          </View>
        </View>
      );
    };

    const renderEmpty = () => {
      if (data.length > 0) return null;
      return (
        <View className="orva-ui-table__empty">
          <Text className="orva-ui-table__empty-text">{emptyText}</Text>
        </View>
      );
    };

    const renderLoading = () => {
      if (!loading) return null;
      return (
        <View className="orva-ui-table__loading">
          <View className="orva-ui-table__loading-spinner" />
          <Text className="orva-ui-table__loading-text">加载中...</Text>
        </View>
      );
    };

    React.useImperativeHandle(
      ref,
      () => ({
        element: tableRef.current,
        getData: () => data,
        getSelectedRows: () => data.filter((item) => selectedRowKeys.includes(item.id as string)),
        getSelectedRowKeys: () => selectedRowKeys,
        getSortField: () => sortField,
        getSortOrder: () => sortOrder,
        getFilterValues: () => ({}),
        setData: (newData) => setData(newData),
        setSelectedRows: (keys: string[]) => setSelectedRowKeys(keys),
        setSelectedRowKeys: (keys: string[]) => setSelectedRowKeys(keys),
        getExpandedRowKeys: () => expandedRowKeys,
        setExpandedRowKeys: (keys: string[]) => setExpandedRowKeys(keys),
        setSort: (field: string, order: TableSortOrder) => { setSortField(field); setSortOrder(order); },
        setFilter: (_field: string, _values: any[]) => { /* filter */ },
        refresh: () => handlePageChange(currentPage, pageSize),
        reset: () => { setSelectedRowKeys([]); setExpandedRowKeys([]); setSortField(''); setSortOrder(null); },
        scrollToRow: (_key: string) => { /* scroll */ },
        scrollTo: (options: any) => { tableRef.current?.scrollTo(options); },
      }),
      [selectedRowKeys, expandedRowKeys, sortField, sortOrder, currentPage, pageSize, data, handlePageChange],
    );

    const tableStyle = TableStyles['getStyle']({ size, bordered, striped, hoverable, scroll, style: style || {} });
    const tableClassName = TableStyles['getClassName']({ size, bordered, striped, hoverable, loading, className: className || '' });
    const mergedStyle = animation.getMergedStyle(tableStyle);

    return (
      <View ref={tableRef} className={tableClassName} style={mergedStyle} {...a11y.getAriaAttributes()} {...restProps}>
        {renderLoading()}
        <ScrollView
          className="orva-ui-table__scroll"
          scrollX={scroll?.x !== undefined}
          scrollY={scroll?.y !== undefined}
          style={{ maxHeight: scroll?.y, maxWidth: scroll?.x }}
        >
          <View className="orva-ui-table__container">
            {renderHeader()}
            <View className="orva-ui-table__body">
              {paginatedData.map((record, index) => renderRow(record, index))}
              {renderEmpty()}
            </View>
          </View>
        </ScrollView>
        {renderPagination()}
      </View>
    );
  },
});

export default Table;