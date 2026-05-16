import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { gridStyles } from './Grid.styles';
import type { GridProps, GridRef, GridAlign, GridJustify, GridGap, GridCols } from './Grid.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** Grid 组件 */
export const Grid = createComponent<GridProps, GridRef>({
  name: 'Grid',
  render: (props, ref) => {
    const {
      children,
      cols = 1,
      rows,
      gap = 'default',
      rowGap,
      columnGap,
      align = 'stretch',
      justify = 'start',
      className,
      style,
      onClick,
    } = props;

    const gridRef = useRef<any>(null);
    const [internalCols, setInternalCols] = useState<GridCols>(cols);
    const [internalAlign, setInternalAlign] = useState<GridAlign>(align);
    const [internalJustify, setInternalJustify] = useState<GridJustify>(justify);
    const [internalGap, setInternalGap] = useState<GridGap>(gap);
    const [internalRowGap, setInternalRowGap] = useState(rowGap);
    const [internalColumnGap, setInternalColumnGap] = useState(columnGap);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.region,
      label: 'Grid container',
    });

    useEffect(() => { setInternalCols(cols); }, [cols]);
    useEffect(() => { setInternalAlign(align); }, [align]);
    useEffect(() => { setInternalJustify(justify); }, [justify]);
    useEffect(() => { setInternalGap(gap); }, [gap]);
    useEffect(() => { setInternalRowGap(rowGap); }, [rowGap]);
    useEffect(() => { setInternalColumnGap(columnGap); }, [columnGap]);

    const handleClick = useCallback((event: any) => { onClick?.(event); }, [onClick]);

    const gridStyle = gridStyles['getBaseStyle']({
      cols: internalCols,
      rows,
      gap: internalGap,
      rowGap: internalRowGap,
      columnGap: internalColumnGap,
      align: internalAlign,
      justify: internalJustify,
      style: style || {},
    });

    const gridClassName = gridStyles['getClassName']({
      cols: internalCols,
      align: internalAlign,
      justify: internalJustify,
      gap: internalGap,
      className: className || '',
    });

    React.useImperativeHandle(
      ref,
      () => ({
        element: gridRef.current,
        getCols: () => internalCols,
        getAlign: () => internalAlign,
        getJustify: () => internalJustify,
        getGap: () => internalGap,
        setCols: (newCols: GridCols) => setInternalCols(newCols),
        setAlign: (newAlign: GridAlign) => setInternalAlign(newAlign),
        setJustify: (newJustify: GridJustify) => setInternalJustify(newJustify),
        setGap: (newGap: GridGap) => setInternalGap(newGap),
        scrollIntoView: (options?: ScrollIntoViewOptions) => {
          gridRef.current?.scrollIntoView(options);
        },
      }),
      [internalCols, internalAlign, internalJustify, internalGap],
    );

    const mergedStyle = animation.getMergedStyle({ ...gridStyle, ...style });

    return (
      <View ref={gridRef} className={gridClassName} style={mergedStyle} onClick={handleClick} {...a11y.getAriaAttributes()}>
        {children}
      </View>
    );
  },
});

export { Grid as GridComponent };
export default Grid;