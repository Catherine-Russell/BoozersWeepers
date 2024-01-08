import React, { useEffect, useState } from 'react';
import PintInfo from '../singlepint/pintinfo';

const WalletComponent = ({UserID}) => {
    const [WalletData, setWalletData] = useState(null);
    const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));

    useEffect(() => {
        const fetchWalletData = async () => {
          try {
            const response = await fetch(`/pints/wallet/${UserID}`, {
              headers: { Authorization: `Bearer ${userToken}` }
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const fetchedData = await response.json();
            setWalletData(fetchedData);
          } catch (error) {
            console.error('Error fetching pint data:', error);
          }
        };
    
        fetchWalletData();
        console.log(WalletData)
      }, [UserID, userToken]);


  return (
    <div>
        {WalletData && WalletData.pints && WalletData.pints.map((pint) => (
        <PintInfo key={pint._id} pintId={pint._id} />
      ))}
    
    </div>

  );
};

export default WalletComponent;