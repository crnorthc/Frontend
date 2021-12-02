import React, { useState, useEffect } from "react"



const Timer = (props) => {


    return (
        <div className="realtive flex flex-row justify-center items-center w-6 h-6 mr-px">
            <div className="shrinking-circle relative z-10 flex flex-row justify-center items-center w-5 h-5 text-light rounded-full bg-red"/>
            <div className="absolute text-lightHue z-20 top-2 right-4 -mr-px">
                &#x2715;
            </div>
        </div>        
    )
    
}


export default Timer
