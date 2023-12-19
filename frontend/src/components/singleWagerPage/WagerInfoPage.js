import React, { navigate, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';


const WagerInfoPage = () => {
  const { wagerID } = useParams();
  const [wagerData, setWagerData] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const loggedInUser = getSessionUserID(token)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/wagers/${wagerID}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Response status:', response.status);

        if (!response.ok) { throw new Error('Network response was not ok');}

        const fetchedData = await response.json();
        console.log('Fetched data:', fetchedData);

        window.localStorage.setItem('token', fetchedData.token);
        setToken(window.localStorage.getItem('token'));
        setWagerData(fetchedData);
      } catch (error) { console.error('Error fetching wager data:', error); }
    };

    const handleAcceptButtonClick = () => {
      navigate("/myAccount")
    }

    fetchData();
  }, [token, wagerID]);

// New wager request -> if approved == false and who involved[0] != you
if (wagerData.approved === false && wagerData.peopleInvolved[0] !== loggedInUser) {

  return (
    <div>
      <h1>Wager Details</h1>
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

}    // Ongoing wager -> if it has been approved but winner is null

  else if (wagerData.approved === true && wagerData.winner === null) {
    return (
      <div id='ongoing-wager-information' className='single-wager-info'>
        <h1>ongoing wager info</h1>
        <p>
            Wager ID: {wagerData.wager._id} <br />
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
    )
  } else if (wagerData.winner !== null) {
    return (
      <div id='resolved-wager-information' className='single-wager-info'>

      </div>
    )
  }

};

export default WagerInfoPage;
