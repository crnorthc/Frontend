import { 
    EVENT_START,
    ERROR,
    GAMES_LOADED
 } from '../types'

const initialState = {
    event_starting: false,
    games: null,
    game: null,
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
    case GAMES_LOADED:
        return {
            ...state,
            event_starting: false,
            games: action.payload
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