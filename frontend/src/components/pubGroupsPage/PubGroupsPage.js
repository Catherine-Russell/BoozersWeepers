import VertNavbar from "../VertNavBar/VertNavBar";
import isTokenValid from '../Utility/isTokenValid';
import React, { useEffect, useState } from 'react';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'


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
  return(
    <div className="pub-groups-page-container">
    {/* <VertNavbar expanded={expanded} toggleExpand={toggleExpand} /> */}
		
			<div className="my-groups">
				<h1>My groups:</h1>
					list of groups
					by the way my user id is {getSessionUserID(token)}
					these are the pubgroups: 
					{pubGroups.map((pubGroup) => (
					<div key={pubGroup.id}>
						
					<a href={`/pubGroup/${pubGroup._id}`} >
						{pubGroup.name} members are {pubGroup.members} 
					</a>
					</div>))}
					these are the ones I'm part of: 
					{joinedGroups.map((pubGroup) => (
					<div key={pubGroup.id}>
						
					<a href={`/pubGroup/${pubGroup._id}`} >
						{pubGroup.name}
						
					</a>
					</div>))}

			</div>
		<br></br>
			<div className="new-groups">
			put search bar here and button to go to that individual page
			</div>
            
    </div>
	)
}

export default PubGroupsPage;
