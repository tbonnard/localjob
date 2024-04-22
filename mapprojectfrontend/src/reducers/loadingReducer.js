
export const setLoading = (flag) => {
    return async dispatch => {
        dispatch({
            type: "LOADING",
            data: flag
            })
    }
}

export const setLongLoading = (flag) => {
    return async dispatch => {
        dispatch({
            type: "LONG_LOADING",
            data: flag
            })
    }
}

const loadingReducer = (state={loading:false, longLoading:false}, action) => {
    switch(action.type) {
        case 'LOADING':
            const newState = {loading:action.data, longLoading:false}
            return newState
        case 'LONG_LOADING':
            const newStateLong = {loading:action.data, longLoading:action.data}
            return newStateLong
        default:
            return state
    }
}

export default loadingReducer