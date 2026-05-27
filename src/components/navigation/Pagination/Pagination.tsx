import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, Picker } from '@tarojs/components';
import { Input } from '../../form/Input';
import { paginationStyles } from './Pagination.styles';
import type { PaginationProps, PaginationRef } from './Pagination.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * Pagination 分页器组件
 * @module components/navigation/Pagination
 * @description 用于分页展示的组件，支持当前页码、总页数、页面大小选择和多种样式。
 *
 * @example
 * ```tsx
 * <Pagination current={1} total={50} onChange={handleChange} />
 * <Pagination current={3} total={100} pageSize={20} showQuickJumper />
 * ```
 */

/** Pagination 组件 */
export const Pagination = createComponent<PaginationProps, PaginationRef>({
  name: 'Pagination',
  render: (props, ref) => {
    const {
      current: controlledCurrent,
      defaultCurrent = 1,
      pageSize: controlledPageSize,
      defaultPageSize = 10,
      total,
      size = 'default',
      showTotal,
      showQuickJumper = false,
      showSizeChanger = false,
      pageSizeOptions = [10, 20, 50, 100],
      disabled = false,
      simple = false,
      showMore: _showMore = true,
      showLessItems: _showLessItems = false,
      position = 'bottom',
      align = 'right',
      itemRender,
      onChange,
      onShowSizeChange,
      className,
      style,
      ...restProps
    } = props;

    const paginationRef = useRef<any>(null);
    const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
    const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
    const [jumpInput, setJumpInput] = useState('');
    const totalPages = Math.ceil(total / internalPageSize);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.navigation,
      label: 'Pagination',
    });

    useEffect(() => {
      if (controlledCurrent !== undefined) setInternalCurrent(controlledCurrent);
    }, [controlledCurrent]);

    useEffect(() => {
      if (controlledPageSize !== undefined) setInternalPageSize(controlledPageSize);
    }, [controlledPageSize]);

    const handlePageChange = useCallback(
      (page: number) => {
        if (page < 1 || page > totalPages || disabled) return;
        if (controlledCurrent === undefined) setInternalCurrent(page);
        onChange?.(page, internalPageSize);
      },
      [controlledCurrent, disabled, internalPageSize, onChange, totalPages],
    );

    const handlePageSizeChange = useCallback(
      (pageSize: number) => {
        if (disabled) return;
        const newCurrent = Math.min(internalCurrent, Math.ceil(total / pageSize));
        if (controlledPageSize === undefined) setInternalPageSize(pageSize);
        if (controlledCurrent === undefined) setInternalCurrent(newCurrent);
        onShowSizeChange?.(newCurrent, pageSize);
        onChange?.(newCurrent, pageSize);
      },
      [controlledCurrent, controlledPageSize, disabled, internalCurrent, total, onChange, onShowSizeChange],
    );

    const handleJump = useCallback(() => {
      const page = parseInt(jumpInput);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        handlePageChange(page);
        setJumpInput('');
      }
    }, [jumpInput, totalPages, handlePageChange]);

    const generatePages = useCallback(() => {
      const pages: number[] = [];
      const current = internalCurrent;
      const total = totalPages;

      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) pages.push(i);
          pages.push(0);
          pages.push(total);
        } else if (current >= total - 3) {
          pages.push(1);
          pages.push(0);
          for (let i = total - 4; i <= total; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push(0);
          for (let i = current - 1; i <= current + 1; i++) pages.push(i);
          pages.push(0);
          pages.push(total);
        }
      }
      return pages;
    }, [internalCurrent, totalPages]);

    const renderPageButton = (page: number) => {
      const isActive = page === internalCurrent;
      const isDisabled = disabled || page === 0;

      if (page === 0) {
        const jumpPrev = internalCurrent > 4;
        const jumpNext = internalCurrent < totalPages - 3;
        if (jumpPrev) {
          return (
            <View
              key="jump-prev"
              className="orva-ui-pagination__jump-prev"
              style={paginationStyles['getJumpButtonStyle'](size)}
              onClick={() => !disabled && handlePageChange(internalCurrent - 5)}
            >
              ...
            </View>
          );
        }
        if (jumpNext) {
          return (
            <View
              key="jump-next"
              className="orva-ui-pagination__jump-next"
              style={paginationStyles['getJumpButtonStyle'](size)}
              onClick={() => !disabled && handlePageChange(internalCurrent + 5)}
            >
              ...
            </View>
          );
        }
        return null;
      }

      const buttonContent = itemRender ? itemRender(page, 'page', page) : <Text>{page}</Text>;

      return (
        <View
          key={page}
          className={`orva-ui-pagination__page ${isActive ? 'orva-ui-pagination__page--active' : ''}`}
          style={paginationStyles['getPageButtonStyle']({ active: isActive, disabled: isDisabled, size })}
          onClick={() => !isDisabled && handlePageChange(page)}
        >
          {buttonContent}
        </View>
      );
    };

    const renderPrevButton = () => {
      const isDisabled = disabled || internalCurrent <= 1;
      const buttonContent = itemRender ? itemRender(internalCurrent - 1, 'prev', '上一页') : <Text>上一页</Text>;

      return (
        <View
          className="orva-ui-pagination__prev"
          style={paginationStyles['getButtonStyle']({ disabled: isDisabled, size })}
          onClick={() => !isDisabled && handlePageChange(internalCurrent - 1)}
        >
          {buttonContent}
        </View>
      );
    };

    const renderNextButton = () => {
      const isDisabled = disabled || internalCurrent >= totalPages;
      const buttonContent = itemRender ? itemRender(internalCurrent + 1, 'next', '下一页') : <Text>下一页</Text>;

      return (
        <View
          className="orva-ui-pagination__next"
          style={paginationStyles['getButtonStyle']({ disabled: isDisabled, size })}
          onClick={() => !isDisabled && handlePageChange(internalCurrent + 1)}
        >
          {buttonContent}
        </View>
      );
    };

    const renderTotal = () => {
      if (!showTotal) return null;
      const start = (internalCurrent - 1) * internalPageSize + 1;
      const end = Math.min(internalCurrent * internalPageSize, total);
      const totalContent = typeof showTotal === 'function' ? showTotal(total, [start, end]) : `共 ${total} 条`;

      return (
        <View className="orva-ui-pagination__total" style={paginationStyles['getTotalStyle']()}>
          {totalContent}
        </View>
      );
    };

    const renderQuickJumper = () => {
      if (!showQuickJumper) return null;

      return (
        <View className="orva-ui-pagination__quick-jumper" style={paginationStyles['getQuickJumperStyle']()}>
          <Text>跳至</Text>
          <Input
            type="number"
            value={jumpInput}
            onInput={(value: string, _event: unknown) => setJumpInput(value)}
            style={paginationStyles['getInputStyle']()}
            disabled={disabled}
          />
          <Text>页</Text>
          <View
            className="orva-ui-pagination__jump-button"
            style={paginationStyles['getButtonStyle']({ size })}
            onClick={handleJump}
          >
            确定
          </View>
        </View>
      );
    };

    const renderSizeChanger = () => {
      if (!showSizeChanger) return null;

      const sizeIndex = pageSizeOptions.findIndex((size) => size === internalPageSize);

      return (
        <View className="orva-ui-pagination__size-changer">
          <Picker
            mode="selector"
            range={pageSizeOptions}
            rangeKey="label"
            value={sizeIndex >= 0 ? sizeIndex : 0}
            onChange={(e) => {
              const selectedIndex = e.detail.value;
              const selectedSize = pageSizeOptions[selectedIndex as number];
              if (selectedSize !== undefined) handlePageSizeChange(selectedSize);
            }}
            disabled={disabled}
          >
            <View style={paginationStyles['getSelectStyle']()}>
              <Text>{internalPageSize} 条/页</Text>
            </View>
          </Picker>
        </View>
      );
    };

    const styleProps: Pick<PaginationProps, 'align' | 'style'> = { align, style: style || {} };
    const classNameProps: Pick<PaginationProps, 'size' | 'position' | 'align' | 'disabled' | 'simple' | 'className'> = { size, position, align, disabled, simple, className };

    if (simple) {
      return (
        <View
          ref={paginationRef}
          className={paginationStyles['getClassName'](classNameProps)}
          style={paginationStyles['getBaseStyle'](styleProps)}
          {...a11y.getAriaAttributes()}
          {...restProps}
        >
          {renderPrevButton()}
          <Text className="orva-ui-pagination__simple-text">{internalCurrent} / {totalPages}</Text>
          {renderNextButton()}
        </View>
      );
    }

    const paginationStyle = paginationStyles['getBaseStyle'](styleProps);
    const paginationClassName = paginationStyles['getClassName'](classNameProps);

    React.useImperativeHandle(
      ref,
      () => ({
        element: paginationRef.current,
        getCurrent: () => internalCurrent,
        getPageSize: () => internalPageSize,
        getTotalPages: () => totalPages,
        getTotal: () => total,
        setCurrent: (page: number) => {
          if (controlledCurrent === undefined) setInternalCurrent(page);
        },
        setPageSize: (pageSize: number) => {
          if (controlledPageSize === undefined) setInternalPageSize(pageSize);
        },
        goTo: handlePageChange,
        prev: () => handlePageChange(internalCurrent - 1),
        next: () => handlePageChange(internalCurrent + 1),
        first: () => handlePageChange(1),
        last: () => handlePageChange(totalPages),
      }),
      [internalCurrent, internalPageSize, totalPages, total, controlledCurrent, controlledPageSize, handlePageChange],
    );

    const mergedStyle = animation.getMergedStyle(paginationStyle);

    return (
      <View ref={paginationRef} className={paginationClassName} style={mergedStyle} {...a11y.getAriaAttributes()} {...restProps}>
        {renderTotal()}
        {renderSizeChanger()}
        {renderPrevButton()}
        {generatePages().map(renderPageButton)}
        {renderNextButton()}
        {renderQuickJumper()}
      </View>
    );
  },
});

export default Pagination;