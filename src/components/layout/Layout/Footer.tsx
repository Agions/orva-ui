import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { LayoutFooterProps, LayoutFooterRef } from './Layout.types';
import { getFooterStyle } from './Layout.styles';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 布局底部组件 (Footer)
 * @module components/layout/Footer
 * @description Layout 布局的底部区域组件
 * @example
 * ```tsx
 * import { Layout, Content, Footer } from 'orva-ui';
 *
 * <Layout>
 *   <Content>内容区域</Content>
 *   <Footer>© 2024 公司名称</Footer>
 * </Layout>
 * ```
 */
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