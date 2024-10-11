import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../Header/SearchComponent.css';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (query.trim() !== '') {
      navigate(`/search?q=${query}`);
      setQuery('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleIconClick(); 
    }
  };

  return (
    <div className="search-container">
      <div className="search">
        <input
          type="text"
          className="search__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search..."
        />
        
        <button className="search__button" onClick={handleIconClick}>
          <FaSearch className="search__icon" />
        </button>
      </div>
    </div>
  );
}

export default SearchComponent;
