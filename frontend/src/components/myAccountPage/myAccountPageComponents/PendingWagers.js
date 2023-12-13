import React, { useEffect, useState } from 'react';

const PendingWagers = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="pending-wagers">
        
          <div id="pending-wagers-header" className="MyAccountSubheading">Your Pending Wagers:</div>

        </div>
      )
    } else {
      navigate('/login')
    }
}

export default PendingWagers;
