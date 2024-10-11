import '../Header/Header.css';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SearchComponent from './SearchComponent';
import { FaMoon, FaSun } from 'react-icons/fa';

function Header() {
  const [logo, setLogo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setLogo(data.logo))
      .catch(error => console.error('Error Data:', error));
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  const logoVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className={`h-wrapper container ${isDarkMode ? 'dark-mode' : ''}`}>
      {logo && (
        <div className="logo_area">
          <motion.a
            href="/"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img src={logo.imageUrl} alt={logo.altText} />
          </motion.a>
        </div>
      )}
      <div className="search_wrapper d-flex">
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <SearchComponent />
      </div>
    </section>
  );
}

export default Header;
