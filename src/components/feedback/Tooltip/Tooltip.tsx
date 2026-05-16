import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import type { TooltipProps, TooltipRef, TooltipTrigger, TooltipEventHandler } from './Tooltip.types';
import { tooltipStyles } from './Tooltip.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';
import { createLogger } from '../../../utils/logger';

const logger = createLogger('Tooltip');

export const Tooltip = createComponent<TooltipProps, TooltipRef>({
  name: 'Tooltip',
  render: (props, ref) => {
    const {
      title,
      trigger = 'hover',
      placement = 'top',
      arrow = true,
      visible: controlledVisible,
      defaultVisible = false,
      color,
      overlayStyle,
      overlayClassName,
      children,
      mouseEnterDelay = 100,
      mouseLeaveDelay = 100,
      clickOutsideToClose = true,
      alignPoint = false,
      className,
      style,
      onVisibleChange,
      onShow,
      onHide,
      animation: _animation,
      showDelay,
      hideDelay,
      popupStyle,
      disabled = false,
      ...rest
    } = props;

    const [internalVisible, setInternalVisible] = useState(defaultVisible);
    const [internalTitle, setInternalTitle] = useState(title);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const visibleRef = useRef(internalVisible);
    const animation = useMicroAnimation({ type: 'micro', enabled: !disabled });
    const a11y = useAccessibility({
      role: ARIA_ROLES.tooltip,
      focusable: true,
      label: internalTitle as string,
      attributes: {
        'aria-describedby': internalVisible ? 'tooltip-content' : undefined,
        'aria-expanded': internalVisible,
      },
    });

    useEffect(() => { visibleRef.current = internalVisible; }, [internalVisible]);

    const visible = controlledVisible !== undefined ? controlledVisible : internalVisible;

    const clearTimer = useCallback(() => {
      if (timer) { clearTimeout(timer); setTimer(null); }
    }, [timer]);

    const setTimerCallback = useCallback(
      (callback: () => void, delay: number) => {
        clearTimer();
        const newTimer = setTimeout(callback, delay);
        setTimer(newTimer);
      },
      [clearTimer],
    );

    const showTooltip = useCallback(() => {
      if (!visibleRef.current) {
        setInternalVisible(true);
        onVisibleChange?.(true);
        onShow?.();
      }
    }, [onVisibleChange, onShow]);

    const hideTooltip = useCallback(() => {
      if (visibleRef.current) {
        setInternalVisible(false);
        onVisibleChange?.(false);
        onHide?.();
      }
    }, [onVisibleChange, onHide]);

    const getTriggers = useCallback((triggers: TooltipTrigger | TooltipTrigger[]) => {
      return Array.isArray(triggers) ? triggers : [triggers];
    }, []);

    const handleTouchStart = useCallback(() => {
      if (disabled) return;
      const triggers = getTriggers(trigger);
      if (triggers.includes('hover')) {
        const delay = showDelay !== undefined ? showDelay : mouseEnterDelay;
        setTimerCallback(showTooltip, delay);
      }
    }, [disabled, trigger, mouseEnterDelay, showDelay, showTooltip, setTimerCallback, getTriggers]);

    const handleTouchEnd = useCallback(() => {
      if (disabled) return;
      const triggers = getTriggers(trigger);
      if (triggers.includes('hover')) {
        const delay = hideDelay !== undefined ? hideDelay : mouseLeaveDelay;
        setTimerCallback(hideTooltip, delay);
      }
    }, [disabled, trigger, mouseLeaveDelay, hideDelay, hideTooltip, setTimerCallback, getTriggers]);

    const handleMouseEnter = useCallback(() => {
      if (disabled) return;
      const triggers = getTriggers(trigger);
      if (triggers.includes('hover')) {
        const delay = showDelay !== undefined ? showDelay : mouseEnterDelay;
        setTimerCallback(showTooltip, delay);
      }
    }, [disabled, trigger, mouseEnterDelay, showDelay, showTooltip, setTimerCallback, getTriggers]);

    const handleMouseLeave = useCallback(() => {
      if (disabled) return;
      const triggers = getTriggers(trigger);
      if (triggers.includes('hover')) {
        const delay = hideDelay !== undefined ? hideDelay : mouseLeaveDelay;
        setTimerCallback(hideTooltip, delay);
      }
    }, [disabled, trigger, mouseLeaveDelay, hideDelay, hideTooltip, setTimerCallback, getTriggers]);

    const handleClick = useCallback(
      (_event: ITouchEvent) => {
        if (disabled) return;
        const triggers = getTriggers(trigger);
        if (triggers.includes('click')) {
          if (visible) hideTooltip();
          else showTooltip();
        }
      },
      [disabled, trigger, visible, showTooltip, hideTooltip, getTriggers],
    );

    const handleFocus = useCallback(() => {
      if (disabled) return;
      const triggers = getTriggers(trigger);
      if (triggers.includes('focus')) showTooltip();
    }, [disabled, trigger, showTooltip, getTriggers]);

    const handleBlur = useCallback(() => {
      if (disabled) return;
      const triggers = getTriggers(trigger);
      if (triggers.includes('focus')) hideTooltip();
    }, [disabled, trigger, hideTooltip, getTriggers]);

    const handleLongPress = useCallback(
      (_event: ITouchEvent) => {
        if (disabled) return;
        const triggers = getTriggers(trigger);
        if (triggers.includes('contextMenu')) {
          if (visible) hideTooltip();
          else showTooltip();
        }
      },
      [disabled, trigger, visible, showTooltip, hideTooltip, getTriggers],
    );

    useEffect(() => { return () => { clearTimer(); }; }, [clearTimer]);
    useEffect(() => { setInternalTitle(title); }, [title]);

    React.useImperativeHandle(
      ref,
      () => ({
        show: showTooltip,
        hide: hideTooltip,
        getVisible: () => visible,
        updateTitle: (newTitle: React.ReactNode) => setInternalTitle(newTitle),
        reposition: () => { logger.info('Reposition tooltip - Taro environment'); },
      }),
      [showTooltip, hideTooltip, visible],
    );

    const renderArrow = useCallback(() => {
      if (!arrow) return null;
      const arrowStyle = tooltipStyles['getArrowStyle'](placement, color, arrow);
      return <View style={arrowStyle} />;
    }, [arrow, placement, color]);

    const renderTooltip = useCallback(() => {
      if (!visible || !internalTitle) return null;
      const tooltipStyle = tooltipStyles['getTooltipStyle'](placement, color, overlayStyle);
      const contentStyle = tooltipStyles['getContentStyle'](color);
      return (
        <View
          data-tooltip="true"
          style={tooltipStyle}
          className={overlayClassName}
          role="tooltip"
          aria-hidden={!visible}
          id="tooltip-content"
        >
          {renderArrow()}
          <View style={contentStyle}>
            <Text>{internalTitle}</Text>
          </View>
        </View>
      );
    }, [visible, placement, color, overlayStyle, overlayClassName, internalTitle, renderArrow]);

    const getContainerEvents = useCallback(() => {
      const triggers = getTriggers(trigger);
      const events: Record<string, TooltipEventHandler> = {};

      if (triggers.includes('hover')) {
        events['onTouchStart'] = handleTouchStart;
        events['onTouchEnd'] = handleTouchEnd;
        events['onMouseEnter'] = handleMouseEnter;
        events['onMouseLeave'] = handleMouseLeave;
      }
      if (triggers.includes('click')) { events['onClick'] = handleClick; }
      if (triggers.includes('focus')) {
        events['onFocus'] = handleFocus;
        events['onBlur'] = handleBlur;
      }
      if (triggers.includes('contextMenu')) { events['onLongPress'] = handleLongPress; }

      return events;
    }, [trigger, getTriggers, handleTouchStart, handleTouchEnd, handleMouseEnter, handleMouseLeave, handleClick, handleFocus, handleBlur, handleLongPress]);

    const containerStyle = tooltipStyles['getContainerStyle'](style);
    const containerEvents = getContainerEvents();

    const mergedStyle = animation.getMergedStyle(containerStyle);

    return (
      <View
        style={mergedStyle}
        className={className}
        {...containerEvents}
        {...a11y.getAriaAttributes()}
        {...rest}
      >
        {children}
        {renderTooltip()}
      </View>
    );
  },
});

export default Tooltip;