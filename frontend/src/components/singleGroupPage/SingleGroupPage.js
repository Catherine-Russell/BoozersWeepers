import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useEffect, useState } from 'react';


const SingleGroupPage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [expanded, setExpanded] = useState(true);
    
    
    const toggleExpand = () => {setExpanded(!expanded);};

    return (
			<div id='single-group-page'>
			<VertNavbar expanded={expanded} toggleExpand={toggleExpand} />

				<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>

					<h1 id='pub-group-name' className='pub-group-name-title'>This is the name of the group</h1>
					<div className='members-list'>
						List of members go here
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