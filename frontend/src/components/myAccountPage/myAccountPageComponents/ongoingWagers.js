import React, { useEffect, useState } from 'react';
import "../MyAccountPage.css"
import getSessionUserID from '../../Utility/getSignedInUser_id';


const OngoingWagers = ({ navigate, ongoingWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const loggedInUser = getSessionUserID(token)

    if(token) {
      return(
        <div id="ongoing-wagers-feed">
          <div id="ongoing-wagers-header" className="MyAccountSubheading">Your Ongoing Wagers:</div>

          {ongoingWagers.map((wager) => (
        <div key={wager.id}>
          {loggedInUser === wager.peopleInvolved[0] ? (

            <div id="ongoing-wager" className='wager'>
              YOU bet {wager.peopleInvolved[1]} that {wager.description}
              </div>

          ) : loggedInUser === wager.peopleInvolved[1] ? (

            <div id="ongoing-wager" className='wager'>
              {wager.peopleInvolved[0]} bet YOU that {wager.description}
              </div>

          ) : (

            <div id="ongoing-wager" className='wager'>
              {wager.peopleInvolved[0]} bet {wager.peopleInvolved[1]} that {wager.description}
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


export default OngoingWagers;