import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { colStyles } from './Col.styles';
import type { ColProps, ColRef, ColSpan, ColOffset, ColOrder } from './Col.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 栅格列组件 (Col)
 * @module components/layout/Col
 * @description 栅格系统中的列组件，用于创建响应式布局
 * @example
 * ```tsx
 * import { Row, Col } from 'orva-ui';
 *
 * <Row>
 *   <Col span={12}><Box>左半边</Box></Col>
 *   <Col span={12}><Box>右半边</Box></Col>
 * </Row>
 *
 * // 响应式断点
 * <Col span={24} md={12} lg={8} xl={6}>
 *   自适应列
 * </Col>
 * ```
 */
export const Col = createComponent<ColProps, ColRef>({
  name: 'Col',
  render: (props, ref) => {
    const { children, span = 24, offset = 0, order = 0, gutter = 0, flex, className, style, onClick, responsive } = props;

    const colRef = useRef<typeof View>(null);
    const [internalSpan, setInternalSpan] = useState<ColSpan>(span);
    const [internalOffset, setInternalOffset] = useState<ColOffset>(offset);
    const [internalOrder, setInternalOrder] = useState<ColOrder>(order);
    const [internalFlex, setInternalFlex] = useState(flex);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.region,
      label: 'Column container',
    });

    useEffect(() => { setInternalSpan(span); }, [span]);
    useEffect(() => { setInternalOffset(offset); }, [offset]);
    useEffect(() => { setInternalOrder(order); }, [order]);
    useEffect(() => { setInternalFlex(flex); }, [flex]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => { onClick?.(event); }, [onClick]);

    const colStyle = colStyles['getBaseStyle']({ span: internalSpan, offset: internalOffset, order: internalOrder, gutter, flex: internalFlex, style: style || {} });
    const responsiveStyle = responsive ? colStyles['getResponsiveStyle'](responsive) : {};
    const colClassName = colStyles['getClassName']({ span: internalSpan, offset: internalOffset, flex: internalFlex, className: className || '' });

    React.useImperativeHandle(
      ref,
      () => ({
        element: colRef.current,
        getSpan: () => internalSpan,
        getOffset: () => internalOffset,
        getOrder: () => internalOrder,
        setSpan: (newSpan: ColSpan) => setInternalSpan(newSpan),
        setOffset: (newOffset: ColOffset) => setInternalOffset(newOffset),
        setOrder: (newOrder: ColOrder) => setInternalOrder(newOrder),
        scrollIntoView: (options?: ScrollIntoViewOptions) => {
          (colRef.current as unknown as HTMLElement)?.scrollIntoView(options);
        },
      }),
      [internalSpan, internalOffset, internalOrder],
    );

    const mergedStyle = animation.getMergedStyle({ ...colStyle, ...responsiveStyle });

    return (
      <View ref={colRef} className={colClassName} style={mergedStyle} onClick={handleClick} {...a11y.getAriaAttributes()}>
        {children}
      </View>
    );
  },
});

export { Col as ColComponent };
export default Col;