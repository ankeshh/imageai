import React from "react";

const Navigation = ({onrouteChange, isSignedin}) => {
    if(isSignedin){
        return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p className='f3 link white dim underline pa3 pointer' onClick={()=>onrouteChange('signin')}>Sign out</p>
            </nav>
        );
    } 
    else{
        return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p className='f3 link white dim underline pa3 pointer' onClick={()=>onrouteChange('signin')}>Sign in</p>
                <p className='f3 link white dim underline pa3 pointer' onClick={()=>onrouteChange('register')}>Register</p>
            </nav>
        );
    }
}

export default Navigation;