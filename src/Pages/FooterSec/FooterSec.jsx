import React, { useState, useEffect } from 'react';
import './FooterSec.css';
import { NavLink } from 'react-router-dom';
import { MainContext, useContext } from "../../components/Context";

function FooterSec() {
  const { URLAPI, lang } = useContext(MainContext);
  const [footerData, setFooterData] = useState({ pages: [], services: [], contact: {}, followUsText: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [pagesResponse, servicesResponse, settingsResponse, followUsResponse] = await Promise.all([
          fetch(`${URLAPI}/api/static/pages?lang=${lang}`),
          fetch(`${URLAPI}/api/services?lang=${lang}`),
          fetch(`${URLAPI}/api/settings?lang=${lang}`),
          fetch(`${URLAPI}/api/static/text/follow-us?lang=${lang}`)
        ]);

        if (!pagesResponse.ok || !servicesResponse.ok || !settingsResponse.ok || !followUsResponse.ok) {
          throw new Error('One or more fetch requests failed');
        }

        const pagesData = await pagesResponse.json();
        const servicesData = await servicesResponse.json();
        const settingsData = await settingsResponse.json();
        const followUsData = await followUsResponse.json();

        setFooterData(prevData => ({
          ...prevData,
          pages: pagesData.data.filter(page => page.is_active === 1),
          services: servicesData.data,
          followUsText: followUsData.text,
          contact: settingsData.data.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {})
        }));
        
        setLoading(false);
      } catch (error) {
        console.error('Footer Data Error', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchFooterData();
  }, [URLAPI, lang]); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading footer data: {error.message}</p>;
  }

  return (
    <section className='footerSec'>
      <div className="footContent container">
        <div className="pages">
          <h2>Pages</h2>
          <ul>
            {footerData.pages.map((page, index) => (
              <li key={index}>
                <NavLink to={page.link}>
                  {page.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="services">
          <h2>Xidmətlər</h2>
          <ul>
            {footerData.services.map(service => (
              <li key={service.id}>
                <NavLink 
                  to="/services" 
                  state={{ serviceId: service.id }} 
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {service.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="contactUs">
          <h2>Contact Us</h2>
          <span>
            <NavLink to="/contact">{footerData.contact.address}</NavLink> <br />
            <NavLink to="/contact">{footerData.contact.phone}</NavLink> <br />
            <NavLink to="/contact">{footerData.contact.fax}</NavLink> <br /> 
            <NavLink to="/contact">{footerData.contact.email}</NavLink>
          </span>
        </div>
        <div className="iconsFoot">
          <h2>{footerData.followUsText}</h2> 
          <div className="input-wrapper">
            <input type="email" placeholder="Email" />
            <span className="input-icon">&gt;</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FooterSec;
