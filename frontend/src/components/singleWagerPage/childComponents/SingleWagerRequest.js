import React, { navigate, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../../Utility/getSignedInUser_id';

const SingleWagerRequest = (wagerData) => {
  const wager = wagerData.wagerData
  const dateParts = wager.deadline.slice(0, 10).split("-");
  const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

  const handleAcceptClick = () => {
    console.log("Wager accepted")
  }
  const handleRejectClick  = () => {
    console.log("Wager rejected")
  }
  return (
    <div id='single-wager-request' className='single-wager'>
    {wager.peopleInvolved[0].username} bets 1 drink that {wager.description} will happen by {deadlineDate} <br />
    Do you accept or reject their challenge?<br /> <br />
    <button id='accept-button' className='accept-button' onClick={ handleAcceptClick }>Accept Wager</button>
    <button id='reject-button' className='reject-button' onClick={ handleRejectClick }>Reject Wager</button>
    </div>

  )

}

export default SingleWagerRequest;
