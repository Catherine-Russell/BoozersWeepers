import React, { navigate, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleWagerRequest = (wagerData) => {
  const navigate = useNavigate()
  const token = window.localStorage.getItem('token');
  const wager = wagerData.wagerData
  const dateParts = wager.deadline.slice(0, 10).split("-");
  const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

  const handleAcceptClick = () => {
    if(token) {
      fetch( `/wagers/${wager._id}/accept`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })      
    .then(response => {
      if (response.status === 200) {
        console.log("Wager Accepted")
        return response.json();
      } else {
        console.log("Wager failed to update")
      }
    })
  } navigate("/myAccount");
  }

  const handleRejectClick  = () => {
    console.log("Wager rejected")
    navigate('/myAccount')

  }
  return (
    <div id='single-wager-request' className='preamble'>
    {wager.peopleInvolved[0].username} wants to wager that {wager.description}.<br />
    The winner will receive {wager.quantity} pint!
    <div id='deadline' className='deadline'>Deadline: {deadlineDate} </div><br />
    Do you accept or reject their challenge?<br /> <br />
    <button id='accept-button' className='accept-button' onClick={ handleAcceptClick }>Accept Wager</button><span className="button-space"></span>
    <button id='reject-button' className='reject-button' onClick={ handleRejectClick }>Reject Wager</button>
    </div>

  )

}

export default SingleWagerRequest;
