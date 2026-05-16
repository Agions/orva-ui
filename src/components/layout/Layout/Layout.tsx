import React, { useRef, useImperativeHandle } from 'react';
import { View } from '@tarojs/components';
import { LayoutProps, LayoutRef } from './Layout.types';
import { getLayoutStyle } from './Layout.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

export const Layout = createComponent<LayoutProps, LayoutRef>({
  name: 'Layout',
  render: (props, ref) => {
    const { className, style, children, hasSider, ...restProps } = props;
    const layoutRef = useRef<any>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.region,
      label: 'Layout container',
    });

    useImperativeHandle(ref, () => ({
      getLayout: () => layoutRef.current,
    }));

    const layoutStyle = getLayoutStyle(hasSider);
    const finalStyle = { ...layoutStyle, ...style };

    const mergedStyle = animation.getMergedStyle(finalStyle);

    return (
      <View ref={layoutRef} className={className} style={mergedStyle} {...a11y.getAriaAttributes()} {...restProps}>
        {children}
      </View>
    );
  },
});

export default Layout;