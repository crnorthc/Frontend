import React, { useEffect } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { getRecent } from "../../store/actions/user";


const Overview = (props) => {
	Overview.propTypes = {
        getRecent: PropTypes.func.isRequired,
        recent_player: PropTypes.object,
        recent_game: PropTypes.object,
        user: PropTypes.object,
    }

    const TIERS = ['ghost', 'bronze', 'silver', 'gold', 'diamond']

    useEffect(() => {
        if (props.recent_player == null || props.recent_game == null) {
            props.getRecent()
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

    const get_favorites = () => {
        var favorites = []

        for (let x = 0; x < 5; x++) {
            try {
                favorites.push(
                    <div className="flex flex-row justify-between pl-6 items-center w-full">
                        <h1 className="text-light font-extralight text-xl">{(Number(x) + 1) + '. ' + props.user.stats.favorites[x].name}</h1>
                        <h1 className="text-light font-extralight text-xl">{toMoney(Number(props.user.stats.favorites[x].allocation))}</h1>
                    </div>
                )
            }
            catch (e) {
                favorites.push(
                    <div className="flex flex-row justify-start pl-6 items-center w-full">
                        <h1 className="text-light font-extralight text-xl">{(Number(x) + 1) + '. '}-</h1>                
                    </div>
                )
            }
        }
        return favorites
    }

    const get_tiers = () => {
        var tiers = []
        
        for (const t in TIERS) {
            tiers.push(
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">{TIERS[t].charAt(0).toUpperCase() + TIERS[t].slice(1)}</h1>
                    <h1 className="text-light font-extralight text-xl">{props.user.stats.tiers[TIERS[t]]}</h1>
                </div>
            )
        }
        return tiers
    }

    const get_recent_lineup = () => {
        const lineup = props.recent_player.lineup
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
		<div>
            <div className="flex flex-row justify-between items-center pr-8 pt-8 mr-20 rounded-md">
                <h1 className="text-light font-light text-xl">Total Balance</h1>
                <h1 className="text-light font-extralight text-xl">{toMoney(props.user.balance + props.user.frozen)}</h1>
            </div>
            <div className="flex flex-row justify-between items-center px-8 pt-4 mr-20 rounded-md">
                <h1 className="text-light font-extralight text-xl">Available Balance</h1>
                <h1 className="text-light font-extralight text-xl">{toMoney(props.user.balance)}</h1>
            </div>
            <div className="flex flex-row justify-between items-center px-8 pt-2 mr-20 rounded-md">
                <h1 className="text-light font-extralight text-xl">Frozen Balance</h1>
                <h1 className="text-light font-extralight text-xl">{toMoney(props.user.frozen)}</h1>
            </div>
            <div className="flex flex-col w-full pt-8">
                <h1 className="text-light font-light text-xl">Stats</h1>
                <div className="flex flex-row justify-between items-center pr-20 w-full mt-6">
                    <div className="border border-lightmedium rounded-md w-2/5 px-4 py-2">
                        <div className="flex flex-row justify-between items-center w-full">
                            <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">Total Games</h1>
                            <h1 className="text-light font-extralight text-xl">{props.user.stats.total_games}</h1>
                        </div>
                        <div className="flex flex-row justify-between pl-6 pt-2 items-center w-full">
                            <h1 className="text-light font-extralight text-xl">Games Won</h1>
                            <h1 className="text-light font-extralight text-xl">{props.user.stats.games_won}</h1>
                        </div>
                        <div className="flex flex-row justify-between pl-6 items-center w-full">
                            <h1 className="text-light font-extralight text-xl">Games Lost</h1>
                            <h1 className="text-light font-extralight text-xl">{props.user.stats.games_lost}</h1>
                        </div>
                    </div>
                    <div className="border border-lightmedium rounded-md w-2/5 px-4 py-2">
                        <div className="flex flex-row justify-between items-center w-full">
                            <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">Total Wagered</h1>
                            <h1 className="text-light font-extralight text-xl">${props.user.stats.total_bets}</h1>
                        </div>
                        <div className="flex flex-row justify-between pl-6 pt-2 items-center w-full">
                            <h1 className="text-light font-extralight text-xl">Wagers Won</h1>
                            <h1 className="text-light font-extralight text-xl">${props.user.stats.amount_won}</h1>
                        </div>
                        <div className="flex flex-row justify-between pl-6 items-center w-full">
                            <h1 className="text-light font-extralight text-xl">Wagers Lost</h1>
                            <h1 className="text-light font-extralight text-xl">${props.user.stats.amount_lost}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center pr-20 w-full mt-6">
                    <div className="border border-lightmedium rounded-md w-2/5 px-4 py-2">
                        <div className="flex flex-row justify-start items-center w-full">
                            <h1 className="text-light border-b border-lightmedium font-light px-1 mb-2 text-xl">Tiers</h1>
                        </div>
                        {get_tiers()}
                    </div>
                    <div className="border border-lightmedium rounded-md w-2/5 px-4 py-2">
                        <div className="flex flex-row justify-start items-center w-full">
                            <h1 className="text-light border-b border-lightmedium font-light px-1 mb-2 text-xl">Favorites</h1>
                        </div>
                        {get_favorites()}
                    </div>
                </div>
            </div>                
                {props.recent_player == null || props.recent_game == null ? 
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
                }
		</div>
	)
}

const mapStateToProps = (state) => ({
    recent_player: state.user.recent_player,
    recent_game: state.user.recent_game,
    user: state.user.user
})

export default connect(mapStateToProps, { getRecent })(Overview)
