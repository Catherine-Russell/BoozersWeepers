import React, { useState } from 'react';
import "./NewWagerForm.css";

const NewWagerForm = ({ navigate }) => {
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
					deadline: deadline
				})
			})
		
		.then(response => {
			if (response.status === 201) {
				console.log("THE WAGER HAS BEEN CREATED")
				return response.json();
			} else {
				console.log("CREATE WAGER FAILED")
			}
		})
	}
	}
	const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  
  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value)
  }


return (
	<form onSubmit={handleWagerSubmit}>
		<h1 id="create-a-wager-heading">Create a Wager</h1>

          <input placeholder="Description" id="description" type='text' value={ description } onChange={handleDescriptionChange} />
        <input placeholder="deadline" id="deadline" type='text' value={ deadline } onChange={handleDeadlineChange} />

  
        <input id='submit' type="submit" value="Submit" />
      </form>

)
	
}


export default NewWagerForm