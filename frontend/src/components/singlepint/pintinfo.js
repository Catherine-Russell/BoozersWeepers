import React, { useEffect, useState } from 'react';
import './popup.css'

const PintInfo = ({ pintId }) => {
  const [pintData, setPintData] = useState(null);
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    const fetchPintData = async () => {
      try {
        const response = await fetch(`/pints/${pintId}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });

        if (!response.ok) {throw new Error('Network response was not ok');}

        const fetchedData = await response.json();
        setPintData(fetchedData);
      } catch (error) {console.error('Error fetching pint data:', error);}
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
          } else {console.log("Pint failed to be Claimed");}
        })
        .catch(error => {
          console.error('Error claiming pint:', error);
        });

      console.log('Now we should navigate');
    }
  };

  return (
    <div className='singlepint'>
      {pintData ? (
        <div>
          <b>Pint: {pintData.pint.owner._id}<br /></b>
          Owed to: {pintData.pint.owner.username}<br />
          Datemade: {pintData.pint.datemade}<br />
          Owed by: {pintData.pint.owed_by.username}<br />
          Bet: {pintData.pint.bet.description}<br />
          <button onClick={claimPint}>Claim</button>
        </div>
      ) : (
        <p>No Data stored</p>
      )}
    </div>
  );
};

export default PintInfo;
