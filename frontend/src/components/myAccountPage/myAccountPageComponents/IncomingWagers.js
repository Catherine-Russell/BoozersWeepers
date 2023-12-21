import React, { useEffect, useState } from 'react';
import NotificationDetails from './NotificationDetails';


const IncomingWagers = (props, { navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setData] = useState(props.wagers)
  const [userBet, setUserBet] = useState(null)

  

    if(token) {
      return(
        <div id="incoming Wagers">

          
          <div id="incoming-wagers-header" className="MyAccountSubheading">Your incoming Wagers:</div>
          {/*  this is the main loop to crate a list of wagers, the notification details component is need to get the 
          user details for each   */}
        

          <div>{props.wagers.map((wager) => (
            <a key={wager._id} href={`/Wager/${wager._id}`} >
              <NotificationDetails  userId = {wager.peopleInvolved[0]} messageAfterName ={"would like To Wager!!"}/>
            </a>))}
          </div>

        </div>

      )
    } else {
    navigate('/login')
    }
}

export default IncomingWagers;
