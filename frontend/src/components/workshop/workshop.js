import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import VertNavbar from '../VertNavBar/VertNavBar';
import '../../Pages/style.css'
import Header from '../header/Header';

const Workshop = ({ navigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const isValidToken = isTokenValid(userToken);
    setIsLoggedIn(isValidToken);
  }, [userToken]);

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

export default Workshop;
