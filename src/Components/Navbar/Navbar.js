import React, { useState } from 'react';
import './Navbar.css';
import { ChevronDown, ChevronUp } from 'react-feather';
import slider from "./../../assets/slider.png"
const Navbar = ({ sortingOption, onSortingChange, groupingOption, onGroupingChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='nav-bar'>
      <div className='drop-down' onClick={toggleDropdown}>
        <div className="user-label">
          <img src={slider} className='Dis-pic' alt="Display" />  Display
        </div>
        {dropdownOpen ? <ChevronUp className='Icon' /> : <ChevronDown className='Icon' />}
      </div>
      {dropdownOpen && (
        <div className='dropdown-options'>
          <div className='dd-option'>
            <label>Group By:</label>
            <select value={groupingOption} onChange={onGroupingChange}>
              <option value='status'>Status</option>
              <option value='user'>User</option>
              <option value='priority'>Priority</option>
            </select>
          </div>
          <div className='dd-option'>
            <label>Sort By:</label>
            <select value={sortingOption} onChange={onSortingChange}>
              <option value='priority'>Priority</option>
              <option value='title'>Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
