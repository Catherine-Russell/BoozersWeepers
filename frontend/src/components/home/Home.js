<<<<<<< main
import React from 'react';
import NavBar from '../NavBar/NavBar';
=======
import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState } from 'react';
import "./home.css"


>>>>>>> local

const Home = ({ navigate }) => {
  return(
    <div>
      <NavBar/>
   
<h1>BoozersWeepers</h1>
  <a href='/signup'>Please Register</a><br/>
  or <br/>
  <a href='/login'>Sign in</a>
    
  </div>
  )
}

export default Home;
