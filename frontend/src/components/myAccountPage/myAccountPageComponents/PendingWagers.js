import React, { useEffect, useState } from 'react';
import NotificationDetails from './NotificationDetails';

const PendingWagers = ({ navigate, pendingWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="pending-wagers">
        
          <div id="pending-wagers-header" className="MyAccountSubheading">Your Pending Wagers:</div>

						<div id="pending-wager" className='wager'>
              <div>{pendingWagers.map((wager) => (<h6><a href={`/Wager/${wager._id}`} ><NotificationDetails messageBeforeName = {"waiting for"} userId = {wager.peopleInvolved[1]} messageAfterName ={`to respond to your wager that ${wager.description}`}/></a></h6>))}</div>
              </div>
					
					

        </div>
      )
    } else {
      navigate('/login')
    }
}

export default PendingWagers;
