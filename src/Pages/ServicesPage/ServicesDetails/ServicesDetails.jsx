import React, { Suspense, lazy, useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../ServicesDetails/ServicesDetails.css';
import { FaChevronRight } from "react-icons/fa";
import ServicesBanner from '../ServicesBanner/ServicesBanner';
import Header from '../../../components/Header/Header';
import Navbar from '../../../components/Navbar/Navbar';
const FooterSec = lazy(() => import('../../FooterSec/FooterSec'));
const FootEnd = lazy(() => import('../../FooterSec/FootEnd'));

function ServicesDetails() {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [activeServiceId, setActiveServiceId] = useState(parseInt(id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setServiceData(data.servicesDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedServiceMemo = useMemo(() => {
    if (serviceData) {
      return serviceData.detailsList.find(item => item.id === activeServiceId) || serviceData.detailsList[0];
    }
    return null;
  }, [serviceData, activeServiceId]);

  useEffect(() => {
    setSelectedService(selectedServiceMemo);
  }, [selectedServiceMemo]);

  const handleSelectService = useCallback((item) => {
    setSelectedService(item);
    setActiveServiceId(item.id);
  }, []);

  if (loading) {
    return <div>Loading data, please wait...</div>;
  }

  if (!serviceData || !selectedService) {
    return <div>No data available.</div>;
  }

  const customImage = '../xid.jpg'; 
  const customName = 'Sığınacaqlarımız'; 

  return (
    <>

      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
        <Navbar/>
      </Suspense>

      <Suspense fallback={<div>Loading Banner...</div>}>
        <ServicesBanner image={customImage} name={customName} />
      </Suspense>

      <section className="details">
        <div className="detail-content container">
          <div className="detail-list">
            <ul>
              {serviceData.detailsList.map((item) => (
                <li key={item.id} className={activeServiceId === item.id ? 'active' : ''}>
                  <Link 
                    to={`/services/${item.id}`} 
                    onClick={() => handleSelectService(item)} 
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="help">
              <div className="help-content">
                <h2>Need Help?</h2>
                <p>Find a Handyman In DC For Your Next Task</p>
                <a href="#">Make An Enquiry <FaChevronRight /></a>
              </div>
            </div>
          </div>

          <div className="detail-info">
            <img src={selectedService.detailImage} alt={selectedService.title} />

            <div className="detail-info-content">
              <h2>{selectedService.title} Services</h2>
              <p>{selectedService.detailsDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <FooterSec />
        <FootEnd />
      </Suspense>
    </>
  );
}

export default ServicesDetails;
