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

    FINDING_USER,
    FOUND_USER,
    NO_USER_FOUND,

    LOGGING_IN,
    LOGGED_IN,
    LOGIN_FAIL,

    USER_LOADING,
    USER_LOADED,
    NO_USER
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

export const loadUID = () => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const uid = getUID()

    const body = JSON.stringify(uid)

    dispatch({
        type: FINDING_USER
    })

    axios.post('http://127.0.0.1:8000/users/find', body, config)
        .then(res => {
            dispatch({
                type: FOUND_USER,
                payload: res.data
            })
        })
        .catch(error => {
            if (error.response.status == 404) {
                dispatch({
                    type: NO_USER_FOUND
                })
            }
        })
}

export const createUser = (user: Signup) => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(user)

    dispatch({
        type: CREATING_USER
    })

    axios.post('http://127.0.0.1:8000/users/create', body, config)
        .then(res => {
            dispatch({
                type: CREATED_USER,
                payload: user.phone
            })
        })
        .catch(error => {
            if (error.response.status == 403) {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: error.response.data.Error
                })
            }
        })
}

export const sendText = (phone: string) => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({phone})

    dispatch({
        type: TEXT_SENT
    })

    axios.post('http://127.0.0.1:8000/users/send_text', body, config)
}

export const resendText = (phone: string) => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({phone})

    dispatch({
        type: TEXT_SENT
    })

    axios.post('http://127.0.0.1:8000/users/send_text', body, config)
}

export const confirmPhone = (code: string, phone: string) => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({code, phone})

    dispatch({
        type: CONFIRMING_CODE
    })

    axios.post('http://127.0.0.1:8000/users/confirm', body, config)
    .then(res => {
        dispatch({
            type: CONFIRMED_CODE
        })
    })
    .catch(error => {
        if (error.response.status == 403) {
            dispatch({
                type: CONFIRM_FAIL,
                payload: error.response.data.Error
            })
        }
    })
}

export const login = (username: string, password: string) => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({username, password})

    dispatch({
        type: LOGGING_IN
    })

    axios.post('http://127.0.0.1:8000/users/login', body, config)
    .then(res => {
        dispatch({
            type: LOGGED_IN
        })
    })
    .catch(error => {
        if (error.response.status == 403) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.Error
            })
        }
    })
}

export const loadUser = (username: string) => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getCookie()
        }
    }

    const body = JSON.stringify({username})

    dispatch({
        type: USER_LOADING
    })

    axios.post('http://127.0.0.1:8000/users/load', body, config)
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    })
    .catch(error => {
        if (error.response.status == 403) {
            dispatch({
                type: NO_USER,
                payload: error.response.data.Error
            })
        }
    })
}