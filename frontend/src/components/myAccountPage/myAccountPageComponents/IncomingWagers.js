import React, { useEffect, useState } from 'react';
import NotificationDetails from './NotificationDetails';
import "../MyAccountPage.css"



const IncomingWagers = (props, { navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setData] = useState(props.wagers)
  const [userBet, setUserBet] = useState(null)

  

    if(token) {
      return(
        <div id="incoming Wagers">

          {/*  this is the main loop to crate a list of wagers, the notification details component is need to get the 
          user details for each   */}
        

          <div>{props.wagers.map((wager) => (
            <a className="notificationdetails" key={wager._id} href={`/Wager/${wager._id}`} >
              <a className="notificationdetails" href={`/wager/${wager._id}`}>{wager.peopleInvolved[0].username} would like to wager!</a><br />

            </a>))}
          </div>

        </div>

      )
    } else {
    navigate('/login')
    }
}

export default IncomingWagers;
