// format {message:'bonjour', style:'error'} or style =success or style warning
//donner le time voulu en param


export const setNotification = (messageInfo) => {
    return async dispatch => {
        dispatch(resetNotif())
        dispatch({
            type:'SET_NOTIF',
            data:messageInfo
        })
        setTimeout(() => {
            dispatch(resetNotif())
          }, messageInfo.time)
    }
}

export const resetNotif = () => {
    return async dispatch => {
        dispatch({
            type: "RESET_NOTIF",
            data: null
            })
    }
}

const notificationTempReducer = (state=null, action) => {
    switch (action.type) {
        case "SET_NOTIF":
            return action.data    
        case "RESET_NOTIF":
            return action.data 
        default:
            return state;
    }
}

export default notificationTempReducer