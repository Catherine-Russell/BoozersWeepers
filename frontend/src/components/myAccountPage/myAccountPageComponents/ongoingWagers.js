import React, { useEffect, useState } from 'react';
import "../MyAccountPage.css"

const OngoingWagers = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(token) {
      return(
        <div id="ongoing-wagers">
          <div id="ongoing-wagers-header" className="MyAccountSubheading">Your Ongoing Wagers:</div>
        </div>
      )
    } else {
      navigate('/login')
    }
}

export default OngoingWagers;
