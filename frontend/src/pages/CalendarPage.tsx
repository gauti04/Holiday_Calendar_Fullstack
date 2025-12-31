import React, { useState, useEffect } from 'react';
import { format, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import Calendar from '../components/Calendar';
import Navigation from '../components/Navigation';
import Filters from '../components/Filters';
import { holidayService, Holiday, Country } from '../services/holidayService';
import { useCalendarNavigation, useHolidayFiltering } from '../hooks/useCalendar';
import '../styles/CalendarPage.css';

const CalendarPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [showRegular, setShowRegular] = useState<boolean>(true);
  const [showWork, setShowWork] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigation = useCalendarNavigation();

  const holidayType =
    showRegular && showWork ? undefined : showRegular ? 'REGULAR' : showWork ? 'WORK' : undefined;

  const filteredHolidays = useHolidayFiltering(holidays, holidayType);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await holidayService.getCountries();
        setCountries(data);
        if (data.length > 0) {
          setSelectedCountry(data[0].code);
        }
      } catch (err) {
        setError('Failed to load countries');
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const fetchHolidays = async () => {
      try {
        setLoading(true);
        setError('');
        const prevMonth = addMonths(navigation.currentDate, -1);
        const nextMonth = addMonths(navigation.currentDate, 1);
        const startDate = format(startOfMonth(prevMonth), 'yyyy-MM-dd');
        const endDate = format(endOfMonth(nextMonth), 'yyyy-MM-dd');

        const data = await holidayService.getHolidays(
          selectedCountry,
          startDate,
          endDate
        );
        setHolidays(data);
      } catch (err) {
        setError('Failed to load holidays');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [selectedCountry, navigation.currentDate]);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    navigation.goToToday();
  };

  return (
    <div className="calendar-page">
      <header className="app-header">
        <h1>Holiday Calendar</h1>
      </header>

      {error && <div className="error-message">{error}</div>}

      <Filters
        countries={countries}
        selectedCountry={selectedCountry}
        showRegular={showRegular}
        showWork={showWork}
        onCountryChange={handleCountryChange}
        onRegularChange={setShowRegular}
        onWorkChange={setShowWork}
      />

      <Navigation
        onPrevious={navigation.goToPreviousMonth}
        onNext={navigation.goToNextMonth}
        onToday={navigation.goToToday}
        canGoPrevious={navigation.canGoBack}
        canGoNext={navigation.canGoForward}
        currentMonth={format(navigation.currentDate, 'MMMM yyyy')}
      />

      {loading ? (
        <div className="loading">Loading holidays...</div>
      ) : (
        <div className="calendar-container">
          <Calendar month={addMonths(navigation.currentDate, -1)} holidays={filteredHolidays} />
          <Calendar month={navigation.currentDate} holidays={filteredHolidays} />
          <Calendar month={addMonths(navigation.currentDate, 1)} holidays={filteredHolidays} />
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
