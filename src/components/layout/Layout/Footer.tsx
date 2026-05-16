import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { LayoutFooterProps, LayoutFooterRef } from './Layout.types';
import { getFooterStyle } from './Layout.styles';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** 布局底部组件 */
export const LayoutFooter = createComponent<LayoutFooterProps, LayoutFooterRef>({
  name: 'LayoutFooter',
  render: (props, ref) => {
    const { className, style, children, ...restProps } = props;
    const footerRef = useRef<any>(null);

    const a11y = useAccessibility({
      role: ARIA_ROLES.contentinfo,
      label: 'Footer',
    });

    React.useImperativeHandle(ref, () => ({ getFooter: () => footerRef.current }), []);

    const footerStyle = getFooterStyle(style);
    const finalStyle = { ...footerStyle, ...style };

    return (
      <View ref={footerRef} className={className} style={finalStyle} {...a11y.getAriaAttributes()} {...restProps}>
        {children}
      </View>
    );
  },
});

export default LayoutFooter;