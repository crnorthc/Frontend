import React, { useState } from 'react'
import Candle from '../../tools/candle'
import Image from "next/image"
import Line from '../../tools/line'




const Chart = (props) => {
    const [line, setLine] = useState(false)
    const [duration, setDuration] = useState('D')
 
    return (
        <div className="w-full">
            <div onMouseEnter={() => props.setScroll(false)} onMouseLeave={() => props.setScroll(true)} className="w-full">
                {line ? <Line width={820} type={'hybrid'} data={props.data} /> : <Candle width={820} type={'hybrid'} data={props.data} />}    
            </div>        
            <div className="w-full pr-20 pl-9 flex flex-row items-end justify-between">
                <div className="flex flex-row">
                    <button onClick={() => setDuration('H')} className={'text-white mx-1 px-2 pb-1 border-b-2 ' + `${duration == 'H' ?  'border-light': 'border-dark'}`}>H</button>
                    <button onClick={() => setDuration('D')} className={'text-white mx-1 px-2 pb-1 border-b-2 ' + `${duration == 'D' ?  'border-light': 'border-dark'}`}>D</button>
                    <button onClick={() => setDuration('W')} className={'text-white mx-1 px-2 pb-1 border-b-2 ' + `${duration == 'W' ?  'border-light': 'border-dark'}`}>W</button>
                    <button onClick={() => setDuration('M')} className={'text-white mx-1 px-2 pb-1 border-b-2 ' + `${duration == 'M' ?  'border-light': 'border-dark'}`}>M</button>
                    <button onClick={() => setDuration('Y')} className={'text-white mx-1 px-2 pb-1 border-b-2 ' + `${duration == 'Y' ?  'border-light': 'border-dark'}`}>Y</button>
                    <button onClick={() => setDuration('All')} className={'text-white mx-1 px-2 pb-1 border-b-2 ' + `${duration == 'All' ?  'border-light': 'border-dark'}`}>All</button>
                </div>
                <div className="flex flex-row">
                    <button onClick={() => setLine(true)} className={"w-8 h-8 bg-black border flex flex-row items-center justify-center rounded-md mr-2 " + `${line ? "border-primary" : "border-lightHover"}`}>                    
                        <Image alt="" width={25} height={25} src='/line.svg' />
                    </button>
                    <button onClick={() => setLine(false)} className={"w-8 h-8 bg-black border flex flex-row items-center justify-center rounded-md " + `${line ? "border-lightHover" : "border-primary"}`}>
                        <Image alt="" width={25} height={25} src='/candles.svg' />
                    </button>
                </div>                
            </div>
        </div>        
    )
}

export default Chart