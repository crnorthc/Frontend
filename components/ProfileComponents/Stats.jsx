import React, { useEffect, useState } from "react"
import Image from "next/image"
import Loader from "react-loader-spinner";
import { SlideDown } from 'react-slidedown'

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { getStats } from "../../store/actions/user";


const Stats = (props) => {
    const [openBest, setOpenBest] = useState(false)
    const [openWorst, setOpenWorst] = useState(false)
    const [openFavorites, setOpenFavorites] = useState(false)


	Stats.propTypes = {
        getStats: PropTypes.func.isRequired,
        stats: PropTypes.object,
        user: PropTypes.object
    }

    useEffect(() => {
        if (props.stats == null) {
            props.getStats()
        }
    }, [])

    const toMoney = (amount) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const formatDate = (date, text=false) => {
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

    const tier_game_count = () => {
        var count = 0

        for (const x in props.user.stats.tiers) {
            count = count + props.user.stats.tiers[x]
        }

        return count
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

    const best_game = () => {
        return (
            <div className="border border-lightmedium rounded-md mt-6 px-4 py-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">{props.stats.best.game.name}</h1>
                        <div className="mb-1"><Image width={15} height={15} src={props.stats.best.game.type == 'tiered' ? '/TierIcon.svg' : '/MultIcon.svg'} /></div>                                    
                    </div>                                        
                    <h1 className="text-light font-extralight text-xl">{formatDate(props.stats.best.game.start, true)} - {formatDate(props.stats.best.game.end, true)}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">League</h1>
                    <h1 className="text-light font-extralight text-xl">{props.stats.best.game.league}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Length</h1>
                    <h1 className="text-light font-extralight text-xl">{props.stats.best.game.duration}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Split</h1>
                    <h1 className="text-light font-extralight text-xl">{props.stats.best.game.split}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Bet</h1>
                    <h1 className="text-light font-extralight text-xl">{props.stats.best.game.bet}{props.stats.best.game.type == 'tiered' ? '+' : ''}</h1>
                </div>
                <div className="flex flex-row items-center py-2 justify-center">
                    <div className="px-12 border-b border-lightmedium"/>
                </div>
                <div className="flex flex-row justify-between">
                    <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Results</h1>       
                    <h1 className="text-light font-extralight text-xl"># {props.stats.best.player.ranking} ({toMoney(props.stats.best.player.score)})</h1>                                                                           
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Bet</h1>
                    <h1 className="text-light font-extralight text-xl">{toMoney(props.stats.best.player.bet)}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Prize</h1>
                    <h1 className="text-light font-extralight text-xl">{toMoney(props.stats.best.player.won)}</h1>
                </div>
                <div className="flex flex-row items-center py-2 justify-center">
                    <div className="px-12 border-b border-lightmedium"/>
                </div> 
                <div className="flex flex-row justify-between">
                    <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Lineup</h1>                                                                                  
                </div>                        
                {get_lineup(props.stats.best.player.lineup)}                                       
            </div>    
        )
    }

    const worst_game = () => {
        return (
            <div className="border border-lightmedium rounded-md mt-6 px-4 py-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">{props.stats.worst.game.name}</h1>
                        <div className="mb-1"><Image width={15} height={15} src={props.stats.worst.game.type == 'tiered' ? '/TierIcon.svg' : '/MultIcon.svg'} /></div>                                    
                    </div>                                        
                    <h1 className="text-light font-extralight text-xl">{formatDate(props.stats.worst.game.start, true)} - {formatDate(props.stats.worst.game.end, true)}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">League</h1>
                    <h1 className="text-light font-extralight text-xl">{props.stats.worst.game.league}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Length</h1>
                    <h1 className="text-light font-extralight text-xl">{props.stats.worst.game.duration}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Split</h1>
                    <h1 className="text-light font-extralight text-xl">{props.stats.worst.game.split}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Bet</h1>
                    <h1 className="text-light font-extralight text-xl">{props.stats.worst.game.bet}{props.stats.worst.game.type == 'tiered' ? '+' : ''}</h1>
                </div>
                <div className="flex flex-row items-center py-2 justify-center">
                    <div className="px-12 border-b border-lightmedium"/>
                </div>
                <div className="flex flex-row justify-between">
                    <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Results</h1>       
                    <h1 className="text-light font-extralight text-xl"># {props.stats.worst.player.ranking} ({toMoney(props.stats.worst.player.score)})</h1>                                                                           
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Bet</h1>
                    <h1 className="text-light font-extralight text-xl">{toMoney(props.stats.worst.player.bet)}</h1>
                </div>
                <div className="flex flex-row justify-between pl-6 items-center w-full">
                    <h1 className="text-light font-extralight text-xl">Prize</h1>
                    <h1 className="text-light font-extralight text-xl">{toMoney(props.stats.worst.player.won)}</h1>
                </div>
                <div className="flex flex-row items-center py-2 justify-center">
                    <div className="px-12 border-b border-lightmedium"/>
                </div> 
                <div className="flex flex-row justify-between">
                    <h1 className="text-light font-light px-1 mb-2 mr-2 text-xl">Your Lineup</h1>                                                                                  
                </div>                        
                {get_lineup(props.stats.worst.player.lineup)}                                       
            </div>                            
        )
    }

    const get_favorites = () => {
        var favorites = []

        for (let x = 0; x < 10; x++) {
            try {
                favorites.push(
                    <div className="flex flex-row justify-between mt-2 px-6 bg-lightHover rounded-md py-3  items-center w-7/8">
                        <div className="flex flex-row items-center">
                            <h1 className="text-light pr-4 font-light text-xl">{(Number(x) + 1) + '. '}</h1>
                            <Image width={35} height={35} src={props.user.stats.favorites[x].logo} />
                            <h1 className="text-light pl-4 font-light text-xl">{props.user.stats.favorites[x].name}</h1>
                            <h1 className="text-lightmedium pl-4 font-extralight text-lg">{props.user.stats.favorites[x].symbol}</h1>
                        </div>                        
                        <h1 className="text-light font-extralight text-xl">{toMoney(Number(props.user.stats.favorites[x].allocation))}</h1>
                    </div>
                )
            }
            catch (e) {
            }
        }
        return favorites
    }


    if (props.stats == null) {
        return <Loader
            type="Circles"
            color="#00C2EF"
            height={50}
            width={50}
        />
    }

	return (
        <div className="flex flex-col pr-20 pt-8 w-full">
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">Total Games</h1>
                <div className="flex flex-row">
                    <div className="flex flex-row py-1 px-2 justify-between mr-4 items-center bg-dark rounded-md">
                        <h1 className="text-light font-light mr-1 px-1 text-xl">{tier_game_count()}</h1>
                        <Image width={15} height={15} src='/TierIcon.svg' />
                        <h1 className="text-light font-light mr-1 pl-4 px-1 text-xl">{props.user.stats.total_games - tier_game_count()}</h1>
                        <Image width={20} height={20} src='/MultIcon.svg' />
                    </div>
                </div>                
            </div>
            <div className="flex flex-row pl-6 pt-2 justify-between items-center w-full">
                <h1 className="text-light font-extralight text-xl">Games Won</h1>
                <div className="flex flex-row">
                    <div className="flex flex-row py-1 px-2 justify-between mr-4 items-center bg-dark rounded-md">
                        <h1 className="text-light font-light mr-1 px-1 text-xl">{props.user.stats.tiered_games_won}</h1>
                        <Image width={15} height={15} src='/TierIcon.svg' />
                        <h1 className="text-light font-light pl-4 mr-1 px-1 text-xl">{props.user.stats.mult_games_won }</h1>
                        <Image width={20} height={20} src='/MultIcon.svg' />
                    </div>
                </div>                
            </div>
            <div className="flex flex-row pl-6 pt-2 justify-between items-center w-full">
                <h1 className="text-light font-extralight text-xl">Games Lost</h1>
                <div className="flex flex-row">
                    <div className="flex flex-row py-1 px-2 justify-between mr-4 items-center bg-dark rounded-md">
                    <h1 className="text-light font-light mr-1 px-1 text-xl">{props.user.stats.tiered_games_lost}</h1>
                        <Image width={15} height={15} src='/TierIcon.svg' />
                        <h1 className="text-light font-light pl-4 mr-1 px-1 text-xl">{props.user.stats.mult_games_lost }</h1>
                        <Image width={20} height={20} src='/MultIcon.svg' />
                    </div>
                </div>                
            </div>
              <div className="flex flex-row pt-6 justify-between items-center w-full">
                <h1 className="text-light border-b border-lightmedium font-light px-1 text-xl">Total Wagered</h1>
                <div className="flex flex-row">
                    <div className="flex flex-row py-1 px-2 justify-between mr-4 items-center bg-dark rounded-md">
                        <h1 className="text-light font-light mr-1 px-1 text-xl">{toMoney(props.user.stats.tiered_total_bets)}</h1>
                        <Image width={15} height={15} src='/TierIcon.svg' />
                        <h1 className="text-light font-light mr-1 pl-4 px-1 text-xl">{toMoney(props.user.stats.mult_total_bets)}</h1>
                        <Image width={20} height={20} src='/MultIcon.svg' />
                    </div>
                </div>                
            </div>
            <div className="flex flex-row pl-6 pt-2 justify-between items-center w-full">
                <h1 className="text-light font-extralight text-xl">Amount Won</h1>
                <div className="flex flex-row">
                    <div className="flex flex-row py-1 px-2 justify-between mr-4 items-center bg-dark rounded-md">
                        <h1 className="text-light font-light mr-1 px-1 text-xl">{toMoney(props.user.stats.tiered_amount_won)}</h1>
                        <Image width={15} height={15} src='/TierIcon.svg' />
                        <h1 className="text-light font-light pl-4 mr-1 px-1 text-xl">{toMoney(props.user.stats.mult_amount_won)}</h1>
                        <Image width={20} height={20} src='/MultIcon.svg' />
                    </div>
                </div>                
            </div>
            <div className="flex flex-row pl-6 pt-2 justify-between items-center w-full">
                <h1 className="text-light font-extralight text-xl">Amount Lost</h1>
                <div className="flex flex-row">
                    <div className="flex flex-row py-1 px-2 justify-between mr-4 items-center bg-dark rounded-md">
                    <h1 className="text-light font-light mr-1 px-1 text-xl">{toMoney(props.user.stats.tiered_amount_lost)}</h1>
                        <Image width={15} height={15} src='/TierIcon.svg' />
                        <h1 className="text-light font-light pl-4 mr-1 px-1 text-xl">{toMoney(props.user.stats.mult_amount_lost)}</h1>
                        <Image width={20} height={20} src='/MultIcon.svg' />
                    </div>
                </div>                
            </div>      
            <div className="flex pt-8 flex-row justify-between w-full items-center">
                <h1 className="text-light font-light mr-4 text-xl">Favorites</h1>
                {openFavorites ? 
                    <button onClick={() => setOpenFavorites(!openFavorites)}>
                        <Image width={20} height={20} src='/up.svg' />
                    </button>
                :
                    <button onClick={() => setOpenFavorites(!openFavorites)}>
                        <Image width={20} height={20} src='/down.svg' />
                    </button>
                }                            
            </div>      
            <SlideDown className={'my-dropdown-slidedown'}>
                {openFavorites ? get_favorites() : null}
            </SlideDown>
            <div className="flex pt-4 flex-row justify-between w-full items-center">
                <h1 className="text-light font-light mr-4 text-xl">Best Game</h1>
                {openBest ? 
                    <button onClick={() => setOpenBest(!openBest)}>
                        <Image width={20} height={20} src='/up.svg' />
                    </button>
                :
                    <button onClick={() => setOpenBest(!openBest)}>
                        <Image width={20} height={20} src='/down.svg' />
                    </button>
                }                            
            </div>                            
            <SlideDown className={'my-dropdown-slidedown'}>
                {openBest ? best_game() : null}
            </SlideDown>                           
            <div className="flex pt-4 flex-row justify-between w-full items-center">
                <h1 className="text-light font-light mr-4 text-xl">Worst Game</h1>
                {openWorst ? 
                    <button onClick={() => setOpenWorst(!openWorst)}>
                        <Image width={20} height={20} src='/up.svg' />
                    </button>
                :
                    <button onClick={() => setOpenWorst(!openWorst)}>
                        <Image width={20} height={20} src='/down.svg' />
                    </button>
                }                            
            </div>                            
            <SlideDown className={'my-dropdown-slidedown'}>
                {openWorst ? worst_game() : null}
            </SlideDown>                                        
        </div>            
	)
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    stats: state.user.stats
})

export default connect(mapStateToProps, { getStats })(Stats)
