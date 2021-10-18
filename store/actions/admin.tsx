import axios from 'axios'
import { 
    EVENT_START,
    ERROR,
    CREATED_GAME,
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


export const createGame = (game: Game) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify(game)

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/create', body, config)
        .then(res => {
            dispatch({
                type: CREATED_GAME,
                payload: res.data
            })
        })
        .catch((error: any) => {
            if (error.response.status == 403) {
                dispatch({
                    type: ERROR,
                    payload: error.response.data.Error
                })
            }
        })
}