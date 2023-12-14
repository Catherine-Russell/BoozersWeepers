import React, { useEffect, useState } from 'react';


const IncomingWagers = (props, { navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [wagers, setData] = useState(props.wagers)
  console.log(props.wagers)
  

    if(token) {
      return(
        <div id="incoming Wagers">
          
          

          

          
          <div id="incoming-wagers-header" className="MyAccountSubheading">Your incoming Wagers:</div>
        
          <div>{props.wagers.map((wager) => (<h6>{wager.peopleInvolved[0]} the person with this Id wants tow wager</h6>))}</div>
        </div>
      
      )
    } else {
    navigate('/login')
    }
}

export default IncomingWagers;
