import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleWager = () => {
  const { wagerID } = useParams();
  const [wagerData, setWagerData] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem('token'));

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

    fetchData();
  }, [token, wagerID]);

  return (
    <div>
      <h1>Wager Details</h1>
      {wagerData ? (
        <div>
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleWager;
