import VertNavbar from '../VertNavBar/VertNavBar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import getSessionUserID from '../Utility/getSignedInUser_id';
import Header from '../header/Header';
import './SingleGroupPage.css'
import '../../Pages/style.css'


const SingleGroupPage = ({ navigate }) => {
  const { pubGroupId } = useParams();
  const [pubGroupData, setpubGroupData] = useState(null);
  const [wagers, setWagers] = useState([])
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);
  const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
  const [hasLeftGroup, setHasLeftGroup] = useState(false);

	// Get group and member info
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

// Gets all wager info with username and _id of people involved
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
		// For winners and losers:
		const resolvedGroupWagers = allGroupWagers.filter(wager => wager.winner != null)
		const checkIfOngoing = (deadline) => {
			return new Date(deadline) > new Date()
		}
		// For ongoing wagers:
		const ongoingGroupWagers = allGroupWagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline) && wager.winner === null)
		
		// checks to see whether the person who is logged in is in the group already - for join/leave button
		const memberIds = members?.map((member) => member._id) || [];
		let isGroupMember = (memberIds?.includes(getSessionUserID(token)))
		


		const handleJoinGroup = () =>  {
			setHasJoinedGroup(true)

			fetch(`/pubGroups/${pubGroupId}/addMember`, {
				method: 'post',
				headers: {'Authorization': `Bearer ${token}`}
			})
			window.location.reload();
			}
		
			const handleLeaveGroup = () =>  {
				setHasLeftGroup(true)
	
				fetch(`/pubGroups/${pubGroupId}/removeMember`, {
					method: 'post',
					headers: {'Authorization': `Bearer ${token}`}
				})
				navigate(`/groups`)
				}


		// for NavBar:
    const toggleExpand = () => {setExpanded(!expanded);};
		return (
			<div id='single-group-page'>
				<VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
				<Header />
	
				<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
					<div className="top-center-section">
						<h1 id='pub-group-name' className='page_title'>{pubGroupData?.name}</h1>
	
						{/* JOIN BUTTON - non-members */}
						<div id='join-group-button'>
							{!hasJoinedGroup && isGroupMember === false && (
								<button onClick={handleJoinGroup}>
									Join Group
								</button>
							)}
						</div>
	
						{/* LEAVE BUTTON - members*/}
						<div id='leave-group-button'>
							{isGroupMember === true && (
								<button onClick={handleLeaveGroup}>
									Leave Group
								</button>
							)}
						</div>
					</div>
	
					<div className="columns-container">
						{/* Column 1 */}
						<div className="column">
	
							<h1 id='group-members' className='page_subheading'>Group members</h1>
							<div className='members-list'>
								{members && members.length > 0 ? (
									<div id="member-name" className='member-name'>
										<p>
											{members.map((member) => (
												<p classname='generic_text' id='member-name' key={member._id}>
													{member.username}
												</p>
											))}
										</p>
									</div>
								) : (
									<p>No members in group</p>
								)}
							</div>
						</div>
	
						{/* Column 2 */}
						<div className="column">
							{isGroupMember ? (
								<div id='members-only-section'>
									<div className='list-of-ongoing-wagers'>
										<h2 id='ongoing-group-wagers' className='page_subheading'> Ongoing wagers</h2>
										<ul>
											{ongoingGroupWagers.map((wager) => (
												<p classname='generic_text' id='ongoing-wager' key={wager._id}>
													{wager.peopleInvolved[0].username} VS {wager.peopleInvolved[1].username}! <br />Who will win the wager that {wager.description}?
												</p>
											))}
										</ul>
									</div>
								</div>
							) : (
								<p id='non-member-message' className='non-member'>You need to be a member of this group to see information</p>
							)}
						</div>
	
						{/* Column 3 */}
						<div className="column">
							{isGroupMember && (
								<div className='list-of-wins-losses'>
									<h2 id='wins-and-losses' className='page_subheading'>Wins and losses</h2>
									<ul>
										{resolvedGroupWagers.map((wager) => (
											<p classname='generic_text' id='resolved-wager' key={wager._id}>
												{wager.winner === wager.peopleInvolved[0] ? (
													<>
														{wager.winner.username}  beat {wager.peopleInvolved[1].username} in their wager that {wager.description}!
													</>
												) : (
													<>
														{wager.winner.username}  beat {wager.peopleInvolved[0].username} in their wager that {wager.description}!
													</>
												)}
											</p>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	};
	
	export default SingleGroupPage;
