import axios from 'axios'
import { bindActionCreators } from 'redux'
import { 
    CREATING_USER,
    CREATED_USER,
    SIGNUP_FAIL,

    TEXT_SENT,
    CONFIRMING_CODE,
    CONFIRMED_CODE,
    CONFIRM_FAIL,

    COOKIES_CHECKED,
    FOUND_USER,
    NO_USER,

    LOGGING_IN,
    LOGGED_IN,
    LOGIN_FAIL,

    USER_LOADING,
    USER_LOADED,
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

function getUID() {
    const value = `; ${document.cookie}`
    const parts: any = value.split(`; ${'uid'}=`)
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
