import React, { useEffect, useState } from 'react';
import "../MyAccountPage.css"
import getSessionUserID from '../../Utility/getSignedInUser_id';
import NotificationDetails from './NotificationDetails';
import './notification.css'


const OngoingWagers = ({ navigate, ongoingWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const loggedInUser = getSessionUserID(token)

  if (token) {
    return (
      <div id="ongoing-wagers-feed">
        {ongoingWagers.map((wager, index) => (
          <div key={index}>
            {wager.peopleInvolved[0]._id === loggedInUser ? 
            (

              <p>
              <a className="notificationdetails" href={`/wager/${wager._id}`}>You bet {wager.peopleInvolved[1].username} that {wager.description}</a>
              </p>
            ) 
            : 
            (
              <p>
              <a className="notificationdetails" href={`/wager/${wager._id}`}>{wager.peopleInvolved[0].username} bet you that {wager.description}</a>
              </p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    navigate('/login');
    return null; 
  }
};

export default OngoingWagers;