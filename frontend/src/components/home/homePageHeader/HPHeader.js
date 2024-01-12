import React from 'react';
import './HPheader.css';
import LogoGraphic from '../../../Assets/BoozersWeepersLogo_trans.png'
import QueenGraphic from '../../../Assets/OrangeVic.png'


const HPHeader = () => {
  return (
    <div className='HeaderContainer'> 
      <div className="HPHeaderMainBar"> {/* Corrected class name */}
        <a href='/'>
          <img src={LogoGraphic} alt='BoozersWeepers Logo' className="centered-logo" />
        </a>
      </div>
      <img src={QueenGraphic} alt="Bottom right image" className="bottom-right-img" />
    </div>
  );
};

export default HPHeader;