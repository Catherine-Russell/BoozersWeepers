import React from 'react';
import { useNavigate } from 'react-router-dom';
import './challengebox.css'

const SingleUser = ({ SelectedUser }) => {

        const navigate = useNavigate();
      
        const handleButtonClick = () => {
          navigate(`/newWager/${SelectedUser._id}`);
        };


    return (
        <div>
        <b>{SelectedUser.username}</b><br/>
        <button className='Button' onClick={ handleButtonClick }>Make A Wager</button>
        </div>
    )


};

export default SingleUser;