import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import VertNavbar from '../VertNavBar/VertNavBar';
import './Workshop.css'; // Import CSS file for Workshop component styling
import Header from '../header/Header';

const Workshop = ({ navigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const isValidToken = isTokenValid(userToken);
    setIsLoggedIn(isValidToken);

    if (!isValidToken) {
      navigate('/login');
    }
  }, [userToken, navigate]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div><Header/>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        
        <h1>Workshop</h1>

        {isLoggedIn ? (
          <div>
            <p>Welcome! User is logged in</p>
            {/* Additional content for logged-in users */}
          </div>
        ) : (
          <div>
            <p>Please <a href="/login">log in</a> to access this page</p>
            {/* Content for non-logged-in users */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workshop;
