import React from 'react';
import './blackboardHeader.css';
import LogoGraphic from '../../../Assets/BoozersWeepersLogo_trans.png'
import QueenGraphic from '../../../Assets/OrangeVic.png'


const blackboardHeader = () => {
    return (
        <div className='BBHeaderContainer'> 
          <div className="BBHeaderMainBar"><a href='/'>
        <img src={LogoGraphic} alt='BoozersWeepers Logo'/></a></div>
        <img src={QueenGraphic} alt="Bottom right image" className="BBbottom-right-image"/>
        </div>
      );
    };

export default blackboardHeader;