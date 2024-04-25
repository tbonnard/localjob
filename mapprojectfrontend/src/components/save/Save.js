
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../../reducers/notificationTempReducer'
import { addSave, removeSave, checkSave } from '../../reducers/saveReducer';

import '../../styles/header.css'
import '../../styles/buttons.css'

import saveIcon from '../../media/save.png'
import savedIcon from '../../media/saved.png'

import ReactGA from 'react-ga';


const Save = ({project}) => {
    
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const savedJobs = useSelector(state => state.savedJobs)

  const [projectSaved, setProjectSaved] = useState({})
  const [projectSavedFlag, setProjectSavedFlag] = useState(false)

  useEffect(() => {
    let count = 0
    for (const i in savedJobs) {
      if (savedJobs[i].job === project.id) {
        count = count + 1
        setProjectSaved(savedJobs[i])
      } 
    } 
    if (count > 0) {
      setProjectSavedFlag(true)
    } 
    else {
      setProjectSavedFlag(false)
    }
  },[project, savedJobs])



  const handleClickSave = () => {       
    ReactGA.event({
      category: 'Button',
      action: 'Save Job',
      label: project.id,
    }); 
    dispatch(addSave({user:user.uuid, job:project.id}))
    dispatch(setNotification({message:'emploi sauvegardé', style:'success', time:4000}))
  }

  const handleClickUnsave = () => {
    ReactGA.event({
      category: 'Button',
      action: 'Unsave Job',
      label: project.id,
    }); 
    dispatch(removeSave(projectSaved.id))
    dispatch(setNotification({message:'emploi retiré', style:'success', time:4000}))
  }

  const handleSetNotifNotLoggedIn = () => {
    dispatch(setNotification({message:'merci de vous connecter pour sauvegarder un emploi', style:'error', time:5000}))
  }

  return (
    <div className='saveDiv'>

    {!user ?  
        <img className='iconProjectSave' onClick={handleSetNotifNotLoggedIn} src={saveIcon} alt="Sauvegarder" title="Sauvegarder"/> 
        // <button className='buttonTier' onClick={handleSetNotifNotLoggedIn} title={`Sauvegarder ${project.title}`}>sauvegarder</button>
        :     
        <div>
          { projectSavedFlag ? 
            // <button className='buttonTier' onClick={handleClickUnsave} title={`Retirer ${project.title}`}>retirer</button>
            <img className='iconProjectSave' src={savedIcon} onClick={handleClickUnsave} alt="Retirer" title="Retirer"/> 
            : 
            // <button className='buttonTier' onClick={handleClickSave} title={`Sauvegarder ${project.title}`}>sauvegarder</button>
            <img className='iconProjectSave' src={saveIcon}  onClick={handleClickSave} alt="Sauvegarder" title="Sauvegarder"/> 
            }
        </div>
      }
      
    </div>
  )
}

export default Save

