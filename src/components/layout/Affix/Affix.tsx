/**
 * 固钉组件 (Affix)
 * @module components/layout/Affix
 * @description 将元素固定在可视区域的组件，常用于导航栏、侧边栏的固定定位
 * @example
 * ```tsx
 * import { Affix } from 'orva-ui';
 *
 * <Affix offsetTop={0}>
 *   <NavBar />
 * </Affix>
 * ```
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View } from '@tarojs/components';
import { AffixProps, AffixRef } from './Affix.types';
import { getAffixStyle, getRelativeStyle } from './Affix.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

export const Affix = createComponent<AffixProps, AffixRef>({
  name: 'Affix',
  render: (props, ref) => {
    const { className, style, children, offset, offsetTop, offsetBottom, target, onChange, ...restProps } = props;
    const [affixed, setAffixed] = useState(false);
    const [position, setPosition] = useState<'top' | 'bottom'>('top');
    const affixRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.region,
      label: 'Affixed element',
    });

    const updatePosition = useCallback(() => {
      if (!affixRef.current || !containerRef.current) return;

      const targetElement = target?.() || window;
      const containerRect = containerRef.current.getBoundingClientRect();
      const scrollTop = targetElement instanceof Window ? targetElement.scrollY : targetElement.scrollTop;
      const targetHeight = targetElement instanceof Window ? targetElement.innerHeight : targetElement.clientHeight;

      const top = offset?.top ?? offsetTop ?? 0;
      const bottom = offset?.bottom ?? offsetBottom ?? 0;

      const shouldBeAffixedTop = scrollTop >= containerRect.top - top;
      const shouldBeAffixedBottom = scrollTop + targetHeight <= containerRect.bottom + bottom;

      if (shouldBeAffixedTop) {
        setAffixed(true);
        setPosition('top');
      } else if (shouldBeAffixedBottom) {
        setAffixed(true);
        setPosition('bottom');
      } else {
        setAffixed(false);
      }
    }, [offset, offsetTop, offsetBottom, target]);

    useEffect(() => {
      updatePosition();

      const targetElement = target?.() || window;
      targetElement.addEventListener('scroll', updatePosition);
      targetElement.addEventListener('resize', updatePosition);

      return () => {
        targetElement.removeEventListener('scroll', updatePosition);
        targetElement.removeEventListener('resize', updatePosition);
      };
    }, [updatePosition, target]);

    useEffect(() => {
      onChange?.(affixed);
    }, [affixed, onChange]);

    const affixStyle = getAffixStyle(
      affixed,
      position,
      offset?.top ?? offsetTop ?? offset?.bottom ?? offsetBottom,
      style,
    );

    const finalStyle = { ...affixStyle, ...style };
    const mergedStyle = animation.getMergedStyle(finalStyle);

    return (
      <View ref={containerRef} style={getRelativeStyle()} {...a11y.getAriaAttributes()}>
        <View ref={affixRef} className={className} style={mergedStyle} {...restProps}>
          {children}
        </View>
      </View>
    );
  },
});

export default Affix;