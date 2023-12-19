import React, { navigate, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../../Utility/getSignedInUser_id';

const SingleWagerRequest = (wagerData) => {
  const wager = wagerData.wagerData
  const handleAcceptClick = () => {
    console.log("Wager accepted")
  }
  const handleRejectClick  = () => {
    console.log("Wager rejected")
  }
  return (
    <div id='single-wager-request' className='single-wager'>
      This is a requested wager
    {wager.peopleInvolved[0].username} bets 1 drink that {wager.description} will happen by {wager.deadline}
    Do you accept or reject their challenge?
    <button id='accept-button' className='accept-button' onClick={ handleAcceptClick }>Accept Wager</button>
    <button id='reject-button' className='reject-button' onClick={ handleRejectClick }>Reject Wager</button>
    </div>

  )

}

export default SingleWagerRequest;
