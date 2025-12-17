import React, { useState, useRef, useEffect } from "react";

interface CustomDateInputProps {
  icon?: string; // image path (e.g., imported logo)
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  maxDate?: string; // YYYY-MM-DD format
  minDate?: string; // YYYY-MM-DD format
  required?: boolean;
  error?: string;
  // React Hook Form props
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const CustomDateInput = React.forwardRef<HTMLInputElement, CustomDateInputProps>(
  ({
    icon,
    placeholder = "Select date",
    value,
    onChange,
    maxDate,
    minDate,
    error,
    ...rest
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value || "");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [view, setView] = useState<'days' | 'months' | 'years'>('days');
    const datePickerRef = useRef<HTMLDivElement>(null);
    
    const dirInLocal = localStorage.getItem('dir');

    // Close date picker when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setView('days');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update selected date when value prop changes
    useEffect(() => {
      setSelectedDate(value || "");
    }, [value]);

    // Format date for display
    const formatDisplayDate = (dateString: string): string => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };

    // Handle manual input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSelectedDate(newValue);
      onChange?.(newValue);
    };

    // Handle date selection from calendar
    const handleDateSelect = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      setSelectedDate(dateString);
      onChange?.(dateString);
      setIsOpen(false);
      setView('days');
    };

    // Navigate years
    const navigateYear = (direction: 'prev' | 'next') => {
      setCurrentMonth(prev => {
        const newDate = new Date(prev);
        if (direction === 'prev') {
          newDate.setFullYear(prev.getFullYear() - 1);
        } else {
          newDate.setFullYear(prev.getFullYear() + 1);
        }
        return newDate;
      });
    };

    // Generate calendar days
    const generateCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      
      const startingDay = firstDay.getDay();
      
      const days = [];
      
      // Previous month days
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startingDay - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevMonthLastDay - i);
        days.push({ date, isCurrentMonth: false });
      }
      
      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        days.push({ date, isCurrentMonth: true });
      }
      
      // Next month days (to fill the grid)
      const totalCells = 42; // 6 weeks
      const nextMonthDays = totalCells - days.length;
      for (let i = 1; i <= nextMonthDays; i++) {
        const date = new Date(year, month + 1, i);
        days.push({ date, isCurrentMonth: false });
      }
      
      return days;
    };

    // Generate months for month view
    const generateMonths = () => {
      return Array.from({ length: 12 }, (_, i) => {
        const date = new Date(currentMonth.getFullYear(), i, 1);
        return {
          date,
          name: date.toLocaleDateString('en-US', { month: 'short' })
        };
      });
    };

    // Generate years for year view (12 years range)
    const generateYears = () => {
      const currentYear = currentMonth.getFullYear();
      const startYear = currentYear - 6; // Show 6 years before and 5 years after
      return Array.from({ length: 12 }, (_, i) => startYear + i);
    };

    // Handle month selection
    const handleMonthSelect = (monthIndex: number) => {
      const newDate = new Date(currentMonth);
      newDate.setMonth(monthIndex);
      setCurrentMonth(newDate);
      setView('days');
    };

    // Handle year selection
    const handleYearSelect = (year: number) => {
      const newDate = new Date(currentMonth);
      newDate.setFullYear(year);
      setCurrentMonth(newDate);
      setView('months');
    };

    // Check if date is disabled
    const isDateDisabled = (date: Date): boolean => {
      if (minDate) {
        const min = new Date(minDate);
        min.setHours(0, 0, 0, 0);
        if (date < min) return true;
      }
      
      if (maxDate) {
        const max = new Date(maxDate);
        max.setHours(0, 0, 0, 0);
        if (date > max) return true;
      }
      
      return false;
    };

    // Check if date is today
    const isToday = (date: Date): boolean => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };

    // Check if date is selected
    const isSelected = (date: Date): boolean => {
      if (!selectedDate) return false;
      const selected = new Date(selectedDate);
      return date.toDateString() === selected.toDateString();
    };

    // Check if month is selected
    const isMonthSelected = (monthIndex: number): boolean => {
      if (!selectedDate) return false;
      const selected = new Date(selectedDate);
      return selected.getMonth() === monthIndex && selected.getFullYear() === currentMonth.getFullYear();
    };

    // Check if year is selected
    const isYearSelected = (year: number): boolean => {
      if (!selectedDate) return false;
      const selected = new Date(selectedDate);
      return selected.getFullYear() === year;
    };

    const calendarDays = generateCalendarDays();
    const months = generateMonths();
    const years = generateYears();

    const renderHeader = () => {
      if (view === 'days') {
        return (
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => navigateYear('prev')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setView('months')}
                className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                {currentMonth.toLocaleDateString('en-US', { month: 'long' })}
              </button>
              <button
                type="button"
                onClick={() => setView('years')}
                className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                {currentMonth.getFullYear()}
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => navigateYear('next')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        );
      }

      if (view === 'months') {
        return (
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => navigateYear('prev')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              type="button"
              onClick={() => setView('years')}
              className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              {currentMonth.getFullYear()}
            </button>
            
            <button
              type="button"
              onClick={() => navigateYear('next')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        );
      }

      if (view === 'years') {
        return (
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setFullYear(newDate.getFullYear() - 12);
                setCurrentMonth(newDate);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="font-semibold text-gray-700">
              {years[0]} - {years[years.length - 1]}
            </span>
            
            <button
              type="button"
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setFullYear(newDate.getFullYear() + 12);
                setCurrentMonth(newDate);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        );
      }
    };

    const renderContent = () => {
      if (view === 'days') {
        return (
          <>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
              
              {calendarDays.map(({ date, isCurrentMonth }, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => isCurrentMonth && !isDateDisabled(date) && handleDateSelect(date)}
                  disabled={!isCurrentMonth || isDateDisabled(date)}
                  className={`
                    h-8 text-sm rounded transition-all duration-200
                    ${!isCurrentMonth ? 'text-gray-300 cursor-default' : ''}
                    ${isDateDisabled(date) ? 'text-gray-300 cursor-not-allowed' : ''}
                    ${isSelected(date) 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : isCurrentMonth && !isDateDisabled(date)
                      ? 'text-gray-700 hover:bg-gray-100'
                      : ''}
                    ${isToday(date) && !isSelected(date) ? 'border border-blue-200 bg-blue-50' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          </>
        );
      }

      if (view === 'months') {
        return (
          <div className="grid grid-cols-3 gap-2 mb-2">
            {months.map(({ name }, index) => (
              <button
                key={name}
                type="button"
                onClick={() => handleMonthSelect(index)}
                className={`
                  h-12 text-sm rounded transition-all duration-200 font-medium
                  ${isMonthSelected(index) 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                {name}
              </button>
            ))}
          </div>
        );
      }

      if (view === 'years') {
        return (
          <div className="grid grid-cols-3 gap-2 mb-2">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => handleYearSelect(year)}
                className={`
                  h-12 text-sm rounded transition-all duration-200 font-medium
                  ${isYearSelected(year) 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                {year}
              </button>
            ))}
          </div>
        );
      }
    };

    return (
      <div className="w-full">
        <div dir={dirInLocal || 'ltr'} className="relative w-full" ref={datePickerRef}>
          <div
            className={`flex items-center w-full border rounded-2xl px-2 py-2 bg-white hover:border-main focus-within:border-main transition cursor-pointer ${
              error ? 'border-red-500' : 'border-gray-400'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {icon && <img src={icon} alt="icon" className="w-5 h-5" />}
            <input
              ref={ref}
              type="text"
              value={formatDisplayDate(selectedDate)}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="flex-1 px-2 text-lg bg-transparent outline-none text-gray-700 placeholder-gray-500 cursor-pointer"
              readOnly
              {...rest}
            />
           
          </div>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              {renderHeader()}
              {renderContent()}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => handleDateSelect(new Date())}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate("");
                    onChange?.("");
                    setIsOpen(false);
                    setView('days');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1 px-2">{error}</p>
        )}
      </div>
    );
  }
);

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;