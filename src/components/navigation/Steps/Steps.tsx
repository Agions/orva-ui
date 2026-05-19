/**
 * 步骤条组件 (Steps)
 * @module components/navigation/Steps
 * @description 用于展示步骤进度的组件，支持垂直/水平方向、点状/数字/图标步骤、状态自定义等
 * @example
 * ```tsx
 * import { Steps } from 'orva-ui';
 *
 * <Steps current={1} direction="horizontal">
 *   <Steps.Step title="步骤一" description="基本信息" />
 *   <Steps.Step title="步骤二" description="填写表单" />
 *   <Steps.Step title="步骤三" description="完成" />
 * </Steps>
 * ```
 */

import React, { useRef, useImperativeHandle } from 'react';
import { View, Text } from '@tarojs/components';
import { StepsProps, StepsRef, Step } from './Steps.types';
import {
  getStepsStyle,
  getStepStyle,
  getStepItemStyle,
  getStepIconStyle,
  getStepContentStyle,
  getStepTitleStyle,
  getStepDescriptionStyle,
  getStepTailStyle,
} from './Steps.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * Steps 步骤条组件
 * @module components/navigation/Steps
 * @description 用于展示步骤流程的组件，支持水平/垂直方向、步骤状态、图标和自定义渲染。
 *
 * @example
 * ```tsx
 * <Steps current={1}>
 *   <Step title="步骤一" description="描述" />
 *   <Step title="步骤二" description="描述" />
 * </Steps>
 * ```
 */

export const Steps = createComponent<StepsProps, StepsRef>({
  name: 'Steps',
  render: (props, ref) => {
    const {
      className,
      style,
      current = 0,
      direction = 'horizontal',
      labelPlacement: _labelPlacement = 'horizontal',
      progressDot = false,
      initial: _initial = 0,
      status,
      size = 'default',
      items,
      children: _children,
      onChange,
      ...restProps
    } = props;

    const stepsRef = useRef<HTMLDivElement>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.navigation,
      label: 'Steps',
    });

    useImperativeHandle(ref, () => ({
      getSteps: () => stepsRef.current,
    }));

    const getStepStatus = (index: number): 'wait' | 'process' | 'finish' | 'error' => {
      if (status) {
        if (index === current && status !== 'finish') return status;
      }
      if (index < current) return 'finish';
      if (index === current) return 'process';
      return 'wait';
    };

    const handleStepClick = (index: number) => {
      if (onChange) onChange(index);
    };

    const steps: Step[] = items || [];

    const mergedStyle = animation.getMergedStyle(getStepsStyle(direction, style) as React.CSSProperties);

    return (
      <View
        ref={stepsRef}
        className={className}
        style={mergedStyle}
        {...a11y.getAriaAttributes()}
        {...restProps}
      >
        {steps.map((step, index) => {
          const stepStatus = step.status || getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <View
              key={index}
              style={getStepStyle(direction, isLast) as React.CSSProperties}
              onClick={() => !step.disabled && handleStepClick(index)}
            >
              <View style={getStepItemStyle() as React.CSSProperties}>
                {progressDot ? (
                  typeof progressDot === 'function' ? (
                    progressDot(index, stepStatus, step.title, step.description)
                  ) : (
                    <View style={getStepIconStyle(stepStatus, size) as React.CSSProperties}>•</View>
                  )
                ) : (
                  <View style={getStepIconStyle(stepStatus, size) as React.CSSProperties}>
                    {step.icon || index + 1}
                  </View>
                )}
                <View style={getStepContentStyle() as React.CSSProperties}>
                  <Text style={getStepTitleStyle(stepStatus) as React.CSSProperties}>{step.title}</Text>
                  {step.description && (
                    <Text style={getStepDescriptionStyle() as React.CSSProperties}>{step.description}</Text>
                  )}
                </View>
              </View>
              {!isLast && <View style={getStepTailStyle(direction, stepStatus === 'finish') as React.CSSProperties} />}
            </View>
          );
        })}
      </View>
    );
  },
});

export default Steps;