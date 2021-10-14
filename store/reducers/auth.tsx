import { CREATING_USER } from '../types'

const initialState = {
    first_name: '',
    last_name: '',
    phone_number: '',
    username: '',
    password: ''
}

export default function (state = initialState, action: any) {
    switch (action.type) {
    case CREATING_USER: 
        return {
            ...state,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            phone_number: action.payload.phone_number,
            username: action.payload.username,
            password: action.payload.password
        }
    default:
        return state
    }
}