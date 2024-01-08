import getSessionUserID from "../../Utility/getSignedInUser_id";
import React, { navigate } from 'react';
import { useNavigate } from "react-router-dom";


const SingleOngoingWager = (wagerData) => {
    const navigate = useNavigate()
    const token = window.localStorage.getItem('token');
    const loggedInUser = getSessionUserID(token)
    const wager = wagerData.wagerData
    const user1 = wager.peopleInvolved[0]
    const user2 = wager.peopleInvolved[1]

    const dateParts = wager.deadline.slice(0, 10).split("-");
    const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

    const checkIfOngoing = new Date(wager.deadline) > new Date()

    // Handle I Won Currently Does not award Pints
    const handleIWonClick = () => {
      console.log("I won")
      if(token) {
        fetch( `/wagers/updateWinner/${wager._id}/${loggedInUser}`, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })      
      .then(response => {
        if (response.status === 200) {
          console.log("Wager winner updated to you")
          return response.json();
        } else {
          console.log("Wager winner failed to be updated")
        }
      })
    } navigate("/myAccount");
    }


    const handleUser1WonClick = () => {
      if (token) {
        fetch(`/wagers/updateWinner/${wager._id}/${user1._id}`, {
          method: 'post',
          headers: {'Authorization': `Bearer ${token}`,}
        })
          .then(response => {
            if (response.status === 200) {
              console.log("Wager winner updated to other user")
              return response.json();
            } else {console.log("Wager winner failed to be updated")}
          })
          .then(() => {
            return fetch('/pints', {
              method: 'post',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                owner: user1._id,
                owed_by: user2.id,
                bet: wager._id
              })
            })
          })
          .then(response => {
            if (response.status === 201) {
              console.log("A Pint for User 1 has been created");
              return response.json();
            } else {console.log("Failed to create a pint");}
          })
          .then(() => {navigate("/myAccount");})
          .catch(error => {console.error("Error occurred:", error);});
      }
    };

    const handleUser2WonClick = () => {
      if (token) {
        fetch(`/wagers/updateWinner/${wager._id}/${user2._id}`, {
          method: 'post',
          headers: {'Authorization': `Bearer ${token}`,}
        })
          .then(response => {
            if (response.status === 200) {
              console.log("Wager winner updated to user 2")
              return response.json();
            } else {console.log("Wager winner failed to be updated")}
          })
          .then(() => {
            return fetch('/pints', {
              method: 'post',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                owner: user2._id,
                owed_by: user1._id,
                bet: wager._id
              })
            })
          })
          .then(response => {
            if (response.status === 201) {
              console.log("A Pint for User 2 has been created");
              return response.json();
            } else {console.log("Failed to create a pint");}
          })
          .then(() => {
            navigate("/myAccount");
          })
          .catch(error => {
            console.error("Error occurred:", error);
          });
      }
    };

    if (loggedInUser === wager.peopleInvolved[0]._id) {
      
      return (
        <div id='single-ongoing-wager' className='single-wager'>
          { checkIfOngoing ? (<div id='ongoing-status-description'>You have an ongoing wager with {wager.peopleInvolved[1].username}!</div>) : (<div id='ongoing-status-description'>Your wager with {wager.peopleInvolved[1].username} has reached the deadline!</div>
          )}
        Who won the wager that {wager.description}?<br />
        <div id='deadline' className='deadline'>Deadline: {deadlineDate} </div>  
        <button id='I-won-button' className='I-won-button' onClick={ handleIWonClick }>I won</button>
        <button id='I-lost-button' className='I-lost-button' onClick={ handleUser2WonClick }>{wager.peopleInvolved[1].username} won</button>
        </div>
      )
    } else if (loggedInUser === wager.peopleInvolved[1]._id) { //for when logged-in user was the challenged user

      return (
        <div id='single-ongoing-wager' className='single-wager'>
          { checkIfOngoing ? (<div id='ongoing-status-description'>You have an ongoing wager with {wager.peopleInvolved[1].username}!</div>) : (<div id='ongoing-status-description'>Your wager with {wager.peopleInvolved[1].username} has reached the deadline!</div>
          )}
        Who won the wager that {wager.description}?<br />
        <div id='deadline' className='deadline'>Deadline: {deadlineDate} </div> <br /> <br />
        <button id='I-won-button' className='I-won-button' onClick={ handleIWonClick }>I won</button>
        <button id='I-lost-button' className='I-lost-button' onClick={ handleUser1WonClick }>{wager.peopleInvolved[0].username} won</button>
        </div>
      )
      } else { 

      return (
        <div id='single-ongoing-wager' className='single-wager'>
        { checkIfOngoing ? (<div id='ongoing-status-description'>You have an ongoing wager with {wager.peopleInvolved[1].username}!</div>) : (<div id='ongoing-status-description'>Your wager with {wager.peopleInvolved[1].username} has reached the deadline!</div>
        )}
        Who won the wager that {wager.description}?<br />
        <div id='deadline' className='deadline'>Deadline: {deadlineDate} </div>

        <br /> <br />
        <button id='user1-won-button' className='other-user-won-button' onClick={ handleUser1WonClick }>{wager.peopleInvolved[0].username} won</button>
        <button id='user2-won-button' className='other-user-won-button' onClick={ handleUser2WonClick }>{wager.peopleInvolved[1].username} won</button>
        </div>
        )
      }
    }


export default SingleOngoingWager;
