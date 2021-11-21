import { restClient } from '@polygon.io/client-js'
import CoinGecko from 'coingecko-api'
import axios from 'axios'
import { 
    EVENT_START,
    GAMES_LOADED,
    MYGAMES_LOADED,
    GAME_SET,
    PLAYER_SET,
    SEARCH_MADE,
    FETCHING_DATA,
    DATA_FETCHED,
    COMPARED
 } from '../types'

const TIME_SPANS = {
    'H': {span: 'minute', multiplier: 1, max: 3000000},
    'D': {span: 'minute', multiplier: 15, max: 3000000},
    'W': {span: 'hour', multiplier: 1, max: 3000000},
    'M': {span: 'day', multiplier: 1, max: 4320000000},
    'Y': {span: 'week', multiplier: 1, max: 4320000000},
    'All': {span: 'week', multiplier: 2, max: 4320000000}
}

const KEY ="b4XCWhIAVjd82VOpYwXKjL5S3j9epMy6"


function getCookie() {
    const value = `; ${document.cookie}`
    const parts: any = value.split(`; ${'loggedIn'}=`)
    var cookie: any = ''
    if (parts.length === 2) {
        cookie = parts.pop().split(';').shift()
    }
    return cookie
}

function dateObjToString(date: any) {
    if (date.month.toString().length == 1) {
        var month: any = '0' + date.month
    }
    else {
        month = date.month
    }

    if (date.day.toString().length == 1) {
        var day: any = '0' + date.day
    }
    else {
        var day = date.day
    }

    return date.year + '-' + month + '-' + day
}

function formatTimestamp(ts: number) {
    const date = new Date(ts)

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }    
}

function getTime() {
    var to = Date.now()
    return dateObjToString(formatTimestamp(to))
}

function fromTime(span: string) {
    var current = new Date().getTime() / 1000
    var from = current - TIME_SPANS[span].max

    return dateObjToString(formatTimestamp(from * 1000))
}

function getConfig(withCookie: boolean) {
    if (withCookie) {
        return {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + getCookie()
            }
        }
    }
    else {
        return {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

function format_poly(data: any) {
    var formatted = []
    var current = new Date().getTime()
    for (const i in data) {
        if ((data[i].t + 86400000) < current) {    
            formatted.push(
                {
                    date: new Date((data[i].t + 86400000)),
                    open: data[i].o,
                    high: data[i].h,
                    low: data[i].l,
                    close: data[i].c,
                    volume: data[i].v
                }
            )
        }
    }
    return formatted
}

function format_portfolio(data: any) {
    var formatted = []
    for (const i in data) {
        if (data[i].date !== 0) {
            formatted.push({
                date: new Date((data[i].date)),
                close: data[i]['close']
            })
        }        
    }
    return formatted
}

function add_to_viewed(viewed: any, data: any, username: string) {
    var formatted = []

    for (let i = 0; i < viewed.length; i++) {
        var temp = {...viewed[i]}
        try {
            temp[username] = data[i].close
        }        
        catch (e) {
            temp[username] = data[data.length - 1].close
        }
        formatted.push(temp)
    }
    return formatted
}

export const getGames = () => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/get-all', body, config)
        .then((res: any) => {
            dispatch({
                type: GAMES_LOADED,
                payload: res.data.Success
            })
        })
}

export const getMyGames = () => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({})

    dispatch({
        type: EVENT_START
    })

    axios.get('http://127.0.0.1:8000/game/my', config)
        .then((res: any) => {
            dispatch({
                type: MYGAMES_LOADED,
                payload: res.data.Success
            })
        })
}


export const getGame = (code: string) => (dispatch: any) => {

    const config: any = getConfig(true)

    dispatch({
        type: EVENT_START
    })

    axios.get('http://127.0.0.1:8000/game/get/' + code, config)
        .then((res: any) => {
            if ('portfolio' in res.data.Player) {
                res.data.Player.portfolio = format_portfolio(res.data.Player.portfolio)
            }
            dispatch({
                type: GAME_SET,
                payload: res.data
            })
        })
}


export const join = (code: string, bet: any) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({code, bet})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/join', body, config)
        .then((res: any) => {
            dispatch({
                type: PLAYER_SET,
                payload: res.data.Success
            })
        })
}


export const searchCryptos = (search: string) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({search})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/search-crypto', body, config)
        .then((res: any) => {
            dispatch({
                type: SEARCH_MADE,
                payload: res.data.Success
            })
        })
}


export const getData = (selected: any, span: string) => (dispatch: any) => {
    dispatch({
        type: FETCHING_DATA
    })
    const to = getTime()
    const from = fromTime(span)
    console.log(from)
    console.log(to)
    const mult = TIME_SPANS[span].multiplier
    span = TIME_SPANS[span].span
    const poly = restClient('b4XCWhIAVjd82VOpYwXKjL5S3j9epMy6')
    const ticker = selected.ticker

    const url = 'https://api.polygon.io/v2/aggs/ticker/' + ticker + '/range/' + mult + '/' + span + '/' + from + '/' + to + '?adjusted=true&sort=asc&limit=50000&apiKey=b4XCWhIAVjd82VOpYwXKjL5S3j9epMy6'

    axios.get(url)
        .then((res: any) => {
            console.log(res)
            var data = format_poly(res.data.results)
            console.log(data)
            dispatch({
                type: DATA_FETCHED,
                payload: {selected, data}
            })
        })


}


export const editLineup = (code: string, allocation: number, id: string) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({code, allocation, id})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/edit-lineup', body, config)
        .then((res: any) => {
            dispatch({
                type: PLAYER_SET,
                payload: res.data.Success
            })
        })
}


export const editWager = (code: string, wager: any) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({code, wager})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/edit-wager', body, config)
        .then((res: any) => {
            dispatch({
                type: PLAYER_SET,
                payload: res.data.Success
            })
        })
}

export async function compare(username: string, code: string, viewed: any){

    const config: any = getConfig(true)
    const body = JSON.stringify({username, code})
    var new_viewed: any = null

    const res: any = await axios.post('http://127.0.0.1:8000/game/compare', body, config)
    const portfolio = format_portfolio(res.data[username])
    new_viewed = add_to_viewed(viewed, portfolio, username)
    console.log("new Viewed in games actions")
    console.log(new_viewed)
    return new_viewed 
}