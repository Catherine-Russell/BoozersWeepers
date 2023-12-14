import React, { useEffect, useState } from 'react';


const IncomingWagers = (props, { navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [data, setData] = useState(props.data)
  

    if(token) {
      return(
        <div>
          <h6>{props.data} the person with this id wants to wager</h6>
          

          

          
          
        </div>
      )
    } else {
    navigate('/login')
    }
}

export default IncomingWagers;
