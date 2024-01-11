import React from 'react';
import '../header/header.css';
import LogoGraphic from '../../Assets/BoozersWeepersLogo_trans.png'
import QueenGraphic from '../../Assets/OrangeVic.png'

const Header = () => {
    return (
        <div className='HeaderContainer'> 
          <div className="HeaderMainBar"><a href='/'>
        <img src={LogoGraphic} alt='BoozersWeepers Logo'/></a></div>
        <img src={QueenGraphic} alt="Bottom right image" className="bottom-right-image"/>
        </div>
      );
    };

export default Header;