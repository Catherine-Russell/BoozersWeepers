import React, { useEffect, useState } from 'react';
import IncomingWagers from './myAccountPageComponents/IncomingWagers';
import OngoingWagers from './myAccountPageComponents/ongoingWagers';
import PendingWagers from './myAccountPageComponents/PendingWagers';
import HistoricWagers from './myAccountPageComponents/PastWagers';
import NavBar from '../NavBar/NavBar';
import getSessionUserID from '../Utility/getSignedInUser_id';




const MyAccountPage = ({ navigate }) => {
  // const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([])
  const [wagerRequests, setWagerRequests] = useState([])


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

          const wagerRequestData = data.wagers.filter(wager => wager.approved === false && wager.peopleInvolved[1] === getSessionUserID(token))
         
          console.log(wagerRequestData)
          
         
        
        // console.log(wagers)
        

        })
    }
  }, [token])
  
    
// REMOVE logout button once we have NavBar
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/')
  }
  
  console.log("START NOW")

  const ongoingWagers = wagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline))
  const pastWagers = wagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline) === false)


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

					<HistoricWagers pastWagers = { pastWagers }/>

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
