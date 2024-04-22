
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { saveProjects } from '../../reducers/savedAppliedJobsReducer';
import { applyProjects } from '../../reducers/savedAppliedJobsReducer';

import Project from './Project';

const JobSavedApplied = () => {
  const dispatch = useDispatch()

  const jobs = useSelector(state => state.savedAppliedJobs)
  const user = useSelector(state => state.user)

  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = () => {
    setIsToggled(!isToggled)
  };


  useEffect(() => {
    dispatch(saveProjects(user))
  },[dispatch, user])


  useEffect(() => {
      if(isToggled) {
        dispatch(applyProjects(user))
      } else {
        dispatch(saveProjects(user))
      }
  },[isToggled])

  

  if (!jobs) {
    return null
  }

  if (jobs.length === 0) {
    return  (<p className='infoText'>Aucun emploi sauvegardé</p>)
}
  return (
    <div >
      {/* <div className='jobToggleDiv'>
        <div>
          <span className='infoText'>emplois sauvegardés</span>
        </div>
        <input className='toggle'
              type="checkbox"
              checked={isToggled}
              onChange={handleToggleChange}
            />
        <div>
          <span className='infoText'>appliqués</span>
        </div> 
      </div>*/}
        {jobs.map((job, ind) => <Project key={ind} item={job}/> )}
      
    </div>
  )
}

export default JobSavedApplied