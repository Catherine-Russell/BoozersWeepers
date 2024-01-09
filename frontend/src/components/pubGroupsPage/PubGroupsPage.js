import VertNavbar from "../VertNavBar/VertNavBar";
import React, { useEffect, useState } from 'react';

const PubGroupsPage = () => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpand = () => {setExpanded(!expanded);};


    return(
        <div className="pub-groups-page-container">
        <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
				
				<div className="my-groups">
					<h1>My groups:</h1>
				</div>
				<div className="new-groups">
					put search bar here and button to go to that individual page
				</div>
            
        </div>
    )
}

export default PubGroupsPage;
