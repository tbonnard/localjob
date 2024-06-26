
export const setBounds = (newBounds) => {
    return async dispatch => {
        dispatch({
            type: "ADD_BOUND",
            data: newBounds
            })
    }
}

export const setBoundsCreate = (newBounds) => {
    return async dispatch => {
        dispatch({
            type: "SET_BOUND_CREATE",
            data: newBounds
            })
    }
}

export const resetBoundsCreate = () => {
    return async dispatch => {
        dispatch({
            type: "RESET_BOUND",
            data: [
                [45.539024, -73.576126],
                [45.470689, -73.630028],
            ]
            })
    }
}

const boundsReducer = (state= [
    [45.539024, -73.576126],
    [45.470689, -73.630028],
], action) => {
    switch(action.type) {
        case 'ADD_BOUND':
            return action.data
        case 'SET_BOUND_CREATE':
            return action.data
        case 'RESET_BOUND':
            return action.data
        default:
            return state
    }
}

export default boundsReducer