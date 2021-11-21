import type { NextPage } from "next"
import Image from "next/image"
import Head from "next/head"
import React, { useState, useEffect } from "react"
import Loader from "react-loader-spinner";
import GameInfo from '../../../components/GameComponents/GameInfo'
import Wagers from '../../../components/GameComponents/Wagers'
import Lineup from "../../../components/GameComponents/PregameLineup";

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { Router, useRouter } from "next/router"
import { editWager, getGame, join } from "../../../store/actions/game"
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
    const [edit, wagerEdit] = useState(false)    
    const router = useRouter();

	Game.propTypes = {
        editWager: PropTypes.func.isRequired,
        getGame: PropTypes.func.isRequired,
        notify: PropTypes.func.isRequired,
        getBet: PropTypes.func.isRequired,
        join: PropTypes.func.isRequired,
        player: PropTypes.object,
        game: PropTypes.object,
        games: PropTypes.array
    }

    useEffect(() => {
        if (props.player !== null) {
            if (props.player.participant) {
                if (props.player.lineup.length == 0) {
                    props.notify("You will not be entered into the game with an empty lineup!")
                }
            }            
        }        
    }, [props.player])

    if (props.game != null) {
        if (props.game.started) {
           router.push('/game/' + props.game.code)
        }
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
                        <button onClick={() => wagerEdit(true)} className='flex flex-row p-1 ml-2 rounded-lg hover:bg-lightmedium justify-center items-center '>
                            <Image width={15} height={15} src='/edit.svg' />
                        </button> 
                    </div>                    
                    <div className="flex px-8 pt-4 flex-row justify-between items-center w-full">
                        <Image width={50} height={50} src={wagerImage()} />
                        <h1 className="text-xl text-light">{toMoney(props.player.wager.amount)}</h1>
                    </div>
                </div>                
            )
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
                <div className="flex flex-row justify-between items-start w-full">
                    {props.player.lineup == null ? 
                        <Wagers notify={props.notify} game={props.game} player={props.player} edit={edit} setEdit={wagerEdit} join={props.join}/> 
                        : 
                        edit ?
                            <Wagers notify={props.notify} game={props.game} player={props.player} edit={edit} setEdit={wagerEdit} join={props.editWager}/> 
                            :
                            <Lineup/>
                    }
                    <div className="flex flex-col">
                        <GameInfo game={props.game} join={props.join}/>
                        {getWager()}
                    </div>                    
                </div>                                                                            
			</main>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
    player: state.game.player,
	games: state.game.games,
    game: state.game.game,
})

export default connect(mapStateToProps, { editWager, getGame, join, notify })(Game)
