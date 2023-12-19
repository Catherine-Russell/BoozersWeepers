import React from 'react';
import {useNavigate} from "react-router-dom";
import { IoHome,IoPint } from 'react-icons/io5';
import { BiExpandHorizontal } from "react-icons/bi";
import { FaHandshakeSimple } from "react-icons/fa6";
import '/Users/samuelford/Projects/TeamTavern/frontend/src/components/VertNavBar/VertNavBar.css'


const VertNavbar = ({ expanded, toggleExpand }) => {
  return (
    <nav className={`VertNavbar ${expanded ? 'expanded' : ''}`}>
        <div className="VertNavbar-links">
          <ul>
          <li onClick={toggleExpand}><BiExpandHorizontal className="react-icon" size={30} /></li>
          <li className="spacer"></li> {/* Empty list item acting as a spacer */}
          <li><a href='/'><span>Home</span><IoHome className="react-icon" size={30} /></a></li>
          <li><a href='/userlist'><span>New Bet</span><FaHandshakeSimple className="react-icon" size={30} onClick={useNavigate('/signup')}/></a></li>
          <li><span>Option 3</span><IoPint className="react-icon" size={30} /></li>
            {/* Add more options as needed */}
          </ul>
        </div>

      <div className="bottom-section">
        <div>Item at the bottom</div>
      </div>
    </nav>
  );
};

export default VertNavbar;