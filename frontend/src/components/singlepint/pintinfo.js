import React, { useEffect, useState } from 'react';

const PintInfo = ({ pintId }) => {
  const [pintData, setPintData] = useState(null);
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    const fetchPintData = async () => {
      try {
        const response = await fetch(`/pints/${pintId}`, 
        {headers: { Authorization: `Bearer ${userToken}` }});

        if (!response.ok) {throw new Error('Network response was not ok');}

        const fetchedData = await response.json();
        setPintData(fetchedData);
      } catch (error) {console.error('Error fetching pint data:', error);}
    };

    fetchPintData();
  }, [pintId]);

  return (
    <div>
      {pintData ? (
        <div>
          <p>Owed to: {pintData.pint.owner.username}</p>
          <p>Datemade: {pintData.pint.datemade}</p>
          <p>Owed by: {pintData.pint.owed_by.username}</p>
          <p>Bet: {pintData.pint.bet.description}</p>
        </div>
      ) : (
        <p>No Data stored</p>
      )}
    </div>
  );
};

export default PintInfo;
