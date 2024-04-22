export const setItemToSearch = (item) => {
    return async dispatch => {
        dispatch({
            type: "SEARCH_ITEM",
            data: item
            })
    }
}

export const resetItemToSearch = () => {
    return async dispatch => {
        dispatch({
            type: "RESET_SEARCH_ITEM",
            data: null
            })
    }
}

const searchReducer = (state=null, action) => {
    switch(action.type) {
        case 'RESET_SEARCH_ITEM':
            return action.data
        case 'SEARCH_ITEM':
            return action.data
        default:
            return state
    }
}

export default searchReducer