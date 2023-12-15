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


// Returns True if deadline has not yet passed, false if deadline is over and wager is complete
  const checkIfOngoing = (deadline) => {
    const currentDate = new Date()
    const deadlineDate = new Date(deadline)
    return (deadlineDate > currentDate)
    }


  useEffect((event) => {
    
    // Gets Wagers data from backend
    if(token) {
      fetch("/wagers", {
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setWagers(data.wagers)
        })
      }
    }, [token])
    
    
    // Gets wagers which have been sent from other users to be approved by logged-in user
    const wagerRequests = wagers.filter(wager => wager.approved === false && wager.peopleInvolved[1] === getSessionUserID(token))

    // Gets ongoing wagers -> they have been approved by both users and are still within the time limit
    const ongoingWagers = wagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline))

    // Gets pending wagers -> they have been sent but not yet approved by the person you sent it to
    const pendingWagers = wagers.filter(wager => wager.peopleInvolved[0] === getSessionUserID(token) && wager.approved === false)
    
    // Gets unresolved wagers -> they are past the deadline but haven't declared a winner yet
    const unresolvedWagers = wagers.filter(wager => checkIfOngoing(wager.deadline) === false && wager.winner === null)
    
    // Gets past wagers -> wagers which have been resolved and have a winner declared
    const pastWagers = wagers.filter(wager => wager.winner != null)
    
    // REMOVE logout button from page once we have it in NavBar
    const logout = () => {
      window.localStorage.removeItem("token")
      navigate('/')
    }

    if(token) {
      return(
        <>
				<NavBar />
          <h2>Username's account {getSessionUserID(token)}</h2>
        
          <IncomingWagers wagers = { wagerRequests }/>    
        
					<OngoingWagers ongoingWagers = { ongoingWagers }/>

					<PendingWagers pendingWagers = { pendingWagers }/>

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
