import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { spaceStyles } from './Space.styles';
import type { SpaceProps, SpaceRef, SpaceDirection, SpaceAlign, SpaceWrap, SpaceSize, SpaceGap } from './Space.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** Space 组件 */
export const Space = createComponent<SpaceProps, SpaceRef>({
  name: 'Space',
  render: (props, ref) => {
    const {
      children,
      direction = 'horizontal',
      align = 'center',
      wrap = 'nowrap',
      size = 'default',
      gap,
      block = false,
      separator,
      compact = false,
      split = false,
      maxCount,
      ellipsis,
      className,
      style,
      onClick,
      onItemClick,
      responsive,
    } = props;

    const spaceRef = useRef<any>(null);
    const [internalDirection, setInternalDirection] = useState<SpaceDirection>(direction);
    const [internalAlign, setInternalAlign] = useState<SpaceAlign>(align);
    const [internalWrap, setInternalWrap] = useState<SpaceWrap>(wrap);
    const [internalSize, setInternalSize] = useState<SpaceSize>(size);
    const [internalGap, setInternalGap] = useState<SpaceGap>(gap || size);
    const [visibleItems, setVisibleItems] = useState<number>(maxCount || Infinity);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.region,
      label: 'Space container',
    });

    useEffect(() => { setInternalDirection(direction); }, [direction]);
    useEffect(() => { setInternalAlign(align); }, [align]);
    useEffect(() => { setInternalWrap(wrap); }, [wrap]);
    useEffect(() => { setInternalSize(size); }, [size]);
    useEffect(() => { setInternalGap(gap || size); }, [gap, size]);
    useEffect(() => { if (maxCount) setVisibleItems(maxCount); }, [maxCount]);

    const handleClick = useCallback((event: any) => { onClick?.(event); }, [onClick]);

    const handleItemClick = useCallback(
      (index: number, event: ITouchEvent) => { onItemClick?.(index, event); },
      [onItemClick],
    );

    const renderChildren = () => {
      if (!children) return null;
      const childrenArray = React.Children.toArray(children);
      const visibleChildren = childrenArray.slice(0, visibleItems);

      return visibleChildren.map((child, index) => {
        const isLast = index === visibleChildren.length - 1;
        const showSeparator = separator && !isLast && !compact;

        return (
          <React.Fragment key={index}>
            <View
              className="orva-ui-space__item"
              style={spaceStyles['getItemStyle'](index, visibleChildren.length, split)}
              onClick={(e: ITouchEvent) => handleItemClick(index, e)}
            >
              {child}
            </View>
            {showSeparator && (
              <View className="orva-ui-space__separator" style={spaceStyles['getSeparatorStyle']()}>
                {separator === true ? '|' : separator}
              </View>
            )}
          </React.Fragment>
        );
      });
    };

    const renderEllipsis = () => {
      if (!ellipsis || visibleItems >= React.Children.count(children)) return null;
      return (
        <View className="orva-ui-space__ellipsis" style={spaceStyles['getEllipsisStyle']()}>
          {ellipsis}
        </View>
      );
    };

    const spaceStyle = spaceStyles['getBaseStyle']({
      direction: internalDirection,
      align: internalAlign,
      wrap: internalWrap,
      size: internalSize,
      gap: internalGap,
      block,
      compact,
      split,
      maxCount,
      style: style || {},
    });

    const responsiveStyle = responsive ? spaceStyles['getResponsiveStyle'](responsive) : {};
    const spaceClassName = spaceStyles['getClassName']({
      direction: internalDirection,
      align: internalAlign,
      wrap: internalWrap,
      size: internalSize,
      block,
      compact,
      split,
      className: className || '',
    });

    React.useImperativeHandle(
      ref,
      () => ({
        element: spaceRef.current,
        getDirection: () => internalDirection,
        getAlign: () => internalAlign,
        getWrap: () => internalWrap,
        getGap: () => internalGap,
        getSize: () => internalSize,
        setDirection: (newDirection: SpaceDirection) => setInternalDirection(newDirection),
        setAlign: (newAlign: SpaceAlign) => setInternalAlign(newAlign),
        setWrap: (newWrap: SpaceWrap) => setInternalWrap(newWrap),
        setGap: (newGap: SpaceGap) => setInternalGap(newGap),
        setSize: (newSize: SpaceSize) => setInternalSize(newSize),
        scrollIntoView: (options?: ScrollIntoViewOptions) => {
          const element = spaceRef.current;
          if (element && typeof element.scrollIntoView === 'function') element.scrollIntoView(options);
          else if (element && element.$el) element.$el?.scrollIntoView?.(options);
        },
      }),
      [internalDirection, internalAlign, internalWrap, internalGap, internalSize],
    );

    const mergedStyle = animation.getMergedStyle({ ...spaceStyle, ...responsiveStyle });

    return (
      <View ref={spaceRef} className={spaceClassName} style={mergedStyle} onClick={handleClick} {...a11y.getAriaAttributes()}>
        {renderChildren()}
        {renderEllipsis()}
      </View>
    );
  },
});

export { Space as SpaceComponent };
export default Space;