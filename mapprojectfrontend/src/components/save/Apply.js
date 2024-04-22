
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../../reducers/notificationTempReducer'
import { addApply, removeApply, checkApply } from '../../reducers/applyReducer';

import '../../styles/header.css'
import '../../styles/buttons.css'


const Apply = ({project}) => {
    
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const appliedJobs = useSelector(state => state.appliedJobs)

  const [projectApplied, setProjectApplied] = useState({})
  const [projectAppliedFlag, setProjectAppliedFlag] = useState(false)

  useEffect(() => {
    let count = 0
    for (const i in appliedJobs) {
      if (appliedJobs[i].job === project.id) {
        count = count + 1
        setProjectApplied(appliedJobs[i])
      } 
    } 
    if (count > 0) {
      setProjectAppliedFlag(true)
    } 
    else {
      setProjectAppliedFlag(false)
    }
  },[project, appliedJobs])


  useEffect(() => {
    if (user) {
      dispatch(checkApply({user:user.id }))
    }
  },[user, dispatch])



  const handleClickApply = () => {        
    dispatch(addApply({user:user.id, job:project.id}))
    dispatch(setNotification({message:'emploi appliqué', style:'success', time:4000}))
  }

  const handleClickUnapply = () => {
    dispatch(removeApply(projectApplied.id))
    dispatch(setNotification({message:'application enlevée', style:'success', time:4000}))
  }

  const handleSetNotifNotLoggedIn = () => {
    dispatch(setNotification({message:'merci de vous connecter pour appliquer à un emploi', style:'error', time:5000}))
  }

  return (
    <div >

    {!user ?  
        <button className='buttonTier' onClick={handleSetNotifNotLoggedIn} title={`Sauvegarder ${project.title}`}>appliquer</button>
        :     
        <div>
          { projectAppliedFlag ? 
            <button className='buttonTier' onClick={handleClickUnapply} title={`Retirer ${project.title}`}>ne plus appliquer</button>
            : 
            <button className='buttonTier' onClick={handleClickApply} title={`Sauvegarder ${project.title}`}>appliquer</button>
            }
        </div>
      }
      
    </div>
  )
}

export default Apply

