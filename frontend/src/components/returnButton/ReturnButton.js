import React, { navigate } from 'react';

const ReturnButton = () => {
    <button id='return-button' className="return-button" onClick={navigate("/myAccount")}>Back to All Wagers</button>
}

export default ReturnButton;