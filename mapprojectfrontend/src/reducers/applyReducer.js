import applyServices from '../services/applyServices'


export const checkApply = (itemObject) => {
    return async dispatch => {
        const saves = await applyServices.checkApply(itemObject)
        dispatch({
            type: "CHECK_APPLY",
            data: saves
            })
    }
}

export const removeApply = (project) => {
    return async dispatch => {
        await applyServices.removeApply(project)
        dispatch({
            type: "REMOVE_APPLY",
            data: project
            })
    }
}

export const addApply = (itemObject) => {
    return async dispatch => {
        const save = await applyServices.addApply(itemObject)
        dispatch({
            type: "ADD_APPLY",
            data: save
            })
    }
}


const applyReducer = (state=[], action) => {
    switch(action.type) {
        case 'CHECK_APPLY':
            return action.data
        case 'REMOVE_APPLY':
            const newState = state.filter((item) => item.id !==action.data )
            return newState
        case 'ADD_APPLY':
            return [
                ...state,
                action.data
              ];
        default:
            return state
    }
}

export default applyReducer