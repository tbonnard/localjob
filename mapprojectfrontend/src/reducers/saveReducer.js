import saveServices from '../services/saveServices'


export const checkSave = (itemObject) => {
    return async dispatch => {
        const saves = await saveServices.checkSave(itemObject)
        dispatch({
            type: "CHECK_SAVE",
            data: saves
            })
    }
}

export const removeSave = (project) => {
    return async dispatch => {
        await saveServices.removeSave(project)
        dispatch({
            type: "REMOVE_SAVE",
            data: project
            })
    }
}

export const addSave = (itemObject) => {
    return async dispatch => {
        const save = await saveServices.addSave(itemObject)
        dispatch({
            type: "ADD_SAVE",
            data: save
            })
    }
}


const saveReducer = (state=[], action) => {
    switch(action.type) {
        case 'CHECK_SAVE':
            return action.data
        case 'REMOVE_SAVE':
            const newState = state.filter((item) => item.id !==action.data )
            return newState
        case 'ADD_SAVE':
            return [
                ...state,
                action.data
              ];
        default:
            return state
    }
}

export default saveReducer