import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { LayoutContentProps, LayoutContentRef } from './Layout.types';
import { getContentStyle } from './Layout.styles';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 布局内容区域组件 (Content)
 * @module components/layout/Content
 * @description Layout 布局的主要内容区域组件
 * @example
 * ```tsx
 * import { Layout, Header, Content, Footer } from 'orva-ui';
 *
 * <Layout>
 *   <Header>头部</Header>
 *   <Content>主要内容</Content>
 *   <Footer>底部</Footer>
 * </Layout>
 * ```
 */
export const LayoutContent = createComponent<LayoutContentProps, LayoutContentRef>({
  name: 'LayoutContent',
  render: (props, ref) => {
    const { className, style, children, ...restProps } = props;
    const contentRef = useRef<any>(null);

    const a11y = useAccessibility({
      role: ARIA_ROLES.main,
      label: 'Main Content',
    });

    React.useImperativeHandle(ref, () => ({ getContent: () => contentRef.current }), []);

    const contentStyle = getContentStyle(style);
    const finalStyle = { ...contentStyle, ...style };

    return (
      <View ref={contentRef} className={className} style={finalStyle} {...a11y.getAriaAttributes()} {...restProps}>
        {children}
      </View>
    );
  },
});

export default LayoutContent;