import type { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import Router, { useRouter } from "next/router"
import { getGame } from "../../../../store/actions/game"
import { deleteGame, goLive } from "../../../../store/actions/admin";
import Path from "../../../../components/path";


const Game: NextPage = (props: any) => {
	const [gameStart, setGameStart] = useState(0)
    const [timeTo, setTimeTo] = useState('')

    const router = useRouter();

	Game.propTypes = {
        deleteGame: PropTypes.func.isRequired,
        setGame: PropTypes.func.isRequired,
        getGame: PropTypes.func.isRequired,
        goLive: PropTypes.func.isRequired,
        game: PropTypes.object,
        games: PropTypes.array
    }

    const handleDelete = () => {
        props.deleteGame(props.game.code)
        Router.push('/secrets/games')
    }

    useEffect(() => {
        if (props.game == null || gameStart !== 0) return

        const year = props.game.start['year']
        const month = props.game.start['month']
        const day = props.game.start['day']
        const hour = props.game.start['hours']
        const min = props.game.start['minutes']

        const start_time = (new Date(year, month - 1, day, hour, min).getTime() / 1000)
        setGameStart(start_time)
    }, [props.game])

    useEffect(() => {
        if (!router.isReady) return
        const code: any = router.query.code
        if (props.game == null) {            
            props.getGame(code)
        }
    }, [router.isReady])

    const div_w_rema = (x: any, over_y: any) => {
        const quotient =  Math.floor(x / over_y)
        const remander = x % over_y
        return [quotient, remander]
    }

    const format_time = (days: any, hours: any, minutes: any) => {
        if (days[0] == 0) {
            days = '00'
        }
        else {
            if (days[0].toString().length == 1) {
                days = '0' + days[0]
            }
            else {
                days = days[0]
            }
        }

        if (hours[0] == 0) {
            hours = '00'
        }
        else {
            if (hours[0].toString().length == 1) {
                hours = '0' + hours[0]
            }
            else {
                hours = hours[0]
            }
        }

        if (minutes[0] == 0) {
            var mins = '00'
        }
        else {
            if (minutes[0].toString().length == 1) {
                mins = '0' + minutes[0]
            }
            else {
                mins = minutes[0]
            }
        }

        if (minutes[1] == 0) {
            var seconds: any = '00'
        }
        else {
            if (minutes[1].toString().length == 1) {
                seconds = '0' + minutes[1]
            }
            else {
                seconds = minutes[1]
            }
        }

        return days + ':' + hours + ':' + mins + ':' + seconds
    }

    const set_time = (time_to: any) => {
        var days: any = div_w_rema(time_to , 86400)
        var hours: any = div_w_rema(days[1], 3600)
        var minutes: any = div_w_rema(hours[1], 60)

        setTimeTo(format_time(days, hours, minutes))
    }

    useEffect(() => {
        if (gameStart == 0) return
        const intervalId = setInterval(() => {
            const current_time = (Date.now() / 1000)
            const time_to = Number((gameStart - current_time).toFixed(0))
            set_time(time_to)
        }, 1000);
        return () => clearInterval(intervalId);
       }, [gameStart]);
    
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

			<main className='bg-medium flex flex-col items-center h-full'>
                <Path />
                <div className="flex pt-40 flex-row justify-between items-center">
                    {props.game.live ?
                        <div className="w-4 h-4 rounded-full bg-green"/>
                        :
                        <div className="w-4 h-4 rounded-full bg-red"/>
                    }
                    <h1 className="text-4xl px-4 font-semibold text-light">{props.game.name}</h1>                    
                </div>
                <div className="flex flex-col w-full items-center">
                    <div className="flex flex-row w-5/6 justify-between mt-20">
                        <div className="flex flex-col w-1/3 items-center">                            
                            <p className="text-md text-lightmedium">Game Duration</p>
                            <h1 className="text-2xl pt-2 text-light">{props.game.duration}</h1>                     
                        </div>
                        <div className="flex flex-col w-1/3 items-center">
                            <p className="text-md text-lightmedium">League</p>
                            <h1 className="text-2xl pt-2 text-light">{props.game.league}</h1>
                        </div>
                        <div className="flex flex-col w-1/3 items-center">                            
                            <p className="text-md text-lightmedium">Starts In</p>
                            <h1 className="text-2xl mx-2 pt-2 text-light">{timeTo}</h1>                     
                        </div>
                    </div>
                </div> 
                <div className="flex flex-col w-full items-center">
                    <div className="flex flex-row w-5/6 justify-between mt-20">
                        <div className="flex flex-col w-1/3 items-center">                            
                            <p className="text-md text-lightmedium">Split</p>
                            <h1 className="text-2xl pt-2 text-light">{props.game.split}</h1>                     
                        </div>
                        <div className="flex flex-col w-1/3 items-center">
                            <p className="text-md text-lightmedium">Players</p>
                            <h1 className="text-2xl pt-2 text-light">{props.game.players}</h1>
                        </div>
                        <div className="flex flex-col w-1/3 items-center">                            
                            <p className="text-md text-lightmedium">Wager</p>
                            <h1 className="text-2xl mx-2 pt-2 text-light">${props.game.bet}</h1>                     
                        </div>
                    </div>
                </div>   
                <div className="flex w-2/3 flex-row mt-32 justify-between items-center">
                    <button onClick={() => handleDelete()} className="bg-redHue hover:bg-redHueHover text-lg text-lightmedium rounded-xl py-2 px-8">Delete</button> 
                    {props.game.live ?
                        <button className="bg-secondaryHue cursor-default text-lg text-lightmedium rounded-xl py-2 px-8">Go Live</button>
                        :
                        <button onClick={() => props.goLive(props.game.code)} className="bg-secondary hover:bg-secondaryLight text-lg text-light rounded-xl py-2 px-8">Go Live</button>
                    }                    
                </div>                           
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	games: state.game.games,
    game: state.game.game
})

export default connect(mapStateToProps, { getGame, deleteGame, goLive })(Game)
