import React, { useEffect, useState } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";
import { SlideDown } from 'react-slidedown'

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { getHistory } from "../../store/actions/user";


const Stats = (props) => {

	Stats.propTypes = {
        getHistory: PropTypes.func.isRequired,
        history: PropTypes.object,
        user: PropTypes.object
    }

    useEffect(() => {
        if (props.history == null) {
            props.getHistory()
        }
    }, [])

    const toMoney = (amount) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const formatDate = (date) => {
        const year = date['year']
        const month = date['month']
        const day = date['day']

        return month + '/' + day + '/' + year
    }


    const get_lineup = (lineup) => {
        var lineup_rows = []
        for (const x in lineup) {
            lineup_rows.push(
                <div className="flex flex-row justify-between items-center pl-8 pt-2 rounded-md">
                    <div className="flex flex-row items-center">
                        <Image width={40} height={40} src={lineup[x].logo} />
                        <h1 className="text-light font-extralight pl-4 pr-2 text-xl">{lineup[x].name}</h1>
                        <h1 className="text-lightmedium font-extralight text-lg">{lineup[x].symbol}</h1>
                    </div>                    
                    <h1 className="text-light font-extralight text-xl">{toMoney(lineup[x].allocation.close)}</h1>
                </div>
            )
        }

        return lineup_rows
    }

    const get_full_game = () => {
        return (
            <div className="flex flex-col pr-20 pt-8 w-full">
                <h1 className="text-light font-light text-xl">Last Game</h1>
                <div className="border border-lightmedium rounded-md mt-6 px-4 py-2">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center">
                            <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">{props.recent_game.name}</h1>
                            <div className="mb-1"><Image width={15} height={15} src={props.recent_game.type == 'tiered' ? '/TierIcon.svg' : '/MultIcon.svg'} /></div>                                    
                        </div>                                        
                        <h1 className="text-light font-extralight text-xl">{formatDate(props.recent_game.start)} - {formatDate(props.recent_game.end)}</h1>
                    </div>
                    <div className="flex flex-row justify-between pl-6 items-center w-full">
                        <h1 className="text-light font-extralight text-xl">League</h1>
                        <h1 className="text-light font-extralight text-xl">{props.recent_game.league}</h1>
                    </div>
                    <div className="flex flex-row justify-between pl-6 items-center w-full">
                        <h1 className="text-light font-extralight text-xl">Length</h1>
                        <h1 className="text-light font-extralight text-xl">{props.recent_game.duration}</h1>
                    </div>
                    <div className="flex flex-row justify-between pl-6 items-center w-full">
                        <h1 className="text-light font-extralight text-xl">Split</h1>
                        <h1 className="text-light font-extralight text-xl">{props.recent_game.split}</h1>
                    </div>
                    <div className="flex flex-row justify-between pl-6 items-center w-full">
                        <h1 className="text-light font-extralight text-xl">Bet</h1>
                        <h1 className="text-light font-extralight text-xl">{props.recent_game.bet}{props.recent_game.type == 'tiered' ? '+' : ''}</h1>
                    </div>
                    <div className="flex flex-row items-center py-2 justify-center">
                        <div className="px-12 border-b border-lightmedium"/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Results</h1>       
                        <h1 className="text-light font-extralight text-xl"># {props.recent_player.ranking} ({toMoney(props.recent_player.score)})</h1>                                                                           
                    </div>
                    <div className="flex flex-row justify-between pl-6 items-center w-full">
                        <h1 className="text-light font-extralight text-xl">Bet</h1>
                        <h1 className="text-light font-extralight text-xl">{toMoney(props.recent_player.bet)}</h1>
                    </div>
                    <div className="flex flex-row justify-between pl-6 items-center w-full">
                        <h1 className="text-light font-extralight text-xl">Prize</h1>
                        <h1 className="text-light font-extralight text-xl">{toMoney(props.recent_player.won)}</h1>
                    </div>
                    <div className="flex flex-row items-center py-2 justify-center">
                        <div className="px-12 border-b border-lightmedium"/>
                    </div> 
                    <div className="flex flex-row justify-between">
                        <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Lineup</h1>                                                                                  
                    </div>
                    {get_recent_lineup()}                                                                       
                </div>
            </div>
        )
    }

    const get_history = () => {
        var games = []

        for (const x in props.history) {
            games.push(
                <div className="flex flex-col px-4 py-2 bg-lightHover">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center">
                            <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">{props.history[x].game.name}</h1>
                            <div className="mb-1"><Image width={15} height={15} src={props.history[x].game.type == 'tiered' ? '/TierIcon.svg' : '/MultIcon.svg'} /></div>                                    
                        </div>
                        <h1 className="text-light font-extralight text-xl"># {props.history[x].player.ranking}</h1>  
                    </div>
                    <div className="flex flex-row justify-between">
                        <h1 className="text-light font-extralight text-xl">{formatDate(props.history[x].game.start)} - {formatDate(props.history[x].game.end)}</h1>
                        <h1 className="text-light font-extralight text-xl">{toMoney(props.history[x].player.score)}</h1>   
                    </div>
                </div>
            )
        }

        return games
    }

    if (props.history == null) {
        return <Loader
            type="Circles"
            color="#00C2EF"
            height={50}
            width={50}
        />
    }

	return (
        <div className="flex flex-col">
            <div className="flex pt-8 flex-row">
                <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">History</h1> 
            </div>   
            <div className="flex flex-col mt-6 border min-h-md overflow-auto border-lightmedium rounded-md py-4">
                {get_history()}
            </div>  
        </div>                  
	)
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    history: state.user.history
})

export default connect(mapStateToProps, { getHistory })(Stats)
