import type { NextPage } from "next"
import Image from "next/image"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Loader from "react-loader-spinner";
import GameInfo from '../../../components/GameComponents/GameInfo'
import Players from '../../../components/GameComponents/Players'
import LeaderLine from "../../../components/GameComponents/LeaderboardChart";
import Line from '../../../tools/liny'
import IngameLineup from '../../../components/GameComponents/InGameLineup'


// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { useRouter } from "next/router"
import { getGame, compare } from "../../../store/actions/game"
import { notify } from '../../../store/actions/notify'
import Path from "../../../components/path";


const TIERS = {
    'diamond': '/tiers/diamond.png',
    'gold': '/tiers/gold.png',
    'silver': '/tiers/silver.png',
    'bronze': '/tiers/bronze.png',
    'ghost': '/tiers/chicken.png',
}


const Game: NextPage = (props: any) => { 
    const [view, setView]: any = useState([])
    const [viewed, setViewed] = useState([])
    const [showCompare, setCompare] = useState(false)
    const [lineup, setLineup] = useState(false)
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

    const toMoney = (amount: number) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const wagerImage = () => {
        if (props.game.type == 'tiered') {
            return TIERS[props.player.wager.tier]
        }
        else {
            if (props.player.wager.amount == 0) {
                return '/tiers/ghost.png'
            }
            else {
                if (props.game.split == 'top 40') {
                    return '/TwoX.svg'
                }
                else {
                    return '/EightX.svg'
                }
            }
        }
    }

    const getWager = () => {
        if (props.player.lineup != null) {
            return (
                <div className="flex flex-col items-center bg-dark border-2 border-primary rounded-md py-4 mt-4">
                    <div className="flex -mr-2 flex-row items-center">
                        <h1 className="text-2xl text-light">Wager</h1>
                    </div>                    
                    <div className="flex px-8 pt-4 flex-row justify-between items-center w-full">
                        <Image width={50} height={50} src={wagerImage()} />
                        <h1 className="text-xl text-light">{toMoney(props.player.wager.amount)}</h1>
                    </div>
                </div>                
            )
        }
    }

    if (props.player != null && !(view.includes(props.user.username))) {
        setViewed(props.player.portfolio)
        setView([props.user.username])
    }

    const handleView = (username: string) => {
        if (!(view.includes(username))) {
            if (!(username in viewed[0])) {                
                compare(username, props.game.code, viewed).then((new_viewed: any) => {
                    setViewed(new_viewed)
                })                
            }
            const temp: any = [...view, username]
            setView(temp)
        }
        else {
            setView(view.filter((e: any) => e !== username))
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

			<main className='bg-medium text-center h-full'>
                <Path />
                <h1 className="text-3xl text-light font-bold pt-20 mb-12">{props.game.name}</h1>
                <div className="flex flex-col justify-between items-start w-full">
                    <>
                    {!showCompare ? <Line type={'hybrid'} data={props.player.portfolio} /> : <LeaderLine type={'hybrid'} view={view} data={viewed}/>}
                    <div className="flex flex-row justify-end items-center w-full pt-3 pr-16">
                        <button onClick={() => setCompare(false)} className={"flex flex-col justify-center items-center p-1 " + `${!showCompare ? 'border-b-2 border-primary' : ''}`}>
                            <Image width={30} height={30} src='/SingleView.svg' />
                        </button>
                        <button onClick={() => setCompare(true)} className={"flex flex-col justify-center items-center p-1 ml-5 " + `${showCompare ? 'border-b-2 border-primary' : ''}`} >
                            <Image width={30} height={30} src='/MultiView.svg' />
                        </button>
                    </div> 
                    </>
                    <div className="flex flex-row w-full mt-8 justify-between">
                        <div className="flex flex-col w-full mr-8">
                            <div className="flex flex-row border-t-2 border-l-2 border-r-2 border-primary rounded-t-lg">
                                <button onClick={() => setLineup(false)} className="flex flex-col justify-center items-center w-1/2 text-xl text-light py-2 px-1">
                                    <div className={"px-2 " + `${!lineup ? 'border-b-2 border-primary' : ''}`}>
                                        Leaderboard
                                    </div>                                    
                                </button>
                                <button onClick={() => setLineup(true)} className="flex flex-col justify-center items-center w-1/2 text-xl text-light py-2 px-1">
                                    <div className={"px-2 " + `${lineup ? 'border-b-2 border-primary' : ''}`}>
                                        Lineup
                                    </div>                                    
                                </button>
                            </div>
                            {lineup ? 
                                <IngameLineup/> 
                                : 
                                'players_list' in props.game ? 
                                    <Players players={props.game.players_list} viewing={view} view={handleView}/> 
                                    : 
                                    null
                            }                                                    
                        </div>                        
                        <div className="flex flex-col">
                            <GameInfo game={props.game} join={props.join}/>
                            {getWager()}
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
