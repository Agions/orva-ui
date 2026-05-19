import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View } from '@tarojs/components';
import { LayoutSiderProps, LayoutSiderRef } from './Layout.types';
import { getSiderStyle } from './Layout.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 布局侧边栏组件 (Sider)
 * @module components/layout/Sider
 * @description Layout 布局的侧边栏组件，支持折叠展开
 * @example
 * ```tsx
 * import { Layout, Sider, Content } from 'orva-ui';
 *
 * <Layout>
 *   <Sider width={200} collapsible>
 *     侧边菜单
 *   </Sider>
 *   <Content>内容区域</Content>
 * </Layout>
 * ```
 */
export const LayoutSider = createComponent<LayoutSiderProps, LayoutSiderRef>({
  name: 'LayoutSider',
  render: (props, ref) => {
    const { className, style, children, width = 200, collapsed = false, collapsedWidth = 80, onCollapse, ...restProps } = props;
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const siderRef = useRef<any>(null);

    const animation = useMicroAnimation({ type: 'micro', enabled: true });
    const a11y = useAccessibility({
      role: ARIA_ROLES.complementary,
      label: 'Sidebar',
    });

    const toggleCollapse = useCallback(() => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onCollapse?.(newCollapsed);
    }, [isCollapsed, onCollapse]);

    useEffect(() => { setIsCollapsed(collapsed); }, [collapsed]);

    const currentWidth = isCollapsed ? collapsedWidth : width;

    React.useImperativeHandle(ref, () => ({ getSider: () => siderRef.current, toggleCollapse }), [toggleCollapse]);

    const siderStyle = getSiderStyle(isCollapsed, currentWidth, style);
    const finalStyle = animation.getMergedStyle({ ...siderStyle, ...style });

    return (
      <View ref={siderRef} className={className} style={finalStyle} {...a11y.getAriaAttributes()} {...restProps}>
        {children}
      </View>
    );
  },
});

export default LayoutSider;