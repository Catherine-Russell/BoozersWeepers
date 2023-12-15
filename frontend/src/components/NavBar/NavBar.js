import React, { useState } from 'react';
import './NavBar.css';




const NavBar = () =>{
  const [token, setToken] = useState(window.localStorage.getItem("token"))


  const logout = () => {
    window.localStorage.removeItem("token")

  }



  return(
    <div>
      <div className='Navbar'>
        <a href='/login' className='txt'>login</a>
        <a href={`/userlist`} className='txt'>make a wager</a>
        <a href={`/signup`} className='txt'>signup page</a>
        <a href={`/myAccount`} className='txt'>profile page</a>
        

        <a href={`/`} className='txt'>home</a>

        
      </div>


    </div>
  )


}
export default NavBar