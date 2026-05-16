import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { rowStyles } from './Row.styles';
import type { RowProps, RowRef, RowAlign, RowJustify, RowGutter } from './Row.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** Row 组件 */
export const Row = createComponent<RowProps, RowRef>({
  name: 'Row',
  render: (props, ref) => {
    const { children, gutter = 0, align = 'top', justify = 'start', wrap = true, className, style, onClick } = props;

    const rowRef = useRef<any>(null);
    const [internalAlign, setInternalAlign] = useState<RowAlign>(align);
    const [internalJustify, setInternalJustify] = useState<RowJustify>(justify);
    const [internalGutter, setInternalGutter] = useState<RowGutter>(gutter);
    const [internalWrap, setInternalWrap] = useState(wrap);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.region,
      label: 'Row container',
    });

    useEffect(() => { setInternalAlign(align); }, [align]);
    useEffect(() => { setInternalJustify(justify); }, [justify]);
    useEffect(() => { setInternalGutter(gutter); }, [gutter]);
    useEffect(() => { setInternalWrap(wrap); }, [wrap]);

    const handleClick = useCallback((event: any) => { onClick?.(event); }, [onClick]);

    const rowStyle = rowStyles['getBaseStyle']({ gutter: internalGutter, align: internalAlign, justify: internalJustify, wrap: internalWrap, style: style || {} });
    const rowClassName = rowStyles['getClassName']({ align: internalAlign, justify: internalJustify, wrap: internalWrap, className: className || '' });

    React.useImperativeHandle(
      ref,
      () => ({
        element: rowRef.current,
        getAlign: () => internalAlign,
        getJustify: () => internalJustify,
        getGutter: () => internalGutter,
        setAlign: (newAlign: RowAlign) => setInternalAlign(newAlign),
        setJustify: (newJustify: RowJustify) => setInternalJustify(newJustify),
        setGutter: (newGutter: RowGutter) => setInternalGutter(newGutter),
        scrollIntoView: (options?: ScrollIntoViewOptions) => {
          const element = rowRef.current;
          if (element && typeof element.scrollIntoView === 'function') element.scrollIntoView(options);
          else if (element && element.$el) element.$el?.scrollIntoView?.(options);
        },
      }),
      [internalAlign, internalJustify, internalGutter],
    );

    const renderedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child) && (child.type as unknown as { displayName?: string })?.displayName === 'Col') {
        return React.cloneElement(child, { key: index, gutter: internalGutter } as any);
      }
      return child;
    });

    const mergedStyle = animation.getMergedStyle({ ...rowStyle, ...style });

    return (
      <View ref={rowRef} className={rowClassName} style={mergedStyle} onClick={handleClick} {...a11y.getAriaAttributes()}>
        {renderedChildren}
      </View>
    );
  },
});

export { Row as RowComponent };
export default Row;