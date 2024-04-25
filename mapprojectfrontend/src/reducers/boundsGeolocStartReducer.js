
export const setBoundsGeolocStart = (newBounds) => {
    return async dispatch => {
        dispatch({
            type: "SET_BOUND_GEOLOC_START",
            data: newBounds
            })
    }
}

const boundsGeolocStartReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_BOUND_GEOLOC_START':
            return action.data
        default:
            return state
    }
}

export default boundsGeolocStartReducer