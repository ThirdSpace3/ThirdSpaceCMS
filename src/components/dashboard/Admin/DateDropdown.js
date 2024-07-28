import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Set default date option to "today"
    setDateOption('today');
    const today = new Date();
    setPreciseDate(today);
    setStartDate(today);
    setEndDate(today);
  }, [setDateOption, setPreciseDate, setStartDate, setEndDate]);

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
    setIsOpen(!isOpen);
  };

  return (
    <div className="date-dropdown-custom-dropdown">
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
        <div className="date-picker">
          <label>Precise Date:</label>
          <DatePicker
            selected={preciseDate}
            onChange={(date) => setPreciseDate(date)}
            dateFormat="yyyy/MM/dd"
            className="custom-datepicker"
          />
        </div>
      )}
      {dateOption === 'range' && (
        <>
          <div className="date-picker">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              className="custom-datepicker"
            />
          </div>
          <div className="date-picker">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy/MM/dd"
              className="custom-datepicker"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DateDropdown;
