import React from 'react';
import NavBar from '../NavBar/NavBar';

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
