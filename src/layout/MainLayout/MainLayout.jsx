import React from 'react'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import HomePage from '../../Pages/HomePage/HomePage';
import Services from '../../Pages/ServicesPage/Services';


const MainLayout = ({children}) => {
  return (
    <>
       
        
        
        <Outlet/>
        
   
    </>
  )
}

export default MainLayout