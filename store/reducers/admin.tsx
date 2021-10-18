import { 
    EVENT_START,
    ERROR,
    IS_ADMIN,
    CREATED_GAME,
 } from '../types'

const initialState = {
    is_admin: false,
    game: null,
    event_staring: false,
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
        case IS_ADMIN:
            return {
                ...state,
                is_admin: true
            }
        case CREATED_GAME:
            return {
                ...state,
                event_starting: false,
                game: action.payload
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