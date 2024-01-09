import React, { useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import './home.css'


const Home = ({ navigate }) => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpand = () => {setExpanded(!expanded);};

  return(
    <div className="HomePage">
      <VertNavbar expanded={expanded} toggleExpand={toggleExpand} />
   
<h1>BoozersWeepers</h1>
  <a href='/signup'>Please Register</a><br/>
  or <br/>
  <a href='/login'>Sign in</a>
    
  </div>
  )
}

export default Home;
