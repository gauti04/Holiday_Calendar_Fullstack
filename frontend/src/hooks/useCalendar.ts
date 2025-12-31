import { useState, useEffect } from 'react';
import { addMonths, format } from 'date-fns';
import { Holiday } from '../services/holidayService';

export const useCalendarNavigation = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const previousMonth = addMonths(currentDate, -1);
  const nextMonth = addMonths(currentDate, 1);

  const canGoBack = () => {
    const elevenMonthsBack = addMonths(new Date(), -11);
    return currentDate > elevenMonthsBack;
  };

  const canGoForward = () => {
    const elevenMonthsForward = addMonths(new Date(), 11);
    return currentDate < elevenMonthsForward;
  };

  const goToPreviousMonth = () => {
    if (canGoBack()) {
      setCurrentDate(addMonths(currentDate, -1));
    }
  };

  const goToNextMonth = () => {
    if (canGoForward()) {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return {
    currentDate,
    previousMonth,
    nextMonth,
    canGoBack: canGoBack(),
    canGoForward: canGoForward(),
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  };
};

export const useHolidayFiltering = (holidays: Holiday[], holidayType?: string) => {
  const [filteredHolidays, setFilteredHolidays] = useState<Holiday[]>(holidays);

  useEffect(() => {
    if (holidayType) {
      setFilteredHolidays(holidays.filter((h) => h.type === holidayType));
    } else {
      setFilteredHolidays(holidays);
    }
  }, [holidays, holidayType]);

  return filteredHolidays;
};

export const getHolidaysForDate = (holidays: Holiday[], date: Date): Holiday[] => {
  const dateStr = format(date, 'yyyy-MM-dd');
  return holidays.filter((h) => h.date === dateStr);
};

export const hasWorkHoliday = (holidays: Holiday[]): boolean => {
  return holidays.some((h) => h.type === 'WORK');
};
