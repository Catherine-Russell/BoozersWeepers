import React, { useState } from 'react';
import '../Navbar2/Navbar2.css'

const Navbar2 = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className={`navbar2 ${expanded ? 'expanded' : ''}`}>
      <div className="top-section">
        {/* Logo - at the top */}
        <div className="navbar2-logo" onClick={toggleExpand}>
          <span>Logo</span>
        </div>
        {/* Expanded content */}
        <div className="navbar2-links">
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            {/* Add more options as needed */}
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bottom-section">
        {/* Item at the bottom */}
        <div>Item at the bottom</div>
        {/* Add more elements as needed at the bottom */}
      </div>
    </nav>
  );
};

export default Navbar2;
