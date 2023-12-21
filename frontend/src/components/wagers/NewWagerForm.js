import React, { useState } from 'react';
import "./NewWagerForm.css";
import { useParams } from "react-router-dom"
import NavBar from '../NavBar/NavBar';

const NewWagerForm = ({ navigate }) => {
	const {challengedUserID} = useParams()
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState("");
	const [token, setToken] = useState(window.localStorage.getItem("token"));


	const handleWagerSubmit = async (event) => {
		event.preventDefault();

    if(token) {
			fetch( '/wagers', {
				method: 'post',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					description: description,
					deadline: deadline,
					challengedUser: challengedUserID
				})
			})
		
		.then(response => {
			if (response.status === 201) {
				console.log("Your wager has been created")
				return response.json();
			} else {
				console.log("Failed to create a wager")
			}
		})
	} navigate("/myAccount");
	}
	const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  
  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value)
  }

if (token) {

	return (
		<>
		<NavBar/>
		<form onSubmit={handleWagerSubmit}>
		<h1 id="create-a-wager-heading">Create a Wager</h1>

          <input placeholder="Description" id="description" type='text' value={ description } onChange={handleDescriptionChange} />
        <input placeholder="deadline" id="deadline" type='date' value={ deadline } onChange={handleDeadlineChange} />

  
        <input id='submit' type="submit" value="Submit" />
      </form>
			</>
		)
} else {
	navigate("/../login");
}
	
}


export default NewWagerForm