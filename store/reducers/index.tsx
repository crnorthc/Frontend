import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import admin from './admin'

export default combineReducers({
    auth,
    user,
    admin
})