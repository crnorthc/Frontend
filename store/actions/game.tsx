import axios from 'axios'
import { 
    EVENT_START,
    GAMES_LOADED
 } from '../types'

 function getCookie() {
    const value = `; ${document.cookie}`
    const parts: any = value.split(`; ${'loggedIn'}=`)
    var cookie: any = ''
    if (parts.length === 2) {
        cookie = parts.pop().split(';').shift()
    }
    return cookie
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

export const loadGames = () => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/load-all', body, config)
        .then((res: any) => {
            dispatch({
                type: GAMES_LOADED,
                payload: res.data.Success
            })
        })
}
