import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import '../../styles/map.css'

import { setNotification } from '../../reducers/notificationTempReducer'
import { setBounds } from '../../reducers/boundsReducer';
import { resetItemToSearch } from '../../reducers/searchReducer';


import MapOpen from './MapOpen'
import CurrentLocation from './CurrentLocation';
import FollowItemsProjects from '../follow/FollowItemsProjects';


const MapOpenGlobal = () => {

      const dispatch = useDispatch()
  
      const mapQueryData = useSelector(state => state.mapQuery)
      const loadingFlag = useSelector(state => state.loadingFlag.loadingFlag)
      const searchItemvalue = useSelector(store => store.searchItem)

      const [mapData, setMapData ] = useState([])
 
      const defaultCityCoordinates = {'latitude':45.5019, 'longitude':-73.5674}


      useEffect(() => {
            setMapData(mapQueryData)
            if (mapQueryData.length > 0) {
                  if (searchItemvalue) {
                        let newBounds = []
                        mapQueryData.map((item) =>newBounds.push([item.lat, item.lon]) )
                        dispatch(setBounds(newBounds))
                        dispatch(resetItemToSearch())
                  }
              
            } else {
                  if (loadingFlag) {
                        dispatch(setNotification({message:'aucun résultat', style:'warning', time:5000}))
                  }
            }
      }, [mapQueryData, dispatch])

      
  return (
      <div className='divSearchMap'>
            <CurrentLocation defaultCoordinates={defaultCityCoordinates} />

            <div className='mapGlobal' id='map' >
                  <MapOpen mapQueryData={mapData} />
            </div>

            <div className='feedsHome'>
                  <FollowItemsProjects />
            </div>
      </div>

      
  )
}

export default MapOpenGlobal