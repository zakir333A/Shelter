import React, { useEffect, useState, Suspense, lazy } from 'react';
import '../Footer/Footer.css';

const InstagramIcon = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaInstagram })));
const TwitterIcon = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaTwitter })));
const LinkedInIcon = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaLinkedin })));
const WhatsAppIcon = lazy(() => import('react-icons/fa').then(module => ({ default: module.FaWhatsapp })));

function Footer() {
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogoData = async () => {
      try {
        const response = await fetch('/db.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLogo(data.logo);
      } catch (error) {
        console.error('Error Data:', error);
        setError('Error Data.');
      }
    };

    fetchLogoData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!logo) {
    return <p>Waiting...</p>;
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
