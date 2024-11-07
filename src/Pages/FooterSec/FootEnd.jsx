import React, { useEffect, useState } from 'react';
import '../FooterSec/FootEnd.css';
import { MainContext, useContext } from "../../components/Context";

function FootEnd() {
  const { URLAPI, lang } = useContext(MainContext); 
  const [footerText, setFooterText] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterText = async () => {
      try {
        const response = await fetch(`${URLAPI}/api/settings?lang=${lang}`); 
        if (!response.ok) {
          throw new Error('Network response was not ok'); 
        }
        const data = await response.json();
        const footerData = data?.data?.find(item => item.key === "footer_text");

        if (footerData && footerData.value) {
          setFooterText(footerData.value);
        } else {
          setFooterText('Footer text not found.');
        }
      } catch (error) {
        console.error('Error fetching footer text:', error);
        setError(error.message || 'Could not load footer text.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchFooterText();
  }, [URLAPI, lang]); 

  if (loading) return <div className="copyright">Loading...</div>;

  if (error) return <div className="copyright">{error}</div>; 

  return (
    <div
      className="copyright"
      dangerouslySetInnerHTML={{ __html: footerText }} 
    />
  );
}

export default FootEnd;
