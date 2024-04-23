export const setFirstTimeUserLocation = () => {
    return async dispatch => {
        dispatch({
            type: "SET_FIRST_TIME_USER_LOCATION",
            data: false
            })
    }
}

export const resetFirstTimeUserLocation = () => {
    return async dispatch => {
        dispatch({
            type: "RESET_FIRST_TIME_USER_LOCATION",
            data: true
            })
    }
}

const firstTimeCurrentLocReducer = (state=true, action) => {
    switch(action.type) {
        case 'RESET_FIRST_TIME_USER_LOCATION':
            return action.data
        case 'SET_FIRST_TIME_USER_LOCATION':
            return action.data
        default:
            return state
    }
}

export default firstTimeCurrentLocReducer