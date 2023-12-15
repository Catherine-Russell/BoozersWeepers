
import React, { useEffect, useState } from 'react';


const NotificationDeatils = (props) =>{
  const [userData, setUserData] = useState(null)
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  //this component takes a given userId and popoulates the page with the User Data
  // It also takes a message prop to allow custom messages to be displayed



  
  useEffect(() => {
    if (token) {

    
      // This ensures the user's ID is fetched dynamically from the URL
      fetch(`/userData/${props.userId}`, {
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
    <h4>{props.messageBeforeName} {userData.username} {props.messageAfterName}</h4>


  )}
  </div>
)

  
}


export default NotificationDeatils;