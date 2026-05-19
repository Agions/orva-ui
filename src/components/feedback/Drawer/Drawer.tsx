/**
 * 抽屉组件 (Drawer)
 * @module components/feedback/Drawer
 * @description 用于显示侧边抽屉的组件，支持多种方向（上下左右）、主题、遮罩层和动画效果
 * @example
 * ```tsx
 * import { Drawer } from 'orva-ui';
 *
 * <Drawer visible={true} title="标题" direction="right">
 *   内容区域
 * </Drawer>
 * ```
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Button } from '@tarojs/components';
import type { DrawerProps, DrawerRef, DrawerDirection, DrawerTheme } from './Drawer.types';
import { BaseStyles, getThemeStyle, getDirectionStyle, mergeStyles } from './Drawer.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * Drawer 组件
 * 提供抽屉功能，支持自定义标题、内容、方向、主题等
 */
const Drawer = createComponent<DrawerProps, DrawerRef>({
  name: 'Drawer',
  render: (props, ref) => {
    const {
      visible: propsVisible,
      defaultVisible,
      direction: propsDirection,
      theme: propsTheme,
      showClose: propsShowClose,
      maskClosable: propsMaskClosable,
      width: propsWidth,
      height: propsHeight,
      config,
      ...restProps
    } = props;

    const mergedConfig = useMemo(() => ({
      title: props.title,
      direction: propsDirection,
      theme: propsTheme,
      showClose: propsShowClose,
      maskClosable: propsMaskClosable,
      width: propsWidth,
      height: propsHeight,
      ...config,
    }), [props.title, propsDirection, propsTheme, propsShowClose, propsMaskClosable, propsWidth, propsHeight, config]);

    const [visible, setVisible] = useState<boolean>(propsVisible || defaultVisible || false);
    const [internalVisible, setInternalVisible] = useState<boolean>(visible);
    const [direction, setDirection] = useState<DrawerDirection>(mergedConfig.direction || 'right');
    const [theme, setTheme] = useState<DrawerTheme>(mergedConfig.theme || 'light');
    const drawerRef = useRef<HTMLDivElement>(null);
    const animationDuration = props.animationDuration || 300;
    const animation = useMicroAnimation({ type: 'micro', enabled: !props.disabled });
    const a11y = useAccessibility({
      role: ARIA_ROLES.dialog,
      focusable: internalVisible,
      label: mergedConfig.title || 'Drawer',
      attributes: { 'aria-hidden': !internalVisible },
    });

    useEffect(() => {
      if (propsVisible !== undefined) setVisible(propsVisible);
    }, [propsVisible]);

    useEffect(() => {
      if (visible) {
        setInternalVisible(true);
        restProps.onOpen?.();
      } else {
        const timer = setTimeout(() => {
          setInternalVisible(false);
          restProps.onClose?.();
        }, animationDuration);
        return () => clearTimeout(timer);
      }
    }, [visible, animationDuration, restProps]);

    useEffect(() => {
      if (mergedConfig.direction) setDirection(mergedConfig.direction);
      if (mergedConfig.theme) setTheme(mergedConfig.theme);
    }, [mergedConfig.direction, mergedConfig.theme]);

    const show = useCallback(() => {
      if (!restProps.disabled) setVisible(true);
    }, [restProps.disabled]);

    const hide = useCallback(() => { setVisible(false); }, []);

    const toggle = useCallback(() => {
      if (!restProps.disabled) setVisible(!visible);
    }, [visible, restProps.disabled]);

    const handleMaskClick = useCallback(() => {
      if (mergedConfig.maskClosable !== false) {
        hide();
        restProps.onMaskClick?.();
      }
    }, [mergedConfig.maskClosable, hide, restProps]);

    const handleCloseClick = useCallback(() => { hide(); }, [hide]);

    const themeStyle = getThemeStyle(theme);
    const directionStyle = getDirectionStyle(direction, mergedConfig.width, mergedConfig.height);

    const renderDrawer = useCallback(() => {
      if (!internalVisible) return null;

      return (
        <>
          {restProps.showMask !== false && (
            <View
              style={mergeStyles(BaseStyles.mask, themeStyle.mask, restProps.maskStyle, {
                opacity: visible ? 1 : 0,
              })}
              className={restProps.maskClassName}
              onClick={handleMaskClick}
            />
          )}
          <View
            ref={drawerRef}
            style={mergeStyles(
              BaseStyles.drawer,
              themeStyle.drawer,
              directionStyle,
              {
                transform: visible ? 'translate(0)' : directionStyle.transform,
                transition: `transform ${animationDuration}ms ease`,
              },
              restProps.style,
              mergedConfig.style,
            )}
            className={restProps.className || mergedConfig.className}
          >
            {(mergedConfig.title || mergedConfig.showClose !== false) && (
              <View style={mergeStyles(BaseStyles.header, themeStyle.header)}>
                {mergedConfig.title && (
                  <View
                    style={mergeStyles(BaseStyles.title, themeStyle.title, restProps.titleStyle)}
                    className={restProps.titleClassName}
                  >
                    {mergedConfig.title}
                  </View>
                )}
                {mergedConfig.showClose !== false && (
                  <Button style={BaseStyles.closeButton} onClick={handleCloseClick}>
                    ×
                  </Button>
                )}
              </View>
            )}
            <View style={mergeStyles(BaseStyles.content, restProps.contentStyle)} className={restProps.contentClassName}>
              {restProps.children}
            </View>
          </View>
        </>
      );
    }, [internalVisible, visible, mergedConfig, restProps, themeStyle, directionStyle, animationDuration, handleMaskClick, handleCloseClick]);

    useEffect(() => {
      if (ref && typeof ref === 'function') {
        ref({ show, hide, toggle, isVisible: () => visible });
      }
    }, [ref, show, hide, toggle, visible]);

    return (
      <>
        {renderDrawer()}
      </>
    );
  },
});

const DrawerWithDefaults = (props: DrawerProps) => {
  const defaultProps: Partial<DrawerProps> = {
    direction: 'right',
    theme: 'light',
    showClose: true,
    maskClosable: true,
    showAnimation: true,
    disabled: false,
    showMask: true,
  };
  return <Drawer {...defaultProps} {...props} />;
};

export { DrawerWithDefaults as Drawer };
export type { DrawerProps, DrawerRef };
export default DrawerWithDefaults;