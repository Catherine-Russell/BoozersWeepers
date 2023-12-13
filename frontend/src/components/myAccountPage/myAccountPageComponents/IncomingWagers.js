import React, { useEffect, useState } from 'react';

const IncomingWagers = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="incoming-wagers">

          <div id="incoming-wagers-header" className="MyAccountSubheading">Your Incoming Wagers:</div>
          
        </div>
      )
    } else {
      navigate('/login')
    }
}

export default IncomingWagers;
