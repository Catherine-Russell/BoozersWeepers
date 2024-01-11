import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState } from 'react';
import "./Homecss.css"
import '../../Pages/style.css'
import '../header/Header.js'
import Header from '../header/Header.js';



const Home = ({ navigate }) => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {setExpanded(!expanded);};

  return(
    <div className='logged-out-page-container'>
      <Header />
    <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />

<h1 className='main-title'>Boozers Weepers</h1>
  <a id='register-link' href='/signup'>Please Register</a><br/>
  or <br/>
  <a id='login-link'href='/login'>Sign in</a>
    
  </div>
  )
}

export default Home;
