import React from 'react';
import '../header/header.css';
import LogoGraphic from '../../Assets/BoozersWeepersLogo_trans.png'

const Header = () => {
    return (
        <div className='HeaderContainer'> 
          <div className="HeaderMainBar"><a href='/'>
        <img src={LogoGraphic} alt='BoozersWeepers Logo'/></a></div>
        </div>
      );
    };

export default Header;