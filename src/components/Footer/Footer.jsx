import React, { useEffect, useState, Suspense, lazy } from 'react';
import '../Footer/Footer.css';
import { MainContext, useContext } from "../Context";

const InstagramIcon = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaInstagram })));
const TwitterIcon = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaTwitter })));
const LinkedInIcon = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaLinkedin })));
const WhatsAppIcon = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaWhatsapp })));

function Footer() {
  const { URLAPI, lang } = useContext(MainContext); 
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        const response = await fetch(`${URLAPI}/api/settings?lang=${lang}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const logoData = data.data.find(item => item.key === "logo");
        if (logoData) {
          setLogo({ imageUrl: logoData.value, altText: "Logo" });
        } else {
          setError('Logo not found.');
        }
      } catch (error) {
        console.error('Error fetching logo data:', error);
        setError('Error fetching data.');
      }
    };

    fetchLogoData();
  }, [URLAPI, lang]); 

  if (error) {
    return <p>{error}</p>;
  }

  if (!logo) {
    return <p>Loading...</p>; 
  }

  return (
    <footer className='foot-content container'>
      <a className="logo" href="/" aria-label="Ana Sayfa">
        <img src={logo.imageUrl} alt={logo.altText} loading="lazy" />
      </a>
      <div>
        <div className="icons">
          <Suspense fallback={<span>Loading icons...</span>}>
            <a className="socialContainer containerOne" href="#" aria-label="Instagram">
              <InstagramIcon className="socialSvg instagramSvg" />
            </a>
            <a className="socialContainer containerTwo" href="#" aria-label="Twitter">
              <TwitterIcon className="socialSvg twitterSvg" />
            </a>
            <a className="socialContainer containerThree" href="#" aria-label="LinkedIn">
              <LinkedInIcon className="socialSvg linkdinSvg" />
            </a>
            <a className="socialContainer containerFour" href="#" aria-label="WhatsApp">
              <WhatsAppIcon className="socialSvg whatsappSvg" />
            </a>
          </Suspense>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
