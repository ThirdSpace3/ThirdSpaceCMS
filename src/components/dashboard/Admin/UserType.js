import React, { useState, useEffect } from 'react';
import './UserType.css';

const userTypeOptions = [
  { value: 'all', label: 'All' },
  { value: 'walletId', label: 'Wallet ID' },
  { value: 'email', label: 'Email' },
];

const UserType = ({ value = { value: 'all', label: 'All' }, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    if (selectedOption.value === 'all') {
      onChange(selectedOption);
    }
  }, [selectedOption, onChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="user-type-custom-dropdown">
      <div className="user-type-dropdown-header" onClick={toggleDropdown}>
        <span>{selectedOption ? selectedOption.label : 'Select User'}</span>
        <i className={`user-type-dropdown-icon ${isOpen ? 'open' : ''}`}></i>
      </div>
      {isOpen && (
        <div className="user-type-dropdown-list">
          {userTypeOptions.map((option) => (
            <div
              key={option.value}
              className="user-type-dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserType;
