import mapQueryServices from '../services/mapQueryServices'

import { setNotification } from './notificationTempReducer'
import { setLoading } from './loadingReducer'
import { setLongLoading } from './loadingReducer'
import { setItemToSearch } from './searchReducer'
import { setBounds } from './boundsReducer'
import { setPositionCenter } from './centerPositionReducer'

export const getMapQueryData = (parameterData) => {
    return async dispatch => {
        dispatch(setLoading(true))
        const propertyItem = await mapQueryServices.getMapQueryData(parameterData)
        // console.log(propertyItem)
        dispatch({
            type: "MAP_QUERY",
            data: propertyItem
            })
            if (propertyItem.length === 0) {
                dispatch(setNotification({message:'aucun résultat', style:'warning', time:5000}))
            } else {
                dispatch(getMapQueryDataDBData(propertyItem))
                // dispatch(setNotification({message:'Only results exactly matching are displayed! For other near places with suggestions, click on the "near button"', style:'success', time:7000}))
            }
            dispatch(setLoading(false))
        }
}


export const getMapQueryDataParameter = (parameterData) => {
    return async dispatch => {
        dispatch(setLoading(true))
        let propertyItem = await mapQueryServices.getMapQueryDataParameter(parameterData)
        if (!propertyItem) {
            propertyItem = []
        }
        // console.log(propertyItem)
        dispatch({
            type: "MAP_QUERY_PARAMETER",
            data: propertyItem
            })
            if (propertyItem.length === 0) {
                dispatch(setNotification({message:'aucun résultat', style:'warning', time:5000}))
            } else {
                if (propertyItem.length ===1 ) {
                    dispatch(setPositionCenter(propertyItem[0].lat,propertyItem[0].lon))
                } else {
                    let newBounds = []
                    propertyItem.map((item) =>newBounds.push([parseFloat(item.lat), parseFloat(item.lon)]) )
                    // console.log("BOUNDS SEARCH", newBounds)
                    dispatch(setBounds(newBounds))
            } 
        }
            dispatch(setLoading(false))
        }
}


export const getMapQueryDataSearchNearLocation = (itemObject) => {
    return async dispatch => {
        dispatch(setLoading(true))
        // console.log(itemObject)
        let propertyItem = await mapQueryServices.getMapQueryDataSearchNearLocation(itemObject)
        if (!propertyItem) {
            propertyItem = []
        }
        dispatch({
            type: "MAP_QUERY_USER_LOCATION",
            data: propertyItem
            })
            if (propertyItem.length === 0) {
                dispatch(setNotification({message:'aucun résultat dans un rayon de 10km', style:'warning', time:5000}))
            } 
            dispatch(setLoading(false))

    }
}


export const getMapQueryDataDBData = (parameterData) => {
    return async dispatch => {
        dispatch(setLoading(true))
        const propertyItem = await mapQueryServices.getMapQueryDataDBData(parameterData)
        dispatch({
            type: "MAP_QUERY_DB_DATA",
            data: propertyItem
            })
            if (propertyItem.length === 0) {
                dispatch(setNotification({message:'aucun résultat dans un rayon de 10km', style:'warning', time:5000}))
            }
            dispatch(setLoading(false))
    }
}



export const getMapQueryDataAroundSpecificCoordinateParameter = (itemObject) => {
    return async dispatch => {
        dispatch(setLoading(true))
        let propertyItem = await mapQueryServices.getMapQueryDataAroundSpecificCoordinateParameter(itemObject)
        
        // let newObjects = []
        // let typesIds = ''
        // for (const i in propertyItem['elements']) {
        //     if (typesIds.length === 0) {
        //         typesIds = propertyItem['elements'][i]['type'].charAt(0).toUpperCase()+propertyItem['elements'][i]['id'] 
        //     } else {
        //         typesIds = typesIds + ',' + propertyItem['elements'][i]['type'].charAt(0).toUpperCase()+propertyItem['elements'][i]['id'] 
        //     }       
        // }

        // let newObjectOSM = await mapQueryServices.getItemsIdsToOSM(typesIds)
        
        // if (!newObjectOSM) {

        //     for (const i in propertyItem['elements']) {
        //         const typeId = propertyItem['elements'][i]['type'].charAt(0).toUpperCase()+propertyItem['elements'][i]['id']
        //         newObjectOSM = await mapQueryServices.getItemsIdsToOSM(typeId)
        //         if (newObjectOSM) {
        //             newObjects.push(newObjectOSM[0])
        //         }
        //     }
        // } else {
        //     newObjects = newObjectOSM
        // }

        if (!propertyItem)  {
            propertyItem = []
         }

        dispatch({
            type: "MAP_QUERY_AROUND_CENTER_PARAMETER",
            data: propertyItem
            })
            dispatch(getMapQueryDataDBData(propertyItem))
            dispatch(setLoading(false))
    }
}



export const getMapQueryDataAroundCenterAll = (parameterData) => {
    return async dispatch => {
        dispatch(setLongLoading(true))
        const propertyItem = await mapQueryServices.getMapQueryDataAroundCenterAll(parameterData)
        let newObjects = []
        let typesIds = ''
        for (const i in propertyItem['elements']) {
            if (typesIds.length === 0) {
                typesIds = propertyItem['elements'][i]['type'].charAt(0).toUpperCase()+propertyItem['elements'][i]['id'] 
            } else {
                typesIds = typesIds + ',' + propertyItem['elements'][i]['type'].charAt(0).toUpperCase()+propertyItem['elements'][i]['id'] 
            }       
        }
            
        let newObjectOSM = await mapQueryServices.getItemsIdsToOSM(typesIds)
        
        if (!newObjectOSM) {

            for (const i in propertyItem['elements']) {
                const typeId = propertyItem['elements'][i]['type'].charAt(0).toUpperCase()+propertyItem['elements'][i]['id']
                newObjectOSM = await mapQueryServices.getItemsIdsToOSM(typeId)
                if (newObjectOSM.length > 0) {
                    newObjects.push(newObjectOSM[0])
                }
            }
        } else {
            newObjects = newObjectOSM
        }

        dispatch({
            type: "MAP_QUERY_AROUND_CENTER_ALL",
            data: newObjects
            })
            dispatch(getMapQueryDataDBData(newObjects))
            dispatch(setLoading(false))
    }
}

export const resetMapQuery = () => {
    return async dispatch => {
        dispatch({
            type: "RESET_MAP_QUERY",
            data: []
            })
    }
}

export const getNewCreatedMapQuery = (item) => {
    return async dispatch => {
        // console.log(item)
        dispatch({
            type: "NEW_CREATED_MAP_QUERY",
            data: item
            })
        dispatch(setItemToSearch(item[0].name))
    }
}

const mapQueryReducer = (state=[], action) => {
    switch(action.type) {
        case 'MAP_QUERY':
            return action.data
        case 'RESET_MAP_QUERY':
                return action.data
        case 'NEW_CREATED_MAP_QUERY':
            return action.data
        case 'MAP_QUERY_PARAMETER':
            return action.data
        case 'MAP_QUERY_USER_LOCATION':
            return action.data
        case 'MAP_QUERY_DB_DATA':
            return action.data
        case 'MAP_QUERY_AROUND_CENTER_ALL':
            return action.data
        case 'MAP_QUERY_AROUND_CENTER_PARAMETER':
            return action.data
        default:
            return state
    }
}

export default mapQueryReducer

