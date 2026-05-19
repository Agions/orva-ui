/**
 * 视频章节标记组件 (VideoChapterMarkers)
 * @module components/basic/Video/VideoChapterMarkers
 * @description 显示和导航视频章节标记的组件
 * @example
 * ```tsx
 * <VideoChapterMarkers
 *   chapters={[{ time: 0, title: '开场' }, { time: 60, title: '第一部分' }]}
 *   currentTime={30}
 *   onChapterClick={(time) => {}}
 * />
 * ```
 */

import { useCallback, useState, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import type { VideoChapterMarkersProps, VideoChapter } from './Video.types';
import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useAccessibility, ARIA_ROLES, ARIA_LABELS } from '@/hooks/ui/useAccessibility';
import { formatTime } from './utils';

export const VideoChapterMarkers = createComponent<VideoChapterMarkersProps, HTMLDivElement>({
  name: 'VideoChapterMarkers',

  defaultProps: {
    visible: false,
    chapters: [],
  },

  render: (props, _ref) => {
    const {
      visible,
      chapters,
      currentTime,
      currentChapter,
      onChapterSelect,
      onMenuClose,
    } = props;

    const [showChapterList, setShowChapterList] = useState(false);
    const theme = useTheme();
    const a11y = useAccessibility({
      role: ARIA_ROLES.navigation,
      label: ARIA_LABELS.videoChapters,
    });

    const handleChapterSelect = useCallback(
      (chapter: VideoChapter) => {
        onChapterSelect?.(chapter);
        setShowChapterList(false);
      },
      [onChapterSelect],
    );

    const handleMenuToggle = useCallback(() => {
      setShowChapterList(!showChapterList);
    }, [showChapterList]);

    const handleMenuCloseFn = useCallback(() => {
      setShowChapterList(false);
      onMenuClose?.();
    }, [onMenuClose]);

    // 获取当前章节索引
    const getCurrentChapterIndex = () => {
      if (!chapters.length) return -1;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const chapterTime = chapters[i].time ?? chapters[i].startTime;
        if (currentTime >= chapterTime) {
          return i;
        }
      }
      return 0;
    };

    const currentChapterIndex = getCurrentChapterIndex();

    // ===== 模块级静态样式 =====
    const menuButtonStyle = useMemo(() => ({
      padding: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 4,
      cursor: 'pointer' as const,
    }), []);

    const chapterListStyle = useMemo(() => ({
      position: 'absolute' as const,
      top: 40,
      right: 0,
      width: 200,
      maxHeight: 300,
      overflowY: 'auto' as const,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderRadius: 8,
      padding: 8,
    }), []);

    const chapterItemStyle = useCallback((isCurrent: boolean) => ({
      padding: 10,
      borderRadius: 4,
      backgroundColor: isCurrent ? theme.colors.primary : 'transparent',
      cursor: 'pointer' as const,
      marginBottom: 4,
    }), [theme.colors.primary]);

    const chapterTitleStyle = useMemo(() => ({
      color: '#fff',
      fontSize: 13,
    }), []);

    const chapterTimeStyle = useCallback((isCurrent: boolean) => ({
      color: isCurrent ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
      fontSize: 11,
      marginTop: 2,
    }), []);

    const chapterDescStyle = useCallback((isCurrent: boolean) => ({
      color: isCurrent ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)',
      fontSize: 10,
      marginTop: 2,
    }), []);

    const markerDotStyle = useCallback((isCurrent: boolean, position: number) => ({
      position: 'absolute' as const,
      left: `${Math.min(position, 95)}%`,
      bottom: 0,
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: isCurrent ? theme.colors.primary : 'rgba(255, 255, 255, 0.4)',
      cursor: 'pointer' as const,
      transform: 'translateX(-50%)',
    }), [theme.colors.primary]);

    const chapterTipStyle = useMemo(() => ({
      position: 'absolute' as const,
      top: 12,
      left: 12,
      padding: '4px 12px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 4,
      zIndex: 10,
    }), []);

    const menuIconStyle = { color: '#fff', fontSize: 14 };
    const tipTextStyle = { color: '#fff', fontSize: 12 };

    // 如果没有章节，不渲染
    if (!visible || !chapters.length) {
      return null;
    }

    return (
      <View style={{ position: 'relative' }} {...a11y.getAriaAttributes()}>
        {/* 章节菜单按钮 */}
        <View style={{ position: 'absolute', top: 12, right: 12, zIndex: 15 }}>
          <View
            style={menuButtonStyle}
            onClick={handleMenuToggle}
            aria-label="Chapter menu"
            aria-expanded={showChapterList}
          >
            <Text style={menuIconStyle}>📑</Text>

            {/* 章节列表 */}
            {showChapterList && (
              <View
                style={chapterListStyle}
                {...({ onMouseLeave: handleMenuCloseFn } as Record<string, unknown>)}
                role="menu"
                aria-label="Video chapters"
              >
                {chapters.map((chapter, index) => {
                  const isCurrent = index === currentChapterIndex;
                  const chapterTime = chapter.time ?? chapter.startTime;
                  return (
                    <View
                      key={chapter.id || chapter.title || index}
                      style={chapterItemStyle(isCurrent)}
                      onClick={() => handleChapterSelect(chapter)}
                      role="menuitem"
                      aria-label={`${chapter.title} at ${formatTime(chapterTime)}`}
                    >
                      <Text style={chapterTitleStyle}>{chapter.title}</Text>
                      <Text style={chapterTimeStyle(isCurrent)}>{formatTime(chapterTime)}</Text>
                      {chapter.description && (
                        <Text style={chapterDescStyle(isCurrent)}>{chapter.description}</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>

        {/* 章节标记条 */}
        <View style={{ position: 'absolute', bottom: 60, left: 12, right: 12, display: 'flex', gap: 4, zIndex: 10 }}>
          {chapters.map((chapter, index) => {
            const isCurrent = index === currentChapterIndex;
            const chapterTime = chapter.time ?? chapter.startTime;
            const position = (chapterTime / 100) * 100;

            return (
              <View
                key={chapter.id || chapter.title || index}
                style={markerDotStyle(isCurrent, position)}
                onClick={() => handleChapterSelect(chapter)}
                aria-label={`Chapter: ${chapter.title}`}
                aria-current={isCurrent ? 'step' : undefined}
              />
            );
          })}
        </View>

        {/* 当前章节提示 */}
        {currentChapter && (
          <View style={chapterTipStyle}>
            <Text style={tipTextStyle}>{currentChapter.title}</Text>
          </View>
        )}
      </View>
    );
  },
});

export default VideoChapterMarkers;
