import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import isTokenValid from '../Utility/isTokenValid';
import IncomingWagers from './myAccountPageComponents/IncomingWagers';
import OngoingWagers from './myAccountPageComponents/ongoingWagers';
import PendingWagers from './myAccountPageComponents/PendingWagers';
import PastWagers from './myAccountPageComponents/PastWagers';
import getSessionUserID from '../Utility/getSignedInUser_id';
import UnresolvedWagers from './myAccountPageComponents/UnresolvedWagers';
import NotificationDetails from './myAccountPageComponents/NotificationDetails';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from './blackboardHeader/blackboardHeader';
import '../../Pages/style.css'
import './MyAccountPage.css'


const MyAccountPage = ({ navigate }) => {
  // const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(token));
  const [expanded, setExpanded] = useState(true);
  const [LoggedInUserID, setLoggedInUserID] = useState (getSessionUserID(token))
  const [showIncoming, setShowIncoming] = useState(null)
  const [showOngoing, setShowOngoing] = useState(null)
  const [showPending, setShowPending] = useState(null)
  const [showUnresolved, setShowUnresolved] = useState(null)
  const [showHistory, setShowHistory] = useState(null)
  


const toggleIncoming = (event) =>{
  if(showIncoming === null){
    setShowIncoming(true)
  event.preventDefault()
  }
  else{
    setShowIncoming(null)
  event.preventDefault()
  }
}
const toggleOngoing = (event) =>{
  if(showOngoing === null){
    setShowOngoing(true)
  event.preventDefault()
  }
  else{
    setShowOngoing(null)
  event.preventDefault()
  }
}
const togglePending = (event) =>{
  if(showPending === null){
    setShowPending(true)
  event.preventDefault()
  }
  else{
    setShowPending(null)
  event.preventDefault()
  }
}
const toggleUnresolved = (event) =>{
  if(showUnresolved === null){
    setShowUnresolved(true)
  
  event.preventDefault()
  }
  else{
  
    setShowUnresolved(null)
  
  }
}
const toggleHistory = (event) =>{
  if(showHistory === null){
    setShowHistory(true)
  
  event.preventDefault()
  }
  else{
  
    setShowHistory(null)
  
  }
}

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

    if (!isLoggedIn) {navigate('/');}
    }, [navigate, isLoggedIn, token]);

    
    // added an extra filter to show wagers that the signed in user is involved with
    const myWagers = wagers.filter(wager => wager.peopleInvolved[0]._id === LoggedInUserID || wager.peopleInvolved[1]._id === LoggedInUserID)
    // Gets wagers which have been sent from other users to be approved by logged-in user
    const wagerRequests = myWagers.filter(wager => wager.approved === false && wager.peopleInvolved[1]._id === LoggedInUserID)
    // Gets ongoing wagers -> they have been approved by both users and are still within the time limit
    const ongoingWagers = myWagers.filter(wager => wager.approved === true && checkIfOngoing(wager.deadline) && wager.winner === null)
    // Gets pending wagers -> they have been sent but not yet approved by the person you sent it to
    const pendingWagers = myWagers.filter(wager => wager.peopleInvolved[0]._id === LoggedInUserID && wager.approved === false)
    // Gets unresolved wagers -> they are past the deadline, have been approved  but haven't declared a winner yet
    const unresolvedWagers = myWagers.filter(wager => checkIfOngoing(wager.deadline) === false && wager.winner === null && wager.approved !== false)
    // Gets past wagers -> wagers which have been resolved and have a winner declared
    const pastWagers = myWagers.filter(wager => wager.winner != null)
    
    const toggleExpand = () => {setExpanded(!expanded);};


  
    useEffect(() => {

      if (!isLoggedIn) {navigate('/');}
      }, [navigate, isLoggedIn]);
  
      return (
        <div className='shade'>
          <div className='blackboard'>
            <div className='form'>

          <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
          <BlackboardHeader />
          <h1 className='username-subheading'>Catherine's wagers</h1>
          {wagerRequests.length > 0 && (
          <button onClick={toggleIncoming} className='NotificationButton'>
            <FaBell /> 
            <span className='NotificationBadge'>{wagerRequests.length}</span>
          </button>
            )}
        
        {showIncoming && <IncomingWagers wagers={wagerRequests} />}
        
        {ongoingWagers.length > 0 && (
          <div>
          <h2 className="showInfo" onClick={toggleOngoing}>Show Ongoing Wagers ({ongoingWagers.length})</h2>
          {showOngoing && <OngoingWagers ongoingWagers={ongoingWagers} />}
          </div>
        )}    
        
        {pendingWagers.length > 0 &&(
          <div>
          <h2 className="showInfo" onClick={togglePending}>Show Pending Wagers ({pendingWagers.length})</h2>
          {showPending && <PendingWagers pendingWagers={pendingWagers} />}
          </div>

        )}
          {unresolvedWagers.length >0 &&(

            <div>
          <h2 className="showInfo" onClick={toggleUnresolved}>Show Unresolved Wagers ({unresolvedWagers.length})</h2> 
          {showUnresolved && <UnresolvedWagers unresolvedWagers={unresolvedWagers} />}
          </div>
          )}
        
        {pastWagers.length >0 &&(
          <div>
        <h2 className="showInfo" onClick={toggleHistory}>Show Past Wagers ({pastWagers.length})</h2> 
        {showHistory && <PastWagers pastWagers={pastWagers} />}
        </div>
        )}

        {pastWagers.length === 0 && unresolvedWagers.length===0 && pendingWagers.length === 0 && ongoingWagers.length===0 &&(
          <div>
            <h2 className="noWagers"> You have no wagers - <a className="noWagers" href='/userlist'>challenge someone!</a></h2> 
          </div>
        )}

    </div>
    </div>
  </div>
      )};
    
  export default MyAccountPage;






    
  



