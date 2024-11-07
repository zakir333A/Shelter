import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import FooterSec from '../../Pages/FooterSec/FooterSec';
import FootEnd from '../../Pages/FooterSec/FootEnd';

const MainLayout = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleResize = () => {
    setIsNavbarVisible(window.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  return (
    <>
      <Header />
      {isNavbarVisible && <Navbar />} 
      <Outlet />
      <FooterSec />
      <FootEnd />
    </>
  );
}

export default MainLayout;
