import React, { useEffect, useState } from 'react';

const PintInfo = ({ pintId }) => {
  const [pintData, setPintData] = useState(null);
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    const fetchPintData = async () => {
      try {
        const response = await fetch(`/pints/${pintId}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedData = await response.json();
        setPintData(fetchedData);
      } catch (error) {
        console.error('Error fetching pint data:', error);
      }
    };

    fetchPintData();
  }, [pintId, userToken]);

  const claimPint = () => {
    if (userToken) {
      fetch(`/pints/claim/${pintId}`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json' 
        }
      })
        .then(response => {
          if (response.status === 200) {
            console.log("Pint Claimed!");
            return response.json();
          } else {console.log("Pint Failed to be Claimed!");}
        })
        .catch(error => {
          console.error('Error claiming pint:', error);
        });

      console.log('Now we should navigate');
    }
  };

  return (
    <div>
      {pintData ? (
        <div>
          <p>Owed to: {pintData.pint.owner.username}</p>
          <p>Datemade: {pintData.pint.datemade}</p>
          <p>Owed by: {pintData.pint.owed_by.username}</p>
          <p>Bet: {pintData.pint.bet.description}</p>
          <button onClick={claimPint}>Claim</button>
        </div>
      ) : (
        <p>No Data stored</p>
      )}
    </div>
  );
};

export default PintInfo;
