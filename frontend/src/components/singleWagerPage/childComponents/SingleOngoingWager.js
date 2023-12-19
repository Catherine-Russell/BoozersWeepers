import getSessionUserID from "../../Utility/getSignedInUser_id";
import React, { navigate } from 'react';


const SingleOngoingWager = (wagerData) => {
    const token = window.localStorage.getItem('token');
    const loggedInUser = getSessionUserID(token)
    const wager = wagerData.wagerData
    const user1 = wager.peopleInvolved[0]
    const user2 = wager.peopleInvolved[1]

    const dateParts = wager.deadline.slice(0, 10).split("-");
    const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
  
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


    const handleUser1WonClick  = () => {
      if(token) {
        fetch( `/wagers/updateWinner/${wager._id}/${user1._id}`, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })      
      .then(response => {
        if (response.status === 200) {
          console.log("Wager winner updated to other user")
          return response.json();
        } else {
          console.log("Wager winner failed to be updated")
        }
      })
    } navigate("/myAccount");
  }

    const handleUser2WonClick  = () => {
      if(token) {
        fetch( `/wagers/updateWinner/${wager._id}/${user2._id}`, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })      
      .then(response => {
        if (response.status === 200) {
          console.log("Wager winner updated to other user")
          return response.json();
        } else {
          console.log("Wager winner failed to be updated")
        }
      })
    } navigate("/myAccount");
    }

    if (loggedInUser === wager.peopleInvolved[0]._id) { // for when the logged in user was the challenger
      
      return (
        <div id='single-ongoing-wager' className='single-wager'>
        Who won the wager that {wager.description} would happen by {deadlineDate}? <br /> <br />
        <button id='I-won-button' className='I-won-button' onClick={ handleIWonClick }>I won</button>
        <button id='I-lost-button' className='I-lost-button' onClick={ handleUser2WonClick }>{wager.peopleInvolved[1].username} won</button>
        </div>
      )
    } else if (loggedInUser === wager.peopleInvolved[1]._id) { //for when logged-in user was the challenged user

      return (
        <div id='single-ongoing-wager' className='single-wager'>
        Who won the wager that {wager.description} would happen by {deadlineDate}? <br /> <br />
        <button id='I-won-button' className='I-won-button' onClick={ handleIWonClick }>I won</button>
        <button id='I-lost-button' className='I-lost-button' onClick={ handleUser1WonClick }>{wager.peopleInvolved[0].username} won</button>
        </div>
      )
      } else { 

        return (
          <div id='single-ongoing-wager' className='single-wager'>
          Who won the wager that {wager.description} would happen by {deadlineDate}? <br /> <br />
          <button id='I-lost-button' className='I-lost-button' onClick={ handleUser1WonClick }>{wager.peopleInvolved[0].username} won</button>
          <button id='I-lost-button' className='I-lost-button' onClick={ handleUser2WonClick }>{wager.peopleInvolved[1].username} won</button>
          </div>
        )
      }
    }


export default SingleOngoingWager;
