import { 
    CREATED_USER,
    LOGGED_IN,

    USER_LOADING,
    USER_LOADED,
    NO_USER,
    
    TEXT_SENT
 } from '../types'

const initialState = {
    user: null,
    phone: null,
}

export default function (state = initialState, action: any) {
    switch (action.type) {
    case CREATED_USER:
        return {
            ...state,
            phone: action.payload,
        }
    case TEXT_SENT:
        return {
            ...state,
            phone: action.payload
        }
    case LOGGED_IN:
        return {
            ...state,
            user: action.payload
        }
    default:
        return state
    }
}