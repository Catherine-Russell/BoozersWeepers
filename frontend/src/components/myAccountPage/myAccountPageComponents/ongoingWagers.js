import React, { useEffect, useState } from 'react';
import "../MyAccountPage.css"
import getSessionUserID from '../../Utility/getSignedInUser_id';
import NotificationDetails from './NotificationDetails';

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
              <div>{ongoingWagers.map((wager) => (
                <a href={`/Wager/${wager._id}`} >
                    <NotificationDetails messageBeforeName = {"You have a bet with"} userId = {wager.peopleInvolved[1]} messageAfterName ={`that ${wager.description}`}/>
                </a>))}
              </div>
            </div>

          ) : loggedInUser === wager.peopleInvolved[1] ? (

              <div id="ongoing-wager" className='wager'>
              <div>{ongoingWagers.map((wager) => (
                <a href={`/Wager/${wager._id}`} >
                    <NotificationDetails messageBeforeName = {"You have a bet with"} userId = {wager.peopleInvolved[0]} messageAfterName ={`that ${wager.description}`}/>
                </a>))}
              </div>
            </div>

          ) : (

            <div> Note to developer - this wager does not link to the person logged in. Do we want to show it?</div>


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