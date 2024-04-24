
export const setBoundsPersist = (newBounds) => {
    return async dispatch => {
        dispatch({
            type: "ADD_BOUND_PERSIST",
            data: newBounds
            })
    }
}


const boundsPersistReducer = (state= [
    [45.539024, -73.576126],
    [45.470689, -73.630028],
], action) => {
    switch(action.type) {
        case 'ADD_BOUND_PERSIST':
            return action.data
        default:
            return state
    }
}

export default boundsPersistReducer