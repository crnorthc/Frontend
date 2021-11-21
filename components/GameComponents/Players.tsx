import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";


const Players = (props: any) => {

    const toMoney = (amount: any) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const get_lineup = () => {
        const players = props.players
        var temp = []
        for (const x in players) {
            temp.push(
                <div className="flex flex-row py-4 pl-8 pr-4 justify-between items-center">
                    <div className="flex flex-row items-center">                    
                        <h1 className='text-xl pl-4 pr-2 pb-0 pr-2 text-light'>{'#' + (Number(x) + 1) + ' ' + players[x].player}</h1>
                    </div>  
                    <div className="flex flex-row items-center">
                        <h1 className='text-xl text-light'>{toMoney(players[x].worth)}</h1>
                        <button onClick={() => props.view(players[x].player)} className="flex flex-row justify-center items-center pl-4">
                            {props.viewing.includes(players[x].player) ? <Image alt='' height={25} width={25} src='/OpenEye.svg'/> : <Image alt='' height={25} width={25} src='/ClosedEye.svg'/>}
                        </button>
                    </div>                                    
                </div>
            )
        }
        return temp
    }

	return (
		<div className="w-full mr-8"> 
			<main className='bg-medium flex flex-col items-center w-full'>
                <div className="flex flex-col items-center justify-center w-full">
                    {props.players == null ?
                        <Loader
                            type="Circles"
                            color="#00C2EF"
                            height={50}
                            width={50}
                        />
                        :
                        <div className="flex flex-col w-full border-b-2 border-r-2 border-l-2 border-primary max-h-lg overflow-y-auto rounded-b-xl">
                            {get_lineup()}
                        </div>    
                    }                                                                             
                </div>
			</main>
		</div>
	)
}

export default Players
