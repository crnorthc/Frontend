import axios from 'axios'
import { CREATING_USER } from '../types'

function getCookie() {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${'loggedIn'}=`)
    var cookie = ''
    console.log(value)
    return cookie
}

export const createUser = (user: Signup) => (dispatch: any) => {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(user)

    axios.post('http://127.0.0.1:8000/users/create', body, config)
        .then(res => {
            getCookie()
            dispatch({
                type: CREATING_USER,
                payload: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    phone_number: user.phone,
                    username: user.username,
                    password: user.password
                }
            })
        })
}