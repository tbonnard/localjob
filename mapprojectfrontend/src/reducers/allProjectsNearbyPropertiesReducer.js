import projectServices from '../services/projectServices'

export const getNearbyProjectsfromProperties = (itemObject) => {
    return async dispatch => {
        let projects = await projectServices.getNearbyProjectsfromProperties(itemObject)
        if (itemObject.length === 0 ) {
            projects = []
        }
        dispatch({
            type: "NEARBY_PROJECTS",
            data: projects
            })
    }
}

export const addNearbyProject = (itemObject) => {
    return async dispatch => {
        dispatch({
            type: "NEW_NEARBY_PPROJECT",
            data: itemObject
            })     
    }
}

export const resetNearbyProjects = () => {
    return async dispatch => {
        dispatch({
            type: "RESET_NEARBY_PROJECTS",
            data: []
            })
    }
}



const allProjectsNearbyPropertiesReducer = (state=[], action) => {
    switch(action.type) {
        case 'NEARBY_PROJECTS':
            return action.data
        case 'RESET_NEARBY_PROJECTS':
            return action.data
        case 'NEW_NEARBY_PPROJECT':
            let newProjects = state.concat(action.data)
            newProjects.sort(function(a,b){
                return new Date(b.created) - new Date(a.created);
              });
              return newProjects
        default:
            return state
    }
}

export default allProjectsNearbyPropertiesReducer