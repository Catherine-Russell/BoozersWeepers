import React, { useEffect, useState } from 'react';
import "../MyAccountPage.css"

const OngoingWagers = ({ navigate, ongoingWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="ongoing-wagers-feed">
          <div id="ongoing-wagers-header" className="MyAccountSubheading">Your Ongoing Wagers:</div>
          
            {ongoingWagers.map((wager) => (
              <div id="ongoing-wager" className='wager'>
                {wager.peopleInvolved[0]} bet {wager.peopleInvolved[1]} that {wager.description} by {wager.deadline}
                </div>
            )
            )}
      </div>
      )
    } else {
      navigate('/login')
    }
}


export default OngoingWagers;
