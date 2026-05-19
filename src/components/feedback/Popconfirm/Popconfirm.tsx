/**
 * 确认弹窗组件 (Popconfirm)
 * @module components/feedback/Popconfirm
 * @description 用于显示确认弹窗的组件，支持自定义标题、内容、按钮文字、方向、主题等
 * @example
 * ```tsx
 * import { Popconfirm } from 'orva-ui';
 *
 * <Popconfirm
 *   visible={true}
 *   title="确认删除？"
 *   content="此操作不可恢复"
 *   okText="删除"
 *   cancelText="取消"
 * />
 * ```
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Button } from '@tarojs/components';
import type { PopconfirmProps, PopconfirmRef, PopconfirmDirection, PopconfirmTheme } from './Popconfirm.types';
import { BaseStyles, getThemeStyle, getDirectionStyle, getButtonStyle, mergeStyles } from './Popconfirm.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * Popconfirm 组件
 * 提供确认弹窗功能，支持自定义标题、内容、按钮、方向、主题等
 */
const Popconfirm = createComponent<PopconfirmProps, PopconfirmRef>({
  name: 'Popconfirm',
  render: (props, ref) => {
    // 合并配置和直接属性
    const mergedConfig = useMemo(() => ({
      title: props.title,
      content: props.content,
      direction: props.direction,
      theme: props.theme,
      showClose: props.showClose,
      maskClosable: props.maskClosable,
      width: props.width,
      height: props.height,
      ...props.config,
    }), [props.title, props.content, props.direction, props.theme, props.showClose, props.maskClosable, props.width, props.height, props.config]);

    const [visible, setVisible] = useState<boolean>(props.visible || props.defaultVisible || false);
    const [internalVisible, setInternalVisible] = useState<boolean>(visible);
    const [direction, setDirection] = useState<PopconfirmDirection>(mergedConfig.direction || 'top');
    const [theme, setTheme] = useState<PopconfirmTheme>(mergedConfig.theme || 'light');
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const animationDuration = props.animationDuration || 300;
    const animation = useMicroAnimation({ type: 'micro', enabled: !props.disabled });
    const a11y = useAccessibility({
      role: ARIA_ROLES.dialog,
      focusable: internalVisible,
      label: mergedConfig.title || 'Confirmation',
      attributes: {
        'aria-hidden': !internalVisible,
      },
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

    const handleConfirm = useCallback(() => {
      props.onConfirm?.();
      hide();
    }, [props.onConfirm, hide]);

    const handleCancel = useCallback(() => {
      props.onCancel?.();
      hide();
    }, [props.onCancel, hide]);

    const handleMaskClick = useCallback(() => {
      if (mergedConfig.maskClosable !== false) {
        hide();
        props.onMaskClick?.();
      }
    }, [mergedConfig.maskClosable, hide, props.onMaskClick]);

    const handleCloseClick = useCallback(() => { hide(); }, [hide]);

    const handleTriggerClick = useCallback(() => {
      if (props.trigger === 'click' || !props.trigger) toggle();
    }, [props.trigger, toggle]);

    const themeStyle = getThemeStyle(theme);
    const directionStyle = getDirectionStyle(direction);

    const renderButton = useCallback(
      (buttonConfig: any, isOkButton: boolean) => {
        if (!buttonConfig) return null;
        const buttonProps = typeof buttonConfig === 'string' ? { text: buttonConfig } : buttonConfig;
        const buttonType = isOkButton ? props.okType || 'primary' : props.cancelType || 'default';
        const baseButtonStyle = isOkButton ? themeStyle.okButton : themeStyle.cancelButton;
        const typeStyle = getButtonStyle(buttonType);

        const handleClick = () => {
          buttonProps.onClick?.();
          if (isOkButton) handleConfirm();
          else handleCancel();
        };

        return (
          <Button
            key={isOkButton ? 'ok' : 'cancel'}
            style={mergeStyles(BaseStyles.button, baseButtonStyle, typeStyle, buttonProps.style)}
            className={buttonProps.className}
            onClick={handleClick}
            disabled={buttonProps.disabled}
          >
            {buttonProps.text}
          </Button>
        );
      },
      [themeStyle, props.okType, props.cancelType, handleConfirm, handleCancel],
    );

    const renderPopconfirm = useCallback(() => {
      if (!internalVisible) return null;

      const renderButtons = () => {
        const okButtonConfig = mergedConfig.okButton || props.okText || '确认';
        const cancelButtonConfig = mergedConfig.cancelButton || props.cancelText || '取消';

        return (
          <View
            style={mergeStyles(BaseStyles.buttonContainer, props.buttonContainerStyle)}
            className={props.buttonContainerClassName}
          >
            {renderButton(cancelButtonConfig, false)}
            {renderButton(okButtonConfig, true)}
          </View>
        );
      };

      return (
        <>
          <View
            style={mergeStyles(BaseStyles.mask, themeStyle.mask, props.maskStyle)}
            className={props.maskClassName}
            onClick={handleMaskClick}
          />
          <View
            ref={popupRef}
            style={mergeStyles(
              BaseStyles.popup,
              themeStyle.popup,
              directionStyle,
              {
                width: mergedConfig.width,
                height: mergedConfig.height,
                animation: visible ? 'popconfirm-enter 0.3s ease-out' : 'popconfirm-leave 0.3s ease-in',
              } as React.CSSProperties,
              props.style,
              mergedConfig.style,
            )}
            className={props.className || mergedConfig.className}
          >
            {mergedConfig.title && (
              <View
                style={mergeStyles(BaseStyles.title, themeStyle.title, props.titleStyle)}
                className={props.titleClassName}
              >
                {props.icon && <View style={BaseStyles.icon}>{props.icon}</View>}
                {mergedConfig.title}
              </View>
            )}
            {mergedConfig.showClose !== false && (
              <Button style={BaseStyles.closeButton} onClick={handleCloseClick}>
                ×
              </Button>
            )}
            <View style={mergeStyles(BaseStyles.content, props.contentStyle)} className={props.contentClassName}>
              {mergedConfig.content}
            </View>
            {renderButtons()}
          </View>
        </>
      );
    }, [internalVisible, visible, mergedConfig, props, themeStyle, directionStyle, direction, renderButton, handleMaskClick, handleCloseClick]);

    // 暴露方法给父组件
    useEffect(() => {
      if (ref && typeof ref === 'function') {
        ref({ show, hide, toggle, isVisible: () => visible });
      }
    }, [show, hide, toggle, visible]);

    const mergedContainerStyle = animation.getMergedStyle(BaseStyles.container);

    return (
      <View ref={containerRef} style={mergedContainerStyle} className={props.className} {...a11y.getAriaAttributes()}>
        <View style={BaseStyles.trigger} onClick={handleTriggerClick}>
          {props.children}
        </View>
        {renderPopconfirm()}
      </View>
    );
  },
});

// 使用默认参数设置默认属性
const PopconfirmWithDefaults = (props: PopconfirmProps) => {
  const defaultProps: Partial<PopconfirmProps> = {
    direction: 'top',
    theme: 'light',
    showClose: false,
    maskClosable: true,
    trigger: 'click',
    showAnimation: true,
    disabled: false,
  };
  return <Popconfirm {...defaultProps} {...props} />;
};

export { PopconfirmWithDefaults as Popconfirm };
export type { PopconfirmProps, PopconfirmRef };
export default PopconfirmWithDefaults;