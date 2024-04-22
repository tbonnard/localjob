
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../../reducers/notificationTempReducer'
import { addFollow, removeFollow, checkFollow } from '../../reducers/followReducer';

import '../../styles/header.css'
import '../../styles/buttons.css'

import notificationIcon from '../../media/notification.png'
import unfollowIcon from '../../media/unfollow.png'

import saveIcon from '../../media/save.png'
import savedIcon from '../../media/saved.png'
import saveWhiteIcon from '../../media/save_white.png'
import savedWhiteIcon from '../../media/saved_white.png'


const Follow = () => {
    
  const dispatch = useDispatch()

  const property = useSelector(state => state.property)
  const user = useSelector(state => state.user)
  const followedProperties = useSelector(state => state.followedProperties)
  
  const [propertyFollowed, setPropertyFollowed] = useState({})
  const [propertyFollowedFlag, setPropertyFollowedFlag] = useState(false)


  useEffect(() => {
    let count = 0
    for (const i in followedProperties) {
      if (followedProperties[i].property === property.id) {
        count = count + 1
        setPropertyFollowed(followedProperties[i])
      } 
    } 
    if (count > 0) {
      setPropertyFollowedFlag(true)
    } 
    else {
      setPropertyFollowedFlag(false)
    }
  },[property, followedProperties])


  useEffect(() => {
    if (user) {
      dispatch(checkFollow({follower:user.uuid }))
    }
  },[user, dispatch])



  const handleClickFollow = () => {        
    dispatch(addFollow({follower:user.uuid, property:property}))
    dispatch(setNotification({message:'commerce suivi', style:'success', time:4000}))
  }

  const handleClickUnfollow = () => {
    dispatch(removeFollow(propertyFollowed.id))
    dispatch(setNotification({message:'commerce non suivi', style:'success', time:4000}))
  }

  const handleSetNotifNotLoggedIn = () => {
    dispatch(setNotification({message:'merci de vous connecter pour suivre un commerce', style:'error', time:5000}))
  }


  return (
    <div>

    {!user ?  
        // <button className=' ' onClick={handleSetNotifNotLoggedIn} title={`Follow ${property.display_name}`}>suivre</button>
        <img className='iconProjectSave' onClick={handleSetNotifNotLoggedIn} src={saveIcon}  alt={`Suivre ${property.display_name}`} title={`Suivre ${property.display_name}`}/> 
        :
        <div>
          { propertyFollowedFlag ? 
            // <button className=' ' onClick={handleClickUnfollow} title={`Unfollow ${property.display_name}`}>ne plus suivre</button>
            <img className='iconProjectSave' onClick={handleClickUnfollow} src={savedIcon} alt={`Ne plus suivre ${property.display_name}`} title={`Ne plus suivre ${property.display_name}`}/> 
            : 
            <img className='iconProjectSave' onClick={handleClickFollow} src={saveIcon} alt={`Suivre ${property.display_name}`} title={`Suivre ${property.display_name}`}/> 
            // <button className=' ' onClick={handleClickFollow} title={`Follow ${property.display_name}`}>suivre</button>
            }
        </div>
      }
      
    </div>
  )
}

export default Follow

