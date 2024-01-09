import { useNavigate } from 'react-router-dom';
import React from 'react';

const SinglePendingWager = (wagerData) => {
    const navigate = useNavigate()
    const wager = wagerData.wagerData;
    const token = window.localStorage.getItem('token');
    const dateParts = wager.deadline.slice(0, 10).split("-");
    const deadlineDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`

    const handleCancelButtonClick = () => {
        fetch( `/wagers/${wager._id}/cancel`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })      
        console.log("cancel button clicked")
        navigate("/myAccount")
    }
    return (
        <div id='single-pending-wager' className="single-wager-info">
            <div id='pending-wager-header' className='pending-wager-header'>We are still waiting for {wager.peopleInvolved[1].username} to respond to your wager!</div>
            <div id='wager-details'>
                Wager details: {wager.description} <br />
                Winnings: {wager.quantity} drink<br /> 
                Deadline: {deadlineDate} </div><br />
            <button id='cancel-request-button' onClick={ handleCancelButtonClick }>Cancel Request</button>
        </div>
    )
}

export default SinglePendingWager;
