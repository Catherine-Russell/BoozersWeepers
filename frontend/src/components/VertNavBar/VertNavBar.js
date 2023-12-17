import React from 'react';
import { IoHome,IoPint } from 'react-icons/io5';
import '/Users/samuelford/Projects/TeamTavern/frontend/src/components/VertNavBar/VertNavBar.css'

const VertNavbar = ({ expanded, toggleExpand }) => {
  return (
    <nav className={`VertNavbar ${expanded ? 'expanded' : ''}`}>
      <div className="top-section">
        <div className="VertNavbar-logo" onClick={toggleExpand}>
          <span>Logo</span>
        </div>
        <div className="VertNavbar-links">
          <ul>
            <li>
              <a href='/'><span>Home</span>
              <IoHome className="react-icon" size={30} /></a>
            </li>
            <li>
              <span>New Bet</span>
              <IoPint className="react-icon" size={30} />
            </li>
            <li>
              <span>Option 3</span>
              <IoPint className="react-icon" size={30} />
            </li>
            {/* Add more options as needed */}
          </ul>
        </div>
      </div>
      <div className="bottom-section">
        <div>Item at the bottom</div>
      </div>
    </nav>
  );
};

export default VertNavbar;
