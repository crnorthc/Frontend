import { 
    LOGGED_OUT,
    NOTIFY,
    REMOVE
 } from '../types'

const initialState = {
    notes: []
}

export default function (state = initialState, action: any) {
    switch (action.type) {
    case NOTIFY: 
        if (action.payload == state.notes[-1]) {
            var new_notes: any = state.notes
        }
        else {
            new_notes = [action.payload, ...state.notes]
        }
        return {
            ...state,
            notes: new_notes
        }
    case REMOVE:   
        var temp = state.notes
        temp.pop()
        return {
            ...state,
            notes: temp
        }
    case LOGGED_OUT:
        return {
            initialState
        }
    default:
        return state
    }
}