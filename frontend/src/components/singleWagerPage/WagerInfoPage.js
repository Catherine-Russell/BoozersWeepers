import React, { navigate, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';
import SinglePendingWager from './childComponents/SinglePendingWager';
import SingleWagerRequest from './childComponents/SingleWagerRequest';
import SingleOngoingWager from './childComponents/SingleOngoingWager';
import SingleResolvedWager from './childComponents/SingleResolvedWager';


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
        setWagerData(fetchedData.wager);
      } catch (error) { console.error('Error fetching wager data:', error); }
    };

    fetchData();
  }, [token, wagerID]);
  console.log("THIS IS THE WAGERDATA:", wagerData)

  const wagerInfo = wagerData

  console.log("HELLOOOOOOOOOOOOOOO", wagerInfo)
  console.log("DESCRIPTOIN")
if (!wagerData) {
  return(
    <p id='loading-message' className='loading-message'>Loading...</p>
  )
} else {

  // return(<>This is the single wager page {String(wagerData.approved)} </>)
  return (
      <div id='single-wager-page' className='single-wager-page'>
        <h1 id='single-wager-page-header' className='page-heading'>Wager Details</h1>
        { wagerData.approved === false && wagerData.peopleInvolved[0]._id === loggedInUser ? (
      
            <SinglePendingWager wagerData={wagerData}/>
      
            ) : wagerData.approved === false && wagerData.peopleInvolved[1]._id === loggedInUser ? (
        
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
          }


export default WagerInfoPage;
