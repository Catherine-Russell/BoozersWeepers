import React, { useEffect, useState } from 'react';

const HistoricWagers = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="past-wagers">
        
          <div id="past-wagers-header" className="MyAccountSubheading">Your Past Wagers:</div>
      
        </div>
      )
    } else {
      navigate('/login')
    }
}

export default HistoricWagers;
