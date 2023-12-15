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
          {/*  this is the main loop to crate a list of wagers, the notification details component is need to get the 
          user details for each   */}
        

          <div>{props.wagers.map((wager) => (<h6><a href={`/Wager/:${wager._id}`} ><NotificationDeatils  userId = {wager.peopleInvolved[0]} message ={"would Like To Wager!!"}/></a></h6>))}</div>

        </div>
   
      )
    } else {
    navigate('/login')
    }
}

export default IncomingWagers;
