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

    LOGGING_IN,
    LOGGED_IN,
    IS_ADMIN,
    LOGIN_FAIL,

    USER_LOADING,
    USER_LOADED,
    NO_USER
 } from '../types'

const initialState = {
    creating: false,
    created: false,
    signup_fail: false,

    sent_text: false,
    confirming_code: false,
    confirmed_code: false,
    confirm_fail: false,

    cookies_checked: false,
    found_user: false,

    logged_in: false,
    error: ''
}

export default function (state = initialState, action: any) {
    switch (action.type) {
    case CREATING_USER: 
        return {
            ...state,
            signup_fail: false,
            creating: true
        }
    case CREATED_USER:
        return {
            ...state,
            creating: false,
            created: true
        }
    case SIGNUP_FAIL:
        return {
            ...state,
            signup_fail: true,
            error: action.payload
        }
    case TEXT_SENT:
        return {
            ...state,
            sent_text: true
        }
    case CONFIRMING_CODE:
        return {
            ...state,
            confirm_fail: false,
            sent_text: true
        }
    case CONFIRMED_CODE:
        return {
            ...state,
            sent_text: true,
            confirmed_code: true,
        }
    case CONFIRM_FAIL:
        return {
            ...state,
            confirm_fail: true,
            error: action.payload
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
    default:
        return state
    }
}