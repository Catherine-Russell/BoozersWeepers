import React, { useState, useEffect } from 'react';

const Stats = ({ UserID }) => {
  const [userToken, setUserToken] = useState(window.localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [wagerData, setWagerData] = useState(null);
  const [pintData, setPintData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/userdata/${UserID}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const fetchedData = await response.json();
        window.localStorage.setItem('token', fetchedData.token);
        setUserToken(window.localStorage.getItem('token'));
        setUserData(fetchedData.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchWagerData = async () => {
      try {
        const response = await fetch('/wagers', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${userToken}` }
        });

        const data = await response.json();
        window.localStorage.setItem('token', data.token);
        setWagerData(data.wagers);

        // Perform filtering here once the wagerData is set
        const Bets_made = data.wagers.filter(wager =>
          wager.peopleInvolved[0]._id === UserID || wager.peopleInvolved[1]._id === UserID
        );
        console.log('Bets made by the user:', Bets_made.length);
      } catch (error) {
        console.error('Error fetching wagers:', error);
      }
    };

    const fetchPintData = async () => {
      try {
        const response = await fetch('/pints', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${userToken}` }
        });

        const data = await response.json();
        window.localStorage.setItem('token', data.token);
        setPintData(data);
      } catch (error) {
        console.error('Error fetching pint data:', error);
      }
    };

    fetchData();
    fetchWagerData();
    fetchPintData();
  }, [userToken, UserID]);

  return (
    <div>
      {/* Display the fetched data */}
      {/* You can also place these as placeholders before data fetching is complete */}
      { /* userData, wagerData, pintData */ }

      {/* Once wagerData is updated, display the length of Bets_made */}
      {wagerData ? <p>Bets made by the user: {wagerData.filter(wager => wager.peopleInvolved[0]._id === UserID || wager.peopleInvolved[1]._id === UserID).length}</p> : null}
      <p>Bets Won</p>
      <p>Bets Lost</p>
      <p>Pints Claimed!</p>
      <p>Pints he owes people!</p>
    </div>
  );
};

export default Stats;
