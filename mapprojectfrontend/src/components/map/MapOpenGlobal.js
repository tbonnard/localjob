import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import '../../styles/map.css'

import { setNotification } from '../../reducers/notificationTempReducer'
import { setBounds } from '../../reducers/boundsReducer';
import { resetItemToSearch } from '../../reducers/searchReducer';
import { setFirstTimeUserLocation } from '../../reducers/firstTimeCurrentLocReducer';

import MapOpen from './MapOpen'
import CurrentLocation from './CurrentLocation';
import FollowItemsProjects from '../follow/FollowItemsProjects';


const MapOpenGlobal = () => {

      const dispatch = useDispatch()
  
      const mapQueryData = useSelector(state => state.mapQuery)
      const loadingFlag = useSelector(state => state.loadingFlag.loadingFlag)
      const searchItemvalue = useSelector(store => store.searchItem)
      const firstTimeCurrentLoc = useSelector(store => store.firstTimeCurrentLoc)

      const defaultCityCoordinates = {'latitude':45.5019, 'longitude':-73.5674}

      const [mapData, setMapData ] = useState([])
      const [isGeoloc, setIsGeoloc ] = useState(false)
      const [coordinatesToSet, setCoordinatesToSet ] = useState(defaultCityCoordinates)


      useEffect(() => {
            setMapData(mapQueryData)
            if (mapQueryData.length > 0 && searchItemvalue) {
                        let newBounds = []
                        mapQueryData.map((item) =>newBounds.push([item.lat, item.lon]) )
                        // console.log("BOUNDS SEARCH", newBounds)
                        if (mapQueryData.length ===1 ) {
                              let newBoundsOne = newBounds
                              mapQueryData.map((item) =>newBoundsOne.push([item.lat, item.lon]) )
                              dispatch(setBounds(newBoundsOne))
                        } else {
                              dispatch(setBounds(newBounds))
                        }
                        dispatch(resetItemToSearch())
              
            } else {
        
                  if (loadingFlag) {
                        dispatch(setNotification({message:'aucun résultat', style:'warning', time:5000}))
                  }
            }
      }, [mapQueryData, dispatch])

useEffect(() => {
      dispatch(setFirstTimeUserLocation())
},[])

useEffect(() => {
      setMapData(mapQueryData)
},[mapQueryData])

  return (
      <div className='divSearchMap'>
   
            {/* {firstTimeCurrentLoc && 
                  <CurrentLocation defaultCoordinates={defaultCityCoordinates} setIsGeoloc={setIsGeoloc} setCoordinatesToSet={setCoordinatesToSet} />
            } */}
            
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