import React, { useState, useEffect } from "react"
import Loader from "react-loader-spinner";
import Image from "next/image"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'

const SPLITS = {
    'Top Player': 1,
    'Top 3 Players': 3,
    'Top 5 Players': 5,
    'Top 10 Players': 10
}

const TIERS = {
    'ghost': 0,
    'bronze': .25,
    'silver': .5,
    'gold': .75,
    'diamond': 1
}

const TIER_IMAGES = {
    'diamond': '/tiers/diamond.png',
    'gold': '/tiers/gold.png',
    'silver': '/tiers/silver.png',
    'bronze': '/tiers/bronze.png',
    'ghost': '/tiers/chicken.png',
}

const InGameInfo = (props) => {
    const [isWinner, setIsWinner] = useState(null)
    const [amount, setAmount] = useState(null)
    const [players, setPlayers] = useState(null)
    
    InGameInfo.propTypes = {
        player: PropTypes.object,
        game: PropTypes.object,
        user: PropTypes.object
    }

    useEffect(() => {
        if (props.game.type == 'tiered') {
            var split = SPLITS[props.game.split]
        }
        else {
            if (props.game.split == 'Top 40%') {
                split = props.game.players * .4
            }
            else {
                split = props.game.players * .1
            }
        }
        var rank = getRank()
        if (rank[0] <= split) {
            setIsWinner(true)
            var toLose = rank[1] - money_to_number(props.game.players_list[split].worth)
            setAmount(toLose.toFixed(2))
            setPlayers(split - rank[0])
        }
        else {
            setIsWinner(false)
            var toWin = money_to_number(props.game.players_list[split - 1].worth) - rank[1]
            setAmount(toWin.toFixed(2))
            setPlayers(rank[0] - split)
        }
    }, [])

    const toMoney = (amount) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const money_to_number = (amount) => {
        return Number(amount.replace('$', '').replace(',', ''))
    }

    const getRank = () => {
        for (const rank in props.game.players_list) {
            if (props.game.players_list[rank].player == props.user.username) {
                return [Number(rank) + 1, money_to_number(props.game.players_list[rank].worth)]
            }
        }
    }

    const get_winnings = () => {
        if (props.game.type == 'tiered') {
            return toMoney((props.game.pot * TIERS[props.player.wager.tier] * .97).toFixed(2))
        }
        else {
            return toMoney(props.player.wager.amount)
        }
    }

    const get_best = () => {
        var best_price = null
        var best_symbol = null

        for (const x in props.player.lineup) {
            if (Number(props.player.lineup[x].d_change) > best_price || best_price == null) {
                best_price = Number(props.player.lineup[x].d_change)
                best_symbol = props.player.lineup[x].symbol
            }
        }
        return best_symbol
    }

    const get_worst = () => {
        var worst_price = null
        var worst_symbol = null

        for (const x in props.player.lineup) {
            if (Number(props.player.lineup[x].d_change) < worst_price || worst_price == null) {
                worst_price = Number(props.player.lineup[x].d_change)
                worst_symbol = props.player.lineup[x].symbol
            }
        }
        return worst_symbol
    }

    const wagerImage = () => {
        if (props.game.type == 'tiered') {
            return TIER_IMAGES[props.player.wager.tier]
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
                <div className="flex flex-col w-full items-center py-4 px-4">  
                    <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="text-xl font-light text-lightHue">Your Wager</h1>
                        <div className="flex flex-row items-center">
                            <h1 className="text-xl text-light pr-2">{toMoney(props.player.wager.amount)}</h1>
                            <Image width={40} height={40} src={wagerImage()} />
                        </div>                        
                    </div>
                </div>                
            )
        }
    }

    if (isWinner == null) {
        return <Loader
                    type="Circles"
                    color="#00C2EF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
    }
    else {
        if (isWinner) {
            return (
                <div className="">
                
                </div>
            )
        }
        else {
            return (
                <div className="flex flex-col w-2/5 bg-dark shadow-xl border-2 border-primary2 rounded-lg mr-4">
                    <div className="flex flex-row px-4 py-4 bg-black rounded-t-lg justify-between w-full">
                        <h1 className="text-2xl text-primary">The Take</h1>
                        <h1 className="text-2xl text-primary">{get_winnings()}</h1>
                    </div>
                    <div className="flex flex-row px-4 pt-4 justify-between items-center w-full">
                        <h1 className="text-xl font-light text-lightHue">To Place</h1>
                        <h1 className="text-2xl text-green">+{toMoney(amount)}</h1>
                    </div>
                    <div className="flex flex-row px-4 pt-4 justify-between items-center w-full">
                        <h1 className="text-xl font-light text-lightHue">Players to Beat</h1>
                        <h1 className="text-2xl text-light">{players}</h1>
                    </div>
                    <div className="flex flex-row px-4 pt-4 justify-between items-center w-full">
                        <h1 className="text-xl font-light text-lightHue">Best Symbol</h1>
                        <h1 className="text-2xl text-light">{get_best()}</h1>
                    </div>
                    <div className="flex flex-row px-4 pt-4 justify-between items-center w-full">
                        <h1 className="text-xl font-light text-lightHue">Worst Symbol</h1>
                        <h1 className="text-2xl text-light">{get_worst()}</h1>
                    </div>
                    {getWager()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    player: state.game.player,
    game: state.game.game,
    user: state.user.user
})

export default connect(mapStateToProps, {})(InGameInfo)
