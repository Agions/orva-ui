import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { LayoutHeaderProps, LayoutHeaderRef } from './Layout.types';
import { getHeaderStyle } from './Layout.styles';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 布局头部组件 (Header)
 * @module components/layout/Header
 * @description Layout 布局的头部区域组件
 * @example
 * ```tsx
 * import { Layout, Header, Content } from 'orva-ui';
 *
 * <Layout>
 *   <Header>标题栏</Header>
 *   <Content>内容区域</Content>
 * </Layout>
 * ```
 */
export const LayoutHeader = createComponent<LayoutHeaderProps, LayoutHeaderRef>({
  name: 'LayoutHeader',
  render: (props, ref) => {
    const { className, style, children, ...restProps } = props;
    const headerRef = useRef<any>(null);

    const a11y = useAccessibility({
      role: ARIA_ROLES.banner,
      label: 'Header',
    });

    React.useImperativeHandle(ref, () => ({ getHeader: () => headerRef.current }), []);

    const headerStyle = getHeaderStyle(style);
    const finalStyle = { ...headerStyle, ...style };

    return (
      <View ref={headerRef} className={className} style={finalStyle} {...a11y.getAriaAttributes()} {...restProps}>
        {children}
      </View>
    );
  },
});

export default LayoutHeader;