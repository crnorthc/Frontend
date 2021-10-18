import { 
    IS_ADMIN
 } from '../types'

const initialState = {
    is_admin: false
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case IS_ADMIN:
            return {
                ...state,
                is_admin: true
            }
        default:
            return state
    }
}