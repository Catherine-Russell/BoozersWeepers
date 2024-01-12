import React, { useState } from 'react';
import getSessionUserID from '../../Utility/getSignedInUser_id';
import NotificationDetails from './NotificationDetails';
import "../MyAccountPage.css"
import './notification.css'




const PastWagers = ({ navigate, pastWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const loggedInUser = getSessionUserID(token)
  console.log(pastWagers)
    if(token) {
      return(
        <div id="past-wagers">

          {pastWagers.map((wager) => (
        <div key={wager._id}>
          {loggedInUser === wager.winner._id && wager.peopleInvolved[0]._id !== loggedInUser ?( 

            <div id="past-wager" className='wager' >
              <a className="notificationdetails" href={`/wager/${wager._id}`}>You won your wager with {wager.peopleInvolved[0].username}
              </a>
            </div>

          ) : loggedInUser === wager.winner._id && wager.peopleInvolved[1]._id !== loggedInUser ? (

            <div id="past-wager" className='wager' >
              <a className="notificationdetails" href={`/wager/${wager._id}`}>You won your wager with {wager.peopleInvolved[1].username}
              </a>
            </div>

          ) : loggedInUser !== wager.winner._id && wager.peopleInvolved[0]._id !== loggedInUser? (

            <div id="past-wager" className='wager' >
              <a className="notificationdetails" href={`/wager/${wager._id}`}>You lost your wager with {wager.peopleInvolved[0].username}
              </a>
              </div>

          ) : (

            <div id="past-wager" className='wager' >
              <a className="notificationdetails" href={`/wager/${wager._id}`}>You lost your wager with {wager.peopleInvolved[1].username}
              </a>
              </div>
              
          )}
          </div>
          
      ))}

        </div>
      )
    } else {
      navigate('/login')
    }
}

export default PastWagers;
