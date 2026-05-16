import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { navBarStyles } from './NavBar.styles';
import type { NavBarProps, NavBarRef } from './NavBar.types';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** NavBar 组件 */
export const NavBar = createComponent<NavBarProps, NavBarRef>({
  name: 'NavBar',
  render: (props, ref) => {
    const {
      title,
      left,
      right,
      backArrow = false,
      backIcon,
      onBack,
      position = 'fixed',
      theme = 'light',
      backgroundColor,
      transparent = false,
      border = true,
      placeholder = true,
      safeAreaInsetTop = true,
      className,
      style,
      ...restProps
    } = props;

    const [internalTitle, setInternalTitle] = useState(title);
    const [internalLeft, setInternalLeft] = useState(left);
    const [internalRight, setInternalRight] = useState(right);
    const [internalBackArrow, setInternalBackArrow] = useState(backArrow);
    const navBarRef = useRef<any>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.navigation,
      label: typeof title === 'string' ? title : 'Navigation bar',
    });

    useEffect(() => { setInternalTitle(title); }, [title]);
    useEffect(() => { setInternalLeft(left); }, [left]);
    useEffect(() => { setInternalRight(right); }, [right]);
    useEffect(() => { setInternalBackArrow(backArrow); }, [backArrow]);

    const handleBack = useCallback(() => {
      onBack?.();
      if (!onBack && typeof window !== 'undefined' && window.history) {
        window.history.back();
      }
    }, [onBack]);

    const renderBackArrow = () => {
      if (!internalBackArrow) return null;
      return (
        <View
          className="orva-ui-navbar__back-arrow"
          onClick={handleBack}
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s ease',
          }}
        >
          <Text
            className="orva-ui-navbar__back-icon"
            style={{
              fontSize: '16px',
              color: theme === 'dark' ? '#ffffff' : '#000000',
            }}
          >
            {backIcon || '←'}
          </Text>
        </View>
      );
    };

    const getContainerStyle = () => {
      const baseStyle = {
        ...navBarStyles.container,
        backgroundColor: backgroundColor || (transparent ? 'transparent' : theme === 'dark' ? '#1a1a1a' : '#ffffff'),
        ...(border && !transparent ? navBarStyles.border : {}),
        ...(position === 'fixed' ? navBarStyles.fixed : {}),
        ...style,
      };
      if (position === 'fixed' && safeAreaInsetTop) {
        return { ...baseStyle, paddingTop: '44px' };
      }
      return baseStyle;
    };

    const getContentStyle = () => {
      const baseStyle = {
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        boxSizing: 'border-box' as const,
      };
      if (position === 'fixed' && safeAreaInsetTop) {
        return { ...baseStyle, height: '88px', paddingTop: '44px' };
      }
      return baseStyle;
    };

    React.useImperativeHandle(
      ref,
      () => ({
        element: navBarRef.current,
        setTitle: (newTitle: React.ReactNode) => setInternalTitle(newTitle),
        setLeft: (newLeft: React.ReactNode) => setInternalLeft(newLeft),
        setRight: (newRight: React.ReactNode) => setInternalRight(newRight),
        showBackArrow: () => setInternalBackArrow(true),
        hideBackArrow: () => setInternalBackArrow(false),
      }),
      [],
    );

    const containerClassName = [
      'orva-ui-navbar',
      `orva-ui-navbar--${position}`,
      `orva-ui-navbar--${theme}`,
      transparent ? 'orva-ui-navbar--transparent' : '',
      border ? 'orva-ui-navbar--border' : '',
      className || '',
    ].filter(Boolean).join(' ');

    const mergedStyle = animation.getMergedStyle(getContainerStyle());

    return (
      <>
        {position === 'fixed' && placeholder && (
          <View
            className="orva-ui-navbar__placeholder"
            style={{
              height: safeAreaInsetTop ? '88px' : '44px',
              backgroundColor: 'transparent',
            }}
          />
        )}
        <View ref={navBarRef} className={containerClassName} style={mergedStyle} {...a11y.getAriaAttributes()} {...restProps}>
          <View className="orva-ui-navbar__content" style={getContentStyle()}>
            <View className="orva-ui-navbar__left" style={navBarStyles.left}>
              {internalLeft}
              {!internalLeft && renderBackArrow()}
            </View>
            <View className="orva-ui-navbar__center" style={navBarStyles.center}>
              <Text
                className="orva-ui-navbar__title"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                numberOfLines={1}
              >
                {internalTitle}
              </Text>
            </View>
            <View className="orva-ui-navbar__right" style={navBarStyles.right}>
              {internalRight}
            </View>
          </View>
        </View>
      </>
    );
  },
});

export default NavBar;