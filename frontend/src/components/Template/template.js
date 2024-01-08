import React, { useEffect, useState } from 'react';
import isTokenValid from '../Utility/isTokenValid';
import VertNavbar from '../VertNavBar/VertNavBar';
import '../../Pages/style.css'
import Header from '../header/Header';

const Template = ({ navigate }) => {
  const [token, setUserToken] = useState(window.localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {setExpanded(!expanded);};

  const handlePintSubmit = async (event) => {
		event.preventDefault();

    if(token) {
			fetch( '/pints', {
				method: 'post',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					owner: "65784bb12edaba69155c7499",
					owed_by: "65784bb12edaba69155c7499",
					bet:"657a2f8a1aeee60e3d796b48"
				})
			})
		
		.then(response => {
			if (response.status === 201) {
				console.log("Your pint has been created")
				return response.json();
			} else {
				console.log("Failed to create a pint")
			}
		})
	} navigate("/myAccount");
	}

  return (
    <div>
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
      <div className={`page-content ${expanded ? 'shifted-content' : ''}`}>
        <Header/>
        <h1>Title</h1>

        {isLoggedIn ? (
          <div>
            {/* Additional content for logged-in users */}
            <p>Welcome! User is logged in</p>
            <button onClick={handlePintSubmit}>Click to Add Pint</button>
            
          </div>
        ) : (
          <div>
            {/* Content for non-logged-in users */}
            <p>Please <a href="/login">log in</a> to access this page</p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
