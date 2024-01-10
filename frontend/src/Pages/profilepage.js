import React, { useEffect, useState } from 'react';
import isTokenValid from '../components/Utility/isTokenValid';
import VertNavbar from '../components/VertNavBar/VertNavBar';
import { useParams } from 'react-router-dom';
import '../Pages/style.css';
import Header from '../components/header/Header';

const ProfilePage = ({ navigate }) => {
  const { userID } = useParams();
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(userToken));
  const [expanded, setExpanded] = useState(true);
  const [userData,setUserData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/userdata/${userID}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        if (!response.ok) {throw new Error('Network response was not ok');}
        const fetchedData = await response.json();

        window.localStorage.setItem('token', fetchedData.token);
        setUserToken(window.localStorage.getItem('token'));
        setUserData(fetchedData);
      
      } catch (error) {console.error('Error fetching user data:', error);}
    };

    fetchData();
  }, [userToken, userID]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <Header />
        <h1>ProfilePage</h1>
        {isLoggedIn ? (
          <div>
            {userData ? (
            <p>
            Username: {userData.user.username}<br/>
            email: {userData.user.email}</p>
           ) : (<p>User Not Found</p>)}
          </div>
        ) : (
          <div>Please <a href="/login">log in</a> to access this page</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
