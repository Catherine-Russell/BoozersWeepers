import VertNavbar from '../VertNavBar/VertNavBar';
import React, { useState } from 'react';
import "./Homecss.css"
import '../../Pages/style.css'
import '../header/Header.js'
import HPHeader from './homePageHeader/HPHeader';



const Home = ({ navigate }) => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {setExpanded(!expanded);};

  return(
    <div className='logged-out-page-container'>
    <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    <HPHeader />
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
  <a className='register-link' href='/signup'>Please Register</a><br/>
  or <br/>
  <a className='login-link'href='/login'>Sign in</a>
    
  </div>
  )
}

export default Home;
