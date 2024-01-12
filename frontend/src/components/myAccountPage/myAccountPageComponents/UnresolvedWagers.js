import React, { useState } from 'react';
import "../MyAccountPage.css"
import './notification.css'
import getSessionUserID from '../../Utility/getSignedInUser_id';

const UnresolvedWagers = ({ navigate, unresolvedWagers }) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const loggedInUser = getSessionUserID(token)


	if(token) {
			return(
				<div id="unresolved-wagers-feed">
				
					{unresolvedWagers.map((wager) => (
					<div key={wager.id}>
						
					<a className="notificationdetails" href={`/Wager/${wager._id}`} >
						Who won the wager that {wager.description}?
					</a>
					</div>))}
				</div>

				
				
			)} else {
			navigate('/login')
		}
	}

export default UnresolvedWagers;