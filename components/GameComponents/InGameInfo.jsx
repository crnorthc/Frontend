import React, { useState, useEffect } from "react"
import Image from "next/image"

// State Stuff
import { connect } from "react-redux"
import PropTypes from 'prop-types'

const InGameInfo = (props) => {
    const [gameTime, setGameTime] = useState(0)
    const [timeTo, setTimeTo] = useState('')

    InGameInfo.propTypes = {
        player: PropTypes.object,
        game: PropTypes.object,
        user: PropTypes.object
    }

    useEffect(() => {
        if (props.game == null || gameTime !== 0) return
        if (props.game.started) {
            var _time = props.game.end
        }
        else {
            _time = props.game.start
        }

        const year = _time['year']
        const month = _time['month']
        const day = _time['day']
        const hour = _time['hours']
        const min = _time['minutes']

        const start_time = (new Date(year, month - 1, day, hour, min).getTime() / 1000)
        setGameTime(start_time)
    }, [props.game])


    useEffect(() => {
        if (gameTime == 0) return
        const intervalId = setInterval(() => {
            const current_time = (Date.now() / 1000)
            const time_to = Number((gameTime - current_time).toFixed(0))
            set_time(time_to)
        }, 1000);
        return () => clearInterval(intervalId);
    }, [gameTime]);


    const toMoney = (amount) => {
        return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const format_time = (days, hours, minutes) => {
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
            var seconds = '00'
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

    const div_w_rema = (x, over_y) => {
        const quotient =  Math.floor(x / over_y)
        const remander = x % over_y
        return [quotient, remander]
    }

    const set_time = (time_to) => {
        var days = div_w_rema(time_to , 86400)
        var hours = div_w_rema(days[1], 3600)
        var minutes = div_w_rema(hours[1], 60)

        setTimeTo(format_time(days, hours, minutes))
    }

    const getScore = () => {
        for (const rank in props.game.players_list) {
            if (props.game.players_list[rank].player == props.user.username) {
                return props.game.players_list[rank].worth
            }
        }
    }

    const getLineup = () => {
        var lineup = []

        for (const x in props.player.lineup) {
            lineup.push(
                <div className="flex flex-row w-full mb-2 px-2 py-2 bg-black3 justify-between">
                    <div className="flex flex-row items-center">
                        {props.player.lineup[x].logo == null ? <Image alt='' width={50} height={50} src='/NoLogo.svg' /> :<Image alt='' width={50} height={50} src={props.player.lineup[x].logo} />}
                        <div className="flex pl-4 flex-col items-start">
                            <h1 className='text-lg text-light'>{props.player.lineup[x].name}</h1>
                            <h1 className='text-sm font-light text-lightmedium'>{props.player.lineup[x].symbol}</h1>
                        </div>                        
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="flex flex-col items-end">
                            <h1 className='text-lg text-light'>{toMoney(props.player.lineup[x].current_value)}</h1>
                            <div className={"flex flex-row items-center " + `${props.player.lineup[x].d_change > 0 ? 'text-green' : 'text-red'}`}>
                                <h1 className='text-sm'>{toMoney(props.player.lineup[x].d_change)}</h1> 
                                <h1 className='text-xs ml-1'>({props.player.lineup[x].p_change}%)</h1>
                            </div>                                               
                        </div>     
                        <button onClick={() => props.view(props.player.lineup[x].ticker, props.player.lineup[x].amount)} className="flex flex-row justify-center items-center pl-4">
                            {props.viewing.includes(props.player.lineup[x].ticker.replace('X:', '').replace('USD', '')) ? <Image alt='' height={25} width={25} src='/OpenEyeSecondary.svg'/> : <Image alt='' height={25} width={25} src='/ClosedEyeSecondary.svg'/>}
                        </button> 
                    </div>                                 
                </div>
            )
        }

        return lineup
    }

    return (
        <div className="">
            <div className={"flex rounded-md shadow-xl border-2 flex-col w-full " + `${getScore >= 100000 ? 'border-green2' : 'border-red2'}`}>
                <div className="flex px-2 py-2 bg-black rounded-t-lg flex-row w-full justify-between items-center">
                    <p className="text-md pl-2 text-light">Overall</p>
                    <div className="flex flex-row">
                        <h1 className={"text-xl py-2 pr-4 " + `${getScore >= 100000 ? 'text-green' : 'text-red2'}`}>{toMoney(getScore())}</h1>
                        <button onClick={() => props.view('overall', 0)} className="flex flex-row justify-center items-center">
                            {props.viewing.includes('overall') ? <Image alt='' height={25} width={25} src='/OpenEyeSecondary.svg'/> : <Image alt='' height={25} width={25} src='/ClosedEyeSecondary.svg'/>}
                        </button> 
                    </div>                    
                </div>
                <div className="min-h-x64 max-h-x64 overflow-y-auto rounded-b-md w-full bg-black2">
                    {getLineup()}
                </div>                                                      
            </div>      
            <div className="flex py-4 mt-4 px-4 rounded-md shadow-lg flex-col w-full bg-dark">
                <div className="flex flex-row w-full justify-between items-center">
                    <p className="text-md text-lightmedium">Game Ends In</p>
                    <h1 className="text-2xl py-2 text-light">{timeTo}</h1>
                </div> 
            </div>           
        </div>         
    )
}

const mapStateToProps = (state) => ({
    player: state.game.player,
    game: state.game.game,
    user: state.user.user
})

export default connect(mapStateToProps, {})(InGameInfo)
