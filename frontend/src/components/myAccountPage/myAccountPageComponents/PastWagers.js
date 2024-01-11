import React, { useState } from 'react';
import getSessionUserID from '../../Utility/getSignedInUser_id';
import NotificationDetails from './NotificationDetails';


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
              <a href={`/Wager/${wager._id}`}>
                <NotificationDetails messageBeforeName = "You won your wager with" userId = {wager.peopleInvolved[0]._id} />
              </a>
            </div>

          ) : loggedInUser === wager.winner._id && wager.peopleInvolved[1]._id !== loggedInUser ? (

            <div id="past-wager" className='wager' >
              <a href={`/Wager/${wager._id}`}>
                <NotificationDetails messageBeforeName = "You won your wager with" userId = {wager.peopleInvolved[1]._id} />
              </a>
            </div>

          ) : loggedInUser !== wager.winner._id && wager.peopleInvolved[0]._id !== loggedInUser? (

            <div id="past-wager" className='wager' >
              <a href={`/Wager/${wager._id}`}>
                <NotificationDetails messageBeforeName = "You lost your wager with" userId = {wager.peopleInvolved[0]._id} />
              </a>
              </div>

          ) : (

            <div id="past-wager" className='wager' >
              <a href={`/Wager/${wager._id}`}>
                <NotificationDetails messageBeforeName = "You lost your wager with" userId = {wager.peopleInvolved[1]._id} />
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
