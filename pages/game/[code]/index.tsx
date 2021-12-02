import type { NextPage } from "next"
import Image from "next/image"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Loader from "react-loader-spinner";
import InGameInfo from '../../../components/GameComponents/InGameInfo'
import Players from '../../../components/GameComponents/Players'
import LeaderLine from "../../../components/GameComponents/LeaderboardChart";
import LineupLine from '../../../components/GameComponents/LineupChart'
import Stats from '../../../components/GameComponents/Stats'


// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { useRouter } from "next/router"
import { getGame, comparePlayer, compareLineup } from "../../../store/actions/game"
import { notify } from '../../../store/actions/notify'

const Game: NextPage = (props: any) => { 
    const [viewPlayer, setViewPlayer]: any = useState([])
    const [viewedPlayers, setViewedPlayers] = useState([])
    const [viewLineup, setViewLineup]: any = useState([])
    const [viewedLineups, setViewedLineups] = useState([])
    const [showPlayers, setPlayers] = useState(true)
    const [lineup, setLineup] = useState(false)
    const [scroll, setScroll] = useState(true)
    const router = useRouter();

	Game.propTypes = {
        getGame: PropTypes.func.isRequired,
        notify: PropTypes.func.isRequired,
        getBet: PropTypes.func.isRequired,
        player: PropTypes.object,
        game: PropTypes.object,
        user: PropTypes.object,
        games: PropTypes.array,
        compared: PropTypes.array
    }

    useEffect(() => {
        if (!router.isReady) return
        const code: any = router.query.code

        if (props.game == null || props.game.code != code) {            
            props.getGame(code)
        }
    }, [router.isReady])

    useEffect(() => {
        var next: any = document.getElementById('__next')
        if (scroll) {
            next.style.overflow = 'auto'
        }
        else {
            next.style.overflow = 'hidden'
        }
    }, [scroll])

    if (props.player != null && !(viewPlayer.includes(props.user.username))) {
        setViewedPlayers(props.player.portfolio)
        setViewedLineups(props.player.portfolio)
        setViewPlayer([props.user.username])
        setViewLineup(['overall'])
    }

    const getRank = () => {
        for (const rank in props.game.players_list) {
            if (props.game.players_list[rank].player == props.user.username) {
                return Number(rank) + 1
            }
        }
    }

    const handleViewPlayer = (username: string) => {
        if (!(viewPlayer.includes(username))) {
            if (!(username in viewedPlayers[0])) {                
                comparePlayer(username, props.game.code, viewedPlayers).then((new_viewed: any) => {
                    setViewedPlayers(new_viewed)
                })                
            }
            const temp: any = [...viewPlayer, username]
            setViewPlayer(temp)
        }
        else {
            setViewPlayer(viewPlayer.filter((e: any) => e !== username))
        }     
    }

    const handleViewLineup = (ticker: string, amount: Number) => {
        ticker = ticker.replace('X:', '').replace('USD', '')
        if (ticker == 'overall') {
            if (viewLineup.length == 1 && viewLineup[0] == 'overall') return
            if (!(viewLineup.includes(ticker))) {
                const temp: any = [...viewLineup, 'overall']
                setViewLineup(temp)
            }
            else {
                setViewLineup(viewLineup.filter((e: any) => e !== 'overall'))
            }   
            return  
        }

        if (!(viewLineup.includes(ticker))) {
            if (!(ticker in viewedLineups[0])) {                
                compareLineup(ticker, 'D', viewedLineups, amount).then((new_viewed: any) => {
                    setViewedLineups(new_viewed)
                })                
            }
            const temp: any = [...viewLineup, ticker]
            setViewLineup(temp)
        }
        else {
            if (viewLineup.length == 1) {
                const temp: any = ['overall']
                setViewLineup(temp)
            }
            else { 
                setViewLineup(viewLineup.filter((e: any) => e !== ticker))
            }            
        }     
    }
    
    if (props.game == null) {
        return (
            <div className='pageCont'>
                <Head>
                    <title>Admin</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className='bg-medium flex flex-col pt-40 items-center h-full'>
                    <Loader
                        type="Circles"
                        color="#00C2EF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                        />
                </main>
            </div>
        )
    }
	return (
		<div className='pageCont'>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='bg-medium text-center h-full pb-20'>
                <h1 className="text-5xl text-primary glory font-bold mb-8">{props.game.name}</h1>
                <div className="flex flex-col justify-between items-start w-full overflow-y-hidden">
                    <div className="flex flex-row justify-between w-full">
                        <div className='w-8/12 bg-dark shadow-xl rounded-lg pt-4 pr-24'>
                            {!showPlayers ? <LineupLine setScroll={setScroll} width={820} type={'hybrid'} view={viewLineup} data={viewedLineups}/> : <LeaderLine setScroll={setScroll} width={820} type={'hybrid'} view={viewPlayer} data={viewedPlayers}/>}
                            <div className="flex flex-row justify-end items-center w-full pb-2">
                                <button onClick={() => setPlayers(true)} className={"flex flex-col justify-center items-center p-1 " + `${showPlayers ? 'border-b-2 border-primary' : ''}`}>
                                    <Image width={30} height={30} src='/MultiView.svg' />
                                </button>
                                <button onClick={() => setPlayers(false)} className={"flex flex-col justify-center items-center p-1 ml-5 " + `${!showPlayers ? 'border-b-2 border-secondary' : ''}`} >
                                    <Image width={30} height={30} src='/LineupView.svg' />
                                </button>
                            </div> 
                        </div>

                        <div className="flex ml-4 flex-col w-2/5 text-left">
                            <div className="flex flex-row w-full justify-between pb-2 px-2">                                
                                <h1 className="text-4xl glory text-light">{props.user.username}</h1> 
                                <div className="flex flex-row items-end">
                                    <h1 className="text-2xl glory text-primary2">#</h1>
                                    <h1 className="text-4xl glory text-primary2">{getRank()}</h1> 
                                </div>
                            </div>                            
                            <InGameInfo game={props.game} join={props.join} viewing={viewLineup} view={handleViewLineup}  />                        
                        </div>                
                    </div>                    
                    <div className="flex flex-row w-full mt-8 justify-between">   
                        <Stats />                     
                        <div className="flex flex-col w-9/12">                            
                            {'players_list' in props.game ? 
                                <Players players={props.game.players_list} game={props.game} viewing={viewPlayer} view={handleViewPlayer}/> 
                                : 
                                null
                            }                                                    
                        </div>                                                
                    </div>                                       
                </div>                                                                                           
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    player: state.game.player,
	games: state.game.games,
    game: state.game.game
})

export default connect(mapStateToProps, { getGame, notify })(Game)
