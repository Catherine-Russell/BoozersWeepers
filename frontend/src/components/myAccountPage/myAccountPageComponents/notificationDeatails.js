
import React, { useEffect, useState } from 'react';


const NotificationDeatils = (props) =>{
  const [userData, setUserData] = useState(null)
  const [token, setToken] = useState(window.localStorage.getItem("token"));



  
  useEffect(() => {
    if (token) {

    
      // This ensures the user's ID is fetched dynamically from the URL
      fetch(`/userData/${props.betId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async userData => {
        window.localStorage.setItem("token", userData.token);
        setToken(window.localStorage.getItem("token"));
        console.log(userData.username)

        // Set user data obtained from the API response to the state
        console.log(userData)
        setUserData(userData.user);

      

      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., set an error state or display a message
      });
    }
  }, []);
return(
  
<div>
  {userData && (
    <h4>{userData.username}<a href={`/Wager/:${props.betId}`} > Would Like to Wager!!</a></h4>


  )}
  </div>
)

  
}


export default NotificationDeatils;