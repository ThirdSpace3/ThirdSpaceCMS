import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateDropdown.css';

const presetOptions = [
  { value: 'today', label: 'Today' },
  { value: 'last7days', label: 'Last 7 days' },
  { value: 'last30days', label: 'Last 30 days' },
  { value: 'lastYear', label: 'Last Year' },
  { value: 'all', label: 'All' },
  { value: 'range', label: 'Range' },
  { value: 'precise', label: 'Precise Date' }
];

const DateDropdown = ({ preciseDate, setPreciseDate, startDate, setStartDate, endDate, setEndDate, dateOption, setDateOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (dateOption === 'all') {
      setDateOption('all');
      setStartDate(null);
      setEndDate(null);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsDatePickerOpen(false);
        document.body.classList.remove('no-scroll');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen || isDatePickerOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen, isDatePickerOpen]);

  const handleDateOptionChange = (selectedOption) => {
    setDateOption(selectedOption.value);
    const today = new Date();
    let newStartDate = null;
    let newEndDate = null;
    let newPreciseDate = today;

    switch (selectedOption.value) {
      case 'today':
        newStartDate = today;
        newEndDate = today;
        newPreciseDate = today;
        break;
      case 'last7days':
        newStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        newEndDate = today;
        break;
      case 'last30days':
        newStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
        newEndDate = today;
        break;
      case 'lastYear':
        newStartDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        newEndDate = today;
        break;
      case 'all':
        newStartDate = null;
        newEndDate = null;
        break;
      case 'range':
      case 'precise':
      default:
        break;
    }

    setPreciseDate(newPreciseDate);
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    // Call the onChange handler passed from DashboardAdmin
    onChange(selectedOption.value, newPreciseDate, newStartDate, newEndDate);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!isDatePickerOpen) {
      setIsOpen(!isOpen);
    }
  };

  const handleDatePickerFocus = () => {
    setIsDatePickerOpen(true);
  };

  const handleDatePickerBlur = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <div className="date-dropdown-custom-dropdown" ref={dropdownRef}>
      <div className="date-dropdown-header" onClick={toggleDropdown}>
        <span>{presetOptions.find(option => option.value === dateOption)?.label || 'Select Date Option'}</span>
        <i className={`date-dropdown-icon ${isOpen ? 'open' : ''}`}></i>
      </div>
      {isOpen && (
        <div className="date-dropdown-list">
          {presetOptions.map((option) => (
            <div
              key={option.value}
              className="date-dropdown-item"
              onClick={() => handleDateOptionChange(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {dateOption === 'precise' && (
        <div className="date-picker precise-picker">
          <DatePicker
            selected={preciseDate}
            onChange={(date) => {
              setPreciseDate(date);
              setIsOpen(false);
              setIsDatePickerOpen(false);
              onChange('precise', date, null, null); // Call onChange with the precise date
            }}
            onFocus={handleDatePickerFocus}
            onBlur={handleDatePickerBlur}
            dateFormat="yyyy/MM/dd"
            className="custom-datepicker"
            popperPlacement="bottom-start"
            popperModifiers={{
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: 'viewport'
              }
            }}
          />
        </div>
      )}
      {dateOption === 'range' && (
        <div className="date-picker-range">
          <div className="custom-datepicker">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setIsOpen(false);
                setIsDatePickerOpen(false);
                onChange('range', null, date, endDate); // Call onChange with the range start date
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onFocus={handleDatePickerFocus}
              onBlur={handleDatePickerBlur}
              dateFormat="yyyy/MM/dd"
              className="custom-datepicker"
              popperPlacement="bottom-start"
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'viewport'
                }
              }}
            />
          </div>
          <div className="custom-datepicker">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setIsOpen(false);
                setIsDatePickerOpen(false);
                onChange('range', null, startDate, date); // Call onChange with the range end date
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onFocus={handleDatePickerFocus}
              onBlur={handleDatePickerBlur}
              dateFormat="yyyy/MM/dd"
              className="custom-datepicker"
              popperPlacement="bottom-start"
              popperModifiers={{
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'viewport'
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateDropdown;
