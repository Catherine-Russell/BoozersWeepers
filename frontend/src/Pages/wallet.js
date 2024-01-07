import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/Utility/isTokenValid';
import getSessionUserID from '../components/Utility/getSignedInUser_id';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import '../Pages/style.css'
import Header from '../components/header/Header';
import WalletComponent from '../components/walletComponent/WalletComponent';

const WalletPage = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);
  const [SessionUserId,setSessionUserId] = useState(getSessionUserID(token))

  const toggleExpand = () => {setExpanded(!expanded);};

  

  return (
    <div>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <Header/>
        <h1>Wallet</h1>

        {isLoggedIn ? (
          <div>
            {/* Additional content for logged-in users */}
            LoggedInContent Here!
            <WalletComponent UserID={SessionUserId}/>
          </div>
        ) : (
          <div>
            {/* Content for non-logged-in users */}
            <p>Please <a href="/login">log in</a> to access this page</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
