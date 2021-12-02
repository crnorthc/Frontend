import React, { useState } from 'react'
import Line from '../tools/dashLine'




const Chart = (props) => {
    const [line, setLine] = useState(false)
    const [duration, setDuration] = useState('D')
 
    return (
        <div className="w-full relative">
            <Line type={'hybrid'} width={820} data={props.data} />           
        </div>        
    )
}

export default Chart