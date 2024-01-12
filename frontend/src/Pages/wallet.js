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
        <Header/>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
      <br />
      <br />
      <br />
      <br />
        
        <h1 className="page_subheading">Wallet</h1>
        <br />
        <br />
        <br />
        
        {isLoggedIn ? (
          <div>
            {/* Additional content for logged-in users */}
            <WalletComponent UserID={SessionUserId}/>
            <br />
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
