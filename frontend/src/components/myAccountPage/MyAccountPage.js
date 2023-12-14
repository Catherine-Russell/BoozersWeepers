import React, { useEffect, useState } from 'react';
import IncomingWagers from './myAccountPageComponents/IncomingWagers';
import OngoingWagers from './myAccountPageComponents/ongoingWagers';
import PendingWagers from './myAccountPageComponents/PendingWagers';
import HistoricWagers from './myAccountPageComponents/PastWagers';
import NavBar from '../NavBar/NavBar';




const MyAccountPage = ({ navigate }) => {
  // const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setWagers] = useState([])
  const [wagerRequests, setWagerRequests] = useState([])
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
          //console.log(data)
         // await data.wagers.map((wager) => {console.log(wager)})
         //const wagerdata = data.wagers.map((wager) => {wager})
         
         

          setWagers(data.wagers)
          const wagerRequestData = wagers.filter(wager => wager.approved === false)
          setWagerRequests(wagerRequestData)
         
        // console.log(wagers)
         
      

        })
    }
  }, [token])
    
// REMOVE logout button once we have NavBar
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/')
  }
  
    if(token) {
      return(
        <>
				<NavBar />
          <h2>Username's account</h2>



          
          <div id='incoming Wagers' role="incoming wagers">
            <h4>incoming Wagers</h4>
            {wagerRequests.map(
            (wager) => (<IncomingWagers data={wager.peopleInvolved} {...navigate=navigate}/>) 
          )}
          
        </div>
					
        
          <div id='feed' role="feed">
          
        </div>

         

         
         
         
        
        

					<OngoingWagers />
          
          
					<PendingWagers />

					<HistoricWagers />


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
