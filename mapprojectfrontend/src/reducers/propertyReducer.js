import propertyServices from '../services/propertyServices'
import { getNewCreatedMapQuery } from './mapQueryReducer'

import { setNotification } from './notificationTempReducer'

import { getProjectsfromProperty } from './projectReducer'
import { setTab } from './tabHomeReducer'

export const propertyCreation = (property) => {
    return async dispatch => {
        try {
            const propertyItem = await propertyServices.propertyCreation(property)
            dispatch({
                type: "PROPERTY",
                data: propertyItem
                })
            dispatch(getNewCreatedMapQuery([propertyItem]))
            dispatch(setNotification({message:'commerce créé', style:'success', time:10000}))
            return propertyItem.uuid
        } catch(exception) {
            dispatch(setNotification({message:'erreur lors de la création', style:'error', time:10000}))
        }

    }
}

export const propertyEdit = (property) => {
    return async dispatch => {
        try {
            const propertyItem = await propertyServices.propertyEdit(property)
            dispatch({
                type: "EDIT_PROPERTY",
                data: propertyItem
                })
            dispatch(setNotification({message:'commerce édité', style:'success', time:10000}))
        } catch(exception) {
            // console.log(exception)
            dispatch(setNotification({message:"erreur lors de l'édition", style:'error', time:10000}))
            throw exception
        }

    }
}

export const setPropertyItem = (itemObject) => {
    return async dispatch => {
        let newItem = itemObject
        const propertyItem = await propertyServices.checkIfPropertyCreated(itemObject)
        if (propertyItem) {
            newItem = propertyItem
            localStorage.setItem('propertyProjectApp', JSON.stringify(propertyItem));
        } else {
            localStorage.setItem('propertyProjectApp', JSON.stringify(newItem));
        }
        dispatch({
            type: "SET_PROPERTY_ITEM",
            data: newItem
            })
        dispatch(setTab(0))
    }
}

export const getPropertyDetails = (uuid) => {
    return async dispatch => {
        const propertyItem = await propertyServices.getPropertyDetails(uuid)
        dispatch({
            type: "GET_PROPERTY_DETAILS",
            data: propertyItem
            })
            dispatch(getProjectsfromProperty(propertyItem))
    }
}

export const getPropertyOwner = (uuid) => {
    return async dispatch => {
        const propertyItem = await propertyServices.getPropertyOwner(uuid)
        dispatch({
            type: "GET_PROPERTY_OWNER",
            data: propertyItem
            })
    }
}

export const propertyItem = (itemObject) => {
    return async dispatch => {
        dispatch({
            type: "TEMP_PROPERTY_SELECTED",
            data: itemObject
            })
    }
}

export const resetProperty = () => {
    return async dispatch => {
        dispatch({
            type: "RESET_PROPERTY",
            data: []
            })
        dispatch(setTab(1))
    }
}

const propertyReducer = (state=[], action) => {
    switch(action.type) {
        case 'PROPERTY':
            return action.data
        case 'EDIT_PROPERTY':
            return action.data
        case 'TEMP_PROPERTY_SELECTED':
            return action.data
        case 'SET_PROPERTY_ITEM':
                return action.data
        case 'GET_PROPERTY_OWNER':
                return action.data
        case 'RESET_PROPERTY':
            return action.data
        case 'GET_PROPERTY_DETAILS':
            return action.data
        default:
            return state
    }
}

export default propertyReducer