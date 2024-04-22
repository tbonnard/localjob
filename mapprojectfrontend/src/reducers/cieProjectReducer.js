import projectServices from '../services/projectServices'

export const getProjectsfromProperty = (itemObject) => {
    return async dispatch => {
        const projects = await projectServices.getProjectsfromProperty(itemObject)
        dispatch({
            type: "CIE_PROJECT",
            data: projects
            })
    }
}

export const getProjectsfromPropertyActiveOrNot= (itemObject) => {
    return async dispatch => {
        const projects = await projectServices.getProjectsfromPropertyActiveOrNot(itemObject)
        dispatch({
            type: "CIE_PROJECT_ACTIVE_NOT",
            data: projects
            })
    }
}


const cieProjectReducer = (state=[], action) => {
    switch(action.type) {
        case 'CIE_PROJECT':
            return action.data
        case 'CIE_PROJECT_ACTIVE_NOT':
            return action.data
        default:
            return state
    }
}

export default cieProjectReducer