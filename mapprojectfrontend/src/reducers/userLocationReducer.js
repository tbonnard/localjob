
export const setUserLocationFlag = (flag) => {
    return async dispatch => {
        dispatch({
            type: "USER_LOCATION_FLAG",
            data: flag
            })
    }
}

const userLocationReducer = (state=false, action) => {
    switch(action.type) {
        case 'USER_LOCATION_FLAG':
            return action.data
        default:
            return state
    }
}

export default userLocationReducer