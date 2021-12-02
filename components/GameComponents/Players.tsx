import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";


const Players = (props: any) => {

    const toMoney = (amount: any) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const percentChange = (worth: any) => {
        var change = worth - 100000
        var symbol = '+'
        if (change < 0) {
            change = 100000 - worth
            symbol = '-'
        }
        
        return symbol + toMoney(change.toFixed(2)) + ' (' + ((change / 100000) * 100).toFixed(1) + '%)'
    }

    const SPLITS = {
        'Top Player': 1,
        'Top 3 Players': 3,
        'Top 5 Players': 5,
        'Top 10 Players': 10
    }

    const isWinner = (rank: Number) => {
        if (props.game.type == 'tiered') {
            return rank <= SPLITS[props.game.split]
        }
        else {
            if (props.game.split == 'Top 40%') {
                var split = props.game.players * .4
            }
            else {
                split = props.game.players * .1
            }
            if (split == 0) split = 1
            return rank <= split
        }
    }

    const get_lineup = () => {
        const players = props.players
        var temp = []
        for (const x in players) {
            temp.push(
                <div className={"flex flex-row py-4 pl-8 pr-4 rounded-lg mx-2 mb-2 justify-between items-center shadow-xl " + `${isWinner(Number(x) + 1) ? 'bg-primaryHue3' : 'bg-dark4'}`}>
                    <div className="flex flex-row items-center">                            
                        <h1 className='text-xl pl-4 pr-2 pb-0 pr-2 text-primary2'>{'#' + (Number(x) + 1)}</h1>                
                        <h1 className='text-xl pl-4 pr-2 pb-0 pr-2 text-light'>{players[x].player}</h1>
                    </div>  
                    <div className="flex flex-row items-center">
                        <div className="flex flex-col items-end pr-8">
                            <h1 className={'text-xl ' + `${players[x].worth >= 100000 ? 'text-green' : 'text-red2'}`}>{toMoney(players[x].worth)}</h1>
                            <h1 className={'text-md ' + `${players[x].worth >= 100000 ? 'text-green' : 'text-red2'}`}>{percentChange(players[x].worth)}</h1>
                        </div>                        
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
			<main className='bg-dark shadow-xl rounded-lg flex flex-col items-center w-full'>
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex flex-col w-full items-start">
                        <h1 className="text-3xl text-primary2 glory font-bold ml-4 mt-4">Leaderboard</h1>
                        <div className="w-36 ml-5 mt-2 mb-4 border border-primary"/> 
                    </div>                                       
                    {props.players == null ?
                        <Loader
                            type="Circles"
                            color="#00C2EF"
                            height={50}
                            width={50}
                        />
                        :
                        <div className="flex flex-col w-full min-h-sm max-h-lg overflow-y-auto">
                            {get_lineup()}
                        </div>    
                    }                                                                             
                </div>
			</main>
		</div>
	)
}

export default Players
