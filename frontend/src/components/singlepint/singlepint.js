import React, { useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import VertNavbar from '../VertNavBar/VertNavBar';
import { useParams } from 'react-router-dom';
import PintInfo from './pintinfo';

import Header from '../header/Header';

const SinglePint = ({ navigate }) => {
  const { PintID } = useParams();
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(userToken));
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <Header />
        <h1>SinglePint</h1>
        
        {isLoggedIn ? (
          <div>
            <PintInfo pintId={PintID} />  
          </div>
        ) : (
          <div>Please <a href="/login">log in</a> to access this page</div>
        )}
      </div>
    </div>
  );
};

export default SinglePint;


