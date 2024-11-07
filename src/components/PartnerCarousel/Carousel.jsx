import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
<script src="path-to-the-file/splide.min.js"></script>
import './Carousel.css';
import { MainContext, useContext } from "../Context";


const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
};

function CenterMode() {
  const { URLAPI, lang } = useContext(MainContext); 
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`${URLAPI}/api/partners`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPartners(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
        setError(error);
        setLoading(false);
      });
  }, [URLAPI]); 


  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 1000,
    autoplay: true, 
    autoplaySpeed: 800, 
    pauseOnHover: true, 
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, centerPadding: "0px" },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, centerPadding: "0px" },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, centerPadding: "0px" },
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 1, centerPadding: "0px" },
      },
    ],
  };

  if (loading) return <p>Loading partners, please wait...</p>;
  if (error) return <p>Error: {error.message}. Please try again later.</p>;
  if (partners.length === 0) return <p>No partners available at this time.</p>; 

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {partners.map((partner) => (
          <div key={partner.id} className="slide-image-contain">
            <a href={partner.website_link} target="_blank" rel="noopener noreferrer">
              <img 
                src={partner.logo_src} 
                alt={partner.alt_text || 'Partner logo'} 
                className="slide-image" 
              />
            </a>
          </div>
        ))}
      </Slider>
      
    </div>
  );
}

export default CenterMode;
