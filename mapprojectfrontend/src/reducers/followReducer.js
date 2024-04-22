import followServices from '../services/followServices'

import { setPropertyItem } from './propertyReducer'

export const checkFollow = (itemObject) => {
    return async dispatch => {
        const follow = await followServices.checkFollow(itemObject)
        dispatch({
            type: "CHECK_FOLLOW",
            data: follow
            })
    }
}

export const removeFollow = (propertyFollowed) => {
    return async dispatch => {
        await followServices.removeFollow(propertyFollowed)
        dispatch({
            type: "REMOVE_FOLLOW",
            data: propertyFollowed
            })
    }
}

export const addFollow = (itemObject) => {
    return async dispatch => {
        const follow = await followServices.addFollow(itemObject)
        dispatch({
            type: "ADD_FOLLOW",
            data: follow
            })
            dispatch(setPropertyItem(itemObject['property']));
    }
}


const followReducer = (state=[], action) => {
    switch(action.type) {
        case 'CHECK_FOLLOW':
            return action.data
        case 'REMOVE_FOLLOW':
            const newState = state.filter((item) => item.id !==action.data )
            return newState
        case 'ADD_FOLLOW':
            return [
                ...state,
                action.data
              ];
        default:
            return state
    }
}

export default followReducer