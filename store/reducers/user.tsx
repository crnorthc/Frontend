import { 
    CREATED_USER,
    LOGGED_IN,

    RECENT_GAME,
    
    TEXT_SENT,
    WALLET_INFO,
    STATS,
    HISTORY,
    WATCHING
 } from '../types'

const initialState = {
    user: null,
    phone: null,
    recent_player: null,
    recent_game: null,
    wallet: null,
    stats: null,
    history: null,
    watchlist: null
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
    case WATCHING:
        return {
            ...state,
            watchlist: action.payload
        }
    case LOGGED_IN:
        return {
            ...state,
            user: action.payload.user
        }
    case RECENT_GAME:
        return {
            ...state,
            recent_player: action.payload.player_history,
            recent_game: action.payload.game_history
        }
    case WALLET_INFO:
        return {
            ...state,
            wallet: action.payload
        }
    case STATS:
        return {
            ...state,
            stats: action.payload
        }
    case HISTORY:
        return {
            ...state,
            history: action.payload
        }
    default:
        return state
    }
}