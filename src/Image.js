import React from "react";
import './image.css';

const Image = ({box, imagee}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2 '>
            <img id='inputimage' alt='' src={imagee} width='300px' height='auto'/>
            <div className='faceborder' 
            style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
            </div>
            </div>
        </div>
    );
}
export default Image;