import React, { useEffect, useState } from 'react';
import './pintinfo.css';

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
      window.location.reload();
    }
  };

  return (
    <div className='singlepint'>
      {pintData ? (
        <div>
          <div className="singlepint_title">I.O.U ONE DRINK</div>
          <div className="singlepint_paragraph">
          <b>Owed by</b> {pintData.pint.owed_by.username} after they were wrong that <b>{pintData.pint.bet.description}</b>
          <br/>
          <p className="singlepint_comment">What a plonker...</p>
          <button className="singlepint_Button" onClick={claimPint}>Claim</button>
          </div>
        </div>
      ) : (
        <p>No Data stored</p>
      )}
    </div>
  );
};

export default PintInfo;
