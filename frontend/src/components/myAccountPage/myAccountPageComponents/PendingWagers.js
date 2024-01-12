import React, { useEffect, useState } from 'react';
import './notification.css'
import "../MyAccountPage.css"


const PendingWagers = ({ navigate, pendingWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="pending-wagers">

						<div id="pending-wager" className='wager'>
              <div>{pendingWagers.map((wager) => (

                  <a className="notificationdetails" href={`/wager/${wager._id}`}>
                    Waiting for {wager.peopleInvolved[1].username} to respond to your wager <br />
              </a>
                ))}
              </div>
            </div>

        </div>
      )
    } else {
      navigate('/login')
    }
}

export default PendingWagers;
