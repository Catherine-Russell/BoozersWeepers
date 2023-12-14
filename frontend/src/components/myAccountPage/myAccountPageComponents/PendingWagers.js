import React, { useEffect, useState } from 'react';

const PendingWagers = ({ navigate, pendingWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="pending-wagers">
        
          <div id="pending-wagers-header" className="MyAccountSubheading">Your Pending Wagers:</div>

          {pendingWagers.map((wager) => (
            
						<div id="pending-wager" className='wager'>
              <a href={`/Wager/${wager._id}`}> Waiting for {wager.peopleInvolved[1]} to respond to your wager that {wager.description}</a>
              </div>
					)
					)}

        </div>
      )
    } else {
      navigate('/login')
    }
}

export default PendingWagers;
