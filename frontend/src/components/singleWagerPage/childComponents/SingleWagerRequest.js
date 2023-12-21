import React, { navigate, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleWagerRequest = (wagerData) => {
  const navigate = useNavigate()
  const wager = wagerData.wagerData
  const dateParts = wager.deadline.slice(0, 10).split("-");
  const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

  const handleAcceptClick = () => {
    console.log("Wager accepted")
    navigate('/myAccount')
  }
  const handleRejectClick  = () => {
    console.log("Wager rejected")
    navigate('/myAccount')

  }
  return (
    <div id='single-wager-request' className='single-wager'>
    {wager.peopleInvolved[0].username} wants to wager {wager.quantity} drink that {wager.description}<br />
    <div id='deadline' className='deadline'>Deadline: {deadlineDate} </div><br />
    Do you accept or reject their challenge?<br /> <br />
    <button id='accept-button' className='accept-button' onClick={ handleAcceptClick }>Accept Wager</button>
    <button id='reject-button' className='reject-button' onClick={ handleRejectClick }>Reject Wager</button>
    </div>

  )

}

export default SingleWagerRequest;
