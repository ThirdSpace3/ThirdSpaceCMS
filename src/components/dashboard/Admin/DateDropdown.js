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

const DateDropdown = ({ preciseDate, setPreciseDate, startDate, setStartDate, endDate, setEndDate, dateOption, setDateOption }) => {
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateOptionChange = (selectedOption) => {
    setDateOption(selectedOption.value);
    const today = new Date();
    switch (selectedOption.value) {
      case 'today':
        setPreciseDate(today);
        setStartDate(today);
        setEndDate(today);
        break;
      case 'last7days':
        setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
        setEndDate(today);
        break;
      case 'last30days':
        setStartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30));
        setEndDate(today);
        break;
      case 'lastYear':
        setStartDate(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()));
        setEndDate(today);
        break;
      case 'all':
        setStartDate(null);
        setEndDate(null);
        break;
      case 'range':
      case 'precise':
      default:
        break;
    }
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
