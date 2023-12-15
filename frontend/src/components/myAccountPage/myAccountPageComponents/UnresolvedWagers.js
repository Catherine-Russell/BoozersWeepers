import React, { useState } from 'react';
import "../MyAccountPage.css"
import getSessionUserID from '../../Utility/getSignedInUser_id';
import NotificationDeatils from './notificationDeatails';

const UnresolvedWagers = ({ navigate, unresolvedWagers }) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const loggedInUser = getSessionUserID(token)


	if(token) {
			return(
				<div id="unresolved-wagers-feed">
					<div id="unresolved-wagers-header" className="MyAccountSubheading">Your Unresolved Wagers:</div>
				
					{unresolvedWagers.map((wager) => (<h6><a href={`/Wager/${wager._id}`} ><NotificationDeatils  userId = {wager.peopleInvolved[0]} messageBeforeName ={"you have an Unresolved Wager with "}/></a></h6>))}

				
				
				</div>

				
				
			)} else {
			navigate('/login')
		}
	}


export default UnresolvedWagers;