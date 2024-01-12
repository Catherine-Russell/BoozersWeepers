import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import VertNavbar from '../VertNavBar/VertNavBar';
import Header from '../header/Header';
import '../../Pages/style.css';
import './leaderboard.css';
import InfoPuller from '../stats/infopuller';

const LeaderBoard = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);


  const toggleExpand = () => { setExpanded(!expanded); };

  useEffect(() => {
    if (!isLoggedIn) { navigate('/'); }
  }, [navigate, isLoggedIn]);

  return (
    <div className='shade'>
      <div className='blackboard'>
        <div className='form'>

          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <Header />

        <InfoPuller />

        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;