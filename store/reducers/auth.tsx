import { 
    EVENT_START,
    ERROR,

    CREATED_USER,

    TEXT_SENT,
    CONFIRMED_CODE,
    
    COOKIES_CHECKED,
    FOUND_USER,

    LOGGED_IN,
    IS_ADMIN,

    USER_LOADED,
    NO_USER,
    PASSWORD_CHANGED
 } from '../types'

const initialState = {
    event_starting: false,
    created: false,
    signup_fail: false,
    sent_text: false,
    confirmed_code: false,
    cookies_checked: false,
    found_user: false,
    logged_in: false,
    password_changed: false,
    error: false,
    error_msg: ''
}

export default function (state = initialState, action: any) {
    switch (action.type) {
    case EVENT_START: 
        return {
            ...state,
            signup_fail: false,
            event_starting: true
        }
    case CREATED_USER:
        return {
            ...state,
            event_starting: false,
            created: true,
            error: false,
            error_msg: ''
        }
    case TEXT_SENT:
        return {
            ...state,
            sent_text: true
        }
    case CONFIRMED_CODE:
        return {
            ...state,
            confirmed_code: true,
        }
    case COOKIES_CHECKED:
        return {
            ...state,
            cookies_checked: true
        }
    case FOUND_USER:
        return {
            ...state,
            found_user: true
        }
    case LOGGED_IN:
        return {
            ...state,
            logged_in: true
        }
    case IS_ADMIN:
        return {
            ...state,
            logged_in: true
        }
    case PASSWORD_CHANGED:
        return {
            ...state,
            password_changed: true
        }
    case ERROR:
        return {
            ...state,
            error: true,
            error_msg: action.payload
        }
    default:
        return state
    }
}