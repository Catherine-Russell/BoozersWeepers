import VertNavbar from '../VertNavBar/VertNavBar';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';



const SingleGroupPage = ({ navigate }) => {
  const { pubGroupId } = useParams();
  const [pubGroupData, setpubGroupData] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);
	
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


    const members = pubGroupData?.members
		console.log(members)
		// const ongoingGroupWagers = 
		// const resolvedGroupWagers = 
    const toggleExpand = () => {setExpanded(!expanded);};

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
          <p>No members available.</p>
        )}
      </div>
					




					<div className='list-of-ongoing-wagers'>
						ongoing wagers in the group go here
					</div>
					<div className='list-of-wins-losses'>
						recent wins and losses go here
					</div>
				</div>
			</div>
    )
}

export default SingleGroupPage;