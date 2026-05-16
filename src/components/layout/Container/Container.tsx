import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { containerStyles } from './Container.styles';
import type { ContainerProps, ContainerRef, ContainerSize, ContainerAlign } from './Container.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** Container 组件 */
export const Container = createComponent<ContainerProps, ContainerRef>({
  name: 'Container',
  render: (props, ref) => {
    const {
      children,
      size = 'default',
      maxWidth,
      padding = 'medium',
      margin = 'medium',
      align = 'stretch',
      center = false,
      scrollable = false,
      scrollDirection = 'vertical',
      className,
      style,
      onClick,
    } = props;

    const containerRef = useRef<any>(null);
    const [internalSize, setInternalSize] = useState<ContainerSize>(size);
    const [internalAlign, setInternalAlign] = useState<ContainerAlign>(align);
    const [internalCenter, setInternalCenter] = useState(center);
    const [internalScrollable, setInternalScrollable] = useState(scrollable);
    const [internalScrollDirection, setInternalScrollDirection] = useState(scrollDirection);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.region,
      label: 'Container',
    });

    useEffect(() => { setInternalSize(size); }, [size]);
    useEffect(() => { setInternalAlign(align); }, [align]);
    useEffect(() => { setInternalCenter(center); }, [center]);
    useEffect(() => { setInternalScrollable(scrollable); }, [scrollable]);
    useEffect(() => { setInternalScrollDirection(scrollDirection); }, [scrollDirection]);

    const handleClick = useCallback((event: any) => { onClick?.(event); }, [onClick]);

    const containerStyle = containerStyles['getBaseStyle']({
      size: internalSize,
      maxWidth,
      padding,
      margin,
      align: internalAlign,
      center: internalCenter,
      scrollable: internalScrollable,
      scrollDirection: internalScrollDirection,
      style: style || {},
    });

    const containerClassName = containerStyles['getClassName']({
      size: internalSize,
      align: internalAlign,
      center: internalCenter,
      scrollable: internalScrollable,
      className: className || '',
    });

    React.useImperativeHandle(
      ref,
      () => ({
        element: containerRef.current,
        getSize: () => internalSize,
        getAlign: () => internalAlign,
        getMaxWidth: () => maxWidth || containerStyles.SIZE_MAP[internalSize as keyof typeof containerStyles.SIZE_MAP],
        setSize: (newSize: ContainerSize) => setInternalSize(newSize),
        setAlign: (newAlign: ContainerAlign) => setInternalAlign(newAlign),
        setMaxWidth: (newMaxWidth: number | string) => {
          if (containerRef.current) containerRef.current.style.maxWidth = typeof newMaxWidth === 'number' ? `${newMaxWidth}px` : newMaxWidth;
        },
        scrollIntoView: (options?: ScrollIntoViewOptions) => {
          containerRef.current?.scrollIntoView(options);
        },
      }),
      [internalSize, internalAlign, maxWidth],
    );

    const mergedStyle = animation.getMergedStyle({ ...containerStyle, ...style });

    return (
      <View ref={containerRef} className={containerClassName} style={mergedStyle} onClick={handleClick} {...a11y.getAriaAttributes()}>
        {children}
      </View>
    );
  },
});

export { Container as ContainerComponent };
export default Container;