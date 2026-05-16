/**
 * Taro-Uno Drawer Component
 * 抽屉组件实现
 */

import { useState, useEffect, useRef, useCallback } from 'react';
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
    const mergedConfig = {
      title: props.title,
      direction: props.direction,
      theme: props.theme,
      showClose: props.showClose,
      maskClosable: props.maskClosable,
      width: props.width,
      height: props.height,
      ...props.config,
    };

    const [visible, setVisible] = useState<boolean>(props.visible || props.defaultVisible || false);
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
      if (props.visible !== undefined) setVisible(props.visible);
    }, [props.visible]);

    useEffect(() => {
      if (visible) {
        setInternalVisible(true);
        props.onOpen?.();
      } else {
        const timer = setTimeout(() => {
          setInternalVisible(false);
          props.onClose?.();
        }, animationDuration);
        return () => clearTimeout(timer);
      }
    }, [visible, animationDuration, props.onOpen, props.onClose]);

    useEffect(() => {
      if (mergedConfig.direction) setDirection(mergedConfig.direction);
      if (mergedConfig.theme) setTheme(mergedConfig.theme);
    }, [mergedConfig.direction, mergedConfig.theme]);

    const show = useCallback(() => {
      if (!props.disabled) setVisible(true);
    }, [props.disabled]);

    const hide = useCallback(() => { setVisible(false); }, []);

    const toggle = useCallback(() => {
      if (!props.disabled) setVisible(!visible);
    }, [visible, props.disabled]);

    const handleMaskClick = useCallback(() => {
      if (mergedConfig.maskClosable !== false) {
        hide();
        props.onMaskClick?.();
      }
    }, [mergedConfig.maskClosable, hide, props.onMaskClick]);

    const handleCloseClick = useCallback(() => { hide(); }, [hide]);

    const themeStyle = getThemeStyle(theme);
    const directionStyle = getDirectionStyle(direction, mergedConfig.width, mergedConfig.height);

    const renderDrawer = useCallback(() => {
      if (!internalVisible) return null;

      return (
        <>
          {props.showMask !== false && (
            <View
              style={mergeStyles(BaseStyles.mask, themeStyle.mask, props.maskStyle, {
                opacity: visible ? 1 : 0,
              })}
              className={props.maskClassName}
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
              props.style,
              mergedConfig.style,
            )}
            className={props.className || mergedConfig.className}
          >
            {(mergedConfig.title || mergedConfig.showClose !== false) && (
              <View style={mergeStyles(BaseStyles.header, themeStyle.header)}>
                {mergedConfig.title && (
                  <View
                    style={mergeStyles(BaseStyles.title, themeStyle.title, props.titleStyle)}
                    className={props.titleClassName}
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
            <View style={mergeStyles(BaseStyles.content, props.contentStyle)} className={props.contentClassName}>
              {props.children}
            </View>
          </View>
        </>
      );
    }, [internalVisible, visible, mergedConfig, props, themeStyle, directionStyle, animationDuration, handleMaskClick, handleCloseClick]);

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