import React, { navigate, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';
import SinglePendingWager from './childComponents/SinglePendingWager';
import SingleOngoingWager from './childComponents/SingleOngoingWager';
import SingleResolvedWager from './childComponents/SingleResolvedWager';
import SingleWagerRequest from './childComponents/SingleWagerRequest';


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

    fetchData();
  }, [token, wagerID]);

  return (
    <div id='single-wager-page' className='single-wager-page'>
    <h1 id='single-wager-page-header' className='page-heading'>Wager Details</h1>
    {!wagerData ? (

        <p>Loading...</p>
        
        ) : wagerData.peopleInvolved[0] === loggedInUser && wagerData.approved === false ? (

          <SinglePendingWager wagerData={wagerData}/>

        ) : wagerData.peopleInvolved[1] === loggedInUser && wagerData.approved === true ? (
  
            <SingleWagerRequest wagerData={wagerData}/>

        ) : wagerData.approved === true && wagerData.winner === null ? (

          <SingleOngoingWager wagerData={wagerData}/>

        ) : wagerData.winner !== null ? (

          <SingleResolvedWager wagerData={wagerData}/>

        ) : (
      <p>Error - return to account page</p>
    )}
    </div>
  )
}


export default WagerInfoPage;
