import React, { useState } from 'react';
import getSessionUserID from '../../Utility/getSignedInUser_id';
import NotificationDetails from './NotificationDetails';


const PastWagers = ({ navigate, pastWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const loggedInUser = getSessionUserID(token)

    if(token) {
      return(
        <div id="past-wagers">
        
          <div id="past-wagers-header" className="MyAccountSubheading">Your Past Wagers:</div>

          {pastWagers.map((wager) => (
        <div key={wager.id}>
          {loggedInUser === wager.winner && wager.peopleInvolved[0] !== loggedInUser ?( 

            <div id="past-wager" className='wager'>
              <a href={`/Wager/${wager._id}`}>
                <NotificationDetails messageBeforeName = "You won your wager with" userId = {wager.peopleInvolved[0]} />
              </a>
            </div>

          ) : loggedInUser === wager.winner && wager.peopleInvolved[1] !== loggedInUser ? (

            <div id="past-wager" className='wager'>
              <a href={`/Wager/${wager._id}`}>
                <NotificationDetails messageBeforeName = "You won your wager with" userId = {wager.peopleInvolved[1]} />
              </a>
            </div>

          ) : loggedInUser !== wager.winner && wager.peopleInvolved[0] !== loggedInUser? (

            <div id="past-wager" className='wager'>
              <a href={`/Wager/${wager._id}`}>
                <NotificationDetails messageBeforeName = "You lost your wager with" userId = {wager.peopleInvolved[0]} />
              </a>
              </div>

          ) : (

            <div id="past-wager" className='wager'>
              <a href={`/Wager/${wager._id}`}>
                <NotificationDetails messageBeforeName = "You lost your wager with" userId = {wager.peopleInvolved[1]} />
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
