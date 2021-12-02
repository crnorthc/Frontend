import React, { useState, useEffect } from "react"
import Image from "next/image"



const Dots = (props) => {


    var width = props.width
    if (props.width == undefined) width = 'w-4'
    var height = props.height
    if (props.heigh == undefined) height = 'h-4'
    var color = props.color
    if (props.color == undefined) color = 'bg-secondary'

    return (
        <div className="flex flex-row">
            <div className={"dot-1 rounded-full " + width + ' ' + height + ' ' + color} />
            <div className={"dot-2 rounded-full mx-1 " + width + ' ' + height + ' ' + color} />
            <div className={"dot-3 rounded-full " + width + ' ' + height + ' ' + color} />
        </div>
    )
    
}


export default Dots
