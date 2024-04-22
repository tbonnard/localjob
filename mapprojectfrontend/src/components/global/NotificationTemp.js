// exemple : dispatch(setNotification({message:'you must be logged in to follow that place', style:'warning', time:6000}))

import React from 'react';
import { useSelector } from 'react-redux'

import '../../styles/notificationTemp.css'

const NotificationTemp = () => {

    const message = useSelector(state => state.notificationTemp)

    if (!message) {
        return null
    }
  return (
    <div className='notifGlobal' style={{backgroundColor: message.style}}>
        <p className={`${message.style} notif`}>
            {message.message}
        </p>
    </div>
  )
}

export default NotificationTemp
