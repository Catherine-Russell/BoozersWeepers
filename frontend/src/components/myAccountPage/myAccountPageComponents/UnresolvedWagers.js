import React, { useState } from 'react';
import "../MyAccountPage.css"
import getSessionUserID from '../../Utility/getSignedInUser_id';

const UnresolvedWagers = ({ navigate, unresolvedWagers }) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const loggedInUser = getSessionUserID(token)


	if(token) {
			return(
				<div id="unresolved-wagers-feed">
					<div id="unresolved-wagers-header" className="MyAccountSubheading">Your Unresolved Wagers:</div>
				
					{unresolvedWagers.map((wager) => (
					<div key={wager.id}>
						
					<a href={`/Wager/${wager._id}`} >
						Time's up! Who won the wager that {wager.description}?
					</a>
					</div>))}
				</div>

				
				
			)} else {
			navigate('/login')
		}
	}

export default UnresolvedWagers;