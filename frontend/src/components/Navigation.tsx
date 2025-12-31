import React from 'react';
import '../styles/Navigation.css';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  currentMonth: string;
}

const Navigation: React.FC<NavigationProps> = ({
  onPrevious,
  onNext,
  onToday,
  canGoPrevious,
  canGoNext,
  currentMonth,
}) => {
  return (
    <div className="navigation">
      <button onClick={onPrevious} disabled={!canGoPrevious} className="nav-button">
        ← Previous
      </button>
      <button onClick={onToday} className="nav-button today-button">
        Today
      </button>
      <span className="current-month">{currentMonth}</span>
      <button onClick={onNext} disabled={!canGoNext} className="nav-button">
        Next →
      </button>
    </div>
  );
};

export default Navigation;
