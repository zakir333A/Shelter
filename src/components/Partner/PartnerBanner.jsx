import React, { useEffect, useState } from 'react';
import { GrServices } from "react-icons/gr";
import { FaChevronRight } from "react-icons/fa";
import './PartnerBanner.css';

function PartnerBanner() {
  const [bannerData, setBannerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch('/db.json');
        if (!response.ok) {
          throw new Error('not ok');
        }
        const data = await response.json();
        setBannerData(data.banner);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  if (isLoading) {
    return <p>Waiting...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="banner">
      <div className="banner-content container">
        <GrServices className='banSvg' aria-label="Services Icon" />
        <p>{bannerData.text}</p>
        <a href={bannerData.buttonLink} className="ban-button">
          {bannerData.buttonText} <FaChevronRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default PartnerBanner;
