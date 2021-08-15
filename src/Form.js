import React from "react";
import './form.css';

const Form = ({inputchange, buttonClick}) => {
    return(
        <div>
            <p className='f3 center'>Enter the link to the image here.</p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-75 br3 center' type='search' placeholder='.......' onChange={inputchange}/>
                    <button className='w-25 br3 grow f4 link ph3 pv2 dib white bg-black' onClick={buttonClick}>Enter</button>
                </div>
            </div>
        </div>
    );
}

export default Form;