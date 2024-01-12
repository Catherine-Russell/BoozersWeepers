import VertNavbar from "../VertNavBar/VertNavBar";
import React, { useEffect, useState } from 'react';
import getSessionUserID from '../Utility/getSignedInUser_id';
import '../../Pages/style.css'
import Header from '../header/Header';


const NewGroupPage = ({ navigate }) => {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const loggedInUserId = getSessionUserID(token)
  	const [expanded, setExpanded] = useState(true);
	const [groupName, setGroupName] = useState("")
	const [errorMsg, setErrorMsg] = useState("");

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
		
		.then(async response => {
			if (response.status === 201) {
				console.log("Your group has been created")
				navigate("/groups");
			} else {
				const errorData = await response.json();
				navigate('/groups/new') 
				setErrorMsg(errorData.message)
				console.log(errorData.message)
			}
		})
	} 
	}


	return (
		<div id='new-group-page'>
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
					<h1 id='new-group-page-title' className="page_subheading">Create a new group!</h1>
<br></br>
			
					<form onSubmit={handleGroupSubmit}>

          <input placeholder="Enter your Group name" id="new-group-name" type='text' value={ groupName } onChange={handlegroupNameChange} />
		  <br></br>
		  <br></br>

        <input id='submit' type="submit" value="Submit" />
		<h2>{errorMsg}</h2>
      </form>
		</div>
		</div>
    )



}
export default NewGroupPage;
