import VertNavbar from "../VertNavBar/VertNavBar";
import React, { useEffect, useState } from 'react';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'

const NewGroupPage = ({ navigate }) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const loggedInUserId = getSessionUserID(token)
  const [expanded, setExpanded] = useState(true);
	const [groupName, setGroupName] = useState("")

  const toggleExpand = () => {setExpanded(!expanded);};


	const handlegroupNameChange = (event) => {
    setGroupName(event.target.value)
	}

	// When form is completed and submitted:
	const handleGroupSubmit = async (event) => {
		event.preventDefault();

    if(token) {
			fetch( '/pubGroups', {
				method: 'post',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: groupName,
					members: [loggedInUserId],
				})
			})
		
		.then(response => {
			if (response.status === 201) {
				console.log("Your group has been created")
				return response.json();
			} else {
				console.log("Failed to create a group")
			}
		})
	} navigate("/groups");
	}


	return (
		<div id='new-group-page'>
			<VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
				<div className={`page-content ${expanded ? 'shifted-content' : ''}`}>

					<h1 id='new-group-page-title' className="page-heading">Create a new pub group!</h1>
			
					<form onSubmit={handleGroupSubmit}>

          <input placeholder="Group name" id="new-group-name" type='text' value={ groupName } onChange={handlegroupNameChange} />

        <input id='submit' type="submit" value="Submit" />
      </form>
		</div>
		</div>
    )





}
export default NewGroupPage;
