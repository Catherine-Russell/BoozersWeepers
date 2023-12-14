import React, { useEffect, useState } from 'react';
import IncomingWagers from './myAccountPageComponents/IncomingWagers';
import OngoingWagers from './myAccountPageComponents/ongoingWagers';
import PendingWagers from './myAccountPageComponents/PendingWagers';
import HistoricWagers from './myAccountPageComponents/PastWagers';
import NavBar from '../NavBar/NavBar';


const MyAccountPage = ({ navigate }) => {
  // const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
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
					<IncomingWagers />
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
