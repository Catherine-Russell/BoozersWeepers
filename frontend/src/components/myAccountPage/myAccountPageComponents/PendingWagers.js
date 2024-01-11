import React, { useEffect, useState } from 'react';
import NotificationDetails from './NotificationDetails';
import './notification.css'

const PendingWagers = ({ navigate, pendingWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="pending-wagers">

						<div id="pending-wager" className='wager'>
              <div>{pendingWagers.map((wager) => (

                <a  className="notificationdetails" key={wager._id} href={`/Wager/${wager._id}`} >
                  <NotificationDetails messageBeforeName = {"waiting for"} userId = {wager.peopleInvolved[1]._id} messageAfterName ={`to respond to your wager`}/>


                </a>))}
              </div>
            </div>

        </div>
      )
    } else {
      navigate('/login')
    }
}

export default PendingWagers;
