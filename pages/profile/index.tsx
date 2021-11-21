import type { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";
import Overview from '../../components/ProfileComponents/Overview'
import Wallet from '../../components/ProfileComponents/Wallet'

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import Router from "next/router"
import { getMyGames } from "../../store/actions/game"
import { getStats } from "../../store/actions/user";


const Profile: NextPage = (props: any) => {
    const [tab, setTab] = useState('overview')

	Profile.propTypes = {
        getMyGames: PropTypes.func.isRequired,
        getStats: PropTypes.func.isRequired,
        best: PropTypes.object,
        worst: PropTypes.object,
        mygames: PropTypes.array,
        user: PropTypes.object
    }

    const TIERS = ['ghost', 'bronze', 'silver', 'gold', 'diamond']

    useEffect(() => {
        if (props.games == null) {
            props.getMyGames()
        }
    }, [])

    useEffect(() => {
        if (props.wallet == null) {
            props.getStats()
        }
    }, [])

    const toMoney = (amount: number) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const formatDate = (date: object, text=false) => {
        const year = date['year']
        const month = date['month']
        const day = date['day']
        const hour = date['hours']
        const min = date['minutes']

        if (text) {
            return month + '/' + day + '/' + year
        }

        return (
            <div className="col-span-1">
                <p className="text-light text-xl">{month + '/' + day + '/' + year}</p>
                <p className="text-light text-xl">{hour + ':' + min + ' AM'}</p>
            </div>
        )
    }

    const getGames = () => {
        var games = []
        for (const game in props.mygames) {
            const code = props.mygames[game]['code']
            const name = props.mygames[game]['name']
            const type = props.mygames[game]['type']
            const league = props.mygames[game]['league']
            const duration = props.mygames[game]['duration']
            const start = props.mygames[game]['start']
            const split = props.mygames[game]['split']
            const players = props.mygames[game]['players']
            const bet = props.mygames[game]['bet']

            games.push(
                <button onClick={() => Router.push('/games/' + code)} className='text-left pl-8 flex flex-row items-center bg-dark border-t-4 border-medium hover:bg-medium rounded-b-xl'>
                    {type == 'tiered' ? 
                        <Image width={20} height={20} src="/TierIcon.svg" alt="" />
                        :
                        <Image width={30} height={30} src="/MultIcon.svg" alt="" />
                    }
                    <div className={"grid grid-cols-7 py-2 items-center pl-8 gap-4 w-full " + `${type == 'multiplier' ? '-ml-2' : ''}`}>
                        <div className="col-span-1">
                            <p className="text-light text-xl">{name}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-light text-xl">{league}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-light text-xl">{duration}</p>
                        </div>
                        {formatDate(start)}
                        <div className="col-span-1">
                            <p className="text-light text-xl">{split}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-light text-xl">{players}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-light text-xl">${bet}{type == 'tiered' ? "+" : ''}</p>
                        </div>
                    </div>                                     
                </button>                
            )
        }

        for (let i = 0; i < (6 - Object.keys(props.mygames).length); i++) {
            games.push(
                <div className="pb-md bg-dark rounded-b-xl border-t-4 border-medium">
                
                </div>
            )
        }

        return games
    }

    if (props.best == null || props.worst == null) {
        return <Loader
            type="Circles"
            color="#00C2EF"
            height={50}
            width={50}
        />
    }

    const history = () => {
        return (
            <div className="flex mt-20 flex-col w-full bg-dark border-2 border-primary rounded-xl">
                <div className="grid grid-cols-7 py-4 pl-20 gap-4 bg-dark rounded-t-xl w-full">
                    <div className="col-span-1">
                        <h1 className="text-primary text-xl">Name</h1>
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-primary text-xl">League</h1>
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-primary text-xl">Duration</h1>
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-primary text-xl">Start</h1>
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-primary text-xl">Split</h1>
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-primary text-xl">Players</h1>
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-primary text-xl">Bet</h1>
                    </div>
                </div>
                {props.mygames == null ?
                    <Loader
                        type="Circles"
                        color="#00C2EF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                    />
                    :
                    getGames()
                }
            </div>
        )
    }

    const get_lineup = (lineup: any) => {
        var lineup_rows = []
        for (const x in lineup) {
            lineup_rows.push(
                <div className="flex flex-row justify-between items-center pl-8 pt-2 rounded-md">
                    <div className="flex flex-row items-center">
                        <Image width={25} height={25} src={lineup[x].logo} />
                        <h1 className="text-light font-extralight pl-4 pr-2 text-xl">{lineup[x].name}</h1>
                        <h1 className="text-lightmedium font-extralight text-lg">{lineup[x].symbol}</h1>
                    </div>                    
                    <h1 className="text-light font-extralight text-xl">{toMoney(lineup[x].allocation.close)}</h1>
                </div>
            )
        }

        return lineup_rows
    }

	return (
		<div className='pageCont'>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='bg-medium flex flex-row justify-center items-start'>
                <div className="flex flex-col mt-20 justify-start w-2/5 bg-lightHover items-center rounded-md py-2 px-2">
                    <div className="w-3/4 rounded-full border-4 border-primary">
                        <Image width={100} height={100} layout='responsive' src='/profile.png'/> 
                    </div>                    
                    <div className="flex flex-col justify-between py-4 items-center">
                        <h1 className="text-light text-2xl">{props.user.first_name + ' ' + props.user.last_name}</h1>
                        <h1 className="text-lightmedium text-xl">@{props.user.username}</h1>
                    </div>     
                    <button className="w-full rounded-md bg-secondary py-2 text-lg text-light hover:bg-secondaryLight">Edit Profile</button>              
                </div>                
                <div className="flex mt-20 ml-8 flex-col mb-20 w-full">
                    <div className="flex flex-row w-full pr-40 justify-between border-b-2 border-lightHover items-center">
                        <button onClick={() => setTab('overview')} className={"text-lg text-primary px-2 pb-4 border-primary mb-px border-" + `${tab == 'overview' ? 'b-2 -mb-px' : ''}`}>Overview</button>
                        <button onClick={() => setTab('wallet')} className={"text-lg text-primary px-2 pb-4 border-primary mb-px border-" + `${tab == 'wallet' ? 'b-2 -mb-px' : ''}`}>Wallet</button>
                        <button onClick={() => setTab('stats')} className={"text-lg text-primary px-2 pb-4 border-primary mb-px border-" + `${tab == 'stats' ? 'b-2 -mb-px' : ''}`}>Stats</button> 
                        <button onClick={() => setTab('history')} className={"text-lg text-primary px-2 pb-4 border-primary mb-px border-" + `${tab == 'history' ? 'b-2 -mb-px' : ''}`}>History</button>                                                                       
                    </div>
                    {props.worst == null || props.best == null ? 
                        <div className="flex flex-row justify-center pr-20 pt-8 w-full">
                            <Loader
                                type="Circles"
                                color="#00C2EF"
                                height={100}
                                width={100}
                                timeout={80000} //3 secs
                            />
                        </div>                            
                        :
                        <div className="flex flex-col pr-20 pt-8 w-full">
                            <h1 className="text-light font-light text-xl">Best Game</h1>
                            <div className="border border-lightmedium rounded-md mt-6 px-4 py-2">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row items-center">
                                        <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">{props.best.game.name}</h1>
                                        <div className="mb-1"><Image width={15} height={15} src={props.best.game.type == 'tiered' ? '/TierIcon.svg' : '/MultIcon.svg'} /></div>                                    
                                    </div>                                        
                                    <h1 className="text-light font-extralight text-xl">{formatDate(props.best.game.start, true)} - {formatDate(props.best.game.end, true)}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">League</h1>
                                    <h1 className="text-light font-extralight text-xl">{props.best.game.league}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Length</h1>
                                    <h1 className="text-light font-extralight text-xl">{props.best.game.duration}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Split</h1>
                                    <h1 className="text-light font-extralight text-xl">{props.best.game.split}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Bet</h1>
                                    <h1 className="text-light font-extralight text-xl">{props.best.game.bet}{props.best.game.type == 'tiered' ? '+' : ''}</h1>
                                </div>
                                <div className="flex flex-row items-center py-2 justify-center">
                                    <div className="px-12 border-b border-lightmedium"/>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Results</h1>       
                                    <h1 className="text-light font-extralight text-xl"># {props.best.player.ranking} ({toMoney(props.best.player.score)})</h1>                                                                           
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Bet</h1>
                                    <h1 className="text-light font-extralight text-xl">{toMoney(props.best.player.bet)}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Prize</h1>
                                    <h1 className="text-light font-extralight text-xl">{toMoney(props.best.player.won)}</h1>
                                </div>
                                <div className="flex flex-row items-center py-2 justify-center">
                                    <div className="px-12 border-b border-lightmedium"/>
                                </div> 
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Lineup</h1>                                                                                  
                                </div>                        
                                {get_lineup(props.best.player.lineup)}                                       
                            </div>                            
                            <h1 className="text-light mt-6 font-light text-xl">Worst Game</h1>
                            <div className="border border-lightmedium rounded-md mt-6 px-4 py-2">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row items-center">
                                        <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">{props.worst.game.name}</h1>
                                        <div className="mb-1"><Image width={15} height={15} src={props.worst.game.type == 'tiered' ? '/TierIcon.svg' : '/MultIcon.svg'} /></div>                                    
                                    </div>                                        
                                    <h1 className="text-light font-extralight text-xl">{formatDate(props.worst.game.start, true)} - {formatDate(props.worst.game.end, true)}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">League</h1>
                                    <h1 className="text-light font-extralight text-xl">{props.worst.game.league}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Length</h1>
                                    <h1 className="text-light font-extralight text-xl">{props.worst.game.duration}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Split</h1>
                                    <h1 className="text-light font-extralight text-xl">{props.worst.game.split}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Bet</h1>
                                    <h1 className="text-light font-extralight text-xl">{props.worst.game.bet}{props.worst.game.type == 'tiered' ? '+' : ''}</h1>
                                </div>
                                <div className="flex flex-row items-center py-2 justify-center">
                                    <div className="px-12 border-b border-lightmedium"/>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Results</h1>       
                                    <h1 className="text-light font-extralight text-xl"># {props.worst.player.ranking} ({toMoney(props.worst.player.score)})</h1>                                                                           
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Bet</h1>
                                    <h1 className="text-light font-extralight text-xl">{toMoney(props.worst.player.bet)}</h1>
                                </div>
                                <div className="flex flex-row justify-between pl-6 items-center w-full">
                                    <h1 className="text-light font-extralight text-xl">Prize</h1>
                                    <h1 className="text-light font-extralight text-xl">{toMoney(props.worst.player.won)}</h1>
                                </div>
                                <div className="flex flex-row items-center py-2 justify-center">
                                    <div className="px-12 border-b border-lightmedium"/>
                                </div> 
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Lineup</h1>                                                                                  
                                </div>                        
                                {get_lineup(props.worst.player.lineup)}                                       
                            </div>                            
                        </div>
                        
                    }                                                   
                </div>
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	mygames: state.game.mygames,
    user: state.user.user,
    best: state.user.best,
    worst: state.user.worst
})

export default connect(mapStateToProps, { getMyGames, getStats })(Profile)
