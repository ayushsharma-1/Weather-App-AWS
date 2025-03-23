import React from 'react';
import { FiSearch, FiMapPin, FiSun, FiMoon } from 'react-icons/fi';

const TopBar = ({ 
  darkMode, 
  toggleDarkMode, 
  searchInput, 
  setSearchInput, 
  handleSearch, 
  getCurrentLocation 
}) => {
  return (
    <div className="top-bar">
      <div className="dark-mode-toggle">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
        <span>{darkMode ? <FiMoon /> : <FiSun />} Dark Mode</span>
      </div>
      <form className="search-bar" onSubmit={handleSearch}>
        <FiSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search for your preferred city..." 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      <button className="location-button" onClick={getCurrentLocation}>
        <FiMapPin />
        Current Location
      </button>
    </div>
  );
};

export default TopBar;