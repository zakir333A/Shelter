import React, { useEffect, useState, useCallback } from 'react';
import '../ContactPage/ContactTeam.css';

const ContactTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeamMembers = useCallback(async () => {
    try {
      const response = await fetch('/db.json');
      if (!response.ok) {
        throw new Error('not ok');
      }
      const data = await response.json();
      setTeamMembers(data.teamMembers || []); 
    } catch (error) {
      setError(error.message);
      console.error('Error Data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);



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
            <img src={member.imgSrc} alt={member.name} />
            <h2>{member.name}</h2>
            <a href={`mailto:${member.email}`}>{member.email}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ContactTeam);
