import VertNavbar from "../VertNavBar/VertNavBar";
import isTokenValid from '../Utility/isTokenValid';
import React, { useEffect, useState } from 'react';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'
import './PubGroupsPage.css'

import SearchBar from "../SearchBar/SearchBar";
import Header from '../header/Header';



const PubGroupsPage = ({ navigate }) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [pubGroups, setPubGroups] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {setExpanded(!expanded);};


	useEffect((event) => {
    
    // Gets pub groups data from backend
    if(token) {
      fetch("/pubGroups", {
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPubGroups(data.pubGroups)
        })
      }
			if (!isLoggedIn) {navigate('/');}
    }, [navigate, isLoggedIn, token]);

		// Gets a list of the groups which the logged-in user is a member of
		const joinedGroups = pubGroups.filter(pubGroup => pubGroup.members.includes(getSessionUserID(token)))
		console.log(joinedGroups)

		const handleCreateGroupButtonClick = () => {
			navigate('/groups/new')
		}
  return(
    <div className="pub-groups-page">
    <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
		<Header />

			<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
			<div className="my-groups" >
				<h1 id='my-groups-header' className="page_subheading">Your groups:</h1>
				
					<>
					{joinedGroups.map((pubGroup) => (
						<p key={pubGroup.id} className="group-name">
						<a href={`/groups/${pubGroup._id}`} >
						{pubGroup.name}
						</a>
						</p>))}
							</>
						
					<br></br>
						

			<div id="search-groups">
						<h1 id='search-group-header' className="page_subheading">Join a new group</h1>
						<SearchBar message={"Search for a group..."} list={pubGroups} group={true}/>
			</div>
				<br></br>
					<div id='create-new-group'>
						<h1 id='new-group-header' className="page_subheading">Create a group</h1>

						<button onClick={handleCreateGroupButtonClick}>Create group</button>
					</div>
			</div>
    </div>
	</div>
	)
}

export default PubGroupsPage;
