import React from 'react';
import '../header/header.css';

const Header = () => {
    return (
        <div className='HeaderContainer'> 
          <div className="Spacer" style={{ height: '20px' }}></div>
          <div className='HeaderTopBar'></div>
          <div className="Spacer" style={{ height: '5px' }}></div>
          <div className="HeaderMainBar"><a href='/'>
        <img src='https://www.movieboozer.com/wp-content/uploads/2020/05/Movieboozer-logo-1200x630-1.png' alt='BoozersWeepers Logo'/></a></div>
        </div>
      );
    };

export default Header;