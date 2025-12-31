import React, { useState } from 'react';
import { format, getDaysInMonth, startOfMonth, addDays } from 'date-fns';
import { Holiday } from '../services/holidayService';
import { getHolidaysForDate, hasWorkHoliday } from '../hooks/useCalendar';
import '../styles/Calendar.css';
import Tooltip from './Tooltip';

interface CalendarProps {
  month: Date;
  holidays: Holiday[];
}

const Calendar: React.FC<CalendarProps> = ({ month, holidays }) => {
  const firstDayOfMonth = startOfMonth(month);
  const daysInMonth = getDaysInMonth(month);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month.getMonth() &&
    today.getFullYear() === month.getFullYear();

  const getWeekHolidayInfo = (weekDays: (number | null)[]): { hasWork: boolean; count: number } => {
    const workHolidays = weekDays.filter((day) => {
      if (!day) return false;
      const date = addDays(firstDayOfMonth, day - 1);
      const dayHolidays = getHolidaysForDate(holidays, date);
      return dayHolidays.some((h) => h.type === 'WORK');
    });
    return { hasWork: workHolidays.length > 0, count: workHolidays.length };
  };

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null);

  return (
    <div className="calendar">
      <h2>{format(month, 'MMMM yyyy')}</h2>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => {
            const weekInfo = getWeekHolidayInfo(week);
            return (
              <tr key={weekIndex} className={`week ${weekInfo.hasWork ? 'week-with-work-holiday' : ''}`} data-work-count={weekInfo.count}>
                {week.map((day, dayIndex) => {
                  if (!day) {
                    return <td key={dayIndex} className="empty-day"></td>;
                  }
                  const date = addDays(firstDayOfMonth, day - 1);
                  const dayHolidays = getHolidaysForDate(holidays, date);
                  const isToday = isCurrentMonth && day === today.getDate();
                  const hasWork = hasWorkHoliday(dayHolidays);

                  // Build tooltip content: prefer listing work-holiday names when present
                  const workHolidays = dayHolidays.filter((h) => h.type === 'WORK');
                  const workNames = workHolidays.map((h) => h.name);
                  const allNames = dayHolidays.map((h) => h.name);
                  const hasTooltip = workHolidays.length > 0 || dayHolidays.length > 0;

                  const handleMouseEnter = (e: React.MouseEvent) => {
                    if (!hasTooltip) return;
                    const clientX = (e.nativeEvent as MouseEvent).clientX;
                    const clientY = (e.nativeEvent as MouseEvent).clientY;
                    setTooltipX(clientX);
                    setTooltipY(clientY);
                    setTooltipVisible(true);
                    setTooltipContent(
                      <div>
                        {workHolidays.length > 0 ? <div className="title">Work Holidays</div> : <div className="title">Holidays</div>}
                        {(workHolidays.length > 0 ? workNames : allNames).map((n, idx) => (
                          <div key={idx} className="item">{n}</div>
                        ))}
                      </div>
                    );
                  };

                  const handleMouseMove = (e: React.MouseEvent) => {
                    const clientX = (e.nativeEvent as MouseEvent).clientX;
                    const clientY = (e.nativeEvent as MouseEvent).clientY;
                    setTooltipX(clientX);
                    setTooltipY(clientY);
                  };

                  const handleMouseLeave = () => {
                    setTooltipVisible(false);
                    setTooltipContent(null);
                  };

                  return (
                    <td
                      key={dayIndex}
                      onMouseEnter={handleMouseEnter}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className={`day ${isToday ? 'today' : ''} ${dayHolidays.length > 0 ? 'holiday' : ''} ${
                        hasWork ? 'work-holiday' : ''
                      }`}
                    >
                      <div className="day-number">{day}</div>
                      {dayHolidays.length > 0 && (
                        <div className="holiday-indicator">
                          {hasWork ? (
                            <span className={`work-holiday-badge ${workHolidays.length > 1 ? 'multiple' : ''}`}>
                              {workHolidays.length > 1 ? workHolidays.length : '✓'}
                            </span>
                          ) : (
                            <span className="regular-holiday-badge">
                              ●
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Tooltip visible={tooltipVisible} x={tooltipX} y={tooltipY}>
        {tooltipContent}
      </Tooltip>
    </div>
  );
};

export default Calendar;
