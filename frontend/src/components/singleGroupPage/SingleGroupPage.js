import VertNavbar from '../VertNavBar/VertNavBar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import getSessionUserID from '../Utility/getSignedInUser_id';




const SingleGroupPage = ({ navigate }) => {
  const { pubGroupId } = useParams();
  const [pubGroupData, setpubGroupData] = useState(null);
  const [wagers, setWagers] = useState([])

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);

	// Get group and member info, also wager info
	useEffect(() => {
		if(token) {
      fetch(`/pubGroups/${pubGroupId}`, {
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setpubGroupData(data.pubGroup)
        })
      }
			if (!isLoggedIn) {navigate('/');}
    }, [navigate, isLoggedIn, token]);

// Gets all wager info
		useEffect(() => {
			if(token) {
				fetch("/wagers", {
					method: 'get',
					headers: {'Authorization': `Bearer ${token}`}
				})
					.then(response => response.json())
					.then(async data => {
						window.localStorage.setItem("token", data.token)
						setToken(window.localStorage.getItem("token"))
						setWagers(data.wagers)
					})
				}
			if (!isLoggedIn) {navigate('/');}
			}, [navigate, isLoggedIn, token]);

// Sorts through data received from DB to make them usable in frontend
		const members = pubGroupData?.members
		const allMemberIds = members?.map((member) => member._id) || [];
		const allGroupWagers = wagers.filter((wager) => allMemberIds.includes(wager.peopleInvolved[0]._id) && allMemberIds.includes(wager.peopleInvolved[1]._id))
		const resolvedGroupWagers = allGroupWagers.filter(wager => wager.winner != null)
		const checkIfOngoing = (deadline) => {
			return new Date(deadline) > new Date()
		}
		const ongoingGroupWagers = allGroupWagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline) && wager.winner === null)
		
		// checks to see whether the person who is logged in is in the group already - for join/leave button
		let isGroupMember = (allMemberIds?.includes(getSessionUserID(token)))
		

		
    const toggleExpand = () => {setExpanded(!expanded);}; // for NavBar

    return (
			<div id='single-group-page'>
			<VertNavbar expanded={expanded} toggleExpand={toggleExpand} />

				<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>

					<h1 id='pub-group-name' className='group-page-main-title'>{pubGroupData?.name}</h1>
					<h1 id='pub-group-name' className='group-page-main-title'>Group members</h1>
						
					<div className='members-list'>
        {members && members.length > 0 ? (
          <div id="member-name" className='member-name'>
            <ul>
              {members.map((member) => (
                <li id='member-name' key={member._id}>
									{member.username}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No members in group</p>
        )}
      </div>
					

					<div className='list-of-ongoing-wagers'>
						<h2>ongoing wagers in the group go here:</h2>
            <ul>
              {ongoingGroupWagers.map((wager) => (
                <li id='ongoing-wager' key={wager._id}>
									{wager.peopleInvolved[0].username} and {wager.peopleInvolved[1].username} are battling it out! Who will win the wager that {wager.description}?
                </li>
              ))}
            </ul>

					</div>

					<div className='list-of-wins-losses'>
					<h2>recent wins and losses go here - Boozers and Losers</h2>
            <ul>
						{resolvedGroupWagers.map((wager) => (
							<li id='resolved-wager' key={wager._id}>
								{wager.winner === wager.peopleInvolved[0] ? (
									<>
										{wager.description} - {wager.winner.username} was a winner and {wager.peopleInvolved[1].username} was a loser
									</>
								) : (
									<>
										{wager.description} - {wager.winner.username} was a winner and {wager.peopleInvolved[0].username} was a loser
									</>
								)}
							</li>
						))}
						</ul>
          </div>
				</div>
			</div>
    )
}

export default SingleGroupPage;