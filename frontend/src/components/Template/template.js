import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import VertNavbar from '../VertNavBar/VertNavBar';
import '../../Pages/style.css'
import Header from '../header/Header';
import Stats from '../stats/stats';
import Trial from '../stats/stats'
import ReWorkStats from '../stats/reworkstats';
import InfoPuller from '../stats/infopuller';

const Template = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {setExpanded(!expanded);};

  
  return (
    <div>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <Header/>
        <h1>Title</h1>

        {isLoggedIn ? (
          <div>
            {/* Additional content for logged-in users */}
            <p>Welcome! User is logged in</p>
            <InfoPuller/>
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

export default Template;
