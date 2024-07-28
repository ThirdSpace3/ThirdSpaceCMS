import React, { useState } from 'react';
import './UserType.css';

const userTypeOptions = [
  { value: 'walletId', label: 'Wallet ID' },
  { value: 'email', label: 'Email' },
  { value: 'all', label: 'All' }

];

const UserType = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

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
