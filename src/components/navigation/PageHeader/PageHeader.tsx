/**
 * 页面头部组件 (PageHeader)
 * @module components/navigation/PageHeader
 * @description 用于展示页面标题、面包屑、返回按钮和操作区域的组件，支持多种布局和主题
 * @example
 * ```tsx
 * import { PageHeader } from 'orva-ui';
 *
 * <PageHeader
 *   title="页面标题"
 *   breadcrumbs={[{ title: '首页', path: '/' }, { title: '当前页' }]}
 *   onBack={() => history.back()}
 * />
 * ```
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Navigator } from '@tarojs/components';
import type {
  PageHeaderProps,
  PageHeaderRef,
  PageHeaderAction,
  PageHeaderBackConfig,
  PageHeaderBreadcrumbConfig,
} from './PageHeader.types';
import { BaseStyles, getThemeStyle, getLayoutStyle, getSizeStyle, mergeStyles } from './PageHeader.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 简单的面包屑渲染组件
 */
const SimpleBreadcrumb = ({
  items,
  separator = '/',
}: {
  items?: Array<{ text: string; href?: string }>;
  separator?: string;
}) => {
  if (!items || items.length === 0) return null;

  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
      {items.map((item, index) => (
        <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {index > 0 && <Text style={{ margin: '0 4px', color: '#999' }}>{separator}</Text>}
          {item.href ? (
            <Navigator url={item.href}>
              <Text style={{ color: '#0ea5e9' }}>{item.text}</Text>
            </Navigator>
          ) : (
            <Text style={{ color: index === items.length - 1 ? '#333' : '#666' }}>{item.text}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

/**
 * PageHeader 组件
 */
export const PageHeader = createComponent<PageHeaderProps, PageHeaderRef>({
  name: 'PageHeader',
  render: (props, ref) => {
    const mergedConfig = {
      theme: props.theme,
      layout: props.layout,
      size: props.size,
      back: props.back,
      breadcrumb: props.breadcrumb,
      showActions: props.showActions,
      showTitle: props.showTitle,
      showSubtitle: props.showSubtitle,
      showExtra: props.showExtra,
      ...props.config,
    };

    const [backConfig, setBackConfig] = useState<PageHeaderBackConfig>(() => {
      if (props.back === false) return { show: false };
      if (typeof props.back === 'boolean') return { show: true };
      return props.back || { show: true };
    });

    const [breadcrumbConfig, setBreadcrumbConfig] = useState<PageHeaderBreadcrumbConfig>(() => {
      if (props.breadcrumb === false) return { show: false };
      if (typeof props.breadcrumb === 'boolean') return { show: true };
      return props.breadcrumb || { show: true };
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: false });
    const a11y = useAccessibility({
      role: ARIA_ROLES.banner,
    });

    const themeStyle = getThemeStyle(mergedConfig.theme || 'light');
    const layoutStyle = getLayoutStyle(mergedConfig.layout || 'default');
    const sizeStyle = getSizeStyle(mergedConfig.size || 'md');

    useEffect(() => {
      if (props.back === false) setBackConfig({ show: false });
      else if (typeof props.back === 'boolean') setBackConfig({ show: true });
      else if (props.back) setBackConfig(props.back);
    }, [props.back]);

    useEffect(() => {
      if (props.breadcrumb === false) setBreadcrumbConfig({ show: false });
      else if (typeof props.breadcrumb === 'boolean') setBreadcrumbConfig({ show: true });
      else if (props.breadcrumb) setBreadcrumbConfig(props.breadcrumb);
    }, [props.breadcrumb]);

    const handleBackClick = useCallback(() => {
      backConfig.onClick?.();
      props.onBackClick?.();
    }, [backConfig.onClick, props.onBackClick]);

    const handleActionClick = useCallback(
      (action: PageHeaderAction, index: number) => {
        action.onClick?.();
        props.onActionClick?.(action, index);
      },
      [props.onActionClick],
    );

    const renderBackButton = useCallback(() => {
      if (!backConfig.show) return null;
      if (props.renderBack) return props.renderBack();

      const backContent = (
        <View
          style={mergeStyles(BaseStyles.backButton, themeStyle.backButton, backConfig.style)}
          className={backConfig.className}
          onClick={handleBackClick}
        >
          <Text style={mergeStyles(BaseStyles.backIcon, themeStyle.backIcon)}>{backConfig.icon || '←'}</Text>
          {backConfig.text && <Text style={mergeStyles(BaseStyles.backText, themeStyle.backText)}>{backConfig.text}</Text>}
        </View>
      );

      if (backConfig.href) {
        return (
          <Navigator
            url={backConfig.href}
            style={mergeStyles(BaseStyles.backButton, themeStyle.backButton, backConfig.style)}
            className={backConfig.className}
            onClick={handleBackClick}
          >
            {backContent}
          </Navigator>
        );
      }
      return backContent;
    }, [backConfig, themeStyle, handleBackClick, props.renderBack]);

    const renderBreadcrumb = useCallback(() => {
      if (!breadcrumbConfig.show) return null;
      if (props.renderBreadcrumb) return props.renderBreadcrumb();

      const items = (breadcrumbConfig.items || []).map((item) => ({
        text: item.label || item.value || '',
        href: item.href,
      }));

      return (
        <View
          style={mergeStyles(BaseStyles.breadcrumbContainer, breadcrumbConfig.style)}
          className={breadcrumbConfig.className}
        >
          <SimpleBreadcrumb items={items} separator={String(breadcrumbConfig.separator || '/')} />
        </View>
      );
    }, [breadcrumbConfig, props.renderBreadcrumb]);

    const renderTitle = useCallback(() => {
      if (mergedConfig.showTitle === false) return null;
      if (props.renderTitle) return props.renderTitle();
      if (!props.title) return null;
      return <Text style={mergeStyles(BaseStyles.title, themeStyle.title, sizeStyle.title)}>{props.title}</Text>;
    }, [mergedConfig.showTitle, props.renderTitle, props.title, themeStyle.title, sizeStyle.title]);

    const renderSubtitle = useCallback(() => {
      if (mergedConfig.showSubtitle === false) return null;
      if (props.renderSubtitle) return props.renderSubtitle();
      if (!props.subtitle) return null;
      return <Text style={mergeStyles(BaseStyles.subtitle, themeStyle.subtitle, sizeStyle.subtitle)}>{props.subtitle}</Text>;
    }, [mergedConfig.showSubtitle, props.renderSubtitle, props.subtitle, themeStyle.subtitle, sizeStyle.subtitle]);

    const renderExtra = useCallback(() => {
      if (mergedConfig.showExtra === false) return null;
      if (props.renderExtra) return props.renderExtra();
      if (!props.extra) return null;
      return <Text style={mergeStyles(BaseStyles.extra, themeStyle.extra)}>{props.extra}</Text>;
    }, [mergedConfig.showExtra, props.renderExtra, props.extra, themeStyle.extra]);

    const renderActionButton = useCallback(
      (action: PageHeaderAction, index: number) => {
        const actionContent = (
          <View
            style={mergeStyles(
              BaseStyles.actionButton,
              themeStyle.actionButton,
              action.style,
              action.disabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined,
            )}
            className={action.className}
            onClick={() => !action.disabled && handleActionClick(action, index)}
          >
            {action.icon && <Text style={mergeStyles(BaseStyles.actionIcon, themeStyle.actionIcon)}>{action.icon}</Text>}
            <Text style={mergeStyles(BaseStyles.actionText, themeStyle.actionText)}>{action.text}</Text>
          </View>
        );

        if (action.href && !action.disabled) {
          return (
            <Navigator
              key={action.text || index}
              url={action.href}
              style={mergeStyles(BaseStyles.actionButton, themeStyle.actionButton, action.style)}
              className={action.className}
              onClick={() => handleActionClick(action, index)}
            >
              {actionContent}
            </Navigator>
          );
        }
        return <View key={action.text || index}>{actionContent}</View>;
      },
      [themeStyle.actionButton, themeStyle.actionIcon, themeStyle.actionText, handleActionClick],
    );

    const renderActions = useCallback(() => {
      if (mergedConfig.showActions === false) return null;
      if (props.renderActions) return props.renderActions();
      if (!props.actions || props.actions.length === 0) return null;

      return (
        <View style={BaseStyles.actionsArea}>
          {props.actions.map((action, index) => renderActionButton(action, index))}
        </View>
      );
    }, [mergedConfig.showActions, props.renderActions, props.actions, renderActionButton]);

    useEffect(() => {
      if (ref && typeof ref === 'function') {
        ref({
          getConfig: () => mergedConfig as any,
          reset: () => {
            setBackConfig({ show: true, ...(typeof props.back === 'object' ? props.back : {}) });
            setBreadcrumbConfig({ show: true, ...(typeof props.breadcrumb === 'object' ? props.breadcrumb : {}) });
          },
        });
      }
    }, [ref, mergedConfig, props.back, props.breadcrumb]);

    const mergedStyle = animation.getMergedStyle(mergeStyles(
      BaseStyles.container,
      themeStyle.container,
      layoutStyle,
      sizeStyle.container,
      props.style,
      mergedConfig.style,
    ));

    return (
      <View
        ref={containerRef}
        style={mergedStyle}
        className={`${props.className} ${mergedConfig.className}`}
        {...a11y.getAriaAttributes()}
      >
        <View style={BaseStyles.topArea}>
          <View style={BaseStyles.leftArea}>
            {renderBackButton()}
            {renderBreadcrumb()}
          </View>
          <View style={BaseStyles.rightArea}>
            {renderActions()}
          </View>
        </View>
        <View style={BaseStyles.titleArea}>
          {renderTitle()}
          {renderSubtitle()}
        </View>
        {renderExtra()}
      </View>
    );
  },
});

const PageHeaderWithDefaults = (props: PageHeaderProps) => {
  const defaultProps: Partial<PageHeaderProps> = {
    theme: 'light',
    layout: 'default',
    size: 'md',
    back: { show: true },
    breadcrumb: { show: false },
    showActions: false,
    showTitle: true,
    showSubtitle: true,
    showExtra: true,
    actions: [],
  };
  return <PageHeader {...defaultProps} {...props} />;
};

export default PageHeaderWithDefaults;