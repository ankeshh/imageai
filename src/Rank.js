import React from "react";

const Rank = ({name,count}) => {
    return(
        <div>
            <div className='white f3 center'>
                {`Hello ${name}!! Your total search count is ${count}`}
            </div>
        </div>
    );
}

export default Rank;