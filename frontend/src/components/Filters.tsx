import React from 'react';
import { Country } from '../services/holidayService';
import '../styles/Filters.css';

interface FiltersProps {
  countries: Country[];
  selectedCountry: string;
  showRegular: boolean;
  showWork: boolean;
  onCountryChange: (countryCode: string) => void;
  onRegularChange: (checked: boolean) => void;
  onWorkChange: (checked: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({
  countries,
  selectedCountry,
  showRegular,
  showWork,
  onCountryChange,
  onRegularChange,
  onWorkChange,
}) => {
  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="country-select">Select Country:</label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="country-select"
        >
          <option value="">-- Choose a Country --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group holiday-type-filters">
        <label>Holiday Types:</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showRegular}
              onChange={(e) => onRegularChange(e.target.checked)}
            />
            Regular Holidays
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showWork}
              onChange={(e) => onWorkChange(e.target.checked)}
            />
            Work Holidays
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
