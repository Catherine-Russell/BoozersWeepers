import React, { useEffect, useState } from 'react';

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
  }, [])
    
// REMOVE logout button once we have NavBar
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
          <h2>Username's account</h2>
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
