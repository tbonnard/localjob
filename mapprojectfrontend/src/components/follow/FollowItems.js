
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { checkFollow } from '../../reducers/followReducer';

import '../../styles/follow.css'


const FollowItems = () => {
    
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const followedProperties = useSelector(state => state.followedProperties)

  useEffect(() => {
    if (user) {
      dispatch(checkFollow({follower:user.uuid }))
    }
  },[user, dispatch])

  // console.log(followedProperties)

  if (followedProperties.length === 0) {
    return  (<p className='infoText'>Aucun commerce suivi</p>)
}

  return (
    <div className='followedItems'>
      {followedProperties.map(foll => 
          <div key={foll.id} className='followedItem'>
              {foll.properties[0].name ? 
              <Link className='buttonFollowed' to={`/commerce/${foll.properties[0].uuid}`} title={foll.properties[0].display_name}>{foll.properties[0].name}</Link>
              :
              <Link className='buttonFollowed' to={`/commerce/${foll.properties[0].uuid}`} title={foll.properties[0].display_name}>{foll.properties[0].display_name.substring(0, 9)}</Link>
              }
          </div>
         )
      }
    </div>
  )
}

export default FollowItems

