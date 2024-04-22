export const setTab = (id) => {
    return async dispatch => {
        dispatch({
            type: "SET_TAB_HOME",
            data: id
            })
    }
}

const tabHomeReducer = (state=1, action) => {
    switch(action.type) {
        case 'SET_TAB_HOME':
            return action.data
        default:
            return state
    }
}

export default tabHomeReducer