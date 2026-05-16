/**
 * Progress 进度条组件
 * @module components/feedback/Progress
 * @description 用于展示操作进度或加载状态的组件，支持线性、圆形、仪表盘三种类型。
 * 支持动画、状态、尺寸、自定义颜色等功能。
 *
 * @example
 * ```tsx
 * <Progress percent={50} />
 * <Progress percent={75} status="success" />
 * <Progress type="circle" percent={60} />
 * ```
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import type { ProgressProps, ProgressRef, ProgressStatus, ProgressLineCap } from './Progress.types';
import {
  getLineStyle,
  getCircleStyle,
  getDashboardStyle,
  getInfoStyle,
  getContainerStyle,
  getSvgStyle,
} from './Progress.styles';
import { createProgressAnimation, easingFunctions } from './utils/animation';
import { validatePercent, formatProgressValue, calculateProgressStatus } from './utils/progress-calculator';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

interface SVGCircleProps {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke: string;
  strokeWidth: number;
  strokeLinecap?: ProgressLineCap;
  strokeDasharray?: number;
  strokeDashoffset?: number;
  transform?: string;
  transformOrigin?: string;
  style?: React.CSSProperties;
}

const SVGCircle: React.FC<SVGCircleProps> = React.memo(
  ({ cx, cy, r, fill = 'none', stroke, strokeWidth, strokeLinecap = 'round', strokeDasharray, strokeDashoffset, transform, transformOrigin, style }) => {
    const svgProps: any = { cx, cy, r, fill, stroke, strokeWidth, strokeLinecap };
    if (strokeDasharray !== undefined) svgProps.strokeDasharray = strokeDasharray;
    if (strokeDashoffset !== undefined) svgProps.strokeDashoffset = strokeDashoffset;
    if (transform !== undefined) svgProps.transform = transform;
    if (transformOrigin !== undefined) svgProps.transformOrigin = transformOrigin;
    if (style !== undefined) svgProps.style = style;
    return <circle {...svgProps} />;
  },
);

SVGCircle.displayName = 'SVGCircle';

export const Progress = createComponent<ProgressProps, ProgressRef>({
  name: 'Progress',
  render: (props, ref) => {
    const {
      type = 'line',
      percent = 0,
      status: propStatus,
      size = 'default',
      strokeWidth: customStrokeWidth,
      strokeColor,
      trailColor,
      showInfo = true,
      format,
      className,
      style,
      title,
      description,
      gapDegree = 75,
      gapPosition = 'top',
      animationDuration = 300,
      animated = true,
      strokeLinecap = 'round',
      segments,
      successPercent,
      theme,
      events,
      ariaLabel,
      ariaDescribedby,
      children,
      ...rest
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<any>(null);
    const [internalPercent, setInternalPercent] = useState(() => validatePercent(percent));
    const [isAnimating, setIsAnimating] = useState(false);
    const [status, setStatus] = useState<ProgressStatus>(() => propStatus || (calculateProgressStatus(internalPercent, 'normal') as ProgressStatus));
    const animation = useMicroAnimation({ type: 'micro', enabled: animated });
    const a11y = useAccessibility({
      role: ARIA_ROLES.progressbar,
      focusable: false,
      label: ariaLabel || `${internalPercent}%`,
      attributes: {
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        'aria-valuenow': String(internalPercent),
        'aria-describedby': ariaDescribedby || '',
      },
    });

    const animateProgress = useCallback(
      (targetPercent: number) => {
        if (animationRef.current) animationRef.current.cancel();

        const validatedTarget = validatePercent(targetPercent);

        if (animated && Math.abs(validatedTarget - internalPercent) > 0.1) {
          setIsAnimating(true);
          events?.onAnimationStart?.();

          animationRef.current = createProgressAnimation(
            internalPercent,
            validatedTarget,
            (newPercent) => {
              setInternalPercent(newPercent);
              events?.onChange?.(newPercent);
            },
            {
              duration: animationDuration,
              easing: easingFunctions.easeInOut,
              onStart: () => { setIsAnimating(true); },
              onComplete: () => {
                setIsAnimating(false);
                events?.onAnimationEnd?.();
                if (validatedTarget >= 100) {
                  setStatus('success');
                  events?.onComplete?.();
                }
              },
            },
          );
          animationRef.current.start();
        } else {
          setInternalPercent(validatedTarget);
          events?.onChange?.(validatedTarget);
          if (validatedTarget >= 100) {
            setStatus('success');
            events?.onComplete?.();
          }
        }
      },
      [internalPercent, animated, animationDuration, events],
    );

    useEffect(() => {
      const validatedPercent = validatePercent(percent);
      if (Math.abs(validatedPercent - internalPercent) > 0.1) {
        animateProgress(validatedPercent);
      }
    }, [percent, internalPercent, animateProgress]);

    useEffect(() => {
      if (propStatus) setStatus(propStatus);
    }, [propStatus]);

    useEffect(() => {
      return () => { if (animationRef.current) animationRef.current.cancel(); };
    }, []);

    const formatProgress = useCallback((percentValue: number): React.ReactNode => {
      return formatProgressValue(percentValue, format);
    }, [format]);

    const getProgressColor = useCallback(() => {
      if (strokeColor) return typeof strokeColor === 'string' ? strokeColor : theme?.primaryColor || '#1890ff';
      const statusColors = {
        normal: theme?.primaryColor || '#1890ff',
        success: theme?.successColor || '#52c41a',
        exception: theme?.errorColor || '#ff4d4f',
        active: theme?.warningColor || '#faad14',
      };
      return statusColors[status];
    }, [strokeColor, status, theme]);

    const renderLineProgress = useCallback(() => {
      const lineStyles = getLineStyle({ strokeWidth: customStrokeWidth, trailColor, strokeColor: getProgressColor(), status, animated, strokeLinecap, theme });
      return (
        <View style={getContainerStyle('line', style)} className={`progress-line ${className || ''}`}>
          <View style={lineStyles['outer']}>
            <View style={{ ...lineStyles['inner'], width: `${internalPercent}%` }} />
          </View>
          {showInfo && (
            <Text style={getInfoStyle(size)} className="line-info">
              {formatProgress(internalPercent)}
            </Text>
          )}
        </View>
      );
    }, [customStrokeWidth, trailColor, getProgressColor, status, animated, strokeLinecap, theme, style, className, showInfo, size, formatProgress, internalPercent]);

    const renderCircleProgress = useCallback(() => {
      const circleStyles = getCircleStyle({ size, strokeWidth: customStrokeWidth, trailColor, strokeColor: getProgressColor(), status, percent: internalPercent, animated, strokeLinecap, theme });
      const svgStyle = getSvgStyle(circleStyles['outer'].width);
      return (
        <View style={getContainerStyle('circle', style)} className={`progress-circle ${className || ''}`}>
          <View style={circleStyles['outer']}>
            <svg width={circleStyles['outer'].width} height={circleStyles['outer'].height} style={svgStyle}>
              <SVGCircle cx={circleStyles['trail'].cx} cy={circleStyles['trail'].cy} r={circleStyles['trail'].r} stroke={circleStyles['trail'].stroke} strokeWidth={circleStyles['trail'].strokeWidth} strokeLinecap={strokeLinecap} />
              <SVGCircle cx={circleStyles['path'].cx} cy={circleStyles['path'].cy} r={circleStyles['path'].r} stroke={circleStyles['path'].stroke} strokeWidth={circleStyles['path'].strokeWidth} strokeLinecap={strokeLinecap} strokeDasharray={circleStyles['path'].strokeDasharray} strokeDashoffset={circleStyles['path'].strokeDashoffset} transform={circleStyles['path'].transform} transformOrigin={circleStyles['path'].transformOrigin} />
            </svg>
            {showInfo && (
              <View style={circleStyles['inner']}>
                <Text style={getInfoStyle(size)}>{formatProgress(internalPercent)}</Text>
              </View>
            )}
          </View>
        </View>
      );
    }, [size, customStrokeWidth, trailColor, getProgressColor, status, internalPercent, animated, strokeLinecap, theme, style, className, showInfo, formatProgress]);

    const renderDashboardProgress = useCallback(() => {
      const dashboardStyles = getDashboardStyle({ size, strokeWidth: customStrokeWidth, trailColor, strokeColor: getProgressColor(), status, percent: internalPercent, gapDegree, gapPosition, animated, strokeLinecap, theme });
      const svgStyle = getSvgStyle(dashboardStyles['outer'].width);
      return (
        <View style={getContainerStyle('dashboard', style)} className={`progress-dashboard ${className || ''}`}>
          <View style={dashboardStyles['outer']}>
            <svg width={dashboardStyles['outer'].width} height={dashboardStyles['outer'].height} style={svgStyle}>
              <SVGCircle cx={dashboardStyles['trail'].cx} cy={dashboardStyles['trail'].cy} r={dashboardStyles['trail'].r} stroke={dashboardStyles['trail'].stroke} strokeWidth={dashboardStyles['trail'].strokeWidth} strokeLinecap={strokeLinecap} strokeDasharray={dashboardStyles['trail'].strokeDasharray} strokeDashoffset={dashboardStyles['trail'].strokeDashoffset} transform={dashboardStyles['trail'].transform} transformOrigin={dashboardStyles['trail'].transformOrigin} />
              <SVGCircle cx={dashboardStyles['path'].cx} cy={dashboardStyles['path'].cy} r={dashboardStyles['path'].r} stroke={dashboardStyles['path'].stroke} strokeWidth={dashboardStyles['path'].strokeWidth} strokeLinecap={strokeLinecap} strokeDasharray={dashboardStyles['path'].strokeDasharray} strokeDashoffset={dashboardStyles['path'].strokeDashoffset} transform={dashboardStyles['path'].transform} transformOrigin={dashboardStyles['path'].transformOrigin} />
            </svg>
            {showInfo && (
              <View style={dashboardStyles['inner']}>
                <Text style={getInfoStyle(size)}>{formatProgress(internalPercent)}</Text>
              </View>
            )}
          </View>
        </View>
      );
    }, [size, customStrokeWidth, trailColor, getProgressColor, status, internalPercent, gapDegree, gapPosition, animated, strokeLinecap, theme, style, className, showInfo, formatProgress]);

    const renderProgress = useCallback(() => {
      switch (type) {
        case 'line': return renderLineProgress();
        case 'circle': return renderCircleProgress();
        case 'dashboard': return renderDashboardProgress();
        default: return renderLineProgress();
      }
    }, [type, renderLineProgress, renderCircleProgress, renderDashboardProgress]);

    // 暴露给 ref 的方法
    useEffect(() => {
      if (ref && typeof ref === 'function') {
        ref({
          getPercent: () => internalPercent,
          getProgress: () => internalPercent,
          setProgress: (newPercent: number) => animateProgress(newPercent),
          setPercent: (newPercent: number) => animateProgress(newPercent),
          reset: () => { animateProgress(0); setStatus('normal'); },
          start: () => { setIsAnimating(true); events?.onAnimationStart?.(); },
          startAnimation: () => { setIsAnimating(true); events?.onAnimationStart?.(); },
          pause: () => { if (animationRef.current) { animationRef.current.pause(); setIsAnimating(false); } },
          stopAnimation: () => { if (animationRef.current) { animationRef.current.cancel(); setIsAnimating(false); } },
          complete: () => { animateProgress(100); },
          getElement: () => containerRef.current,
          getStatus: () => status,
          setStatus: (newStatus: ProgressStatus) => setStatus(newStatus),
          isAnimating: () => isAnimating,
        });
      }
    }, [ref, internalPercent, animateProgress, status, isAnimating, events]);

    const progressClasses = [
      className,
      'orva-ui-h5-progress',
      type && `orva-ui-h5-progress--${type}`,
      status && `orva-ui-h5-progress--${status}`,
      size && `orva-ui-h5-progress--${size}`,
      animated && 'orva-ui-h5-progress--animated',
    ].filter(Boolean).join(' ');

    const mergedStyle = animation.getMergedStyle({ ...getContainerStyle(type, style), ...style });

    return (
      <View ref={containerRef} className={progressClasses} style={mergedStyle} {...a11y.getAriaAttributes()} {...rest}>
        {title && <Text style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>{title}</Text>}
        {renderProgress()}
        {description && <Text style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>{description}</Text>}
        {children}
      </View>
    );
  },
});

export default Progress;