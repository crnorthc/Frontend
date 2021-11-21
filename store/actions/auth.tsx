import axios from 'axios'
import { 
    EVENT_START,
    ERROR,
    CREATED_USER,

    TEXT_SENT,
    CONFIRMED_CODE,

    COOKIES_CHECKED,
    FOUND_USER,
    NO_USER,

    LOGGED_IN,

    USER_LOADED,
    IS_ADMIN,

    PASSWORD_CHANGED,

    LOGGED_OUT
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
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/user/create', body, config)
        .then(res => {
            dispatch({
                type: CREATED_USER,
                payload: user.phone
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

export const sendText = (phone: string) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({phone})

    dispatch({
        type: TEXT_SENT
    })

    axios.post('http://127.0.0.1:8000/user/send_text', body, config)
}

export const resendText = (phone: string) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({phone})

    dispatch({
        type: TEXT_SENT
    })

    axios.post('http://127.0.0.1:8000/user/send_text', body, config)
}

export const confirmPhone = (code: string, phone: string) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({code, phone})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/user/confirm', body, config)
    .then((res: any) => {
        dispatch({
            type: CONFIRMED_CODE
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

export const login = (username: string, password: string, remember: boolean) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({username, password, remember})

    dispatch({
        type: EVENT_START
    })

    axios.post('http://127.0.0.1:8000/user/login', body, config)
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
                payload: res.data.user
            })
        }
    })
    .catch((error: any) => {
        console.log(error.response)
        if (error.response.status == 403) {
            dispatch({
                type: ERROR,
                payload: error.response.data.Error
            })
        }
    })
}

export const logout = () => (dispatch: any) => {
    
    document.cookie = 'loggedIn=; Max-Age=0' 
    dispatch({
        type: LOGGED_OUT
    })
}

export const loadUser = () => (dispatch: any) => {

    const config: any = getConfig(true)

    dispatch({
        type: EVENT_START
    })

    axios.get('http://127.0.0.1:8000/user/load', config)
    .then((res: any) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data.user
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

    if (getUID() == '') {
        dispatch({
            type: NO_USER
        })
    }
    else {
        if (getCookie() !== '') {
            const config: any = getConfig(true)
            axios.get('http://127.0.0.1:8000/user/load', config)
            .then((res: any) => {
                dispatch({
                    type: LOGGED_IN,
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

    axios.post('http://127.0.0.1:8000/user/recover-phone', body, config)      
}

export const changePassword = (password: string, phone: string) => (dispatch: any) => {
    
    const config: any = getConfig(false)

    const body = JSON.stringify({ password, phone })


    axios.post('http://127.0.0.1:8000/user/change-password', body, config)
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

    axios.post('http://127.0.0.1:8000/user/create-admin', body, config)
        .then((res: any) => {
            dispatch({
                type: CREATED_USER
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