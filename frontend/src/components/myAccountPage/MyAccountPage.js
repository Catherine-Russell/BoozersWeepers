import React, { useEffect, useState } from 'react';
import IncomingWagers from './myAccountPageComponents/IncomingWagers';
import OngoingWagers from './myAccountPageComponents/ongoingWagers';
import PendingWagers from './myAccountPageComponents/PendingWagers';
import PastWagers from './myAccountPageComponents/PastWagers';
import NavBar from '../NavBar/NavBar';
import getSessionUserID from '../Utility/getSignedInUser_id';
import UnresolvedWagers from './myAccountPageComponents/UnresolvedWagers';




const MyAccountPage = ({ navigate }) => {
  // const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([])
  // const [wagerRequests, setWagerRequests] = useState([])


// Returns True if deadline has not yet passed, false if deadline is over and wager is complete
  const checkIfOngoing = (deadline) => {
    const currentDate = new Date()
    const deadlineDate = new Date(deadline)
    return (deadlineDate > currentDate)
    }


  useEffect((event) => {
    
    if(token) {
      fetch("/wagers", {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`


        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))


          setWagers(data.wagers)

          
          
          
          
          // console.log(wagers)
          
          
        })
      }
    }, [token])
    
    
    // REMOVE logout button once we have NavBar
    const logout = () => {
      window.localStorage.removeItem("token")
      navigate('/')
    }
    
    // Gets wagers which have been sent from other users to be approved by logged-in user
    const wagerRequests = wagers.filter(wager => wager.approved === false && wager.peopleInvolved[1] === getSessionUserID(token))
    // setWagerRequests(wagerRequestData)

    // Gets ongoing wagers -> they have been approved by both users and are still within the time limit
    const ongoingWagers = wagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline))
    
    // Gets unresolved wagers -> they are past the deadline but haven't declared a winner yet
    const unresolvedWagers = wagers.filter(wager => checkIfOngoing(wager.deadline) === false && wager.winner === null)
    
    // Gets past wagers -> wagers which have been resolved and have a winner declared
    const pastWagers = wagers.filter(wager => wager.winner != null)

    console.log("THE UNRESOLVED BEtS", unresolvedWagers)
    

    if(token) {
      return(
        <>
				<NavBar />
          <h2>Username's account {getSessionUserID(token)}</h2>

          
          <div id='incoming Wagers' role="incoming wagers">
        
          <IncomingWagers wagers={wagerRequests}/>

          
        <>
          <div id='incomingWagers' role="incoming wagers">
          
          </div>
          </>
        
          
        </div>
					
        
          <div id='feed' role="feed">
          
        </div>
        
        

					<OngoingWagers ongoingWagers = { ongoingWagers }/>

					<PendingWagers />

					<UnresolvedWagers unresolvedWagers = { unresolvedWagers }/>


					<PastWagers pastWagers = { pastWagers }/>

            <button onClick={logout}>
              Logout
            </button>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default MyAccountPage;
