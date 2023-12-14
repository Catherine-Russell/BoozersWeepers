import React, { useEffect, useState } from 'react';
import NotificationDeatils from './notificationDeatails';


const IncomingWagers = (props, { navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setData] = useState(props.wagers)
  const [userBet, setUserBet] = useState(null)
  
  console.log(props.wagers)


  

  

    if(token) {
      return(
        <div id="incoming Wagers">

          
          <div id="incoming-wagers-header" className="MyAccountSubheading">Your incoming Wagers:</div>
        
          <div>{props.wagers.map((wager) => (<h6><NotificationDeatils  betId = {wager.peopleInvolved[0]}/></h6>))}</div>
        </div>
   
      )
    } else {
    navigate('/login')
    }
}

export default IncomingWagers;
