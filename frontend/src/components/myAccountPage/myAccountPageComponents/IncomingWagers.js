import React, { useEffect, useState } from 'react';


const IncomingWagers = (props, { navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setData] = useState(props.wagers)
  console.log(props.wagers)
  

    if(token) {
      return(
        <div id="incoming Wagers">
          
          <div id="incoming-wagers-header" className="MyAccountSubheading">Your incoming Wagers:</div>
        
          {props.wagers.map((wager) => (
          <div id="incoming-wager" className='wager'>
            <a href={`/Wager/${wager._id}`}> {wager.peopleInvolved[0]} the person with this Id wants to wager </a>
            </div>
            ))}
        </div>
      
      )
    } else {
    navigate('/login')
    }
}

export default IncomingWagers;
