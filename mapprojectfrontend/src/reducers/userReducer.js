import userServices from '../services/userServices'


import { setNotification } from './notificationTempReducer'
import { setLoading } from './loadingReducer'
import { checkSave } from './saveReducer'

export const userLogin = (credentials) => {
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const user = await userServices.loginUser(credentials)
            document.cookie = `jwtTk=${user.jwt}; Path=/ ; samesite=Lax`
            localStorage.setItem('userMapProjectDetails', JSON.stringify(user.user))
            dispatch({
                    type: "USER_LOGIN",
                    data: user.user
                })
            dispatch(setNotification({message:'Bonjour', style:'success', time:10000}))
        } catch(exception) {
            dispatch(setNotification({message:'Mauvaise combinaison de connexion', style:'error', time:5000}))
        }
        dispatch(setLoading(false))
    }
}

export const createAccount = (accountObject) => {
    return async dispatch => {
        dispatch(setLoading(true))
        try {
            const newUser = await userServices.createAccount(accountObject)
            document.cookie = `jwtTk=${newUser.jwt}; Path=/ ; samesite=Lax`
            localStorage.setItem('userMapProjectDetails', JSON.stringify(newUser.user))
            dispatch({
                type: "USER_CREATE_ACCOUNT",
                data: newUser.user
            })
            dispatch(setLoading(false))
            // if (newUser) {
            //     user = await userServices.loginUser({ email:accountObject.email, password:accountObject.password })
            //     userDetails = await userServices.userDetails()
            // }
            // dispatch({
            //     type: "USER_CREATE_ACCOUNT",
            //     data: userDetails
            // })
        } catch(exception) {
            // console.log(exception)
            // dispatch(setNotification({message:"erreur lors de l'édition", style:'error', time:10000}))
            if (exception.response && exception.response.data) {
                let errorMessage = '';
            
                if (exception.response.data.password) {
                    errorMessage += exception.response.data.password[0];
                }
            
                if (exception.response.data.email) {
                    errorMessage += (errorMessage ? ' ' : '') + exception.response.data.email[0];
                }
            
                dispatch(setNotification({ message: errorMessage || "Erreur lors de la création", style: 'error', time: 5000 }))
            } else {
                dispatch(setNotification({ message: "erreur lors de la création", style: 'error', time: 5000 }))
            }
            throw exception
        }
    }
}


export const getUserInfo = () =>{
    return async dispatch => {
        let userDetails = null
        if (localStorage.getItem('userMapProjectDetails')) {
            if (document.cookie.replace(/(?:(?:^|.*;\s*)jwtTk\s*=\s*([^;]*).*$)|^.*$/, '$1')) {
                userDetails =localStorage.getItem('userMapProjectDetails')
                const userJsonParsed = JSON.parse(userDetails)
                let userToCheck = await userServices.userDetails(userJsonParsed.uuid)
                if (userToCheck) {
                    userDetails = userToCheck
                } else {
                    dispatch(logoutUser());
                }        
            } else {
                dispatch(logoutUser());
            } }
        dispatch({
            type: "GET_USER_INFO",
            data: userDetails
        })
        if(userDetails) {
            dispatch(checkSave({user:userDetails.uuid }))
        }
        
    }
}


export const logoutUser = () => {
    return async dispatch => {
        await userServices.logoutUser()
        document.cookie = "jwtTk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        localStorage.removeItem("userMapProjectDetails")
        dispatch({
            type: "LOGOUT_USER",
            data: null
            })
        dispatch(setNotification({message:'Bonne journée', style:'success', time:10000}))

    }
}


export const expiredToken = () => {
    return async dispatch => {
        dispatch({
            type: "EXPIRED_TOKEN_USER",
            data: null
            })
            dispatch(logoutUser())
            dispatch(setNotification({message:'Merci de vous reconnecter', style:'warning', time:10000}))
    }
}

export const userEdit = (user) => {
    return async dispatch => {
        try {
            const userItem = await userServices.userEdit(user)
            dispatch({
                type: "EDIT_USER",
                data: userItem
                })
            dispatch(setNotification({message:'profil édité', style:'success', time:10000}))
        } catch(exception) {
            // console.log(exception)
            // dispatch(setNotification({message:"erreur lors de l'édition", style:'error', time:10000}))
            if (exception.response && exception.response.data && exception.response.data.password) {
                dispatch(setNotification({ message: exception.response.data.password[0], style: 'error', time: 5000 }))
            } else {
                dispatch(setNotification({ message: "erreur lors de l'édition", style: 'error', time: 5000 }))
            }
            throw exception
        }

    }
}

const userReducer = (state=null, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            return action.data
        case 'EDIT_USER':
            return action.data
        case 'EXPIRED_TOKEN_USER':
            return action.data
        case 'LOGOUT_USER':
            return action.data
        case 'GET_USER_INFO':
            return action.data
        case 'USER_CREATE_ACCOUNT':
            return action.data
        default:
            return state
    }

}

export default userReducer