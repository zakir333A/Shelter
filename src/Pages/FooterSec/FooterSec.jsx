import React, { useState, useEffect } from 'react';
import './FooterSec.css';
import { NavLink } from 'react-router-dom'; 

function FooterSec() {
  const [footerData, setFooterData] = useState({ pages: [], services: [], contact: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        setFooterData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Data Error', error);
        setError(error);
        setLoading(false);
      });
  }, []);

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
          {footerData.pages.map((page, index) => (
            <NavLink key={index} to={page.url}>
              <li>{page.name}</li>
            </NavLink>
          ))}
        </div>
        <div className="services">
          <h2>Xidmətlər</h2>
          {footerData.services.map((service) => (
            <NavLink key={service.id} to={service.url} className={({ isActive }) => (isActive ? "active" : "")}>
              {service.name}
            </NavLink>
          ))}
        </div>
        <div className="contactUs">
          <h2>Contact Us</h2>
          <span>
            <NavLink to="/contact">{footerData.contact.address}</NavLink> <br />
            <NavLink to="/contact">{footerData.contact.phone}</NavLink> <br />
            <NavLink to="/contact">{footerData.contact.email}</NavLink>
          </span>
        </div>
        <div className="iconsFoot">
          <h2>Follow Us</h2>
          <div className="icons">
          
          </div>
          <h2>Subscribe Us</h2>
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
