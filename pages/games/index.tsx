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
	const [tiered, setType] = useState(true);

	Games.propTypes = {
        getGames: PropTypes.func.isRequired,
        games: PropTypes.array
    }

    useEffect(() => {
        if (props.games == null) {
            props.getGames()
        }
    }, [])

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
        var games = []
        for (const game in props.games) {
            const code = props.games[game]['code']
            const name = props.games[game]['name']
            const type = props.games[game]['type']
            const league = props.games[game]['league']
            const duration = props.games[game]['duration']
            const start = props.games[game]['start']
            const split = props.games[game]['split']
            const players = props.games[game]['players']
            const bet = props.games[game]['bet']

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

        for (let i = 0; i < (6 - Object.keys(props.games).length); i++) {
            games.push(
                <div className="pb-md bg-dark rounded-b-xl border-t-4 border-medium">
                
                </div>
            )
        }

        return games
    }

	return (
		<div className='pageCont'>
			<Head>
				<title>Admin</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='bg-medium flex flex-col justify-center items-center'>
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
                    {props.games == null ?
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
