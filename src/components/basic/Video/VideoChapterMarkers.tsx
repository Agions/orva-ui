/**
 * VideoChapterMarkers 组件 - 视频章节标记
 * 显示和导航视频章节标记
 * @module components/basic/Video/VideoChapterMarkers
 */

import { useCallback, useState } from 'react';
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

    // 如果没有章节，不渲染
    if (!visible || !chapters.length) {
      return null;
    }

    return (
      <View style={{ position: 'relative' }} {...a11y.getAriaAttributes()}>
        {/* 章节菜单按钮 */}
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 15,
          }}
        >
          <View
            style={{
              padding: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 4,
              cursor: 'pointer',
            }}
            onClick={handleMenuToggle}
            aria-label="Chapter menu"
            aria-expanded={showChapterList}
          >
            <Text style={{ color: '#fff', fontSize: 14 }}>📑</Text>
          </View>

          {/* 章节列表 */}
          {showChapterList && (
            <View
              style={{
                position: 'absolute',
                top: 40,
                right: 0,
                width: 200,
                maxHeight: 300,
                overflowY: 'auto',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                borderRadius: 8,
                padding: 8,
              }}
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
                    style={{
                      padding: 10,
                      borderRadius: 4,
                      backgroundColor: isCurrent ? theme.colors.primary : 'transparent',
                      cursor: 'pointer',
                      marginBottom: 4,
                    }}
                    onClick={() => handleChapterSelect(chapter)}
                    role="menuitem"
                    aria-label={`${chapter.title} at ${formatTime(chapterTime)}`}
                  >
                    <Text
                      style={{
                        color: isCurrent ? '#fff' : '#fff',
                        fontSize: 13,
                        fontWeight: isCurrent ? 'bold' : 'normal',
                      }}
                    >
                      {chapter.title}
                    </Text>
                    <Text
                      style={{
                        color: isCurrent ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.5)',
                        fontSize: 11,
                        marginTop: 2,
                      }}
                    >
                      {formatTime(chapterTime)}
                    </Text>
                    {chapter.description && (
                      <Text
                        style={{
                          color: isCurrent ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)',
                          fontSize: 10,
                          marginTop: 2,
                        }}
                      >
                        {chapter.description}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* 章节标记条 */}
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            left: 12,
            right: 12,
            display: 'flex',
            gap: 4,
            zIndex: 10,
          }}
        >
          {chapters.map((chapter, index) => {
            const isCurrent = index === currentChapterIndex;
            const chapterTime = chapter.time ?? chapter.startTime;
            const position = (chapterTime / 100) * 100; // 简化计算，实际应根据视频时长

            return (
              <View
                key={chapter.id || chapter.title || index}
                style={{
                  position: 'absolute',
                  left: `${Math.min(position, 95)}%`,
                  bottom: 0,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: isCurrent ? theme.colors.primary : 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  transform: 'translateX(-50%)',
                }}
                onClick={() => handleChapterSelect(chapter)}
                aria-label={`Chapter: ${chapter.title}`}
                aria-current={isCurrent ? 'step' : undefined}
              />
            );
          })}
        </View>

        {/* 当前章节提示 */}
        {currentChapter && (
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              padding: '4px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 4,
              zIndex: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}>
              {currentChapter.title}
            </Text>
          </View>
        )}
      </View>
    );
  },
});

export default VideoChapterMarkers;
