import React, { useState, useEffect } from "react"


const GameInfo: any = (props: any) => {
    const [gameTime, setGameTime] = useState(0)
    const [timeTo, setTimeTo] = useState('')

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

    const div_w_rema = (x: any, over_y: any) => {
        const quotient =  Math.floor(x / over_y)
        const remander = x % over_y
        return [quotient, remander]
    }

    const set_time = (time_to: any) => {
        var days: any = div_w_rema(time_to , 86400)
        var hours: any = div_w_rema(days[1], 3600)
        var minutes: any = div_w_rema(hours[1], 60)

        setTimeTo(format_time(days, hours, minutes))
    }

   
    return (
        <div className="flex py-4 px-4 rounded-md flex-col w-full bg-dark">
            <div className="flex flex-row w-full justify-between items-center">
                <p className="text-md text-lightmedium">League</p>
                <h1 className="text-2xl py-2 text-light">{props.game.league}</h1>
            </div>
            <div className="flex flex-row w-full justify-between items-center">
                <p className="text-md text-lightmedium">Game Duration</p>
                <h1 className="text-2xl py-2 text-light">{props.game.duration}</h1>
            </div>
            <div className="flex flex-row w-full justify-between items-center">
                <p className="text-md text-lightmedium">Split</p>
                <h1 className="text-2xl py-2 text-light">{props.game.split}</h1>
            </div>
            <div className="flex flex-row w-full justify-between items-center">
                <p className="text-md text-lightmedium">Wager</p>
                <h1 className="text-2xl py-2 text-light">${props.game.bet}{props.game.type == 'tiered' ? '+' : ''}</h1>
            </div>
            <div className="flex flex-row w-full justify-between items-center">
                <p className="text-md text-lightmedium">Players</p>
                <h1 className="text-2xl py-2 text-light">{props.game.players}</h1>
            </div>
            <div className="flex flex-row w-full justify-between items-center">
                <p className="text-md text-lightmedium">{props.game.started ? 'End In' :'Starts In'}</p>
                <h1 className="text-2xl py-2 text-light">{timeTo}</h1>
            </div>
        </div>                   
    )
}

export default GameInfo
