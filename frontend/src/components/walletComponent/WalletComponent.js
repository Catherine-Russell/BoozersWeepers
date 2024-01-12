import React, { useEffect, useState } from 'react';
import PintInfo from '../singlepint/pintinfo';
import './popup.css';
import './WalletComponent.css'

const WalletComponent = ({ UserID }) => {
  const [WalletData, setWalletData] = useState(null);
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const [selectedPint, setSelectedPint] = useState(null); // State to track selected pint

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
  }, [UserID, userToken]);

  const openPintInfo = (pintId) => {
    setSelectedPint(pintId); // Set the selected pint to display its info
  };

  const closePintInfo = () => {
    setSelectedPint(null); // Clear the selected pint to close the pop-up
  };

  return (
    <div >
      {WalletData && WalletData.pints && WalletData.pints.map((pint) => (
        <div key={pint._id}>
          <button className='pint' onClick={() => openPintInfo(pint._id)}>{pint.owed_by.username}<div>owes you a pint!</div>
          <div>
            Click to claim</div> </button>
        </div>
      ))}

      {/* Pop-up window */}
      {selectedPint && (
        <div className="popup">
          <div className="popup_inner">
            <span className="close_popup" onClick={closePintInfo}>
            &times;
            </span>
            <PintInfo pintId={selectedPint} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletComponent;
