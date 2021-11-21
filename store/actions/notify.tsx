import { 
    NOTIFY,
    REMOVE
 } from '../types'

export const notify = (message: string) => (dispatch: any) => {
    dispatch({
        type: NOTIFY,
        payload: message
    })
}

export const remove = () => (dispatch: any) => {
    dispatch({
        type: REMOVE
    })
}