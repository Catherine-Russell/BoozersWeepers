import React, { useState, useEffect } from 'react';

const StatsClass = ({ UserID }) => {
  const [userToken, setUserToken] = useState(window.localStorage.getItem('token'));
  const [userData, setUserData] = useState(null);
  const [wagerData, setWagerData] = useState(null);
  const [pintData, setPintData] = useState(null);
  
  const [betsMadeByUser, setBetsMadeByUser] = useState(0);
  const [settledBets, setSettledBets] = useState(0);
  const [betsWon, setBetsWon] = useState(0);
  const [pintsClaimed, setPintsClaimed] = useState(0);
  const [pintsPurchased, setPintsPurchased] = useState(0);
  const [pintsOwed, setPintsOwed] = useState(0);
  const [betsWonPercentage, setBetsWonPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const responseUser = await fetch(`/userdata/${UserID}`, { headers: { Authorization: `Bearer ${userToken}` }});
        if (!responseUser.ok) throw new Error('Network response was not ok');
        const fetchedUserData = await responseUser.json();
        window.localStorage.setItem('token', fetchedUserData.token);
        setUserToken(fetchedUserData.token);
        setUserData(fetchedUserData.user);

        // Fetch wager data
        const responseWagers = await fetch('/wagers', { method: 'GET', headers: { Authorization: `Bearer ${userToken}` }});
        const wagersData = await responseWagers.json();
        window.localStorage.setItem('token', wagersData.token);
        setWagerData(wagersData.wagers);

        // Fetch pint data
        const responsePints = await fetch('/pints', { method: 'GET', headers: { Authorization: `Bearer ${userToken}` }});
        const pintsData = await responsePints.json();
        window.localStorage.setItem('token', pintsData.token);
        setPintData(pintsData.pints);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userToken, UserID]);

  useEffect(() => {
    if (wagerData) {
      const userBets = wagerData.filter(wager => wager.peopleInvolved[0]._id === UserID || wager.peopleInvolved[1]._id === UserID);
      setBetsMadeByUser(userBets.length);

      const resolvedBets = userBets.filter(wager => wager.winner !== null);
      setSettledBets(resolvedBets.length);

      const listOfBetsWon = resolvedBets.filter(wager => wager.winner === UserID);
      setBetsWon(listOfBetsWon.length);

      const percentage = settledBets !== 0 ? ((betsWon / settledBets) * 100).toFixed(0) : 0;
      setBetsWonPercentage(percentage);
    }

    if (pintData) {
      const claimedPints = pintData.filter(pint => pint.owner === UserID && pint.claimed);
      setPintsClaimed(claimedPints.length);

      const listOfPintsPurchased = pintData.filter(pint => pint.owed_by === UserID && pint.claimed);
      setPintsPurchased(listOfPintsPurchased.length);

      const listOfOutstandingPints = pintData.filter(pint => pint.owed_by === UserID && !pint.claimed);
      setPintsOwed(listOfOutstandingPints.length);
    }
  }, [wagerData, pintData, UserID, betsWon, settledBets]);

  // Return an object with the attributes including percentage
  return {
    UserID,
    betsMadeByUser,
    settledBets,
    betsWon,
    pintsClaimed,
    pintsPurchased,
    pintsOwed,
    betsWonPercentage
  };
};

export default StatsClass;