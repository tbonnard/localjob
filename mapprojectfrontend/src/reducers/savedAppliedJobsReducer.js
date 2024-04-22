import saveServices from '../services/saveServices'
import applyServices from '../services/applyServices'


// 0 === get saved items otherwise, applied items

export const saveProjects = (user) => {
    return async dispatch => {
        const savedJobs = await saveServices.checkSaveUserProjects(user)     
        dispatch({
            type: "GET_PROJECTS_SAVED",
            data: savedJobs
            })
    }
}


export const applyProjects = (user) => {
    return async dispatch => {
        const appliedJobs = await applyServices.checkApplyUserProjects(user)
        dispatch({
            type: "GET_PROJECTS_APPLIED",
            data: appliedJobs
            })
    }
}

const savedAppliedJobsReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_PROJECTS_SAVED':
            return action.data
        case 'GET_PROJECTS_APPLIED':
            return action.data
        default:
            return state
    }
}

export default savedAppliedJobsReducer