import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchComponent.css';
import '../../components/Header/SearchResults.css';


const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('../Footer/Footer'));
const Navbar = lazy(() => import('../Navbar/Navbar'));

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  const [allResults, setAllResults] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allServiceCards, setAllServiceCards] = useState([]);
  const [allServicesDetails, setAllServicesDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryWithResults, setCategoryWithResults] = useState([]);
  const resultsPerPage = 10;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();

        setAllProjects(Array.isArray(data.projects) ? data.projects : []);
        setAllServiceCards(Array.isArray(data['projectsImp']) ? data['projectsImp'] : []);
        setAllServicesDetails(Array.isArray(data['servicesDetails']) ? data['servicesDetails'] : []);
      } catch (error) {
        console.error('Error Data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const normalizedQuery = query ? query.toLowerCase() : '';

    const filterData = () => {
      const filteredProjects = allProjects.filter(project =>
        project.title?.toLowerCase().includes(normalizedQuery)
      );

      const filteredServiceCards = allServiceCards.filter(serviceCard =>
        serviceCard.title?.toLowerCase().includes(normalizedQuery)
      );

      const filteredServicesDetails = allServicesDetails.filter(serviceDetail =>
        serviceDetail.title?.toLowerCase().includes(normalizedQuery)
      );

      let combinedResults = [
        ...filteredProjects.map(result => ({ ...result, type: 'projects' })),
        ...filteredServiceCards.map(result => ({ ...result, type: 'services-card' })),
        ...filteredServicesDetails.map(result => ({ ...result, type: 'services-details' }))
      ];

      if (selectedCategory !== 'All') {
        combinedResults = combinedResults.filter(result => result.type === selectedCategory);
      }

      const categoriesWithData = [];
      if (filteredProjects.length > 0) categoriesWithData.push('projects');
      if (filteredServiceCards.length > 0) categoriesWithData.push('services-card');
      if (filteredServicesDetails.length > 0) categoriesWithData.push('services-details');
      
      setCategoryWithResults(categoriesWithData);

      setAllResults(combinedResults);
    };

    filterData();
  }, [query, allProjects, allServiceCards, allServicesDetails, selectedCategory]);

  const startIndex = (page - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = allResults.slice(startIndex, endIndex);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPage(1); 
  };

  const categories = [
    { name: 'All', type: 'All' },
    { name: 'Projects', type: 'projects' },
    { name: 'Services', type: 'services-card' },
    { name: 'Haqqimizda', type: 'services-details' },
    { name: 'Elaqe', type: 'services-details' }
  ];


  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <> 
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>
      {!isMobile && (
        <Suspense fallback={<div>Loading navigation...</div>}>
          <Navbar />
        </Suspense>
      )}
      <div className="search-results-page container">
        <div className="search-results-container">
          <div className="sidebar">
            <h3>Kateqoriyalar</h3>
            <ul>
              {categories.map(category => (
                <li 
                  key={category.name} 
                  className={selectedCategory === category.type ? 'active' : ''}
                  style={{
                    backgroundColor: categoryWithResults.length === 1 && categoryWithResults.includes(category.type) ? 'var(--orange)' : '',
                    color: categoryWithResults.length === 1 && categoryWithResults.includes(category.type) ? 'white' : '',
                    padding: '10px 20px' 
                  }}
                  onClick={() => handleCategoryClick(category.type)} 
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="main-content">
            <h2>Axtarış Nəticələri: {query}</h2>

            {loading ? (
              <p>Yüklənir...</p>
            ) : (
              <>
                {paginatedResults.length > 0 ? (
                  <div className="results-list">
                    {paginatedResults.map(result => (
                      <div key={`${result.type}-${result.id}`} className="result-item">
                        <Link to={`/${result.type === 'services-card' ? 'services' : result.type}/${result.id}`}>
                          <h3>{result.title || 'Başlıq yoxdur'}</h3>
                          <p>Kateqoriya: {result.type.replace('-', ' ')}</p>
                          {result.image && <img src={result.image} alt={result.title} className="result-image" />}
                          {result.description && <p>{result.description}</p>}
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Nəticə tapilmadi</p>
                )}

                {allResults.length > endIndex && (
                  <button className="load-more-btn" onClick={handleLoadMore}>
                    Daha çox yüklə
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default SearchResults;
