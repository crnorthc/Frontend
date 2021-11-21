import { 
    EVENT_START,
    ERROR,
    GAMES_LOADED,
    MYGAMES_LOADED,
    GAME_SET,
    PLAYER_SET,
    SEARCH_MADE,
    DATA_FETCHED,
    FETCHING_DATA,
    LOGGED_OUT,
    COMPARED
 } from '../types'

const initialState = {
    event_starting: false,
    games: null,
    mygames: null,
    game: null,
    player: null,
    error: false,
    search_results: null,
    data: null,
    compared: null,
    error_msg: ''
}

export default function (state = initialState, action: any) {
    switch (action.type) {
    case EVENT_START: 
        return {
            ...state,
            event_starting: true,
            search_results: 'loading'
        }
    case GAMES_LOADED:
        return {
            ...state,
            event_starting: false,
            games: action.payload
        }
    case MYGAMES_LOADED:
        return {
            ...state,
            mygames: action.payload
        }
    case GAME_SET:
        return {
            ...state,
            game: action.payload.Game,
            player: action.payload.Player
        }
    case PLAYER_SET:
        return {
            ...state,
            player: action.payload
        }
    case SEARCH_MADE:
        return {
            ...state,
            search_results: action.payload
        }
    case FETCHING_DATA:
        return {
            ...state,
            data: null
        }
    case DATA_FETCHED:
        return {
            ...state,
            data: action.payload
        }
    case COMPARED:
        return {
            ...state,
            compared: action.payload
        }
    case ERROR:
        return {
            ...state,
            error: true,
            error_msg: action.payload
        }
    case LOGGED_OUT:
        return {
            initialState
        }
    default:
        return state
    }
}