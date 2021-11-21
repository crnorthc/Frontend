import Router from "next/router"
import axios from 'axios'
import { 
    EVENT_START,
    ERROR,
    CREATED_GAME,
    DELETE_GAME,
    ADMIN_ACCESS,
    GAME_SET,
    ADMIN_RESTRICT
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

export const verify = () => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({})

    const cookie = getCookie()

    if (cookie == '') {
        dispatch({
            type: ADMIN_RESTRICT
        })
    }

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/control/verify', body, config)
        .then(res => {
            dispatch({
                type: ADMIN_ACCESS
            })
        })
        .catch((error: any) => {
            if (error.response.status == 403) {
                dispatch({
                    type: ADMIN_RESTRICT
                })
            }
        })
}


export const login = (email: string, password: string) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({email, password})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/control/login', body, config)
        .then(res => {
            dispatch({
                type: ADMIN_ACCESS
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


export const createGame = (game: Game) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({game: game})

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
                return Router.push('/')
            }
        })
}

export const goLive = (code: string) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({code})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/live', body, config)
        .then((res: any) => {
            dispatch({
                type: GAME_SET,
                payload: res.data.Success
            })
        })
        .catch((error: any) => {
            if (error.response.status == 403) {
                return Router.push('/')
            }
        })
}

export const deleteGame = (code: string) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({code})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/game/delete', body, config)
        .then(res => {
            dispatch({
                type: DELETE_GAME,
                payload: res.data
            })
        })
        .catch((error: any) => {
            if (error.response.status == 403) {
                return Router.push('/')
            }
        })
}