import './WagerInfoPage.css'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSessionUserID from '../Utility/getSignedInUser_id';
import NavBar from '../NavBar/NavBar';
import SinglePendingWager from './childComponents/SinglePendingWager';
import SingleWagerRequest from './childComponents/SingleWagerRequest';
import SingleOngoingWager from './childComponents/SingleOngoingWager';
import SingleResolvedWager from './childComponents/SingleResolvedWager';



const WagerInfoPage = ({ navigate }) => {
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


if (!wagerData) {
  return(
    <p id='loading-message' className='loading-message'>Loading...</p>
  )
} else {

  return (
      <div id='single-wager-page' className='single-wager-page'>
				<NavBar />

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

        <br />
          <button id='return-button' className='return-button' onClick={() => navigate('/myAccount')}>Return to All Wagers</button>
        </div>
      )
    }
  }


export default WagerInfoPage;
