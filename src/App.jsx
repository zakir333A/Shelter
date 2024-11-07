import React, { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout/MainLayout";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import SearchResults from "./components/Header/SearchResults";
import Blog from "./Pages/Blog/Blog";
import BlogDetail from "./Pages/Blog/BlogDetail";
import ServicesMain from "./components/ServicesMain/ServicesMain";
import Error404 from "./components/ErrorPage/Error404";
import { MainContext } from "./components/Context";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const Services = lazy(() => import("./Pages/ServicesPage/Services"));
const ServicesDetails = lazy(() =>
  import("./Pages/ServicesPage/ServicesDetails/ServicesDetails")
);
const ServicesCard = lazy(() =>
  import("./Pages/ServicesPage/ServicesCard/ServicesCard")
);
const ProjectsTotal = lazy(() => import("./Pages/ProjectsTotal/ProjectsTotal"));
const ProjectsCard = lazy(() => import("./Pages/ProjectsTotal/ProjectsCard"));
const ProjectsDetails = lazy(() =>
  import("./Pages/ProjectsTotal/ProjectsDetails")
);
const Category = lazy(() => import("./components/Category/Category"));

function App() {
  const URLAPI = "http://192.168.88.225:8000";
  const [lang, setLang] = useState("az");
  const data = {
    URLAPI,
    lang,
    setLang,
  };

  return (
    <MainContext.Provider value={data}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<Services />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route path="services/:id" element={<ServicesDetails />} />
            <Route path="services-card" element={<ServicesCard />} />
            <Route path="projects" element={<ProjectsTotal />} />
            <Route path="projects/card" element={<ProjectsCard />} />
            <Route path="category" element={<Category />} />
            <Route path="category/:category" element={<Category />} />
            <Route path="category/:category/:id" element={<ProjectsTotal />} />
            <Route path="projects/:link" element={<ProjectsDetails />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </Suspense>
    </MainContext.Provider>
  );
}

export default App;
