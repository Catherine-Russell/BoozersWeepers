import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHome, IoPint, IoWallet } from 'react-icons/io5';
import { BiExpandHorizontal } from 'react-icons/bi';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { FiLogIn,FiLogOut } from 'react-icons/fi';
import { MdOutlineAccountCircle, MdLeaderboard } from "react-icons/md";
import { TiGroup } from "react-icons/ti"; //for groups

import '../VertNavBar/VertNavBar.css';
import isTokenValid from '../Utility/isTokenValid';

const VertNavbar = ({ expanded, toggleExpand }) => {

const [userToken, setUserToken] = useState(localStorage.getItem('token'));
const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(userToken));
const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className={`VertNavbar ${expanded ? 'expanded' : ''}`}>
      <div className="VertNavbar-links">
        <ul>
        {isLoggedIn ? (
          <ul>
          <li onClick={toggleExpand}><BiExpandHorizontal className="react-icon" size={30} /></li>
          <li className="spacer"></li>
          <li><a href="/myAccount"><span>Home</span><IoHome className="react-icon" size={30} /></a></li>
          <li><a href="/userlist"><span>New Bet</span><FaHandshakeSimple className="react-icon" size={30} /></a></li>
          <li><a href="/wallet"><span>Wallet</span><IoWallet className="react-icon" size={30} /></a></li>
          <li><a href="/groups"><span>Groups</span><TiGroup className="react-icon" size={30} /></a></li>
          <li><a href="/leaderboard"><span>Leaders</span><MdLeaderboard className="react-icon" size={30} /></a></li>
          </ul>
          ) : (
            <ul>
            <li onClick={toggleExpand}><BiExpandHorizontal className="react-icon" size={30} /></li>
            <li className="spacer"></li>
            </ul>
          )}

        </ul>
      </div>

      <div className="bottom-section">
        <ul>
          {isLoggedIn ? (
            <li className="logout-option" onClick={logout}><span>Log Out</span><FiLogOut className="react-icon" size={30} /></li>
          ) : (
            <div>
            <li className="logout-option"><a href="/signup"><span>Register</span><MdOutlineAccountCircle className="react-icon" size={30} /></a></li>
            <li className="logout-option"><a href="/login"><span>Sign In</span><FiLogIn className="react-icon" size={30} /></a></li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default VertNavbar;
