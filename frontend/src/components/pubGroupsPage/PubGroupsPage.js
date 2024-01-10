import VertNavbar from "../VertNavBar/VertNavBar";
import isTokenValid from '../Utility/isTokenValid';
import React, { useEffect, useState } from 'react';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'
import SearchBar from "../SearchBar/SearchBar";


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
			<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
			
		
			<div className="my-groups">
				<h1>My groups:</h1>
					{joinedGroups.map((pubGroup) => (
					<div key={pubGroup.id}>
					<a href={`/groups/${pubGroup._id}`} >
						{pubGroup.name}
					</a>
					</div>))}

					<br></br>
						

			<div className="search-groups">
						<SearchBar message={"search for a group..."} list={pubGroups} group={true}/>
			</div>

					<div id='create-new-group'>
						<h1>Create a new group</h1>
						<button onClick={handleCreateGroupButtonClick}>Create group</button>
					</div>
		<br></br>
			</div>
    </div>
	</div>
	)
}

export default PubGroupsPage;
