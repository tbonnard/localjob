
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Project from '../project/Project';

import { followPropertiesGetProjects } from '../../reducers/followPropertiesGetProjectsReducer';
import { getNearbyProjectsfromProperties } from '../../reducers/allProjectsNearbyPropertiesReducer';
import { setTab } from '../../reducers/tabHomeReducer';

import '../../styles/follow.css'


const FollowItemsProjects = () => {
    
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const tabHome = useSelector(state => state.tabHome)

  const propertiesCurrentRoot =  useSelector(state => state.mapQuery)
  const allNearbyPropertyProjects = useSelector(state => state.allProjectsNearbyProperties)

  const followUserPropertyProjects = useSelector(state => state.followPropertiesGetProjects)

  const currentCommerce =  useSelector(state => state.property)
  const currentCommerceJob =  useSelector(state => state.projects)

  const [jobsToShow, setJobsToShow] = useState([])


  const handleTabButton = (ind) => {
    if (ind ===2) {
      dispatch(setTab(2))
      setJobsToShow(followUserPropertyProjects)
    } else if (ind === 1) {
      dispatch(setTab(1))
      setJobsToShow(allNearbyPropertyProjects)
    } else if (ind === 0) {
      dispatch(setTab(0))
      setJobsToShow(currentCommerceJob)
    }
  }

  
  // From all nearly businesses, fetch jobs
  useEffect(() => {
    if (propertiesCurrentRoot.length > 0) {
      let propertiesCurrentDB = []
      for (const i in propertiesCurrentRoot) {
        if (propertiesCurrentRoot[i].id) {
          propertiesCurrentDB.push(propertiesCurrentRoot[i])
        }
      }
      dispatch(getNearbyProjectsfromProperties(propertiesCurrentDB))
      // console.log(propertiesCurrentDB)
    }
  },[propertiesCurrentRoot, dispatch])

  
  // once new nearly jobs fetched, refresh
  useEffect(() => {
    setJobsToShow(allNearbyPropertyProjects)
  },[allNearbyPropertyProjects])


     // jobs from specific business fetched, refresh
  useEffect(() => {
    setJobsToShow(currentCommerceJob)
  },[currentCommerceJob])

   // jobs from followed business fetched, refresh
    useEffect(() => {
      if (user) {
        dispatch(followPropertiesGetProjects({user:user.uuid }))
      }
    },[user, dispatch])
    
  

  return (
    <div className='projectsList'>

      <div className='buttonTabFollowedItems'>
        {currentCommerce.length ===0 || currentCommerce.length >1 ? <></> : <button className={tabHome === 0 ? 'buttonTier selectedTab' : 'buttonTier'} onClick={() => handleTabButton(0)}>
             {currentCommerce.name}
            </button>}
            <div className='marginMiddle'></div>
          <button className={tabHome === 1 ? 'buttonTier selectedTab' : 'buttonTier'} onClick={() => handleTabButton(1)}>Emplois à proximité</button>
          <div className='marginMiddle'></div>
          {user && <button className={tabHome === 2 ? 'buttonTier selectedTab' : 'buttonTier'} onClick={() => handleTabButton(2)}>Commerces suivis</button>  }
          </div>
          
      
      {jobsToShow.length > 0 ? 
        jobsToShow.map((proj, ind) => <Project key={proj.id} item={proj} source={1}/> )
      :
        <div className='noJobZone'>
          {currentCommerce.name ?
          <p>pas d'emploi actuellement pour {currentCommerce.name}</p>
          :
          <p>pas d'emploi dans les commerces dans cette zone, bouger la carte</p>
          }
        </div>       
      }

    </div>
  )

}

export default FollowItemsProjects

