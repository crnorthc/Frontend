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
    IS_ADMIN,

    PASSWORD_CHANGED
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

export const createUser = (user: Signup) => (dispatch: any) => {

    const config: any = getConfig(false)

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
        .catch((error: any) => {
            if (error.response.status == 403) {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: error.response.data.Error
                })
            }
        })
}

export const sendText = (phone: string) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({phone})

    dispatch({
        type: TEXT_SENT
    })

    axios.post('http://127.0.0.1:8000/users/send_text', body, config)
}

export const resendText = (phone: string) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({phone})

    dispatch({
        type: TEXT_SENT
    })

    axios.post('http://127.0.0.1:8000/users/send_text', body, config)
}

export const confirmPhone = (code: string, phone: string) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({code, phone})

    dispatch({
        type: CONFIRMING_CODE
    })

    axios.post('http://127.0.0.1:8000/users/confirm', body, config)
    .then((res: any) => {
        dispatch({
            type: CONFIRMED_CODE
        })
    })
    .catch((error: any) => {
        if (error.response.status == 403) {
            dispatch({
                type: CONFIRM_FAIL,
                payload: error.response.data.Error
            })
        }
    })
}

export const login = (username: string, password: string, remember: boolean) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({username, password, remember})

    dispatch({
        type: LOGGING_IN
    })

    axios.post('http://127.0.0.1:8000/users/login', body, config)
    .then((res: any) => {
        if (res.data.Super) {
            dispatch({
                type: IS_ADMIN,
                payload: res.data.Success
            })
        }
        else {
            dispatch({
                type: LOGGED_IN,
                payload: res.data.Success
            })
        }
    })
    .catch((error: any) => {
        console.log(error.response)
        if (error.response.status == 403) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.Error
            })
        }
    })
}

export const loadUser = (username: string) => (dispatch: any) => {

    const config: any = getConfig(true)

    const body = JSON.stringify({username})

    dispatch({
        type: USER_LOADING
    })

    axios.post('http://127.0.0.1:8000/users/load', body, config)
    .then((res: any) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    })
    .catch((error: any) => {
        if (error.response.status == 403) {
            dispatch({
                type: NO_USER,
                payload: error.response.data.Error
            })
        }
    })
}

export const checkCookies = () => (dispatch: any) => {

    dispatch({
        type: COOKIES_CHECKED
    })

    const body = JSON.stringify({})
    if (getUID() == '') {
        dispatch({
            type: NO_USER
        })
    }
    else {
        if (getCookie() !== '') {
            const config: any = getConfig(true)

            axios.post('http://127.0.0.1:8000/users/load', body, config)
            .then((res: any) => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            })  
        }
        else {
            dispatch({
                type: FOUND_USER
            })
        }
    }    
}

export const recoverPhone = (phone: string) => (dispatch: any) => {

    dispatch({
        type: TEXT_SENT,
        payload: phone
    })

    const body = JSON.stringify({ phone })
    const config: any = getConfig(false)

    axios.post('http://127.0.0.1:8000/users/recover-phone', body, config)      
}

export const changePassword = (password: string, phone: string) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({ password, phone })


    axios.post('http://127.0.0.1:8000/users/change-password', body, config)
    .then((res: any) => {
        dispatch({
            type: PASSWORD_CHANGED
        })
    })
}


/*
    Admin Functions
*/

export const createAdmin = (admin: AdminSignup) => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(admin)

    axios.post('http://127.0.0.1:8000/users/create-admin', body, config)
        .then((res: any) => {
            dispatch({
                type: CREATED_USER
            })
        })
        .catch((error: any) => {
            if (error.response.status == 403) {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: error.response.data.Error
                })
            }
        })
}