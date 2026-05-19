import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { rateStyles } from './Rate.styles';
import type { RateProps, RateRef, StarState, StarProps, RateCharacter } from './Rate.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * Rate 评分组件
 * @module components/display/Rate
 * @description 用于展示和输入评分的星级评分组件，支持半星、只读、禁用、自定义图标和颜色等功能。
 *
 * @example
 * ```tsx
 * <Rate value={4} onChange={handleChange} />
 * <Rate allowHalf readonly count={10} character="♥" />
 * ```
 */

/** 默认星星字符 */
const DEFAULT_CHARACTER = '★';

/** 单个星星组件 */
const Star: React.FC<StarProps> = ({
  index,
  state,
  disabled = false,
  readonly = false,
  size,
  character = DEFAULT_CHARACTER,
  color,
  unselectedColor,
  onClick,
}) => {
  const handleClick = useCallback(
    (e: any) => {
      if (disabled || readonly) return;
      const rect = e.currentTarget.getBoundingClientRect?.();
      if (rect) {
        const clickX = e.clientX || e.touches?.[0]?.clientX;
        const position = clickX - rect.left < rect.width / 2 ? 0.5 : 1;
        onClick?.(index, position);
      } else {
        onClick?.(index, 1);
      }
    },
    [disabled, readonly, index, onClick],
  );

  const starStyle = rateStyles['getStarStyle']({ size, state, disabled, readonly, color, unselectedColor });
  const starClassName = rateStyles['getStarClassName']({ state });

  const renderCharacter = () => {
    if (typeof character === 'function') {
      try {
        const result = (character as (index: number) => RateCharacter)(index);
        return result || <Text>{DEFAULT_CHARACTER}</Text>;
      } catch (error) {
        return <Text>{DEFAULT_CHARACTER}</Text>;
      }
    }
    if (typeof character === 'string') return <Text>{character}</Text>;
    if (character) return character;
    return <Text>{DEFAULT_CHARACTER}</Text>;
  };

  const renderHalfStar = () => {
    if (state !== 'half') return null;
    return (
      <View style={rateStyles['getHalfStarMaskStyle']({ color, unselectedColor })} className="orva-ui-rate__star-half">
        {renderCharacter()}
      </View>
    );
  };

  return (
    <View className={starClassName} style={starStyle} onClick={handleClick} onTouchStart={handleClick}>
      {renderCharacter()}
      {renderHalfStar()}
    </View>
  );
};

/**
 * Rate 评分组件
 * @module components/display/Rate
 * @description 用于展示或输入评分的组件，支持半星评分、允许清空、只读模式、自定义字符等功能。
 *
 * @example
 * ```tsx
 * <Rate value={rating} onChange={setRating} />
 * <Rate allowHalf character="❤️" />
 * ```
 */

/** Rate 评分组件 */
export const Rate = createComponent<RateProps, RateRef>({
  name: 'Rate',
  render: (props, ref) => {
    const {
      value: controlledValue,
      defaultValue = 0,
      count = 5,
      allowHalf = false,
      allowClear = true,
      disabled = false,
      readonly = false,
      size = 'default',
      character = DEFAULT_CHARACTER,
      tooltips = [],
      showTooltips = false,
      color,
      unselectedColor,
      autoFocus = false,
      keyboard = true,
      onChange,
      onHoverChange,
      onFocus,
      onBlur,
      onKeyDown,
      className,
      style,
      ...restProps
    } = props;

    const rateRef = useRef<any>(null);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [focused, setFocused] = useState(false);
    const [showTooltip, setShowTooltip] = useState<number | null>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: !disabled && !readonly });

    // 处理受控模式
    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

    const a11y = useAccessibility({
      role: ARIA_ROLES.slider,
      focusable: keyboard && !disabled,
      label: `Rating: ${currentValue} out of ${count} stars`,
      attributes: {
        'aria-valuemin': '0',
        'aria-valuemax': String(count),
        'aria-valuenow': String(currentValue),
        'aria-valuetext': `${currentValue} out of ${count} stars`,
        'aria-disabled': String(disabled),
        'aria-readonly': String(readonly),
      },
    });

    useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    useEffect(() => {
      if (autoFocus && !disabled && rateRef.current) {
        setFocused(true);
        onFocus?.();
      }
    }, [autoFocus, disabled, onFocus]);

    // 计算星星状态
    const getStarState = useCallback(
      (index: number): StarState => {
        const displayValue = hoverValue !== null ? hoverValue : currentValue;
        const starValue = index + 1;
        if (displayValue >= starValue) return 'full';
        if (allowHalf && displayValue >= starValue - 0.5) return 'half';
        return 'empty';
      },
      [currentValue, hoverValue, allowHalf],
    );

    // 处理值变化
    const handleValueChange = useCallback(
      (newValue: number) => {
        if (allowClear && newValue === currentValue) {
          newValue = 0;
        }
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [allowClear, currentValue, controlledValue, onChange],
    );

    // 处理星星点击
    const handleStarClick = useCallback(
      (index: number, position: number) => {
        if (disabled || readonly) return;
        const newValue = allowHalf && position < 1 ? index + 0.5 : index + 1;
        handleValueChange(newValue);
      },
      [disabled, readonly, allowHalf, handleValueChange],
    );

    // 处理星星悬停
    const handleStarHover = useCallback(
      (index: number, position: number) => {
        if (disabled || readonly) return;
        const newHoverValue = allowHalf && position < 1 ? index + 0.5 : index + 1;
        setHoverValue(newHoverValue);
        onHoverChange?.(newHoverValue);
        if (showTooltips && tooltips[index]) {
          setShowTooltip(index);
        }
      },
      [disabled, readonly, allowHalf, showTooltips, tooltips, onHoverChange],
    );

    // 处理鼠标离开
    const handleMouseLeave = useCallback(() => {
      if (disabled || readonly) return;
      setHoverValue(null);
      setShowTooltip(null);
      onHoverChange?.(currentValue);
    }, [disabled, readonly, currentValue, onHoverChange]);

    // 处理聚焦
    const handleFocus = useCallback(() => {
      if (disabled) return;
      setFocused(true);
      onFocus?.();
    }, [disabled, onFocus]);

    // 渲染工具提示
    const renderTooltip = (index: number) => {
      if (!showTooltips || !tooltips[index] || showTooltip !== index) return null;
      return (
        <View className="orva-ui-rate__tooltip" style={rateStyles['getTooltipStyle']()}>
          <Text>{tooltips[index]}</Text>
        </View>
      );
    };

    // 计算样式
    const containerStyle = rateStyles['getContainerStyle']({
      size,
      disabled,
      readonly,
      style: {
        ...rateStyles['getAccessibilityStyle'](focused),
        ...style,
      },
    });

    const containerClassName = rateStyles['getClassName']({ size, disabled, readonly, className });

    // 暴露给外部的引用方法
    React.useImperativeHandle(
      ref,
      () => ({
        element: rateRef.current,
        getValue: () => currentValue,
        setValue: (value: number) => {
          if (value >= 0 && value <= count) {
            handleValueChange(value);
          }
        },
        reset: () => handleValueChange(0),
        focus: () => {
          setFocused(true);
          onFocus?.();
        },
        blur: () => {
          setFocused(false);
          onBlur?.();
        },
      }),
      [currentValue, count, handleValueChange, onFocus, onBlur],
    );

    const mergedStyle = animation.getMergedStyle(containerStyle);

    return (
      <View
        ref={rateRef}
        className={containerClassName}
        style={mergedStyle}
        onClick={keyboard ? handleFocus : undefined}
        {...a11y.getAriaAttributes()}
        {...restProps}
      >
        {Array.from({ length: count }, (_, index) => (
          <View key={index} style={{ position: 'relative' }}>
            <Star
              index={index}
              state={getStarState(index)}
              disabled={disabled}
              readonly={readonly}
              size={size}
              character={character as RateCharacter}
              color={color}
              unselectedColor={unselectedColor}
              onClick={handleStarClick}
              onHover={handleStarHover}
              onLeave={handleMouseLeave}
            />
            {renderTooltip(index)}
          </View>
        ))}
      </View>
    );
  },
});

export { Rate as RateComponent };
export default Rate;