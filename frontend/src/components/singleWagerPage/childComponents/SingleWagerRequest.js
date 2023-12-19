import React, { navigate, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';

const SingleWagerRequest = () => {
 return (
    <div>
      {wagerData ? (
        <div id='wager-request' className='single-wager-info'>
          <p>
            bets 1 pint that ____ will happen by 12th January <br />Do you accept? 
            People Involved[0]: {wagerData.wager.peopleInvolved[0].username} <br />
            People Involved[1]: {wagerData.wager.peopleInvolved[1].username} <br />
            Quantity: {wagerData.wager.quantity} <br />
            Approved: {wagerData.wager.approved} <br />
            {wagerData.wager.winner === null ? (
              // Code to run when winner is null
              <>Winner: No winner yet<br /></>
              ) : (
                // Code to run when winner is not null
                <>Winner: {wagerData.wager.winner.username}<br /></>
                )}
            Description: {wagerData.wager.description} <br />
            Deadline: {wagerData.wager.deadline} <br />
            Date made: {wagerData.wager.datemade} <br />
          </p>
        </div>
      ) : (
        <p>Loading...</p>
        )}
    </div>
  );   
}

export default SingleWagerRequest;
