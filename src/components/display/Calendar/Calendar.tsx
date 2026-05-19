import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import { calendarStyles } from './Calendar.styles';
import type { CalendarProps, CalendarRef, CalendarDate } from './Calendar.types';
import { useThemeContext as useTheme } from '@/providers/ThemeProvider';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * Calendar 日历组件
 * @module components/display/Calendar
 * @description 用于展示日期、选择日期的日历组件，支持月/周视图、日期范围选择、事件标记、自定义渲染等功能。
 *
 * @example
 * ```tsx
 * <Calendar onSelect={handleSelect} />
 * <Calendar mode="week" value={selectedDate} onChange={handleChange} />
 * ```
 */
export const Calendar = createComponent<CalendarProps, CalendarRef>({
  name: 'Calendar',
  render: (props, ref) => {
    const {
      value,
      defaultValue,
      mode = 'month',
      showToday = true,
      showEvents = false,
      events = [],
      disabledDate,
      dateRender,
      monthRender,
      onSelect,
      onChange,
      onModeChange,
      style,
      className,
      ariaLabel,
      role = 'grid',
      ...rest
    } = props;

    const { isDark } = useTheme();
    const elementRef = useRef<any>(null);

    const [currentDate, setCurrentDate] = useState(value || defaultValue || new Date());
    const [currentMode, setCurrentMode] = useState(mode);
    const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

    const animation = useMicroAnimation({ type: 'micro', enabled: true });
    const a11y = useAccessibility({
      role: ARIA_ROLES.grid,
      label: ariaLabel,
      attributes: {
        'aria-label': ariaLabel,
        'aria-readonly': 'false',
      },
    });

    useEffect(() => {
      if (value) {
        setCurrentDate(value);
        setSelectedDate(value);
      }
    }, [value]);

    const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];
    const MONTH_NAMES = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

    const datesInMonth = useMemo(() => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const today = new Date();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());
      const endDate = new Date(lastDay);
      endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

      const dates: CalendarDate[] = [];
      const current = new Date(startDate);

      while (current <= endDate) {
        const isCurrentMonth = current.getMonth() === month;
        const isToday = current.getFullYear() === today.getFullYear() && current.getMonth() === today.getMonth() && current.getDate() === today.getDate();
        const isSelected = selectedDate && current.getFullYear() === selectedDate.getFullYear() && current.getMonth() === selectedDate.getMonth() && current.getDate() === selectedDate.getDate();

        const dateEvents = events.filter((event) => {
          const eventDate = new Date(event.startTime || '');
          return eventDate.getFullYear() === current.getFullYear() && eventDate.getMonth() === current.getMonth() && eventDate.getDate() === current.getDate();
        });

        dates.push({
          year: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate(),
          isCurrentMonth,
          isToday,
          isSelected: Boolean(isSelected),
          disabled: disabledDate?.(new Date(current)) || false,
          events: dateEvents,
        });
        current.setDate(current.getDate() + 1);
      }
      return dates;
    }, [currentDate, selectedDate, events, disabledDate]);

    const handleDateClick = useCallback(
      (date: CalendarDate) => {
        if (date.disabled) return;
        const newDate = new Date(date.year, date.month - 1, date.day);
        setSelectedDate(newDate);
        onSelect?.(newDate);
        onChange?.(newDate);
      },
      [onSelect, onChange],
    );

    const handleMonthClick = useCallback(
      (monthIndex: number) => {
        const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
        setCurrentDate(newDate);
        setCurrentMode('month');
        onChange?.(newDate);
        onModeChange?.('month');
      },
      [currentDate, onChange, onModeChange],
    );

    const handleHeaderTitleClick = useCallback(() => {
      setCurrentMode(currentMode === 'month' ? 'year' : 'month');
      onModeChange?.(currentMode === 'month' ? 'year' : 'month');
    }, [currentMode, onModeChange]);

    const handlePrevClick = useCallback(() => {
      const newDate = new Date(currentDate);
      if (currentMode === 'month') newDate.setMonth(newDate.getMonth() - 1);
      else newDate.setFullYear(newDate.getFullYear() - 1);
      setCurrentDate(newDate);
      onChange?.(newDate);
    }, [currentDate, currentMode, onChange]);

    const handleNextClick = useCallback(() => {
      const newDate = new Date(currentDate);
      if (currentMode === 'month') newDate.setMonth(newDate.getMonth() + 1);
      else newDate.setFullYear(newDate.getFullYear() + 1);
      setCurrentDate(newDate);
      onChange?.(newDate);
    }, [currentDate, currentMode, onChange]);

    const handleTodayClick = useCallback(() => {
      const today = new Date();
      setCurrentDate(today);
      setSelectedDate(today);
      setCurrentMode('month');
      onChange?.(today);
    }, [onChange]);

    const renderDateCell = (date: CalendarDate) => {
      if (dateRender) return dateRender(date);

      let cellStyle = { ...calendarStyles['dateCell'] };
      if (!date.isCurrentMonth) cellStyle = { ...cellStyle, ...calendarStyles['dateCellOtherMonth'] };
      if (date.isToday) cellStyle = { ...cellStyle, ...calendarStyles['dateCellToday'] };
      if (date.isSelected) cellStyle = { ...cellStyle, ...calendarStyles['dateCellSelected'] };
      if (date.disabled) cellStyle = { ...cellStyle, ...calendarStyles['dateCellDisabled'] };

      return (
        <View key={`${date.year}-${date.month}-${date.day}`} style={cellStyle} onClick={() => handleDateClick(date)}>
          <Text>{date.day}</Text>
          {showEvents && date.events && date.events.length > 0 && (
            <View style={calendarStyles['eventIndicator'] ?? {}}>
              {date.events.slice(0, 3).map((event) => (
                <View
                  key={event.id}
                  style={{
                    ...calendarStyles['eventDot'],
                    backgroundColor: event.color || calendarStyles['eventDotDefault']?.backgroundColor || '#007bff',
                  }}
                />
              ))}
            </View>
          )}
        </View>
      );
    };

    const renderMonthView = () => (
      <>
        <View style={calendarStyles['weekHeader'] ?? {}}>
          {WEEK_DAYS.map((day) => (
            <View key={day} style={calendarStyles['weekHeaderCell'] ?? {}}><Text>{day}</Text></View>
          ))}
        </View>
        <View style={calendarStyles['dateGrid'] ?? {}}>
          {datesInMonth.map((date: CalendarDate) => renderDateCell(date))}
        </View>
      </>
    );

    const renderYearView = () => (
      <View style={calendarStyles['monthGrid'] ?? {}}>
        {MONTH_NAMES.map((month, index) => {
          if (monthRender) return monthRender(index, currentDate.getFullYear());
          let cellStyle = { ...calendarStyles['monthCell'] };
          if (index === currentDate.getMonth()) cellStyle = { ...cellStyle, ...calendarStyles['monthCellCurrent'] };
          return (
            <View key={month} style={cellStyle} onClick={() => handleMonthClick(index)}>
              <Text>{month}</Text>
            </View>
          );
        })}
      </View>
    );

    const getHeaderTitle = () => currentMode === 'month' ? `${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月` : `${currentDate.getFullYear()}年`;

    React.useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
        getCurrentDate: () => currentDate,
        setDate: (date: Date) => { setCurrentDate(date); onChange?.(date); },
        getMode: () => currentMode,
        setMode: (mode: 'month' | 'year') => { setCurrentMode(mode); onModeChange?.(mode); },
        goToToday: () => { const today = new Date(); setCurrentDate(today); setSelectedDate(today); onChange?.(today); },
        goPrev: () => {
          const newDate = new Date(currentDate);
          if (currentMode === 'month') newDate.setMonth(newDate.getMonth() - 1);
          else newDate.setFullYear(newDate.getFullYear() - 1);
          setCurrentDate(newDate);
          onChange?.(newDate);
        },
        goNext: () => {
          const newDate = new Date(currentDate);
          if (currentMode === 'month') newDate.setMonth(newDate.getMonth() + 1);
          else newDate.setFullYear(newDate.getFullYear() + 1);
          setCurrentDate(newDate);
          onChange?.(newDate);
        },
      }),
      [currentDate, currentMode, onChange, onModeChange],
    );

    const baseStyle = animation.getMergedStyle({ ...calendarStyles['base'], ...style });

    return (
      <View
        ref={elementRef}
        style={baseStyle}
        className={`${className ?? ''} ${isDark ? 'dark' : 'light'}`}
        aria-label={ariaLabel}
        role={role}
        {...a11y.getAriaAttributes()}
        {...rest}
      >
        <View style={calendarStyles['header'] ?? {}}>
          <Text style={calendarStyles['headerButton'] ?? {}} onClick={handlePrevClick}>‹</Text>
          <Text style={calendarStyles['headerTitle'] ?? {}} onClick={handleHeaderTitleClick}>{getHeaderTitle()}</Text>
          <View style={calendarStyles['actions'] ?? {}}>
            {showToday && <Text style={calendarStyles['todayButton'] ?? {}} onClick={handleTodayClick}>今天</Text>}
            <Text style={calendarStyles['headerButton'] ?? {}} onClick={handleNextClick}>›</Text>
          </View>
        </View>
        {currentMode === 'month' ? renderMonthView() : renderYearView()}
      </View>
    );
  },
});

export default Calendar;