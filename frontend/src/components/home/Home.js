import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState } from 'react';
import "./home.css"



const Home = ({ navigate }) => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {setExpanded(!expanded);};

  return(
    <div className='logged-out-page-container'>
    <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />

<h1 className='main-title'>BoozersWeepers</h1>
  <a href='/signup'>Please Register</a><br/>
  or <br/>
  <a href='/login'>Sign in</a>
    
  </div>
  )
}

export default Home;
