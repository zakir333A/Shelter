import React, { Suspense, useState, useEffect, useCallback, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../ServicesDetails/ServicesDetails.css';
import { FaChevronRight } from "react-icons/fa";
import ServicesBanner from '../ServicesBanner/ServicesBanner';
import { MainContext } from "../../../components/Context";

function ServicesDetails() {
  const { URLAPI, lang } = useContext(MainContext);
  const { id } = useParams(); 
  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [activeServiceId, setActiveServiceId] = useState(parseInt(id));
  const [loading, setLoading] = useState(true);
  const [customData, setCustomData] = useState({}); 


  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URLAPI}/api/services?lang=${lang}`);
        const data = await response.json();
        setServicesData(data.data); 
      } catch (error) {
        console.error('Error fetching services data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [URLAPI, lang]);


  useEffect(() => {
    const fetchCustomData = async () => {
      try {
        const response = await fetch('${URLAPI}/api/static/page/products?lang=${lang}');
        const data = await response.json();
        setCustomData(data); 
      } catch (error) {
        console.error('Error fetching custom data:', error);
      }
    };

    fetchCustomData();
  }, []);

  useEffect(() => {
    const service = servicesData.find(item => item.id === activeServiceId);
    setSelectedService(service);
  }, [servicesData, activeServiceId]);

  const handleSelectService = useCallback((item) => {
    setSelectedService(item);
    setActiveServiceId(item.id);
  }, []);

  if (loading) {
    return <div>Loading data, please wait...</div>;
  }

  if (!servicesData.length || !selectedService) {
    return <div>No data available.</div>;
  }

  const customImage = customData.hero_image ; 
  const customName = customData.hero_title ; 

  return (
    <>
      <Suspense fallback={<div>Loading Banner...</div>}>
        <ServicesBanner image={customImage} name={customName} />
      </Suspense>

      <section className="details">
        <div className="detail-content container">
          <div className="detail-list">
            <ul>
              {servicesData.map((item) => (
                <li key={item.id} className={activeServiceId === item.id ? 'active' : ''}>
                  <Link to={`/services/${item.id}`} onClick={() => handleSelectService(item)}>
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
            <img src={selectedService.src} alt={selectedService.title} />
            <div className="detail-info-content">
              <h2>{selectedService.title} Services</h2>
              <p>{selectedService.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesDetails; 
