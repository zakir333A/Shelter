import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout/MainLayout'; 
import AboutPage from './Pages/AboutPage/AboutPage';
import ContactPage from './Pages/ContactPage/ContactPage';
import SearchResults from './components/Header/SearchResults';
import Blog from './Pages/Blog/Blog';

const HomePage = lazy(() => import('./Pages/HomePage/HomePage'));
const Services = lazy(() => import('./Pages/ServicesPage/Services'));
const ServicesDetails = lazy(() => import('./Pages/ServicesPage/ServicesDetails/ServicesDetails'));
const ServicesCard = lazy(() => import('./Pages/ServicesPage/ServicesCard/ServicesCard'));
const ProjectsTotal = lazy(() => import('./Pages/ProjectsTotal/ProjectsTotal'));
const ProjectsCard = lazy(() => import('./Pages/ProjectsTotal/ProjectsCard'));
const ProjectsDetails = lazy(() => import('./Pages/ProjectsTotal/ProjectsDetails'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='services' element={<Services />} />
          <Route path='blog' element={<Blog />} />
          <Route path='services/:id' element={<ServicesDetails />} />
          <Route path='services-card' element={<ServicesCard />} />
          <Route path='projects' element={<ProjectsTotal />} />
          <Route path='projects/card' element={<ProjectsCard />} />
          <Route path='projects/:id' element={<ProjectsDetails />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path="search" element={<SearchResults />} /> 
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
