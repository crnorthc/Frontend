import type { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import Router from "next/router"
import { getGames } from "../../store/actions/game"


const Games: NextPage = (props: any) => {
	const [sortBet, setSortBet] = useState(false)
    const [betSelected, setBetSelected] = useState(false)
    const [sortPlayers, setSortPlayers] = useState(false)
    const [typeFilter, setTypeFilter] = useState(['tiered', 'multiplier'])
    const [leagueFilter, setLeagueFilter] = useState(['Stocks', 'Crypto', 'Combo'])
    const [durationFilter, setDurationFilter] = useState(['Hour', 'Day', 'Week', 'Quarter'])
    const [games, setGames]: any = useState(null)

	Games.propTypes = {
        getGames: PropTypes.func.isRequired,
        games: PropTypes.array
    }

    useEffect(() => {
        if (props.games == null) {
            props.getGames()
        }
    }, [])

    useEffect(() => {
        if (games == null && props.games != null) {
            var temp = []
            for (const game in props.games) {
                temp.push(props.games[game])
            }
            setGames(temp)
            return
        }
        if (games !== null) {
            if (betSelected) {
                if (sortBet) {
                    const temp = games.sort((a: any, b: any) => parseFloat(a['bet']) - parseFloat(b['bet']))
                    setGames(temp)
                }
                else {
                    const temp = games.sort((a: any, b: any) => parseFloat(b['bet']) - parseFloat(a['bet']))
                    setGames(temp)
                }
            } 
            else {
                if (sortPlayers) {
                    const temp = games.sort((a: any, b: any) => parseFloat(a['players']) - parseFloat(b['players']))
                    setGames(temp)
                }
                else {
                    const temp = games.sort((a: any, b: any) => parseFloat(b['players']) - parseFloat(a['players']))
                    setGames(temp)
                }
            }  
        }         
    }, [sortBet, sortPlayers])

    useEffect(() => {
        if (games != null) {
            var temp = []
            for (const game in props.games) {
                temp.push(props.games[game])
            }

            temp = temp.filter((e: any) => typeFilter.includes(e['type']))
            temp = temp.filter((e: any) => leagueFilter.includes(e['league']))
            setGames(temp.filter((e: any) => durationFilter.includes(e['duration'])))
        }        
    }, [typeFilter.length, leagueFilter, durationFilter])

    const formatDate = (date: object) => {
        const year = date['year']
        const month = date['month']
        const day = date['day']
        const hour = date['hours']
        const min = date['minutes']

        return (
            <div className="col-span-1">
                <p className="text-light text-xl">{month + '/' + day + '/' + year}</p>
                <p className="text-light text-xl">{hour + ':' + min + ' AM'}</p>
            </div>
        )
    }

    const getGames = () => {
        var gamesTemp = []
        for (const game in games) {
            const code = games[game]['code']
            const name = games[game]['name']
            const type = games[game]['type']
            const league = games[game]['league']
            const duration = games[game]['duration']
            const start = games[game]['start']
            const split = games[game]['split']
            const players = games[game]['players']
            const bet = games[game]['bet']

            gamesTemp.push(
                <button onClick={() => Router.push('/games/' + code)} className='text-left pl-8 flex flex-row items-center bg-dark border-t-4 border-medium hover:bg-medium rounded-b-xl'>
                    {type == 'tiered' ? 
                        <Image width={20} height={20} src="/TierIcon.svg" alt="" />
                        :
                        <Image width={30} height={30} src="/MultIcon.svg" alt="" />
                    }
                    <div className={"grid grid-cols-7 py-2 items-center pl-8 gap-4 w-full " + `${type == 'multiplier' ? '-ml-2' : ''}`}>
                        <div className="col-span-1 overflow-ellipsis">
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
                        <div className="col-span-1 text-center mr-12">
                            <p className="text-light text-xl">{players}</p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-light text-xl">${bet}{type == 'tiered' ? "+" : ''}</p>
                        </div>
                    </div>                                     
                </button>                
            )
        }

        for (let i = 0; i < (6 - Object.keys(props.games).length); i++) {
            gamesTemp.push(
                <div className="pb-md bg-dark rounded-b-xl border-t-4 border-medium">
                
                </div>
            )
        }

        return gamesTemp
    }

    const handleSort = (isBet: boolean) => {
        if (isBet) {
            setBetSelected(true)
            setSortBet(!sortBet)
        }
        else {
            setBetSelected(false)
            setSortPlayers(!sortPlayers)
        }
    }

    const handleType = (type: string) => {
        if (typeFilter.includes(type)) {
            if (typeFilter.length == 1) {
                setTypeFilter(['tiered'])
            }
            else {
                setTypeFilter(typeFilter.filter((e: any) => e !== type))
            }            
        }
        else {
            const temp = [...typeFilter, type]
            setTypeFilter(temp)
        }
    }

    const handleLeague = (type: string) => {        
        if (leagueFilter.includes(type)) {
            if (leagueFilter.length == 1) {
                setLeagueFilter(['stocks'])
            }
            else {
                setLeagueFilter(leagueFilter.filter((e: any) => e !== type))
            }            
        }
        else {
            const temp = [...leagueFilter, type]
            setLeagueFilter(temp)
        }
    }

    const handleDuration = (type: string) => {
        if (durationFilter.includes(type)) {
            if (durationFilter.length == 1) {
                setDurationFilter(['day'])
            }
            else {
                setDurationFilter(durationFilter.filter((e: any) => e !== type))
            }            
        }
        else {
            const temp = [...durationFilter, type]
            setDurationFilter(temp)
        }
    }

	return (
		<div className='pageCont'>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='bg-medium flex flex-row justify-center items-start'>
                <div className="flex flex-col px-4 mt-20 w-1/3 mr-2 bg-dark border-2-primary rounded-xl">
                    <h1 className="text-primary pt-2 text-3xl glory">Filter</h1> 
                    <div className="flex pt-4 flex-row justify-between w-full items-center">
                        <h1 className="text-light text-xl">Type</h1>                     
                        <div className="flex flex-row justify-between mx-2 w-1/2 items-center"> 
                            <button onClick={() => handleType('tiered')} className={"flex flex-row justify-center items-center py-1 h-8 w-12 text-light rounded-xl border-2 hover:bg-primaryHue3 border-primaryHue " + `${typeFilter.includes("tiered") ? 'bg-primaryHue2' : ''}`}><Image width={20} height={20} src="/TierIcon.svg" alt="" /></button>
                            <button onClick={() => handleType('multiplier')} className={"flex flex-row justify-center items-center py-1 h-8 w-12 text-light rounded-xl border-2 hover:bg-primaryHue3 border-primaryHue " + `${typeFilter.includes("multiplier") ? 'bg-primaryHue2' : ''}`}><Image width={30} height={30} src="/MultIcon.svg" alt="" /></button>                   
                        </div> 
                    </div>           
                    <div className="flex w-full pt-8 flex-row justify-between items-center">         
                        <h1 className="text-light pt-2 text-xl">League</h1>  
                        <div className="flex flex-col items-center">
                            <div className="flex pt-2 flex-row justify-around w-full">
                                <button onClick={() => handleLeague("Stocks")} className={"px-2 mr-2 text-light rounded-xl border-2 hover:bg-secondaryHue3 border-secondaryHue " + `${leagueFilter.includes("Stocks") ? 'bg-secondaryHue2' : ''}`}>Stocks</button>
                                <button onClick={() => handleLeague("Crypto")} className={"px-2 mr-2 text-light rounded-xl border-2 hover:bg-secondaryHue3 border-secondaryHue " + `${leagueFilter.includes("Crypto") ? 'bg-secondaryHue2' : ''}`}>Crypto</button>                                                    
                            </div>
                            <button onClick={() => handleLeague("Combo")} className={"px-2 mt-2 text-light rounded-xl border-2 hover:bg-secondaryHue3 border-secondaryHue " + `${leagueFilter.includes('Combo') ? 'bg-secondaryHue2' : ''}`}>Combo</button>
                        </div>                       
                    </div>
                    <div className="flex w-full pt-4 pb-8 flex-row justify-between items-center">
                        <h1 className="text-light pt-4 text-xl">Duration</h1>  
                        <div className="flex pt-2 flex-col ">
                            <div className="flex pt-2 ml-2 pr-2 flex-row justify-between w-full">
                                <button onClick={() => handleDuration("Hour")} className={"px-2 mr-2 text-light rounded-xl hover:bg-lightHue3 border-2 border-lightHue2 " + `${durationFilter.includes("Hour") ? 'bg-lightHue2' : ''}`}>Hour</button>
                                <button onClick={() => handleDuration("Day")} className={"px-2 mr-2 text-light rounded-xl hover:bg-lightHue3 border-2 border-lightHue2 " + `${durationFilter.includes("Day") ? 'bg-lightHue2' : ''}`}>Day</button>                                                    
                            </div>
                            <div className="flex pt-2 ml-2 pr-2 flex-row justify-between w-full">
                                <button onClick={() => handleDuration("Week")} className={"px-2 mr-2 text-light rounded-xl hover:bg-lightHue3 border-2 border-lightHue2 " + `${durationFilter.includes("Week") ? 'bg-lightHue2' : ''}`}>Week</button>
                                <button onClick={() => handleDuration("Quarter")} className={"px-2 mr-2 text-light rounded-xl hover:bg-lightHue3 border-2 border-lightHue2 " + `${durationFilter.includes("Quarter") ? 'bg-lightHue2' : ''}`}>Quarter</button>                                                    
                            </div>                   
                        </div>
                    </div>
                </div>
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
                            <div className="flex flex-row items-center">
                                <h1 className="text-primary pr-1 text-xl">Players</h1>
                                <button onClick={() => handleSort(false)} className={betSelected ? 'opacity-60' : ''}>
                                    {sortPlayers ?
                                        <Image width={15} height={15} src="/navUp.svg" />
                                        :
                                        <Image width={15} height={15} src="/navDown.svg" />                                        
                                    }                                    
                                </button>                                
                            </div>                            
                        </div>
                        <div className="col-span-1">
                        <div className="flex flex-row items-center">
                                <h1 className="text-primary pr-1 text-xl">Bet</h1>
                                <button onClick={() => handleSort(true)} className={!betSelected ? 'opacity-60' : ''}>
                                    {sortBet ?
                                        <Image width={15} height={15} src="/navUp.svg" />
                                        :
                                        <Image width={15} height={15} src="/navDown.svg" />                                        
                                    }                                    
                                </button>          
                            </div>
                        </div>
                    </div>
                    {games == null ?
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
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	games: state.game.games
})

export default connect(mapStateToProps, { getGames })(Games)
