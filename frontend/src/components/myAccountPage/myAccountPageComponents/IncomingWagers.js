import React, { useEffect, useState } from 'react';

const IncomingWagers = ({ navigate }, props) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [data, setData] = use

    if(token) {
      return(
        <div id="incoming-wagers">
          <h6>{props.id} the person with this id wants to wager</h6>
          <h5>is work??</h5>

          

          <div id="incoming-wagers-header" className="MyAccountSubheading">Your Incoming Wagers:</div>
          
        </div>
      )
    } else {
      navigate('/login')
    }
}

export default IncomingWagers;
