import React, { useEffect, useState } from 'react';

const HistoricWagers = ({ navigate, pastWagers }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="past-wagers">
        
          <div id="past-wagers-header" className="MyAccountSubheading">Your Past Wagers:</div>
          <div>{pastWagers.map((wager) => (<h6>{wager.description}</h6>))}</div>
        </div>
      )
    } else {
      navigate('/login')
    }
}

export default HistoricWagers;
