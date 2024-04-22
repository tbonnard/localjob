import projectServices from '../services/projectServices'

import { setPropertyItem } from './propertyReducer'
import { setNotification } from './notificationTempReducer'


export const getProjectsfromProperty = (itemObject) => {
    return async dispatch => {
        const projects = await projectServices.getProjectsfromProperty(itemObject)
        dispatch({
            type: "PROJECTS",
            data: projects
            })
    }
}

export const createProject = (itemObject) => {
    return async dispatch => {
        try{    
            const project = await projectServices.createProject(itemObject)
            dispatch({
                type: "NEW_PROJECT",
                data: project
                })
                dispatch(setPropertyItem(itemObject['property']));
                window.scrollTo({left: 0, top:0,  behavior: "smooth"});
                dispatch(setNotification({message:'emploi créé', style:'success', time:10000}))
        } catch(exception) {
            dispatch(setNotification({message:'erreur lors de la création', style:'error', time:10000}))
        }
    }
}

export const resetProjects = () => {
    return async dispatch => {
        dispatch({
            type: "RESET_PROJECTS",
            data: []
            })
    }
}

export const getProjectDetails = (uuid) => {
    return async dispatch => {
        const propertyItem = await projectServices.getProjectDetails(uuid)
        dispatch({
            type: "GET_PROJECT_DETAILS",
            data: propertyItem
            })
    }
}

export const editProject = (project) => {
    return async dispatch => {
        try {
            const projectItem = await projectServices.editProject(project)
            dispatch({
                type: "EDIT_PROJECT",
                data: projectItem
                })
            dispatch(setNotification({message:'emploi édité', style:'success', time:10000}))
        } catch(exception) {
            // console.log(exception)
            dispatch(setNotification({message:"erreur lors de l'édition", style:'error', time:10000}))
            throw exception
        }

    }
}

const projectReducer = (state=[], action) => {
    switch(action.type) {
        case 'PROJECTS':
            return action.data
        case 'EDIT_PROJECT':
            return action.data
        case 'RESET_PROJECTS':
            return action.data
        case 'GET_PROJECT_DETAILS':
            return action.data
        case 'NEW_PROJECT':
            let newProjects = state.concat(action.data)
            newProjects.sort(function(a,b){
                return new Date(b.created) - new Date(a.created);
              });
              return newProjects
        default:
            return state
    }
}

export default projectReducer