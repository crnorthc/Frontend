import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import admin from './admin'
import game from './game'
import notify from './notify'

export default combineReducers({
    auth,
    user,
    admin,
    game,
    notify
})