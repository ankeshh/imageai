import React from "react";

const Image = ({imagee}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2 '>
            <img alt='' src={imagee} width='300px' height='auto'/>
            </div>
        </div>
    );
}
export default Image;