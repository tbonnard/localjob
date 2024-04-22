import followServices from '../services/followServices'

export const followPropertiesGetProjects = (itemObject) => {
    return async dispatch => {
        const follow = await followServices.checkFollowUserPropertyProjects(itemObject)
        dispatch({
            type: "GET_PROJETS_FOLLOWED_PROPERTIES",
            data: follow
            })
    }
}



const followPropertiesGetProjectsReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_PROJETS_FOLLOWED_PROPERTIES':
            return action.data
        default:
            return state
    }
}

export default followPropertiesGetProjectsReducer