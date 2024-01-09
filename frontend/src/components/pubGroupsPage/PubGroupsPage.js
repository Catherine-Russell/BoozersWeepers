import VertNavbar from "../VertNavBar/VertNavBar";
import isTokenValid from '../Utility/isTokenValid';
import React, { useEffect, useState } from 'react';
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

  return(
    <div className="pub-groups-page-container">
    {/* <VertNavbar expanded={expanded} toggleExpand={toggleExpand} /> */}
		
			<div className="my-groups">
				<h1>My groups:</h1>
					list of groups

					{pubGroups.map((pubGroup) => (
					<div key={pubGroup.id}>
						
					<a href={`/pubGroup/${pubGroup._id}`} >
						these are the pubgroups: {pubGroup.name}?
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
