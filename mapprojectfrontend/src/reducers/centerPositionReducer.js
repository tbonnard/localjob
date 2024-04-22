export const setPositionCenter = (item) => {
    return async dispatch => {
        dispatch({
            type: "CENTER_POSITION",
            data: item
            })
    }
}

const centerPositionReducer = (state=[45.5019,-73.5674], action) => {
    switch(action.type) {
        case 'CENTER_POSITION':
            return action.data
        default:
            return state
    }
}

export default centerPositionReducer