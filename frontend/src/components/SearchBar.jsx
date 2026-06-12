import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      onSearch(inputValue.trim());
    } else {
      alert('Silakan masukkan nama bangunan untuk dicari.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-wrapper">
      <div className="search-box">
        <i className="bi bi-search search-icon"></i>
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Cari nama bangunan di UNHAS..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="off"
        />
        <button id="search-button" className="search-btn" onClick={handleSearch}>
          <i className="bi bi-search me-1"></i> Cari
        </button>
      </div>
    </div>
  );
};

export default SearchBar;