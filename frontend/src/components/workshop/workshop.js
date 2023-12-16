//  This is a page for testing elements and components - TO BE REMOVED BEFORE FINAL BUILD
import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
const Workshop = ({ navigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));

  useEffect(() => {
    const isValidToken = isTokenValid(userToken);
    setIsLoggedIn(isValidToken);

    if (!isValidToken) {navigate('/login');}
  }, [userToken, navigate]);

  return (
    <div>
      <h1>Workshop</h1>
      {isLoggedIn ? (
        <div>
          {/* Content for logged-in user */}
          <p>Welcome! User is logged in</p>
          
        </div>
      ) : (
        <div>
          <p>Please <a href='/login'>log in</a> to access this Page</p>
          {/* Content for non-logged-in user - Although they Should not See this as the page should automatically navigate*/}
        </div>
      )}
    </div>
  );
};

export default Workshop;
