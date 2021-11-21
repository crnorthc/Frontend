import axios from "axios"
import { bindActionCreators } from "redux"
import { 
    EVENT_START,
    RECENT_GAME,
    WALLET_INFO,
    STATS
 } from "../types"

function getCookie() {
	const value = `; ${document.cookie}`
	const parts: any = value.split(`; ${"loggedIn"}=`)
	var cookie: any = ""
	if (parts.length === 2) {
		cookie = parts.pop().split(";").shift()
	}
	return cookie
}

function getUID() {
	const value = `; ${document.cookie}`
	const parts: any = value.split(`; ${"uid"}=`)
	var cookie: any = ""
	if (parts.length === 2) {
		cookie = parts.pop().split(";").shift()
	}
	return cookie
}

function getConfig(withCookie: boolean) {
	if (withCookie) {
		return {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Token " + getCookie(),
			},
		}
	} else {
		return {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		}
	}
}

export const getRecent = () => (dispatch: any) => {

    const config: any = getConfig(true)

    dispatch({
        type: EVENT_START
    })

    axios.get('http://127.0.0.1:8000/user/recent-game', config)
        .then((res: any) => {
            dispatch({
                type: RECENT_GAME,
                payload: res.data
            })
        })
}

export const getWallet = () => (dispatch: any) => {

    const config: any = getConfig(true)

    dispatch({
        type: EVENT_START
    })

    axios.get('http://127.0.0.1:8000/user/wallet', config)
        .then((res: any) => {
            dispatch({
                type: WALLET_INFO,
                payload: res.data.wallet
            })
        })
}

export const getStats = () => (dispatch: any) => {

    const config: any = getConfig(true)

    dispatch({
        type: EVENT_START
    })

    axios.get('http://127.0.0.1:8000/user/stats', config)
        .then((res: any) => {
            dispatch({
                type: STATS,
                payload: res.data
            })
        })
}
