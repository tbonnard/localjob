import propertyServices from '../services/propertyServices'


export const getPropertyOwner = (uuid) => {
    return async dispatch => {
        const propertyItem = await propertyServices.getPropertyOwner(uuid)
        dispatch({
            type: "GET_PROPERTY_OWNER",
            data: propertyItem
            })
    }
}

const userPropertyReducer = (state=[], action) => {
    switch(action.type) {
        case 'GET_PROPERTY_OWNER':
            return action.data
        default:
            return state
    }
}

export default userPropertyReducer