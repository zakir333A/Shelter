import React, { useEffect, useState, useCallback } from 'react';
import '../ContactPage/ContactTeam.css';

const ContactTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeamMembers = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.88.225:8000/api/contactings/contact'); 
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();

   
      if (Array.isArray(data)) {
        setTeamMembers(data);
      } else if (data.teamMembers) {
        setTeamMembers(data.teamMembers); 
      } else {
        throw new Error('Data format is not correct');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='contactTeam container'>
      <div className="teamText">
        <h2>Meet Our <span>Best Team</span></h2>
      </div>
      <div className="teamCardsContainer">
        {teamMembers.map((member) => (
          <div className="teamCard" key={member.id}>
            <img src={member.src} alt={member.name} />
            <h2>{member.name}</h2>
            <a href={`mailto:${member.mail}`}>{member.mail}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ContactTeam);
