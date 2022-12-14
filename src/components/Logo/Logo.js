import React from "react";
import Tilt from 'react-parallax-tilt';
import face from '../../images/face-scan.png'

import './Logo.css'

const Logo = ()=>{
    return(
        <div className="ma4 mt0">
           <Tilt className="shadow-2 tiltable"
           options={{ max : 55 }} style={{ height: 150, width: 150 }} 
           >
            <div className="pa3 Tilt-inner">
                <img src={face} alt='logo' style={{paddingTop: '5px'}} />
            </div>
            </Tilt> 
        </div>
    )
}

export default Logo;